import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Matrona } from 'src/app/models/matrona.model';
import { AuthService } from 'src/app/service/auth.service';
import { CargarscriptService } from 'src/app/service/cargarScript.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { MatronaService } from 'src/app/service/matrona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {
  @ViewChild('micode', { static: false })
  micode!: ElementRef;
  matronas:Matrona[] = [];
  doctors:Doctor[] = [];
  matro:any ;
  docto:any ;
  formularioRecuperar: FormGroup;
  correoElectronico:string | undefined;
  codigo:any;
  constructor(private doctorService: DoctorService ,
    private Authservice:AuthService, private carga:CargarscriptService,
    private matronaService:MatronaService,public formulario:FormBuilder, private router:Router,
    ) { 
      this.matronas=matronaService.getMatronas();
      this.doctors=doctorService.getDoctors();
      this.router.navigate( ['home'] );
      this.formularioRecuperar=this.formulario.group({
        ci:[''],
        telefono:[''],
        code:['']
      });
    }

  ngOnInit(): void {
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  solicitar(){
    let valor=this.formularioRecuperar.value;
    const foundMatrona = this.matronas.find(matrona => matrona.ci === valor.ci && matrona.telefono === valor.telefono);
    const foundDoctor = this.doctors.find(doctor => doctor.ci === valor.ci && doctor.telefono === valor.telefono);
    this.matro=foundMatrona;
    this.docto=foundDoctor;
    const miInput = document.querySelector('.inputLogin') as HTMLInputElement;
    const miLabel = document.querySelector('.milabel') as HTMLInputElement;
    if (foundMatrona || foundDoctor) {
      console.log("Bienvenidsxxx");
      const miInput = document.querySelector('.inputRecuperar') as HTMLInputElement;
      const miLabel = document.querySelector('.botonRecuper') as HTMLInputElement;
      const miInput2 = document.querySelector('.inputRecuperar') as HTMLInputElement;
      const miLabel2= document.querySelector('.botonRecuper') as HTMLInputElement;
      const codigoAleatorio = this.generarCodigoAleatorio();
      this.codigo=codigoAleatorio;
       if(foundMatrona){
         console.log("Bienvenida/o Matrona/o");
         this.correoElectronico=foundMatrona.correo||"";    
         //this.smsService.sendSMS(this.matro.telefono, "I am Mom", `Hola este es tu código de recuperación de contraseña. ${codigoAleatorio}. No compartas este código con nadie. `);   
       }
       else{
        this.correoElectronico=foundDoctor?.email||"";
        //this.smsService.sendSMS(this.docto.telefono, '',codigoAleatorio);
       }
       miInput.classList.remove('recuperar');
       miLabel.classList.remove('recuperar');
       miInput2.classList.add('recuperar');
       miLabel2.classList.add('recuperar');
 } else {
   Swal.fire({
     position: 'top',
     icon: 'error',
     title: 'Error, Correo Electronico o Ci invalidos',
     showConfirmButton: false,
     timer: 1500
   });
 }
  }
  Recuperar(){
    const valorInput = this.micode.nativeElement.value;
      if(valorInput==this.codigo){
        if(this.matro)
        {
          this.router.navigate(['/reset-password', this.matro.ci]);
        }
        else{
          this.router.navigate(['/reset-password', this.docto.ci]);
        }  
      }
      else{
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error, Codigo de validacion incorrecto',
          showConfirmButton: false,
          timer: 1500
        });
      }
  }
  generarCodigoAleatorio(): string {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    return codigo;
  }
  }

