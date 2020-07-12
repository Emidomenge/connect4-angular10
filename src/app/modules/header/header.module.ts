import { MaterialModule } from './../material/material.modules';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [CommonModule, MaterialModule],
    exports: [ToolbarComponent]
})
export class HeaderModule {}
