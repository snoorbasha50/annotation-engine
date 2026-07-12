const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const { processAnnotations } = require("./annotationEngine");

async function renderPDF() {

    // Load original PDF
    const pdfBytes = fs.readFileSync(
        path.join(__dirname, "../forms/f1040.pdf")
    );

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();


    // Load processed annotations
    const annotations = processAnnotations();

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Loop through every annotation
    for (const field of annotations) {
      console.log(
  field.id,
  field.position.page,
  field.position.x,
  field.position.y,
  field.formattedValue
);

        const page = pages[field.position.page - 1];
        console.log(page.getWidth());
console.log(page.getHeight());

        const fontSize =
    field.format.type === "currency" ? 8 : 10;

        page.drawText(field.formattedValue, {

            x: field.position.x,

            y: field.position.y,

            size: fontSize || field.style.fontSize || schema.defaults.font.size,

            font,

            color: rgb(0, 0, 0)

        });

    }

    const pdfBytesOut = await pdfDoc.save();

    fs.writeFileSync(
        path.join(__dirname, "../output/output.pdf"),
        pdfBytesOut
    );

    console.log("PDF Generated Successfully!");
}

renderPDF();