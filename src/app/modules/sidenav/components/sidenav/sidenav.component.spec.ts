import { ThemingService } from './../../../../shared/services/theming/theming.service';
import RootState from 'src/app/ngxs/state/root.state';
import { NgxsModule, Store } from '@ngxs/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let store: Store;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])],
            providers: [ThemingService],
            declarations: [SidenavComponent]
        }).compileComponents();
        store = TestBed.inject(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
