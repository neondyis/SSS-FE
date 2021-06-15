import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServicingService} from "../../service/servicing.service";
import {Service} from "../../interface/Service";
import {Issue} from "../../interface/Issue";
import {RepairStep} from "../../interface/RepairStep";
import {Repair} from "../../interface/Repair";
import {Label} from "../../interface/Label";
import {LabelService} from "../../service/label.service";
import {FormControl, Validators} from "@angular/forms";
import {VacuumService} from "../../service/vacuum.service";
import {Vacuum} from "../../interface/Vacuum";
import {ServiceInfo} from "../../interface/ServiceInfo";
import {Test} from "../../interface/Test";
import {StageTestContent} from "../../interface/StageTestContent";
import {HistoryService} from "../../service/history.service";
import {PassportService} from "../../service/passport.service";
import {Passport} from "../../interface/Passport";
import {MatDialog} from "@angular/material/dialog";
import {NoteDialogComponent} from "../note-dialog/note-dialog.component";
import {QRDialogComponent} from "../qrdialog/qrdialog.component";

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
  selectedRepairs:string[] = [];
  serviceInfoId:string= "";
  labelList:Label[] = [];
  selectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  selectedLabel:string = "";
  testInstructions: Test[] = [];
  selectedTests: string[] = [];
  repairInstructions:{issue:string,repairSteps:RepairStep[]}[] = [];

  constructor( private route: ActivatedRoute,
               private router:Router,
               private servicingService:ServicingService,
               private labelService:LabelService,
               private vacuumService:VacuumService,
               private historyService:HistoryService,
               public dialog: MatDialog,
               private passportService:PassportService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const serviceIdFromRoute = String(routeParams.get('_id'));
    this.servicingService.getServiceDetails(serviceIdFromRoute).subscribe((res:Service) => {
      this.service = res;
      this.testInstructions = this.service.knowledgeBase.test;
      this.selectedLabel = this.service.vacuum.label._id;
      const repairs = this.service.generatedRepairs;
      repairs.forEach(repair => this.repairInstructions.push({issue: repair.issue.description, repairSteps: repair.repairSteps}));
      this.selectFormControl.setValue(this.selectedLabel);
      this.selectFormControl.valueChanges.subscribe(labelId => {
        this.service.vacuum.label._id = labelId;
        this.vacuumService.updateVacuum(this.service.vacuum).subscribe((res:Vacuum) => {
          this.service.vacuum.label = res.label;
        });
      });
      this.servicingService.getServiceInfo(this.service._id).subscribe((res:ServiceInfo) => {
        const {diagnosis,repairs,tests} = res;
        this.serviceInfoId = res._id;
        if(diagnosis !== undefined){
          diagnosis.forEach(issue => this.updateSelectedIssues(issue));
          repairs.forEach(repair => this.updateSelectedRepair(repair));
          tests.forEach(test => this.updateSelectedTests(test));
        }
      });
      this.checkProgress();
    });
    this.labelService.getLabelList().subscribe(res => {
      this.labelList = res;
    });
  }


  updateProgress(newStatus:string){
      this.service.status = newStatus;
      this.checkProgress();
      if(newStatus === 'Repairing'){
        this.servicingService.getRepairInfo(this.selectedIssues).subscribe(res =>{
          const data:Repair[] = res;
          console.log(res);
          this.servicingService.updateServiceVacuum({
            notes: [],
            generatedRepairs: data.map(repair => repair._id), status:newStatus,vacuum:this.service.vacuum._id},this.service._id).subscribe((res:Service) => {
            data.forEach(repair => {
              this.repairInstructions.push({issue:repair.issue.description,repairSteps:repair.repairSteps});
            });
            console.log(res);
            this.service = res;
            this.servicingService.createServiceInfo({diagnosis: this.selectedIssues, repairs: this.selectedRepairs, tests: [], service: this.service._id}).subscribe((res:ServiceInfo) =>
              this.serviceInfoId = res._id)
          });
        })
      }else if(newStatus === 'Testing'){
        this.servicingService.updateServiceVacuum({generatedRepairs: this.service.generatedRepairs.map(repair => repair._id),
          notes: [], status:newStatus,vacuum:this.service.vacuum._id},this.service._id).subscribe(_ =>{
          this.servicingService.updateServiceInfo({diagnosis: this.selectedIssues, repairs: this.selectedRepairs, service: this.service._id, tests: []},this.serviceInfoId).subscribe(res => {
            console.log(res)
          });
        });
      }else if(newStatus === 'Passport'){


        this.servicingService.updateServiceVacuum({
          notes: [],
          generatedRepairs: this.service.generatedRepairs.map(repair => repair._id) , status:newStatus,vacuum:this.service.vacuum._id},this.service._id).subscribe(_ =>{
            console.log(this.serviceInfoId)
          this.servicingService.updateServiceInfo({diagnosis: this.selectedIssues, repairs: this.selectedRepairs, service: this.service._id, tests: this.selectedTests},this.serviceInfoId).subscribe(res => {
            this.service.vacuum.label._id = "60b6497c5ad80aed0de9e27e";
            this.service.vacuum.status._id = "60b6487b5ad80aed0de9e279";
            this.vacuumService.updateVacuum(this.service.vacuum).subscribe((res:Vacuum) => {
              this.service.vacuum = res;
              this.passportService.createPassport({ vacuum: this.service.vacuum._id,timeline: []}).subscribe((ppRes:Passport) => {
                this.historyService.createHistory({passport: ppRes._id, service: this.service._id, serviceInfo: this.serviceInfoId}).subscribe(res => {
                  this.router.navigate(['/passport/',ppRes._id]);
                })
              });
            })
          });
        });
      }
  }

  checkProgress(){
    switch (this.service?.status) {
      case "Diagnosing":
        this.progress=15;
        break;
      case "Repairing":
        this.progress=35;
        break;
      case "Testing":
        this.progress=55;
        break;
      case "Passport":
        this.progress=100;
        break;
    }
  }

  updateSelectedIssues(issue:Issue) {
    const issueExist = this.selectedIssues.find(i => i === issue._id);
    if(issueExist){
      this.selectedIssues = this.arrayRemove(this.selectedIssues,issue._id)
    }else{
      this.selectedIssues.push(issue._id)
    }
  }

  setCheckedIssue(issue:Issue):boolean {
    return this.selectedIssues.some(i => i === issue._id);
  }

  setCheckedRepair(repair:RepairStep):boolean {
    return this.selectedRepairs.some(i => i === repair._id);
  }

  updateSelectedRepair(repair:RepairStep) {
    const repairExist = this.selectedRepairs.find(i => i === repair._id);
    if(repairExist){
      this.selectedRepairs = this.arrayRemove(this.selectedRepairs,repair._id)
    }else{
      this.selectedRepairs.push(repair._id)
    }
  }

  arrayRemove(arr: string[], value:string) {
    return arr.filter(function(ele){
      return ele != value;
    });
  }

  updateSelectedTests(content: StageTestContent) {
    const testExist = this.selectedTests.find(i => i === content._id);
    if(testExist){
      this.selectedTests = this.arrayRemove(this.selectedTests,content._id)
    }else{
      this.selectedTests.push(content._id)
    }

  }

  setCheckedTests(content: StageTestContent):boolean {
    return this.selectedTests.some(i => i === content._id);
  }

  addNotes() {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '500px',
      data: this.service
    });
    dialogRef.afterClosed().subscribe((result:string[]) => {

    });
  }

  goToPassport() {
    this.passportService.getPassportByVacuum(this.service.vacuum._id).subscribe((res:Passport) =>{
      console.log(res)
      this.router.navigate(['/passport/',res._id]);
    });
  }

  generateQRCode(){
    this.passportService.getPassportByVacuum(this.service.vacuum._id).subscribe((res:Passport) =>{
      const dialogRef = this.dialog.open(QRDialogComponent, {
        width: '500px',
        data: res._id
      });
      dialogRef.afterClosed().subscribe((result:string[]) => {

      });
    });
  }
}
