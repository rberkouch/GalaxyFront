import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../model/user';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadStatus } from '../model/file-upload.status';
import { Role } from '../enum/role.enum';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  selectedUser : any ;
  public fileName: string="";
  public profileImage!: File;
  constructor(private userService : UserService, public authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getUsersByUsername(this.authService.username).subscribe({
        next : data =>{
      this.selectedUser = data;
      this.userService.userCourant = data;
      console.log(this.selectedUser);
      
        }
      })
    );
  }

  public onProfileImageChange(fileName: string, profileImage: File): void {
    this.fileName =  fileName;
    this.profileImage = profileImage;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
