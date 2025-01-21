import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    loginForm!:FormGroup;
    showPassword:boolean = false;
    wrongLogin:string = '';
    submitted:boolean = false;


    constructor(private authService:AuthService, private router: Router, private fb:FormBuilder)
    {

    }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
    )
  }

  onLogin(){
    this.submitted = true;
    if(this.loginForm.valid)
      {
        const formData = this.loginForm.value;
        const {email,password} = formData;
        this.authService.login(email, password).subscribe({
          next: (data) => {
            console.log('Dữ liệu thành công:', data);
            localStorage.setItem("username", data.username);
            localStorage.setItem("access_token",data.access_token);
            localStorage.setItem("refresf_token",data.refresh_token);
            this.router.navigate(["/"]);
          },
          error:(error: HttpErrorResponse) => {
            console.error('Lỗi nhận được:', error.message);
            this.wrongLogin = error.message;
          }
        })
      }
      else{
        alert("Vui lòng nhập đủ thông tin");
        
      }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
