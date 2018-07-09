import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServices } from 'app/shared/model/services.model';

type EntityResponseType = HttpResponse<IServices>;
type EntityArrayResponseType = HttpResponse<IServices[]>;

@Injectable({ providedIn: 'root' })
export class ServicesService {
    private resourceUrl = SERVER_API_URL + 'api/services';

    constructor(private http: HttpClient) {}

    create(services: IServices): Observable<EntityResponseType> {
        return this.http.post<IServices>(this.resourceUrl, services, { observe: 'response' });
    }

    update(services: IServices): Observable<EntityResponseType> {
        return this.http.put<IServices>(this.resourceUrl, services, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IServices>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IServices[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
