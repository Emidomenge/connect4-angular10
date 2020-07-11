import { breakpoints } from './../../../../breakpoints/breakpoints';
import { connect4 } from './../../../../settings/index';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    nbColumn = connect4.nbColumns;
    nbRow = connect4.nbRows;
    rowHeight: string;
    i18nTest: string;
    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {
        this.rowHeight = '80vh';
        this.detectBreakpoint();
    }

    private detectBreakpoint(): void {
        const applyRowHeight = (rowHeightValue: string, result: BreakpointState) => {
            if (result.matches) {
                this.rowHeight = rowHeightValue;
            }
        };
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_xs_min}px)`])
            .subscribe((result) => applyRowHeight('40vh', result));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_md_min}px)`])
            .subscribe((result) => applyRowHeight('45vh', result));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_lg_min}px)`])
            .subscribe((result) => applyRowHeight('64vh', result));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_xs_min}px)`])
            .subscribe((result) => applyRowHeight('45vh', result));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_md_min}px)`])
            .subscribe((result) => applyRowHeight('64vh', result));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_lg_min}px)`])
            .subscribe((result) => applyRowHeight('80vh', result));
    }
}
