import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditarIndicadorComponent} from "./editar-indicador/editar-indicador.component";
import {IndicatorsComponent} from "./indicators/indicators.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'editar-indicador/:id', component: EditarIndicadorComponent },
  { path: 'lista-de-indicadores', component: IndicatorsComponent },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
