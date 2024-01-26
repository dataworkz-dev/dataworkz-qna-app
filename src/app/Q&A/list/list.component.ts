import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public listOfQna: any = [];
  public searchTerm: string = '';
  public originalListOfQna: any = [];
  public showLoader: boolean = false;

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.response = [];
    this.apiService.sourceData = [];
    this.apiService.question = '';
    this.getQnaSystems();
  }

  getQnaSystems() {
    this.apiService.response = [];
    this.apiService.sourceData = [];
    this.listOfQna = [];
    this.originalListOfQna = [];
    this.apiService.loader.subscribe((load) => {
      this.showLoader = load;
    });
    this.apiService.loader.next(true);
    this.apiService.getQnaSystems().subscribe((response) => {
      let keys = Object.keys(response);
      if(keys && keys.length) {
        keys.forEach((key: string) => {
          // call api to get details of the Qna.
          this.apiService.getQnaDetails(key).subscribe((details: any) => {
            if(details) {
              this.listOfQna.push(details)
              this.originalListOfQna.push(details);
            }
            this.apiService.loader.next(false);
          })
        })
      }
      
      
    });
  }

  openQa(id: string) {
    this.router.navigate(['main/'+ id])
  }

  search() {
    this.listOfQna = [];
    if(this.originalListOfQna && this.originalListOfQna.length && this.searchTerm && this.searchTerm.length) {
      this.originalListOfQna.forEach((qna: any) => {
        if(qna.name.includes(this.searchTerm)) {
          this.listOfQna.push(qna);
        }
      })
    }
    if(this.searchTerm == '') {
      this.listOfQna = JSON.parse(JSON.stringify(this.originalListOfQna))
    }
  }

}
