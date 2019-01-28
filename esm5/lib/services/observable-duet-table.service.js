/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ObservableCurdService } from './observable-crud.service';
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ObservableDuetTableService = /** @class */ (function (_super) {
    tslib_1.__extends(ObservableDuetTableService, _super);
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
 * @abstract
 * @template T
 */
export { ObservableDuetTableService };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    ObservableDuetTableService.prototype.primaryTable;
    /**
     * @type {?}
     * @protected
     */
    ObservableDuetTableService.prototype.secondaryTable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1kdWV0LXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW5ldC1jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ic2VydmFibGUtZHVldC10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBVUEsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLDJCQUEyQixDQUFDOzs7OztBQU1uQzs7Ozs7SUFDWSxzREFBd0I7SUFLaEMsb0NBQVksUUFBa0I7ZUFDMUIsa0JBQU0sUUFBUSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRU8scURBQWdCOzs7O0lBQXhCOztZQUNVLE1BQU0sR0FBRyxtQkFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBYzs7WUFDOUQsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLFdBQUssbUJBQUEsQ0FBQyxDQUFDLFVBQVUsRUFBSyxHQUFBLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFUyx5REFBb0I7Ozs7SUFBOUI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7O2dCQUN2QyxJQUFJLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3BDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFUyxvREFBZTs7OztJQUF6Qjs7WUFDVSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXOzs7Ozs7SUFDRCxpREFBWTs7Ozs7O0lBQXRCO1FBQ0ksT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFlBQVk7Ozs7OztJQUNaLDRDQUFPOzs7Ozs7SUFBUCxVQUFRLEVBQVU7O1lBQ1IsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN2QyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sbUJBQUEsS0FBSyxDQUFDLFVBQVUsRUFBSyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7O0lBRUQsaURBQVk7Ozs7O0lBQVosVUFBYSxFQUFVLEVBQUUsU0FBaUM7UUFBakMsMEJBQUEsRUFBQSxnQkFBaUM7UUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXOzs7Ozs7O0lBQ0Qsb0RBQWU7Ozs7Ozs7SUFBekIsVUFBMEIsRUFBVTtRQUNoQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVzs7Ozs7OztJQUNELGlEQUFZOzs7Ozs7O0lBQXRCLFVBQXVCLEVBQVU7OztZQUV2QixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3ZDLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsV0FBVzs7Ozs7OztJQUNELGlEQUFZOzs7Ozs7O0lBQXRCLFVBQXVCLE1BQVM7UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBRVMsaURBQVk7Ozs7O0lBQXRCLFVBQXVCLE1BQVM7UUFDNUIscURBQXFEO1FBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTCxpQ0FBQztBQUFELENBQUMsQUF0RUQsQ0FDWSxxQkFBcUIsR0FxRWhDOzs7Ozs7Ozs7OztJQW5FRyxrREFBeUM7Ozs7O0lBQ3pDLG9EQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElSZWxhdGlvbmFsVGFibGUgfSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XG5cbmltcG9ydCB7IGxpZnQgfSBmcm9tICdAcG9scHdhcmUvZmUtdXRpbGl0aWVzJztcblxuaW1wb3J0IHtcbiAgICBJU3Bpbm5lclNlcnZpY2Vcbn0gZnJvbSAnQHBvbHB3YXJlL25neC1zcGlubmVyJztcblxuaW1wb3J0IHtcbiAgICBPYnNlcnZhYmxlQ3VyZFNlcnZpY2UsXG4gICAgSUJhc2VFbnRpdHlcbn0gZnJvbSAnLi9vYnNlcnZhYmxlLWNydWQuc2VydmljZSc7XG5cbmV4cG9ydCB7XG4gICAgSUJhc2VFbnRpdHlcbn0gZnJvbSAnLi9vYnNlcnZhYmxlLWNydWQuc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPYnNlcnZhYmxlRHVldFRhYmxlU2VydmljZTxUIGV4dGVuZHMgSUJhc2VFbnRpdHk+XG4gICAgZXh0ZW5kcyBPYnNlcnZhYmxlQ3VyZFNlcnZpY2U8VD4ge1xuXG4gICAgcHJvdGVjdGVkIHByaW1hcnlUYWJsZTogSVJlbGF0aW9uYWxUYWJsZTtcbiAgICBwcm90ZWN0ZWQgc2Vjb25kYXJ5VGFibGU6IElSZWxhdGlvbmFsVGFibGU7XG5cbiAgICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoaW5qZWN0b3IpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRQdWJsaXNoRGF0YSgpIHtcbiAgICAgICAgY29uc3QgbW9kZWxzID0gdGhpcy5wcmltYXJ5VGFibGUuZGF0YVByb3ZpZGVyKCkubW9kZWxzIGFzIEFycmF5PGFueT47XG4gICAgICAgIGNvbnN0IGRhdGEgPSBtb2RlbHMubWFwKCh4KSA9PiB4LmF0dHJpYnV0ZXMgYXMgVCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsaXN0ZW5Ub1ByaW1hcnlUYWJsZSgpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5VGFibGUuZGF0YVByb3ZpZGVyKCkub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBwaW1hcnkgdGFibGUgdXBkYXRlcycpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVpbGRQdWJsaXNoRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwdWJsaXNoSW5pdERhdGEoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1aWxkUHVibGlzaERhdGEoKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgZ2V0TGlzdEd1YXJkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50XG4gICAgZ2V0QnlJZChpZDogc3RyaW5nKTogVCB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5wcmltYXJ5VGFibGUuZ2V0KGlkKTtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWwuYXR0cmlidXRlcyBhcyBUO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldEJ5SWRBc3luYyhpZDogc3RyaW5nLCBteVNwaW5uZXI6IElTcGlubmVyU2VydmljZSA9IG51bGwpOiBQcm9taXNlTGlrZTxUPiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgZGVsZXRlQnlJZEd1YXJkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIG5vdGlmeURlbGV0ZShpZDogc3RyaW5nKSB7XG4gICAgICAgIC8vIFNpZGUgZWZmZWN0c1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMucHJpbWFyeVRhYmxlLmdldChpZCk7XG4gICAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICAgICAgbW9kZWwuZGVzdHJveUZyb21UYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgbm90aWZ5Q3JlYXRlKHJlY29yZDogVCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUYWJsZS5hZGQocmVjb3JkKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbm90aWZ5VXBkYXRlKHJlY29yZDogVCkge1xuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIG9wIGJhc2ljYWxseSB1cGRhdGUgd2hhdCB3ZSBoYXZlIC4uLlxuICAgICAgICB0aGlzLnByaW1hcnlUYWJsZS5hZGQocmVjb3JkKTtcbiAgICB9XG59XG4iXX0=