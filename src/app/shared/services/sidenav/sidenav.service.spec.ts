import RootState from 'src/app/ngxs/state/root.state';
import { NgxsModule, Store } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
    let service: SidenavService;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])]
        });
        store = TestBed.inject(Store);
        service = TestBed.inject(SidenavService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
