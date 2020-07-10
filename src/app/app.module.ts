import { ThemingService } from './shared/services/theming/theming.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Connect4Module } from './modules/connect4/connect4.module';
import { HeaderModule } from './modules/header/header.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, Connect4Module, NoopAnimationsModule, HeaderModule],
    providers: [ThemingService],
    bootstrap: [AppComponent]
})
export class AppModule {}
