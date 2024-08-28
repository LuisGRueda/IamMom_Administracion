import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _url = 'http://192.168.50.23:89/api/';
  doctors:Doctor[] = [];
  doctorsAct:Doctor[] = [];
  constructor(private http:HttpClient) {
  this.listardoctors();
  this.listardoctorsActivos();
}
getDoctors() {
    return this.doctors;
}
getDoctorsAct() {
  return this.doctorsAct;
}
VerDoctor(id:String){
  for(let i = 0; i < this.doctors.length; i ++ )
  {
    if(this.doctors[i].usuario==id)
    {
        return this.doctors[i];
    }
  } 
  return"";
 }

getDoctor( idx: string ){
  for(let i = 0; i < this.doctors.length; i ++ )
  {
    if(this.doctors[i].usuario==idx)
    {
        return this.doctors[i];
    }
  } 
  return"";
  }
 listardoctors() {
    this.http.get(`${this._url}Doctor`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.doctors);
    });
  }
  listardoctorsActivos() {
    this.http.get(`${this._url}Doctor/activos`).subscribe((res: any) => {
      const data = this.formatJsonToArray(res, this.doctorsAct);
    });
  }
  formatJsonToArray(data: any, array: Doctor[]): Doctor[] {
    Object.keys(data).forEach((key: any) => {
      const doctorActual = data[key];
 
      let doctorTemporal = {
        //Refactorizacion correccion de bug antes -> id: key,
        id: doctorActual.id,
        nombre: doctorActual.nombre,
        ci: doctorActual.ci,
        especialidad: doctorActual.especialidad,
        email: doctorActual.email,
        telefono: doctorActual.telefono,
        direccion: doctorActual.direccion,
        centroId: doctorActual.centroId,
        observaciones: doctorActual.observaciones,
        usuario: doctorActual.usuario,
        contrasenia: doctorActual.contrasenia,
        estado: doctorActual.estado,
      };
      array.push(doctorTemporal);
    });
    return array;
  }

  //AGREGAR MATRONA
 crearDoctor({doctor}: {doctor: Doctor;} ) {

    return this.http.post<Doctor>(`${this._url}Doctor`, doctor);     
  
  }
  editarDoctor( doctor: Doctor, id: number ) {

    return this.http.post(`${ this._url }Doctor`+ id, doctor );     
  
  }

  eliminarDoctor(id:number){
    return this.http.delete(`${ this._url }Doctor/`+id);  
  }
  

  buscarmatrona( termino:string ):Doctor[]{

    let doctorsArr:Doctor[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.doctors.length; i ++ ){

      let doctor = this.doctors[i];

      let nombre = doctor.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0){
       
        doctorsArr.push( doctor )
      }

    }
    return doctorsArr;
}}