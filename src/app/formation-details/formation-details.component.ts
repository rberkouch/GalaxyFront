import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css']
})
export class FormationDetailsComponent implements OnInit {
  routeSub: any;
  formation : any;
  idFormation : any;
  constructor(private activatedRoute: ActivatedRoute, private formationService : FormationService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.idFormation = params['id'];
    
    });

    this.formationService.getFormationById(this.idFormation).subscribe({
      next : params => {
        this.formation = params;
      }
    })
  }

}

