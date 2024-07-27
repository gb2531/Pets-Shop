import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  SignInForm!: FormGroup;
  close= faX
  constructor(
    private auth: AuthService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.SignInForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: [
        '',
        Validators.required,
      ],
    });
  }

  async onSubmit() {
    if (this.SignInForm.valid) {
      let user = {
        firstName: this.SignInForm.value['firstName'],
        lastName: this.SignInForm.value['lastName'],
        userName: this.SignInForm.value['userName'],
        email: this.SignInForm.value['email'],
        password: this.SignInForm.value['password'],
      };
      console.log(user);
      await this.auth.createUser(user).subscribe(
        (result) => {
          console.log(result);
          this.SignInForm.reset();
          this.route.navigate(['home'])
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('form is not valid');
    }
  }
}
