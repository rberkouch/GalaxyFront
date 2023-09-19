import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affecter-sujet',
  templateUrl: './affecter-sujet.component.html',
  styleUrls: ['./affecter-sujet.component.css']
})
export class AffecterSujetComponent implements OnInit{
  users!: Observable<Array<User>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.findUsersIfRoleIsTest();
  }
  findUsersIfRoleIsTest() {
    let kw = this.searchFormGroup?.value.keyword;
    this.users = this.userService.findUsersIfRoleIsTest(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

}
