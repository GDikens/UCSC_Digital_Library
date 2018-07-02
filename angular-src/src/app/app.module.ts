import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatTableModule, 
  MatListModule, 
  MatButtonModule, 
  MatProgressSpinnerModule, 
  MatFormFieldModule, 
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatInputModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule 
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { SearchbookComponent } from './components/searchbook/searchbook.component';
import { ReservebookComponent } from './components/reservebook/reservebook.component';
import { FinesComponent } from './components/fines/fines.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AuthGuard } from './guards/auth.guard';
import { DataService } from './services/data.service';
import { ReturnbookComponent } from './components/returnbook/returnbook.component';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'profile', component: ProfileComponent}
  // {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    HomeNavbarComponent,
    SidebarComponent,
    ContentComponent,
    AddbookComponent,
    SearchbookComponent,
    ReservebookComponent,
    FinesComponent,
    ReturnbookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    SnotifyModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  providers: [
    ValidateService, 
    AuthService, 
    { 
      provide: 'SnotifyToastConfig', 
      useValue: ToastDefaults
    }, 
    SnotifyService, 
    AuthGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
