import { Component, OnInit } from '@angular/core';
import {RepairDashService} from "../../service/repair-dash.service";

@Component({
  selector: 'app-repair-dash',
  templateUrl: './repair-dash.component.html',
  styleUrls: ['./repair-dash.component.scss']
})
export class RepairDashComponent implements OnInit {

  constructor(private repairDashService:RepairDashService) { }

  ngOnInit(): void {
    this.repairDashService.getServiceVacuums().subscribe()
  }

}
