import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignatureComponent } from './components/signature/signature.component';

@NgModule({
    declarations: [SignatureComponent],
    imports: [CommonModule],
    exports: [SignatureComponent]
})
export class FooterModule {}
