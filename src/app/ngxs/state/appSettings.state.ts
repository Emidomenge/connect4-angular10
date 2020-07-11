import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SetDarkMode } from './../actions/appSettings.actions';

export interface AppSettingsModel {
    darkModeEnabled: boolean;
}

@State<AppSettingsModel>({
    name: 'appSettings',
    defaults: {
        darkModeEnabled: false
    }
})
@Injectable()
export class AppSettingsState {
    constructor() {}

    @Selector()
    static getDarkMode(state: AppSettingsModel): boolean {
        return state.darkModeEnabled;
    }

    @Action(SetDarkMode)
    setDarkMode({ getState, patchState }: StateContext<AppSettingsModel>, payload: SetDarkMode): void {
        const state = getState();
        patchState({
            ...state,
            darkModeEnabled: payload.isEnabled
        });
    }
}
