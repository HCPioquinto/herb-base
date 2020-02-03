import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackTableComponent } from './feedback-table/feedback-table.component';
import { FeedbackItemComponent } from './feedback-table/feedback-item/feedback-item.component';
import { FeedbackComponent } from './feedback.component';

@NgModule({
  declarations: [
    FeedbackTableComponent,
    FeedbackItemComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class FeedbackModule { }
