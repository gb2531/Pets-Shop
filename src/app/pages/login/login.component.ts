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
      this.dialogref.close(false);
    } else {
      console.log(this.loginForm.value['username']);
      let user = {
        userName: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
      };
      console.log(user);
      await this.login.loginUser(user).subscribe(
        (res) => {
          if (res) {
            this.loginForm.reset();
            this.dialogref.close(true);
          }
        },
        (error) => {
          console.log(error, 'login failed');
          this.dialogref.close(false);
        }
      );
    }
  }

  closeDialog(): void {
    this.loginForm.reset();
    this.dialogref.close();
  }
}
