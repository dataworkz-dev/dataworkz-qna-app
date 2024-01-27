import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-history-question',
  templateUrl: './history-question.component.html',
  styleUrls: ['./history-question.component.scss']
})
export class HistoryQuestionComponent implements OnInit, AfterViewChecked {
  public showSource: boolean = false;
  public question: string = '';
  public answer: string = '';
  public prompt: string = '';
  public qnaId: any = '';
  public sourceData: any = [];
  public questionId: any;
  public formattedResponse: any = [];
  public showLoader: boolean = false;
  public retrivalRelevance: string = '';
  public retrivalContextRecall: string = '';
  public generationRelevance: string = '';
  public generationGroundedness: string = '';
  public generationCorrectness: string = '';
  public generationConfidenceScore: string = ''; 
  public llmProvider: string = '';
  public data: any = {};

  constructor(private router: Router,
              private apiService: ApiService,
              private route: ActivatedRoute) { }

  getQuestionDetails() {
    this.apiService.loader.next(true);
    this.apiService.getQuestionDetails(this.qnaId, this.questionId).subscribe((res: any) => {
      this.apiService.loader.next(false);
      if(res && res.llm_response) {
        let response = JSON.parse(res.llm_response);
        this.question = response.question;
        this.answer = response.answer;
        this.retrivalRelevance = res.retrival_relevance ? res.retrival_relevance : 'N/A';
        this.retrivalContextRecall = res.retrival_context_recall ? res.retrival_context_recall : 'N/A';
        this.generationRelevance = res.generation_relevance ? res.generation_relevance : 'N/A';
        this.generationGroundedness = res.generation_groundedness ? res.generation_groundedness : 'N/A';
        this.generationCorrectness = res.generation_correctness ? res.generation_correctness : 'N/A';
        this.generationConfidenceScore = res.generation_confidence_score ? res.generation_confidence_score : 'N/A';
        this.llmProvider = res.llm_model;
        if(this.answer) {
          this.formattedResponse = this.answer.split('```');
        }
        if(response.context && response.context.length) {
          response.context.forEach((context : any) => {
            if(context.data) {
              let data = context.data.split('\\n').join('\n');
              this.prompt += data + '\n';
            }
          })
        }
        if(response && response.context && response.context.length) {
          this.sourceData = JSON.parse(JSON.stringify(response.context));
        }      
      }
      let element = document.getElementsByTagName('pre');
          
        for(let i=0; i<element.length; i++) {
          element[i].style.cssText = "padding: 10px; overflow: auto"
        }
    });
  }

  ngOnInit(): void {
    this.qnaId = this.route.snapshot.paramMap.get('id');
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    if(this.apiService.authToken && this.apiService.authToken.length) {
      this.getQuestionDetails();
    } else {
      this.apiService.getToken().subscribe((text: any) => {
        if(text) {
          text = String(text);
          text = text.replace(/\s/g,'');
          this.apiService.authToken = 'SSWS' + text;
          this.getQuestionDetails();
        }
      })
    }
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

  setShowSource() {
    this.showSource = !this.showSource;
  }

  openSource(source: any) {
    this.apiService.sourceData = source;
    this.router.navigate(['main/' + this.qnaId+ '/source']);
  }

  reduceDataLength(data: string, length: number) {
    data = data? data.substring(0,length) + ' ...': '';
    return data;
  }
  
  goToMainPage() {
    this.router.navigate(['main/' + this.qnaId]);
  }

}
