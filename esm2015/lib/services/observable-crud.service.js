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
export class ObservableCurdService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1jcnVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW5ldC1jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ic2VydmFibGUtY3J1ZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUE2QixVQUFVLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFFNUcsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRS9DLE9BQU8sRUFDSCxtQkFBbUIsRUFDdEIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBRUgsV0FBVyxFQUNkLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBVS9CLE1BQU0sT0FBZ0IscUJBQXFCOzs7O0lBVXZDLFlBQVksUUFBa0I7UUFFMUIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztRQUVwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBcUJTLFdBQVcsQ0FBQyxLQUF3QjtRQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7SUFFTSxZQUFZO1FBQ2YsT0FBTyxJ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LENBQUMsRUFBRSxFQUFFO1lBQ1IsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWYsZUFBZTtZQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUIsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFZix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV4QixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FFSjs7Ozs7O0lBdk5HLHdDQUE2Qzs7Ozs7SUFFN0MscUNBQTJCOzs7OztJQUMzQiw4Q0FBNkM7Ozs7O0lBQzdDLHdDQUFtQzs7Ozs7SUFFbkMsd0RBQTJDOzs7Ozs7O0lBaUIzQyw4REFBbUQ7Ozs7Ozs7SUFDbkQsZ0VBQXFEOzs7Ozs7O0lBQ3JELGdFQUFxRDs7Ozs7OztJQUNyRCxnRUFBcUQ7Ozs7OztJQUVyRCwrREFBMkM7Ozs7Ozs7SUFDM0Msb0VBQXdEOzs7Ozs7O0lBRXhELGlFQUFvRDs7Ozs7OztJQUNwRCxpRUFBa0Q7Ozs7Ozs7SUFDbEQscUVBQTJDOzs7Ozs7O0lBQzNDLHFFQUEyQzs7Ozs7O0lBRTNDLDREQUFnQzs7Ozs7OztJQUNoQyw0RUFBOEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcywgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBsaWZ0SW50b1JlamVjdCB9IGZyb20gJ0Bwb2xwd2FyZS9mZS11dGlsaXRpZXMnO1xuXG5pbXBvcnQgeyB0b1Byb21pc2UgfSBmcm9tICdAcG9scHdhcmUvbmd4LXJ4anMnO1xuXG5pbXBvcnQge1xuICAgIEdsb2JhbEV2ZW50c1NlcnZpY2Vcbn0gZnJvbSAnQHBvbHB3YXJlL25neC1ldmVudHMnO1xuXG5pbXBvcnQge1xuICAgIElTcGlubmVyU2VydmljZSxcbiAgICBOdWxsU3Bpbm5lclxufSBmcm9tICdAcG9scHdhcmUvbmd4LXNwaW5uZXInO1xuXG5pbXBvcnQge1xuICAgIElCYXNlRW50aXR5XG59IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtbW9kZWwnO1xuXG5leHBvcnQge1xuICAgIElCYXNlRW50aXR5XG59IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtbW9kZWwnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT2JzZXJ2YWJsZUN1cmRTZXJ2aWNlPFQgZXh0ZW5kcyBJQmFzZUVudGl0eT4ge1xuXG4gICAgcHJvdGVjdGVkIHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxBcnJheTxUPj47XG5cbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudDtcbiAgICBwcm90ZWN0ZWQgZXZlbnRzU2VydmljZTogR2xvYmFsRXZlbnRzU2VydmljZTtcbiAgICBwcm90ZWN0ZWQgc3Bpbm5lcjogSVNwaW5uZXJTZXJ2aWNlO1xuXG4gICAgcHJvdGVjdGVkIHdpdGhDcmVkZW50aWFsT25SZXF1ZXN0OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yKSB7XG5cbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbE9uUmVxdWVzdCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5cbiAgICAgICAgdGhpcy5odHRwID0gaW5qZWN0b3IuZ2V0KEh0dHBDbGllbnQpO1xuICAgICAgICB0aGlzLmV2ZW50c1NlcnZpY2UgPSBpbmplY3Rvci5nZXQoR2xvYmFsRXZlbnRzU2VydmljZSk7XG5cbiAgICAgICAgdGhpcy5zcGlubmVyID0gbmV3IE51bGxTcGlubmVyKCk7XG4gICAgfVxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIC8vIGFic3RyYWN0IG1ldGhvZHNcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGxpc3RVcmwoLi4uYXJnczogYW55W10pOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGV0ZVVybCguLi5hcmdzOiBhbnlbXSk6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlVXJsKC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB1cGRhdGVVcmwoLi4uYXJnczogYW55W10pOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0TGlzdEd1YXJkKCk6IGJvb2xlYW47XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGV0ZUJ5SWRHdWFyZChpZDogc3RyaW5nKTogYm9vbGVhbjtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBub3RpZnlMaXN0KGRhdGE6IEFycmF5PFQ+KTogdm9pZDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgbm90aWZ5RGVsZXRlKGlkOiBzdHJpbmcpOiB2b2lkO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBub3RpZnlDcmVhdGUocmVjb3JkOiBUKTtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgbm90aWZ5VXBkYXRlKHJlY29yZDogVCk7XG5cbiAgICBhYnN0cmFjdCBnZXRCeUlkKGlkOiBzdHJpbmcpOiBUO1xuICAgIGFic3RyYWN0IGdldEJ5SWRBc3luYyhpZDogc3RyaW5nLCBteVNwaW5uZXI6IElTcGlubmVyU2VydmljZSk6IFByb21pc2VMaWtlPFQ+O1xuXG4gICAgcHJvdGVjdGVkIGhhbmRsZUVycm9yKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICB0aGlzLmV2ZW50c1NlcnZpY2UuYnJvYWRjYXN0KCdodHRwLWVycm9yJywgW2Vycm9yXSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGF0YUNoYW5nZSgpOiBPYnNlcnZhYmxlPEFycmF5PFQ+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBtZXRob2RzXG4gICAgcHJvdGVjdGVkIHBhcnNlQ3JlYXRlUmVzcG9uc2UocmVjb3JkOiBULCBkYXRhKTogVCB7XG4gICAgICAgIGNvbnN0IGlkID0gZGF0YTtcbiAgICAgICAgcmVjb3JkLmlkID0gaWQ7XG4gICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBhcnNlVXBkYXRlUmVzcG9uc2UocmVjb3JkOiBULCBkYXRhKTogVCB7XG4gICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBhcnNlTGlzdFJlc3BvbnNlKGRhdGEpOiBUW10ge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGEgbGlzdCBvZiBlbnRpdGllc1xuICAgIHByb3RlY3RlZCBsaXN0UmVxdWVzdChvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoaywgb3B0aW9uc1trXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxUW10+KHRoaXMubGlzdFVybCgpLCB7XG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxPblJlcXVlc3QsXG4gICAgICAgICAgICBwYXJhbXM6IGh0dHBQYXJhbXNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TGlzdEFzeW5jKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIG15U3Bpbm5lcjogSVNwaW5uZXJTZXJ2aWNlID0gbnVsbCk6IFByb21pc2VMaWtlPGFueT4ge1xuICAgICAgICAvLyBJbiBtb3N0IGNhc2VzLCB3ZSBkbyBub3QgbmVlZCB0byBzZW5kIG91dCBhIHJlcXVlc3RcbiAgICAgICAgLy8gaWYgd2UgYWxyZWFkeSBoYXZlIHNvbWUgZGF0YS5cbiAgICAgICAgaWYgKHRoaXMuZ2V0TGlzdEd1YXJkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaWZ0SW50b1JlamVjdCgnbm90IGFsbG93ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNwaW5uZXIgPSBteVNwaW5uZXIgfHwgdGhpcy5zcGlubmVyO1xuXG4gICAgICAgIHNwaW5uZXIuc2hvdygpO1xuICAgICAgICByZXR1cm4gdG9Qcm9taXNlKHRoaXMubGlzdFJlcXVlc3Qob3B0aW9ucykpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGF0YSA9IHRoaXMucGFyc2VMaXN0UmVzcG9uc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlMaXN0KG5ld0RhdGEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVXNlIHBvc3QgaW5zdGVhZCBvZiBkZWxldGUgbWV0aG9kIHRvIGltcGxlbWVudCBkZWxlbGV0ZSA/P1xuICAgIHByb3RlY3RlZCBkZWxldGVCeUlkUmVxdWVzdChpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmRlbGV0ZVVybChpZCksIHtcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbE9uUmVxdWVzdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVCeUlkQXN5bmMoaWQ6IHN0cmluZywgbXlTcGlubmVyOiBJU3Bpbm5lclNlcnZpY2UgPSBudWxsKTogUHJvbWlzZUxpa2U8YW55PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGVsZXRlQnlJZEd1YXJkKGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpZnRJbnRvUmVqZWN0KCdub3QgYWxsb3dlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG15U3Bpbm5lciB8fCB0aGlzLnNwaW5uZXI7XG4gICAgICAgIHNwaW5uZXIuc2hvdygpO1xuICAgICAgICByZXR1cm4gdG9Qcm9taXNlKHRoaXMuZGVsZXRlQnlJZFJlcXVlc3QoaWQpKVxuICAgICAgICAgICAgLnRoZW4oKHgpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5RGVsZXRlKGlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgYWRhcHRvckNyZWF0ZUlucHV0KHJlY29yZDogVCk6IE9iamVjdCB7XG4gICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVJlcXVlc3QocmVjb3JkOiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB7fTtcbiAgICAgICAgY29uc3QgdHlSZWNvcmQgPSB0aGlzLmFkYXB0b3JDcmVhdGVJbnB1dChyZWNvcmQpO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gdHlSZWNvcmQpIHtcbiAgICAgICAgICAgIGlmICh0eVJlY29yZC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIGJvZHlbcHJvcF0gPSB0eVJlY29yZFtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4odGhpcy5jcmVhdGVVcmwoKSwgYm9keSwge1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFsT25SZXF1ZXN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZUFzeW5jKHJlY29yZDogVCwgbXlTcGlubmVyOiBJU3Bpbm5lclNlcnZpY2UgPSBudWxsKTogUHJvbWlzZUxpa2U8YW55PiB7XG5cbiAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG15U3Bpbm5lciB8fCB0aGlzLnNwaW5uZXI7XG4gICAgICAgIHNwaW5uZXIuc2hvdygpO1xuICAgICAgICByZXR1cm4gdG9Qcm9taXNlKHRoaXMuY3JlYXRlUmVxdWVzdChyZWNvcmQpKVxuICAgICAgICAgICAgLnRoZW4oKHgpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIFNpZGUgZWZmZWN0c1xuICAgICAgICAgICAgICAgIHJlY29yZCA9IHRoaXMucGFyc2VDcmVhdGVSZXNwb25zZShyZWNvcmQsIHgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5Q3JlYXRlKHJlY29yZCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgc3Bpbm5lci5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGFwdG9yVXBkYXRlSW5wdXQocmVjb3JkOiBUKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlUmVxdWVzdChyZWNvcmQ6IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgY29uc3QgYm9keSA9IHt9O1xuICAgICAgICBjb25zdCB0eVJlY29yZCA9IHRoaXMuYWRhcHRvclVwZGF0ZUlucHV0KHJlY29yZCk7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiB0eVJlY29yZCkge1xuICAgICAgICAgICAgaWYgKHR5UmVjb3JkLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgYm9keVtwcm9wXSA9IHR5UmVjb3JkW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8VD4odGhpcy51cGRhdGVVcmwocmVjb3JkLmlkKSwgYm9keSwge1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFsT25SZXF1ZXN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUFzeW5jKHJlY29yZDogVCwgbXlTcGlubmVyOiBJU3Bpbm5lclNlcnZpY2UgPSBudWxsKTogUHJvbWlzZUxpa2U8YW55PiB7XG5cbiAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG15U3Bpbm5lciB8fCB0aGlzLnNwaW5uZXI7XG4gICAgICAgIHNwaW5uZXIuc2hvdygpO1xuICAgICAgICByZXR1cm4gdG9Qcm9taXNlKHRoaXMudXBkYXRlUmVxdWVzdChyZWNvcmQpKVxuICAgICAgICAgICAgLnRoZW4oKHgpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIFNpZGUgZWZmZWN0c1xuICAgICAgICAgICAgICAgIHJlY29yZCA9IHRoaXMucGFyc2VVcGRhdGVSZXNwb25zZShyZWNvcmQsIHgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5VXBkYXRlKHJlY29yZCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgc3Bpbm5lci5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=