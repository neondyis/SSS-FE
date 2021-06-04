import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Vacuum} from "../../../interface/Vacuum";
import {ServicingService} from "../../../service/servicing.service";
import {VacuumService} from "../../../service/vacuum.service";
import {LabelService} from "../../../service/label.service";
import {Label} from "../../../interface/Label";

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
    this.servicingService.startServicing({vacuum: this.data._id, status: "Starting"}).subscribe(()=>{
      this.data.label = {_id: "", color: "", description: "", name: ""};
      this.data.label._id = this.selectedLabel;
      this.vacuumService.updateVacuum(this.data).subscribe(_ => {
        this.dialogRef.close(this.data);
      })
    }
    )
  }
}
