import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vacuum} from "../../../interface/Vacuum";
import {MatDialog} from "@angular/material/dialog";
import {VacuumDialogComponent} from "../vacuum-dialog/vacuum-dialog.component";
import {CreateVacuumComponent} from "../../create-vacuum/create-vacuum.component";
import {Router} from "@angular/router";
import {Service} from "../../../interface/Service";
import {ServiceVacuumDialogComponent} from "../service-vacuum-dialog/service-vacuum-dialog.component";

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss']
})
export class DashCardComponent implements OnInit {
  @Input() title:string = '';
  @Input() description: string | number = '';
  @Input() useVisual: boolean = false;
  @Input() visualSource: string = '';
  @Input() detailList: Vacuum[] = [];
  @Input() serviceList: Service[] = [];
  @Input() width:string='';
  @Input() icon:string='';

  @Output('vacuumSwap') onVacuumRemoved:EventEmitter<Vacuum> = new EventEmitter<Vacuum>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.description = 0;
    console.log(this.serviceList)
  }

  listItemOnClick(event:Event, vacuum:Vacuum){
    const dialogRef = this.dialog.open(VacuumDialogComponent, {
      width: '500px',
      data:  vacuum
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && this.detailList.length > 0){
       this.detailList = this.detailList.filter(v => v._id !== vacuum._id );
       this.description = 0;
       this.onVacuumRemoved.emit(result);
      }
    });
  }

  serviceOnClick(event:Event, service:Service){
    const dialogRef = this.dialog.open(ServiceVacuumDialogComponent, {
      width: '500px',
      data:  service
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result && this.detailList.length > 0){
      //   this.detailList = this.detailList.filter(v => v._id !== vacuum._id );
      //   this.description = 0;
      //   this.onVacuumRemoved.emit(result);
      // }
    });
  }

  stockOnClick(){
    const dialogRef = this.dialog.open(CreateVacuumComponent, {
      width: '500px',
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && this.detailList.length > 0){
        const vacuum:Vacuum = {_id:result.id,model:result.model,series: result.series,type:result.type,status:result.status, label: result.label};
        this.onVacuumRemoved.emit(vacuum)
      }
    });
  }
}
