import { DocumentProjet } from './document-projet';

export class Livrable extends DocumentProjet {
  repoNameBack!: string;
  repoNameFront!: string;
  gitUrlBack!: string;
  gitUrlFront!: string;
}
