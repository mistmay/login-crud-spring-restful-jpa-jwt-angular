import { NgModule } from "@angular/core";
import { PanelRoutingModule } from "./panel-routing.module";
import { CommonModule } from "@angular/common";
import { FormBookComponent } from './components/form-book.component';
import { FormGenreComponent } from './components/form-genre.component';
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FormAuthorComponent } from "./components/form-author.component";
import { PanelComponent } from './views/panel.component';
import { TableComponent } from './components/table.component';

@NgModule({
    declarations: [
        FormBookComponent,
        FormGenreComponent,
        FormAuthorComponent,
        PanelComponent,
        TableComponent
    ],
    imports: [
        PanelRoutingModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        PanelComponent
    ]
})
export class PanelModule { }