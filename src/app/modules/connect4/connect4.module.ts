import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../material/material.modules';
import { BannerInfoComponent } from './components/banner-info/banner-info.component';
import { BoardComponent } from './components/board/board.component';
import { DiskComponent } from './components/disk/disk.component';

@NgModule({
    declarations: [BoardComponent, DiskComponent, BannerInfoComponent],
    imports: [CommonModule, MaterialModule],
    exports: [BoardComponent, BannerInfoComponent]
})
export class Connect4Module {}
