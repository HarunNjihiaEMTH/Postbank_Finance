package co.ke.emtechhouse.eims.ReportService.ExcelExports;

import co.ke.emtechhouse.eims.ReportService.ExcelExports.ExcelInterfaces.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

@Component
public class ExcelExporter {
    private XSSFWorkbook xssfWorkbook;
    private XSSFSheet xssfSheet;
    public ExcelExporter(){
        xssfWorkbook = new XSSFWorkbook();
    }

    //    create header line
    private void titleLine(){
        xssfSheet = xssfWorkbook.createSheet("Sheet1");
        Row row = xssfSheet.createRow(0);
        CellStyle cellStyle = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        font.setBold(true);
        font.setFontHeight(84);
        cellStyle.setFont(font);
        createCell(row, 0, "POST BANK UGANDA LIMITED", cellStyle);
    }
    //    create header line
    private void headerTitleLine(String reportTitle){
        Row row = xssfSheet.createRow(1);
        CellStyle cellStyle = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        font.setBold(true);
        font.setFontHeight(34);
        cellStyle.setFont(font);
        createCell(row, 0, "Report for "+reportTitle, cellStyle);
    }
    private void headerDateLine(String fromDate, String toDate){
        Row row = xssfSheet.createRow(2);
        CellStyle cellStyle = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        font.setBold(true);
        font.setFontHeight(34);
        cellStyle.setFont(font);
        createCell(row, 0, "From Date", cellStyle);
        createCell(row, 1, fromDate, cellStyle);
        createCell(row, 2, "To Date ", cellStyle);
        createCell(row, 3, toDate, cellStyle);
    }

    public CellStyle HeaderColor(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Courier New");
        font.setBold(true);
        font.setFontHeight((short) 5);
//        font.setUnderline(Font.U_SINGLE);
        font.setColor(HSSFColor.HSSFColorPredefined.BLACK.getIndex());
        style.setFont(font);

        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        return style;
    }
    public CellStyle subHeaderColor(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Courier New");
        font.setBold(true);
//        font.setFontHeight((short) 55);
//        font.setUnderline(Font.U_SINGLE);
        font.setColor(HSSFColor.HSSFColorPredefined.BLACK.getIndex());
        style.setFont(font);

        style.setAlignment(HorizontalAlignment.LEFT);
        style.setVerticalAlignment(VerticalAlignment.BOTTOM);
        return style;
    }

    private void InvoiceDetailedData(String fromDate, String toDate){

        Row row0 = xssfSheet.createRow(0);
        xssfSheet.addMergedRegion(CellRangeAddress.valueOf("A1:N1"));
        CellStyle cellStyle = xssfWorkbook.createCellStyle();

        CellStyle style = HeaderColor(xssfWorkbook);
        CellStyle style2 = subHeaderColor(xssfWorkbook);

        XSSFFont font = xssfWorkbook.createFont();
        font.setBold(true);
        font.setFontHeight(33);
        font.setFontHeight(34);
        cellStyle.setAlignment(HorizontalAlignment.JUSTIFY);
        cellStyle.setFont(font);

        Cell cell1 = row0.createCell(0);
        cell1.setCellStyle(style);
        cell1.setCellValue("VAT Sales Report");


        Row row1 = xssfSheet.createRow(1);
//        xssfSheet.addMergedRegion(CellRangeAddress.valueOf("A2:N2"));
        font.setBold(true);
        font.setFontHeight(34);
        cellStyle.setFont(font);
        createCell(row1, 0, "Period From:", cellStyle);
        createCell(row1, 1, fromDate, cellStyle);
        createCell(row1, 2, "To: ", cellStyle);
        createCell(row1, 3, toDate, cellStyle);


        Row row2 = xssfSheet.createRow(2);
        xssfSheet.addMergedRegion(CellRangeAddress.valueOf("A3:N3"));
        font.setBold(true);
        font.setFontHeight(34);
        cellStyle.setFont(font);

        Cell cell2 = row2.createCell(0);
        cell2.setCellStyle(style2);
        cell2.setCellValue("Please note: The invoices shown below are those that have been successfully uploaded to URA.");


        Row row3 = xssfSheet.createRow(3);
        xssfSheet.addMergedRegion(CellRangeAddress.valueOf("A4:N4"));
        font.setBold(true);
        font.setFontHeight(34);
        cellStyle.setFont(font);
        createCell(row3, 0, ".", cellStyle);
        Cell cell3 = row3.createCell(0);
        cell3.setCellStyle(style2);
        cell3.setCellValue("Do not convert the FDNs to number since they exceed the MS Excel digits size.");


        Row row4 = xssfSheet.createRow(4);
        font.setBold(true);
        font.setFontHeight(34);
        cellStyle.setFont(font);
//        createCell(row4, 0, "No", style2);
//        createCell(row4, 1, "Name of Purchaser", style2);
//        createCell(row4, 2, "TIN of Purchaser", style2);
//        createCell(row4, 3, "Invoice Date", style2);;
//        createCell(row4, 4, "FDN", style2);;
//        createCell(row4, 5, "Description of Goods", style2);;
//        createCell(row4, 6, "Amount (Exclusive of VAT)", style2);;
//        createCell(row4, 7, "Amount(Exclusive of VAT)(UGX)(A)", style2);;
//        createCell(row4, 8, "Local Excise Duty(UGX)(B)", style2);;
//        createCell(row4, 9, "TOTAL (A+B)", style2);;
//        createCell(row4, 10, "VAT Charged(UGX)", style2);;
//        createCell(row4, 11, "Currency", style2);;
//        createCell(row4, 12, "Exchange Rate", style2);;
//        createCell(row4, 13, "Seller's Reference No.", style2);

        String[] strAr1=new String[] {"No", "Name of Purchaser", "TIN of Purchaser","Invoice Date","FDN","Description of Goods","Amount (Exclusive of VAT)","Amount(Exclusive of VAT)(UGX)(A)","Local Excise Duty(UGX)(B)","TOTAL (A+B)","VAT Charged(UGX)","Currency","Exchange Rate","Seller's Reference No"};
        for (int i=0; i<strAr1.length; i++){
            Cell cell4 = row4.createCell(i);
            cell4.setCellStyle(style2);
            cell4.setCellValue(strAr1[i]);
        }
    }


    //    create header line
    private <T> void headerLine(Class<T> obj){
        Row row = xssfSheet.createRow(3);
        CellStyle cellStyle = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        cellStyle.setFont(font);
        Field[] list = obj.getDeclaredFields();
        for(int i =0; i<list.length; i++) {
            createCell(row, i, list[i].getName(), cellStyle);
        }
    }

    private void createCell(Row row, int countColumn, Object value, CellStyle cellStyle) {
        xssfSheet.autoSizeColumn(countColumn);
        Cell cell = row.createCell(countColumn);
        if (value instanceof  Integer ){
            cell.setCellValue((Integer) value );
        }
        else if (value instanceof Boolean){
            cell.setCellValue((Boolean) value);
        }
        else
        {
            cell.setCellValue((String) value );
        }
    }
//    TODO: General Reports
//    TODO: *********************************Payment To Supplier****************************************************
    public  <T> ByteArrayInputStream exportPaymentToSupplier(HttpServletResponse response, List<SupplierPayment> paymentData, Class<T> dynobj, String fromDate, String toDate) throws IOException {
        titleLine();
        headerTitleLine("Payment To Supplier");
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, paymentData.get(i).getTin(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplierName(), style);
            createCell(row, countColumn++, paymentData.get(i).getCountry(), style);
            createCell(row, countColumn++, paymentData.get(i).getDescription(), style);
            createCell(row, countColumn++, paymentData.get(i).getGrossAmount(), style);
            createCell(row, countColumn++, paymentData.get(i).getAmountExcTax(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplieramount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatamount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVWHAmount(), style);
            createCell(row, countColumn++, paymentData.get(i).getIWTamount(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranID(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceNo(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTaxRate(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatWHRate(), style);
            createCell(row, countColumn++, paymentData.get(i).getIncomeWHRate(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplierAccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVwtAccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getIwtAccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getPostedby(), style);
            createCell(row, countColumn++, paymentData.get(i).getVerifiedby() , style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
    //    TODO: *********************************VAT Exporter ****************************************************
    public  <T> ByteArrayInputStream exportVAT(HttpServletResponse response, List<SupplierPayment> paymentData, Class<T> dynobj, String fromDate, String toDate) throws IOException {
        titleLine();
        headerTitleLine("Vat Collected");
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, paymentData.get(i).getTin(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplierName(), style);
            createCell(row, countColumn++, paymentData.get(i).getCountry(), style);
            createCell(row, countColumn++, paymentData.get(i).getDescription(), style);
            createCell(row, countColumn++, paymentData.get(i).getGrossAmount(), style);
            createCell(row, countColumn++, paymentData.get(i).getAmountExcTax(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplieramount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatamount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVWHAmount(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranID(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceNo(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTaxRate(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatWHRate(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplierAccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVwtAccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getPostedby(), style);
            createCell(row, countColumn++, paymentData.get(i).getVerifiedby() , style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    //    TODO: *********************************IWH Exporter****************************************************
    public  <T> ByteArrayInputStream exportIWH(HttpServletResponse response, List<SupplierPayment> paymentData, Class<T> dynobj, String fromDate, String toDate) throws IOException {
        titleLine();
        headerTitleLine("Vat Collected");
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, paymentData.get(i).getTin(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplierName(), style);
            createCell(row, countColumn++, paymentData.get(i).getCountry(), style);
            createCell(row, countColumn++, paymentData.get(i).getDescription(), style);
            createCell(row, countColumn++, paymentData.get(i).getGrossAmount(), style);
            createCell(row, countColumn++, paymentData.get(i).getAmountExcTax(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplieramount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatamount(), style);
            createCell(row, countColumn++, paymentData.get(i).getIWTamount(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranID(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceNo(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTaxRate(), style);
            createCell(row, countColumn++, paymentData.get(i).getIncomeWHRate(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplierAccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getIwtAccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getPostedby(), style);
            createCell(row, countColumn++, paymentData.get(i).getVerifiedby() , style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    //    TODO: *********************************Invoice Exporter****************************************************
    public  <T> ByteArrayInputStream exportInvoice(HttpServletResponse response, List<InvoiceDetailsCust> paymentData, Class<T> dynobj, String fromDate, String toDate, String headerTitleLine) throws IOException {
        titleLine();
        headerTitleLine(headerTitleLine);
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, paymentData.get(i).getInvoiceno().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getCustomerid().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getDatetime().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getDeviceoperator().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getUracode().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getUradescription().toString(), style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    public  <T> ByteArrayInputStream exportLocalInvoiceDetailed(HttpServletResponse response, List<InvoiceLocalDetailedInfo> paymentData, String fromDate, String toDate, String headerTitleLine, ByteArrayOutputStream baos) throws IOException {
        titleLine();
//        headerTitleLine(headerTitleLine);
//        headerDateLine(fromDate, toDate);
//        InvoiceDetailedData();
        InvoiceDetailedData(fromDate, toDate);
        int rowCount = 5;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, i, style);
            createCell(row, countColumn++, paymentData.get(i).getNameOfPurchaser().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getTinOfPurchaser().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceDate().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getFdn().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getDescriptionofGoods().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getAmountExclusiveVat().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getAmountExclusiveVat().toString(), style);
            createCell(row, countColumn++, 0, style);
            createCell(row, countColumn++, paymentData.get(i).getTotals(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatCharged().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getExchangeRate().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getReferenceNo().toString(), style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }


    public  <T> ByteArrayInputStream exportImportInvoiceDetailed(HttpServletResponse response, List<InvoiceImportDetailedInfo> paymentData, String fromDate, String toDate, String headerTitleLine, ByteArrayOutputStream baos) throws IOException {
        titleLine();
//        headerTitleLine(headerTitleLine);
//        headerDateLine(fromDate, toDate);
//        InvoiceDetailedData();
        InvoiceDetailedData(fromDate, toDate);
        int rowCount = 5;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, i, style);
            createCell(row, countColumn++, paymentData.get(i).getNameOfSeller().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getTinOfPurchaser().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceDate().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getFdn().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getDescriptionofGoods().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getAmountExclusiveVat().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getAmountExclusiveVat().toString(), style);
            createCell(row, countColumn++, 0, style);
            createCell(row, countColumn++, paymentData.get(i).getTotals(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatCharged().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getExchangeRate().toString(), style);
            createCell(row, countColumn++, paymentData.get(i).getReferenceNo().toString(), style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }



    /*
        TODO: Export Acrual Payments*******************************
//     */
    public  <T> ByteArrayInputStream exportAcrual(HttpServletResponse response, List<SupplierPayment> paymentData, Class<T> dynobj, String fromDate, String toDate, String reportTitle) throws IOException {
        titleLine();
        headerTitleLine(reportTitle);
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);

        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, paymentData.get(i).getTin(), style);
            createCell(row, countColumn++, paymentData.get(i).getSupplierName(), style);
            createCell(row, countColumn++, paymentData.get(i).getDescription(), style);
            createCell(row, countColumn++, paymentData.get(i).getAcrualamount(), style);
            createCell(row, countColumn++, paymentData.get(i).getAcrualaccount(), style);
            createCell(row, countColumn++, paymentData.get(i).getCollectiondate(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranID(), style);
            createCell(row, countColumn++, paymentData.get(i).getPostedby(), style);
            createCell(row, countColumn++, paymentData.get(i).getVerifiedby(), style);
        }

        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
//    TODO: Export Credit Note *******************************
    //     */
    public  <T> ByteArrayInputStream exportCreditNote(HttpServletResponse response, List<Creditnoterepo> paymentData, Class<T> dynobj, String fromDate, String toDate, String reportTitle) throws IOException {
        titleLine();
        headerTitleLine(reportTitle);
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, paymentData.get(i).getCustomertin(), style);
            createCell(row, countColumn++, paymentData.get(i).getOriinvoiceid(), style);
            createCell(row, countColumn++, paymentData.get(i).getSellersreferenceno(), style);
            createCell(row, countColumn++, paymentData.get(i).getSource(), style);
            createCell(row, countColumn++, paymentData.get(i).getApplicationtime(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency(), style);
            createCell(row, countColumn++, paymentData.get(i).getReasoncode(), style);
            createCell(row, countColumn++, paymentData.get(i).getReason(), style);
            createCell(row, countColumn++, paymentData.get(i).getResponsecode(), style);
            createCell(row, countColumn++, paymentData.get(i).getUrastatus(), style);
            createCell(row, countColumn++, paymentData.get(i).getCreatedby(), style);
            createCell(row, countColumn++, paymentData.get(i).getVerifiedby(), style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    /*
    TODO: Export Direct Transfer*******************************
//     */
    public  <T> ByteArrayInputStream exportDirectTransfer(HttpServletResponse response, List<DirectPayment> paymentData, Class<T> dynobj, String fromDate, String toDate, String reportTitle) throws IOException {
        titleLine();
        headerTitleLine(reportTitle);
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;
            createCell(row, countColumn++, paymentData.get(i).getAcType(), style);
            createCell(row, countColumn++, paymentData.get(i).getSolId(), style);
            createCell(row, countColumn++, paymentData.get(i).getSolDesc(), style);
            createCell(row, countColumn++, paymentData.get(i).getAcName(), style);
            createCell(row, countColumn++, paymentData.get(i).getAcNo(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranId(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranDate(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranAmount(), style);
            createCell(row, countColumn++, paymentData.get(i).getTranType(), style);
            createCell(row, countColumn++, paymentData.get(i).getCcy(), style);
            createCell(row, countColumn++, paymentData.get(i).getDescription(), style);
            createCell(row, countColumn++, paymentData.get(i).getCreatedBy(), style);
            createCell(row, countColumn++, paymentData.get(i).getVerifiedBy(), style);
        }

        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    /*
TODO: Export Purchase Order*******************************
//     */
    public  <T> ByteArrayInputStream exportPO(HttpServletResponse response, List<POInterface> paymentData, Class<T> dynobj, String fromDate, String toDate, String reportTitle) throws IOException {
        titleLine();
        headerTitleLine(reportTitle);
        headerDateLine(fromDate, toDate);
        headerLine(dynobj);
        int rowCount = 4;
        CellStyle style = xssfWorkbook.createCellStyle();
        XSSFFont font = xssfWorkbook.createFont();
        style.setFont(font);
        for (int i =0; i<paymentData.size(); i++){
            Row row = xssfSheet.createRow(rowCount ++);
            int countColumn = 0;

            createCell(row, countColumn++, paymentData.get(i).getPoname(), style);
            createCell(row, countColumn++, paymentData.get(i).getPonumber(), style);
            createCell(row, countColumn++, paymentData.get(i).getPostedtime(), style);
            createCell(row, countColumn++, paymentData.get(i).getSuppliername(), style);
            createCell(row, countColumn++, paymentData.get(i).getSuppliertin(), style);
            createCell(row, countColumn++, paymentData.get(i).getCurrency(), style);
            createCell(row, countColumn++, paymentData.get(i).getTotalamount(), style);
            createCell(row, countColumn++, paymentData.get(i).getVat(), style);
            createCell(row, countColumn++, paymentData.get(i).getVatwht(), style);
            createCell(row, countColumn++, paymentData.get(i).getIWT(), style);
            createCell(row, countColumn++, paymentData.get(i).getCountry(), style);
            createCell(row, countColumn++, paymentData.get(i).getInvoiceno(), style);
            createCell(row, countColumn++, paymentData.get(i).getStatus(), style);
            createCell(row, countColumn++, paymentData.get(i).getPostedby(), style);
            createCell(row, countColumn++, paymentData.get(i).getVerifedby(), style);
        }
        ByteArrayOutputStream out  = new ByteArrayOutputStream();
        ServletOutputStream outputStream = response.getOutputStream();
        xssfWorkbook.write(outputStream);
        xssfWorkbook.write(out);
        outputStream.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
}



