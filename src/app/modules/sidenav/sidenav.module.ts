import { MaterialModule } from './../material/material.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MaterialModule],
    exports: [SidenavComponent]
})
export class SidenavModule {}
