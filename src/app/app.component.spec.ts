import { ThemingService } from './shared/services/theming/theming.service';
import { NgxsModule, Store } from '@ngxs/store';
import RootState from 'src/app/ngxs/state/root.state';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])],
            providers: [ThemingService],
            declarations: [AppComponent]
        }).compileComponents();
        store = TestBed.inject(Store);
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'connect4-angular'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('connect4-angular');
    });

    it('should render toolbar', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('app-toolbar').length).toEqual(1);
    });
});
