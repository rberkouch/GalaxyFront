import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { UserComponent } from './user/user.component';
import { FormationComponent } from './formation/formation.component';
import { FormationDetailsComponent } from './formation-details/formation-details.component';
import { FormationsComponent } from './gestion/formations/formations.component';
import { DocumentsComponent } from './gestion/documents/documents.component';
import { ModulesComponent } from './gestion/modules/modules.component';
import { UtilisateursComponent } from './gestion/utilisateurs/utilisateurs.component';
import { AddUtlisateurComponent } from './gestion/utilisateurs/add-utlisateur/add-utlisateur.component';
import { EditUtilisateurComponent } from './gestion/utilisateurs/edit-utilisateur/edit-utilisateur.component';
import { AddFormationComponent } from './gestion/formations/add-formation/add-formation.component';
import { UpdateFormationComponent } from './gestion/formations/update-formation/update-formation.component';
import { AddModuleComponent } from './gestion/modules/add-module/add-module.component';
import { UpdateModuleComponent } from './gestion/modules/update-module/update-module.component';
import { SujetComponent } from './projets/sujet/sujet.component';
import { LivrableComponent } from './projets/livrable/livrable.component';
import { AfficherSujetComponent } from './projets/sujet/afficher-sujet/afficher-sujet.component';
import { AddSujetComponent } from './projets/sujet/add-sujet/add-sujet.component';


const routes: Routes = [
  { path :"login", component : LoginComponent},
  { path :"", redirectTo : "/login",pathMatch:"full" },
  { path :"admin", component : AdminTemplateComponent , canActivate : [AuthenticationGuard], children : [  
  { path :"notAuthorized", component : NotAuthorizedComponent},
  { path :"user", component : UserComponent},
  { path :"formation", component : FormationComponent},
  { path :"formation-details/:id", component : FormationDetailsComponent},
  { path :"formations", component : FormationsComponent},
  { path :"documents", component : DocumentsComponent},
  { path :"modules", component : ModulesComponent},
  { path :"utilisateurs", component : UtilisateursComponent},
  { path :"adduser", component : AddUtlisateurComponent},
  { path :"edituser/:username", component : EditUtilisateurComponent},
  { path :"addformation", component : AddFormationComponent},
  { path :"updateformation/:id", component : UpdateFormationComponent},
  { path :"addmodule", component : AddModuleComponent},
  { path :"updatemodule/:id", component : UpdateModuleComponent},
  { path :"affichersujet/:id", component : AfficherSujetComponent},
  { path :"addsujet", component : AddSujetComponent},
  { path :"sujet", component : SujetComponent},
  { path :"livrable", component : LivrableComponent}

]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
