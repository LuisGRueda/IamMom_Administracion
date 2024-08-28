import { Component, OnInit } from '@angular/core';
import { CargarscriptService } from 'src/app/service/cargarScript.service';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import { comunicadoService } from 'src/app/service/comunicado.service';
import { Comunicado } from 'src/app/models/comunicado.model';
import { Clase } from 'src/app/models/clase.model';
import { claseService } from 'src/app/service/clase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comunicados:Comunicado[]=[];
  slides: NodeListOf<Element> | undefined;
  i: number = 0;
  constructor(private carga:CargarscriptService,private matronaService:MatronaService, private comunicadosService:comunicadoService) { 
    carga.Carga(["home"]);
  }
 ngOnInit(): void {
  this.comunicados=this.comunicadosService.getcomunicados();
 }

}
