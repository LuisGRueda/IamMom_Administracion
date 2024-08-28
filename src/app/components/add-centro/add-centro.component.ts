import { Component, OnInit } from '@angular/core';
import { CentroService } from 'src/app/service/centro.service';
import { Centro } from 'src/app/models/centro.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-centro',
  templateUrl: './add-centro.component.html',
  styleUrls: ['./add-centro.component.css']
})
export class AddCentroComponent implements OnInit {

  constructor(private centroService: CentroService,private activatedRoute:ActivatedRoute, private router:Router) { }
  termino:string="";
  centro: Centro=new Centro();
  Code: Centro=new Centro();
  model:any=[];
  
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['id'];
      if(params['id']!="nuevo"){
        console.log(params['id']);
          this.model=this.centroService.Vercentro(params['id']);
          this.Code=this.model;
          this.centro.id=this.Code.id;
          this.centro.nombre=this.Code.nombre;
          this.centro.telefono=this.Code.telefono;
          this.centro.direccion=this.Code.direccion;
          this.centro.estado=this.Code.estado;
          this.centro.tipo=this.Code.tipo;
      }
      else{
        this.centro.estado="Activo";
        this.centro.tipo="CS";
      }

    });
    
  }


//entidad guardar
  guardar( form: NgForm ) {
    if (this.termino=="nuevo")
    {
      if ( form.invalid ) {
        console.log('Formulario no válido');
        return;
      }
      console.log(form);
      this.centroService.crearCentro( this.centro )
      .subscribe( resp => {
        
      form.reset();
      Swal.fire({
        icon: 'success',
        title: 'Datos Guardados...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        const state = { queryParams: this.activatedRoute.snapshot.queryParams };
this.router.navigateByUrl('/centro', { replaceUrl: true, state }).then(() => {
  window.location.reload();
});
        
      });
      });
      
    }
    else{
      if ( form.invalid ) {
        console.log('Formulario no válido');
        return;
      }
      this.centroService.editarCentro(this.centro ,parseInt(this.termino) )
      .subscribe( resp => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Editados...',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          
          const state = { queryParams: this.activatedRoute.snapshot.queryParams };
this.router.navigateByUrl('/centro', { replaceUrl: true, state }).then(() => {
  window.location.reload();
});
        });
      });
    }
    
  }
//entidad de validacion
  validacion(centro:Centro){
    if(centro.nombre.length<5){
      return false;
    }
    else if(centro.nombre.length<10)
    {
      return false;
    }
    else{
      return true;
    }
  }
}