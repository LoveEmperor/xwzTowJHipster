import { IServices } from 'app/shared/model//services.model';

export interface IApp {
    id?: number;
    name?: string;
    user?: IServices;
}

export class App implements IApp {
    constructor(public id?: number, public name?: string, public user?: IServices) {}
}
