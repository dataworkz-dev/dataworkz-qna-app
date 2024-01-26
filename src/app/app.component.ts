import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.apiServie.error.subscribe((res) => {
      if(res && res.length) {
        this.errorMessage = res;
        this.showError = true;
        setTimeout(()=> {
          this.showError = false;
        },3000)
      }
      
    })
  }
  constructor(private apiServie: ApiService) {

  }
  title = 'Dataworkz';
  showError = false;
  errorMessage = 'show error';  
  showLoader: boolean = false;
}
