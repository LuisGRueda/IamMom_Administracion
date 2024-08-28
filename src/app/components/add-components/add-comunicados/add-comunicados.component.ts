import { Component, OnInit } from '@angular/core';
import { claseService } from 'src/app/service/clase.service';
import { Clase } from 'src/app/models/clase.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { comunicadoService } from 'src/app/service/comunicado.service';
import { Comunicado } from 'src/app/models/comunicado.model';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-comunicados',
  templateUrl: './add-comunicados.component.html',
  styleUrls: ['./add-comunicados.component.css']
})
export class AddComunicadosComponent implements OnInit {

  constructor(private matronaservice:MatronaService, private activatedRoute:ActivatedRoute,private ComunicadosService: comunicadoService) { }
  comunicado: Comunicado =new Comunicado();
  termino:string="";
  Code: Comunicado=new Comunicado();
  model:any=[];
  loguser:any;
  Usuario:any;
  ngOnInit(): void {
    this.loguser=localStorage.getItem('token');
    this.Usuario=this.matronaservice.getMatrona(this.loguser);
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
        console.log(params['id']);
          this.model=this.ComunicadosService.VerComunicado(params['id']);
          this.Code=this.model;
          this.comunicado.id=this.Code.id;
          this.comunicado.titulo=this.Code.titulo;
          this.comunicado.contenido=this.Code.contenido;
          this.comunicado.imagen=this.Code.imagen;
          this.comunicado.fecha=this.Code.fecha;
          this.comunicado.categoria=this.Code.categoria;
          this.comunicado.autor=this.Code.autor;
          this.comunicado.estado=this.Code.estado;
      }
      else{
        this.comunicado.estado="Activo";
      }

    });
    
  }

  //
//entidad guardar REVISAR
guardar( form: NgForm ) {
  if (this.termino=="nuevo")
  {
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    this.ComunicadosService.crearComunicado( this.comunicado )
    .subscribe( resp => {
      console.log("AGREGADO");
    form.reset();
    Swal.fire({
      icon: 'success',
      title: 'Datos Guardados...',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      
      window.location.reload();
    });


    });

  }
  else{
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    this.ComunicadosService.editarComunicado(this.comunicado ,parseInt(this.termino) )
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Datos Editados...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        
        window.location.reload();
      });
    });
  }
  
  

}
}
