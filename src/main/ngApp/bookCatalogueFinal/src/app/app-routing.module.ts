import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { PanelRedirectGuard } from './guards/panel-redirect.guard';

const routes: Routes = [
  {
    path: 'panel',
    loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canLoad: [PanelRedirectGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
