import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef = {} as ElementRef;
  @ViewChild("scrollBottom") scrollBottom: ElementRef = {} as ElementRef;
  constructor(private router: Router,
              private apiService: ApiService,
              private route: ActivatedRoute) { }

  public collapseImageSrc: string = './../../../assets/collapse.svg';
  public formattedResponse: any = [];
  public drawerOpened: boolean = false;
  public question: string = '';
  public showResponseDiv: boolean = false;
  public response: string = '';
  public sourceData: any = [];
  public qnaId: any = '';
  public llmProviders: any = [];
  public typewriter_response = '';
  public selectedLlm: string = 'llm';
  public qnaName: string = '';
  public showLoader: boolean = false;
  public month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  public responseData = {};
  public questionList: any = [];
  public  historyQuestions: any = {};

  ngOnInit(): void {
    this.qnaId = this.route.snapshot.paramMap.get('id');
    this.apiService.loader.next(true);
    this.checkIfTokenExists(this.getQnaDetails);
    this.checkIfTokenExists(this.getLlmProviders);
    this.checkIfTokenExists(this.getQuestionHistory);
    this.getPreviousResponse();
    this.apiService.loader.subscribe((load) => {
      this.showLoader = load;
    });
  }

  ngAfterViewChecked(): void {
    let element = document.getElementsByTagName('pre');
    if(element && element.length) {
      for(let i=0; i<element.length; i++) {
        element[i].style.cssText = "padding: 10px; overflow: auto"
      }
    }
  }

  getQnaDetails(that: any) {
    that.apiService.getQnaDetails(that.qnaId).subscribe((response: any) => {
      that.apiService.loader.next(false);
      that.qnaName = response.name;
    })
  }

  getQuestionHistory(that: any) {
    that.apiService.getQuestionHistory(that.qnaId).subscribe((questionList : any) => {
      if(questionList) {
        that.questionList = [];
        that.historyQuestions = {};
        that.historyQuestions['data'] = questionList;
        if(that.historyQuestions && that.historyQuestions.data) {
          const keys = Object.keys(that.historyQuestions.data);
          if(keys && keys.length) {
            keys.forEach(key => {
              if(key) {
                let questionObject: any = {month: '', list: []};
                if(key) {
                  let monthSplit = key.split(' ');
                  if(monthSplit && monthSplit.length) {
                    let date = new Date();
                    let month = that.month[date.getMonth()];
                    if(monthSplit[0] == month) {
                      questionObject['month'] = 'Current Month';
                    } else {
                      questionObject['month'] = key;
                    }
                    
                  }
                }
                if(that.historyQuestions.data[key]) {
                  let questions = Object.keys(that.historyQuestions.data[key]);
                  if(questions && questions.length) {
                    questions.forEach(question => {
                      if(question && that.historyQuestions.data[key][question]) {
                        questionObject.list.push({questionId: question, question: that.historyQuestions.data[key][question]})
                      }
                    });
                  }
                }
                if(questionObject && questionObject.month && questionObject.month.length) {
                  that.questionList.push(questionObject);
                }
              }
            });
          }
        }
      }
    })
  }

  getLlmProviders(that: any) {
    that.llmProviders = [];
    that.apiService.getLlmProviders(that.qnaId).subscribe((providers: any) => {
      let keys = Object.keys(providers);
      if(keys && keys.length) {
        keys.forEach((llm: any) => {
          that.llmProviders.push({id: llm, name: providers[llm]})
        })
      }
    })       
  }

  openOrCloseDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  changeImgIcon() {
    if(this.drawerOpened) {
      this.collapseImageSrc = './../../../assets/collapsibleClose.svg';
    } else {
      this.collapseImageSrc = './../../../assets/collapsibleOpen.svg'
    }
  }

  resetImgIcon() {
    this.collapseImageSrc = './../../../assets/collapse.svg';
  }

  async getResponse(fromMain: boolean = false) {
    if(this.question && this.question.length) {
      this.showResponseDiv = false;
      this.formattedResponse = [];
      if(fromMain) {
        this.response = '';
        this.sourceData = [];
        this.formattedResponse = [];
        this.apiService.loader.next(true);
        this.apiService.getAnswer(this.qnaId, this.selectedLlm, this.question).subscribe(async (res: any) => {
          this,this.apiService.loader.next(false);
          if(res) {
            this.showResponseDiv = true;
            this.responseData = JSON.parse(JSON.stringify(res));
            this.apiService.response = this.responseData;
            this.response = res.answer;
            this.sourceData = JSON.parse(JSON.stringify(res.context));
            this.question = res.questionText;
            this.apiService.response = this.responseData;
            this.getQuestionHistory(this);
            let resss = this.response.split('```');
            let codeBlockLength = 0;
            if(resss && resss.length) {
              for(let i=0; i<resss.length; i++) {
                this.formattedResponse.push('');
                await this.newTypeWriterEffect(resss[i], this.formattedResponse.length-1, 0, this);
                let element = document.getElementsByTagName('pre');
                if(element && element.length && i%2 == 1) {
                  for(let i=codeBlockLength; i<element.length; i++) {
                    element[i].style.cssText = "padding: 10px; overflow: auto"
                  }
                  codeBlockLength++;
                }
              }
            }
          }
        })
      } 
    }

  }

  getPreviousResponse() {
    if(this.apiService.response && this.apiService.response.answer) {
      this.response = '';
      this.sourceData = [];
      this.formattedResponse = [];
      this.showResponseDiv = true;
      this.responseData = this.apiService.response;
      this.question = this.apiService.response.questionText;
      let parsedData = this.apiService.response;
      this.response = parsedData.answer;
      if(parsedData && parsedData.context && parsedData.context.length) {
        this.sourceData = JSON.parse(JSON.stringify(parsedData.context));
      }
      this.formattedResponse = this.response.split('```');
      let codeBlockLength = 0;
      let element = document.getElementsByTagName('pre');
          if(element && element.length) {
            
            for(let i=codeBlockLength; i<element.length; i++) {
              element[i].style.cssText = "padding: 10px; overflow: auto"
            }
            codeBlockLength++;
          }
      this.apiService.response = this.responseData;
      this.typewriter_response = this.response;
    }  
  }

  async newTypeWriterEffect(res: string, index: number, currentChar: number, thiss: any) {
    let typingDone = new Promise(function (resolve, reject) {
      let myInterval = setInterval(() => {
        if(currentChar < res.length) {
          currentChar++;
          thiss.formattedResponse[index] = res.substring(0,currentChar);
        } else {
          clearInterval(myInterval);
          resolve(true);
        }
      },1)
     });
     await typingDone;
  }

  askQuestion() {    
    if(this.selectedLlm && this.selectedLlm == 'llm') {
      this.apiService.error.next('Please select a LLM Provider');
    } else if(!this.question || ((this.question && this.question.length == 0) || this.question.split(' ').join('').length == 0)) {
      this.apiService.error.next('Please fill in the question.')
    } else {
      this.getResponse(true);
    }
    
  }

  reduceDataLength(data: string, length: number) {
    data = data? data.substring(0,length) + ' ...': '';
    return data;
  }

  openSource(source: any) {
    this.apiService.sourceData = source;
    this.router.navigate(['main/' + this.qnaId+ '/source']);
  }

  openHistoryQuestion(id: string) {
    this.router.navigate(['main/' +this.qnaId+ '/historyQuestion/' + id]);
  }

  backToListPage() {
    this.router.navigate(['list']);
  }

  checkIfTokenExists(callMethod: any) {
    if(this.apiService.authToken && this.apiService.authToken.length) {
      callMethod(this);
    } else {
      this.apiService.getToken().subscribe((text: any) => {
        if(text) {
          text = String(text);
          text = text.replace(/\s/g,'');
          this.apiService.authToken = 'SSWS ' + text;
          callMethod(this);
        }
      })
    }
  }

}
