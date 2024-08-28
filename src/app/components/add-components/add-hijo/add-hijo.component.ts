import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hijo } from 'src/app/models/hijo.model';
import { hijoService } from 'src/app/service/hijo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatronaService } from 'src/app/service/matrona.service';
import { Matrona } from 'src/app/models/matrona.model';
import { embarazadaService } from 'src/app/service/embarazada.service';

@Component({
  selector: 'app-add-hijo',
  templateUrl: './add-hijo.component.html',
  styleUrls: ['./add-hijo.component.css']
})
export class AddHijoComponent implements OnInit {

  constructor(private _embarazadaService:embarazadaService, private matronaservice:MatronaService,private hijoService:hijoService,private activatedRoute:ActivatedRoute, private router:Router) { }
  hijo: Hijo=new Hijo();
  termino:string="";
  matronas:Matrona[]=[];
  Code: Hijo=new Hijo();
  model:any=[];
  embarazada:any = [];
  ngOnInit(): void {
    this.matronas=this.matronaservice.getMatronasAct();
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
          this.model=this.hijoService.gethij(params['id']);
          this.Code=this.model;
          this.hijo.id=this.Code.id;
          this.hijo.codigoNacido=this.Code.codigoNacido;
          this.hijo.nombre=this.Code.nombre;
          this.hijo.apellidos=this.Code.apellidos;
          this.hijo.nombre_padre=this.Code.nombre_padre;
          this.hijo.nombre_madre=this.Code.nombre_madre;
          this.hijo.nombre_matrona=this.Code.nombre_matrona;
          this.hijo.fechahora_nacido=this.Code.fechahora_nacido;
          this.hijo.anomalias=this.Code.anomalias;
          this.hijo.tipo_sangre=this.Code.tipo_sangre;
          this.hijo.anomalias=this.Code.anomalias;
          this.hijo.notas=this.Code.notas;
          this.hijo.estado=this.Code.estado;
      }
      else{
        this.embarazada = this._embarazadaService.getembarazadaCi(params['ci']);
        this.hijo.estado="Activo";
        this.hijo.nombre_madre=this.embarazada.ci.toString();
      }

    });
  }

  //AGREGAR EMBARAZADA
  guardar( form: NgForm ) {
    console.log(form.value)
    if (this.termino=="nuevo")
    {
      if ( form.invalid ) {
        console.log('Formulario no válido');
        return;
      }
      console.log(form);
      this.hijoService.crearHijo({hijo:this.hijo })
      .subscribe( resp => {
        console.log("AGREGADO");
      form.reset();
         
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
    else{
      if ( form.invalid ) {
        console.log('Formulario no válido');
        return;
      }
      this.hijoService.editarHijo(this.hijo ,parseInt(this.termino) )
      .subscribe( resp => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Editados...',
          showConfirmButton: false,
          timer: 1500
        })
  
      });
    }
    
    

  }
}
