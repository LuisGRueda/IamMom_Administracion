import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Control } from '../models/control.model';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private _url = 'http://192.168.50.23:89/api/';
  Controls:Control[] = [];
  constructor(private http:HttpClient) {
  this.listarControls();
}
getControls() {
    return this.Controls;
}
 VerControl(id:number){
  return this.Controls[id];
 }
getControl( id: string ){
  var ControlEmbarazada:Control[] = [];
  for(let i = 0; i < this.Controls.length; i ++ )
  {
    if(this.Controls[i].embarazada==id)
    {
      ControlEmbarazada.push(this.Controls[i]);
    }
  } 
  return ControlEmbarazada;
  }
 listarControls() {
    this.http.get(`${this._url}Control`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.Controls);
    });
  }
  formatJsonToArray(data: any, array: Control[]): Control[] {
    Object.keys(data).forEach((key: any) => {
      const controlActual = data[key];
 
      let ControlTemporal = {
        //id: key,
        id: controlActual.id,
        embarazada: controlActual.embarazada,
        matrona: controlActual.matrona,
        fecha: controlActual.fecha,
        peso: controlActual.peso,
        talla: controlActual.talla,
        temperatura: controlActual.temperatura,
        cardio: controlActual.cardio,
        semanaGestacion: controlActual.semanaGestacion,
        consulta: controlActual.consulta,
        anomalias: controlActual.anomalias,
        registro: controlActual.registro,
        estado: controlActual.estado,
      };
      array.push(ControlTemporal);
    });
    return array;
  }

 //AGREGAR CLASES
 crearControl( Control: Control ) {

  return this.http.post<Control>(`${ this._url }Control`, Control);     

}
editarControl( Control: Control, id: number ) {

  return this.http.put<Control>(`${ this._url }Control`+id,Control );     

}
eliminarControl(id:number){
  return this.http.delete(`${ this._url }Control/`+id);  
} 
}
