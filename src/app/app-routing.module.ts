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
  { path :"utilisateurs", component : UtilisateursComponent}
  
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }