import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../Services/user.service";
import {AuthService} from "../Services/auth.service";
import swal from "sweetalert";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule,RouterLink,RouterLinkActive
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isFormSubmitted:boolean=false;
  form = new FormGroup({
    email: new FormControl('', Validators.pattern("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$")),
    password: new FormControl(''),
    username:new FormControl(''),
  });

  constructor(private userService:UserService,public router: Router, private authService: AuthService){
    this.authService.getUser().subscribe((data) => {

        if (data.status) {
          router.navigate(["/taskList"]);
        }
        else {
          localStorage.removeItem('token');
          router.navigate(["/register"]);
        }
      },error=>{
        localStorage.removeItem('token');
        router.navigate(["/register"]);
      }
    );


  }



  register() {

    this.isFormSubmitted = true;


    if (this.form.valid) {
      this.userService.register(this.form.value).subscribe((posts) => {

        if (posts.status) {
          swal({
            title: "Success",
            text: "Register successful",
            icon: "success",
            timer: 2000,
          });
          console.log(posts.data.token);





        }

      }, error => {
        swal({
          title: "Register failed",
          text: "",
          icon: "error",
          timer: 1500,
        });
      });
    }
  }



  isFieldInvalid(field: string) {
    return this.form.get(field)?.invalid && (this.form.get(field)?.touched || this.form.get(field)?.dirty || this.isFormSubmitted)
  }

  getErrorMessage(field: string, label: string) {
    if (this.form.get(field)?.hasError("required")) return `${label} is required`;
    if (this.form.get(field)?.hasError("minlength")) return `${label} should be at least ${this.form.get(field)?.getError("minlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("maxlength")) return `${label} should be at most ${this.form.get(field)?.getError("maxlength").requiredLength} characters`;
    if (this.form.get(field)?.hasError("pattern")) return `${label} is invalid`;
    return '';
  }




















}
