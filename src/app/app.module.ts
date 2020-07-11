import { MaterialModule } from './modules/material/material.modules';
import { SidenavService } from './shared/services/sidenav/sidenav.service';
import { SidenavModule } from './modules/sidenav/sidenav.module';
import { ThemingService } from './shared/services/theming/theming.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Connect4Module } from './modules/connect4/connect4.module';
import { HeaderModule } from './modules/header/header.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, Connect4Module, HeaderModule, SidenavModule, MaterialModule],
    providers: [ThemingService, SidenavService],
    bootstrap: [AppComponent]
})
export class AppModule {}
