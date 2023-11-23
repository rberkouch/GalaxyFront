import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { notification } from 'src/app/model/notification';
import { Sujet } from 'src/app/model/sujet';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SujetService } from 'src/app/services/sujet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css'],
})
export class SujetComponent implements OnInit {
  sujets!: any[];
  modalReference: any;
  notificationMessage: string = '';
  sujet!: Sujet;
  notification!: notification;
  constructor(
    private sujetService: SujetService,
    public authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    if (
      this.authService.roles == 'ADMIN USER' ||
      this.authService.roles == 'FORMATEUR'
    ) {
      this.getSujets();
    } else {
      this.getSujetsByUsername();
    }
    this.notification = new notification();
  }
  getSujets() {
    this.sujetService.getSujets().subscribe((data) => {
      this.sujets = data;
    });
  }
  getSujetsByUsername() {
    this.sujetService
      .getSujetsByUsername(this.authService.username)
      .subscribe((data) => {
        this.sujets = data;
      });
  }
  /*deleteSujet(id: number) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer ce sujet ?');
    if (!conf) return;
    this.sujetService.deleteSujet(id).subscribe(() => {
      this.getSujets();
    });
  }*/
  gotToPageDisplaySujet(sujet: Sujet) {
    localStorage.removeItem('editSujetId');
    localStorage.setItem('editSujetId', sujet.id.toString());
    this.router.navigateByUrl('/admin/affichersujet/' + sujet.id);
  }
  goToPageAddSujet() {
    this.router.navigateByUrl('/admin/addsujet');
  }
  goToPageAffectSujet(sujet: Sujet) {
    localStorage.removeItem('editSujetId');
    localStorage.setItem('editSujetId', sujet.id.toString());
    this.router.navigateByUrl('/admin/affectersujet');
  }

  openModal(content: any, sujet: Sujet) {
    this.sujet = sujet;

    this.userService
      .get(this.authService.username)
      .subscribe((response) => (this.notification.utilisateur = response));

    this.modalReference = this.modalService.open(content, { centered: true });
  }

  saveNotification() {
    this.notification.message = this.notificationMessage;
    this.notification.sujet = this.sujet;
    this.notification.type = 'suppression';
    this.notificationService
      .addNotification(this.notification)
      .subscribe((response) => {
        this.modalReference.close('Save click');
        this.sujet.statut = 3;
        this.sujetService.updateSujetStatus(this.sujet).subscribe((response) => {
          this.getSujets();
        });
      });
  }
  afficherButton(sujet: Sujet) {
    return sujet.statut == 3;
  }
}
