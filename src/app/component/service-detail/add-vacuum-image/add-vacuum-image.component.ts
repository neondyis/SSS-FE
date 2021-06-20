import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UploadService} from "../../../service/upload.service";
import {Selection} from "../../../interface/Selection";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Service} from "../../../interface/Service";
import {ServicingService} from "../../../service/servicing.service";
import {Note} from "../../../interface/Note";
import {ServiceInfo} from "../../../interface/ServiceInfo";
import {Disassemble} from "../../../interface/Disassemble";
import {Repair} from "../../../interface/Repair";
import {Test} from "../../../interface/Test";
import {Diagnose} from "../../../interface/Diagnose";
import {KnowledgeBase} from "../../../interface/KnowledgeBase";

@Component({
  selector: 'app-add-vacuum-image',
  templateUrl: './add-vacuum-image.component.html',
  styleUrls: ['./add-vacuum-image.component.scss']
})

export class AddVacuumImageComponent implements OnInit {
  form: FormGroup;
  types: Selection[] = [
    {viewValue:'Disassemble',value:'Disassemble'},
    {viewValue:'Repair',value:'Repair'},
    {viewValue:'Test',value:'Test'},
    {viewValue:'Diagnose',value:'Diagnose'},
    {viewValue:'Note',value:'Note'},
    {viewValue:'Vacuum front',value:'Vacuum front'},
    {viewValue:'Vacuum back',value:'Vacuum back'},
    {viewValue:'Vacuum side',value:'Vacuum side'}
  ];
  knowledgeGroups: {groupName: string,data:any[]}[] = [
    {groupName:'Disassemble',data:this.data.knowledgeBase.disassemble},
    {groupName:'Repair',data:this.data.knowledgeBase.repair},
    {groupName:'Test',data:this.data.knowledgeBase.test},
    {groupName:'Diagnose',data:this.data.knowledgeBase.diagnose}
    ];
  notes: Note[] = [];
  detailSelection!: KnowledgeBase;

  constructor( public fb: FormBuilder,private uploadService:UploadService,
               public dialogRef:MatDialogRef<AddVacuumImageComponent>,
               public servicingService:ServicingService,
               @Inject(MAT_DIALOG_DATA) public data: Service) {
    this.form = this.fb.group({
      'multi-files': [null],
      type:'',
      id: new FormControl(),
      note:'',
    })
  }

  ngOnInit(): void {
    this.detailSelection = this.data.knowledgeBase;
    console.log(this.knowledgeGroups);
    this.servicingService.getServiceInfo(this.data._id).subscribe((res:ServiceInfo) => {
      this.notes = res.service.notes;
    })
  }

  upload(event:Event) {
    const x: FileList | null = (event.target as HTMLInputElement).files;
    this.form.patchValue({
      'multi-files': x![0]
    });
    this.form.get('multi-files')!.updateValueAndValidity()
  }

  onChange(event:any,type:string) {
    console.log(event)
    this.form.patchValue({
      [type]: event.value
    });

    switch (event.value) {
      case 'Note':
        this.form.patchValue({
          id: this.data._id
        });
        break;
      // case 'Repair':
      // case 'Test':
      // case 'Diagnose':
      //   this.form.patchValue({
      //     id: this.data.knowledgeBase._id
      //   });
      //   break;
      case 'Vacuum front':
      case 'Vacuum back':
      case 'Vacuum side':
        this.form.patchValue({
          id: this.data.vacuum._id
        });
        break;
    }

    this.form.get(type)!.updateValueAndValidity();
    this.form.get('id')!.updateValueAndValidity();
  }

  submit() {
    const formData: any = new FormData();
    formData.append('multi-files', this.form.get('multi-files')!.value);
    formData.append('type', this.form.get('type')!.value);
    formData.append('id', this.form.get('id')!.value);
    formData.append('note', this.form.get('note')!.value);


    this.uploadService.upload(formData).subscribe(res => {
      console.log(res)
    });
  }

  log(val:any) { console.log(val); }
}
