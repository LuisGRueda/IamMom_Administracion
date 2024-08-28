import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Clase } from '../models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class claseService {

  private _url = 'http://192.168.50.23:89/api/';
  clases:Clase[] = [];
  constructor(private http:HttpClient) {
  this.listarclases();
}
//LISTAR CLASES
getclases() {
    return this.clases;
}
Verclase(id:number) {
  for(let i = 0; i < this.clases.length; i ++ )
  {
    if(this.clases[i].id==id)
    {
        return this.clases[i];
    }
  } 
  return"";
}
getclase( idx: string ){
  for(let i = 0; i < this.clases.length; i ++ )
  {
    if(this.clases[i].nombre==idx)
    {
        return this.clases[i];
    }
  } 
  return"";
  }
 listarclases() {
    this.http.get(`${this._url}Clase`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.clases);

    });
  }
  formatJsonToArray(data: any, array: Clase[]): Clase[] {
    Object.keys(data).forEach((key: any) => {
      const claseActual = data[key];
 
      let claseTemporal = {
        //id: key,
        id: claseActual.id,
        nombre: claseActual.nombre,
        descripcion: claseActual.descripcion,
        fechahora: claseActual.fechahora,
        matronaid: claseActual.matronaid,
        centroid: claseActual.centroid,
        estado: claseActual.estado,
      };
      array.push(claseTemporal);
    });
    return array;
  }

  //AGREGAR CLASES
  crearClase( clase: Clase ) {

    return this.http.post<Clase>(`${this._url}Clase/`, clase);     

  }

  editarClase( clase: Clase, id: number ) {

    return this.http.put(`${ this._url } Clase/`+ id, clase );     
  
  }

  //ELIMINADO DE CLASE
  eliminarClase(id:number){
    return this.http.delete(`${ this._url }Clase/`+ id);  
  }

  // BUSCAR_CLASE
  buscarclase( termino:string ):Clase[]{

    let clasesArr:Clase[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.clases.length; i ++ ){

      let clase = this.clases[i];

      let nombre = clase.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0 ){
       
        clasesArr.push( clase )
      }

    }
    return clasesArr;
    
  }

}
