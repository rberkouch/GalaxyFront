import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  selectedUser : any;
  constructor(public authService : AuthService, private router : Router, public userService : UserService ){ }

  ngOnInit(): void {
    this.userService.getUsersByUsername(this.authService.username).subscribe({
      next : data =>{
    this.selectedUser = data;
    this.userService.userCourant = data;
    console.log(this.selectedUser);
    
      }
    })
  }

  handleLogout(){
    this.authService.logout();;
    this.router.navigateByUrl("/login");
  }

  goToUserProfile(){
    this.router.navigateByUrl("/admin/user");
  }

}
