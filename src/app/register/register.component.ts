import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = '';
  submitted:boolean = false;
  

  constructor(private authService : AuthService, private fp : FormBuilder, private router: Router){

  }

  ngOnInit()
  {
    this.registerForm = this.fp.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[!@#$%^&*])/)]],
      checkPassword: ['', [Validators.required]]
    });
  }

  onRegister(){
    this.submitted = true;
    if(this.registerForm.valid)
    {
      const formData = this.registerForm.value;
      const {username,email,password} = formData;
      this.authService.register(username, email, password).subscribe({
        next: (data) => {
          console.log('Dữ liệu thành công:', data);
          this.router.navigate(["/login"])
        },
        error:(error: HttpErrorResponse) => {
          console.error('Lỗi nhận được:', error.message);
          this.errorMessage = error.message;
        }
      })
    }
    else{
      alert("Vui lòng nhập lại thông tin");
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
