import { Component, OnInit } from '@angular/core';
import { FormationService } from '../services/formation.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
})
export class FormationComponent implements OnInit {
  formations: any;
  constructor(
    private formationService: FormationService,
    private router: Router,
    public userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
    });
  }

  formationDetails(id: any) {
    this.formationService.formationId = id;
    this.router.navigateByUrl('admin/formation-details');
  }
}
