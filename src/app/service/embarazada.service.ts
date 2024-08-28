import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Embarazada } from '../models/embarazada.model';
//Refactorizacion: eliminacion de importaciones no usadas
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class embarazadaService {

  private _url ='http://192.168.50.23:89/api/';
  embarazadas:Embarazada[] = [];
  constructor(private http:HttpClient) {
  this.listarembarazadas();
}
VerEmbarazada(id:number){
  for(let i = 0; i < this.embarazadas.length; i ++ )
  {
    if(this.embarazadas[i].id==id)
    {
        return this.embarazadas[i];
    }
  } 
  return"";
 }

getembarazadas() {
    return this.embarazadas;
}
 
getembarazada( idx: string ){
  for(let i = 0; i < this.embarazadas.length; i ++ )
  {
    if(this.embarazadas[i].nombre==idx)
    {
        return this.embarazadas[i];
    }
  } 
  return"";
  }
  getembarazadaCi( cix: string ){
    var cin = Number(cix)
    for(let i = 0; i < this.embarazadas.length; i ++ )
    {
      if(this.embarazadas[i].ci==cin)
      {
          return this.embarazadas[i];
      }
    } 
    return"";
    }
 listarembarazadas() {
    this.http.get(`${this._url}Embarazada/`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.embarazadas);

    });
  }
  formatJsonToArray(data: any, array: Embarazada[]): Embarazada[] {
    Object.keys(data).forEach((key: any) => {
      const embarazadaActual = data[key];
 
      let embarazadaTemporal = {
        //bug antes id: key,
        id: embarazadaActual.id,
        nombre: embarazadaActual.nombre,
        apellidos: embarazadaActual.apellidos,
        ci: embarazadaActual.ci,
        nroseguro: embarazadaActual.nroSeguro,
        direccion: embarazadaActual.direccion,
        edad: embarazadaActual.edad,
        telefono: embarazadaActual.telefono,
        registro: embarazadaActual.registro,
        matronaId: embarazadaActual.matronaId,
        estado: embarazadaActual.estado,
      };
      array.push(embarazadaTemporal);
    });
    return array;
  }

  //AGREGAR embarazada
  //Refactorizacion: desestructuracion de objetos antes: crearembarazada( embarazada: Embarazada )
 crearembarazada({ embarazada }: { embarazada: Embarazada; }) {
    return this.http.post<Embarazada>(`${this._url}Embarazada`, embarazada);   
  }
  //editarembarazada( embarazada: Embarazada, id: number )
  editarembarazada(embarazada: Embarazada, id: number) {

    return this.http.put(`${this._url}Embarazada/`+id, embarazada );     
  
  }
// eLiminar embarazada
  eliminarembarazada(id:number){
    return this.http.delete(`${this._url}Embarazada/`+id);  
  } // Identificacion de  ID y correspondiente accionamientop
  

  //buscarembarazada( termino:string )
  buscarembarazada( termino:string ):Embarazada[]{

    let embarazadasArr:Embarazada[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.embarazadas.length; i ++ ){

      let embarazada = this.embarazadas[i];

      let nombre = embarazada.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0 ){
       
        embarazadasArr.push( embarazada )
      }

    }
    return embarazadasArr;
    
  }

}
