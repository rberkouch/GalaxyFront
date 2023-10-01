import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sujet } from 'src/app/model/sujet';
import { AuthService } from 'src/app/services/auth.service';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css'],
})
export class SujetComponent implements OnInit {
  sujets!: any[];
  constructor(
    private sujetService: SujetService,
    public authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const role_admin: boolean = String(this.authService.roles).includes(
      'ADMIN'
    );
    const role_formateur: boolean = String(this.authService.roles).includes(
      'FORMATEUR'
    );
    const role_apprenant: boolean = String(this.authService.roles).includes(
      'APPRENANT'
    );

    if (role_admin || role_formateur) {
      this.getSujets();
    } else if (role_apprenant) {
      this.getSujetsByUsername();
    }
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
  deleteSujet(id: number) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer ce sujet ?');
    if (!conf) return;
    this.sujetService.deleteSujet(id).subscribe(() => {
      this.getSujets();
    });
  }
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
}
