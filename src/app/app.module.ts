import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { BrowserModule } from "@angular/platform-browser";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AdminTemplateComponent } from "./admin-template/admin-template.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FormationDetailsComponent } from "./formation-details/formation-details.component";
import { FormationComponent } from "./formation/formation.component";
import { DocumentsComponent } from "./gestion/documents/documents.component";
import { FormationsComponent } from "./gestion/formations/formations.component";
import { ModulesComponent } from "./gestion/modules/modules.component";
import { UtilisateursComponent } from "./gestion/utilisateurs/utilisateurs.component";
import { HomeComponent } from "./home/home.component";
import { AppHttpInterceptor } from "./interceptors/app-http.interceptor";
import { LoginComponent } from "./login/login.component";

import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";
import { UserComponent } from "./user/user.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUtlisateurComponent } from './gestion/utilisateurs/add-utlisateur/add-utlisateur.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { EditUtilisateurComponent } from './gestion/utilisateurs/edit-utilisateur/edit-utilisateur.component';
import { AddFormationComponent } from './gestion/formations/add-formation/add-formation.component';
import { UpdateFormationComponent } from './gestion/formations/update-formation/update-formation.component';
import { UpdateModuleComponent } from './gestion/modules/update-module/update-module.component';
import { AddModuleComponent } from "./gestion/modules/add-module/add-module.component";
import { SujetComponent } from './projets/sujet/sujet.component';
import { LivrableComponent } from './projets/livrable/livrable.component';
import { AfficherSujetComponent } from './projets/sujet/afficher-sujet/afficher-sujet.component';
import { AddSujetComponent } from './projets/sujet/add-sujet/add-sujet.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent,
    UserComponent,
    HomeComponent,
    FormationComponent,
    FormationDetailsComponent,
    FileUploadComponent,
    UtilisateursComponent,
    FormationsComponent,
    ModulesComponent,
    DocumentsComponent,
    AddUtlisateurComponent,
    EditUtilisateurComponent,
    AddFormationComponent,
    UpdateFormationComponent,
    AddModuleComponent,
    UpdateModuleComponent,
    SujetComponent,
    LivrableComponent,
    AfficherSujetComponent,
    AddSujetComponent
  ],
  imports: [
    
   
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgbModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
