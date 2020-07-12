import { NgxsModule, Store } from '@ngxs/store';
import RootState from 'src/app/ngxs/state/root.state';
import { TestBed } from '@angular/core/testing';

import { Connect4Service } from './connect4.service';

describe('Connect4Service', () => {
    let service: Connect4Service;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])]
        });
        service = TestBed.inject(Connect4Service);
        store = TestBed.inject(Store);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
