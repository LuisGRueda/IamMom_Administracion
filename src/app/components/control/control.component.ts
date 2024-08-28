import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/service/control.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Control } from 'src/app/models/control.model';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import { embarazadaService } from 'src/app/service/embarazada.service';
//import jsPDF from 'jspdf';
//import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  constructor(private _embarazadaService:embarazadaService,private matronaservice:MatronaService,private ControlService: ControlService,private activatedRoute:ActivatedRoute, private router:Router) { }
  termino:string="";
  matronas:Matrona[]=[];
  control: Control=new Control();
  Code: Control=new Control();
  model:any=[];
  embarazada:any = [];
  ngOnInit(): void {
    
    this.matronas=this.matronaservice.getMatronasAct();
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
          this.model=this.ControlService.VerControl(params['id']);
          this.Code=this.model;
          this.control.id=this.Code.id;
          this.control.embarazada=this.Code.embarazada;
          this.control.matrona=this.Code.matrona;
          this.control.fecha=this.Code.fecha;
          this.control.peso=this.Code.peso;
          this.control.talla=this.Code.talla;
          this.control.temperatura=this.Code.temperatura;
          this.control.cardio=this.Code.cardio;
          this.control.semanaGestacion=this.Code.semanaGestacion;
          this.control.consulta=this.Code.consulta;
          this.control.anomalias=this.Code.anomalias;
          this.control.registro=this.Code.registro;
          this.control.estado=this.Code.estado;
      }
      else{
        this.embarazada = this._embarazadaService.getembarazadaCi(params['ci']);
        this.control.estado="Activo";
        this.control.embarazada=this.embarazada.ci.toString();
      }

    });
  }

/* //ACTIVAR CUANDO ESTEE EL CONTROLES LISTO
  generarPDF() {
    const doc = new jsPDF()
    const data= this.ControlService.getControls;
    const columns= ['ID','Embarazada','Matrona','Fecha','Peso','Talla','Temperatura','Cardio','Semanas','Consulta','Anomalias','Registro','Estado'];
    const rows:any[][]=[];
    data.forEach(control=>{
      rows.push([control.id,control.embarazada,control.matrona,control.fecha,control.peso,control.peso,control.talla,control.temperatura,control.cardio,control.SemanaGestacion,control.consulta,control.anomalias,control.registro,control.estado])});
    autoTable(doc,{
      head:[columns],
      body:rows

    })
    doc.save('controles.pdf');
  }*/
//entidad guardar
  guardar( form: NgForm ) {
    console.log(form.value)
    if (this.termino=="nuevo")
    {
      if ( form.invalid ) {
        console.log('Formulario no válido');
        return;
      }
      console.log(form);
      this.ControlService.crearControl( this.control )
      .subscribe( resp => {
        console.log("AGREGADO");
      form.reset();
         
Swal.fire({
  title: 'Se Agrego un nuevo Control',
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
      this.ControlService.editarControl(this.control ,parseInt(this.termino) )
      .subscribe( resp => {
        console.log("editado");
      });
    }
    
    

  }
//entidad de validacion
  validacion(control:Control){
    if(control.embarazada.length<5){
      return false;
    }
    else if(
      control.embarazada.length<10)
    {
      return false;
    }
    else{
      return true;
    }
  }
}