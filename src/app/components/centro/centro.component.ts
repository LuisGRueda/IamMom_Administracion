import { Component, OnInit } from '@angular/core';
import { CargarscriptService } from 'src/app/service/cargarScript.service';
import { CentroService } from 'src/app/service/centro.service';
import { Centro } from 'src/app/models/centro.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent implements OnInit {
  centros:Centro[ ]=[];
  pages: number = 1;
  constructor(private _Cargarscript:CargarscriptService, 
   private centroService:CentroService
   ) 
   {
   }
  ngOnInit(): void {
    this.centros = this.centroService.getCentros();
  }

  eliminar(id: any,i:any){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Usted no será capaz de recuperar este archivo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, guardalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.centroService.eliminarCentro(id).subscribe(result=>{
          this.centros.splice(i,1);
        });
        Swal.fire({
          icon: 'success',
          title: 'Se elimino Correctamente...',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          
          window.location.reload();
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'CANCELADO',
          'Se cancelo la eliminacion :)',
          'error'
        )
      }
    })
  }
  
  
}
