import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePrivilegeGuard } from '../../data/services/_AccessControlAuthGuard.service';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
 
  {
    path: "add",
    component: AddRoleComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["Add Roles"] },
  },
  {
    path: "view",
    component: RolesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Roles"] },
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
