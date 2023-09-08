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
    console.log(this.formLogin.value);
    this.authSerivce.login(username, pwd).subscribe({
      next: (data) => {
        console.log(data);
        this.authSerivce.loadProfile(data);
        this.router.navigateByUrl('/admin/formation');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
