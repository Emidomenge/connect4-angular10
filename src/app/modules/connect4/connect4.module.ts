import { MaterialModule } from './../material/material.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { DiskComponent } from './components/disk/disk.component';
import { BannerInfoComponent } from './components/banner-info/banner-info.component';

@NgModule({
    declarations: [BoardComponent, DiskComponent, BannerInfoComponent],
    imports: [CommonModule, MaterialModule],
    exports: [BoardComponent, BannerInfoComponent]
})
export class Connect4Module {}
