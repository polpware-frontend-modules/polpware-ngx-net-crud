/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { liftIntoReject } from '@polpware/fe-utilities';
import { toPromise } from '@polpware/ngx-rxjs';
import { GlobalEventsService } from '@polpware/ngx-events';
import { NullSpinner } from '@polpware/ngx-spinner';
/**
 * @abstract
 * @template T
 */
var /**
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
 * @abstract
 * @template T
 */
export { ObservableCurdService };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    ObservableCurdService.prototype.subject;
    /**
     * @type {?}
     * @protected
     */
    ObservableCurdService.prototype.http;
    /**
     * @type {?}
     * @protected
     */
    ObservableCurdService.prototype.eventsService;
    /**
     * @type {?}
     * @protected
     */
    ObservableCurdService.prototype.spinner;
    /**
     * @type {?}
     * @protected
     */
    ObservableCurdService.prototype.withCredentialOnRequest;
    /**
     * @abstract
     * @protected
     * @param {...?} args
     * @return {?}
     */
    ObservableCurdService.prototype.listUrl = function (args) { };
    /**
     * @abstract
     * @protected
     * @param {...?} args
     * @return {?}
     */
    ObservableCurdService.prototype.deleteUrl = function (args) { };
    /**
     * @abstract
     * @protected
     * @param {...?} args
     * @return {?}
     */
    ObservableCurdService.prototype.createUrl = function (args) { };
    /**
     * @abstract
     * @protected
     * @param {...?} args
     * @return {?}
     */
    ObservableCurdService.prototype.updateUrl = function (args) { };
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    ObservableCurdService.prototype.getListGuard = function () { };
    /**
     * @abstract
     * @protected
     * @param {?} id
     * @return {?}
     */
    ObservableCurdService.prototype.deleteByIdGuard = function (id) { };
    /**
     * @abstract
     * @protected
     * @param {?} data
     * @return {?}
     */
    ObservableCurdService.prototype.notifyList = function (data) { };
    /**
     * @abstract
     * @protected
     * @param {?} id
     * @return {?}
     */
    ObservableCurdService.prototype.notifyDelete = function (id) { };
    /**
     * @abstract
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableCurdService.prototype.notifyCreate = function (record) { };
    /**
     * @abstract
     * @protected
     * @param {?} record
     * @return {?}
     */
    ObservableCurdService.prototype.notifyUpdate = function (record) { };
    /**
     * @abstract
     * @param {?} id
     * @return {?}
     */
    ObservableCurdService.prototype.getById = function (id) { };
    /**
     * @abstract
     * @param {?} id
     * @param {?} mySpinner
     * @return {?}
     */
    ObservableCurdService.prototype.getByIdAsync = function (id, mySpinner) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1jcnVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW5ldC1jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ic2VydmFibGUtY3J1ZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUE2QixVQUFVLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFFNUcsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRS9DLE9BQU8sRUFDSCxtQkFBbUIsRUFDdEIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBRUgsV0FBVyxFQUNkLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBVS9COzs7OztJQVVJLCtCQUFZLFFBQWtCO1FBRTFCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFFcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQXFCUywyQ0FBVzs7Ozs7SUFBckIsVUFBc0IsS0FBd0I7UUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7O0lBRU0sNENBQVk7OztJQUFuQjtRQUNJLE9B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M0MscUVBQTJDOzs7Ozs7SUFFM0MsNERBQWdDOzs7Ozs7O0lBQ2hDLDRFQUE4RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGxpZnRJbnRvUmVqZWN0IH0gZnJvbSAnQHBvbHB3YXJlL2ZlLXV0aWxpdGllcyc7XG5cbmltcG9ydCB7IHRvUHJvbWlzZSB9IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtcnhqcyc7XG5cbmltcG9ydCB7XG4gICAgR2xvYmFsRXZlbnRzU2VydmljZVxufSBmcm9tICdAcG9scHdhcmUvbmd4LWV2ZW50cyc7XG5cbmltcG9ydCB7XG4gICAgSVNwaW5uZXJTZXJ2aWNlLFxuICAgIE51bGxTcGlubmVyXG59IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtc3Bpbm5lcic7XG5cbmltcG9ydCB7XG4gICAgSUJhc2VFbnRpdHlcbn0gZnJvbSAnQHBvbHB3YXJlL25neC1tb2RlbCc7XG5cbmV4cG9ydCB7XG4gICAgSUJhc2VFbnRpdHlcbn0gZnJvbSAnQHBvbHB3YXJlL25neC1tb2RlbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPYnNlcnZhYmxlQ3VyZFNlcnZpY2U8VCBleHRlbmRzIElCYXNlRW50aXR5PiB7XG5cbiAgICBwcm90ZWN0ZWQgc3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PEFycmF5PFQ+PjtcblxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50O1xuICAgIHByb3RlY3RlZCBldmVudHNTZXJ2aWNlOiBHbG9iYWxFdmVudHNTZXJ2aWNlO1xuICAgIHByb3RlY3RlZCBzcGlubmVyOiBJU3Bpbm5lclNlcnZpY2U7XG5cbiAgICBwcm90ZWN0ZWQgd2l0aENyZWRlbnRpYWxPblJlcXVlc3Q6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IpIHtcblxuICAgICAgICB0aGlzLndpdGhDcmVkZW50aWFsT25SZXF1ZXN0ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgICAgICB0aGlzLmh0dHAgPSBpbmplY3Rvci5nZXQoSHR0cENsaWVudCk7XG4gICAgICAgIHRoaXMuZXZlbnRzU2VydmljZSA9IGluamVjdG9yLmdldChHbG9iYWxFdmVudHNTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLnNwaW5uZXIgPSBuZXcgTnVsbFNwaW5uZXIoKTtcbiAgICB9XG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gYWJzdHJhY3QgbWV0aG9kc1xuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbGlzdFVybCguLi5hcmdzOiBhbnlbXSk6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVsZXRlVXJsKC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVVcmwoLi4uYXJnczogYW55W10pOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHVwZGF0ZVVybCguLi5hcmdzOiBhbnlbXSk6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRMaXN0R3VhcmQoKTogYm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVsZXRlQnlJZEd1YXJkKGlkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG5vdGlmeUxpc3QoZGF0YTogQXJyYXk8VD4pOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBub3RpZnlEZWxldGUoaWQ6IHN0cmluZyk6IHZvaWQ7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG5vdGlmeUNyZWF0ZShyZWNvcmQ6IFQpO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBub3RpZnlVcGRhdGUocmVjb3JkOiBUKTtcblxuICAgIGFic3RyYWN0IGdldEJ5SWQoaWQ6IHN0cmluZyk6IFQ7XG4gICAgYWJzdHJhY3QgZ2V0QnlJZEFzeW5jKGlkOiBzdHJpbmcsIG15U3Bpbm5lcjogSVNwaW5uZXJTZXJ2aWNlKTogUHJvbWlzZUxpa2U8VD47XG5cbiAgICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzU2VydmljZS5icm9hZGNhc3QoJ2h0dHAtZXJyb3InLCBbZXJyb3JdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRhQ2hhbmdlKCk6IE9ic2VydmFibGU8QXJyYXk8VD4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IG1ldGhvZHNcbiAgICBwcm90ZWN0ZWQgcGFyc2VDcmVhdGVSZXNwb25zZShyZWNvcmQ6IFQsIGRhdGEpOiBUIHtcbiAgICAgICAgY29uc3QgaWQgPSBkYXRhO1xuICAgICAgICByZWNvcmQuaWQgPSBpZDtcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcGFyc2VVcGRhdGVSZXNwb25zZShyZWNvcmQ6IFQsIGRhdGEpOiBUIHtcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcGFyc2VMaXN0UmVzcG9uc2UoZGF0YSk6IFRbXSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYSBsaXN0IG9mIGVudGl0aWVzXG4gICAgcHJvdGVjdGVkIGxpc3RSZXF1ZXN0KG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGZvciAoY29uc3QgayBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChrLCBvcHRpb25zW2tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFRbXT4odGhpcy5saXN0VXJsKCksIHtcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbE9uUmVxdWVzdCxcbiAgICAgICAgICAgIHBhcmFtczogaHR0cFBhcmFtc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRMaXN0QXN5bmMob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgbXlTcGlubmVyOiBJU3Bpbm5lclNlcnZpY2UgPSBudWxsKTogUHJvbWlzZUxpa2U8YW55PiB7XG4gICAgICAgIC8vIEluIG1vc3QgY2FzZXMsIHdlIGRvIG5vdCBuZWVkIHRvIHNlbmQgb3V0IGEgcmVxdWVzdFxuICAgICAgICAvLyBpZiB3ZSBhbHJlYWR5IGhhdmUgc29tZSBkYXRhLlxuICAgICAgICBpZiAodGhpcy5nZXRMaXN0R3VhcmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpZnRJbnRvUmVqZWN0KCdub3QgYWxsb3dlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG15U3Bpbm5lciB8fCB0aGlzLnNwaW5uZXI7XG5cbiAgICAgICAgc3Bpbm5lci5zaG93KCk7XG4gICAgICAgIHJldHVybiB0b1Byb21pc2UodGhpcy5saXN0UmVxdWVzdChvcHRpb25zKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgc3Bpbm5lci5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdEYXRhID0gdGhpcy5wYXJzZUxpc3RSZXNwb25zZShkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeUxpc3QobmV3RGF0YSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBVc2UgcG9zdCBpbnN0ZWFkIG9mIGRlbGV0ZSBtZXRob2QgdG8gaW1wbGVtZW50IGRlbGVsZXRlID8/XG4gICAgcHJvdGVjdGVkIGRlbGV0ZUJ5SWRSZXF1ZXN0KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuZGVsZXRlVXJsKGlkKSwge1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFsT25SZXF1ZXN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZUJ5SWRBc3luYyhpZDogc3RyaW5nLCBteVNwaW5uZXI6IElTcGlubmVyU2VydmljZSA9IG51bGwpOiBQcm9taXNlTGlrZTxhbnk+IHtcblxuICAgICAgICBpZiAodGhpcy5kZWxldGVCeUlkR3VhcmQoaWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlmdEludG9SZWplY3QoJ25vdCBhbGxvd2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzcGlubmVyID0gbXlTcGlubmVyIHx8IHRoaXMuc3Bpbm5lcjtcbiAgICAgICAgc3Bpbm5lci5zaG93KCk7XG4gICAgICAgIHJldHVybiB0b1Byb21pc2UodGhpcy5kZWxldGVCeUlkUmVxdWVzdChpZCkpXG4gICAgICAgICAgICAudGhlbigoeCkgPT4ge1xuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlEZWxldGUoaWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBhZGFwdG9yQ3JlYXRlSW5wdXQocmVjb3JkOiBUKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUmVxdWVzdChyZWNvcmQ6IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgY29uc3QgYm9keSA9IHt9O1xuICAgICAgICBjb25zdCB0eVJlY29yZCA9IHRoaXMuYWRhcHRvckNyZWF0ZUlucHV0KHJlY29yZCk7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiB0eVJlY29yZCkge1xuICAgICAgICAgICAgaWYgKHR5UmVjb3JkLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgYm9keVtwcm9wXSA9IHR5UmVjb3JkW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxUPih0aGlzLmNyZWF0ZVVybCgpLCBib2R5LCB7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxPblJlcXVlc3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlQXN5bmMocmVjb3JkOiBULCBteVNwaW5uZXI6IElTcGlubmVyU2VydmljZSA9IG51bGwpOiBQcm9taXNlTGlrZTxhbnk+IHtcblxuICAgICAgICBjb25zdCBzcGlubmVyID0gbXlTcGlubmVyIHx8IHRoaXMuc3Bpbm5lcjtcbiAgICAgICAgc3Bpbm5lci5zaG93KCk7XG4gICAgICAgIHJldHVybiB0b1Byb21pc2UodGhpcy5jcmVhdGVSZXF1ZXN0KHJlY29yZCkpXG4gICAgICAgICAgICAudGhlbigoeCkgPT4ge1xuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gU2lkZSBlZmZlY3RzXG4gICAgICAgICAgICAgICAgcmVjb3JkID0gdGhpcy5wYXJzZUNyZWF0ZVJlc3BvbnNlKHJlY29yZCwgeCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlDcmVhdGUocmVjb3JkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkYXB0b3JVcGRhdGVJbnB1dChyZWNvcmQ6IFQpOiBPYmplY3Qge1xuICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVSZXF1ZXN0KHJlY29yZDogVCk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICBjb25zdCBib2R5ID0ge307XG4gICAgICAgIGNvbnN0IHR5UmVjb3JkID0gdGhpcy5hZGFwdG9yVXBkYXRlSW5wdXQocmVjb3JkKTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHR5UmVjb3JkKSB7XG4gICAgICAgICAgICBpZiAodHlSZWNvcmQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBib2R5W3Byb3BdID0gdHlSZWNvcmRbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dDxUPih0aGlzLnVwZGF0ZVVybChyZWNvcmQuaWQpLCBib2R5LCB7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxPblJlcXVlc3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQXN5bmMocmVjb3JkOiBULCBteVNwaW5uZXI6IElTcGlubmVyU2VydmljZSA9IG51bGwpOiBQcm9taXNlTGlrZTxhbnk+IHtcblxuICAgICAgICBjb25zdCBzcGlubmVyID0gbXlTcGlubmVyIHx8IHRoaXMuc3Bpbm5lcjtcbiAgICAgICAgc3Bpbm5lci5zaG93KCk7XG4gICAgICAgIHJldHVybiB0b1Byb21pc2UodGhpcy51cGRhdGVSZXF1ZXN0KHJlY29yZCkpXG4gICAgICAgICAgICAudGhlbigoeCkgPT4ge1xuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gU2lkZSBlZmZlY3RzXG4gICAgICAgICAgICAgICAgcmVjb3JkID0gdGhpcy5wYXJzZVVwZGF0ZVJlc3BvbnNlKHJlY29yZCwgeCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlVcGRhdGUocmVjb3JkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==