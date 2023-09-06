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
generatePDF() {  
  let docDefinition = {  
    header: 'Test',  
    content: 'TestPDF'  
  };  
 
  pdfMake.createPdf(docDefinition).open();  
}  
afficherAllSujets()
  {
    this.router.navigateByUrl("/admin/sujet");
  }
}
