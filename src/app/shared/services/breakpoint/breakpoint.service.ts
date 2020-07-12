import { BehaviorSubject } from 'rxjs';
import { breakpoints } from './../../../breakpoints/breakpoints';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

export type SupportedBreakpoints = 'xs' | 'sm' | 'md' | 'lg';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    breakpointBS = new BehaviorSubject<SupportedBreakpoints>('lg');
    private internalState = {
        lg: null,
        md: null,
        sm: null,
        xs: null
    };
    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_lg_min}px)`])
            .subscribe((result) => this.updateInternalState({ lg: result.matches }));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_lg_min}px)`])
            .subscribe((result) => this.updateInternalState({ md: result.matches }));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_md_min}px)`])
            .subscribe((result) => this.updateInternalState({ md: result.matches }));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_sm_min}px)`])
            .subscribe((result) => this.updateInternalState({ sm: result.matches }));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_sm_min}px)`])
            .subscribe((result) => this.updateInternalState({ xs: result.matches }));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_md_min}px)`])
            .subscribe((result) => this.updateInternalState({ xs: result.matches }));
    }

    private detectCurrentBreakpoint(): SupportedBreakpoints {
        const { lg, md, sm, xs } = this.internalState;

        if (lg) {
            return 'lg';
        } else if (!lg && md) {
            return 'md';
        } else if (!lg && !md && sm) {
            return 'sm';
        } else if (!lg && !md && !sm && xs) {
            return 'xs';
        } else {
            return 'xs';
        }
    }

    private updateInternalState(payload: { lg?: boolean; md?: boolean; sm?: boolean; xs?: boolean }): void {
        this.internalState = { ...this.internalState, ...payload };
        this.breakpointBS.next(this.detectCurrentBreakpoint());
    }
}
