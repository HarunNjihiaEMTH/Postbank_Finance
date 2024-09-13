import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "../../data/services/_AccessControlAuthGuard.service";
import { GeneralComponent } from "./general/general.component";
import { InvoiceProfileComponent } from "./invoice-profile/invoice-profile.component";
import { InvoiceTaxesComponent } from "./invoice-taxes/invoice-taxes.component";
import { OrganisationBasicInformationComponent } from "./organisation-basic-information/organisation-basic-information.component";
import { TaxComponent } from "./tax/tax.component";

const routes: Routes = [
  {
    path: "general",
    component: GeneralComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View General Parameters"] },
  },
  {
    path: "tax",
    component: TaxComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Tax Parameters"] },
  },
  {
    path: "invoice-taxes",
    component: InvoiceTaxesComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices Tax Parameters"] },
  },
  {
    path: "invoice-profile",
    component: InvoiceProfileComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Invoices Profile Parameters"] },
  },
  {
    path: "organistaion-basic-details",
    component: OrganisationBasicInformationComponent,
    canActivate: [RoutePrivilegeGuard],
    data: { requiredPrivilege: ["View Organization Details"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
