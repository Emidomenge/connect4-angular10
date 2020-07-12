import { NgxsModule, Store } from '@ngxs/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskComponent } from './disk.component';
import RootState from 'src/app/ngxs/state/root.state';

describe('DiskComponent', () => {
    let component: DiskComponent;
    let fixture: ComponentFixture<DiskComponent>;
    let store: Store;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState])],
            declarations: [DiskComponent]
        }).compileComponents();
        store = TestBed.inject(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DiskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
