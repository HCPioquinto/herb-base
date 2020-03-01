import { firestore } from 'firebase';

export interface IFeedback {
  Image?: string;
  FeedbackSent?:  firestore.FieldValue;
  PlantNameCorrection?: string;
  PlantNameResult?: string;
  Key?: string;
}
