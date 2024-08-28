import { Component, OnInit } from '@angular/core';
import { Embarazada } from 'src/app/models/embarazada.model';
import { NgForm } from '@angular/forms';
import { embarazadaService } from 'src/app/service/embarazada.service';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-embarazada',
  templateUrl: './add-embarazada.component.html',
  styleUrls: ['./add-embarazada.component.css']
})
export class AddEmbarazadaComponent implements OnInit {

  constructor(private embarazadaService:embarazadaService, private matronaservice:MatronaService,private activatedRoute:ActivatedRoute, private router:Router) { }
  embarazada: Embarazada=new Embarazada();
  matronas:Matrona[]=[];
  termino:string="";
  Code: Embarazada=new Embarazada();
  model:any=[];
  ngOnInit(): void {
    this.matronas=this.matronaservice.getMatronasAct();
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
        console.log(params['id']);
          this.model=this.embarazadaService.VerEmbarazada(params['id']);
          this.Code=this.model;
          this.embarazada.id=this.Code.id;
          this.embarazada.nombre=this.Code.nombre;
          this.embarazada.apellidos=this.Code.apellidos;
          this.embarazada.ci=this.Code.ci;
          this.embarazada.nroseguro=this.Code.nroseguro;
          this.embarazada.direccion=this.Code.direccion;
          this.embarazada.edad=this.Code.edad;
          this.embarazada.telefono=this.Code.telefono;
          this.embarazada.registro=this.Code.registro;
          this.embarazada.matronaId=this.Code.matronaId;
          this.embarazada.estado=this.Code.estado;
      }
      else{
        this.embarazada.estado="Activo";
        this.embarazada.registro="CS";
      }

    });
  }

  //AGREGAR EMBARAZADA
  guardar( form: NgForm ) {
    if (this.termino=="nuevo"){
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    this.embarazadaService.crearembarazada({ embarazada: this.embarazada }).subscribe( resp => {
      form.reset();
      Swal.fire({
        icon: 'success',
        title: 'Datos Guardados...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
       const state = { queryParams: this.activatedRoute.snapshot.queryParams };
this.router.navigateByUrl('/embarazadas', { replaceUrl: true, state }).then(() => {
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
    this.embarazadaService.editarembarazada(this.embarazada ,parseInt(this.termino) )
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Datos Editados...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        
        const state = { queryParams: this.activatedRoute.snapshot.queryParams };
this.router.navigateByUrl('/embarazadas', { replaceUrl: true, state }).then(() => {
  window.location.reload();

});
      });
    });
  }
}
}
