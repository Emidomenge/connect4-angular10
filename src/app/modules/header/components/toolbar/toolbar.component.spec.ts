import { MatMenuModule } from '@angular/material/menu';
import { NgxsModule, Store } from '@ngxs/store';
import RootState from 'src/app/ngxs/state/root.state';
import { ThemingService } from './../../../../shared/services/theming/theming.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let store: Store;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState]), MatMenuModule],
            declarations: [ToolbarComponent],
            providers: [ThemingService]
        }).compileComponents();
        store = TestBed.inject(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
