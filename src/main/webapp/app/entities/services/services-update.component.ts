import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IServices } from 'app/shared/model/services.model';
import { ServicesService } from './services.service';

@Component({
    selector: 'jhi-services-update',
    templateUrl: './services-update.component.html'
})
export class ServicesUpdateComponent implements OnInit {
    private _services: IServices;
    isSaving: boolean;

    constructor(private servicesService: ServicesService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ services }) => {
            this.services = services;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.services.id !== undefined) {
            this.subscribeToSaveResponse(this.servicesService.update(this.services));
        } else {
            this.subscribeToSaveResponse(this.servicesService.create(this.services));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServices>>) {
        result.subscribe((res: HttpResponse<IServices>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get services() {
        return this._services;
    }

    set services(services: IServices) {
        this._services = services;
    }
}
