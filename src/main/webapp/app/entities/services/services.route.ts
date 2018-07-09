import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Services } from 'app/shared/model/services.model';
import { ServicesService } from './services.service';
import { ServicesComponent } from './services.component';
import { ServicesDetailComponent } from './services-detail.component';
import { ServicesUpdateComponent } from './services-update.component';
import { ServicesDeletePopupComponent } from './services-delete-dialog.component';
import { IServices } from 'app/shared/model/services.model';

@Injectable({ providedIn: 'root' })
export class ServicesResolve implements Resolve<IServices> {
    constructor(private service: ServicesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((services: HttpResponse<Services>) => services.body));
        }
        return of(new Services());
    }
}

export const servicesRoute: Routes = [
    {
        path: 'services',
        component: ServicesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster3App.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services/:id/view',
        component: ServicesDetailComponent,
        resolve: {
            services: ServicesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster3App.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services/new',
        component: ServicesUpdateComponent,
        resolve: {
            services: ServicesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster3App.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'services/:id/edit',
        component: ServicesUpdateComponent,
        resolve: {
            services: ServicesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster3App.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicesPopupRoute: Routes = [
    {
        path: 'services/:id/delete',
        component: ServicesDeletePopupComponent,
        resolve: {
            services: ServicesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster3App.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
