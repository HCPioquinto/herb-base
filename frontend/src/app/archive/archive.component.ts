import { Component, OnInit } from "@angular/core";
import { ArchiveService } from "../common/services/archive.service";
import { checkObjectLength, formatDate } from "../common/utilities";
import { IArchives } from "@app/common/models/archive";

@Component({
  selector: "app-archive",
  templateUrl: "./archive.component.html",
  styleUrls: ["./archive.component.scss"]
})
export class ArchiveComponent implements OnInit {
  tableHeaders: string[] = [
    "Image",
    "FeedbackSent",
    "ArchivedDate",
    "Added to Model?"
  ];
  exemptedKeys: string[] = ["Key", "IsRetrained", "Remarks"];
  archiveList: IArchives[];
  isShowActions: true;
  showActions: any = {
    trash: true
  };

  constructor(private archiveService: ArchiveService) {}

  ngOnInit() {
    this.archiveService.onArchivesChange.subscribe(res => {
      console.log('res', res)
      const isValidObject = checkObjectLength(res);
      if (!isValidObject) return;
      this.archiveList = res.map(data => {
        const { Image, FeedbackSent, ArchivedDate, IsRetrained, Key } = data;
        return {
          Image,
          FeedbackSent: formatDate(FeedbackSent.seconds),
          ArchivedDate: formatDate(ArchivedDate.seconds),
          IsRetrained: IsRetrained ? 'Yes' : 'No' ,
          Key
        };
      });
    });
  }

  trashAction(key: String) {
    this.archiveService.deleteItem(key);
  }

}
