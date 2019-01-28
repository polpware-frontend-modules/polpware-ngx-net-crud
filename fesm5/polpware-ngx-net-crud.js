import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { liftIntoReject } from '@polpware/fe-utilities';
import { toPromise } from '@polpware/ngx-rxjs';
import { GlobalEventsService } from '@polpware/ngx-events';
import { NullSpinner } from '@polpware/ngx-spinner';
import { __extends } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
ObservableCurdService = /** @class */ (function () {
    function ObservableCurdService(injector) {
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
    ObservableCurdService.prototype.handleError = /**
     * @protected
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.eventsService.broadcast('http-error', [error]);
    };
    /**
     * @return {?}
     */
    ObservableCurdService.prototype.onDataChange = /**
     * @return {?}
     */
    function () {
        return this.subject.asObservable();
    };
    // Default methods
    // Default methods
    /**
     * @protected
     * @param {?} record
     * @param {?} data
     * @return {?}
     */
    ObservableCurdService.prototype.parseCreateResponse = 
    // Default methods
    /**
     * @protected
     * @param {?} record
     * @param {?} data
     * @return {?}
     */
    function (record, data) {
        /** @type {?} */
        var id = data;
        record.id = id;
        return record;
    };
    /**
     * @protected
     * @param {?} record
     * @param {?} data
     * @return {?}
     */
    ObservableCurdService.prototype.parseUpdateResponse = /**
     * @protected
     * @param {?} record
     * @param {?} data
     * @return {?}
     */
    function (record, data) {
        return record;
    };
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    ObservableCurdService.prototype.parseListResponse = /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return data;
    };
    // Returns a list of entities
    // Returns a list of entities
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    ObservableCurdService.prototype.listRequest = 
    // Returns a list of entities
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var httpParams = new HttpParams();
        for (var k in options) {
            if (options.hasOwnProperty(k)) {
                httpParams = httpParams.set(k, options[k]);
            }
        }
        return this.http.get(this.listUrl(), {
            withCredentials: this.withCredentialOnRequest,
            params: httpParams
        });
    };
    /**
     * @param {?} options
     * @param {?=} mySpinner
     * @return {?}
     */
    ObservableCurdService.prototype.getListAsync = /**
     * @param {?} options
     * @param {?=} mySpinner
     * @return {?}
     */
    function (options, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
        // In most cases, we do not need to send out a request
        // if we already have some data.
        if (this.getListGuard()) {
            return liftIntoReject('not allowed');
        }
        /** @type {?} */
        var spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.listRequest(options))
            .then(function (data) {
            spinner.hide();
            /** @type {?} */
            var newData = _this.parseListResponse(data);
            _this.notifyList(newData);
            return newData;
        }, function (error) {
            spinner.hide();
            _this.handleError(error);
            return error;
        });
    };
    // Use post instead of delete method to implement delelete ??
    // Use post instead of delete method to implement delelete ??
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    ObservableCurdService.prototype.deleteByIdRequest = 
    // Use post instead of delete method to implement delelete ??
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.delete(this.deleteUrl(id), {
            withCredentials: this.withCredentialOnRequest
        });
    };
    /**
     * @param {?} id
     * @param {?=} mySpinner
     * @return {?}
     */
    ObservableCurdService.prototype.deleteByIdAsync = /**
     * @param {?} id
     * @param {?=} mySpinner
     * @return {?}
     */
    function (id, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
        if (this.deleteByIdGuard(id)) {
            return liftIntoReject('not allowed');
        }
        /** @type {?} */
        var spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.deleteByIdRequest(id))
            .then(function (x) {
            spinner.hide();
            _this.notifyDelete(id);
            return id;
        }, function (error) {
            spinner.hide();
            _this.handleError(error);
            return error;
        });
    };
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableCurdService.prototype.adaptorCreateInput = /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    function (record) {
        return record;
    };
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableCurdService.prototype.createRequest = /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    function (record) {
        /** @type {?} */
        var body = {};
        /** @type {?} */
        var tyRecord = this.adaptorCreateInput(record);
        for (var prop in tyRecord) {
            if (tyRecord.hasOwnProperty(prop)) {
                body[prop] = tyRecord[prop];
            }
        }
        return this.http.post(this.createUrl(), body, {
            withCredentials: this.withCredentialOnRequest
        });
    };
    /**
     * @param {?} record
     * @param {?=} mySpinner
     * @return {?}
     */
    ObservableCurdService.prototype.createAsync = /**
     * @param {?} record
     * @param {?=} mySpinner
     * @return {?}
     */
    function (record, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
        /** @type {?} */
        var spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.createRequest(record))
            .then(function (x) {
            spinner.hide();
            // Side effects
            record = _this.parseCreateResponse(record, x);
            _this.notifyCreate(record);
            return record;
        }, function (error) {
            spinner.hide();
            _this.handleError(error);
            return error;
        });
    };
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableCurdService.prototype.adaptorUpdateInput = /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    function (record) {
        return record;
    };
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableCurdService.prototype.updateRequest = /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    function (record) {
        /** @type {?} */
        var body = {};
        /** @type {?} */
        var tyRecord = this.adaptorUpdateInput(record);
        for (var prop in tyRecord) {
            if (tyRecord.hasOwnProperty(prop)) {
                body[prop] = tyRecord[prop];
            }
        }
        return this.http.put(this.updateUrl(record.id), body, {
            withCredentials: this.withCredentialOnRequest
        });
    };
    /**
     * @param {?} record
     * @param {?=} mySpinner
     * @return {?}
     */
    ObservableCurdService.prototype.updateAsync = /**
     * @param {?} record
     * @param {?=} mySpinner
     * @return {?}
     */
    function (record, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
        /** @type {?} */
        var spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.updateRequest(record))
            .then(function (x) {
            spinner.hide();
            // Side effects
            record = _this.parseUpdateResponse(record, x);
            _this.notifyUpdate(record);
            return record;
        }, function (error) {
            spinner.hide();
            // TODO: error handling
            _this.handleError(error);
            return error;
        });
    };
    return ObservableCurdService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
ObservableDuetTableService = /** @class */ (function (_super) {
    __extends(ObservableDuetTableService, _super);
    function ObservableDuetTableService(injector) {
        return _super.call(this, injector) || this;
    }
    /**
     * @private
     * @return {?}
     */
    ObservableDuetTableService.prototype.buildPublishData = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var models = (/** @type {?} */ (this.primaryTable.dataProvider().models));
        /** @type {?} */
        var data = models.map(function (x) { return (/** @type {?} */ (x.attributes)); });
        return data;
    };
    /**
     * @protected
     * @return {?}
     */
    ObservableDuetTableService.prototype.listenToPrimaryTable = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.primaryTable.dataProvider().on('update', function () {
            console.log('Received pimary table updates');
            /** @type {?} */
            var data = _this.buildPublishData();
            _this.subject.next(data);
        });
    };
    /**
     * @protected
     * @return {?}
     */
    ObservableDuetTableService.prototype.publishInitData = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var data = this.buildPublishData();
        this.subject.next(data);
    };
    // Override
    // Override
    /**
     * @protected
     * @return {?}
     */
    ObservableDuetTableService.prototype.getListGuard = 
    // Override
    /**
     * @protected
     * @return {?}
     */
    function () {
        return false;
    };
    // Implement
    // Implement
    /**
     * @param {?} id
     * @return {?}
     */
    ObservableDuetTableService.prototype.getById = 
    // Implement
    /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var model = this.primaryTable.get(id);
        if (model) {
            return (/** @type {?} */ (model.attributes));
        }
        return null;
    };
    /**
     * @param {?} id
     * @param {?=} mySpinner
     * @return {?}
     */
    ObservableDuetTableService.prototype.getByIdAsync = /**
     * @param {?} id
     * @param {?=} mySpinner
     * @return {?}
     */
    function (id, mySpinner) {
        if (mySpinner === void 0) { mySpinner = null; }
        throw new Error('Not implemented');
    };
    // Override
    // Override
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    ObservableDuetTableService.prototype.deleteByIdGuard = 
    // Override
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return false;
    };
    // Override
    // Override
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    ObservableDuetTableService.prototype.notifyDelete = 
    // Override
    /**
     * @protected
     * @param {?} id
     * @return {?}
     */
    function (id) {
        // Side effects
        /** @type {?} */
        var model = this.primaryTable.get(id);
        if (model) {
            model.destroyFromTable();
        }
    };
    // Override
    // Override
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableDuetTableService.prototype.notifyCreate = 
    // Override
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    function (record) {
        this.primaryTable.add(record);
    };
    /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableDuetTableService.prototype.notifyUpdate = /**
     * @protected
     * @param {?} record
     * @return {?}
     */
    function (record) {
        // The following op basically update what we have ...
        this.primaryTable.add(record);
    };
    return ObservableDuetTableService;
}(ObservableCurdService));

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