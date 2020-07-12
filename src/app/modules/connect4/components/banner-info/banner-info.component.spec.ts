import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { gameoverStateMock } from './../../../../mock/ngxs/gameover';
import { AppState } from './../../../../ngxs';
import RootState from './../../../../ngxs/state/root.state';
import { BannerInfoComponent } from './banner-info.component';

describe('BannerInfoComponent', () => {
    let component: BannerInfoComponent;
    let fixture: ComponentFixture<BannerInfoComponent>;
    let store: Store;

    describe('default behavior', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NgxsModule.forRoot([...RootState])],
                declarations: [BannerInfoComponent]
            }).compileComponents();
            store = TestBed.inject(Store);
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerInfoComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should say which player should play', () => {
            expect(fixture.nativeElement.querySelector('div.banner-info__player-name-label').innerText).toContain(
                'Player'
            );
            expect(fixture.nativeElement.querySelector('div.banner-info__player-name-section').innerText).toContain(
                'your turn'
            );
        });

        it('should not show game over by default', () => {
            expect(fixture.nativeElement.querySelectorAll('div.banner-info__game-over-section').length).toEqual(0);
            expect(component.isGameOver).toEqual(false);
        });

        it('should not play again button by default', () => {
            expect(fixture.nativeElement.querySelectorAll('div.banner-info__new-game-section').length).toEqual(0);
        });
    });

    describe('game over behavior', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NgxsModule.forRoot([...RootState])],
                declarations: [BannerInfoComponent]
            }).compileComponents();
            store = TestBed.inject(Store);
            store.reset({
                ...store.snapshot(),
                ...gameoverStateMock
            });
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerInfoComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should show play again button when game is over', () => {
            const ngxsState = store.selectSnapshot((state) => state);
            const { gameOver } = ngxsState.connect4;

            expect(gameOver).toEqual(true);
            expect(fixture.nativeElement.querySelectorAll('div.banner-info__new-game-section').length).toEqual(1);
        });

        it('should show show corresponding player wins', () => {
            (component as any).displayGameOver();
            fixture.detectChanges();
            const ngxsState = store.selectSnapshot((state) => state);
            const { gameOver, winner } = (ngxsState as AppState).connect4;

            expect(winner).toEqual(2);
            expect(fixture.nativeElement.querySelector('div.banner-info__player-name-section').innerText).toContain(
                'Player 2'
            );
            expect(fixture.nativeElement.querySelector('div.banner-info__player-name-section').innerText).toContain(
                'wins !'
            );
        });
    });
});
