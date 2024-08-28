import { Component, OnInit } from '@angular/core';
import { RegistroClase } from 'src/app/models/registroclases.model';
import { registroClaseService } from 'src/app/service/registro-clases.service';
import { NgForm } from '@angular/forms';
import { claseService } from 'src/app/service/clase.service';
import { Clase } from 'src/app/models/clase.model';
import { Embarazada } from 'src/app/models/embarazada.model';
import { embarazadaService } from 'src/app/service/embarazada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-clases',
  templateUrl: './registro-clases.component.html',
  styleUrls: ['./registro-clases.component.css']
})
export class RegistroClasesComponent implements OnInit {
  registroclase:RegistroClase=new RegistroClase();
  clases: Clase[]=[];
  embarazadas:Embarazada[]=[];
  constructor( private registroClaseService:registroClaseService,private embarazadaservice:embarazadaService, private claseService: claseService) {
    this.clases = this.claseService.getclases();
    this.embarazadas=this.embarazadaservice.getembarazadas();
    
   }

  ngOnInit(): void {
    this.registroclase.estado="Activo"
  }
  guardar(form: NgForm){
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    this.registroClaseService.crearregistroClase( this.registroclase)
    .subscribe( resp => {
      console.log("AGREGADO");
      Swal.fire({
        title: 'Se Agrego un nuevo Registro',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    });
  }

}
