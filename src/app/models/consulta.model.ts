export class Consulta {
    id: number =0;
    nombrePaciente: string ="";
    apellidosPaciente: string ="";
    fechaConsulta:Date|undefined;
    sintomaPrincipal: string | undefined;
    diagnostico: number | undefined;
    tratamiento:string| undefined;
    observaciones:string| undefined;
    doctor:number| undefined;
    estado: string | undefined;
  }