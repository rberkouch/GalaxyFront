import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Level } from 'src/app/enum/level.enum';
import { LivrableService } from 'src/app/services/livrable.service';

@Component({
  selector: 'app-add-livrable',
  templateUrl: './add-livrable.component.html',
  styleUrls: ['./add-livrable.component.css'],
})
export class AddLivrableComponent {
  constructor(
    private livrableService: LivrableService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  levelType = Object.values(Level);
  livrableForm!: FormGroup;

  ngOnInit(): void {
    this.livrableForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      operationDate: this.fb.control(null, [Validators.required]),
      timeConstraint: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, [Validators.required]),
      repoName: this.fb.control(null, [Validators.required]),
      gitUrl: this.fb.control(null, [Validators.required]),
    });
  }
  saveLivrable() {
    this.livrableService
      .addLivrable(this.livrableForm.value)
      .subscribe(() => this.router.navigateByUrl('admin/livrable'));
  }
  annulerAjout() {
    this.router.navigateByUrl('/admin/livrable');
  }
}
