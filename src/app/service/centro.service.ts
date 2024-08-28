import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Centro } from '../models/centro.model';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  private _url = 'http://192.168.50.23:89/api/';
  centros:Centro[] = [];
  centrosAct:Centro[] = [];
  constructor(private http:HttpClient) {
  this.listarcentros();
  this.listarcentrosAct();
}
getCentros() {
    return this.centros;
}
getCentrosAct() {
  return this.centrosAct;
}
Vercentro(id:number) {
  for(let i = 0; i < this.centros.length; i ++ )
  {
    if(this.centros[i].id==id)
    {
        return this.centros[i];
    }
  } 
  return"";
}

getcentro( id: string ){
  for(let i = 0; i < this.centros.length; i ++ )
  {
    if(this.centros[i].nombre==id)
    {
        return this.centros[i];
    }
  } 
  return"";
  }
 listarcentros() {
    this.http.get(`${this._url}Centro`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.centros);

    });
  }
  listarcentrosAct() {
    this.http.get(`${this._url}Centro/activos`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.centrosAct);
    });
  }
  formatJsonToArray(data: any, array: Centro[]): Centro[] {
    Object.keys(data).forEach((key: any) => {
      const centroActual = data[key];
 
      let centroTemporal = {
        //id: key,
        id: centroActual.id,
        nombre: centroActual.nombre,
        direccion: centroActual.direccion,
        telefono: centroActual.telefono,
        tipo: centroActual.tipo,
        estado: centroActual.estado,
      };
      array.push(centroTemporal);
    });
    return array;
  }

 //AGREGAR CLASES
 crearCentro( centro: Centro ) {

  return this.http.post<Centro>(`${ this._url }Centro`, centro);     

}
editarCentro( centro: Centro, id: number ) {

  return this.http.put<Centro>(`${ this._url }Centro/`+id,centro );     

}
eliminarCentro(id:number){
  return this.http.delete(`${ this._url }Centro/`+id);  
}


  buscarcentro( termino:string ):Centro[]{

    let centrosArr:Centro[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.centros.length; i ++ ){

      let centro = this.centros[i];

      let nombre = centro.nombre.toLowerCase();
      let direccion = centro.direccion.toLowerCase();

      if( nombre.indexOf( termino ) >= 0 || direccion.indexOf( termino ) >= 0 ){
       
        centrosArr.push( centro )
      }

    }
    return centrosArr;

  }
}
