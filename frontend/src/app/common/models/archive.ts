import { firestore } from 'firebase';

export interface IArchives {
  Image: string;
  FeedbackSent: firestore.FieldValue;
  ArchivedDate: firestore.FieldValue;
  Remarks?: string;
  IsRetrained: boolean;
  Key?: string;
}
