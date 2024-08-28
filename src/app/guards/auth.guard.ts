import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  rol:string="";
  constructor(private authService:AuthService, private router:Router){
  }
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const rolesPermitidos = route.data.roles;
    const rolUsuario = localStorage.getItem('tipoad');
    if (this.authService.isAuth() ) {
      if(!rolesPermitidos.includes(rolUsuario)){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'No tienes Acceso a esta pagina',
          showConfirmButton: false,
          timer: 1500
        })
        return false;
      }
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
