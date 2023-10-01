import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { DocumentProjetUtilisateurs } from 'src/app/model/document-projet-utilisateurs';
import { User } from 'src/app/model/user';
import { DocumentProjetUtilisateursService } from 'src/app/services/document-projet-utilisateurs.service';
import { SujetService } from 'src/app/services/sujet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affecter-sujet',
  templateUrl: './affecter-sujet.component.html',
  styleUrls: ['./affecter-sujet.component.css'],
})
export class AffecterSujetComponent implements OnInit {
  users!: Observable<Array<User>>;
  sujetId = localStorage.getItem('editSujetId');
  sujetIdStringify = String(this.sujetId);
  sujetIdNumber = Number(this.sujetId);
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  documentProjetUtilisateurs!:DocumentProjetUtilisateurs[];
  @ViewChild('checkBoxId') checkBoxId!: ElementRef;
  value: boolean = false;
  constructor(
    private documentProjetUtilisateursService: DocumentProjetUtilisateursService,
    private userService: UserService,
    private sujetService: SujetService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.findUsersIfRoleIsApprenant();
    this.documentProjetUtilisateursService.getAllDocumentProjetUtilisateurs().subscribe((data)=>{
      this.documentProjetUtilisateurs = data;
    })
  }
  findUsersIfRoleIsApprenant() {
    let kw = this.searchFormGroup?.value.keyword;
    this.users = this.userService.findUsersIfRoleIsApprenant(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }
  affectOrNoSujetToUser(id: string) {
    if (this.checkBoxId.nativeElement.checked) {
      this.documentProjetUtilisateursService
        .affectSujetToUser(this.sujetIdStringify, id)
        .subscribe(() => {});
    } else {
      this.documentProjetUtilisateursService
        .deleteOneFromDocumentProjetUtilisateurs(this.sujetIdNumber, id)
        .subscribe(() => {});
    }
  }
}
