import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './Q&A/list/list.component';
import { MainComponent } from './Q&A/main/main.component';
import { HistoryQuestionComponent } from './Q&A/history-question/history-question.component';
import { SourceComponent } from './Q&A/source/source.component';

const routes: Routes = [
  { path: 'main/:id', component: MainComponent },
  { path: 'main/:id/historyQuestion/:questionId', component: HistoryQuestionComponent },
  { path: 'main/:id/source', component: SourceComponent},
  { path: '**', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
