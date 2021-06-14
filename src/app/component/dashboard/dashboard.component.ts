import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../service/dashboard.service";
import {DashboardResponse} from "../../interface/API/DashboardResponse";
import {debounceTime} from "rxjs/operators";
import {Vacuum} from "../../interface/Vacuum";
import {Service} from "../../interface/Service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashRes: DashboardResponse = {greenVacuums: [], orangeVacuums: [], redVacuums: [], yellowVacuums: []};
  serviceVacs:Service[] = [];
  totalCount:number = 0;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    debounceTime(100);
    this.dashboardService.getServicing().subscribe(res => {
      this.serviceVacs = res;
      this.dashboardService.getStock().subscribe(res => {
        this.dashRes = res;
        for (const [key, value] of Object.entries(this.dashRes)) {
          value.forEach((vacuum:Vacuum,index:number) => {
            this.serviceVacs.forEach((sVacs:Service,sIndex:number) => {
              if(vacuum._id === sVacs.vacuum._id && sVacs.status !== "Passport"){
                value.splice(index,1);
              }else if(sVacs.status === "Passport"){
                this.serviceVacs.splice(sIndex,1);
              }
            })
          })
        }
        this.updateCounts();
      });
    });
  }

  updateList(vacuum:Vacuum){
    try{
      switch (vacuum.status.color) {
        case "Red":
          this.dashRes.redVacuums.push(vacuum);
          break;
        case "Orange":
          this.dashRes.orangeVacuums.push(vacuum);
          break;
        case "Yellow":
          this.dashRes.yellowVacuums.push(vacuum);
          break;
        case "Green":
          this.dashRes.greenVacuums.push(vacuum);
          break;
      }
    }catch (e) {
      console.error(e)
    }finally {
      this.updateCounts()
    }
  }

  updateServiceList(service:Service){
    console.log(service)
    this.serviceVacs.push(service);
  }

  updateCounts(){
    this.totalCount = this.dashRes.greenVacuums.length + this.dashRes.orangeVacuums.length + this.dashRes.yellowVacuums.length + this.dashRes.redVacuums.length;
  }
}
