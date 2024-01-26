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
  // ngAfterViewInit(): void {
  //   let element = document.getElementsByTagName('pre');
  //         if(element && element.length) {
  //           for(let i=0; i<element.length; i++) {
  //             element[i].style.cssText = "padding: 10px; overflow: auto"
  //           }
  //         }
  // }
  ngAfterViewChecked(): void {
    let element = document.getElementsByTagName('pre');
    if(element && element.length) {
      for(let i=0; i<element.length; i++) {
        element[i].style.cssText = "padding: 10px; overflow: auto"
      }
    }
  }
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
  public responseData = {
    "status": "OK",
    "data": {
        "RESPONSE_SENTIMENT": null,
        "GENERATION_CONFIDENCE_SCORE": "81.9",
        "LLM_RESPONSE": "{\"question\":\"what is the process of creating secondary index for collections based on time series\",\"answer\":\"```\\nfdsafsadflkdsjflskdfj \\n``` To create a secondary index for a collection based on a time series, you can follow these steps:\\n\\n1. Create a new collection for the time series data, using the `timeseries` collection type. This will automatically create an optimized internal storage format for the time series data.\\n2. Define the time field that you want to use for the secondary index. This field should be a date or datetime field that represents the time of each document in the collection.\\n3. Create a secondary index on the time field using the `createIndex` command. For example:\\n```\\ndb.myCollection.createIndex({ time: 1 })\\n```\\nThis will create a secondary index on the `time` field, allowing you to query the collection based on the time of the documents.\\n4. To optimize the secondary index for querying, you can add a `compoundIndex` to the `createIndex` command. A compound index allows you to specify multiple fields to index together, which can improve query performance. For example:\\n```\\ndb.myCollection.createIndex({ time: 1, otherField: 1 })\\n```\\nThis will create a compound index on the `time` and `otherField` fields, allowing you to query the collection based on either field.\\n5. To enable querying the collection based on the time series data, you can use the `timeseries` aggregation framework. This allows you to perform aggregations on the time series data, such as calculating averages or minimums over a range of time. For example:\\n```\\ndb.myCollection.aggregate([\\n  { $match: { time: { $gte: ISODate(\\\"2022-01-01T00:00:00Z\\\"), $lte: ISODate(\\\"2022-01-31T23:59:59Z\\\") } } },\\n  { $group: { _id: \\\"$time\\\", avgTmp: { $avg: \\\"$temperature\\\" } } },\\n  { $project: { _id: 0, time: 1, avgTmp: 1 } }\\n])\\n```\\nThis will return the average temperature for each day in the time range specified.\\n\\nNote that the `timeseries` collection type and the `timeseries` aggregation framework are only available in MongoDB 3.6 and later versions. In earlier versions of MongoDB, you can use the ` aggregation` framework to perform time series queries, but you will need to define the time field and any secondary indexes manually.\",\"context\":[{\"data\":\"the date of the measurement and then returns the average of all temperature measurements that day:\\\\n{ \\\"_id\\\" : { \\\"date\\\" : { \\\"year\\\" : 2021, \\\"month\\\" : 5, \\\"day\\\" : 18 } }, \\\"avgTmp\\\" : 12.714285714285714 } { \\\"_id\\\" : { \\\"date\\\" : { \\\"year\\\" : 2021, \\\"month\\\" : 5, \\\"day\\\" : 19 } }, \\\"avgTmp\\\" : 13 }\\\\nCheck if a Collection is of Type Time Series\\\\nTo determine if a collection is of type time series, use the listCollections command:\\\\ndb.runCommand( { listCollections: 1.0 } )\\\\nIf the collection is a time series collection, it returns this:\\\\n{ cursor: { id: <number>, ns: 'test.$cmd.listCollections', firstBatch: [ { name: <string>, type: 'timeseries', options: { expireAfterSeconds: <number>, timeseries: { ... } }, ... }, ... ] } }\\\\nBehavior\\\\nTime series collections behave like normal collections. You can insert and query your data as you normally would. MongoDB treats time series collections as writable non-materialized views on internal collections that automatically organize time series data into an optimized storage format on insert.\\\\nWhen you query time series collections, you operate on one document per measurement. Queries on time series collections take advantage of the optimized internal storage format and return results faster.\\\\nIndex\\\\nThe implementation of time series collections uses internal collections that reduce disk usage and improve query efficiency. Time series collections automatically order and index data by time. The internal index for a time series collection is not displayed by\\\\nlistIndexes.\\\\nTip\\\\nTo improve query performance, you can manually add secondary indexes on the fields specified as the\\\\nmetaField and the\\\\ntimeField.\\\\nDefault Compression Algorithm\\\\nTime series collections ignore the global default compression algorithm, snappy, in favor of zstd, unless a different compression algorithm is specified using the\\\\nstorageEngine option when the collection was created. For example, to change the compression algorithm to\\\\nsnappy for a new\\\\nweather collection, add the following option:\\\\ndb.createCollection( \\\"weather\\\", { timeseries: { timeField: \\\"timestamp\\\" }, storageEngine: { wiredTiger: { configString: \\\"block_compressor=snappy\\\" } } } )\\\\nValid\\\\nblock_compressor options are:\\\\n-\\\\nsnappy\\\\n-\\\\nzlib\\\\n-\\\\nzstd(default)\\\\n-\\\\nnone\\\\n\",\"link\":\"https:\\/\\/www.mongodb.com\\/docs\\/v5.0\\/core\\/timeseries-collections\\/\",\"source\":\"d4dbbe89-69cb-44d8-9c5d-08d4758fe531`mug_la`mongo_docs_website_with_ver`text`GCS`d1e850db-a1d0-415e-86b8-424949ef34f5\",\"type\":\"MONGODB\"},{\"data\":\"Index Builds on Populated Collections\\\\nOn this page\\\\nStarting in MongoDB 4.2, index builds use an optimized build process that holds an exclusive lock on the collection at the beginning and end of the index build. The rest of the build process yields to interleaving read and write operations. For a detailed description of index build process and locking behavior, see Index Build Process.\\\\nStarting in MongoDB 4.4, index builds on a replica set or sharded cluster build simultaneously across all data-bearing replica set members. The primary requires a minimum number of data-bearing voting members (i.e. commit quorum), including itself, that must complete the build before marking the index as ready for use. A \\\"voting\\\" member is any replica set member where\\\\nmembers[n].votes is greater than\\\\n0. See Index Builds in Replicated Environments for more information.\\\\nStarting in MongoDB 7.1, index builds are improved with faster error reporting and increased failure resilience. You can also set the minimum available disk space required for index builds using the new\\\\nindexBuildMinAvailableDiskSpaceMB parameter, which stops index builds if disk space is too low.\\\\nThe following table compares the index build behavior starting in MongoDB 7.1 with earlier versions.\\\\n|\\\\nBehavior Starting in MongoDB 7.1\\\\n|\\\\nBehavior in Earlier MongoDB Versions\\\\n|\\\\nIndex errors found during the collection scan phase, except duplicate key errors, are returned immediately and then the index build stops. Earlier MongoDB versions return errors in the commit phase, which occurs near the end of the index build. MongoDB 7.1 helps you to rapidly diagnose index errors. For example, if an incompatible index value format is found, the error is returned to you immediately.\\\\n|\\\\nIndex build errors can take a long time to be returned compared to MongoDB 7.1 because the errors are returned near the end of the index build in the commit phase.\\\\n|\\\\nIncreased resilience for your deployment. If an index build error occurs, a secondary member can request that the primary member stop an index build and the secondary member does not crash. A request to stop an index build is not always possible: if a member has already voted to commit the index, then the secondary cannot request that the index build stop and the secondary crashes (similar to MongoDB 7.0 and earlier).\\\\n|\\\\nAn index build error can cause a secondary member to crash.\\\\n|\\\\nImproved disk space management for index\",\"link\":\"https:\\/\\/www.mongodb.com\\/docs\\/upcoming\\/core\\/index-creation\\/\",\"source\":\"b7a22db8-a648-48ce-84f1-48ea6113c12e`mug_la`mongo_docs_website_with_ver`text`GCS`d1e850db-a1d0-415e-86b8-424949ef34f5\",\"type\":\"MONGODB\"},{\"data\":\"Collection is Clustered\\\\nTo determine if a collection is clustered, use the\\\\nlistCollections command:\\\\ndb.runCommand( { listCollections: 1 } )\\\\nFor clustered collections, you will see the clusteredIndex details in the output. For example, the following output shows the details for the\\\\norders clustered collection:\\\\n... name: 'orders', type: 'collection', options: { clusteredIndex: { v: 2, key: { _id: 1 }, name: 'orders clustered key', unique: true } }, ...\\\\nv is the index version.\\\\n\",\"link\":\"https:\\/\\/www.mongodb.com\\/docs\\/rapid\\/core\\/clustered-collections\\/\",\"source\":\"6f6d1bca-d5e0-4cfb-a3ae-7ef65a063436`mug_la`mongo_docs_website_with_ver`text`GCS`d1e850db-a1d0-415e-86b8-424949ef34f5\",\"type\":\"MONGODB\"}],\"type\":\"Dataworkz\",\"questionUuid\":\"6a1a7ba0-ca5a-45fd-96ab-2277a6e90e33\"}",
        "RETRIVAL_RELEVANCE": "0.71",
        "EXPERT_COMMENTS": null,
        "COMMENTS": null,
        "RETRIVAL_CONTEXT_RECALL": "N/A",
        "GENERATION_GROUNDEDNESS": null,
        "EXPERT_SENTIMENT": null,
        "GENERATION_CORRECTNESS": null,
        "LLM_MODEL": "0c21fa31-0469-48ba-9a71-3d87f4160d42",
        "GENERATION_RELEVANCE": "0.706"
    }
}
  
  public  historyQuestions: any = {
    "status":"OK",
    "data":{
       "January 2024":{
          "cbf14077-3a27-436e-8cf0-0fb3c8668f6d":"What are the Method for Estimating?",
          "27dffae6-6be5-4e23-b3d8-05c855a16ad1":"What are the Method for Estimating?"
       }
    }
 }
  public questionList: any = [];
  ngOnInit(): void {
    
    // let storedQuestionList: any = localStorage.getItem('questionList');
    // storedQuestionList = JSON.parse(storedQuestionList);
    // this.questionList = storedQuestionList ? storedQuestionList: [];
    this.qnaId = this.route.snapshot.paramMap.get('id');
    // this.apiService.error.next('this message');
    this.apiService.loader.next(true);
    this.apiService.getQnaDetails(this.qnaId).subscribe((response: any) => {
      this.apiService.loader.next(false);
      this.qnaName = response.name;
    })
    console.log(this.qnaId);
    this.getLlmProviders();
    // this.getHistoryQuestions();
    this.getPreviousResponse();

    this.apiService.loader.subscribe((load) => {
      this.showLoader = load;
    });

    this.apiService.getQuestionHistory(this.qnaId).subscribe((questionList : any) => {
      if(questionList) {
        this.questionList = [];
        this.historyQuestions = {};
        this.historyQuestions['data'] = questionList;
        if(this.historyQuestions && this.historyQuestions.data) {
          const keys = Object.keys(this.historyQuestions.data);
          if(keys && keys.length) {
            keys.forEach(key => {
              if(key) {
                let questionObject: any = {month: '', list: []};
                if(key) {
                  let monthSplit = key.split(' ');
                  if(monthSplit && monthSplit.length) {
                    let date = new Date();
                    let month = this.month[date.getMonth()];
                    if(monthSplit[0] == month) {
                      questionObject['month'] = 'Current Month';
                    } else {
                      questionObject['month'] = key;
                    }
                    
                  }
                }
                if(this.historyQuestions.data[key]) {
                  let questions = Object.keys(this.historyQuestions.data[key]);
                  if(questions && questions.length) {
                    questions.forEach(question => {
                      if(question && this.historyQuestions.data[key][question]) {
                        questionObject.list.push({questionId: question, question: this.historyQuestions.data[key][question]})
                      }
                    });
                  }
                }
                if(questionObject && questionObject.month && questionObject.month.length) {
                  this.questionList.push(questionObject);
                }
              }
            });
          }
        }
      }
    })
  }

  getLlmProviders() {
    // call and api here to get list of llm providers.
    this.llmProviders = [];
    this.apiService.getLlmProviders(this.qnaId).subscribe((providers: any) => {
      let keys = Object.keys(providers);
      if(keys && keys.length) {
        keys.forEach((llm: any) => {
          this.llmProviders.push({id: llm, name: providers[llm]})
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

            // setting question list in local.
            let storedQuestionList: any = localStorage.getItem('questionList');
            storedQuestionList = JSON.parse(storedQuestionList);
            this.questionList = storedQuestionList ? storedQuestionList: [];
            if(this.questionList && this.questionList.length && this.questionList[0].list && this.questionList[0].list.length) {
              this.questionList[0].list.push({questionId: res.questionUuid, question: res.questionText});
            } else {
              this.questionList.push({month: 'current month', list: [{questionId: res.questionUuid, question: res.questionText}]});
            }
            localStorage.removeItem('questionList');
            localStorage.setItem('questionList', JSON.stringify(this.questionList));
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
    console.log(this.question.split(' ').join(''), this.question.split(' ').join('').length);
    
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

  getHistoryQuestions() {
    this.questionList = [];
    if(this.historyQuestions && this.historyQuestions.data) {
      const keys = Object.keys(this.historyQuestions.data);
      if(keys && keys.length) {
        keys.forEach(key => {
          if(key) {
            let questionObject: any = {month: '', list: []};
            questionObject['month'] = key;
            if(this.historyQuestions.data[key]) {
              let questions = Object.keys(this.historyQuestions.data[key]);
              if(questions && questions.length) {
                questions.forEach(question => {
                  if(question && this.historyQuestions.data[key][question]) {
                    questionObject.list.push({questionId: question, question: this.historyQuestions.data[key][question]})
                  }
                });
              }
            }
            if(questionObject && questionObject.month && questionObject.month.length) {
              this.questionList.push(questionObject);
            }
          }
        });
      }
    }
  }

  backToListPage() {
    this.router.navigate(['list']);
  }

}
