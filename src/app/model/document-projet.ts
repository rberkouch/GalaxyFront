import { Niveau } from "../enum/niveau.enum";
import { User } from "./user";

export class DocumentProjet {
    id!:number;
	operationDate!:Date;
	title!:string;
	description!:string;
	timeConstraint!:number;
	niveau!:Niveau;
    utilisateurs!:User[];
}
