import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MediaMatcher} from "@angular/cdk/layout";
import {NavObject} from "./interface/NavObject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title:string = 'SSS-FE';
  mobileQuery: MediaQueryList;

 navList:NavObject[] = [
   {label:'Home', route:'/home'},
   {label:'Repair', route:'/repair-dash'},
   {label:'Knowledge Base', route:'/knowledge-dash'},
   {label:'Vacuum Overview', route:'/vacuum-dash'}
   ];

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
