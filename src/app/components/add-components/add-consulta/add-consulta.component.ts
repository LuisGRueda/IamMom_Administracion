import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/service/consulta.service';
import { embarazadaService } from 'src/app/service/embarazada.service';
import Swal from 'sweetalert2';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-add-consulta',
  templateUrl: './add-consulta.component.html',
  styleUrls: ['./add-consulta.component.css']
})
export class AddConsultaComponent implements OnInit {

  constructor(private DoctorService:DoctorService,private _embarazadaService:embarazadaService,private ConsultaService: ConsultaService,private activatedRoute:ActivatedRoute, private router:Router) { }
  termino:string="";
  consulta: Consulta=new Consulta();
  Code: Consulta=new Consulta();
  model:any=[];
  embarazada:any = [];
  doctor:any=[];
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
        console.log(params['id']);
          this.model=this.ConsultaService.Verconsulta(params['id']);
          this.Code=this.model;
          this.consulta.id=this.Code.id;
          this.consulta.nombrePaciente=this.Code.nombrePaciente;
          this.consulta.apellidosPaciente=this.Code.apellidosPaciente;
          this.consulta.fechaConsulta=this.Code.fechaConsulta;
          this.consulta.sintomaPrincipal=this.Code.sintomaPrincipal;
          this.consulta.diagnostico=this.Code.diagnostico;
          this.consulta.tratamiento=this.Code.tratamiento;
          this.consulta.observaciones=this.Code.observaciones;
          this.consulta.doctor=this.Code.doctor;
          this.consulta.estado=this.Code.estado;
      }
      else{
        this.embarazada = this._embarazadaService.getembarazadaCi(params['ci']);
        const user=localStorage.getItem('token');
        this.doctor=this.DoctorService.VerDoctor(user||"master");
        this.consulta.estado="Activo";
        this.consulta.doctor=this.doctor.ci;;
        this.consulta.nombrePaciente=this.embarazada.ci.toString();
        this.consulta.apellidosPaciente=this.embarazada.nombre+" "+this.embarazada.apellidos;
      }

    });
    
  }
//entidad guardar
guardar( form: NgForm ) {
  console.log(form.value);
  if (this.termino=="nuevo")
  {
    if ( form.invalid ) {
      console.log('Formulario no válido');
      Swal.fire({
        icon: 'warning',
        title: 'Verifica Los datos igresados en el Formulario',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    console.log(form);
    this.ConsultaService.crearConsulta( this.consulta )
    .subscribe( resp => {
      console.log("AGREGADO");
      this.router.navigate(['/consulta']);
      (this.recargarPagina);
    form.reset();
       
Swal.fire({
title: 'Se Agrego una consulta',
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
      Swal.fire({
        icon: 'warning',
        title: 'Verifica Los datos ngresados en el Formulario',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.ConsultaService.editarConsulta(this.consulta ,parseInt(this.termino) )
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
recargarPagina() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/#/embarazada/'+this.embarazada.ci+'/'+this.embarazada.nombre, { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
}
