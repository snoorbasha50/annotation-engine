# Future Enhancements

The current implementation demonstrates the core annotation engine and rendering pipeline. The architecture is intentionally designed to support future enhancements without significant changes to the rendering engine.

## 1. Visual Annotation Editor

Develop a web-based editor that allows users to upload a PDF, click on fields, and automatically generate annotation coordinates. This removes the need to manually edit the annotation specification.

---

## 2. Automatic Coordinate Detection

Use OCR or computer vision techniques to identify printable fields and generate annotation metadata automatically.

---

## 3. Full JSONPath Support

Extend the resolver to support wildcard expressions, filters, and advanced JSONPath features for more flexible data mapping.

---

## 4. Aggregation Functions

Support functions such as `sum()`, `count()`, and `average()` to populate fields that require aggregated values from multiple records.

---

## 5. Automatic Font Scaling

Automatically adjust the font size when a value exceeds the available field width to prevent text overflow.

---

## 6. Checkbox and Radio Button Support

Extend the renderer to support non-text elements such as checkboxes and radio buttons commonly found in IRS forms.

---

## 7. Image and Signature Rendering

Support rendering images such as signatures, company logos, QR codes, and barcodes.

---

## 8. Annotation Validation

Validate annotation files before rendering by checking coordinates, page numbers, supported format types, and data references.

---

## 9. Support for Multiple IRS Forms

Reuse the same rendering engine to support additional IRS forms such as Schedule A, Schedule C, W-2, and 1099 by creating new annotation specifications.

---

## 10. Annotation Versioning

Support multiple versions of annotation specifications to accommodate yearly IRS form changes while maintaining backward compatibility.