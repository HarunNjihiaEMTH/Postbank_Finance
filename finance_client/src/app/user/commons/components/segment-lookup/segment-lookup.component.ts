import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AddItemComponent } from "src/app/admin/modules/customer/pages/item-management/add-item/add-item.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { StockManagementService } from "src/app/user/data/services/customer/stock-management.service";
import { Category } from "src/app/user/data/types/customer-types/category";


@Component({
  selector: "app-segment-lookup",
  templateUrl: "./segment-lookup.component.html",
  styleUrls: ["./segment-lookup.component.scss"],
})
export class SegmentLookupComponent extends BaseComponent implements OnInit {
  segments: Category;
  segmentParametersForm: FormGroup;
  filterOptions: string[] = [
    "Segment Name",
    "Family Code",
    "Family Name",
    "Class Code",
    "Class Name",
    "Commodity Code",
    "Commodity Name",
    "Is it a service?",
  ];
  displayedColumns: string[] = [
    "segmentname",
    "familycode",
    "familyname",
   // "classcode",
    "commoditycode",
    "commodityname",
    "isservice",
  ];

  dataSource: MatTableDataSource<any>;
  isLoading = true;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  pages: number[] = [];
  pagesGenerated = false;
  querySelected = false;
  pagesCalculated = false;
  segmentNameSelected: boolean = false;
  familyNameSelected: boolean = false;
  familyCodeSelected: boolean = false;
  classNameSelected: boolean = false;
  classCodeSelected: boolean = false;
  isAServiceSelected: boolean = false;
  commodityCodeSelected: boolean = false;
  commodityNameSelected: boolean = false;
  limitFound: boolean = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100, 1000, 10000, 30000, 80000];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockManagementService: StockManagementService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.segmentParametersForm = this.createSegmentParametersForm();
  }

  createSegmentParametersForm() {
    return this.fb.group({
      option: [""],
      segmentname: [""],
      familycode: [""],
      familyname: [""],
      classcode: [""],
      classname: [""],
      commoditycode: [""],
      commodityname: [""],
      isservice: [""],
    });
  }

  onSelectQuery(event: any) {
    console.log(event.value);

    if (event.value === "Segment Name") {
      this.segmentNameSelected = true;
      this.familyNameSelected = false;
      this.familyCodeSelected = false;
      this.classNameSelected = false;
      this.classCodeSelected = false;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    } else if (event.value == "Family Name") {
      this.querySelected = true;
      this.segmentNameSelected = false;
      this.familyNameSelected = true;
      this.familyCodeSelected = false;
      this.classNameSelected = false;
      this.classCodeSelected = false;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    } else if (event.value == "Family Code") {
      this.segmentNameSelected = false;
      this.familyNameSelected = false;
      this.familyCodeSelected = true;
      this.classNameSelected = false;
      this.classCodeSelected = false;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    } else if (event.value == "Class Code") {
      this.segmentNameSelected = false;
      this.familyNameSelected = false;
      this.familyCodeSelected = false;
      this.classNameSelected = false;
      this.classCodeSelected = true;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    } else if (event.value == "Class Name") {
      this.querySelected = true;

      this.segmentNameSelected = false;
      this.familyNameSelected = false;
      this.familyCodeSelected = false;
      this.classNameSelected = true;
      this.classCodeSelected = false;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    } else if (event.value == "Commodity Code") {
      this.segmentNameSelected = false;
      this.familyNameSelected = false;
      this.familyCodeSelected = false;
      this.classNameSelected = false;
      this.classCodeSelected = false;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = true;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    } else if (event.value == "Commodity Name") {
      this.segmentNameSelected = false;
      this.familyNameSelected = false;
      this.familyCodeSelected = false;
      this.classNameSelected = false;
      this.classCodeSelected = false;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = true;
      this.pagesGenerated = false;
    } else if (event.value == "Is it a service?") {
      this.segmentNameSelected = false;
      this.familyNameSelected = false;
      this.familyCodeSelected = false;
      this.classNameSelected = false;
      this.classCodeSelected = false;
      this.isAServiceSelected = true;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    } else {
      this.segmentNameSelected = false;
      this.familyNameSelected = false;
      this.familyCodeSelected = false;
      this.classNameSelected = false;
      this.classCodeSelected = false;
      this.isAServiceSelected = false;
      this.commodityCodeSelected = false;
      this.commodityNameSelected = false;
      this.pagesGenerated = false;
    }
  }

  getSegments(page, limit, query) {
    this.stockManagementService
      .filterBySegmentName(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
            
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;

            this.paginator.length = this.segments.totalItems;
          }

          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  filterByFamilyName(page, limit, query) {
    this.stockManagementService
      .filterByFamilyName(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;

            this.paginator.length = this.segments.totalItems;
          }

          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  filterByFamilyCode(page, limit, query) {
    this.stockManagementService
      .filterByFamilyCode(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          console.log("Pages ", this.pages);

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;

            this.paginator.length = this.segments.totalItems;
          }
          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getFilterByClassName(page, limit, query) {
    this.stockManagementService
      .filterByClassName(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
            
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = this.segments.totalItems;
          }
          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  filterByClassCode(page, limit, query) {
    this.stockManagementService
      .filterByClassCode(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
         
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = this.segments.totalItems;
          }
          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCommodityByCode(page, limit, query) {
    this.stockManagementService
      .filterByCommodityCode(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
           
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = this.segments.totalItems;
          }
          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  filterByCommodityName(page, limit, query) {
    this.stockManagementService
      .filterByCommodityName(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
          
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;

            this.paginator.length = this.segments.totalItems;
          }

          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCommodityByType(page, limit, query) {
    this.stockManagementService
      .filterByType(page, limit, query)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.segments = res;

          const pages = this.segments.totalPages;

          this.pages.length = 0;

          for (let i = 1; i < pages; i++) {
            this.pages.push(i);
          }

          if (this.pages) {
            this.pagesGenerated = true;
          }

          if (this.segments.items.length > 0) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.segments.items);
           
            this.dataSource.sort = this.sort;

            this.paginator.pageIndex = this.currentPage;

            this.paginator.length = this.segments.totalItems;
          }

          console.log(this.segments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCategories() {
    this.dataSource = new MatTableDataSource<any>([]);
    this.isLoading = true;
    
    if (this.segmentParametersForm.value.option == "Segment Name") {     
      const query = this.segmentParametersForm.value.segmentname;

      this.getSegments(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Family Name") {
      const query = this.segmentParametersForm.value.familyname;

      this.filterByFamilyName(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Family Code") {
      const query = this.segmentParametersForm.value.familycode;

      this.filterByFamilyCode(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Class Code") {     
      const query = this.segmentParametersForm.value.classcode;

      this.filterByClassCode(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Class Name") {
      const query = this.segmentParametersForm.value.classname;

      this.getFilterByClassName(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Commodity Code") {
      const query = this.segmentParametersForm.value.commoditycode;

      this.getCommodityByCode(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Commodity Name") {
      const query = this.segmentParametersForm.value.commodityname;

      this.filterByCommodityName(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Is it a service?") {
      const query = this.segmentParametersForm.value.isservice;

      this.getCommodityByType(this.currentPage, this.pageSize, query);
    }
  }

  pageChanged(event: PageEvent) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.isLoading = true;

    if (this.segmentParametersForm.value.option == "Segment Name") {
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.segmentname;

      this.getSegments(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Family Name") {
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.familyname;

      this.filterByFamilyName(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Family Code") {
      console.log("Inside Family Code");
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.familycode;

      this.filterByFamilyCode(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Class Code") {
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.classcode;

      this.filterByClassCode(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Class Name") {
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.classname;

      this.getFilterByClassName(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Commodity Code") {
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.commoditycode;

      this.getCommodityByCode(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Commodity Name") {
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.commodityname;

      this.filterByCommodityName(this.currentPage, this.pageSize, query);
    }

    if (this.segmentParametersForm.value.option == "Is it a service?") {
      this.currentPage =  event.pageIndex;
      this.pageSize =  event.pageSize;
      const query = this.segmentParametersForm.value.isservice;

      this.getCommodityByType(this.currentPage, this.pageSize, query);
    }
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ event: "close", data: data });

    console.log(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
