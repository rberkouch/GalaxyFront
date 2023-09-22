import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../services/formation.service';
import { Formation } from '../model/formation';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css'],
})
export class FormationDetailsComponent implements OnInit {
  routeSub: any;
  formation:Formation=new Formation();
  idFormation: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.idFormation = params['id'];
    });

    this.formationService.getFormationById(this.idFormation).subscribe({
      next: (params) => {
        this.formation = params;
      },
    });
  }
}
