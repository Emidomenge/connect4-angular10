import { ThemingService } from './../../shared/services/theming/theming.service';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetDarkMode, SetDarkModeArgs } from './../actions/appSettings.actions';

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
    constructor(private theming: ThemingService) {}

    @Selector()
    static getDarkMode(state: AppSettingsModel): boolean {
        return state.darkModeEnabled;
    }

    @Action(SetDarkMode)
    setDarkMode({ getState, patchState }: StateContext<AppSettingsModel>, payload: SetDarkModeArgs): void {
        const state = getState();
        patchState({
            ...state,
            darkModeEnabled: payload.isEnabled
        });
    }
}
