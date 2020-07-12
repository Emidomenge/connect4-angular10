import { UpdateBoard } from './../../ngxs/actions/connect4.actions';
import { Observable } from 'rxjs';
import { Connect4State } from './../../ngxs/state/connect4.state';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import RootState from 'src/app/ngxs/state/root.state';
import { TestBed } from '@angular/core/testing';

import { Connect4Service } from './connect4.service';

describe('Connect4Service', () => {
    let service: Connect4Service;
    let store: Store;
    let actions$: Observable<any>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([...RootState]), NgxsModule.forFeature([Connect4State])]
        });
        service = TestBed.inject(Connect4Service);
        store = TestBed.inject(Store);
        actions$ = TestBed.get(Actions);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly update board when a disk is add - part 1', (done) => {
        let ngxsState = store.selectSnapshot((state) => state);
        const { currentBoard } = ngxsState.connect4;
        expect(currentBoard.filter((disk) => disk !== null).length).toEqual(0);
        actions$.pipe(ofActionDispatched(UpdateBoard)).subscribe((_) => {
            ngxsState = store.selectSnapshot((state) => state);
            expect(ngxsState.connect4.currentBoard[2]).toEqual(1);
            expect(ngxsState.connect4.currentBoard.filter((disk) => disk !== null).length).toEqual(1);
            done();
        });
        service.addDiskInColumn(2, 1);
    });
});
