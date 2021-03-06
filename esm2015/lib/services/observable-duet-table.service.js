import { ObservableCurdService } from './observable-crud.service';
export class ObservableDuetTableService extends ObservableCurdService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1kdWV0LXRhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LW5ldC1jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL29ic2VydmFibGUtZHVldC10YWJsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSwyQkFBMkIsQ0FBQztBQU1uQyxNQUFNLE9BQWdCLDBCQUNsQixTQUFRLHFCQUF3QjtJQUtoQyxZQUFZLFFBQWtCO1FBQzFCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBb0IsQ0FBQztRQUNyRSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBZSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVTLG9CQUFvQjtRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUM3QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxlQUFlO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO0lBQ0QsWUFBWTtRQUNsQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsWUFBWTtJQUNaLE9BQU8sQ0FBQyxFQUFVO1FBQ2QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPLEtBQUssQ0FBQyxVQUFlLENBQUM7U0FDaEM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQVUsRUFBRSxZQUE2QixJQUFJO1FBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztJQUNELGVBQWUsQ0FBQyxFQUFVO1FBQ2hDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxXQUFXO0lBQ0QsWUFBWSxDQUFDLEVBQVU7UUFDN0IsZUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsV0FBVztJQUNELFlBQVksQ0FBQyxNQUFTO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFUyxZQUFZLENBQUMsTUFBUztRQUM1QixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSVJlbGF0aW9uYWxUYWJsZSB9IGZyb20gJ0Bwb2xwd2FyZS9mZS1kYXRhJztcblxuaW1wb3J0IHsgbGlmdCB9IGZyb20gJ0Bwb2xwd2FyZS9mZS11dGlsaXRpZXMnO1xuXG5pbXBvcnQge1xuICAgIElTcGlubmVyU2VydmljZVxufSBmcm9tICdAcG9scHdhcmUvbmd4LXNwaW5uZXInO1xuXG5pbXBvcnQge1xuICAgIE9ic2VydmFibGVDdXJkU2VydmljZSxcbiAgICBJQmFzZUVudGl0eVxufSBmcm9tICcuL29ic2VydmFibGUtY3J1ZC5zZXJ2aWNlJztcblxuZXhwb3J0IHtcbiAgICBJQmFzZUVudGl0eVxufSBmcm9tICcuL29ic2VydmFibGUtY3J1ZC5zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9ic2VydmFibGVEdWV0VGFibGVTZXJ2aWNlPFQgZXh0ZW5kcyBJQmFzZUVudGl0eT5cbiAgICBleHRlbmRzIE9ic2VydmFibGVDdXJkU2VydmljZTxUPiB7XG5cbiAgICBwcm90ZWN0ZWQgcHJpbWFyeVRhYmxlOiBJUmVsYXRpb25hbFRhYmxlO1xuICAgIHByb3RlY3RlZCBzZWNvbmRhcnlUYWJsZTogSVJlbGF0aW9uYWxUYWJsZTtcblxuICAgIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcihpbmplY3Rvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFB1Ymxpc2hEYXRhKCkge1xuICAgICAgICBjb25zdCBtb2RlbHMgPSB0aGlzLnByaW1hcnlUYWJsZS5kYXRhUHJvdmlkZXIoKS5tb2RlbHMgYXMgQXJyYXk8YW55PjtcbiAgICAgICAgY29uc3QgZGF0YSA9IG1vZGVscy5tYXAoKHgpID0+IHguYXR0cmlidXRlcyBhcyBUKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxpc3RlblRvUHJpbWFyeVRhYmxlKCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUYWJsZS5kYXRhUHJvdmlkZXIoKS5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlY2VpdmVkIHBpbWFyeSB0YWJsZSB1cGRhdGVzJyk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5idWlsZFB1Ymxpc2hEYXRhKCk7XG4gICAgICAgICAgICB0aGlzLnN1YmplY3QubmV4dChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHB1Ymxpc2hJbml0RGF0YSgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYnVpbGRQdWJsaXNoRGF0YSgpO1xuICAgICAgICB0aGlzLnN1YmplY3QubmV4dChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCBnZXRMaXN0R3VhcmQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJbXBsZW1lbnRcbiAgICBnZXRCeUlkKGlkOiBzdHJpbmcpOiBUIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLnByaW1hcnlUYWJsZS5nZXQoaWQpO1xuICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5hdHRyaWJ1dGVzIGFzIFQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0QnlJZEFzeW5jKGlkOiBzdHJpbmcsIG15U3Bpbm5lcjogSVNwaW5uZXJTZXJ2aWNlID0gbnVsbCk6IFByb21pc2VMaWtlPFQ+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCBkZWxldGVCeUlkR3VhcmQoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgbm90aWZ5RGVsZXRlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gU2lkZSBlZmZlY3RzXG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5wcmltYXJ5VGFibGUuZ2V0KGlkKTtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICBtb2RlbC5kZXN0cm95RnJvbVRhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZVxuICAgIHByb3RlY3RlZCBub3RpZnlDcmVhdGUocmVjb3JkOiBUKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeVRhYmxlLmFkZChyZWNvcmQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBub3RpZnlVcGRhdGUocmVjb3JkOiBUKSB7XG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgb3AgYmFzaWNhbGx5IHVwZGF0ZSB3aGF0IHdlIGhhdmUgLi4uXG4gICAgICAgIHRoaXMucHJpbWFyeVRhYmxlLmFkZChyZWNvcmQpO1xuICAgIH1cbn1cbiJdfQ==