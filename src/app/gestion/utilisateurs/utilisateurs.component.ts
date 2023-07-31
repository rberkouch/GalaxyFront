
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  users! : Observable<Array<User>>;
  errorMessage!: string;
  searchFormGroup : FormGroup | undefined;
  constructor(private userService : UserService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchUsers();
  }
  handleSearchUsers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.users=this.userService.searchUsers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  goToAddUserPage(){
    this.router.navigateByUrl("/admin/adduser")
  }

  handleDeleteUser(c: User) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.userService.deleteUser(c.userId).subscribe({
      next : (resp) => {
        this.users=this.users.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(customer: User) {
    this.router.navigateByUrl("/customer-accounts/"+customer.userId,{state :customer});
  }

  currentTutorial: any = {};
  currentIndex = -1;
  setActiveUser (user: User, index: number): void {
    this.currentTutorial = user;
    this.currentIndex = index;
  }

}
