import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Consulta } from '../models/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private _url = 'http://192.168.50.23:89/api/';
  Consultas:Consulta[] = [];
  constructor(private http:HttpClient) {
  this.listarConsultas();
}
getConsultas() {
    return this.Consultas;
}
Verconsulta(id:number) {
  for(let i = 0; i < this.Consultas.length; i ++ )
  {
    if(this.Consultas[i].id==id)
    {
        return this.Consultas[i];
    }
  } 
  return"";
}
getConsultaE( ci: string ){
  var ConsultaEmbarazada:Consulta[] = [];
  for(let i = 0; i < this.Consultas.length; i ++ )
  {
    if(this.Consultas[i].nombrePaciente==ci)
    {
      ConsultaEmbarazada.push(this.Consultas[i]);
    }
  } 
  return ConsultaEmbarazada;
  }
getConsultaOne( ci: string ,id:number,){
  for(let i = 0; i < this.Consultas.length; i ++ )
  {
    if(this.Consultas[i].id==id)
    {
        return this.Consultas[i];
    }
  } 
  return"";
  }
 listarConsultas() {
    this.http.get(`${this._url}ConsultaMedica`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.Consultas);

    });
  }
  formatJsonToArray(data: any, array: Consulta[]): Consulta[] {
    Object.keys(data).forEach((key: any) => {
      const consultaActual = data[key];
 
      let ConsultaTemporal = {
        //id: key,
        id: consultaActual.id,
        nombrePaciente: consultaActual.nombrePaciente,
        apellidosPaciente: consultaActual.apellidosPaciente,
        fechaConsulta: consultaActual.fechaConsulta,
        sintomaPrincipal: consultaActual.sintomaPrincipal,
        diagnostico: consultaActual.diagnostico,
        tratamiento: consultaActual.tratamiento,
        observaciones: consultaActual.observaciones,
        doctor: consultaActual.doctor,
        estado: consultaActual.estado,
      };
      array.push(ConsultaTemporal);
    });
    return array;
  }

 //AGREGAR CLASES
 crearConsulta( Consulta: Consulta ) {

  return this.http.post<Consulta>(`${ this._url }ConsultaMedica`, Consulta);     

}
editarConsulta( Consulta: Consulta, id: number ) {

  return this.http.put<Consulta>(`${ this._url }ConsultaMedica`+id,Consulta );     

}
eliminarConsulta(id:number){
  return this.http.delete(`${ this._url }ConsultaMedica/`+id);  
} 
}
