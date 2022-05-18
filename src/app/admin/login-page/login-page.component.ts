import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    public auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    //deprecated code

    // this.auth.login(user).subscribe(res => {
    //   this.form.reset;
    //   this.router.navigate(['/admin', 'dashboard']);
    //   this.submitted = false;
    // }, () => {
    //   this. submitted = false;
    // })
    
    this.auth.login(user).subscribe({
      next: () => {
        this.form.reset;
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      error: () => {
        this.submitted = false;
      }
  })

  }

}
