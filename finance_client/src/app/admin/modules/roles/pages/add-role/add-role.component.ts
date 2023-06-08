import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NotificationService } from "src/app/admin/data/services/notification.service";
import { PrivilegesTemplate } from "src/app/admin/data/types/privileges_template";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { RoleService } from "../../data/services/RoleService.service";
import { RolesComponent } from "../roles/roles.component";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.sass"],
})
export class AddRoleComponent implements OnInit {
  loading = false;
  function_type: string;

  branchCode: any;
  error: any;
  results: any;
  fetchData: any;
  fmData: any;
  isDisabled: boolean;
  postedBy: any;
  verifiedFlag: any;
  verifiedBy: any;
  formData: FormGroup;
  lookUpData: any;
  disableCheckBoxes = false;
  submitted = false;
  subscription!: Subscription;
  rolesData: any;
  btnColor: any;
  btnText: any;
  hideBtn = false;
  onShowResults = false;
  classdata: any;
  priviledgedata: any;

  currentUserName: any;

  private basicActionsAddOns = PrivilegesTemplate;

  apiFormData: FormGroup;

  filtered: { name: string; selected: boolean; code: number }[];
  basicActions: FormArray;
  displayArray: { id: string; name: string; selected: boolean; code: number }[];
  obj: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private notificationAPI: NotificationService,
    private tokenStorage: TokenStorageService
  ) {
    this.onInitForm();
    if (this.router.getCurrentNavigation().extras.state) {
      this.fmData = this.router.getCurrentNavigation().extras.state;
      if (this.fmData.function_type == "VIEW") {
        this.function_type = "VIEW";
        const vData = localStorage.getItem("viewRolesData");
        if (vData) {
          this.rolesData = JSON.parse(vData);
        }
      }
      if (this.fmData.function_type == "UPDATE") {
        this.function_type = "UPDATE";
        const eData = localStorage.getItem("editRolesData");
        if (eData) {
          this.rolesData = JSON.parse(eData);
        }
      }
    } else {
      this.function_type = "ADD";
    }
  }

  ngOnInit() {
    this.currentUserName = this.tokenStorage.getUser().username;
    console.log("this.function_typ: ", this.function_type);
    this.getPage();
  }

  // modifiedBy: null;
  // modifiedFlag: null;
  // modifiedTime: null;

  onInitForm() {
    this.apiFormData = this.fb.group({
      id: [""],
      name: [""],
      postedBy: [""],
      basicactions: new FormArray([]),
    });
  }
  createEmptyBasicactions(): FormGroup {
    return this.fb.group({
      code: [""],
      id: [""],
      selected: [""],
      name: [""],
    });
  }
  addBasicaction(): void {
    this.basicActions = this.apiFormData.get("basicactions") as FormArray;
    this.basicActions.push(this.createEmptyBasicactions());
  }

  updateEmptyBasicactions(data: any): FormGroup {
    return this.fb.group({
      code: [data.code],
      id: [data.id],
      name: [data.name],
      selected: [data.selected],
    });
  }
  updateBasicaction(data: any): void {
    this.basicActions = this.apiFormData.get("basicactions") as FormArray;
    this.basicActions.push(this.updateEmptyBasicactions(data));
  }

  onChange(e: any, i: any) {
    this.displayArray[i].selected = e.checked;
  }

  disabledFormControl() {
    this.apiFormData.disable();
    this.isDisabled = true;
  }
  get f() {
    return this.formData.controls;
  }

  getPage() {
    if (this.function_type == "ADD") {
      this.displayArray = this.basicActionsAddOns;
      this.onInitForm();
      this.apiFormData.patchValue({
        postedBy: this.currentUserName,
      });
      this.btnColor = "primary";
      this.btnText = "SUBMIT";
    } else if (this.function_type == "VIEW") {
      this.displayArray = this.rolesData.basicactions;
      this.onInitForm();
      this.apiFormData.patchValue({
        name: this.rolesData.name,
        id: this.rolesData.id,
        postedBy: this.rolesData.postedBy,
      });
      this.isDisabled = true;
      this.hideBtn = true;
      this.onShowResults = true;
    } else if (this.function_type == "UPDATE") {

  

      if (this.rolesData.basicactions.length > 0) {
        this.displayArray = this.rolesData.basicactions;
        console.log("With.basicActions: ", this.rolesData.basicactions) 
      } else {
        this.displayArray = this.basicActionsAddOns;
        console.log("No.basicActions: ", this.basicActionsAddOns) 
      }
      


      this.onInitForm();
      this.apiFormData.patchValue({
        name: this.rolesData.name,
        id: this.rolesData.id,
        postedBy: this.rolesData.postedBy,
      });
      this.btnColor = "primary";
      this.btnText = "UPDATE";
    } else if (this.function_type == "DELETE") {
      this.isDisabled = true;
      this.btnColor = "warn";
      this.btnText = "DELETE";
      this.onShowResults = true;
    }
  }

  onSubmit() {
    for (let i = 0; i < this.displayArray.length; i++) {
      this.updateBasicaction(this.displayArray[i]);
    }

    if (this.function_type == "ADD") {
      if (this.apiFormData.valid) {
        console.log("this.apiFormData.value: ", this.apiFormData.value);
        this.loading = true;
        this.roleService.addRole(this.apiFormData.value).subscribe(
          (res) => {
            this.notificationAPI.alertSuccess("Role Added Successfully");
            this.router.navigate([`/admin/roles/view`]);
          },
          (err) => {
            this.loading = false;
            this.notificationAPI.alertWarning(err.message);
            this.router.navigate([`/admin/roles/view`]);
          }
        );
      } else {
        this.loading = false;
        // this.notificationAPI.alertWarning("Invalid Form")
      }
    } else if (this.function_type == "UPDATE") {
      this.loading = true;

      console.log("Update this.apiFormData.value: ", this.apiFormData.value);

      this.roleService.updateRole(this.apiFormData.value).subscribe(
        (res) => {
          this.notificationAPI.alertSuccess("Role Updated Successfully");
          this.router.navigate([`/admin/roles/view`]);
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this.notificationAPI.alertWarning(err.message);
          this.router.navigate([`/admin/roles/view`]);
        }
      );
    } else if (this.function_type == "DELETE") {
      this.loading = true;

      this.roleService.deleteRole(this.rolesData.id).subscribe(
        (res) => {
          this.loading = false;
          this.notificationAPI.alertSuccess("Role Deleted Successfully");
          this.router.navigate([`/admin/roles/view`]);
        },
        (err) => {
          this.loading = false;
          this.notificationAPI.alertWarning(err.message);
          this.router.navigate([`/admin/roles/view`]);
        }
      );
    }
  }

  ngOnDestroy() {
    localStorage.removeItem("editRolesData");
    localStorage.removeItem("viewRolesData");
  }

  toggleAll(selected: boolean) {
    this.displayArray.forEach((privilege) => (privilege.selected = selected));
  }

  checkIfAllSelected() {
    const allSelected = this.displayArray.every(
      (privilege) => privilege.selected
    );
    if (allSelected) {
      this.toggleAll(true);
    }
  }

  allSelected() {
    return this.displayArray.every((privilege) => privilege.selected);
  }
}
