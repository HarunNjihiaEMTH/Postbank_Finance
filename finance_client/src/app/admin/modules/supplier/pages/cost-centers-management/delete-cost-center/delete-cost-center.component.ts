import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CostCenterService } from 'src/app/user/data/services/cost-center.service';
import { CostCenter } from 'src/app/user/data/types/cost-center';
import { AllCostCentersComponent } from '../all-cost-centers/all-cost-centers.component';

@Component({
  selector: 'app-delete-cost-center',
  templateUrl: './delete-cost-center.component.html',
  styleUrls: ['./delete-cost-center.component.sass']
})
export class DeleteCostCenterComponent extends BaseComponent implements OnInit {
  costCenterId: number;
  costCenter: CostCenter;

  constructor( public dialogRef: MatDialogRef<AllCostCentersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.costCenter = this.data.data;

    this.costCenterId = this.costCenter.id;
  }

  confirmDelete() {
    this.costCenterService
      .deleteCostCenter(this.costCenterId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Cost center deleted successfully !"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
