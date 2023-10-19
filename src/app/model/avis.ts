import { Livrable } from "./livrable";
import { User } from "./user";

export class avis {
  id!: number;
  texteAvis!: string;
  utilisateur!:User;
  livrable!:Livrable
}
