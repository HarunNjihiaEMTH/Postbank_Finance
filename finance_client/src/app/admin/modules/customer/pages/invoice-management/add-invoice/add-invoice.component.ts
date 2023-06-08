import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { InvoiceTaxesService } from "src/app/admin/data/services/invoice-taxes.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import {
  FilesService,
  SelectedFiles,
} from "src/app/shared/services/files.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { BuyerSectorsLookupComponent } from "src/app/user/commons/components/buyer-sectors-lookup/buyer-sectors-lookup.component";
import { BuyerTypesLookupComponent } from "src/app/user/commons/components/buyer-types-lookup/buyer-types-lookup.component";
import { CurrencyCodeLookupComponent } from "src/app/user/commons/components/currency-code-lookup/currency-code-lookup.component";
import { CustomerLookupComponent } from "src/app/user/commons/components/customer-lookup/customer-lookup.component";
import { InvoiceKindComponent } from "src/app/user/commons/components/invoice-kind/invoice-kind.component";
import { InvoiceTypeComponent } from "src/app/user/commons/components/invoice-type/invoice-type.component";
import { ItemsLookupComponent } from "src/app/user/commons/components/items-lookup/items-lookup.component";
import { PayWayLookupComponent } from "src/app/user/commons/components/pay-way-lookup/pay-way-lookup.component";
import { TaxesLookupComponent } from "src/app/user/commons/components/taxes-lookup/taxes-lookup.component";
import { BasicDetailsService } from "src/app/user/data/services/customer/basic-details.service";
import { InvoiceService } from "src/app/user/data/services/customer/invoice.service";
import { SellerDetailsService } from "src/app/user/data/services/customer/seller-details.service";
import { Customer } from "src/app/user/data/types/customer-types/customer";
import { Invoice } from "src/app/user/data/types/customer-types/invoice";
import { OrderItem } from "src/app/user/data/types/order-item";
import { DiscountInvoiceItemsComponent } from "./dialog/discount-invoice-items/discount-invoice-items.component";

export interface InvoiceItem {
  deemedFlag?: string;
  discountFlag?: string;
  discountTaxRate?: string;
  discountTotal?: string;
  exciseFlag?: string;
  goodsCategoryId?: string;
  item?: string;
  itemCode?: string;
  orderNumber?: string;
  qty?: string;
  tax?: string;
  taxRate?: string;
  total?: string;
  unitOfMeasure?: string;
  unitPrice?: string;
  netAmount?: string;
  grossAmount?: string;
}

export interface PayWay {
  paymentMode?: string;
  paymentAmount?: string;
  orderNumber?: string;
}

export interface TaxDetails {
  netAmount?: number;
  taxAmount?: number;
  taxCategoryCode?: string;
  taxRate?: number;
  taxCode?: string;
  taxId?: number;
  taxRateName?: string;
  grossAmount?: string;
}

export interface ModesOfPayment {
  name?: string;
  code?: string;
}

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.sass"],
})
export class AddInvoiceComponent extends BaseComponent implements OnInit {
  isLinear = false;
  updateCommodity: boolean = false;
  goodsDetailsForm: FormGroup;
  modeOfPaymentForm: FormGroup;
  taxDetails: FormGroup;
  coreInvoiceForm: FormGroup;
  //invoiceDetailsConfigurationForm: FormGroup;
  productsDetailsConfigurationForm: FormGroup;

  generateInvoiceForm: FormGroup;
  currentUser: any;
  username: any;

  batchOptions: string[] = ["Yes", "No"];

  modesOfPayments: ModesOfPayment[] = [{ name: "Pay With Cash", code: "101" }];

  transactions: string[] = ["Imported Service"];
  //"NO", "Export",

  displayedColumns: string[] = [
    "id",
    "itemName",
    "itemQuantity",
    "itemUnitPrice",
    "itemTotalValue",
    "tax",
    "vatAmount",
    "amountTobepaid",
    "actions",
  ];

  dataSource!: MatTableDataSource<InvoiceItem>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  selection = new SelectionModel<OrderItem>(true, []);
  data: any;
  error: any;
  isLoading: boolean = false;
  invoiceItemDataSource: any;
  invoice: Invoice;
  routeState: any;
  invoiceItemArray: InvoiceItem[] = [];
  totalAfterTax: number = 0;
  taxAmount: number = 0;
  totalValue: number = 0;
  discountTotal: number = 0;
  total_before_tax: number = 0;
  modeOfPaymentAmount: number = 0;
  basicDetails: any;

  netAmount: number = 0;
  tax_amount: number = 0;
  tax_rate: number = 0;
  itemCount: number = 0;
  grossAmount: number = 0;
  outstandingBalance: number = 0;
  payWayArray: PayWay[] = [];
  taxDetailsArray: TaxDetails[] = [];
  payWayDataSource: any;

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  supplierServices: string;
  customer: Customer;
  commodityIndex: number = 0;
  updatedCommodityDetails: any;
  index: any;
  buyerSpecified: boolean = true;
  currencySpecified: boolean = false;
  itemIncludedInInvoice: boolean = false;
  serviceSelected: boolean = false;
  invoiceTaxes: any[] = [];
  invoiceTax: any;
  standardTaxSelected: boolean = false;
  zeroTaxSelected: boolean = false;
  exemptTaxSelected: boolean = false;
  deemedTaxSelected: boolean = false;
  execiseDutySelected: boolean = false;
  overTheTopServiceTaxSelected: boolean = false;
  stampDutyTaxSelected: boolean = false;
  localHotelServiceTaxSelected: boolean = false;
  uccLevyTaxSelected: boolean = false;
  otherTaxSelected: boolean = false;
  standardTaxRate = 0;
  zeroTaxRate = 0;
  exemptTaxRate = 0;
  deemedtaxRate = 0;
  execiseDutyTaxrate = 0;
  overTheTopServiceTaxRate = 0;
  stampDutyTaxRate = 0;
  localHotelTaxRate = 0;
  uccLevyTaxRate = 0;
  otherTaxRate = 0;
  invoiceTaxSummarryArray: TaxDetails[] = [];
  isBuyerOrSellerANonResident: boolean = false;
  buyerDetails: any;
  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);
  currFile: string;
  currFilename: any;
  currFiletype: any;
  sellerDetails: any;

  nameReadonly: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private invoiceService: InvoiceService,
    private sellerDetailsService: SellerDetailsService,
    private basicDetailsService: BasicDetailsService,
    private _snackBar: MatSnackBar,
    private invoiceTaxesService: InvoiceTaxesService,
    private fileService: FilesService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        if (this.routeState.action == "Navigation Back From Preview") {
          console.log("Router State", this.routeState);
          console.log("Parsed", JSON.parse(this.routeState.invoice));
          this.invoice = this.routeState.invoice
            ? JSON.parse(this.routeState.invoice)
            : "";
        } else if ((this.routeState.action = "Assign customer PO")) {
          console.log("Router State", this.routeState);
          console.log("Parsed", JSON.parse(this.routeState.customerDetails));
          this.customer = this.routeState.customerDetails
            ? JSON.parse(this.routeState.customerDetails)
            : "";
        } else {
          this.invoice = {};
          this.customer = {};
        }
      }
    }
    console.log("Purchase Order", this.invoice);
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    this.username = this.currentUser.username;

    console.log(this.username);

    this.createGenarateInvoiceForm();
    this.createSupportingForms();

    this.fetchSupplimentaryDetails();
    this.formLoading = false;
  }

  formLoading = true;
  createGenarateInvoiceForm() {
    this.generateInvoiceForm = this.fb.group({

      invoiceTypeInfo: this.fb.group({
        buyerSellerResidentType: ["No"],
        exportOrImportedService: ["Imported Service"],
      }),
      basicInformation: this.fb.group({
        currency: ["UGX"],
        dataSource: ["103"],
        deviceNo: ["TCSe116c1788777819"],
        invoiceIndustryCode: ["101"],
        invoiceKind: ["1"],
        invoiceType: ["1"],
        issuedDate: [""],
        operator: [this.username],
        oriInvoiceId: ["1"],
        dateOfIssue: [new Date()],
      }),
      buyerDetails: this.fb.group({
        buyerCitizenship: ["", [Validators.required]],
        buyerLegalName: ["", [Validators.required]],
        buyerMobilePhone: ["", [Validators.required]],
        buyerPassportNum: ["", [Validators.required]],
        buyerSector: ["", [Validators.required]],
        buyerTin: ["", [Validators.required]],
        buyerType: ["0", [Validators.required]],
      }),
      importServicesSeller: this.fb.group({
        importBusinessName: [""],
        importEmailAddress: [""],
        importContactNumber: [""],
        importAddress: [""],
        importInvoiceDate: [new Date().toISOString().split('T')[0]],
      // importInvoiceDate: [new Date()],
        importAttachmentName: [""],
        importAttachmentContent: [""],
      }),
      extend: {
        localInvoiceNo: "1234",
        reason: "Some reason",
        reasonCode: "102",
      },
      sellerDetails: this.fb.group({
        address: ["", [Validators.required]],
        businessName: ["", [Validators.required]],
        emailAddress: ["", [Validators.required]],
        legalName: ["", [Validators.required]],
        linePhone: ["", [Validators.required]],
        mobilePhone: ["", [Validators.required]],
        referenceNo: ["", [Validators.required]],
        tin: ["", [Validators.required]],
      }),
      summary: this.fb.group({
        grossAmount: ["", [Validators.required]],
        invoiceID: ["", [Validators.required]],
        itemCount: ["", [Validators.required]],
        modeCode: ["102", [Validators.required]],
        netAmount: ["", [Validators.required]],
        qrCode: ["", [Validators.required]],
        remarks: ["", [Validators.required]],
        taxAmount: ["", [Validators.required]],
      }),
      airlineGoods: new FormArray([]),
      goodsDetails: new FormArray([]),
      payWay: new FormArray([]),
      customerid: [""],
      taxDetails: new FormArray([]),
    });

    this.generateInvoiceForm
      .get("invoiceTypeInfo.buyerSellerResidentType")
      .valueChanges.subscribe((value) => {
        if (value === "Yes") {
          // Do something if buyerSellerResidentType is Yes
          this.isBuyerOrSellerANonResident = true;
          this.setImportServiceValidators(this.isBuyerOrSellerANonResident);
          this.transactionTypeSelected();
          this.generateInvoiceForm.patchValue({
            basicInformation: {
              invoiceIndustryCode: "104",
            },
          });

        } else {
          // Do something if buyerSellerResidentType is No
          this.isBuyerOrSellerANonResident = false;
          this.setImportServiceValidators(this.isBuyerOrSellerANonResident);
          this.generateInvoiceForm.get("importServicesSeller").reset();
          this.transactionTypeSelected();

          this.generateInvoiceForm.patchValue({
            basicInformation: {
              invoiceIndustryCode: "101",
            },
          });

        }
      });

    this.generateInvoiceForm
      .get("invoiceTypeInfo.exportOrImportedService")
      .valueChanges.subscribe((value) => {
        this.transactionTypeSelected();
      });
  }
  setImportServiceValidators(importService: boolean) {
    const importServicesSeller = this.generateInvoiceForm.get(
      "importServicesSeller"
    ) as FormGroup;

    if (importServicesSeller) {
      const importBusinessName = importServicesSeller.get(
        "importBusinessName"
      ) as FormControl;
      const importAddress = importServicesSeller.get(
        "importAddress"
      ) as FormControl;

      if (importService) {
        importBusinessName.setValidators(Validators.required);
        importAddress.setValidators(Validators.required);
      } else {
        importBusinessName.clearValidators();
        importAddress.clearValidators();
      }

      importBusinessName.updateValueAndValidity();
      importAddress.updateValueAndValidity();
    }
  }
  transactionTypeSelected() {
    if (
      this.generateInvoiceForm.value.invoiceTypeInfo.buyerSellerResidentType ==
      "Yes"
    ) {
      if (
        this.generateInvoiceForm.value.invoiceTypeInfo
          .exportOrImportedService == "NO" ||
        this.generateInvoiceForm.value.invoiceTypeInfo
          .exportOrImportedService == "Export"
      ) {
        this.generateInvoiceForm.patchValue({
          sellerDetails: {
            address: this.sellerDetails.address,
            businessName: this.sellerDetails.businessName,
            emailAddress: this.sellerDetails.emailAddress,
            legalName: this.sellerDetails.legalName,
            linePhone: this.sellerDetails.linePhone,
            mobilePhone: this.sellerDetails.mobilePhone,
            referenceNo: this.sellerDetails.referenceNo,
            tin: this.sellerDetails.tin,
          },
        });
      } else if (
        this.generateInvoiceForm.value.invoiceTypeInfo
          .exportOrImportedService == "Imported Service"
      ) {
        this.generateInvoiceForm.patchValue({
          buyerDetails: {
            buyerCitizenship: "Ugandan",
            buyerLegalName: this.sellerDetails.businessName,
            buyerMobilePhone: this.sellerDetails.mobilePhone,
            buyerPassportNum: "N/A",
            buyerSector: "1",
            buyerTin: this.sellerDetails.tin,
            buyerType: "0",
          },
        });

        this.generateInvoiceForm.patchValue({
          sellerDetails: {
            address: this.sellerDetails.address,
            businessName: this.sellerDetails.businessName,
            emailAddress: this.sellerDetails.emailAddress,
            legalName: this.sellerDetails.businessName,
            linePhone: this.sellerDetails.linePhone,
            mobilePhone: this.sellerDetails.mobilePhone,
            referenceNo: this.sellerDetails.referenceNo,
            tin: this.sellerDetails.tin,
          },
        });
      } else {
        this.generateInvoiceForm.patchValue({
          sellerDetails: {
            address: this.sellerDetails.address,
            businessName: this.sellerDetails.businessName,
            emailAddress: this.sellerDetails.emailAddress,
            legalName: this.sellerDetails.legalName,
            linePhone: this.sellerDetails.linePhone,
            mobilePhone: this.sellerDetails.mobilePhone,
            referenceNo: this.sellerDetails.referenceNo,
            tin: this.sellerDetails.tin,
          },
        });
      }
    } else {
      this.generateInvoiceForm.patchValue({
        sellerDetails: {
          address: this.sellerDetails.address,
          businessName: this.sellerDetails.businessName,
          emailAddress: this.sellerDetails.emailAddress,
          legalName: this.sellerDetails.legalName,
          linePhone: this.sellerDetails.linePhone,
          mobilePhone: this.sellerDetails.mobilePhone,
          referenceNo: this.sellerDetails.referenceNo,
          tin: this.sellerDetails.tin,
        },
        buyerDetails: {
          buyerCitizenship: "",
          buyerLegalName: "",
          buyerMobilePhone: "",
          buyerPassportNum: "",
          buyerSector: "",
          buyerTin: "",
          buyerType: "",
        },
      });
    }
  }

  createSupportingForms() {
    this.goodsDetailsForm = this.fb.group({
      deemedFlag: ["2"],
      discountFlag: ["2"],
      discountTaxRate: [0],
      discountTotal: [0],
      exciseFlag: ["2"],
      goodsCategoryId: [""],
      item: ["", [Validators.required]],
      itemCode: ["", [Validators.required]],
      orderNumber: [0],
      qty: [1, [Validators.required]],
      tax: [""],
      taxRate: [""],
      taxId: ["", [Validators.required]],
      taxCode: [""],
      total: [""],
      unitOfMeasure: [""],
      unitPrice: ["", [Validators.required]],
    });

    this.modeOfPaymentForm = this.fb.group({
      orderNumber: ["1", [Validators.required]],
      paymentAmount: ["", [Validators.required]],
      paymentMode: ["102", [Validators.required]],
    });

    this.taxDetails = this.fb.group({
      netAmount: ["", [Validators.required]],
      taxAmount: ["", [Validators.required]],
      taxCategoryCode: ["01", [Validators.required]],
      taxRate: ["", [Validators.required]],
      taxRateName: ["VAT", [Validators.required]],
      taxCode: [" "],
      grossAmount: [""],
    });
  }
  fetchSupplimentaryDetails() {
    this.getSellerDetais();

    this.getBasicDetais();

    this.fetchInvoiceTaxes();
  }

  get invoiceItemFormControls() {
    return this.generateInvoiceForm.controls;
  }

  get pushToInvoiceItemsFormArray() {
    return this.invoiceItemFormControls.goodsDetails as FormArray;
  }

  get pushToPayWayFormArray() {
    return this.invoiceItemFormControls.payWay as FormArray;
  }

  get pushToTaxDetailsFormArray() {
    return this.invoiceItemFormControls.taxDetails as FormArray;
  }

  fetchInvoiceTaxes() {
    this.invoiceTaxesService
      .listAllTaxCategory()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.invoiceTaxes = res;
          console.log("Invoice Taxes ", this.invoiceTaxes);

          console.log("GOODS DETAILS FORM ", this.goodsDetailsForm.value);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  selectInvoiceTax(event: any) {
    console.log(event.value);

    this.getInvoiceTaxById(event.value);
  }

  getInvoiceTaxById(invoiceTaxId) {
    this.invoiceTaxesService
      .fetchTaxById(invoiceTaxId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.invoiceTax = res;

          console.log("Invoice Tax", this.invoiceTax);

          this.goodsDetailsForm.patchValue({
            taxRate: this.invoiceTax.rate,
            taxCode: this.invoiceTax.code,
          });

          if (this.invoiceTax.code == "01") {
            if (this.invoiceTax.rate == 0) {
              this.standardTaxRate = 0;
            } else {
              this.standardTaxRate = Number(this.invoiceTax.rate / 100);
            }
          } else if (this.invoiceTax.code == "02") {
            if (this.invoiceTax.rate == 0) {
              this.zeroTaxRate = 0;
            } else {
              this.zeroTaxRate = Number(this.invoiceTax.rate / 100);
            }
          } else if (this.invoiceTax.code == "03") {
            if (this.invoiceTax.rate == 0) {
              this.exemptTaxRate = 0;
            } else {
              this.exemptTaxRate = Number(this.invoiceTax.rate / 100);
            }
          } else if (this.invoiceTax.code == "04") {
            if (this.invoiceTax.rate == 0) {
              this.deemedtaxRate = 0;
            } else {
              this.deemedtaxRate = Number(this.invoiceTax.rate / 100);
            }
          } else if (this.invoiceTax.code == "05") {
            if (this.invoiceTax.rate == 0) {
              this.execiseDutyTaxrate = 0;
            } else {
              this.execiseDutyTaxrate = Number(this.invoiceTax.rate / 100);
            }
          } else if (this.invoiceTax.code == "06") {
            if (this.invoiceTax.rate == 0) {
              this.overTheTopServiceTaxRate = 0;
            } else {
              this.overTheTopServiceTaxRate = Number(
                this.invoiceTax.rate / 100
              );
            }
          } else if (this.invoiceTax.code == "07") {
            if (this.invoiceTax.rate == 0) {
              this.stampDutyTaxRate = 0;
            } else {
              this.stampDutyTaxRate = Number(this.invoiceTax.rate / 100);
            }
          } else if (this.invoiceTax.code == "08") {
            if (this.invoiceTax.rate == 0) {
              this.localHotelTaxRate = 0;
            } else {
              this.localHotelTaxRate = Number(this.invoiceTax.rate / 100);
            }
          } else if (this.invoiceTax.code == "08") {
            if (this.invoiceTax.rate == 0) {
              this.uccLevyTaxRate = 0;
            } else {
              this.uccLevyTaxRate = Number(this.invoiceTax.rate / 100);
            }
          } else {
            if (this.invoiceTax.rate == 0) {
              this.otherTaxRate = 0;
            } else {
              this.otherTaxRate = Number(this.invoiceTax.rate / 100);
            }
          }
          console.log("Invoice Tax", this.invoiceTax);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getSellerDetais() {
    this.sellerDetailsService
      .fetchSellerDetails()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          if (result) {
            console.log("Seller Details", result[0]);

            this.sellerDetails = result[0];

            this.generateInvoiceForm.patchValue({
              sellerDetails: {
                address: this.sellerDetails.address,
                businessName: this.sellerDetails.businessName,
                emailAddress: this.sellerDetails.emailAddress,
                legalName: this.sellerDetails.legalName,
                linePhone: this.sellerDetails.linePhone,
                mobilePhone: this.sellerDetails.mobilePhone,
                referenceNo: this.sellerDetails.referenceNo,
                tin: this.sellerDetails.tin,
              },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getBasicDetais() {
    this.sellerDetailsService
      .fetchBasicDetails()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          if (result) {
            console.log("Basic Details", result[0]);

            const basicDetails = result[0];

            this.generateInvoiceForm.patchValue({
              basicInformation: {
                issuedDate: basicDetails.deviceissuedate,
                deviceno: basicDetails.deviceno,
                // invoiceIndustryCode: basicDetails.invoiceindustrycode,
              },
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  currencyCodeLookup() {
    const dialogRef = this.dialog.open(CurrencyCodeLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.currencySpecified = true;
          // this.generateInvoiceForm.patchValue({
          //   currency: result.data.code,
          // });

          this.generateInvoiceForm.patchValue({
            basicInformation: {
              currency: result.data.name,
            },
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  customerLookup() {
    const dialogRef = this.dialog.open(CustomerLookupComponent, {
      width: "800px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log(result);

        if (result.data.status != "Approved") {
          this.snackbar.showNotification(
            "snackbar-danger",
            "Invoice can only be allocated to approved customers !"
          );
        } else {
          // this.buyerSpecified = true;

          this.buyerDetails = result.data;

          console.log("Buyer Details ", this.buyerDetails);

          this.generateInvoiceForm.patchValue({
            buyerDetails: {
              buyerCitizenship: result.data.buyerCitizenship,
              buyerLegalName: result.data.buyerLegalName,
              buyerMobilePhone: result.data.buyerMobilePhone,
              buyerPassportNum: result.data.buyerPassportNum,
              buyerSector: result.data.buyerSector,
              buyerTin: result.data.buyerTin,
              buyerType: result.data.buyerType,
            },
          });

          this.generateInvoiceForm.patchValue({
            customerid: result.data.buyerTin,
          });

          // this.generateInvoiceForm.patchValue({
          //   buyerDetails: {
          //     buyerLegalName: result.data.buyerLegalName,
          //   }

          // });
        }
      });
  }

  onSelectFile(files) {
    console.log("row: ", files.value);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.fileService.toBase64(files, this.selectedFiles).subscribe((res) => {
      if (res) {
        this.isFileLoading.next(false);

        this.selectedFiles = res;
        this.currFile = this.selectedFiles[0].base64;
        this.currFilename = this.selectedFiles[0].name;
        this.currFiletype = this.selectedFiles[0].file.type;

        this.invoiceItemFormControls.importServicesSeller.patchValue({
          importAttachmentName: this.currFilename,
          importAttachmentContent: this.currFile,
        });
      }
    });
  }

  uploadAttachment(event: any) {
    const file: File = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("Base 64", reader.result);

      this.generateInvoiceForm.patchValue({
        importServicesSeller: {
          importAttachmentName: file.name,
          importAttachmentContent: reader.result,
        },
      });
    };
  }

  itemsLookup() {
    const dialogRef = this.dialog.open(ItemsLookupComponent, {
      width: "700px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        if (result.data.goodorservice == "Service") {
          this.serviceSelected = true;

          this.goodsDetailsForm.patchValue({
            qty: 1,
          });
        } else {
          this.serviceSelected = false;

          this.goodsDetailsForm.patchValue({
            qty: 1,
          });
        }

        this.goodsDetailsForm.patchValue({
          goodsCategoryId: result.data.commodityCategoryId,
          item: result.data.goodsName,
          itemCode: result.data.goodsCode,
          unitOfMeasure: result.data.measureUnit,
          unitPrice: result.data.unitPrice,
        });

        console.log("GOODS DETAILS FORM ", this.goodsDetailsForm.value);
      });
  }

  payWayLookup() {
    const dialogRef = this.dialog.open(PayWayLookupComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log(result);

        this.modeOfPaymentForm.patchValue({
          orderNumber: "1",
          paymentMode: result.data.value,
        });

        // this.invoiceDetailsConfigurationForm.patchValue({
        //   modeOfPayment: result.data.value,
        // });
      });
  }

  invoiceTypeLookup() {
    const dialogRef = this.dialog.open(InvoiceTypeComponent, {
      width: "500px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.generateInvoiceForm.patchValue({
          basicInformation: {
            invoiceType: result.data.code,
          },
        });
      });
  }

  taxesLookup() {
    const dialogRef = this.dialog.open(TaxesLookupComponent, {
      width: "500px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log("Result ", result);

        this.goodsDetailsForm.patchValue({
          taxRate: result.data.name,
        });
      });
  }

  getOrganisationBasicInformation() {
    this.basicDetailsService
      .fetchBasicDetails()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.basicDetails = res[0];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  invoiceKindLookup() {
    const dialogRef = this.dialog.open(InvoiceKindComponent, {
      width: "600px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        this.modeOfPaymentForm.patchValue({
          orderNumber: "1",
          paymentMode: result.data.code,
        });

        // this.invoiceDetailsConfigurationForm.patchValue({
        //   modeOfPayment: result.data.code,
        // });
      });
  }

  onAddItemQuantity() {
    if (this.goodsDetailsForm.value.qty != "-") {
      const newQuantity = parseFloat(this.goodsDetailsForm.value.qty) + 1;

      this.goodsDetailsForm.patchValue({
        qty: newQuantity,
      });
    }
  }

  onReduceCommodityQuantity() {
    if (this.goodsDetailsForm.value.qty != "-") {
      if (this.goodsDetailsForm.value.qty > 1) {
        const newQuantity = parseFloat(this.goodsDetailsForm.value.qty) - 1;

        this.goodsDetailsForm.patchValue({
          qty: newQuantity,
        });
      }
    }
  }

  addInvoiceItem() {
    let quantity = this.goodsDetailsForm.controls.qty.value;
    let unitPrice = 0;
    let total = 0;
    let tax_rate;
    let tax = 0;
    let netAmount: number = 0;
    let itemCount: number = 0;
    let taxRate = this.goodsDetailsForm.controls.taxRate.value;
    let taxCode = this.goodsDetailsForm.controls.taxCode.value;
    quantity = parseFloat(this.goodsDetailsForm.controls.qty.value);
    unitPrice = parseFloat(this.goodsDetailsForm.controls.unitPrice.value);
    total = quantity * unitPrice;

    taxRate = parseFloat(this.goodsDetailsForm.controls.taxRate.value);

    tax = (taxRate / 118) * total;

    tax_rate = taxRate / 100;

    this.goodsDetailsForm.controls.total.setValue(total);

    this.goodsDetailsForm.controls.tax.setValue(tax.toFixed(2));

    this.goodsDetailsForm.controls.discountTotal.setValue("");

    this.goodsDetailsForm.controls.discountTaxRate.setValue("");

    this.goodsDetailsForm.controls.deemedFlag.setValue("2");

    this.goodsDetailsForm.controls.discountFlag.setValue("2");

    this.goodsDetailsForm.controls.exciseFlag.setValue("2");

    this.goodsDetailsForm.controls.taxRate.setValue(taxRate / 100);

    this.invoiceItemArray.push(this.goodsDetailsForm.value);

    console.log("Goods Details Form", this.goodsDetailsForm.value);

    this.getInvoiceItems(this.invoiceItemArray);

    for (let i = 0; i < this.invoiceItemArray.length; i++) {
      this.index = i;

      this.invoiceItemArray[i].orderNumber = this.index;
    }

    itemCount = this.invoiceItemArray.length;

    if (itemCount > 0) {
      this.itemIncludedInInvoice = true;
    }

    netAmount = total - tax;

    this.taxDetails.patchValue({
      netAmount: netAmount,
      taxAmount: tax,
      grossAmount: total,
      taxRate: tax_rate,
      taxCode: taxCode,
    });

    console.log("TAX DETAILS", this.taxDetails.value);

    this.taxDetailsArray.push(this.taxDetails.value);

    this.goodsDetailsForm.reset();
  }

  addPayWay() {
    this.payWayArray.push(this.modeOfPaymentForm.value);
  }

  onSelectPayWay(event: any) {
    console.log(event.value);
    this.modeOfPaymentForm.patchValue({
      orderNumber: "1",
      paymentMode: event.value,
    });
  }

  updateInvoiceItemCall(i, data) {
    this.updateCommodity = true;

    this.goodsDetailsForm.patchValue({
      deemedFlag: data.deemedFlag,
      discountFlag: data.discountFlag,
      discountTaxRate: data.discountTaxRate,
      discountTotal: data.discountTotal,
      exciseFlag: data.exciseFlag,
      goodsCategoryId: data.goodsCategoryId,
      item: data.item,
      itemCode: data.itemCode,
      orderNumber: data.orderNumber,
      tax: data.tax,
      total: data.total,
      unitOfMeasure: data.unitOfMeasure,
      unitPrice: data.unitPrice,
      taxRate: data.taxRate * 100,
      taxId: data.taxId,
      taxCode: data.taxCode,
      qty: data.qty,
    });

    this.commodityIndex = i;
  }

  discountInvoiceItem(data) {
    const dialogRef = this.dialog.open(DiscountInvoiceItemsComponent, {
      width: "600px",
      data: {
        data: data,
        action: "Update",
        supplierType: this.supplierServices,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.invoiceItemArray.push(result.data);

      console.log("Invoice item", result.data);

      console.log("Invoice Items Array", this.invoiceItemArray);

      this.getInvoiceItems(this.invoiceItemArray);
    });
  }

  updateInvoiceItem() {
    let quantity = this.goodsDetailsForm.controls.qty.value;
    let unitPrice;
    let total;
    let tax_rate;
    let tax;
    let netAmount;
    let itemCount;
    let taxRate = this.goodsDetailsForm.controls.taxRate.value;
    let taxCode = this.goodsDetailsForm.controls.taxCode.value;
    quantity = parseFloat(this.goodsDetailsForm.controls.qty.value);
    unitPrice = parseFloat(this.goodsDetailsForm.controls.unitPrice.value);
    total = quantity * unitPrice;
    taxRate = parseFloat(this.goodsDetailsForm.controls.taxRate.value);

    tax = (taxRate / 118) * total;

    tax_rate = taxRate / 100;

    this.goodsDetailsForm.controls.total.setValue(total);

    this.goodsDetailsForm.controls.tax.setValue(tax.toFixed(2));

    this.goodsDetailsForm.controls.discountTotal.setValue("");

    this.goodsDetailsForm.controls.discountTaxRate.setValue("");

    this.goodsDetailsForm.controls.deemedFlag.setValue("2");

    this.goodsDetailsForm.controls.discountFlag.setValue("2");

    this.goodsDetailsForm.controls.exciseFlag.setValue("2");

    this.goodsDetailsForm.controls.taxRate.setValue(taxRate / 100);

    this.invoiceItemArray[this.commodityIndex] = this.goodsDetailsForm.value;

    this.getInvoiceItems(this.invoiceItemArray);

    for (let i = 0; i < this.invoiceItemArray.length; i++) {
      this.index = i;

      this.invoiceItemArray[i].orderNumber = this.index;
    }

    itemCount = this.invoiceItemArray.length;

    if (itemCount > 0) {
      this.itemIncludedInInvoice = true;
    }

    netAmount = total - tax;

    itemCount = this.invoiceItemArray.length;

    if (itemCount > 0) {
      this.itemIncludedInInvoice = true;
    }

    this.taxDetails.patchValue({
      netAmount: netAmount,
      taxAmount: tax,
      grossAmount: total,
      taxRate: tax_rate,
      taxCode: taxCode,
    });

    this.taxDetailsArray[this.commodityIndex] = this.taxDetails.value;

    this.goodsDetailsForm.reset();

    this.updateCommodity = false;
  }

  calculateInvoiceTax(taxArray) {
    let vatNetAmount = 0;
    let vatGrossAmount = 0;
    let vatTaxAmount = 0;
    let zeroTaxNetAmount = 0;
    let zeroTaxGrossAmount = 0;
    let zeroTaxTaxAmount = 0;
    let exemptTaxNetAmount = 0;
    let exemptTaxGrossAmount = 0;
    let exemptTaxTaxAmount = 0;
    let deemedTaxNetAmount = 0;
    let deemedTaxGrossAmount = 0;
    let deemedTaxTaxAmount = 0;
    let execiseDutyTaxNetAmount = 0;
    let execiseDutyTaxGrossAmount = 0;
    let execiseDutyTaxTaxAmount = 0;
    let ottServiceTaxNetAmount = 0;
    let ottServiceTaxGrossAmount = 0;
    let ottServiceTaxTaxAmount = 0;
    let stampDutyTaxNetAmount = 0;
    let stampDutyTaxGrossAmount = 0;
    let stampDutyTaxTaxAmount = 0;
    let localHotelServiceTaxNetAmount = 0;
    let localHotelServiceTaxGrossAmount = 0;
    let localHotelServciceTaxTaxAmount = 0;
    let uccLevyTaxNetAmount = 0;
    let uccLevyTaxGrossmount = 0;
    let uccLevyTaxTaxAmount = 0;
    let othersTaxNetAmount = 0;
    let othersTaxGrossAmount = 0;
    let othersTaxTaxAmount = 0;
    let grossAmount = 0;
    let taxAmount = 0;
    let netAmount = 0;

    taxArray.forEach((tax) => {
      console.log("TAX", tax);
      if (tax.taxCode == "01") {
        this.standardTaxSelected = true;

        vatNetAmount = vatNetAmount + tax.netAmount;

        vatTaxAmount = vatTaxAmount + tax.taxAmount;

        console.log("TAX AMOUNT", vatTaxAmount);
        console.log("NET AMOUNT", vatNetAmount);
      } else if (tax.taxCode == "02") {
        this.zeroTaxSelected = true;

        zeroTaxNetAmount += tax.netAmount;

        zeroTaxTaxAmount += tax.taxAmount;

        console.log("ZERO TAX TAX AMOUNT", zeroTaxTaxAmount);
        console.log("ZERO TAX NET AMOUNT", zeroTaxNetAmount);
      } else if (tax.taxCode == "03") {
        this.exemptTaxSelected = true;

        exemptTaxNetAmount += tax.netAmount;

        exemptTaxTaxAmount += tax.taxAmount;

        console.log("EXEMPT TAX TAX AMOUNT", exemptTaxTaxAmount);
        console.log("EXEMPT TAX NET AMOUNT", exemptTaxNetAmount);
      } else if (tax.taxCode == "04") {
        this.deemedTaxSelected = true;

        deemedTaxNetAmount += tax.netAmount;

        deemedTaxTaxAmount += tax.taxAmount;

        console.log("DEEMED TAX TAX AMOUNT", deemedTaxTaxAmount);
        console.log("DEEMED TAX NET AMOUNT", deemedTaxNetAmount);
      } else if (tax.taxCode == "05") {
        this.execiseDutySelected = true;

        execiseDutyTaxNetAmount += tax.netAmount;

        execiseDutyTaxTaxAmount += tax.taxAmount;

        console.log("EXECISE DUTY TAX TAX AMOUNT", execiseDutyTaxTaxAmount);
        console.log("EXECISE DUTY TAX NET AMOUNT", execiseDutyTaxNetAmount);
      } else if (tax.taxCode == "06") {
        this.overTheTopServiceTaxSelected = true;

        ottServiceTaxNetAmount += tax.netAmount;

        ottServiceTaxTaxAmount += tax.taxAmount;

        console.log("OTT TAX TAX AMOUNT", ottServiceTaxTaxAmount);
        console.log("OTT TAX NET AMOUNT", ottServiceTaxNetAmount);
      } else if (tax.taxCode == "07") {
        this.stampDutyTaxSelected = true;

        stampDutyTaxNetAmount += tax.netAmount;

        stampDutyTaxTaxAmount += tax.taxAmount;

        console.log("STAMP DUTY TAX TAX AMOUNT", stampDutyTaxTaxAmount);
        console.log("STAMP DUTY NET AMOUNT", stampDutyTaxNetAmount);
      } else if (tax.taxCode == "08") {
        this.localHotelServiceTaxSelected = true;

        localHotelServiceTaxNetAmount += tax.netAmount;

        localHotelServciceTaxTaxAmount += tax.taxAmount;

        console.log(
          "LOCAL HOTEL TAX TAX AMOUNT",
          localHotelServciceTaxTaxAmount
        );
        console.log(
          "LOCAL HOTEL TAX NET AMOUNT",
          localHotelServiceTaxNetAmount
        );
      } else if (tax.taxCode == "09") {
        this.uccLevyTaxSelected = true;

        uccLevyTaxNetAmount += tax.netAmount;

        uccLevyTaxTaxAmount += tax.taxAmount;

        console.log("UCC LEVY TAX TAX AMOUNT", uccLevyTaxTaxAmount);
        console.log("UCC LEVY TAX NET AMOUNT", uccLevyTaxNetAmount);
      } else if (tax.taxCode == "10") {
        this.otherTaxSelected = true;

        othersTaxNetAmount += tax.netAmount;

        othersTaxTaxAmount += tax.taxAmount;

        console.log("OTHER TAX AMOUNT", uccLevyTaxTaxAmount);
        console.log("OTHER TAX NET AMOUNT", othersTaxNetAmount);
      } else {
        console.log("Tax Not Calculated ", tax);
      }
    });

    vatGrossAmount = vatTaxAmount + vatNetAmount;

    if (this.standardTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: vatNetAmount.toFixed(2),
        taxAmount: vatTaxAmount.toFixed(2),
        grossAmount: vatGrossAmount.toFixed(2),
        taxRate: this.standardTaxRate,
        taxCategoryCode: "01",
        taxRateName: "A: Standard (18%)",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    zeroTaxGrossAmount = zeroTaxTaxAmount + zeroTaxNetAmount;

    if (this.zeroTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: zeroTaxNetAmount.toFixed(2),
        taxAmount: zeroTaxTaxAmount.toFixed(2),
        grossAmount: zeroTaxGrossAmount.toFixed(2),
        taxRate: this.zeroTaxRate,
        taxCategoryCode: "02",
        taxRateName: "B: Zero (0%)",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    exemptTaxGrossAmount = exemptTaxTaxAmount + exemptTaxNetAmount;

    if (this.exemptTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: exemptTaxNetAmount.toFixed(2),
        taxAmount: exemptTaxTaxAmount.toFixed(2),
        grossAmount: exemptTaxGrossAmount.toFixed(2),
        taxRate: this.exemptTaxRate,
        taxCategoryCode: "03",
        taxRateName: "C: Exempt (-)",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    deemedTaxGrossAmount = deemedTaxTaxAmount + deemedTaxNetAmount;

    if (this.deemedTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: deemedTaxNetAmount.toFixed(2),
        taxAmount: deemedTaxTaxAmount.toFixed(2),
        grossAmount: deemedTaxGrossAmount.toFixed(2),
        taxRate: this.deemedtaxRate,
        taxCategoryCode: "04",
        taxRateName: "D: Deemed (18%)",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    execiseDutyTaxGrossAmount =
      execiseDutyTaxTaxAmount + execiseDutyTaxNetAmount;

    if (this.execiseDutySelected) {
      this.taxDetails.patchValue({
        netAmount: execiseDutyTaxNetAmount.toFixed(2),
        taxAmount: execiseDutyTaxTaxAmount.toFixed(2),
        grossAmount: execiseDutyTaxGrossAmount.toFixed(2),
        taxRate: this.execiseDutyTaxrate,
        taxCategoryCode: "05",
        taxRateName: "E: Excise Duty",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    ottServiceTaxGrossAmount = ottServiceTaxTaxAmount + ottServiceTaxNetAmount;

    if (this.overTheTopServiceTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: ottServiceTaxNetAmount.toFixed(2),
        taxAmount: ottServiceTaxTaxAmount.toFixed(2),
        grossAmount: ottServiceTaxGrossAmount.toFixed(2),
        taxRate: this.overTheTopServiceTaxRate,
        taxCategoryCode: "06",
        taxRateName: "Over the Top Service (OTT)",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    stampDutyTaxGrossAmount = stampDutyTaxTaxAmount + stampDutyTaxNetAmount;

    if (this.stampDutyTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: stampDutyTaxNetAmount.toFixed(2),
        taxAmount: stampDutyTaxTaxAmount.toFixed(2),
        grossAmount: stampDutyTaxGrossAmount.toFixed(2),
        taxRate: this.stampDutyTaxRate,
        taxCategoryCode: "07",
        taxRateName: "Stamp Duty",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    localHotelServiceTaxGrossAmount =
      localHotelServciceTaxTaxAmount + localHotelServiceTaxNetAmount;

    if (this.localHotelServiceTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: localHotelServiceTaxNetAmount.toFixed(2),
        taxAmount: localHotelServciceTaxTaxAmount.toFixed(2),
        grossAmount: localHotelServiceTaxGrossAmount.toFixed(2),
        taxRate: this.localHotelTaxRate,
        taxCategoryCode: "08",
        taxRateName: "Local Hotel Service Tax",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    uccLevyTaxGrossmount = uccLevyTaxTaxAmount + uccLevyTaxNetAmount;

    if (this.uccLevyTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: uccLevyTaxNetAmount.toFixed(2),
        taxAmount: uccLevyTaxTaxAmount.toFixed(2),
        grossAmount: uccLevyTaxGrossmount.toFixed(2),
        taxRate: this.uccLevyTaxRate,
        taxCategoryCode: "09",
        taxRateName: "UCC Levy",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    othersTaxGrossAmount = othersTaxTaxAmount + othersTaxNetAmount;

    if (this.otherTaxSelected) {
      this.taxDetails.patchValue({
        netAmount: othersTaxNetAmount.toFixed(2),
        taxAmount: othersTaxTaxAmount.toFixed(2),
        grossAmount: othersTaxGrossAmount.toFixed(2),
        taxRate: this.otherTaxRate,
        taxCategoryCode: "10",
        taxRateName: "Others",
      });

      this.pushToTaxDetailsFormArray.push(this.fb.group(this.taxDetails.value));

      this.invoiceTaxSummarryArray.push(this.taxDetails.value);
    }

    console.log("Invoice Tax Summary ", this.invoiceTaxSummarryArray);

    this.invoiceTaxSummarryArray.forEach((tax) => {
      grossAmount += Number(tax.grossAmount);
      taxAmount += Number(tax.taxAmount);
      netAmount += Number(tax.netAmount);
    });

    this.invoiceItemFormControls.summary.patchValue({
      grossAmount: grossAmount,
      netAmount: netAmount,
      taxAmount: taxAmount,
    });

    this.modeOfPaymentForm.patchValue({
      paymentAmount: grossAmount,
    });

    this.pushToPayWayFormArray.push(
      this.fb.group(this.modeOfPaymentForm.value)
    );
  }

  onRemoveInvoiceItem(i: any) {
    this.invoiceItemArray.splice(i, 1);
    this.taxDetailsArray.splice(i, 1);

    this.getInvoiceItems(this.invoiceItemArray);
  }

  getInvoiceItems(invoiceItemsArray: any) {
    this.invoiceItemDataSource = new MatTableDataSource(invoiceItemsArray);
    this.invoiceItemDataSource.paginator = this.paginator;
  }

  getPayWays(payWayArray: any) {
    this.payWayDataSource = new MatTableDataSource(payWayArray);

    this.invoiceItemDataSource.paginator = this.paginator;
  }

  generateInvoice() {
    console.log("INVOICE ITEM ARRAY", this.invoiceItemArray);
    this.invoiceItemArray.forEach((invoiceItem) => {
      console.log("Invoice Item", invoiceItem);

      this.pushToInvoiceItemsFormArray.push(this.fb.group(invoiceItem));
    });
    let itemCount = this.invoiceItemArray.length;

    console.log("TAX DETAILS ARRAY ", this.taxDetailsArray);

    this.calculateInvoiceTax(this.taxDetailsArray);

    this.generateInvoiceForm.patchValue({
      summary: {
        itemCount: itemCount,
      },
    });

    // if (this.isBuyerOrSellerANonResident) {
    //   // this.invoiceItemFormControls.buyerDetails.patchValue({
    //   //   buyerType: "2",
    //   // });

    //   this.invoiceItemFormControls.importServicesSeller.patchValue({
    //     importBusinessName:
    //       this.invoiceDetailsConfigurationForm.value.importBusinessName,
    //     importEmailAddress:
    //       this.invoiceDetailsConfigurationForm.value.importEmailAddress,
    //     importContactNumber:
    //       this.invoiceDetailsConfigurationForm.value.importContactNumber,
    //     importAddress: this.invoiceDetailsConfigurationForm.value.importAddress,
    //     importInvoiceDate:
    //       this.invoiceDetailsConfigurationForm.value.importInvoiceDate,
    //     importAttachmentName:
    //       this.invoiceDetailsConfigurationForm.value.importAttachmentName,
    //     importAttachmentContent:
    //       this.invoiceDetailsConfigurationForm.value.importAttachmentContent,
    //   });
    // } else {
    //   this.invoiceItemFormControls.importServicesSeller.reset();
    // }

    console.log(
      "this.invoiceForm: ",
      this.generateInvoiceForm.value.invoiceTypeInfo.exportOrImportedService
    );
    console.log("Invoice Generation Form", this.generateInvoiceForm.value);

    console.log("GENERATE INVOICE FORM ", this.generateInvoiceForm.value);

    this.invoiceService
      .saveInvoiceDetails(this.generateInvoiceForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          let message = "SYSTEM RESPONCE: ";
          this._snackBar.open(
            message +
              "\n STATUS CODE: " +
              result.statusCode +
              "\n STATUS CODE VALUE| " +
              result.statusCodeValue +
              "\n DESCRIPTION| " +
              result.body,
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000000,
              panelClass: ["snackbar-success", "snackbar-success"],
            }
          );
          this.router.navigate([
            "/admin/customer/invoices-management/pending-invoices",
          ]);

          console.log(result);
        },
        (err) => {
          console.log(err);

          this.snackbar.showNotification(
            "snackbar-danger",
            "Error when generating invoice, please try again later !"
          );
        }
      );
  }

  onCancel() {
    this.router.navigate(["/admin/customer/invoices-management/all-invoices"]);
  }
}
