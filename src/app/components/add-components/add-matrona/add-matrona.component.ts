import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-matrona',
  templateUrl: './add-matrona.component.html',
  styleUrls: ['./add-matrona.component.css']
})
export class AddMatronaComponent implements OnInit {
 
  constructor(private matronaService: MatronaService,private activatedRoute:ActivatedRoute, private router:Router) {  }
  termino:string="";
  Code: Matrona=new Matrona();
  model:any=[];
  matrona:Matrona =new Matrona();
  matro:any=[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
        console.log(params['id']);
          this.model=this.matronaService.VerMatrona(params['id']);
          this.Code=this.model;
          this.matrona.id=this.Code.id;
          this.matrona.nombre=this.Code.nombre;
          this.matrona.apellidos=this.Code.apellidos;
          this.matrona.ci=this.Code.ci;
          this.matrona.usuario=this.Code.usuario;
          this.matrona.contrasenia=this.Code.contrasenia;
          this.matrona.rol=this.Code.rol;
          this.matrona.telefono=this.Code.telefono;
          this.matrona.correo=this.Code.correo;
          this.matrona.telefono=this.Code.telefono;
          this.matrona.horario=this.Code.horario;
          this.matrona.estado=this.Code.estado;
      }
      else{
        this.matrona.estado="Activo";
      }

    });
  }
//entidad guardar
  guardar( form: NgForm ) {
    console.log(form.value);
    if (this.termino=="nuevo"){
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    this.matronaService.crearMatrona({matrona :this.matrona}  )
    .subscribe( resp => {
      form.reset();
      Swal.fire({
        icon: 'success',
        title: 'Datos Guardados...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        
        const state = { queryParams: this.activatedRoute.snapshot.queryParams };
this.router.navigateByUrl('/matrona', { replaceUrl: true, state }).then(() => {
  window.location.reload();
});
      });
    });
   
  }
  else{
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    this.matronaService.editarMatrona(this.matrona ,parseInt(this.termino) )
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Datos Editados...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        
        const state = { queryParams: this.activatedRoute.snapshot.queryParams };
this.router.navigateByUrl('/matrona', { replaceUrl: true, state }).then(() => {
  window.location.reload();
});
      });
    });
  }
  }


}