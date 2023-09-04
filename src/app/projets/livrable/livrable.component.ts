import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LivrableService } from 'src/app/services/livrable.service';

@Component({
  selector: 'app-livrable',
  templateUrl: './livrable.component.html',
  styleUrls: ['./livrable.component.css']
})
export class LivrableComponent {
  livrables!:any[];
  constructor(private livrableService:LivrableService,private router:Router){}
  ngOnInit(): void {
    this.getLivrables();
  }
  getLivrables(){
    this.livrableService.getLivrables().subscribe(data =>{this.livrables=data});
  }
  supprimerLivrable(id:number){
    this.livrableService.deleteLivrable(id).subscribe(()=>{this.getLivrables()});
  }
}
