import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Vacuum} from "../../interface/Vacuum";
import {BrandService} from "../../service/brand.service";
import {SeriesService} from "../../service/series.service";
import {VacuumService} from "../../service/vacuum.service";
import {FormControl, Validators} from "@angular/forms";
import {APIVacuum} from "../../interface/API/APIVacuum";
import {Selection} from "../../interface/Selection";
import {Status} from "../../interface/Status";

@Component({
  selector: 'app-create-vacuum',
  templateUrl: './create-vacuum.component.html',
  styleUrls: ['./create-vacuum.component.scss']
})
export class CreateVacuumComponent implements OnInit {
  types:Selection[] = [
    {value: 'canister', viewValue: 'Canister'},
    {value: 'upright', viewValue: 'Upright'},
    {value: 'handheld', viewValue: 'Handheld'},
  ];
  statuses:Selection[] = [
    {value: '60b6487b5ad80aed0de9e279', viewValue: 'Ready for the shop'},
    {value: '60b648515ad80aed0de9e278', viewValue: 'Non-crucial'},
    {value: '60b647465ad80aed0de9e276', viewValue: 'Repair Crucial'},
    {value: '60b645cd5ad80aed0de9e275', viewValue: 'Harvest for part'},
  ];
  statusesColorCode:Selection[] = [
    {value: '60b6487b5ad80aed0de9e279', viewValue: 'Green'},
    {value: '60b648515ad80aed0de9e278', viewValue: 'Yellow'},
    {value: '60b647465ad80aed0de9e276', viewValue: 'Orange'},
    {value: '60b645cd5ad80aed0de9e275', viewValue: 'Red'},
  ];
  seriesList: {value: string,viewValue:string}[] = [];
  selectedModel = new FormControl('', [Validators.required]);
  selectedSeries = new FormControl('', [Validators.required]);
  selectedType = new FormControl('', [Validators.required]);
  selectedStatus = new FormControl('',[Validators.required]);

  constructor(public dialogRef:MatDialogRef<CreateVacuumComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private seriesService:SeriesService,
              private vacuumService:VacuumService) { }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe(res=> {
      res.forEach(series => this.seriesList.push({value: series._id, viewValue:series.name}))
    })
  }

  getErrorMessage(field:FormControl) {
    if (field.hasError('required')) {
      return 'You must provide a value.';
    }

    return field.hasError('email') ? 'Not a valid email' : '';
  }

  createVacuum(){
    const vacuum:APIVacuum = {series:this.selectedSeries.value,type:this.selectedType.value,status: this.selectedStatus.value,model:this.selectedModel.value};
    this.vacuumService.createVacuum(vacuum).subscribe(res=>{
      this.dialogRef.close(res.data);
    })
  }
}
