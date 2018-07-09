/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Jhipster3TestModule } from '../../../test.module';
import { ServicesDeleteDialogComponent } from 'app/entities/services/services-delete-dialog.component';
import { ServicesService } from 'app/entities/services/services.service';

describe('Component Tests', () => {
    describe('Services Management Delete Component', () => {
        let comp: ServicesDeleteDialogComponent;
        let fixture: ComponentFixture<ServicesDeleteDialogComponent>;
        let service: ServicesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster3TestModule],
                declarations: [ServicesDeleteDialogComponent]
            })
                .overrideTemplate(ServicesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServicesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
