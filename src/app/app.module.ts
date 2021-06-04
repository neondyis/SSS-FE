import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { LoginComponent } from './component/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {LoginActivate} from "./guard/LoginActive";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { FlexLayoutModule } from '@angular/flex-layout';
import { RepairDashComponent } from './component/repair-dash/repair-dash.component';
import { KnowledgeDashComponent } from './component/knowledge-dash/knowledge-dash.component';
import { VacuumDashComponent } from './component/vacuum-dash/vacuum-dash.component';
import { DashCardComponent } from './component/dashboard/dash-card/dash-card.component';
import {AuthInterceptor} from "./interceptor/AuthInterceptor";
import { VacuumComponent } from './component/vacuum/vacuum.component';
import { VacuumDialogComponent } from './component/dashboard/vacuum-dialog/vacuum-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AngularSvgIconModule} from "angular-svg-icon";
import { MiniDashCardComponent } from './component/dashboard/mini-dash-card/mini-dash-card.component';
import { CreateVacuumComponent } from './component/create-vacuum/create-vacuum.component';
import {MatSelectModule} from "@angular/material/select";
import { ServiceDetailComponent } from './component/service-detail/service-detail.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ServiceVacuumDialogComponent } from './component/dashboard/service-vacuum-dialog/service-vacuum-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RepairDashComponent,
    KnowledgeDashComponent,
    VacuumDashComponent,
    DashCardComponent,
    VacuumComponent,
    VacuumDialogComponent,
    MiniDashCardComponent,
    CreateVacuumComponent,
    ServiceDetailComponent,
    ServiceVacuumDialogComponent,
  ],
  imports: [
    BrowserModule,
    AngularSvgIconModule.forRoot(),
    MatDialogModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    MatProgressBarModule,
    MatExpansionModule,
    ScrollingModule,
    MatCheckboxModule,
  ],
  providers: [LoginActivate, {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
