import { MaterialModule } from './../material/material.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { DiskComponent } from './components/disk/disk.component';

@NgModule({
    declarations: [BoardComponent, DiskComponent],
    imports: [CommonModule, MaterialModule],
    exports: [BoardComponent]
})
export class Connect4Module {}
