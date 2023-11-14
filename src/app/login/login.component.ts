import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authSerivce: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authSerivce.login(username, pwd).subscribe({
      next: (data) => {
        this.authSerivce.loadProfile(data);
        if(this.authSerivce.firstLogin==0)
        {
          this.router.navigateByUrl('/admin/updatePassword');
          console.log('test 2')
        }
        else
        {
          this.router.navigateByUrl('/admin/formation');
        }
        
      },
      error: (err) => {
        console.log(err);
        this.loginError = true;

      },
    });
  }
}
