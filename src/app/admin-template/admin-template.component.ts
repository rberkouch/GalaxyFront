import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css'],
})
export class AdminTemplateComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.authService.firstLogin==0)
        {
          this.router.navigateByUrl('/admin/updatePassword');
        }
        else
        {
          this.router.navigateByUrl('/admin/formation');
        }
    //this.router.navigateByUrl('/admin/formation');
  }
}
