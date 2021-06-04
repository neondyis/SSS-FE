import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Service} from "../../../interface/Service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-service-vacuum-dialog',
  templateUrl: './service-vacuum-dialog.component.html',
  styleUrls: ['./service-vacuum-dialog.component.scss']
})
export class ServiceVacuumDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ServiceVacuumDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Service,
              private router:Router) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  navigateToService(){
    this.router.navigate(['/service/detail',this.data.vacuum._id]).then(_=>this.dialogRef.close())
  }
}
