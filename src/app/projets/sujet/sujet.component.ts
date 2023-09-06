import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sujet } from 'src/app/model/sujet';
import { SujetService } from 'src/app/services/sujet.service';


@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css']
})
export class SujetComponent implements OnInit{
  sujets!:any[];
  constructor(private sujetService:SujetService,private router:Router){}
  ngOnInit(): void {
    this.getSujets();
  }
  getSujets(){
    this.sujetService.getSujets().subscribe(data =>{this.sujets=data});
  }
  supprimerSujet(id:number){
    this.sujetService.deleteSujet(id).subscribe(()=>{this.getSujets()});
  }
  afficherSujet(sujet:Sujet)
  {
    localStorage.removeItem("editSujetId");
    localStorage.setItem("editSujetId",sujet.id.toString());
    this.router.navigateByUrl("/admin/affichersujet/" + sujet.id);
  }
  ajouterSujet()
  {
    this.router.navigateByUrl("/admin/addsujet");
  }
}
