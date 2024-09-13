import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NavigationStart, Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { AccessControlService } from "src/app/admin/data/services/_AccessControlService.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { RoleService } from "../../data/services/RoleService.service";
import Swal from "sweetalert2";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.sass"],
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "postedBy",
    "postedTime",
    "actions",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  Roles: any[] = [];
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private roleService: RoleService,
    private tokenCookieService: TokenCookieService,
    private accessControlService: AccessControlService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {


    this.currentUser = this.tokenCookieService.getUser().username;

    this.getRoles();
  }

  refresh() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles().subscribe(
      (res) => {
        console.log(res);
        this.Roles = res;

        console.log(this.Roles);

        if (this.Roles) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.Roles);
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
 
  addRoleCall() {
    this.hasAccess = this.accessControlService.hasPrivilege(["Add Roles"]);
    if (this.hasAccess) {
      //this.router.navigateByUrl(this.previousRoute);
      this.router.navigate(["/admin/roles/add"]);
    } 
  }

  viewRoleCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege(["View Roles"]);

    if (this.hasAccess) {
      localStorage.setItem("viewRolesData", JSON.stringify(data));

      this.router.navigate([`/admin/roles/add`], {
        state: {
          function_type: "VIEW",
        },
      });
    } 
  }

  editRoleCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege(["Update Roles"]);

    if (this.hasAccess) {
      localStorage.setItem("editRolesData", JSON.stringify(data));
      this.router.navigate([`/admin/roles/add`], {
        state: {
          function_type: "UPDATE",
        },
      });
    } 
  }

  deleteRoleCall(data) {
    this.hasAccess = this.accessControlService.hasPrivilege([
      "Delete Tax Parameters",
    ]);

    if (this.hasAccess) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.roleService.deleteRole(data.id).subscribe(
            (res) => {
              this.getRoles();
              this.snackbar.showNotification(
                "snackbar-success",
                "Role deleted successfully!"
              );
            },
            (err) => {
              console.log(err);
              this.snackbar.showNotification("snackbar-success", err);
            }
          );
          //Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }
  }

  // deleteRoleCall(data) {

  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateStatus(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    // const dialogRef = this.dialog.open(RoleStatusComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getRoles();
    // });
  }
}
