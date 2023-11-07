import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { notification } from 'src/app/model/notification';
import { NotificationService } from 'src/app/services/notification.service';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications!:notification[];

  

  constructor(private notificationService:NotificationService,private sujetService:SujetService)
  {

  }
  ngOnInit(): void {
    this.notifications=[];
    this.afficherNotification();
  }

  validerSuppression(notification:notification)
  {
    let sujet =notification.sujet;
    sujet.statut=0;
    this.sujetService.updateSujet(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )
  }
  afficherNotification()
  {
    this.notificationService.getNotificationsNonTraitees().subscribe(
      response=>{
        this.notifications=response;
      }
    )
  }

  RejeterSuppression(notification:notification)
  {

    let sujet =notification.sujet;
    sujet.statut=2;
    this.sujetService.updateSujet(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )

  }

  validerLajout(notification:notification)
  {
    let sujet =notification.sujet;
    sujet.statut=2;
    this.sujetService.updateSujet(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )
  }

  AnnulerLajout(notification:notification)
  {
    let sujet =notification.sujet;
    sujet.statut=0;
    this.sujetService.updateSujet(sujet).subscribe(
      response=>{
        console.log('modif sujet ok');
      }
    )

    notification.statut=1;
    this.notificationService.updateNotification(notification).subscribe(
      response=>{
        console.log('modif notification ok');
        this.afficherNotification();
        this.notificationService.actualiser();
      }
    )
  }

}
