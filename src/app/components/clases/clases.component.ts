import { Component, OnInit } from '@angular/core';
import { Clase } from 'src/app/models/clase.model';
import { claseService } from 'src/app/service/clase.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {
  clases:Clase[ ]=[];
  pages: number = 1;
  constructor(
   private claseService:claseService, private activatedRoute:ActivatedRoute, private router:Router
   ) 
   {
  // _Cargarscript.Carga(["centros"]);
   }
  ngOnInit(): void {
    this.clases = this.claseService.getclases();
  }
  eliminar(id: any,i:any){

    this.claseService.eliminarClase(id).subscribe(result=>{
      this. clases.splice(i,1);
    });
    window.location.reload();
   

  }
  
  
}
