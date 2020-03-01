import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeedbackComponent  } from "./feedback.component";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [FeedbackComponent, ],
  imports: [CommonModule, ComponentsModule],
})
export class FeedbackModule {}
