import { Component, OnInit } from '@angular/core';
import { Sujet } from 'src/app/model/sujet';
import * as pdfMake from 'pdfmake/build/pdfmake';  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
import { Router } from '@angular/router';
import { SujetService } from 'src/app/services/sujet.service';
import { FormBuilder, FormGroup } from '@angular/forms';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-afficher-sujet',
  templateUrl: './afficher-sujet.component.html',
  styleUrls: ['./afficher-sujet.component.css']
})
export class AfficherSujetComponent implements OnInit{  
sujet!:Sujet;
alignement="left";
constructor(private sujetService:SujetService,private router:Router){}
ngOnInit(): void {
  let sujetId = localStorage.getItem("editSujetId");
  console.log("sujet Id:::::"+sujetId);
  if(!sujetId){
    alert("Invalid Action!!!");
    this.router.navigate(['/admin/sujet']);
    return;
  }
  this.sujetService.getSujetById(+sujetId).
  subscribe(data => {this.sujet=data; console.log("data="+data)}); 
}
generatePDF(sujet:Sujet,action = 'open') {  
  let docDefinition = {  
    header: [{
    text:`${sujet.title}`,
    alignement:'center',
    fontSize: 30
  }],
    content: [ 
      {
        text:`${sujet.timeConstraint} jour(s)`,
        alignement:'center',
        fontSize: 20,
        color:'red'
      },
    {text: 'Titre du projet',
    fontSize: 16,
    alignment: 'left',
    color: 'green'},
    {text: `${sujet.title}`,
    fontSize: 16,
    alignment: 'left'},
    {text: 'Contraintes de temps :',
    fontSize: 16,
    alignment: 'left',
    color: 'green'},
    {text: `Ce projet est prévu pour être réalisé en ${sujet.timeConstraint} jour(s). Il est important de bien gérer le temps et de prioriser les fonctionnalités essentielles pour assurer une livraison réussie dans les délais impartis.`,
    fontSize: 16,
    alignment: 'left'},
    {text: 'Description du Projet :',
    fontSize: 16,
    alignment: 'left',
    color: 'green'}, 
    {text: `${sujet.description}`,
    fontSize: 16,
    alignment: 'left'},
    {text: 'Fonctionnalités attendues :',
    fontSize: 16,
    alignment: 'left',
    color: 'green'}, 
    {text: `${sujet.functionality}`,
    fontSize: 16,
    alignment: 'left'},
    {text: 'Exigences techniques :',
    fontSize: 16,
    alignment: 'left',
    color: 'green'}, 
    {text: `${sujet.stackTechnique}`,
    fontSize: 16,
    alignment: 'left'},
    {text: 'Livraison attendue :',
    fontSize: 16,
    alignment: 'left',
    color: 'green'}, 
    {text: `${sujet.expectedDelivery}`,
    fontSize: 16,
    alignment: 'left'},
    {text: 'Évaluation du développeur :',
    fontSize: 16,
    alignment: 'left',
    color: 'green'}, 
    {text: `${sujet.developerRating}`,
    fontSize: 16,
    alignment: 'left'}] 
  };  
 
  if(action==='download'){
    pdfMake.createPdf(docDefinition as any).download();
  }else if(action === 'print'){
    pdfMake.createPdf(docDefinition as any).print();      
  }else{
    pdfMake.createPdf(docDefinition as any).open();      
  }
}  
afficherAllSujets()
  {
    this.router.navigateByUrl("/admin/sujet");
  }
}
