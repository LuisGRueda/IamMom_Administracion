import { Component, OnInit } from '@angular/core';
import { Embarazada } from 'src/app/models/embarazada.model';
import { embarazadaService } from 'src/app/service/embarazada.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-embarazadas',
  templateUrl: './embarazadas.component.html',
  styleUrls: ['./embarazadas.component.css']
})
export class EmbarazadasComponent implements OnInit {
  pages: number = 1;
  embarazada:Embarazada []=[];
  constructor(private embarazadaService: embarazadaService , private router: Router) { }

  ngOnInit(): void {
    this.embarazada = this.embarazadaService.getembarazadas();
  }

  generarPDF() {
    const doc = new jsPDF()
    const data= this.embarazadaService.getembarazadas();
    const columns= ['ID','Nombre','Apellidos','Ci','Nro Seguro','Direccion','Edad','Semana Gestion','Nro Hijos','Telefono','Registro','MatronaId','Estado'];
    const rows:any[][]=[];
    const logo = new Image();
    logo.src = './assets/images/I-am-MOm.webp';
    data.forEach(embarazada=>{
      rows.push([embarazada.id,embarazada.nombre,embarazada.apellidos,embarazada.ci,embarazada.nroseguro,embarazada.direccion,embarazada.edad,embarazada.telefono,embarazada.telefono,embarazada.telefono,embarazada.registro,embarazada.matronaId,embarazada.estado])});
     
logo.onload = () => {
  const imgWidth = 64;
  const imgHeight = 22;
  const positionX = (doc.internal.pageSize.getWidth() - imgWidth)/2;
  doc.addImage(logo, 'webp',positionX, 10, imgWidth, imgHeight);
   // doc.addImage('src\assets\images\I-am-MOm', 'webp', 10, 50, 50, 50);
    doc.text('Reporte De las Embarazadas ', 70, 40);
    
    autoTable(doc,{
      head:[columns],
      body:rows,
      startY: 50 // 

    })
    doc.save('embarazadas.pdf');
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
        this.embarazadaService.eliminarembarazada(id).subscribe(result=>{
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
 verEmbarazada(ci: any,nombre: any){
  this.router.navigate(['/embarazada', ci,nombre]);//hola mundo
 }
}


 
 