import { Connect4Module } from './modules/connect4/connect4.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, Connect4Module],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
