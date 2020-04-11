import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {}
