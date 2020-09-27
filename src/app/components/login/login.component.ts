import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  hide = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
      this.customPatternValid({ pattern: /(?=.*?[A-Z])/, msg: 'At least one upper case' }),
      this.customPatternValid({ pattern: /(?=.*?[a-z])/, msg: 'At least one lower case' }),
      this.customPatternValid({ pattern: /(?=.*?[0-9])/, msg: 'At least one digit' }),
      this.customPatternValid({ pattern: /(?=.*?[#?!@$%^&*-])/, msg: 'At least one Special Character' }),
      this.customPatternValid({ pattern: /.{5,}/, msg: 'Minimum Five in length' })]]
    });
  }

  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required,
  // this.customPatternValid({ pattern: /(?=.*?[A-Z])/, msg: 'At least one upper case' }),
  // this.customPatternValid({ pattern: /(?=.*?[a-z])/, msg: 'At least one lower case' }),
  // this.customPatternValid({ pattern: /(?=.*?[0-9])/, msg: 'At least one digit' }),
  // this.customPatternValid({ pattern: /(?=.*?[#?!@$%^&*-])/, msg: 'At least one Special Character' }),
  // this.customPatternValid({ pattern: /.{5,}/, msg: 'Minimum Five in length' }),
  // ])

  // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$')

  getEmailErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      return 'You must enter a email';
    }
    return this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('email').value;
        const password = this.form.get('password').value;
        console.log(username)
        console.log(password)
      } catch (err) {
        this.loginInvalid = true;
      }
    }
    console.log(this.form.status)
  }

  public customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
  }

}
