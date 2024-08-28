import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Matrona } from '../models/matrona.model';

@Injectable({
  providedIn: 'root'
})
export class MatronaService {

  private _url = 'http://192.168.50.23:89/api/';
  matronas:Matrona[] = [];
  matronasAct:Matrona[] = [];
  constructor(private http:HttpClient) {
  this.listarmatronas();
  this.listarmatronasActivos();
}
getMatronas() {
    return this.matronas;
}
getMatronasAct() {
  return this.matronasAct;
}
VerMatrona(id:number){
  for(let i = 0; i < this.matronas.length; i ++ )
  {
    if(this.matronas[i].id==id)
    {
        return this.matronas[i];
    }
  } 
  return"";
 }

getMatrona( idx: string ){
  for(let i = 0; i < this.matronas.length; i ++ )
  {
    if(this.matronas[i].usuario==idx)
    {
        return this.matronas[i];
    }
  } 
  return"";
  }
 listarmatronas() {
    this.http.get(`${this._url}Matrona`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.matronas);
    });
  }
  listarmatronasActivos() {
    this.http.get(`${this._url}Matrona/activos`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.matronasAct);
    });
  }
  formatJsonToArray(data: any, array: Matrona[]): Matrona[] {
    Object.keys(data).forEach((key: any) => {
      const matronaActual = data[key];
 
      let matronaTemporal = {
        //Refactorizacion correccion de bug antes -> id: key,
        id: matronaActual.id,
        nombre: matronaActual.nombre,
        apellidos: matronaActual.apellidos,
        ci: matronaActual.ci,
        usuario: matronaActual.usuario,
        contrasenia: matronaActual.contrasenia,
        rol: matronaActual.rol,
        correo: matronaActual.correo,
        telefono: matronaActual.telefono,
        tipo: matronaActual.tipo,
        horario: matronaActual.horario,
        estado: matronaActual.estado,
      };
      array.push(matronaTemporal);
    });
    return array;
  }

  //AGREGAR MATRONA
 crearMatrona({matrona}: {matrona: Matrona;} ) {

    return this.http.post<Matrona>(`${this._url}Matrona`, matrona);     
  
  }
  editarMatrona( matrona: Matrona, id: number ) {

    return this.http.put<Matrona>(`${ this._url }Matrona/`+ id, matrona );     
  
  }

  eliminarMatrona(id:number){
    return this.http.delete(`${ this._url }Matrona/`+id);  
  }
  

  buscarmatrona( termino:string ):Matrona[]{

    let matronasArr:Matrona[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.matronas.length; i ++ ){

      let matrona = this.matronas[i];

      let nombre = matrona.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0){
       
        matronasArr.push( matrona )
      }

    }
    return matronasArr;
    
  }

}
