import { Component, OnInit } from '@angular/core';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/service/doctor.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
matrona:any=[];
doctor:any=[];
user:any;
rol:any;
  constructor(private router:Router,private matronaService:MatronaService,private activatedRoute:ActivatedRoute, private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.user = params['user'];
      this.matrona = this.matronaService.getMatrona(this.user);
      });
      this.activatedRoute.params.subscribe(params => {
        this.user = params['user'];
        this.doctor = this.doctorService.getDoctor(this.user);
        });
        this.comprobar();
  }
  comprobar(){
    const doct = document.querySelector('.doctor') as HTMLInputElement;
      const mat = document.querySelector('.matrona') as HTMLInputElement;
    if(this.matrona!=null){   
      doct.classList.add('invisible');
      mat.classList.remove('invisible');
    }
    {
      mat.classList.add('invisible');
      doct.classList.remove('invisible');
    }
  }
  eliminar(id: any){
    if(this.matrona!=null)
    {
      Swal.fire({
        title: 'Esta seguro?',
        text: 'Usted no será capaz de recuperar este archivo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo!',
        cancelButtonText: 'No, guardalo'
      }).then((result) => {
        if (result.isConfirmed) {
      this.matronaService.eliminarMatrona(id).subscribe(result=>{
      });
      Swal.fire({
        icon: 'success',
        title: 'Se elimino Correctamente...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        
        const visible:any=document.querySelector('#head'); 
        visible.style.display='none'; 
       this.router.navigate(['login']);
       localStorage.clear();
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
    else{
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
          });
          Swal.fire({
            icon: 'success',
            title: 'Se elimino Correctamente...',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            
            const visible:any=document.querySelector('#head'); 
            visible.style.display='none'; 
           this.router.navigate(['login']);
           localStorage.clear();
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
}

