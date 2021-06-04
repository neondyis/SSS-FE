import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mini-dash-card',
  templateUrl: './mini-dash-card.component.html',
  styleUrls: ['./mini-dash-card.component.scss']
})
export class MiniDashCardComponent implements OnInit {
  @Input() title:string = '';
  @Input() icon:string = '';
  @Input() content:string|number = '';
  @Input() bgColor:string|number = '';

  constructor() { }

  ngOnInit(): void {
  }

}
