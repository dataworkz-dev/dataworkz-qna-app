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
    this.checkIfTokenExists(this.getQnaSystems);
  }

  getQnaSystems(that: any) {
    that.apiService.response = [];
    that.apiService.sourceData = [];
    that.listOfQna = [];
    that.originalListOfQna = [];
    that.apiService.loader.subscribe((load: any) => {
      that.showLoader = load;
    });
    that.apiService.loader.next(true);
    that.apiService.getQnaSystems().subscribe((response: any) => {
      let keys = Object.keys(response);
      if(keys && keys.length) {
        keys.forEach((key: string) => {
          that.apiService.getQnaDetails(key).subscribe((details: any) => {
            if(details) {
              that.listOfQna.push(details)
              that.originalListOfQna.push(details);
            }
            that.apiService.loader.next(false);
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
