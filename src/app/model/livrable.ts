import { avis } from './avis';
import { DocumentProjet } from './document-projet';

export class Livrable extends DocumentProjet {
  repoName!: string;
  gitUrl!: string;
  avis!:avis[]
}
