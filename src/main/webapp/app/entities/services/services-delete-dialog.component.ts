import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServices } from 'app/shared/model/services.model';
import { ServicesService } from './services.service';

@Component({
    selector: 'jhi-services-delete-dialog',
    templateUrl: './services-delete-dialog.component.html'
})
export class ServicesDeleteDialogComponent {
    services: IServices;

    constructor(private servicesService: ServicesService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.servicesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'servicesListModification',
                content: 'Deleted an services'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-services-delete-popup',
    template: ''
})
export class ServicesDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ services }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ServicesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.services = services;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
