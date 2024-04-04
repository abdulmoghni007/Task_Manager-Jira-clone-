import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserService} from "../Services/user.service";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  menus:any= [];
  username:string|null=localStorage.getItem('name');

  constructor(private userService: UserService, public router: Router ,private authService:AuthService) {
    this.userService.getMenuItems().subscribe((menu) => {
        this.menus = menu.menus;

      }
    );
  }

  logout() {

    this.userService.logout().subscribe((logout) => {


    });

    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('postId');

    this.router.navigate(['/']);
  }
}
