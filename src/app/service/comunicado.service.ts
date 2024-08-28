import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Comunicado } from '../models/comunicado.model';

@Injectable({
  providedIn: 'root'
})
export class comunicadoService {

  private _url = 'http://192.168.50.23:89/api/';

  comunicados:Comunicado[] = [];
  
  constructor(private http:HttpClient) {
  this.listarcomunicados();
}
getcomunicados() {
    return this.comunicados;
}
 
getcomunicado( idx: string ){
  for(let i = 0; i < this.comunicados.length; i ++ )
  {
    if(this.comunicados[i].titulo==idx)
    {
        return this.comunicados[i];
    }
  } 
  return"";
  }
 listarcomunicados() {
    this.http.get(`${this._url}Comunicado`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.comunicados);

    });
  }
  formatJsonToArray(data: any, array: Comunicado[]): Comunicado[] {
    Object.keys(data).forEach((key: string) => {
      const comunicadoActual = data[key];
 
      let comunicadoTemporal = {
        //id: key,
        id: comunicadoActual.id,
        titulo: comunicadoActual.titulo,
        contenido: comunicadoActual.contenido,
        imagen: comunicadoActual.imagen,
        fecha: comunicadoActual.fecha,
        categoria: comunicadoActual.categoria,
        autor: comunicadoActual.autor,
        estado: comunicadoActual.estado,
      };
      array.push(comunicadoTemporal);
    });
    return array;
  }

  

  
 //AGREGAR CLASES
 crearComunicado( comunicado: Comunicado ) {

  return this.http.post(`${ this._url }Comunicado`, comunicado);    

}
editarComunicado( comunicado: Comunicado, id: number ) {

  return this.http.post(`${ this._url } Comunicado`+ id, comunicado );     

}


  buscarcomunicado( termino:string ):Comunicado[]{

    let comunicadosArr:Comunicado[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.comunicados.length; i ++ ){

      let comunicado = this.comunicados[i];

      let titulo= comunicado.titulo.toLowerCase();
      let contenido = comunicado.contenido.toLowerCase();

      if( titulo.indexOf( termino ) >= 0 || contenido.indexOf( termino ) >= 0 ){
       
        comunicadosArr.push( comunicado )
      }

    }
    return comunicadosArr;
    
  }
  eliminarComunicado(id:number){
    return this.http.delete(`${ this._url }Comunicado/`+id);  
  }
  VerComunicado(id:number){
    return this.comunicados[id];
   }
}