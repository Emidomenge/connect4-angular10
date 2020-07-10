import { ThemingService } from './shared/services/theming/theming.service';
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'connect4-angular';
    themingSubscription: Subscription;
    constructor(private themingService: ThemingService) {}
    @HostBinding('class') public cssClass: string;

    ngOnInit(): void {
        this.themingSubscription = this.themingService.themeBS.subscribe((theme: string) => {
            this.cssClass = theme;
        });
    }

    ngOnDestroy(): void {
        this.themingSubscription.unsubscribe();
    }
}
