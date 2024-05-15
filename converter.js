/** @format */

const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const file = process.argv[2];
const sheet = process.argv[3];
const serialNum = process.argv[4] || 1;
// Function to read and convert Excel to JSON
function excelToJson(filePath) {
  // Load the Excel file
  const workbook = XLSX.readFile(filePath);

  // Get the name of the first worksheet
  const firstSheetName = workbook.SheetNames[sheet];
  const worksheet = workbook.Sheets[firstSheetName];
  // generate the serial number
  let count = serialNum;
  const serial = () => {
    return count++;
  };
  // Convert the worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
  const datawithDuplicate = jsonData
    .filter((val) => {
      if (val.Mobile && val.Mobile !== "null") {
        return true;
      }
    })
    .map((val) => {
      return {
        name: val.NameEn,
        mobile: val.Mobile.replace(/-/g, ""),
        unit: val.UnitNumber === "null" ? val["Building No"] : val.UnitNumber,
        project: val.Project,
      };
    });
  const data = datawithDuplicate.reduce((acc, cur) => {
    if (!acc.some((val) => val.mobile === cur.mobile)) {
      cur.serial = serial();
      acc.push(cur);
    }
    return acc;
  }, []);
  console.log("json Data", jsonData.length);
  console.log("datawithDuplication", datawithDuplicate.length);
  console.log("data", data.length);
  // Write JSON to a file
  //   const fileName = sheet.replace(".xlsx", ".json");
  //   fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
  const dbPath = fs.readFileSync(path.join(__dirname, "./src/db", "data.json"));
  const db = JSON.parse(dbPath);
  db.push(data);
  fs.writeFileSync(
    path.join(__dirname, "./src/db", "data.json"),
    JSON.stringify(db, null, 4)
  );
  console.log("Data converted successfully");
}

// Call the function with the path to your Excel file
excelToJson(file);
