import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { CostCenterService } from "src/app/user/data/services/cost-center.service";
import { CostCenter } from "src/app/user/data/types/cost-center";
import { AddCostCenterComponent } from "../add-cost-center/add-cost-center.component";
import { DeleteCostCenterComponent } from "../delete-cost-center/delete-cost-center.component";
import { UpdateCostCenterComponent } from "../update-cost-center/update-cost-center.component";
import { ViewCostCenterDetailsComponent } from "../view-cost-center-details/view-cost-center-details.component";
import { CostCenterStatusComponent } from "./dialogs/cost-center-status/cost-center-status.component";

@Component({
  selector: "app-all-cost-centers",
  templateUrl: "./all-cost-centers.component.html",
  styleUrls: ["./all-cost-centers.component.sass"],
})
export class AllCostCentersComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [

    "id",
    "costCenterCode",
    "costCenterName",
    "costCenterDescription",
    "status",
    "postedBy",
    "postedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<CostCenter>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<CostCenter>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  costCenters: CostCenter[] = [];
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private costCenterService: CostCenterService,
    private tokenCookieService: TokenCookieService,
    private accessControlService: AccessControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenCookieService.getUser().username;

    this.getCostCenters();
  }


  refresh() {
    this.getCostCenters();
  }

  getCostCenters() {
    this.costCenterService
      .getCostCenters()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.costCenters = res;

          console.log(this.costCenters);

          if (this.costCenters) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<CostCenter>(
              this.costCenters
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  hasAccess: boolean;
  addCostCenterCall() {
    this.hasAccess = this.accessControlService.hasPrivilege(["Add Cost Centers"]);
    if (this.hasAccess) {
      this.router.navigate(["/admin/supplier/cost-centers-management/add-cost-center"]);

    }
  }

  viewCostCenterCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege(["View Cost Centers"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      action: "view cost center",
      data: data
    };
    this.dialog.open(ViewCostCenterDetailsComponent, dialogConfig);
  }}

  editCallCenterCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Update Cost Centers"]);
    if (this.hasAccess) {
    this.router.navigate(
      ["/admin/supplier/cost-centers-management/update-cost-center"],
      {
        state: {
          costCenterDetails: JSON.stringify(data),
        },
      }
    );
  }}

  // editCallCenterCall(data){
  //   console.log("this = ", data);
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "1000px";
  //   dialogConfig.data = {
  //     data: data
  //   };


  //   const dialogRef = this.dialog.open(UpdateCostCenterComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.getCostCenters();
  //   });

  // }

  deleteCostCenterCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Delete Cost Centers"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: data
    };


    const dialogRef = this.dialog.open(DeleteCostCenterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCostCenters();
    });

  }}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: CostCenter) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  updateStatus(row) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Validate Cost Centers"]);
    if (this.hasAccess) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row
    };
    const dialogRef = this.dialog.open(CostCenterStatusComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCostCenters();
    });
  }

  }
}
