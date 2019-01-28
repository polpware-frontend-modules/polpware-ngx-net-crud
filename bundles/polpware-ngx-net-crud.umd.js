(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('rxjs'), require('@polpware/fe-utilities'), require('@polpware/ngx-rxjs'), require('@polpware/ngx-events'), require('@polpware/ngx-spinner')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-net-crud', ['exports', '@angular/common/http', 'rxjs', '@polpware/fe-utilities', '@polpware/ngx-rxjs', '@polpware/ngx-events', '@polpware/ngx-spinner'], factory) :
    (factory((global.polpware = global.polpware || {}, global.polpware['ngx-net-crud'] = {}),global.ng.common.http,global.rxjs,global.feUtilities,global.ngxRxjs,global.ngxEvents,global.ngxSpinner));
}(this, (function (exports,http,rxjs,feUtilities,ngxRxjs,ngxEvents,ngxSpinner) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */ ObservableCurdService = /** @class */ (function () {
        function ObservableCurdService(injector) {
            this.withCredentialOnRequest = true;
            this.subject = new rxjs.BehaviorSubject([]);
            this.http = injector.get(http.HttpClient);
            this.eventsService = injector.get(ngxEvents.GlobalEventsService);
            this.spinner = new ngxSpinner.NullSpinner();
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
                var httpParams = new http.HttpParams();
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
                if (mySpinner === void 0) {
                    mySpinner = null;
                }
                // In most cases, we do not need to send out a request
                // if we already have some data.
                if (this.getListGuard()) {
                    return feUtilities.liftIntoReject('not allowed');
                }
                /** @type {?} */
                var spinner = mySpinner || this.spinner;
                spinner.show();
                return ngxRxjs.toPromise(this.listRequest(options))
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
                if (mySpinner === void 0) {
                    mySpinner = null;
                }
                if (this.deleteByIdGuard(id)) {
                    return feUtilities.liftIntoReject('not allowed');
                }
                /** @type {?} */
                var spinner = mySpinner || this.spinner;
                spinner.show();
                return ngxRxjs.toPromise(this.deleteByIdRequest(id))
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
                if (mySpinner === void 0) {
                    mySpinner = null;
                }
                /** @type {?} */
                var spinner = mySpinner || this.spinner;
                spinner.show();
                return ngxRxjs.toPromise(this.createRequest(record))
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
                if (mySpinner === void 0) {
                    mySpinner = null;
                }
                /** @type {?} */
                var spinner = mySpinner || this.spinner;
                spinner.show();
                return ngxRxjs.toPromise(this.updateRequest(record))
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */ ObservableDuetTableService = /** @class */ (function (_super) {
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
                var models = ( /** @type {?} */(this.primaryTable.dataProvider().models));
                /** @type {?} */
                var data = models.map(function (x) { return ( /** @type {?} */(x.attributes)); });
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
                    return ( /** @type {?} */(model.attributes));
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
                if (mySpinner === void 0) {
                    mySpinner = null;
                }
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

    exports.ObservableCurdService = ObservableCurdService;
    exports.ObservableDuetTableService = ObservableDuetTableService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=polpware-ngx-net-crud.umd.js.map