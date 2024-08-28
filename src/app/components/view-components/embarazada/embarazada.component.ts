import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hijo } from 'src/app/models/hijo.model';
import { Control } from 'src/app/models/control.model';
import { embarazadaService } from 'src/app/service/embarazada.service';
import { hijoService } from 'src/app/service/hijo.service';
import { ControlService } from 'src/app/service/control.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ConsultaService } from 'src/app/service/consulta.service';

@Component({
  selector: 'app-embarazada',
  templateUrl: './embarazada.component.html',
  styleUrls: ['./embarazada.component.css']
})
export class EmbarazadaComponent implements OnInit {
  embarazada:any = [];
  termino: string = "";
  pages: number = 1;
  hijos:any =[];
  control: any=[];
  consulta: any=[];
  constructor(private consultaService:ConsultaService,  private activatedRoute: ActivatedRoute, private router: Router,private hijoservice:hijoService,private controlService:ControlService, private _embarazadaService:embarazadaService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      this.termino = params['ci'];
      this.embarazada = this._embarazadaService.getembarazadaCi(params['ci']);
      this.control=this.controlService.getControl(params['ci']);
      this.hijos=this.hijoservice.gethijo(params['ci']);
      this.consulta=this.consultaService.getConsultaE(params['ci']);
      console.log("hola");
      console.log(this.control);

    }) 
  }

  generarPDF() {
    const doc = new jsPDF()
    const data= this.controlService.getControls();
    const columns= ['ID','Embarazada','Matrona','Fecha','Peso','Talla','Temperatura','Cardio','Semanas','Consulta','Anomalias','Registro','Estado'];
    const rows:any[][]=[];
    const logo = new Image();
    logo.src = './assets/images/I-am-MOm.webp';
    data.forEach(ctrl=>{
      rows.push([ctrl.id,ctrl.embarazada,ctrl.matrona,ctrl.fecha,ctrl.peso,ctrl.talla,ctrl.temperatura,ctrl.cardio,ctrl.semanaGestacion,ctrl.consulta,ctrl.anomalias,ctrl.registro,ctrl.estado])});
  
  logo.onload = () => {
  const imgWidth = 64;
  const imgHeight = 22;
  const positionX = (doc.internal.pageSize.getWidth() - imgWidth)/2;
  doc.addImage(logo, 'webp',positionX, 10, imgWidth, imgHeight);
   // doc.addImage('src\assets\images\I-am-MOm', 'webp', 10, 50, 50, 50);
    doc.text('Reporte Controles Embarazada', 70, 40);
    
    autoTable(doc,{
      head:[columns],
      body:rows,
      startY: 50 // 

    })
    doc.save('Controles.pdf');
  }
  }
  eliminar(id: any,i:any){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Usted no será capaz de recuperar este archivo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, guardalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hijoservice.eliminarHijo(id).subscribe(result=>{
          this.embarazada.splice(i,1);
        });
        Swal.fire({
          icon: 'success',
          title: 'Se elimino Correctamente...',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          
          window.location.reload();
        });
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'CANCELADO',
          'Se cancelo la eliminacion :)',
          'error'
        )
      }
    })
  }
}
