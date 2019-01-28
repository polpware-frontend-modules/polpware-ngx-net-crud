import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { liftIntoReject } from '@polpware/fe-utilities';
import { toPromise } from '@polpware/ngx-rxjs';
import { GlobalEventsService } from '@polpware/ngx-events';
import { NullSpinner } from '@polpware/ngx-spinner';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class ObservableCurdService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.withCredentialOnRequest = true;
        this.subject = new BehaviorSubject([]);
        this.http = injector.get(HttpClient);
        this.eventsService = injector.get(GlobalEventsService);
        this.spinner = new NullSpinner();
    }
    /**
     * @protected
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        this.eventsService.broadcast('http-error', [error]);
    }
    /**
     * @return {?}
     */
    onDataChange() {
        return this.subject.asObservable();
    }
    // Default methods
    /**
     * @protected
     * @param {?} record
     * @param {?} data
     * @return {?}
     */
    parseCreateResponse(record, data) {
        /** @type {?} */
        const id = data;
        record.id = id;
        return record;
    }
    /**
     * @protected
     * @param {?} record
     * @param {?} data
     * @return {?}
     */
    parseUpdateResponse(record, data) {
        return record;
    }
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    parseListResponse(data) {
        return data;
    }
    // Returns a list of entities
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    listRequest(options) {
        /** @type {?} */
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
    /**
     * @param {?} options
     * @param {?=} mySpinner
     * @return {?}
     */
    getListAsync(options, mySpinner = null) {
        // In most cases, we do not need to send out a request
        // if we already have some data.
        if (this.getListGuard()) {
            return liftIntoReject('not allowed');
        }
        /** @type {?} */
        const spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.listRequest(options))
            .then((data) => {
            spinner.hide();
            /** @type {?} */
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
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    deleteByIdRequest(id) {
        return this.http.delete(this.deleteUrl(id), {
            withCredentials: this.withCredentialOnRequest
        });
    }
    /**
     * @param {?} id
     * @param {?=} mySpinner
     * @return {?}
     */
    deleteByIdAsync(id, mySpinner = null) {
        if (this.deleteByIdGuard(id)) {
            return liftIntoReject('not allowed');
        }
        /** @type {?} */
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
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    adaptorCreateInput(record) {
        return record;
    }
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    createRequest(record) {
        /** @type {?} */
        const body = {};
        /** @type {?} */
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
    /**
     * @param {?} record
     * @param {?=} mySpinner
     * @return {?}
     */
    createAsync(record, mySpinner = null) {
        /** @type {?} */
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
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    adaptorUpdateInput(record) {
        return record;
    }
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    updateRequest(record) {
        /** @type {?} */
        const body = {};
        /** @type {?} */
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
    /**
     * @param {?} record
     * @param {?=} mySpinner
     * @return {?}
     */
    updateAsync(record, mySpinner = null) {
        /** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class ObservableDuetTableService extends ObservableCurdService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        super(injector);
    }
    /**
     * @private
     * @return {?}
     */
    buildPublishData() {
        /** @type {?} */
        const models = (/** @type {?} */ (this.primaryTable.dataProvider().models));
        /** @type {?} */
        const data = models.map((x) => (/** @type {?} */ (x.attributes)));
        return data;
    }
    /**
     * @protected
     * @return {?}
     */
    listenToPrimaryTable() {
        this.primaryTable.dataProvider().on('update', () => {
            console.log('Received pimary table updates');
            /** @type {?} */
            const data = this.buildPublishData();
            this.subject.next(data);
        });
    }
    /**
     * @protected
     * @return {?}
     */
    publishInitData() {
        /** @type {?} */
        const data = this.buildPublishData();
        this.subject.next(data);
    }
    // Override
    /**
     * @protected
     * @return {?}
     */
    getListGuard() {
        return false;
    }
    // Implement
    /**
     * @param {?} id
     * @return {?}
     */
    getById(id) {
        /** @type {?} */
        const model = this.primaryTable.get(id);
        if (model) {
            return (/** @type {?} */ (model.attributes));
        }
        return null;
    }
    /**
     * @param {?} id
     * @param {?=} mySpinner
     * @return {?}
     */
    getByIdAsync(id, mySpinner = null) {
        throw new Error('Not implemented');
    }
    // Override
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    deleteByIdGuard(id) {
        return false;
    }
    // Override
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    notifyDelete(id) {
        // Side effects
        /** @type {?} */
        const model = this.primaryTable.get(id);
        if (model) {
            model.destroyFromTable();
        }
    }
    // Override
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    notifyCreate(record) {
        this.primaryTable.add(record);
    }
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    notifyUpdate(record) {
        // The following op basically update what we have ...
        this.primaryTable.add(record);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ObservableCurdService, ObservableDuetTableService };

//# sourceMappingURL=polpware-ngx-net-crud.js.map