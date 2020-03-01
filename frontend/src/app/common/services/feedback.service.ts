import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { IFeedback } from "../models/feedback";

@Injectable({
  providedIn: "root"
})
export class FeedbackService {
  onFeedbackChange: BehaviorSubject<any>;
  feedbackCollection: AngularFirestoreCollection<IFeedback>;
  feedbackData: IFeedback[];
  feedbackDoc: AngularFirestoreDocument<IFeedback>;
  collectionName: string = "feedback";

  constructor(public afs: AngularFirestore) {
    this.onFeedbackChange = new BehaviorSubject({});
    this.feedbackCollection = this.afs.collection(this.collectionName);
  }

  getItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.feedbackCollection
        .snapshotChanges()
        .pipe(
          map(outerData =>
            outerData.map(innerData => ({
              Key: innerData.payload.doc.id,
              ...innerData.payload.doc.data()
            }))
          )
        )
        .subscribe(response => {
          this.onFeedbackChange.next(response);
          resolve(response);
        });
    });
  }

  deleteItem(key: string) {
    this.feedbackDoc = this.afs.doc(`${this.collectionName}/${key}`);
    this.feedbackDoc.delete();
  }

  addItem(item: IFeedback) {
    this.feedbackCollection.add(item);
  }
}
