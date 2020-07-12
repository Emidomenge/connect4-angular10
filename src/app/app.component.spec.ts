import { connect4 } from './settings/index';
import { AppState } from './ngxs/index';
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

    it('should render banner info', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('app-banner-info').length).toEqual(1);
    });

    it('should render a board', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('app-board').length).toEqual(1);
    });

    it('should render a signature footer', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('app-signature').length).toEqual(1);
    });

    it('should render a sidenav', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('app-signature').length).toEqual(1);
    });

    it('should have default ngxs store', () => {
        const ngxsState = store.selectSnapshot((state) => state);
        const { currentBoard, playerPlaying, winConditionResolved, gameOver, winner } = ngxsState.connect4;
        expect(currentBoard.length).toEqual(connect4.nbColumns * connect4.nbRows);

        // all values should be null
        expect(currentBoard.filter((i) => i === null).length).toEqual(connect4.nbColumns * connect4.nbRows);

        expect(playerPlaying).toEqual(null);
        expect(winConditionResolved).toEqual(null);
        expect(gameOver).toEqual(false);
        expect(winner).toEqual(null);
    });
});
