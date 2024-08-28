import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Matrona } from 'src/app/models/matrona.model';
import { MatronaService } from 'src/app/service/matrona.service';
import { CargarscriptService } from 'src/app/service/cargarScript.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  matrona:Matrona[]=[];
  loguser:any;
  constructor(private carga:CargarscriptService,private router:Router, private matronaServices:MatronaService) {
    carga.Carga(["navbar"]);
  }
 ngOnInit(): void {
  this.verificarLogin();
  this.matrona=this.matronaServices.getMatronas();
 }
 buscar( termino:string ){
   this.router.navigate( ['./buscador',termino] );
 }

 VerPerfil(){
  this.router.navigate( ['/perfil',this.loguser] );
}

 verificarLogin(){
  if(localStorage.getItem('token')!=null)
  {
   this.loguser=localStorage.getItem('token');
   const visible:any=document.querySelector('#head'); 
   visible.style.display='flex'; 
  }
}

logout(){
  Swal.fire({
    title: 'Esta seguro?',
    text: 'Vas a cerrar la sesion',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'warning',
        title: 'Cerrando sesión...',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.loguser="";
        const visible:any=document.querySelector('#head'); 
         visible.style.display='none'; 
        this.router.navigate(['login']);
        localStorage.clear();
        window.location.reload();
      });      
    } 
    else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'CANCELADO',
        'Se cancelo :)',
        'error'
      )
    }
  })
  
 }
 
}
