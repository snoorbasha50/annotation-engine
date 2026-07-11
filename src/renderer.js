const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function render() {
  // Read PDF
  const pdfBytes = fs.readFileSync(
    path.join(__dirname, "../forms/f1040.pdf")
  );

  // Load PDF
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get first page
  const page = pdfDoc.getPages()[0];

  // Embed font
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Draw text
  page.drawText("Hello World", {
    x: 200,
    y: 700,
    size: 14,
    font,
    color: rgb(1, 0, 0),
  });

  // Save
  const pdfBytesModified = await pdfDoc.save();

  fs.writeFileSync(
    path.join(__dirname, "../output/output.pdf"),
    pdfBytesModified
  );

  console.log("✅ PDF Generated!");
}

render();