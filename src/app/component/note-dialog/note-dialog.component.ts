import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ServicingService} from "../../service/servicing.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Service} from "../../interface/Service";

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent implements OnInit {
  note = new FormControl('', [Validators.required]);

  constructor(private serviceService:ServicingService,
              public dialogRef:MatDialogRef<NoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Service
  ) { }

  ngOnInit(): void {
  }

  saveNote() {
    if(this.data.notes === null){
      this.data.notes = [];
      this.data.notes.push(this.note.value);
    }else {
      this.data.notes.push(this.note.value);
    }
    this.serviceService.updateServiceVacuum({generatedRepairs: this.data.generatedRepairs.map(repair => repair._id), notes: this.data.notes , status: this.data.status, vacuum: this.data.vacuum._id},this.data._id).subscribe(res => {
      console.log(res);
      this.note.reset();
    });
  }
}
