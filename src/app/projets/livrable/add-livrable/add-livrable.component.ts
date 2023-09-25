import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Level } from 'src/app/enum/level.enum';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { LivrableService } from 'src/app/services/livrable.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-livrable',
  templateUrl: './add-livrable.component.html',
  styleUrls: ['./add-livrable.component.css'],
})
export class AddLivrableComponent implements OnInit {
  levelType = Object.values(Level);
  livrableForm!: FormGroup;
  utilisateurForm!: FormGroup;
  utilisateur: User = new User();

  constructor(
    private livrableService: LivrableService,
    public authService: AuthService,
    public userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livrableForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      operationDate: this.fb.control(null, [Validators.required]),
      timeConstraint: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, [Validators.required]),
      repoName: this.fb.control(null, [Validators.required]),
      gitUrl: this.fb.control(null, [Validators.required]),
      utilisateurs: this.fb.array([]),
    });
    this.userService.get(this.authService.username).subscribe((data) => {
      this.utilisateur = data;
      this.utilisateurs.push(
        this.fb.group({
          userId: [this.utilisateur.userId],
        })
      );
    });
  }

  get utilisateurs(): FormArray {
    return this.livrableForm.get('utilisateurs') as FormArray;
  }

  saveLivrable() {
    this.livrableService
      .addLivrable(this.livrableForm.value)
      .subscribe(() => this.router.navigateByUrl('admin/livrable'));
  }

  cancelSaveLivrable() {
    this.router.navigateByUrl('/admin/livrable');
  }
}
