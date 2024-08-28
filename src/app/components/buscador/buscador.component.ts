import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatronaService } from 'src/app/service/matrona.service';
import { Matrona } from 'src/app/models/matrona.model';
import { Router } from '@angular/router';
import { Clase } from 'src/app/models/clase.model';
import { claseService } from 'src/app/service/clase.service';
import { Embarazada } from 'src/app/models/embarazada.model';
import { embarazadaService } from 'src/app/service/embarazada.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  matronas:any = [];
  clases: Clase []=[];
  embarazadas:Embarazada[]=[];

  termino: string = "";
  constructor(private embarazadaService:embarazadaService, private activatedRoute: ActivatedRoute, private _matronaService: MatronaService, private _claseService:claseService, private router: Router) { }

  ngOnInit(): void {
    this.matronas=this._matronaService.getMatronasAct()

    this.activatedRoute.params.subscribe(params => {
      this.termino = params['termino'];
      this.matronas = this._matronaService.buscarmatrona(params['termino']);
      console.log(this.matronas);

//////buscar clase
        this.clases  = this._claseService.buscarclase(params['termino']);
        console.log(this.clases);
////BUSCAR EMBARAZADA
        this.embarazadas  = this.embarazadaService.buscarembarazada(params['termino']);
        //this.embarazadas  = this.embarazadaService.buscarembarazada({ termino: params['termino'] });
      });
    }
    navegarAPagina(idx: any, tipoPagina: any) {
      switch (tipoPagina) {
        case 'matron':
          this.router.navigate(['/matrona']);
          break;
        case 'clase':
          this.router.navigate(['/clases']);
          break;
        case 'embarazada':
          this.router.navigate(['/embarazada', idx,""]);
          break;
        default:
          console.log('Tipo de página no válido');
      }
    }
    

  }
