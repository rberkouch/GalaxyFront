import { Level } from "../enum/level.enum";
import { User } from "./user";

export class DocumentProjet {
  id!: number;
  operationDate!: Date;
  title!: string;
  description!: string;
  timeConstraint!: number;
  level!: Level;
  utilisateurs!: User[];
}
