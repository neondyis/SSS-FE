import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Vacuum} from "../../../interface/Vacuum";
import {ServicingService} from "../../../service/servicing.service";
import {VacuumService} from "../../../service/vacuum.service";
import {LabelService} from "../../../service/label.service";
import {Label} from "../../../interface/Label";
import {Service} from "../../../interface/Service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vacuum-dialog',
  templateUrl: './vacuum-dialog.component.html',
  styleUrls: ['./vacuum-dialog.component.scss']
})
export class VacuumDialogComponent implements OnInit,OnDestroy {
  labelList:Label[] = [];
  selectedLabel:string = "";

  constructor(public dialogRef:MatDialogRef<VacuumDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Vacuum,
              private servicingService: ServicingService,
              private router: Router,
              private vacuumService:VacuumService,
              private labelService:LabelService) {
  }

  ngOnInit(): void {
    this.labelService.getLabelList().subscribe(res => {
      this.labelList = res;
    })
  }

  ngOnDestroy() {
  }

  startServicing(){
    this.servicingService.startServicing({generatedRepairs: [], vacuum: this.data._id,
      notes: [],
      status: "Starting"}).subscribe((serviceRes:Service)=>{
      this.data.label = {_id: "", color: "", description: "", name: ""};
      this.data.label._id = this.selectedLabel;

      this.vacuumService.updateVacuum(this.data).subscribe(res => {
        serviceRes.vacuum = res;
        this.dialogRef.close(serviceRes);
      })
    }
    )
  }

  navigateToService() {
    this.router.navigate(['/service/detail',this.data._id]).then(_=>this.dialogRef.close())
  }
}
