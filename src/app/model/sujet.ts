import { DocumentProjet } from './document-projet';

export class Sujet extends DocumentProjet {
  description!: string;
  functionality!: string;
  stackTechnique!: string;
  expectedDelivery!: string;
  developerRating!: string;
}
