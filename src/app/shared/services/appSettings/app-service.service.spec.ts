import RootState from 'src/app/ngxs/state/root.state';
import { NgxsModule, Store } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

import { AppSettingsService } from './app-service.service';

describe('AppSettingsService', () => {
    let service: AppSettingsService;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])]
        });
        service = TestBed.inject(AppSettingsService);
        store = TestBed.inject(Store);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
