import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  selectedUser: any = {};
  nbrNotification!:number;

  subscription!: Subscription;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private notificationService:NotificationService
  ) {
    this.subscription = this.notificationService.actualisationObservable$.subscribe(() => {
      this.afficherNbrification();
    });
  }

  ngOnInit(): void {
    this.nbrNotification=0;
    this.userService.getUsersByUsername(this.authService.username).subscribe({
      next: (data) => {
        this.selectedUser = data;
        this.userService.userCourant = data;
      },
    });

    this.afficherNbrification();
    
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  goToUserProfile() {
    this.router.navigateByUrl('/admin/user');
  }

  afficherNbrification()
  {
    this.notificationService.getNotificationsNonTraitees().subscribe(
      response=>{
       this.nbrNotification=response.length;
      }
    )
  }



}
