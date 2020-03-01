import { Component } from "@angular/core";
import { FeedbackService } from "./common/services/feedback.service";
import { ArchiveService } from "./common/services/archive.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private feedbackService: FeedbackService,
    private archiveService: ArchiveService
    ) {}

  ngOnInit() {
    this.getFeedbackData();
    this.getArchivesData();
  }

  getFeedbackData() {
    this.feedbackService.getItems();
    this.feedbackService.onFeedbackChange.subscribe(res => {
      this.feedbackService.feedbackData = res;
    });
  }

  getArchivesData() {
    this.archiveService.getItems();
    this.archiveService.onArchivesChange.subscribe(res => {
      console.log("archive", res);
    });
  }
}
