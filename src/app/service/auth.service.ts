import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http:HttpClient){
    }
    private role: string ="";

    // Método que almacena el rol del usuario actual cuando inicia sesión
    setRole(role: string) {
      this.role = role;
    }
  
    // Método que retorna el rol del usuario actual
    getRole(): string {
      return this.role;
    }

    isAuth():boolean{
        const token= localStorage.getItem('token');
        if(!localStorage.getItem('token'))
        {
            return false;
        }
        return true;
    }
    isAdmin():boolean{
        if(localStorage.getItem('tipoad')!="matrona")
        {
            return false;
        }
        return true;
    }
}