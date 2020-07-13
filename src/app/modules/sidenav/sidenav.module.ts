import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../material/material.modules';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MaterialModule],
    exports: [SidenavComponent]
})
export class SidenavModule {}
