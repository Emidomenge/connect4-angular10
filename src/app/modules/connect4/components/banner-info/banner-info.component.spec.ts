import { Store, NgxsModule } from '@ngxs/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import RootState from './../../../../ngxs/state/root.state';

import { BannerInfoComponent } from './banner-info.component';

describe('BannerInfoComponent', () => {
    let component: BannerInfoComponent;
    let fixture: ComponentFixture<BannerInfoComponent>;
    let store: Store;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])],
            declarations: [BannerInfoComponent]
        }).compileComponents();
        store = TestBed.inject(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
