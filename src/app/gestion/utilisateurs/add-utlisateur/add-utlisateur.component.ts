import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

export class Role {
  public role: string;

  constructor() {
    this.role = '';
  }
}

@Component({
  selector: 'app-add-utlisateur',
  templateUrl: './add-utlisateur.component.html',
  styleUrls: ['./add-utlisateur.component.css'],
})
export class AddUtlisateurComponent {
  newUserFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.newUserFormGroup = this.fb.group({
      firstName: this.fb.control(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: this.fb.control(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      username: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      roles: this.fb.control(null, [Validators.required]),
      active: this.fb.control(true, [Validators.required]),
    });
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

  list_role: Array<Role> = [{ role: 'ADMIN' }, { role: 'USER' }];
}
