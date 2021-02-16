import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { liftIntoReject } from '@polpware/fe-utilities';
import { toPromise } from '@polpware/ngx-rxjs';
import { GlobalEventsService } from '@polpware/ngx-events';
import { NullSpinner } from '@polpware/ngx-spinner';
import { __extends } from 'tslib';

var ObservableCurdService = /** @class */ (function () {
    function ObservableCurdService(injector) {
        this.withCredentialOnRequest = true;
        this.subject = new BehaviorSubject([]);
        this.http = injector.get(HttpClient);
        this.eventsService = injector.get(GlobalEventsService);
        this.spinner = new NullSpinner();
    }
    ObservableCurdService.prototype.handleError = function (error) {
        this.eventsService.broadcast('http-error', [error]);
    };
    ObservableCurdService.prototype.onDataChange = function () {
        return this.subject.asObservable();
    };
    // Default methods
    ObservableCurdService.prototype.parseCreateResponse = function (record, data) {
        var id = data;
        record.id = id;
        return record;
    };
    ObservableCurdService.prototype.parseUpdateResponse = function (record, data) {
        return record;
    };
    ObservableCurdService.prototype.parseListResponse = function (data) {
        return data;
    };
    // Returns a list of entities
    ObservableCurdService.prototype.listRequest = function (options) {
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
    ObservableCurdService.prototype.getListAsync = function (options, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
        // In most cases, we do not need to send out a request
        // if we already have some data.
        if (this.getListGuard()) {
            return liftIntoReject('not allowed');
        }
        var spinner = mySpinner || this.spinner;
        spinner.show();
        return toPromise(this.listRequest(options))
            .then(function (data) {
            spinner.hide();
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
    ObservableCurdService.prototype.deleteByIdRequest = function (id) {
        return this.http.delete(this.deleteUrl(id), {
            withCredentials: this.withCredentialOnRequest
        });
    };
    ObservableCurdService.prototype.deleteByIdAsync = function (id, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
        if (this.deleteByIdGuard(id)) {
            return liftIntoReject('not allowed');
        }
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
    ObservableCurdService.prototype.adaptorCreateInput = function (record) {
        return record;
    };
    ObservableCurdService.prototype.createRequest = function (record) {
        var body = {};
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
    ObservableCurdService.prototype.createAsync = function (record, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
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
    ObservableCurdService.prototype.adaptorUpdateInput = function (record) {
        return record;
    };
    ObservableCurdService.prototype.updateRequest = function (record) {
        var body = {};
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
    ObservableCurdService.prototype.updateAsync = function (record, mySpinner) {
        var _this = this;
        if (mySpinner === void 0) { mySpinner = null; }
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

var ObservableDuetTableService = /** @class */ (function (_super) {
    __extends(ObservableDuetTableService, _super);
    function ObservableDuetTableService(injector) {
        return _super.call(this, injector) || this;
    }
    ObservableDuetTableService.prototype.buildPublishData = function () {
        var models = this.primaryTable.dataProvider().models;
        var data = models.map(function (x) { return x.attributes; });
        return data;
    };
    ObservableDuetTableService.prototype.listenToPrimaryTable = function () {
        var _this = this;
        this.primaryTable.dataProvider().on('update', function () {
            console.log('Received pimary table updates');
            var data = _this.buildPublishData();
            _this.subject.next(data);
        });
    };
    ObservableDuetTableService.prototype.publishInitData = function () {
        var data = this.buildPublishData();
        this.subject.next(data);
    };
    // Override
    ObservableDuetTableService.prototype.getListGuard = function () {
        return false;
    };
    // Implement
    ObservableDuetTableService.prototype.getById = function (id) {
        var model = this.primaryTable.get(id);
        if (model) {
            return model.attributes;
        }
        return null;
    };
    ObservableDuetTableService.prototype.getByIdAsync = function (id, mySpinner) {
        if (mySpinner === void 0) { mySpinner = null; }
        throw new Error('Not implemented');
    };
    // Override
    ObservableDuetTableService.prototype.deleteByIdGuard = function (id) {
        return false;
    };
    // Override
    ObservableDuetTableService.prototype.notifyDelete = function (id) {
        // Side effects
        var model = this.primaryTable.get(id);
        if (model) {
            model.destroyFromTable();
        }
    };
    // Override
    ObservableDuetTableService.prototype.notifyCreate = function (record) {
        this.primaryTable.add(record);
    };
    ObservableDuetTableService.prototype.notifyUpdate = function (record) {
        // The following op basically update what we have ...
        this.primaryTable.add(record);
    };
    return ObservableDuetTableService;
}(ObservableCurdService));

/*
 * Public API Surface of ngx-net-crud
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ObservableCurdService, ObservableDuetTableService };
//# sourceMappingURL=polpware-ngx-net-crud.js.map
