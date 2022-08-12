import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeTopComponent } from "./views/home-top.component";
import { LoginComponent } from "./views/login.component";
import { RegisterComponent } from "./views/register.component";

const routes: Routes = [
    {
        path: '',
        component: HomeTopComponent,
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }