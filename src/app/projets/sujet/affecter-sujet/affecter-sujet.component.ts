import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/model/user';
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
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  @ViewChild('checkBoxId') checkBoxId!: ElementRef;
  value:boolean=true;
  constructor(
    private userService: UserService,
    private sujetService: SujetService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.findUsersIfRoleIsApprenant();
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
  affectOrNoSujetToUser(user: User) {
    const sujetIdStringify = String(this.sujetId);
    const sujetIdNumber = Number(this.sujetId);
    if (this.checkBoxId.nativeElement.checked) {
      this.sujetService
        .affectSujetToUser(sujetIdStringify, user.userId)
        .subscribe(() => {});
    } else {
      this.sujetService
        .deleteOneFromDocumentProjetUtilisateurs(sujetIdNumber, user.userId)
        .subscribe(() => {});
    }
  }
  findAllDocumentProjetUtilisateurs(user: User) {
    this.sujetService
      .getDocumentProjetUtilisateurs(Number(this.sujetId), user.userId)
      .subscribe(() => {});
  }
}
