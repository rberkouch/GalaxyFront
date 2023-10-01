import { DocumentProjetUtilisateurs } from "./document-projet-utilisateurs";

export class User {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public profileImageUrl: string;
  public active: boolean;
  public roles: any;
  public documentProjetUtilisateurs!: DocumentProjetUtilisateurs[];

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.profileImageUrl = '';
    this.active = false;
    this.roles = null;
  }
}
