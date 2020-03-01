import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { IArchives } from "../models/archive";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ArchiveService {
  archivesList: AngularFirestoreCollection<IArchives>;
  onArchivesChange: BehaviorSubject<any>;
  archiveDoc: AngularFirestoreDocument<IArchives>
  collectionName: string = 'archive';

  constructor(public afs: AngularFirestore) {
    this.onArchivesChange = new BehaviorSubject({});
    this.archivesList = this.afs.collection(this.collectionName);
  }

  getItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.archivesList.snapshotChanges().pipe(
        map(outerData => outerData.map(innerData => ({
          Key: innerData.payload.doc.id,
          ...innerData.payload.doc.data(),
        })))
      ).subscribe(response => {
        this.onArchivesChange.next(response);
        resolve(response);
      });
    });
  }

  addItem(item: IArchives): void {
    this.archivesList.add(item);
  }

  deleteItem(key: String): void {
    this.archiveDoc = this.afs.doc(`${this.collectionName}/${key}`);
    this.archiveDoc.delete();
  }
}
