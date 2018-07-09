import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipster3SharedModule } from 'app/shared';
import {
    ServicesComponent,
    ServicesDetailComponent,
    ServicesUpdateComponent,
    ServicesDeletePopupComponent,
    ServicesDeleteDialogComponent,
    servicesRoute,
    servicesPopupRoute
} from './';

const ENTITY_STATES = [...servicesRoute, ...servicesPopupRoute];

@NgModule({
    imports: [Jhipster3SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServicesComponent,
        ServicesDetailComponent,
        ServicesUpdateComponent,
        ServicesDeleteDialogComponent,
        ServicesDeletePopupComponent
    ],
    entryComponents: [ServicesComponent, ServicesUpdateComponent, ServicesDeleteDialogComponent, ServicesDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipster3ServicesModule {}
