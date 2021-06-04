import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService:LoginService,private router: Router) { }

  ngOnInit(): void {
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }
  @Input() error: string | null = null;

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.loginService.login(this.form.value.username,this.form.value.password).subscribe(res => {
        this.router.navigate(['/']);
      })
    }
  }

  @Output() submitEM = new EventEmitter();
}
