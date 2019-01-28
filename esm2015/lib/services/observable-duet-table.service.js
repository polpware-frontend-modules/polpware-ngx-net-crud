/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ObservableCurdService } from './observable-crud.service';
/**
 * @abstract
 * @template T
 */
export class ObservableDuetTableService extends ObservableCurdService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1kdWV0LXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW5ldC1jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ic2VydmFibGUtZHVldC10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFVQSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0FBTW5DLE1BQU0sT0FBZ0IsMEJBQ2xCLFNBQVEscUJBQXdCOzs7O0lBS2hDLFlBQVksUUFBa0I7UUFDMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRU8sZ0JBQWdCOztjQUNkLE1BQU0sR0FBRyxtQkFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBYzs7Y0FDOUQsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1CQUFBLENBQUMsQ0FBQyxVQUFVLEVBQUssQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVTLG9CQUFvQjtRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7a0JBQ3ZDLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVTLGVBQWU7O2NBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFHUyxZQUFZO1FBQ2xCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUdELE9BQU8sQ0FBQyxFQUFVOztjQUNSLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDdkMsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPLG1CQUFBLEtBQUssQ0FBQyxVQUFVLEVBQUssQ0FBQztTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxFQUFVLEVBQUUsWUFBNkIsSUFBSTtRQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7OztJQUdTLGVBQWUsQ0FBQyxFQUFVO1FBQ2hDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFHUyxZQUFZLENBQUMsRUFBVTs7O2NBRXZCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDdkMsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7Ozs7SUFHUyxZQUFZLENBQUMsTUFBUztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7SUFFUyxZQUFZLENBQUMsTUFBUztRQUM1QixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKOzs7Ozs7SUFuRUcsa0RBQXlDOzs7OztJQUN6QyxvREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJUmVsYXRpb25hbFRhYmxlIH0gZnJvbSAnQHBvbHB3YXJlL2ZlLWRhdGEnO1xuXG5pbXBvcnQgeyBsaWZ0IH0gZnJvbSAnQHBvbHB3YXJlL2ZlLXV0aWxpdGllcyc7XG5cbmltcG9ydCB7XG4gICAgSVNwaW5uZXJTZXJ2aWNlXG59IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtc3Bpbm5lcic7XG5cbmltcG9ydCB7XG4gICAgT2JzZXJ2YWJsZUN1cmRTZXJ2aWNlLFxuICAgIElCYXNlRW50aXR5XG59IGZyb20gJy4vb2JzZXJ2YWJsZS1jcnVkLnNlcnZpY2UnO1xuXG5leHBvcnQge1xuICAgIElCYXNlRW50aXR5XG59IGZyb20gJy4vb2JzZXJ2YWJsZS1jcnVkLnNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT2JzZXJ2YWJsZUR1ZXRUYWJsZVNlcnZpY2U8VCBleHRlbmRzIElCYXNlRW50aXR5PlxuICAgIGV4dGVuZHMgT2JzZXJ2YWJsZUN1cmRTZXJ2aWNlPFQ+IHtcblxuICAgIHByb3RlY3RlZCBwcmltYXJ5VGFibGU6IElSZWxhdGlvbmFsVGFibGU7XG4gICAgcHJvdGVjdGVkIHNlY29uZGFyeVRhYmxlOiBJUmVsYXRpb25hbFRhYmxlO1xuXG4gICAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKGluamVjdG9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkUHVibGlzaERhdGEoKSB7XG4gICAgICAgIGNvbnN0IG1vZGVscyA9IHRoaXMucHJpbWFyeVRhYmxlLmRhdGFQcm92aWRlcigpLm1vZGVscyBhcyBBcnJheTxhbnk+O1xuICAgICAgICBjb25zdCBkYXRhID0gbW9kZWxzLm1hcCgoeCkgPT4geC5hdHRyaWJ1dGVzIGFzIFQpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbGlzdGVuVG9QcmltYXJ5VGFibGUoKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeVRhYmxlLmRhdGFQcm92aWRlcigpLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVjZWl2ZWQgcGltYXJ5IHRhYmxlIHVwZGF0ZXMnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1aWxkUHVibGlzaERhdGEoKTtcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHVibGlzaEluaXREYXRhKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5idWlsZFB1Ymxpc2hEYXRhKCk7XG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGdldExpc3RHdWFyZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEltcGxlbWVudFxuICAgIGdldEJ5SWQoaWQ6IHN0cmluZyk6IFQge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMucHJpbWFyeVRhYmxlLmdldChpZCk7XG4gICAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmF0dHJpYnV0ZXMgYXMgVDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRCeUlkQXN5bmMoaWQ6IHN0cmluZywgbXlTcGlubmVyOiBJU3Bpbm5lclNlcnZpY2UgPSBudWxsKTogUHJvbWlzZUxpa2U8VD4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIGRlbGV0ZUJ5SWRHdWFyZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCBub3RpZnlEZWxldGUoaWQ6IHN0cmluZykge1xuICAgICAgICAvLyBTaWRlIGVmZmVjdHNcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLnByaW1hcnlUYWJsZS5nZXQoaWQpO1xuICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICAgIG1vZGVsLmRlc3Ryb3lGcm9tVGFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIG5vdGlmeUNyZWF0ZShyZWNvcmQ6IFQpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5VGFibGUuYWRkKHJlY29yZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG5vdGlmeVVwZGF0ZShyZWNvcmQ6IFQpIHtcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBvcCBiYXNpY2FsbHkgdXBkYXRlIHdoYXQgd2UgaGF2ZSAuLi5cbiAgICAgICAgdGhpcy5wcmltYXJ5VGFibGUuYWRkKHJlY29yZCk7XG4gICAgfVxufVxuIl19