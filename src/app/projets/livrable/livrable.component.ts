import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, interval, throwError } from 'rxjs';
import { avis } from 'src/app/model/avis';
import { Livrable } from 'src/app/model/livrable';
import { AuthService } from 'src/app/services/auth.service';
import { AvisService } from 'src/app/services/avis.service';
import { LivrableService } from 'src/app/services/livrable.service';
import { UserService } from 'src/app/services/user.service';

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
  avis!:avis[];
  idLivrable!:number;
  avisAjout!:avis;
  affichageAvis=false;
  affichageAjout=false;
  showAlert = false;
  connectedUser!:string;

  constructor(
    private livrableService: LivrableService,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private userService:UserService,
    private avisService:AvisService,
    config: NgbAlertConfig
  ) {
    config.dismissible = true;
    config.type = 'success';
  }

  ngOnInit(): void {
    this.connectedUser=this.authService.username;
    this.avis = new Array();
    this.idLivrable=0;
    this.avisAjout=new avis();
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

  afficherAvis(l:Livrable)
  {
    console.log(this.connectedUser)
    if(this.affichageAvis==false)
    {
      this.affichageAvis=true;
      //this.avis=l.avis;
      this.getAvisById(l.id);
      this.idLivrable=l.id;
    }
    else
    {
      this.affichageAvis=false;
    }
   
  }

  AjouterAvis(id:number)
  {
   /* if(this.idLivrable!=0)
    {
      this.idLivrable=0;
    }
    else
    {
    this.idLivrable=id;
    //console.log(this.authService.username)
  }*/
  if(this.affichageAjout==false)
  {
    this.affichageAjout=true;
    this.idLivrable=id;
    this.userService.get(this.authService.username).subscribe(
      response=>this.avisAjout.utilisateur=response
    )
  }
  else
  {
    this.affichageAjout=false;
    this.idLivrable=0;
  }
    
  }

  validerAjout()
  {
    //console.log(this.avisAjout.texteAvis)
    //console.log(this.avisAjout.utilisateur.userId)
    this.avisAjout.livrable=new Livrable();
   this.avisAjout.livrable.id=this.idLivrable;
   this.avisService.addAvis(this.avisAjout).subscribe(
    response=>{console.log("ajout ok")
    this.affichageAjout=false;
    this.idLivrable=0
    //this.avis.push(response)
    this.getAvisById(this.idLivrable);
    this.avisAjout=new avis();
    this.showAlert = true;
    interval(3000).subscribe(() => {
      this.showAlert = false;
    })

  }
   )
  }

  getAvisById(id:number)
  {
    this.avisService.getAvisById(id).subscribe(
      response=>{
        this.avis=response;
      }
    )
  }

  deleteAvis(id:number)
  {
    this.avisService.deleteAvis(id).subscribe(
      response=>
      {
        this.getAvisById(this.idLivrable);
      }
    )
  }
}
