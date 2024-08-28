import { Component, OnInit } from '@angular/core';
import { claseService } from 'src/app/service/clase.service';
import { Clase } from 'src/app/models/clase.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/models/centro.model';
import { CentroService } from 'src/app/service/centro.service';
import { MatronaService } from 'src/app/service/matrona.service';
import { Matrona } from 'src/app/models/matrona.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-clases',
  templateUrl: './add-clases.component.html',
  styleUrls: ['./add-clases.component.css']
})
export class AddClasesComponent implements OnInit {

  constructor(private matronaservice:MatronaService, private activatedRoute:ActivatedRoute,private claseService: claseService, private centroservice:CentroService, private router:Router) { }
  clase: Clase=new Clase();
  centros:Centro[]=[];
  matronas:Matrona[]=[];
  termino:string="";
  Code: Clase=new Clase();
  model:any=[];
  ngOnInit(): void {
    
    this.centros=this.centroservice.getCentrosAct();
    this.matronas=this.matronaservice.getMatronasAct();
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
    });
  if(this.termino!="nuevo"){
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
        console.log(params['id']);
          this.model=this.claseService.Verclase(params['id']);
          this.Code=this.model;
          this.clase.id=this.Code.id;
          this.clase.nombre=this.Code.nombre;
          this.clase.descripcion=this.Code.descripcion;
          this.clase.fechahora=this.Code.fechahora;
          this.clase.matronaid=this.Code.matronaid;
          this.clase.centroid=this.Code.centroid;
          this.clase.estado=this.Code.estado;
      }
      else{
        this.clase.estado="Activo";
      }

    });
  }
  }

  //
//entidad guardar
  guardar( form: NgForm ) {
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    console.log(form);
    if(this.termino=="nuevo"){
      this.claseService.crearClase( this.clase )
      .subscribe( resp => {
        form.reset();
      Swal.fire({
        icon: 'success',
        title: 'Datos Guardados...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        
        const state = { queryParams: this.activatedRoute.snapshot.queryParams };
        this.router.navigateByUrl('/clases', { replaceUrl: true, state }).then(() => {
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
      this.claseService.editarClase( this.clase,parseInt(this.termino) )
      .subscribe( resp => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Editados...',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          
          const state = { queryParams: this.activatedRoute.snapshot.queryParams };
        this.router.navigateByUrl('/clases', { replaceUrl: true, state }).then(() => {
          window.location.reload();
        });
        });
      });
    }
  }


}
