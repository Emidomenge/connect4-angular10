import { BehaviorSubject } from 'rxjs';
import { breakpoints } from './../../../breakpoints/breakpoints';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

export type SupportedBreakpoints = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    breakpointBS = new BehaviorSubject<SupportedBreakpoints>('lg');
    private internalState = {
        lg: null,
        md: null,
        sm: null,
        xs: null,
        xxs: null
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
            .observe([`(max-width: ${breakpoints.screen_md_min}px)`])
            .subscribe((result) => this.updateInternalState({ sm: result.matches }));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_sm_min}px)`])
            .subscribe((result) => this.updateInternalState({ sm: result.matches }));

        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_sm_min}px)`])
            .subscribe((result) => this.updateInternalState({ xs: result.matches }));
        this.breakpointObserver
            .observe([`(min-width: ${breakpoints.screen_xs_min}px)`])
            .subscribe((result) => this.updateInternalState({ xs: result.matches }));
        // this.breakpointObserver
        //     .observe([`(min-width: ${breakpoints.screen_sm_min}px)`])
        //     .subscribe((result) => this.updateInternalState({ sm: result.matches }));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_xs_min}px)`])
            .subscribe((result) => this.updateInternalState({ xxs: result.matches }));
        this.breakpointObserver
            .observe([`(max-width: ${breakpoints.screen_sm_min}px)`])
            .subscribe((result) => this.updateInternalState({ xxs: result.matches }));
    }

    private detectCurrentBreakpoint(): SupportedBreakpoints {
        const { lg, md, sm, xs, xxs } = this.internalState;

        if (lg) {
            return 'lg';
        } else if (!lg && md) {
            return 'md';
        } else if (!lg && !md && sm) {
            return 'sm';
        } else if (!lg && !md && !sm && xs) {
            return 'xs';
        } else if (!lg && !md && !sm && !xs && xxs) {
            return 'xxs';
        } else {
            return 'xxs';
        }
    }

    private updateInternalState(payload: {
        lg?: boolean;
        md?: boolean;
        sm?: boolean;
        xs?: boolean;
        xxs?: boolean;
    }): void {
        this.internalState = { ...this.internalState, ...payload };
        this.breakpointBS.next(this.detectCurrentBreakpoint());
        console.log(this.detectCurrentBreakpoint(), 'breakp');
    }
}
