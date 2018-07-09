import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServices } from 'app/shared/model/services.model';

@Component({
    selector: 'jhi-services-detail',
    templateUrl: './services-detail.component.html'
})
export class ServicesDetailComponent implements OnInit {
    services: IServices;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ services }) => {
            this.services = services;
        });
    }

    previousState() {
        window.history.back();
    }
}
