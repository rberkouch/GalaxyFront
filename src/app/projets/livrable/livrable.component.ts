import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Livrable } from 'src/app/model/livrable';
import { AuthService } from 'src/app/services/auth.service';
import { LivrableService } from 'src/app/services/livrable.service';

@Component({
  selector: 'app-livrable',
  templateUrl: './livrable.component.html',
  styleUrls: ['./livrable.component.css'],
})
export class LivrableComponent implements OnInit {
  livrables!: Observable<Array<Livrable>>;
  livrables2!: any;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(
    private livrableService: LivrableService,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    if (
      this.authService.roles == 'ADMIN USER' ||
      this.authService.roles == 'FORMATEUR' ||
      this.authService.roles == 'ADMIN FORMATEUR'
    ) {
      this.handleSearchLivrables();
    } else {
      this.getLivrablesByUsername();
    }
  }

  deleteLivrable(id: number) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer ce livrable ?');
    if (!conf) return;
    this.livrableService.deleteLivrable(id).subscribe(() => {
      this.handleSearchLivrables();
    });
  }

  goToPageAddLivrable() {
    this.router.navigateByUrl('/admin/addlivrable');
  }

  handleSearchLivrables() {
    let kw = this.searchFormGroup?.value.keyword;
    this.livrables = this.livrableService.searchLivrable(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  getLivrablesByUsername() {
    this.livrableService
      .getLivrablesByUsername(this.authService.username)
      .subscribe((data) => {
        this.livrables2 = data;
      });
  }
}
