import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { CommonsModule } from "./commons/commons.module";
//import { DashboardModule } from "./modules/dashboard/dashboard.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, UserRoutingModule, CommonsModule],
  // exports: [DashboardModule],
})
export class UserModule {}
