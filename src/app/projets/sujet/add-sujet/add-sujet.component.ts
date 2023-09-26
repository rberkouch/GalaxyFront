import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Level } from 'src/app/enum/level.enum';
import { AuthService } from 'src/app/services/auth.service';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-add-sujet',
  templateUrl: './add-sujet.component.html',
  styleUrls: ['./add-sujet.component.css'],
})
export class AddSujetComponent implements OnInit {
  levelType = Object.values(Level);
  sujetForm!: FormGroup;
  
  constructor(
    private sujetService: SujetService,
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.sujetForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      operationDate: this.fb.control(null, [Validators.required]),
      timeConstraint: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      functionality: this.fb.control(null, [Validators.required]),
      expectedDelivery: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, [Validators.required]),
      developerRating: this.fb.control(null, [Validators.required]),
      stackTechnique: this.fb.control(null, [Validators.required]),
    });
  }
  saveSujet() {
    this.sujetService
      .addSujet(this.sujetForm.value)
      .subscribe(() => this.router.navigateByUrl('admin/sujet'));
  }
  cancelSaveSujet() {
    this.router.navigateByUrl('/admin/sujet');
  }
}
