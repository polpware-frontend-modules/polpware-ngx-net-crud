import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { liftIntoReject } from '@polpware/fe-utilities';
import { toPromise } from '@polpware/ngx-rxjs';
import { GlobalEventsService } from '@polpware/ngx-events';
import { NullSpinner } from '@polpware/ngx-spinner';

class ObservableCurdService {
    constructor(injector) {
        this.withCredentialOnRequest = true;
        this.subject = new BehaviorSubject([]);
        this.http = injector.get(HttpClient);
        this.eventsService = injector.get(GlobalEventsService);
        this.spinner = new NullSpinner();
    }
    handleError(error) {
        this.eventsService.broadcast('http-error', [error]);
    }
    onDataChange() {
        return this.subject.asObservable();
    }
    // Default methods
    parseCreateResponse(record, data) {
        const id = data;
        record.id = id;
        return record;
    }
    parseUpdateResponse(record, data) {
        return record;
    }
    parseListResponse(data) {
        return data;
    }
    // Returns a list of entities
    listRequest(options) {
        let httpParams = new HttpParams();
        for (const k in options) {
            if (options.hasOwnProperty(k)) {
                httpParams = httpParams.set(k, options[k]);
            }
        }
        return this.http.get(this.listUrl(), {
            withCredentials: this.withCredentialOnRequest,
            params: httpParams
        });
    }
    getListAsync(options, mySpinner = null) {
        // In most cases, we do not need to send out a request
        // if we already have some data.
        if (this.getListGuard()) {
            return liftIntoReject('not allowed');
        }
        const spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.listRequest(options))
            .then((data) => {
            spinner.hide();
            const newData = this.parseListResponse(data);
            this.notifyList(newData);
            return newData;
        }, (error) => {
            spinner.hide();
            this.handleError(error);
            return error;
        });
    }
    // Use post instead of delete method to implement delelete ??
    deleteByIdRequest(id) {
        return this.http.delete(this.deleteUrl(id), {
            withCredentials: this.withCredentialOnRequest
        });
    }
    deleteByIdAsync(id, mySpinner = null) {
        if (this.deleteByIdGuard(id)) {
            return liftIntoReject('not allowed');
        }
        const spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.deleteByIdRequest(id))
            .then((x) => {
            spinner.hide();
            this.notifyDelete(id);
            return id;
        }, (error) => {
            spinner.hide();
            this.handleError(error);
            return error;
        });
    }
    adaptorCreateInput(record) {
        return record;
    }
    createRequest(record) {
        const body = {};
        const tyRecord = this.adaptorCreateInput(record);
        for (const prop in tyRecord) {
            if (tyRecord.hasOwnProperty(prop)) {
                body[prop] = tyRecord[prop];
            }
        }
        return this.http.post(this.createUrl(), body, {
            withCredentials: this.withCredentialOnRequest
        });
    }
    createAsync(record, mySpinner = null) {
        const spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.createRequest(record))
            .then((x) => {
            spinner.hide();
            // Side effects
            record = this.parseCreateResponse(record, x);
            this.notifyCreate(record);
            return record;
        }, (error) => {
            spinner.hide();
            this.handleError(error);
            return error;
        });
    }
    adaptorUpdateInput(record) {
        return record;
    }
    updateRequest(record) {
        const body = {};
        const tyRecord = this.adaptorUpdateInput(record);
        for (const prop in tyRecord) {
            if (tyRecord.hasOwnProperty(prop)) {
                body[prop] = tyRecord[prop];
            }
        }
        return this.http.put(this.updateUrl(record.id), body, {
            withCredentials: this.withCredentialOnRequest
        });
    }
    updateAsync(record, mySpinner = null) {
        const spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.updateRequest(record))
            .then((x) => {
            spinner.hide();
            // Side effects
            record = this.parseUpdateResponse(record, x);
            this.notifyUpdate(record);
            return record;
        }, (error) => {
            spinner.hide();
            // TODO: error handling
            this.handleError(error);
            return error;
        });
    }
}

class ObservableDuetTableService extends ObservableCurdService {
    constructor(injector) {
        super(injector);
    }
    buildPublishData() {
        const models = this.primaryTable.dataProvider().models;
        const data = models.map((x) => x.attributes);
        return data;
    }
    listenToPrimaryTable() {
        this.primaryTable.dataProvider().on('update', () => {
            console.log('Received pimary table updates');
            const data = this.buildPublishData();
            this.subject.next(data);
        });
    }
    publishInitData() {
        const data = this.buildPublishData();
        this.subject.next(data);
    }
    // Override
    getListGuard() {
        return false;
    }
    // Implement
    getById(id) {
        const model = this.primaryTable.get(id);
        if (model) {
            return model.attributes;
        }
        return null;
    }
    getByIdAsync(id, mySpinner = null) {
        throw new Error('Not implemented');
    }
    // Override
    deleteByIdGuard(id) {
        return false;
    }
    // Override
    notifyDelete(id) {
        // Side effects
        const model = this.primaryTable.get(id);
        if (model) {
            model.destroyFromTable();
        }
    }
    // Override
    notifyCreate(record) {
        this.primaryTable.add(record);
    }
    notifyUpdate(record) {
        // The following op basically update what we have ...
        this.primaryTable.add(record);
    }
}

/*
 * Public API Surface of ngx-net-crud
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ObservableCurdService, ObservableDuetTableService };
//# sourceMappingURL=polpware-ngx-net-crud.js.map
