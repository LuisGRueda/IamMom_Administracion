import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Hijo } from '../models/hijo.model';

@Injectable({
  providedIn: 'root'
})
export class hijoService {

  private _url = 'http://192.168.50.23:89/api/';
  hijos:Hijo[] = [];
  constructor(private http:HttpClient) {
  this.listarhijos();
}

gethijos() {
    return this.hijos;
}
gethij( idx: string ){
  for(let i = 0; i < this.hijos.length; i ++ )
  {
    if(this.hijos[i].nombre_madre==idx)
    {
       return this.hijos[i];
    }

  } 
  return ""
  }
gethijo( idx: string ){
  var hijosEmbarazada:Hijo[] = [];
  for(let i = 0; i < this.hijos.length; i ++ )
  {
    if(this.hijos[i].nombre_madre==idx)
    {
       hijosEmbarazada.push(this.hijos[i]);
    }

  } 
  return hijosEmbarazada;
  }
 listarhijos() {
    this.http.get(`${this._url}Hijos`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.hijos);

    });
  }
  formatJsonToArray(data: any, array: Hijo[]) {
    Object.keys(data).forEach((key: any) => {
      const claseActual = data[key];
 
      let claseTemporal = {
        //id: key,
        id: claseActual.id,
        codigoNacido:claseActual.codigoNacido,
        nombre: claseActual.nombre,
        apellidos: claseActual.apellidos,
        nombre_padre: claseActual.nombre_padre,
        nombre_madre: claseActual.nombre_madre,
        nombre_matrona: claseActual.nombre_matrona,
        fechahora_nacido: claseActual.fechahora_nacido,
        anomalias: claseActual.anomalias,
        tipo_sangre: claseActual.tipo_sangre,
        notas: claseActual.notas,
        estado: claseActual.estado,
      };
      array.push(claseTemporal);
    });
    return array;
  }

  crearHijo({ hijo }: { hijo: Hijo; }) {

    return this.http.post<Hijo>(`${this._url}Hijos`, hijo);     

  }

  editarHijo( hijo: Hijo, id: number ) {

    return this.http.put(`${ this._url } Hijos/`+ id, hijo );     
  
  }
  eliminarHijo(id:number){
    return this.http.delete(`${ this._url }Hijos/`+ id);  
  }

}
