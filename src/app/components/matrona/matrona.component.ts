import { Component, OnInit } from '@angular/core';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-matrona',
  templateUrl: './matrona.component.html',
  styleUrls: ['./matrona.component.css']
})
export class MatronaComponent implements OnInit {
 matronas:Matrona[]=[];
 pages: number = 1;
  constructor( private matronaService:MatronaService) {
    
   }

  ngOnInit(): void {
    this.matronas = this.matronaService.getMatronas();

  }

  generarPDF() {
    const doc = new jsPDF()
    const data= this.matronaService.getMatronas();
    const columns= ['id','nombre','apellidos','ci','usuario','correo','telefono','horario','estado'];
    const rows:any[][]=[];
        const logo = new Image();
logo.src = './assets/images/I-am-MOm.webp';
    data.forEach(matrona=>{
      rows.push([matrona.id,matrona.nombre,matrona.apellidos,matrona.ci,matrona.usuario,matrona.correo,matrona.telefono,matrona.horario,matrona.estado])
    });
logo.onload = () => {
  const imgWidth = 64;
  const imgHeight = 22;
  const positionX = (doc.internal.pageSize.getWidth() - imgWidth)/2;
  doc.addImage(logo, 'webp',positionX, 10, imgWidth, imgHeight);
   // doc.addImage('src\assets\images\I-am-MOm', 'webp', 10, 50, 50, 50);
    doc.text('Reporte Rendimiento Matronas', 70, 40);
    
    autoTable(doc,{
      head:[columns],
      body:rows,
      startY: 50 // 

    })
    doc.save('matronas.pdf');
     
  }
}
  eliminar(id: any){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Usted no será capaz de recuperar este archivo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, guardalo'
    }).then((result) => {
      if (result.isConfirmed) {
    this.matronaService.eliminarMatrona(id).subscribe(result=>{
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
