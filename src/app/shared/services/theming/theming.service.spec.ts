import { TestBed } from '@angular/core/testing';

import { ThemingService } from './theming.service';

describe('ThemingService', () => {
    let service: ThemingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThemingService]
        });
        service = TestBed.inject(ThemingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
