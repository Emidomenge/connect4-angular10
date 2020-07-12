import { SwitchSoundToMute } from './../../../../ngxs/actions/appSettings.actions';
import { Observable } from 'rxjs';
import { MaterialModule } from './../../../material/material.modules';
import { AppState } from './../../../../ngxs/index';
import { MatMenuModule } from '@angular/material/menu';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import RootState from 'src/app/ngxs/state/root.state';
import { ThemingService } from './../../../../shared/services/theming/theming.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { AppSettingsState } from 'src/app/ngxs/state/appSettings.state';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let store: Store;
    let actions$: Observable<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([...RootState]),
                NgxsModule.forFeature([AppSettingsState]),
                MatMenuModule,
                MaterialModule
            ],
            declarations: [ToolbarComponent],
            providers: [ThemingService]
        }).compileComponents();
        store = TestBed.inject(Store);
        actions$ = TestBed.get(Actions);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should mute volume when clicking on the mute/unmute button - part 1', fakeAsync(() => {
        spyOn(component, 'muteSound');
        const button = fixture.debugElement.nativeElement.querySelector('.toolbar__mute-button');
        button.click();
        tick();
        expect(component.muteSound).toHaveBeenCalled();
    }));

    it('should mute volume when clicking on the mute/unmute button - part 2', (done) => {
        let ngxsState = store.selectSnapshot((state) => state) as AppState;
        const { soundMute } = ngxsState.appSettings;

        expect(soundMute).toEqual(false);

        actions$.pipe(ofActionDispatched(SwitchSoundToMute)).subscribe((_) => {
            ngxsState = store.selectSnapshot((state) => state);
            expect(ngxsState.appSettings.soundMute).toEqual(true);

            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelectorAll('.toolbar__mute-button').length).toEqual(0);
            expect(fixture.debugElement.nativeElement.querySelectorAll('.toolbar__unmute-button').length).toEqual(1);
            done();
        });

        const button = fixture.debugElement.nativeElement.querySelector('.toolbar__mute-button');
        button.click();
    });
});
