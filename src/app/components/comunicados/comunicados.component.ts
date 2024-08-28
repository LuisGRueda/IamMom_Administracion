import { Component, OnInit } from '@angular/core';
import { Comunicado } from 'src/app/models/comunicado.model';
import { comunicadoService } from 'src/app/service/comunicado.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.css']
})
export class ComunicadosComponent implements OnInit {
 comunicados:Comunicado[]=[];
 pages: number = 1;
  constructor(private comunicadoService:comunicadoService) {

   }
  ngOnInit(): void {
    this.comunicados = this.comunicadoService.getcomunicados();
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
        this.comunicadoService.eliminarComunicado(id).subscribe(result=>{
          this.comunicados.splice(i,1);
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
