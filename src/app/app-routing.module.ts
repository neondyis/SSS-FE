import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {LoginActivate} from "./guard/LoginActive";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {RepairDashComponent} from "./component/repair-dash/repair-dash.component";
import {VacuumDashComponent} from "./component/vacuum-dash/vacuum-dash.component";
import {KnowledgeDashComponent} from "./component/knowledge-dash/knowledge-dash.component";
import {VacuumComponent} from "./component/vacuum/vacuum.component";
import {ServiceDetailComponent} from "./component/service-detail/service-detail.component";

const routes: Routes = [
  {path: '',   redirectTo: '/home', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'repair-dash', component: RepairDashComponent},
  {path:'vacuum-dash', component: VacuumDashComponent},
  {path:'knowledge-dash', component: KnowledgeDashComponent},
  {path: 'vacuum', component: VacuumComponent},
  {path: 'service/detail/:id',component: ServiceDetailComponent},
  {path:'home',component: DashboardComponent, data: { requiresLogin: true }, canActivate:[LoginActivate]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
