import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeTopComponent } from "./views/home-top.component";
import { LoginComponent } from './views/login.component';
import { RegisterComponent } from './views/register.component';

@NgModule({
    declarations: [
        HomeTopComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        HomeRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        HomeTopComponent
    ]
})
export class HomeModule { }