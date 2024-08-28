import { Component, OnInit } from '@angular/core';
import { Centro } from 'src/app/models/centro.model';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/service/doctor.service';
import { CentroService } from 'src/app/service/centro.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  doctor: Doctor=new Doctor();
  centros:Centro[]=[];
  termino:string="";
  Code: Doctor=new Doctor();
  model:any=[];
  constructor(private DoctorService:DoctorService, private centroservice:CentroService,private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.centros=this.centroservice.getCentrosAct();
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
        console.log(params['id']);
          this.model=this.DoctorService.VerDoctor(params['id']);
          this.Code=this.model;
          this.doctor.id=this.Code.id;
          this.doctor.nombre=this.Code.nombre;
          this.doctor.ci=this.Code.ci;
          this.doctor.especialidad=this.Code.especialidad;
          this.doctor.email=this.Code.email;
          this.doctor.telefono=this.Code.telefono;
          this.doctor.direccion=this.Code.direccion;
          this.doctor.centroId=this.Code.centroId;
          this.doctor.observaciones=this.Code.observaciones;
          this.doctor.usuario=this.Code.usuario;
          this.doctor.estado=this.Code.estado;
      }
      else{
        this.doctor.estado="Activo";
      }

    });
  }
  guardar( form: NgForm ) {
    if (this.termino=="nuevo"){
      
    console.log(form.value)
    if ( form.invalid ||this.validar(this.doctor)==false) {
      console.log('Formulario no válido');
      Swal.fire({
        icon: 'warning',
        title: 'Verifica Los datos igresados en el Formulario',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    console.log("Hola");
    this.DoctorService.crearDoctor({doctor :this.doctor}  )
    .subscribe( resp => {
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
      console.log(form.value)
      console.log('Formulario no válido');
      Swal.fire({
        icon: 'warning',
        title: 'Verifica Los datos igresados en el Formulario',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.DoctorService.editarDoctor(this.doctor ,parseInt(this.termino) )
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
  validar(doctor:Doctor){
    if (doctor.contrasenia.length < 8 || !/^[a-zA-Z0-9]{8,}$/.test(doctor.contrasenia)) {
      const miInput = document.querySelector('.contra') as HTMLInputElement;
      miInput.classList.add('error');
      return false;
    } 
    return true;
  }
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}
