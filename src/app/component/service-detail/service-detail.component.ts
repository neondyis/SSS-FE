import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServicingService} from "../../service/servicing.service";
import {Service} from "../../interface/Service";
import {debounceTime} from "rxjs/operators";
import {Issue} from "../../interface/Issue";
import {RepairStep} from "../../interface/RepairStep";
import {Repair} from "../../interface/Repair";
import {Label} from "../../interface/Label";
import {LabelService} from "../../service/label.service";
import {FormControl, Validators} from "@angular/forms";
import {VacuumService} from "../../service/vacuum.service";
import {Vacuum} from "../../interface/Vacuum";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  service: Service = <Service>{};
  progress:number|string = 0;
  parts:string[] = ['Motor','Switch','Plug','Hose','Filter'];
  selectedIssues:string[] = [];
  labelList:Label[] = [];
  selectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  selectedLabel:string = "";
  repairInstructions:{issue:string,repairSteps:RepairStep[]}[] = [];

  constructor( private route: ActivatedRoute,private servicingService:ServicingService,private labelService:LabelService,private vacuumService:VacuumService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const serviceIdFromRoute = String(routeParams.get('id'));
    this.servicingService.getServiceDetails(serviceIdFromRoute).subscribe(res => {
      this.service = res;
      this.selectedLabel = this.service.vacuum.label._id;
      this.selectFormControl.setValue(this.selectedLabel);
      this.selectFormControl.valueChanges.subscribe(labelId => {
        this.service.vacuum.label._id = labelId;
        this.vacuumService.updateVacuum(this.service.vacuum).subscribe((res:Vacuum) => {
          this.service.vacuum.label = res.label;
        });
      });
      this.checkProgress();
    });
    this.labelService.getLabelList().subscribe(res => {
      this.labelList = res;
    });
  }


  updateProgress(newStatus:string){
    this.servicingService.updateServiceVacuum({status:newStatus,vacuum:this.service!.vacuum._id},this.service!.id).subscribe(res => {
      this.service!.status = newStatus;
      this.checkProgress();
      if(newStatus === 'Repairing'){
        this.servicingService.getRepairInfo(this.selectedIssues).subscribe(res =>{
          const data:Repair[] = res;
          data.forEach(repair => {
            this.repairInstructions.push({issue:repair.issue.description,repairSteps:repair.repairSteps})
            console.log(this.repairInstructions)
          })
        })
      }
    })
  }

  checkProgress(){
    switch (this.service?.status) {
      case "Diagnosing":
        this.progress=20;
        break;
      case "Repairing":
        this.progress=40;
        break;
      case "Testing":
        this.progress=60;
        break;
      case "Passport":
        this.progress=100;
        break;
    }
  }

  updateSelectedIssues(issue:Issue) {
    const issueExist = this.selectedIssues.find(i => i === issue._id)
    if(issueExist){
      this.selectedIssues = this.arrayRemove(this.selectedIssues,issue._id)
    }else{
      this.selectedIssues.push(issue._id)
    }
  }

  updateLabel(labelId:any){
    console.log(labelId)
  }

  arrayRemove(arr: string[], value:string) {
    return arr.filter(function(ele){
      return ele != value;
    });
  }
}
