import RootState from 'src/app/ngxs/state/root.state';
import { NgxsModule, Store } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

import { AudioService } from './audio.service';

describe('AudioService', () => {
    let service: AudioService;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])]
        });
        store = TestBed.inject(Store);
        service = TestBed.inject(AudioService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
