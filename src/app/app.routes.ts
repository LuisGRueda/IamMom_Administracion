import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { AddCentroComponent } from './components/add-centro/add-centro.component';
import { AddClasesComponent } from './components/add-components/add-clases/add-clases.component';
import { AddComunicadosComponent } from './components/add-components/add-comunicados/add-comunicados.component';
import { AddEmbarazadaComponent } from './components/add-components/add-embarazada/add-embarazada.component';
import { AddMatronaComponent } from './components/add-components/add-matrona/add-matrona.component';
import { CentroComponent } from './components/centro/centro.component';
import { ClasesComponent } from './components/clases/clases.component';
import { EmbarazadasComponent } from './components/embarazadas/embarazadas.component';
import { MatronaComponent } from './components/matrona/matrona.component';
import { ComunicadosComponent } from './components/comunicados/comunicados.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistroClasesComponent } from './components/registro-clases/registro-clases.component';
import { MatronComponent } from './components/view-components/matron/matron.component';
import { ControlComponent } from './components/control/control.component';
import { EmbarazadaComponent } from './components/view-components/embarazada/embarazada.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AddDoctorComponent } from './components/add-components/add-doctor/add-doctor.component';
import { AddHijoComponent } from './components/add-components/add-hijo/add-hijo.component';
import { AddConsultaComponent } from './components/add-components/add-consulta/add-consulta.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path: 'centro', component: CentroComponent,canActivate:[AuthGuard] ,data: { roles: ['matrona','doctor'] }},
    { path: 'matrona', component: MatronaComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path: 'clases', component: ClasesComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path: 'embarazadas', component: EmbarazadasComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    {path:'comunicados', component:ComunicadosComponent,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path: 'doctor', component: DoctorComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    {path:'buscador/:termino', component:BuscadorComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path:'add-centro/:id', component: AddCentroComponent ,canActivate:[AuthGuard],data: { roles: ['matrona'] }},
    {path:'add-matrona/:id', component:AddMatronaComponent,canActivate:[AuthGuard],data: { roles: ['matrona'] }},
    {path:'add-clases/:id', component:AddClasesComponent,canActivate:[AuthGuard],data: { roles: ['matrona'] }},
    {path:'add-embarazada/:id', component:AddEmbarazadaComponent,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    {path:'add-doctor/:id', component:AddDoctorComponent,canActivate:[AuthGuard],data: { roles: ['matrona', 'doctor'] }},
    {path:'add-comunicado/:id', component:AddComunicadosComponent,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    {path:'add-hijo/:id/:ci', component:AddHijoComponent,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    {path:'add-consulta/:id/:ci', component:AddConsultaComponent,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path: 'embarazada/:ci/:nombre', component: EmbarazadaComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path: 'perfil/:user', component: PerfilComponent ,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    {path:'matron',component:MatronComponent,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    {path:'login',component:LoginComponent},
    {path:'consulta/:ci/:id',component:ConsultaComponent},
    {path:'registro-clases',component:RegistroClasesComponent,canActivate:[AuthGuard],data: { roles: ['matrona'] }},
    {path:'control/:id/:ci',component:ControlComponent,canActivate:[AuthGuard],data: { roles: ['matrona','doctor'] }},
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
   
  ];
  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});