import { Component, OnInit } from '@angular/core';
import { Sujet } from 'src/app/model/sujet';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { SujetService } from 'src/app/services/sujet.service';
import { AuthService } from 'src/app/services/auth.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-afficher-sujet',
  templateUrl: './afficher-sujet.component.html',
  styleUrls: ['./afficher-sujet.component.css'],
})
export class AfficherSujetComponent implements OnInit {
  sujet: Sujet = new Sujet();
  alignement = 'left';
  constructor(
    private sujetService: SujetService,
    public authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let sujetId = localStorage.getItem('editSujetId');
    if (!sujetId) {
      alert('Invalid Action!!!');
      this.router.navigate(['/admin/sujet']);
      return;
    }
    this.sujetService.getSujetById(+sujetId).subscribe((data) => {
      this.sujet = data;
    });
  }
  generatePDF(sujet: Sujet, action = 'open') {
    let docDefinition = {
      header: [
        {
	        image: 'data:image/jpeg;base64,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',
          
          width: 100,
          height: 100,
          
          
		},
        {
          text: ` ${sujet.title}`,
          alignement: 'center',
          fontSize: 30,
          margin: [0, 10]
        },
      ],
      content: [
        {
          text: `${sujet.timeConstraint} jour(s)`,
          alignement: 'center',
          fontSize: 20,
          color: 'red',
        },
        {
          text: 'Titre du projet',
          fontSize: 16,
          alignment: 'left',
          color: 'green',
        },
        { text: `${sujet.title}`, fontSize: 16, alignment: 'left' },
        {
          text: 'Contraintes de temps :',
          fontSize: 16,
          alignment: 'left',
          color: 'green',
        },
        {
          text: `Ce projet est prévu pour être réalisé en ${sujet.timeConstraint} jour(s). Il est important de bien gérer le temps et de prioriser les fonctionnalités essentielles pour assurer une livraison réussie dans les délais impartis.`,
          fontSize: 16,
          alignment: 'left',
        },
        {
          text: 'Description du Projet :',
          fontSize: 16,
          alignment: 'left',
          color: 'green',
        },
        { text: `${sujet.description}`, fontSize: 16, alignment: 'left' },
        {
          text: 'Fonctionnalités attendues :',
          fontSize: 16,
          alignment: 'left',
          color: 'green',
        },
        { text: `${sujet.functionality}`, fontSize: 16, alignment: 'left' },
        {
          text: 'Exigences techniques :',
          fontSize: 16,
          alignment: 'left',
          color: 'green',
        },
        { text: `${sujet.stackTechnique}`, fontSize: 16, alignment: 'left' },
        {
          text: 'Livraison attendue :',
          fontSize: 16,
          alignment: 'left',
          color: 'green',
        },
        { text: `${sujet.expectedDelivery}`, fontSize: 16, alignment: 'left' },
        {
          text: 'Évaluation du développeur :',
          fontSize: 16,
          alignment: 'left',
          color: 'green',
        },
        { text: `${sujet.developerRating}`, fontSize: 16, alignment: 'left' },
      ],
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition as any).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition as any).print();
    } else {
      pdfMake.createPdf(docDefinition as any).open();
    }
  }
  goToPageDisplayAllSujets() {
    this.router.navigateByUrl('/admin/sujet');
  }
}
