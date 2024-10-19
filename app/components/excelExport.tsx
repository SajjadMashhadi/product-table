import * as FileSaver from "file-saver";
import Image from "next/image";
import * as XLSX from "sheetjs-style";

export default function ExcelExport({
  excelData,
  fileName,
}: {
  excelData: any;
  fileName: string;
}) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="flex items-center flex-row gap-[5px] border-[#137E77] border-[1px] rounded-[5px] p-[5px] "
      onClick={() => exportToExcel()}
    >
      <Image alt="file" width={20} height={20} src="/file.svg" />
      <span>خروجی تیم تامین</span>
    </button>
  );
}
