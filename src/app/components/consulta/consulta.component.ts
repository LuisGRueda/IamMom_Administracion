import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { embarazadaService } from 'src/app/service/embarazada.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { ConsultaService } from 'src/app/service/consulta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  embarazada:any = [];
  termino: string = "";
  termino2: string = "";
  pages: number = 1;
  doctor:any =[];
  control: any=[];
  consulta: any=[];
  constructor(private activatedRoute: ActivatedRoute,private DoctorService:DoctorService,private _embarazadaService:embarazadaService,
    private ConsultaService: ConsultaService) { }

  ngOnInit(): void {
    const user=localStorage.getItem('token');
    this.activatedRoute.params.subscribe(params => {
      this.termino = params['ci'];
      this.termino2 = params['id'];
      this.embarazada = this._embarazadaService.getembarazadaCi(params['ci']);
      this.consulta=this.ConsultaService.getConsultaOne(params['ci'],params['id']);
      this.doctor=this.DoctorService.VerDoctor(user||"master");
      console.log("hola");
      console.log(this.control);

    }) 
  }
  downloadPDF() {
    const doc = new jsPDF();
    const content = document.getElementById('pdf-content')??document.body;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('consulta-medica.pdf');
    });
  }
}
