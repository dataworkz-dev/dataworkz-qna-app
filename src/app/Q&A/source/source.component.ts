import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  public sourceData: any = {};
  public collectionName: string = '';
  public datasetName: string = '';
  public columnName: string = '';

  constructor(private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    if(this.apiService.sourceData && this.apiService.sourceData.data) {
      console.log(this.apiService.sourceData)
      let splitSource = this.apiService.sourceData.source.split('`');
      console.log('split', splitSource);
      this.collectionName = splitSource[1]? splitSource[1]: '';
      this.datasetName = splitSource[2]? splitSource[2]: '';
      this.columnName = splitSource[3]? splitSource[3]: '';
      this.sourceData = this.apiService.sourceData.data.split('\\n').join('\n');
    } else {
      console.log('call an api to get all the data');
      // this.router.navigate(['main']);
      let id = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['main/' + id])
    }
  }

  backToMainPage() {
    let id = this.route.snapshot.paramMap.get('id');
    this.location.back();
    // this.router.navigate(['main/' + id + '/source'])
  }

}
