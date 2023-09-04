import { Component, OnInit } from '@angular/core';
import { Sujet } from 'src/app/model/sujet';
import * as pdfMake from 'pdfmake/build/pdfmake';  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-afficher-sujet',
  templateUrl: './afficher-sujet.component.html',
  styleUrls: ['./afficher-sujet.component.css']
})
export class AfficherSujetComponent implements OnInit{
sujet: Sujet = new Sujet();
constructor(){}
ngOnInit(): void {
    
}
generatePDF() {  
  let docDefinition = {  
    header: 'Test',  
    content: 'TestPDF'  
  };  
 
  pdfMake.createPdf(docDefinition).open();  
}  
}
