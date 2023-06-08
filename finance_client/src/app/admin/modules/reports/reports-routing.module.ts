import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllComponent } from "./pages/all/all.component";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";

const routes: Routes = [
  {
    path: "all",
    component: AllComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Reports"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
