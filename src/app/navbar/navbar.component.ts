import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions = [
    {title: "Home", route: "/admin/home", icon: "house-fill"},  // Use correct icon names if needed
    {title: "Products", route: "/admin/products", icon: "shop"},  // Corrected route and updated icon
    {title: "New Product", route: "/admin/new-product", icon: "plus-circle"}
  ];
  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  //public isLd : boolean = false ;

  constructor(private router: Router, public appState: AppStateService, public ls: LoadingService) {
    /*
    this.ls.isLoading$.subscribe({
      next : value => {
        this.isLd = value ;
      }
    })
     */
  }

  handleLogout() {
    this.appState.authState = {};
    this.router.navigateByUrl("/login");
  }

  handleLogin() {
    this.router.navigateByUrl("/login");
  }
}
