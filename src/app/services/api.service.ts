import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public sourceData: any = {};
  public response: any;
  public question: any;
  public error = new BehaviorSubject('');
  public loader = new BehaviorSubject(false);
  public authToken = '';
  constructor(private http: HttpClient) { }

  getToken() {
    let url = 'assets/token.txt';
    return this.http.get(url, { responseType: 'text'}).pipe(
      catchError(err => {
        this.loader.next(false);
        this.error.next('something unexpected happened');
        return of([]);
      }));
  }

  getQnaSystemsWrapper() {
    if(this.authToken && this.authToken.length) {
      this.getQnaSystems();
    } else {
      this.getToken().subscribe((text: any) => {
        if(text) {
          text = String(text);
          text = text.replace(/\s/g,'');
          this.authToken = text;
          this.getQnaSystems();
        }
      })
    }
  }

  getQnaSystems() {
    const headersSet = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('https://mongodb.dataworkz.com/api/qna/v1/systems', {headers : headersSet}).pipe(
      catchError(err => {
        this.loader.next(false);
        this.error.next('something unexpected happened');
        console.log('Handling error locally and rethrowing it...', err);
        return of([]);
      }));
  }

  getLlmProviders(id: string) {
    const headersSet = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('https://mongodb.dataworkz.com/api/qna/v1/systems/' + id +'/llm-providers', {headers : headersSet}).pipe(
      catchError(err => {
        this.loader.next(false);
        this.error.next('something unexpected happened');
        console.log('Handling error locally and rethrowing it...', err);
        return of([]);
      }));
  }

  getQnaDetails(id: string) {
    const headersSet = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('https://mongodb.dataworkz.com/api/qna/v1/systems/' + id, {headers : headersSet}).pipe(
      catchError(err => {
        this.loader.next(false);
        this.error.next('something unexpected happened');
        console.log('Handling error locally and rethrowing it...', err);
        return of([]);
      }));
  }

  getQuestionHistory(id: string) {
    // https://mongodb.dataworkz.com/api/qna/v1/systems/bab0f014-b410-4ffb-897e-b87668306383/questionshistory
    // https://mongodb.dataworkz.com/api/qna/v1/systems/bab0f014-b410-4ffb-897e-b87668306383/questionhistory

    const headersSet = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('https://mongodb.dataworkz.com/api/qna/v1/systems/' + id + '/questionshistory', {headers : headersSet}).pipe(
      catchError(err => {
        this.loader.next(false);
        this.error.next('something unexpected happened');
        console.log('Handling error locally and rethrowing it...', err);
        return of([]);
      }));
  }

  getAnswer(id: string, llmId: string, question: string) {
    // https://mongodb.dataworkz.com/api/qna/v1/systems/bab0f014-b410-4ffb-897e-b87668306383/answer?questionText=How%20to%20create%20text%20index%20in%20version%206.0%3F&llmProviderId=0c21fa31-0469-48ba-9a71-3d87f4160d42;

    let url = 'https://mongodb.dataworkz.com/api/qna/v1/systems/' + id + '/answer?questionText=' + encodeURI(question) + '&llmProviderId=' + llmId;

    const headersSet = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get(url, {headers: headersSet}).pipe(
      catchError(err => {
        this.loader.next(false);
        this.error.next('something unexpected happened');
        console.log('Handling error locally and rethrowing it...', err);
        return of([]);
      }));
  }

  getQuestionDetails(id: string, questionId: string) {
    // https://mongodb.dataworkz.com/api/qna/v1/systems/bab0f014-b410-4ffb-897e-b87668306383/questions/be2cf0ac-236d-4e95-b61d-285951030d88

    const headersSet = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('https://mongodb.dataworkz.com/api/qna/v1/systems/' + id + '/questions/' + questionId, {headers : headersSet}).pipe(
      catchError(err => {
        this.loader.next(false);
        this.error.next('something unexpected happened');
        console.log('Handling error locally and rethrowing it...', err);
        return of([]);
      }));
  }

  checkIfTokenExists(callMethod: any) {
    if(this.authToken && this.authToken.length) {
      callMethod();
    } else {
      this.getToken().subscribe((text: any) => {
        if(text) {
          text = String(text);
          text = text.replace(/\s/g,'');
          this.authToken = 'SSWS ' + text;
          callMethod();
        }
      })
    }
  }

}
