import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AppRoleService } from 'src/app/services/app-role.service';

@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.css'],
})
export class EditUtilisateurComponent implements OnInit {
  newUserFormGroup: any = null;
  appRoles!: any[];
  object1: any = new User();
  router: any;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private appRoleService: AppRoleService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newUserFormGroup = this.fb.group({
      userId: this.fb.control(this.object1.userId, [
        Validators.required,
        Validators.minLength(1),
      ]),
      firstName: this.fb.control(this.object1.firstName, [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: this.fb.control(this.object1.lastName, [
        Validators.required,
        Validators.minLength(1),
      ]),
      username: this.fb.control(this.object1.username, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.fb.control(this.object1.email, [
        Validators.required,
        Validators.email,
      ]),
      roles: this.fb.control(this.object1.roles, [Validators.required]),
      active: this.fb.control(this.object1.active, [Validators.required]),
    });
    this.userService
      .getUsersByUsername(this.route.snapshot.params['username'])
      .subscribe({
        next: (data: any) => {
          this.object1 = data;
        },
        error: (e: any) => {},
        complete: () => {
          this.newUserFormGroup = this.fb.group({
            userId: this.fb.control(this.object1.userId, [
              Validators.required,
              Validators.minLength(1),
            ]),
            firstName: this.fb.control(this.object1.firstName, [
              Validators.required,
              Validators.minLength(1),
            ]),
            lastName: this.fb.control(this.object1.lastName, [
              Validators.required,
              Validators.minLength(1),
            ]),
            username: this.fb.control(this.object1.username, [
              Validators.required,
              Validators.minLength(4),
            ]),
            email: this.fb.control(this.object1.email, [
              Validators.required,
              Validators.email,
            ]),
            roles: this.fb.control(this.object1.roles, [Validators.required]),
            active: this.fb.control(this.object1.active, [Validators.required]),
          });

          console.log(this.newUserFormGroup.value);
        },
      });
      this.findAllAppRoles();
  }
  handleSaveUser() {
    let user: User = this.newUserFormGroup.value;
    this.userService.addUser(user).subscribe({
      next: (data: any) => {
        alert('User has been successfully saved!');
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl('/customers');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // list_role: Array<Role> = [{ role: 'ADMIN' }, { role: 'USER' }];
  findAllAppRoles() {
    this.appRoleService.getAppRoles().subscribe((data) => {
      this.appRoles = data;
    });
  }
}
