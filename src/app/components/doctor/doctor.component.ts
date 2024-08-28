import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Centro } from 'src/app/models/centro.model';
import { Doctor } from 'src/app/models/doctor.model';
import { CentroService } from 'src/app/service/centro.service';
import { DoctorService } from 'src/app/service/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  pages: number = 1;
  doctor:Doctor []=[];
  centros:Centro[ ]=[];
  constructor(private doctorService: DoctorService , private router: Router, private centroService:CentroService) { }

  ngOnInit(): void {
    this.doctor = this.doctorService.getDoctors();
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
        this.doctorService.eliminarDoctor(id).subscribe(result=>{
          this.doctor.splice(i,1);
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
 verdoctor(ci: any){
  this.router.navigate(['/doct', ci]);//hola mundo
 }
}
