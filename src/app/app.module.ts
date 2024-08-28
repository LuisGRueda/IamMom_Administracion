import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CentroComponent } from './components/centro/centro.component';
import { MatronaComponent } from './components/matrona/matrona.component';
import { ClasesComponent } from './components/clases/clases.component';
import { EmbarazadasComponent } from './components/embarazadas/embarazadas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunicadosComponent } from './components/comunicados/comunicados.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AddCentroComponent } from './components/add-centro/add-centro.component';
import { AddMatronaComponent } from './components/add-components/add-matrona/add-matrona.component';
import { AddEmbarazadaComponent } from './components/add-components/add-embarazada/add-embarazada.component';
import { AddComunicadosComponent } from './components/add-components/add-comunicados/add-comunicados.component';
import { AddClasesComponent } from './components/add-components/add-clases/add-clases.component';
import { MatronComponent } from './components/view-components/matron/matron.component';
import { CentComponent } from './components/view-components/cent/cent.component';
import { EmbarazadaComponent } from './components/view-components/embarazada/embarazada.component';
import { ClaseComponent } from './components/view-components/clase/clase.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistroClasesComponent } from './components/registro-clases/registro-clases.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ControlComponent } from './components/control/control.component';
import { AddHijoComponent } from './components/add-components/add-hijo/add-hijo.component';
import { AddConsultaComponent } from './components/add-components/add-consulta/add-consulta.component';
import { AddDoctorComponent } from './components/add-components/add-doctor/add-doctor.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { RecuperacionContrasenaComponent } from './components/recuperacion-contrasena/recuperacion-contrasena.component';
import { ConsultaComponent } from './components/consulta/consulta.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CentroComponent,
    MatronaComponent,
    ClasesComponent,
    EmbarazadasComponent,
    ComunicadosComponent,
    BuscadorComponent,
    AddCentroComponent,
    AddMatronaComponent,
    AddEmbarazadaComponent,
    AddComunicadosComponent,
    AddClasesComponent,
    MatronComponent,
    CentComponent,
    EmbarazadaComponent,
    ClaseComponent,
    PerfilComponent,
    LoginComponent,
    RegistroClasesComponent,
    ControlComponent,
    AddHijoComponent,
    AddConsultaComponent,
    AddDoctorComponent,
    DoctorComponent,
    RecuperacionContrasenaComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
