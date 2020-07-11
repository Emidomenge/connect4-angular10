import { Connect4Model } from './../ngxs/state/connect4.state';
import { AppSettingsModel } from './state/appSettings.state';

export type AppState = {
    appSettings: AppSettingsModel;
    connect4: Connect4Model;
};
