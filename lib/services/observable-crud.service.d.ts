import { Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalEventsService } from '@polpware/ngx-events';
import { ISpinnerService } from '@polpware/ngx-spinner';
import { IBaseEntity } from '@polpware/ngx-model';
export { IBaseEntity } from '@polpware/ngx-model';
export declare abstract class ObservableCurdService<T extends IBaseEntity> {
    protected subject: BehaviorSubject<Array<T>>;
    protected http: HttpClient;
    protected eventsService: GlobalEventsService;
    protected spinner: ISpinnerService;
    protected withCredentialOnRequest: boolean;
    constructor(injector: Injector);
    protected abstract listUrl(...args: any[]): string;
    protected abstract deleteUrl(...args: any[]): string;
    protected abstract createUrl(...args: any[]): string;
    protected abstract updateUrl(...args: any[]): string;
    protected abstract getListGuard(): boolean;
    protected abstract deleteByIdGuard(id: string): boolean;
    protected abstract notifyList(data: Array<T>): void;
    protected abstract notifyDelete(id: string): void;
    protected abstract notifyCreate(record: T): any;
    protected abstract notifyUpdate(record: T): any;
    abstract getById(id: string): T;
    abstract getByIdAsync(id: string, mySpinner: ISpinnerService): PromiseLike<T>;
    protected handleError(error: HttpErrorResponse): void;
    onDataChange(): Observable<Array<T>>;
    protected parseCreateResponse(record: T, data: any): T;
    protected parseUpdateResponse(record: T, data: any): T;
    protected parseListResponse(data: any): T[];
    protected listRequest(options: {
        [key: string]: any;
    }): Observable<T[]>;
    getListAsync(options: {
        [key: string]: any;
    }, mySpinner?: ISpinnerService): PromiseLike<any>;
    protected deleteByIdRequest(id: string): Observable<{}>;
    deleteByIdAsync(id: string, mySpinner?: ISpinnerService): PromiseLike<any>;
    protected adaptorCreateInput(record: T): Object;
    protected createRequest(record: T): Observable<T>;
    createAsync(record: T, mySpinner?: ISpinnerService): PromiseLike<any>;
    protected adaptorUpdateInput(record: T): Object;
    protected updateRequest(record: T): Observable<T>;
    updateAsync(record: T, mySpinner?: ISpinnerService): PromiseLike<any>;
}
