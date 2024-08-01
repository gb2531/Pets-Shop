import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private dialogref: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private login: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (!this.loginForm.valid) {
      this.dialogref.close();
    } else {
      console.log(this.loginForm.value['username']);
      let user = {
        userName: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
      };
      console.log(user);
      await this.login.loginUser(user).subscribe((res) => {
        console.log(res);
        if (!res) {
          console.log('error');
        } else {
          localStorage.setItem('usernam', res.userName)
          localStorage.setItem('token', res.token)
          console.log(res);
          this.loginForm.reset();
          this.dialogref.close();
        }
      });
    }
  }
  closeDialog(): void {
    this.loginForm.reset();
    this.dialogref.close();
  }
}
