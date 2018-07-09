import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IApp } from 'app/shared/model/app.model';
import { AppService } from './app.service';
import { IServices } from 'app/shared/model/services.model';
import { ServicesService } from 'app/entities/services';

@Component({
    selector: 'jhi-app-update',
    templateUrl: './app-update.component.html'
})
export class AppUpdateComponent implements OnInit {
    private _app: IApp;
    isSaving: boolean;

    users: IServices[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private appService: AppService,
        private servicesService: ServicesService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ app }) => {
            this.app = app;
        });
        this.servicesService.query({ filter: 'app-is-null' }).subscribe(
            (res: HttpResponse<IServices[]>) => {
                if (!this.app.user || !this.app.user.id) {
                    this.users = res.body;
                } else {
                    this.servicesService.find(this.app.user.id).subscribe(
                        (subRes: HttpResponse<IServices>) => {
                            this.users = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.app.id !== undefined) {
            this.subscribeToSaveResponse(this.appService.update(this.app));
        } else {
            this.subscribeToSaveResponse(this.appService.create(this.app));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IApp>>) {
        result.subscribe((res: HttpResponse<IApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackServicesById(index: number, item: IServices) {
        return item.id;
    }
    get app() {
        return this._app;
    }

    set app(app: IApp) {
        this._app = app;
    }
}
