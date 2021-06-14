import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MediaMatcher} from "@angular/cdk/layout";
import {NavObject} from "./interface/NavObject";
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title:string = 'SSS-FE';
  mobileQuery: MediaQueryList;
  isLoggedIn: boolean = false;

 navList:NavObject[] = [
   {label:'Home', route:'/home'},
   {label:'Repair', route:'/generatedRepairs-dash'},
   {label:'Knowledge Base', route:'/knowledge-dash'},
   {label:'Vacuum Overview', route:'/vacuum-dash'}
   ];

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService:LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
  }
}
