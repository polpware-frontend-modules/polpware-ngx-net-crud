import { __extends } from "tslib";
import { ObservableCurdService } from './observable-crud.service';
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
export { ObservableDuetTableService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1kdWV0LXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW5ldC1jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ic2VydmFibGUtZHVldC10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFVQSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sMkJBQTJCLENBQUM7QUFNbkM7SUFDWSw4Q0FBd0I7SUFLaEMsb0NBQVksUUFBa0I7ZUFDMUIsa0JBQU0sUUFBUSxDQUFDO0lBQ25CLENBQUM7SUFFTyxxREFBZ0IsR0FBeEI7UUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQW9CLENBQUM7UUFDckUsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxVQUFlLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVMseURBQW9CLEdBQTlCO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzdDLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLG9EQUFlLEdBQXpCO1FBQ0ksSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7SUFDRCxpREFBWSxHQUF0QjtRQUNJLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxZQUFZO0lBQ1osNENBQU8sR0FBUCxVQUFRLEVBQVU7UUFDZCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDLFVBQWUsQ0FBQztTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpREFBWSxHQUFaLFVBQWEsRUFBVSxFQUFFLFNBQWlDO1FBQWpDLDBCQUFBLEVBQUEsZ0JBQWlDO1FBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztJQUNELG9EQUFlLEdBQXpCLFVBQTBCLEVBQVU7UUFDaEMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVc7SUFDRCxpREFBWSxHQUF0QixVQUF1QixFQUFVO1FBQzdCLGVBQWU7UUFDZixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELFdBQVc7SUFDRCxpREFBWSxHQUF0QixVQUF1QixNQUFTO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFUyxpREFBWSxHQUF0QixVQUF1QixNQUFTO1FBQzVCLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsaUNBQUM7QUFBRCxDQUFDLEFBdEVELENBQ1kscUJBQXFCLEdBcUVoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElSZWxhdGlvbmFsVGFibGUgfSBmcm9tICdAcG9scHdhcmUvZmUtZGF0YSc7XG5cbmltcG9ydCB7IGxpZnQgfSBmcm9tICdAcG9scHdhcmUvZmUtdXRpbGl0aWVzJztcblxuaW1wb3J0IHtcbiAgICBJU3Bpbm5lclNlcnZpY2Vcbn0gZnJvbSAnQHBvbHB3YXJlL25neC1zcGlubmVyJztcblxuaW1wb3J0IHtcbiAgICBPYnNlcnZhYmxlQ3VyZFNlcnZpY2UsXG4gICAgSUJhc2VFbnRpdHlcbn0gZnJvbSAnLi9vYnNlcnZhYmxlLWNydWQuc2VydmljZSc7XG5cbmV4cG9ydCB7XG4gICAgSUJhc2VFbnRpdHlcbn0gZnJvbSAnLi9vYnNlcnZhYmxlLWNydWQuc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPYnNlcnZhYmxlRHVldFRhYmxlU2VydmljZTxUIGV4dGVuZHMgSUJhc2VFbnRpdHk+XG4gICAgZXh0ZW5kcyBPYnNlcnZhYmxlQ3VyZFNlcnZpY2U8VD4ge1xuXG4gICAgcHJvdGVjdGVkIHByaW1hcnlUYWJsZTogSVJlbGF0aW9uYWxUYWJsZTtcbiAgICBwcm90ZWN0ZWQgc2Vjb25kYXJ5VGFibGU6IElSZWxhdGlvbmFsVGFibGU7XG5cbiAgICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoaW5qZWN0b3IpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRQdWJsaXNoRGF0YSgpIHtcbiAgICAgICAgY29uc3QgbW9kZWxzID0gdGhpcy5wcmltYXJ5VGFibGUuZGF0YVByb3ZpZGVyKCkubW9kZWxzIGFzIEFycmF5PGFueT47XG4gICAgICAgIGNvbnN0IGRhdGEgPSBtb2RlbHMubWFwKCh4KSA9PiB4LmF0dHJpYnV0ZXMgYXMgVCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsaXN0ZW5Ub1ByaW1hcnlUYWJsZSgpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5VGFibGUuZGF0YVByb3ZpZGVyKCkub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBwaW1hcnkgdGFibGUgdXBkYXRlcycpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVpbGRQdWJsaXNoRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwdWJsaXNoSW5pdERhdGEoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmJ1aWxkUHVibGlzaERhdGEoKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgZ2V0TGlzdEd1YXJkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSW1wbGVtZW50XG4gICAgZ2V0QnlJZChpZDogc3RyaW5nKTogVCB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5wcmltYXJ5VGFibGUuZ2V0KGlkKTtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWwuYXR0cmlidXRlcyBhcyBUO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldEJ5SWRBc3luYyhpZDogc3RyaW5nLCBteVNwaW5uZXI6IElTcGlubmVyU2VydmljZSA9IG51bGwpOiBQcm9taXNlTGlrZTxUPiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgZGVsZXRlQnlJZEd1YXJkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIG5vdGlmeURlbGV0ZShpZDogc3RyaW5nKSB7XG4gICAgICAgIC8vIFNpZGUgZWZmZWN0c1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMucHJpbWFyeVRhYmxlLmdldChpZCk7XG4gICAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICAgICAgbW9kZWwuZGVzdHJveUZyb21UYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgbm90aWZ5Q3JlYXRlKHJlY29yZDogVCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUYWJsZS5hZGQocmVjb3JkKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbm90aWZ5VXBkYXRlKHJlY29yZDogVCkge1xuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIG9wIGJhc2ljYWxseSB1cGRhdGUgd2hhdCB3ZSBoYXZlIC4uLlxuICAgICAgICB0aGlzLnByaW1hcnlUYWJsZS5hZGQocmVjb3JkKTtcbiAgICB9XG59XG4iXX0=