import { Injector } from '@angular/core';
import { IRelationalTable } from '@polpware/fe-data';
import { ISpinnerService } from '@polpware/ngx-spinner';
import { ObservableCurdService, IBaseEntity } from './observable-crud.service';
export { IBaseEntity } from './observable-crud.service';
export declare abstract class ObservableDuetTableService<T extends IBaseEntity> extends ObservableCurdService<T> {
    protected primaryTable: IRelationalTable;
    protected secondaryTable: IRelationalTable;
    constructor(injector: Injector);
    private buildPublishData;
    protected listenToPrimaryTable(): void;
    protected publishInitData(): void;
    protected getListGuard(): boolean;
    getById(id: string): T;
    getByIdAsync(id: string, mySpinner?: ISpinnerService): PromiseLike<T>;
    protected deleteByIdGuard(id: string): boolean;
    protected notifyDelete(id: string): void;
    protected notifyCreate(record: T): void;
    protected notifyUpdate(record: T): void;
}
