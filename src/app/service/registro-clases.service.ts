import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { RegistroClase } from '../models/registroclases.model';

@Injectable({
  providedIn: 'root'
})
export class registroClaseService {

  private _url = 'http://192.168.50.23:89/api/';

  registroClases:RegistroClase[] = [];
  
  constructor(private http:HttpClient) {
  this.listarregistroClases();
}
getregistroClases() {
    return this.registroClases;
}
 /*
getregistroClase( idx: string ){
  for(let i = 0; i < this.registroClases.length; i ++ )
  {
    if(this.registroClases[i].titulo==idx)
    {
        return this.registroClases[i];
    }
  } 
  return"";
  }*/
 listarregistroClases() {
    this.http.get(`${this._url}RegistroRegistroClasess`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.registroClases);
    });
  }
  formatJsonToArray(data: any, array:RegistroClase[]): RegistroClase[] {
    Object.keys(data).forEach((key: any) => {
      const registroClaseActual = data[key];
 
      let registroClaseTemporal = {
        //id: key,
        id: registroClaseActual.id,
        claseid: registroClaseActual.claseid,
        embarazadaid: registroClaseActual.embarazadaid,
        fecha: registroClaseActual.fecha,
        estado: registroClaseActual.estado,
      };
      array.push(registroClaseTemporal);
    });
    return array;
  }

  

  
 //AGREGAR CLASES
 crearregistroClase( registroClase: RegistroClase ) {

  return this.http.post(`${ this._url }RegistroRegistroClasess/`, registroClase);    

}
}