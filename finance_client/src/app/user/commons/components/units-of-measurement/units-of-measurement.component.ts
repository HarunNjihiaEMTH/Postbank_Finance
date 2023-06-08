import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddItemComponent } from 'src/app/admin/modules/customer/pages/item-management/add-item/add-item.component';
import { Customer } from 'src/app/user/data/types/customer-types/customer';


export interface Unit {
  name?: string;
  code?: string;
}

const UNITSOFMEASURE: Unit[] = [
  { name: "Bag", code: "BG" },
  { name: "Board Feet", code: "BF" },
  { name: "Bale", code: "BL" },
  { name: "Bottle", code: "BT" },
  { name: "Box", code: "BX" },
  { name: "Hundred", code: "C" },
  { name: "Cubic Centimeter", code: "CC" },
  { name: "Cubic Feet", code: "CF" },
  { name: "Curie", code: "CI" },
  { name: "Cylinder", code: "CL" },
  { name: "Centimeter", code: "CM" },
  { name: "Can", code: "CN" },
  { name: "Case", code: "CS" },
  { name: "Carton", code: "CT" },
  { name: "Hundred Weight", code: "CW" },
  { name: "Cubic Yard", code: "CY" },
  { name: "Diameter", code: "DI" },
  { name: "Drum", code: "DR" },
  { name: "Dewar", code: "DW" },
  { name: "Day", code: "DY" },
  { name: "Dozen", code: "DZ" },
  { name: "Each", code: "EA" },
  { name: "Feet", code: "FT" },
  { name: "Gallon", code: "GL" },
  { name: "Gram", code: "GM" },
  { name: "Grain", code: "GN" },
  { name: "Gross", code: "GR" },
  { name: "Hours", code: "HR" },
  { name: "Jar", code: "JR" },
  { name: "Kilogram", code: "KG" },
  { name: "Kit", code: "KT" },
  { name: "Lambda", code: "LA" },
  { name: "Pound", code: "LB" },
  { name: "Linear Feet", code: "LF" },
  { name: "Length", code: "LG" },
  { name: "Liter", code: "LI" },
  { name: "Lot", code: "LT" },
  { name: "Linear Yard", code: "LY" },
  { name: "Thousand", code: "M" },
  { name: "Milligram", code: "MG" },
  { name: "Milliliter", code: "ML" },
  { name: "Millimeter", code: "MM" },
  { name: "Minute", code: "MN" },
  { name: "Month", code: "MO" },
  { name: "Micron", code: "MR" },
  { name: "Meter", code: "CX" },
  { name: "Omega", code: "OG" },
  { name: "Ounce", code: "OZ" },
  { name: "Package", code: "PA" },
  { name: "Piece", code: "PC" },
  { name: "Page", code: "PG" },
  { name: "Pack", code: "PK" },
  { name: "Pint", code: "PT" },
  { name: "Quater", code: "QR" },
  { name: "Quart", code: "QT" },
  { name: "Roll", code: "RL" },
  { name: "Ream", code: "RM" },
  { name: "Square Feet", code: "SF" },
  { name: "Sheet", code: "SH" },
  { name: "Set", code: "ST" },
  { name: "Square Yard", code: "SY" },
  { name: "Tube", code: "TB" },
  { name: "Transaction", code: "TR" },
  { name: "Unit", code: "UT" },
  { name: "Vial", code: "VL" },
  { name: "Week", code: "WK" },
  { name: "Yard", code: "YD" },
  { name: "Year", code: "YR" },
];

@Component({
  selector: 'app-units-of-measurement',
  templateUrl: './units-of-measurement.component.html',
  styleUrls: ['./units-of-measurement.component.sass']
})
export class UnitsOfMeasurementComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "code",
  ];
  dataSource = new MatTableDataSource<Unit>(UNITSOFMEASURE);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  isLoading = true;
  selection = new SelectionModel<Customer>(true, []);
  index: number;
  id: number;

  dataSource3 = new MatTableDataSource(UNITSOFMEASURE);

  constructor( public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSelectRow(data:any){
    this.dialogRef.close({ event: 'close', data:data });

    //console.log(data)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Customer) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
