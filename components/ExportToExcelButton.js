import React, { useState } from "react";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import Loading from "./Loading";
import { showToast } from "./notif";

const ExportToExcelButton = ({ data }) => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  function isDate(str) {
    let date = Date.parse(str);
    return (
      (typeof str === "object" && str instanceof Date) ||
      (typeof str === "string" && isNaN(+str) && !isNaN(date))
    );
  }
  const handleExport = async () => {
    if (data.length === 0)
      return showToast(
        "warning",
        "there is no data in Table to export ",
        "Warning"
      );
    setLoadingExcel(true);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers to the worksheet
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data rows to the worksheet
    data.forEach((row) => {
      const rowData = headers.map((header) =>
        isDate(row[header])
          ? new Date(row[header])
          : typeof row[header] !== "object"
          ? row[header]
          : ""
      );

      worksheet.addRow(rowData);

      if (!rowData.some((value) => typeof value === "object")) {
        console.log(rowData);
      }
    });

    // Format cells based on value types
    const columnCount = headers.length;
    const rowCount = data.length;

    for (let colIndex = 1; colIndex <= columnCount; colIndex++) {
      const columnType = typeof data[0][headers[colIndex - 1]];

      if (columnType === "date") {
        worksheet
          .getColumn(colIndex)
          .eachCell({ includeEmpty: true }, (cell) => {
            if (cell.value instanceof Date) {
              cell.numFmt = "yyyy/mm/dd";
            }
          });
      } else if (columnType === "number") {
        worksheet
          .getColumn(colIndex)
          .eachCell({ includeEmpty: true }, (cell) => {
            if (!isNaN(cell.value)) {
              cell.numFmt = "#,##0.00";
            }
          });
      }
    }

    // Generate a file name and extension
    const fileName = "data";
    const fileExtension = ".xlsx";

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the Excel buffer
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the file using FileSaver.js
    saveAs(blob, fileName + fileExtension);
    setLoadingExcel(false);
  };

  return (
    <button
      className="text-white bg-green-700 hover:bg-green-600 px-2 py-1 rounded shadow text-xs"
      onClick={() => handleExport()}
    >
      {" "}
      <div className="flex items-center gap-2">
        {loadingExcel && <Loading color={"stroke-white"} />}
        Excel
      </div>
    </button>
  );
};

export default ExportToExcelButton;
