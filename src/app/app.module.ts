import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './Q&A/list/list.component';
import { MainComponent } from './Q&A/main/main.component';
import { FormsModule } from '@angular/forms';
import { HistoryQuestionComponent } from './Q&A/history-question/history-question.component';
import { HttpClientModule } from '@angular/common/http';
import { SourceComponent } from './Q&A/source/source.component';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MainComponent,
    HistoryQuestionComponent,
    SourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HighlightJsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
