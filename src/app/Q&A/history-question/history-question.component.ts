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
  constructor(private router: Router,
              private apiService: ApiService,
              private route: ActivatedRoute) { }
  ngAfterViewChecked(): void {
    let element = document.getElementsByTagName('pre');
    if(element && element.length) {
      for(let i=0; i<element.length; i++) {
        element[i].style.cssText = "padding: 10px; overflow: auto"
      }
    }
  }

  public data = {
    "status": "OK",
    "data": {
        "RESPONSE_SENTIMENT": null,
        "GENERATION_CONFIDENCE_SCORE": "NA",
        "LLM_RESPONSE": "{\"question\":\"How toyota engine works\",\"answer\":\"Toyota engines work \\n \\n \\n \\n \\n based on the principles of internal combustion. They are designed to convert fuel into mechanical energy to power the vehicle.\\n\\nHere is a simplified explanation of how a Toyota engine works:\\n\\n1. Intake: The process starts with the intake stroke. The piston moves downward within the cylinder, creating a vacuum. The intake valve opens, allowing a mixture of air and fuel to enter the combustion chamber.\\n\\n2. Compression: In the compression stroke, the piston moves back up, compressing the air-fuel mixture. This compression increases the pressure and temperature within the combustion chamber, preparing it for combustion.\\n\\n3. Combustion: When the piston reaches the top of its stroke, the spark plug ignites the compressed air-fuel mixture. This ignition causes a controlled explosion, pushing the piston back down with force.\\n\\n4. Power: The downward movement of the piston creates rotational motion in the crankshaft. This motion is transferred to the drivetrain, eventually propelling the vehicle forward.\\n\\n5. Exhaust: After the power stroke, the exhaust valve opens, and the piston moves back up, expelling the exhaust gases from the combustion chamber. This process is known as the exhaust stroke.\\n\\nThis cycle repeats continuously, with each piston within the engine going through the intake, compression, combustion, and exhaust stages. The timing of these stages is precisely controlled by the engine's camshaft and various other components to ensure efficient and smooth operation.\\n\\nIt's important to note that different Toyota engines may have variations in design and technologies to optimize performance, fuel efficiency, and emissions.\\n\",\"context\":[{\"data\":\"My vehicle has a Toyota remote engine starter. When I remotely start the engine, and then open a door to get into the vehicle, the engine turns off. Why?\\\\n\\\\nLoading\\\\n\\\\n×Sorry to interrupt\\\\n\\\\n This page has an error. You might just need to refresh it. [PromiseRejection: [object Object]]\\\\n \\\\n\\\\nRefresh\\\\n\\\\nSkip to NavigationSkip to Main Content\\\\n\\\\nToggle SideBar\\\\n\\\\nToyota Customer Service\\\\n\\\\nType your question...\\\\n\\\\nLoading...\\\\n\\\\nLogin\\\\n\\\\nHome\\\\n\\\\nTopics\\\\n\\\\nAll\\\\n\\\\nCompany\\\\n\\\\nOwners & Drivers\\\\n\\\\nTech\\\\n\\\\nShopping\\\\n\\\\nRecall\\\\n\\\\nVehicles\\\\n\\\\nMore Topics...\\\\n\\\\nMore\\\\n\\\\nSupport Home\\\\n\\\\nMy vehicle has a Toyota remote engine starter. When I remotely start the engine, and then open a door to get into the vehicle, the engine turns off. Why?\\\\n\\\\nTo help ensure your safety, and anyone near the vehicle, the remote engine starter is designed to shut the engine off when it detects any attempt to enter or move the vehicle after a remote engine start.\\\\n\\\\nSep 24, 2022\\u2022Knowledge\\\\n\\\\nNew Section\\\\n\\\\nTitle\\\\n\\\\nMy vehicle has a Toyota remote engine starter. When I remotely start the engine, and then open a door to get into the vehicle, the engine turns off. Why?\\\\n\\\\nURL Name\\\\n\\\\nMy-vehicle-has-a-Toyo-7421\\\\n\\\\nOnly Answer\\\\n\\\\nAnswer\\\\n\\\\nTo help ensure your safety, and anyone near the vehicle, the remote engine starter is designed to shut the engine off when it detects any attempt to enter or move the vehicle after a remote engine start.\\\\n\\\\nRelated Articles\\\\n\\\\nHow do I turn off the engine using my Toyota remote engine starter?\\\\n\\\\nAfter remotely starting the engine, how long will the engine run before it shuts off?\\\\n\\\\nCan I add a Toyota remote engine starter to my vehicle?\\\\n\\\\nNot finding your answer?\\\\n\\\\nSubmit a Request\\\\n\\\\nLoading\",\"link\":\"https:\\/\\/support.toyota.com\\/s\\/article\\/My-vehicle-has-a-Toyo-7421\",\"source\":\"2382cb73-f651-4476-88a3-0ca30ed15079`dw_staging`toyota_support_website`text`GCS`e3a185ec-f37e-4b38-8ee0-854699a3214c\",\"type\":\"MONGODB\"},{\"data\":\"Where can I access more information on Toyota Supra Connect services, including operating instructions and how-to-videos?\\\\n\\\\nLoading\\\\n\\\\n×Sorry to interrupt\\\\n\\\\n This page has an error. You might just need to refresh it. [PromiseRejection: [object Object]]\\\\n \\\\n\\\\nRefresh\\\\n\\\\nSkip to NavigationSkip to Main Content\\\\n\\\\nToggle SideBar\\\\n\\\\nToyota Customer Service\\\\n\\\\nType your question...\\\\n\\\\nLoading...\\\\n\\\\nLogin\\\\n\\\\nHome\\\\n\\\\nTopics\\\\n\\\\nAll\\\\n\\\\nCompany\\\\n\\\\nOwners & Drivers\\\\n\\\\nTech\\\\n\\\\nShopping\\\\n\\\\nRecall\\\\n\\\\nVehicles\\\\n\\\\nMore Topics...\\\\n\\\\nMore\\\\n\\\\nSupport Home\\\\n\\\\nWhere can I access more information on Toyota Supra Connect services, including operating instructions and how-to-videos?\\\\n\\\\nTo learn more about Toyota Supra Connect services and how it works, please click here.     \\\\n\\\\nJul 18, 2023\\u2022Knowledge\\\\n\\\\nNew Section\\\\n\\\\nTitle\\\\n\\\\nWhere can I access more information on Toyota Supra Connect services, including operating instructions and how-to-videos?\\\\n\\\\nURL Name\\\\n\\\\nWhere-can-I-access-mo-10466\\\\n\\\\nOnly Answer\\\\n\\\\nAnswer\\\\n\\\\n To learn more about Toyota Supra Connect services and how it works, please click here.\\\\n\\\\n  \\\\n \\\\n\\\\n  \\\\n \\\\n\\\\n  \\\\n \\\\n\\\\nRelated Articles\\\\n\\\\nWhere can I access more information on Toyota GR Supra Driving Modes?\\\\n\\\\nWhere can I access more information on Toyota GR Supra START\\/STOP switch?\\\\n\\\\nWhere can I access more information on Toyota GR Supra Pre-Collision System (PCS)?\\\\n\\\\nNot finding your answer?\\\\n\\\\nSubmit a Request\\\\n\\\\nLoading\",\"link\":\"https:\\/\\/support.toyota.com\\/s\\/article\\/Where-can-I-access-mo-10466\",\"source\":\"aeea9bc6-f083-4c5c-88ae-c8c9f67372f4`dw_staging`toyota_support_website`text`GCS`e3a185ec-f37e-4b38-8ee0-854699a3214c\",\"type\":\"MONGODB\"},{\"data\":\"How do I turn off the engine using my Toyota remote engine starter?\\\\n\\\\nLoading\\\\n\\\\n×Sorry to interrupt\\\\n\\\\n This page has an error. You might just need to refresh it. [PromiseRejection: [object Object]]\\\\n \\\\n\\\\nRefresh\\\\n\\\\nSkip to NavigationSkip to Main Content\\\\n\\\\nToggle SideBar\\\\n\\\\nToyota Customer Service\\\\n\\\\nType your question...\\\\n\\\\nLoading...\\\\n\\\\nLogin\\\\n\\\\nHome\\\\n\\\\nTopics\\\\n\\\\nAll\\\\n\\\\nCompany\\\\n\\\\nOwners & Drivers\\\\n\\\\nTech\\\\n\\\\nShopping\\\\n\\\\nRecall\\\\n\\\\nVehicles\\\\n\\\\nMore Topics...\\\\n\\\\nMore\\\\n\\\\nSupport Home\\\\n\\\\nHow do I turn off the engine using my Toyota remote engine starter?\\\\n\\\\nPress the UNLOCK button on the remote. OR Press and hold the LOCK button for 2 or more seconds.\\\\n\\\\nSep 24, 2022\\u2022Knowledge\\\\n\\\\nNew Section\\\\n\\\\nTitle\\\\n\\\\nHow do I turn off the engine using my Toyota remote engine starter?\\\\n\\\\nURL Name\\\\n\\\\nHow-do-I-turn-off-the-7425\\\\n\\\\nOnly Answer\\\\n\\\\nAnswer\\\\n\\\\nPress the UNLOCK button on the remote.\\\\nOR\\\\nPress and hold the LOCK button for 2 or more seconds.\\\\n\\\\nRelated Articles\\\\n\\\\nMy vehicle has a Toyota remote engine starter. When I remotely start the engine, and then open a door to get into the veh\\u2026\\\\n\\\\nCan I add a Toyota remote engine starter to my vehicle?\\\\n\\\\nHow far away can I be from the vehicle and the remote engine starter still work?\\\\n\\\\nNot finding your answer?\\\\n\\\\nSubmit a Request\\\\n\\\\nLoading\",\"link\":\"https:\\/\\/support.toyota.com\\/s\\/article\\/How-do-I-turn-off-the-7425\",\"source\":\"4f30c385-a822-4f05-93d3-af29fb7be4dc`dw_staging`toyota_support_website`text`GCS`e3a185ec-f37e-4b38-8ee0-854699a3214c\",\"type\":\"MONGODB\"}],\"type\":\"Dataworkz\",\"questionUuid\":\"082bfdf4-35cf-44b5-be7c-6073e632bacc\"}",
        "RETRIVAL_RELEVANCE": "0.72",
        "EXPERT_COMMENTS": null,
        "COMMENTS": null,
        "RETRIVAL_CONTEXT_RECALL": "N/A",
        "GENERATION_GROUNDEDNESS": "NO",
        "EXPERT_SENTIMENT": null,
        "GENERATION_CORRECTNESS": null,
        "LLM_MODEL": "af9a1566-fe15-49c3-8f83-a90b60cb1054",
        "GENERATION_RELEVANCE": "0.693"
    }
}

  ngOnInit(): void {
    this.qnaId = this.route.snapshot.paramMap.get('id');
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.apiService.loader.next(true);
    this.apiService.getQuestionDetails(this.qnaId, this.questionId).subscribe((res: any) => {
      this.apiService.loader.next(false);
      if(res && res.llm_response) {
        console.log(JSON.parse(res.llm_response));
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

    this.apiService.loader.subscribe((load) => {
      this.showLoader = load;
    });

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
