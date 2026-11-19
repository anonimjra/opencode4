import ExcelJS from "exceljs";

export const RUPIAH_NUM_FMT = '"Rp"#,##0';

const HEADER_FILL = "FF0F172A";
const HEADER_FONT_COLOR = "FFFFFFFF";
const BORDER_COLOR = "FFD1D5DB";

export function createBaseWorkbook(): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Sistem Rental Kamera Lensa Nusantara";
  workbook.created = new Date();
  workbook.modified = new Date();
  return workbook;
}

export function applyCinemaWorksheetStyling(
  worksheet: ExcelJS.Worksheet,
  columnHeaders: string[],
): void {
  const headerRow = worksheet.getRow(1);
  headerRow.height = 32;

  columnHeaders.forEach((_, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.font = {
      name: "Arial",
      size: 11,
      bold: true,
      color: { argb: HEADER_FONT_COLOR },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: HEADER_FILL },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin", color: { argb: BORDER_COLOR } },
      left: { style: "thin", color: { argb: BORDER_COLOR } },
      bottom: { style: "thin", color: { argb: BORDER_COLOR } },
      right: { style: "thin", color: { argb: BORDER_COLOR } },
    };
  });
  headerRow.commit();

  const columnCount = worksheet.columnCount;
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    for (let col = 1; col <= columnCount; col += 1) {
      const cell = row.getCell(col);
      cell.font = { name: "Arial", size: 10 };
      cell.border = {
        top: { style: "thin", color: { argb: BORDER_COLOR } },
        left: { style: "thin", color: { argb: BORDER_COLOR } },
        bottom: { style: "thin", color: { argb: BORDER_COLOR } },
        right: { style: "thin", color: { argb: BORDER_COLOR } },
      };
      cell.alignment = { vertical: "middle" };
    }
  });

  autoFitColumns(worksheet);
}

function autoFitColumns(worksheet: ExcelJS.Worksheet): void {
  worksheet.columns.forEach((column) => {
    if (!column) return;
    let maxLength = 0;
    column.eachCell?.({ includeEmpty: false }, (cell) => {
      const value = cell.value;
      let text = "";
      if (value !== null && value !== undefined) {
        if (typeof value === "object" && "text" in value) {
          text = String((value as { text: string }).text);
        } else {
          text = String(value);
        }
      }
      maxLength = Math.max(maxLength, text.length);
    });
    column.width = Math.max(maxLength + 4, 14);
  });
}

export async function generateBuffer(
  workbook: ExcelJS.Workbook,
): Promise<Uint8Array> {
  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer as ArrayBuffer);
}

export function buildExcelResponse(
  buffer: Uint8Array,
  fileName: string,
): Response {
  return new Response(buffer as BodyInit, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": String(buffer.length),
      "Cache-Control": "no-store",
    },
  });
}
