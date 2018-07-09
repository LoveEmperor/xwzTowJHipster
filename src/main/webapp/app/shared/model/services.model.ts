export interface IServices {
    id?: number;
    name?: string;
}

export class Services implements IServices {
    constructor(public id?: number, public name?: string) {}
}
