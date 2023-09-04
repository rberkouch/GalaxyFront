import { User } from "./user";

export class DocumentProjet {
    id!:number;
	operationDate!:Date;
	title!:string;
	description!:string;
	timeConstraint!:number;
    utilisateurs!:User[];
}
