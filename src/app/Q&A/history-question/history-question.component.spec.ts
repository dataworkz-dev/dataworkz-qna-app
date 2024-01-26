import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryQuestionComponent } from './history-question.component';

describe('HistoryQuestionComponent', () => {
  let component: HistoryQuestionComponent;
  let fixture: ComponentFixture<HistoryQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
