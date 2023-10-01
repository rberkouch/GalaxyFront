import { DocumentProjet } from "./document-projet";
import { DocumentProjetUtilisateursKey } from "./document-projet-utilisateurs-key";
import { User } from "./user";

export class DocumentProjetUtilisateurs {
  documentProjetUtilisateursKey!:DocumentProjetUtilisateursKey;
  documentProjet!: DocumentProjet;
  utilisateur!: User;
  selected!: boolean;
}
