import { Component, OnInit, Inject } from "@angular/core";
import { FeedbackService } from "../common/services/feedback.service";
import { IFeedback } from "../common/models/feedback";
import { checkObjectLength, formatDate } from "../common/utilities";
import { ArchiveService } from '../common/services/archive.service';
import { firestore } from 'firebase';

export interface DialogData {
  image: string;
}
@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"]
})
export class FeedbackComponent implements OnInit {
  feedbackList: IFeedback[];
  tableHeaders: string[] = [
    "Sent Date",
    "Image",
    "Name Correction",
    "Name Result"
  ];
  exemptedKeys = ["Key", "Status, 'Image"];
  showActions = {
    trash: true,
    check: true,
    archive: false
  };

  constructor(
    private feedbackService: FeedbackService,
    private archiveService: ArchiveService
  ) {}

  ngOnInit() {
    this.feedbackService.onFeedbackChange.subscribe(res => {
      const isValidObject = checkObjectLength(res);
      if (!isValidObject) return;
      this.feedbackList = res.map(data => {
        const {
          Image,
          FeedbackSent,
          PlantNameResult,
          PlantNameCorrection,
          Key
        } = data;
        return {
          Image,
          FeedbackSent: formatDate(FeedbackSent.seconds),
          PlantNameResult,
          PlantNameCorrection,
          Key
        };
      });
      console.log('this.feedbackList', this.feedbackList)
    });
  }

  getFeedbackWithKey(key: string) {
    return this.feedbackList.filter(data => data.Key === key)[0];
  }

  trashAction(key: string) {
    //move to archive, ask reason of rejection
    const {Image, FeedbackSent,} = this.getFeedbackWithKey(key);
    const archivedFeedback = {
      Image,
      FeedbackSent,
      ArchivedDate: firestore.Timestamp.now(),
      Remarks: '',
      IsRetrained: false,
    };
    this.archiveService.addItem(archivedFeedback);
    this.feedbackService.deleteItem(key);
    this.feedbackList = this.feedbackList.filter(data => data.Key !== key);
  }
  checkAction(key: string) {
    // move to training request
  }
}
