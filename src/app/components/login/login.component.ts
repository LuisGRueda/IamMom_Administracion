import { Component, OnInit } from '@angular/core';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CargarscriptService } from 'src/app/service/cargarScript.service';
import { Doctor } from 'src/app/models/doctor.model';
import { AuthService } from 'src/app/service/auth.service';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matronas:Matrona[] = [];
  doctors:Doctor[] = [];
  formularioLogin:FormGroup;
  loguser:any;
  roluser:any;
  tipouser:any;
  constructor(private doctorService: DoctorService ,private Authservice:AuthService, private carga:CargarscriptService,private matronaService:MatronaService,public formulario:FormBuilder, private router:Router) {

    this.matronas=this.matronaService.getMatronasAct();
    this.doctors=this.doctorService.getDoctorsAct();
    this.router.navigate( ['home'] );
    this.formularioLogin=this.formulario.group({
      user:[''],
      pass:['']
    });
   }

  ngOnInit(): void {
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  comprobar():void{
    let valor=this.formularioLogin.value;  
    console.log(valor);
    console.log(this.doctors);
    const miInput = document.querySelector('.inputLogin') as HTMLInputElement;
    const miLabel = document.querySelector('.milabel') as HTMLInputElement;
  if (!/^[a-zA-Z0-9]{8,}$/.test(valor.contrasenia)) {
    miInput.classList.add('error');
  } else {
    miInput.classList.remove('error');
    const foundMatrona = this.matronas.find(matrona => matrona.usuario === valor.user && matrona.contrasenia === valor.pass);
    const foundDoctor = this.doctors.find(doctor => doctor.usuario === valor.user && doctor.contrasenia === valor.pass);

    if (foundMatrona || foundDoctor) {
     console.log("Bienvenidsxxx");
      if(foundMatrona){
        console.log("Bienvenida/o Matrona/o");
        Swal.fire({
          position: 'bottom-start',
          icon: 'success',
          title: 'Iniciaste sesion',
          showConfirmButton: false,
          timer: 800
        });
        
        this.formularioLogin.reset();
        this.loguser = valor.user;
        this.roluser = foundMatrona.rol;
        this.tipouser = "matrona";
        this.grabar_localstorage();
        this.router.navigate(['home']);
        window.location.reload();
      }
      else{
        console.log("Bienvenido Doctor");
  
        Swal.fire({
          position: 'bottom-start',
          icon: 'success',
          title: 'Iniciaste sesion',
          showConfirmButton: false,
          timer: 800
        });
        
        this.formularioLogin.reset();
        this.loguser = valor.user;
        this.roluser = "doctor";
        this.tipouser = "doctor";
        this.grabar_localstorage();
        this.router.navigate(['home']);
        window.location.reload();
      }
  
  
} else {
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: 'Error, Credenciales Invalidas',
    showConfirmButton: false,
    timer: 1500
  });
}

    
  }
   

  }
  grabar_localstorage(){
    localStorage.setItem('token',this.loguser);
    localStorage.setItem('rol',this.roluser);
    localStorage.setItem('tipoad',this.tipouser)
    this.Authservice.setRole(this.tipouser);
 }

}
