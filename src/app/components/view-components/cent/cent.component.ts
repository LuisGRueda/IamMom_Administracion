import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CentroService } from 'src/app/service/centro.service';

@Component({
  selector: 'app-cent',
  templateUrl: './cent.component.html',
  styleUrls: ['./cent.component.css']
})
export class CentComponent implements OnInit {
centro:any=[];
  constructor(private activatedRoute:ActivatedRoute, private centroService:CentroService) { 
    this.activatedRoute.params.subscribe( params =>{
      this.centro = this.centroService.getcentro( params['id'] );
      })
  }

  ngOnInit(): void {
  }

}
