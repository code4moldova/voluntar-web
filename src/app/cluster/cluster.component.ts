import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Demand } from '@demands/shared/demand';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DemandStatus } from '@demands/shared/demand-status';

@Component({
  templateUrl: './cluster.component.html',
})
export class ClusterComponent {
  DemandStatus = DemandStatus;
  demands$ = this.route.data.pipe(map((data) => data.cluster.list as Demand[]));

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  cast(object: unknown): Demand {
    return object as Demand;
  }

  changeDemand(
    demand: Demand,
    demandStatus: DemandStatus.solved | DemandStatus.canceled,
  ) {
    // TODO: Question. How to mutate an observable?
    demand.status = demandStatus;
    this.httpClient
      .put(`${environment.url}/requests/update`, {
        _id: demand._id,
        // @ts-ignore Endpoint receives malformed body?!
        cluster_id: demand.volunteer.cluster_id,
        status: demand.status,
        comments: demand.comments,
      })
      .subscribe();
  }
}
