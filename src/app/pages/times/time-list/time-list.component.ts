import { TimeService } from './../shared/time.service';
import { Component } from '@angular/core';
import { Time } from "../shared/time.model";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";


@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent extends BaseResourceListComponent<Time> {

  constructor(private timeService: TimeService) {
    super(timeService);
   }
}
