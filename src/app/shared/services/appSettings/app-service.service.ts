import { SetDarkMode, SwitchSoundToMute } from './../../../ngxs/actions/appSettings.actions';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService {
    constructor(private store: Store) {}

    public setDarkmode(value: boolean): void {
        this.store.dispatch(new SetDarkMode(value));
    }

    public switchSoundToMute(value: boolean): void {
        this.store.dispatch(new SwitchSoundToMute(value));
    }
}
