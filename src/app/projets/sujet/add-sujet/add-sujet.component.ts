import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Niveau } from 'src/app/enum/niveau.enum';
import { Sujet } from 'src/app/model/sujet';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-add-sujet',
  templateUrl: './add-sujet.component.html',
  styleUrls: ['./add-sujet.component.css']
})
export class AddSujetComponent {
 
  constructor(private sujetService : SujetService, private fb:FormBuilder, private router:Router) {}
  // sujet:Sujet=new Sujet();
  niveauType=Object.values(Niveau);
  sujetForm!:FormGroup;

  ngOnInit(): void {
    this.sujetForm = this.fb.group(
      {
        title: this.fb.control(null, [Validators.required]),
        operationDate: this.fb.control(null, [Validators.required]),
        timeConstraint: this.fb.control(null, [Validators.required]),
        description: this.fb.control(null, [Validators.required]),
        functionality: this.fb.control(null, [Validators.required]),
        expectedDelivery: this.fb.control(null, [Validators.required]),
        niveau: this.fb.control(null, [Validators.required]),
        developerRating: this.fb.control(null, [Validators.required]),
        stackTechnique: this.fb.control(null, [Validators.required]),
      }
    );
  }
  saveSujet()
  {
    this.sujetService.addSujet(this.sujetForm.value).subscribe(() => this.router.navigateByUrl("admin/sujet"));
  }
  annulerAjout()
  {
    this.router.navigateByUrl("/admin/sujet");
  }
}
