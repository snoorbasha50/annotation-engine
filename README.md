# Instead Annotation Engine

A configurable annotation engine that maps structured taxpayer data to IRS tax forms using a JSON-based annotation specification and renders values onto PDF documents.

---

## Problem Statement

Tax software stores taxpayer information in structured JSON. IRS tax forms, however, are fixed PDF templates containing hundreds of predefined fields.

The goal of this project is to design a reusable annotation specification that allows an application to:

- Read taxpayer data
- Resolve values from deeply nested JSON
- Format values correctly
- Render them at predefined coordinates on an IRS PDF form

Instead of hardcoding coordinates inside application code, all field metadata is stored in an annotation schema.

---

## Features

- JSON-based annotation specification
- Supports nested JSON data using JSONPath-like references
- Modular architecture
- PDF rendering using pdf-lib
- Field formatting (Text, Currency, Date, SSN)
- Supports multiple pages
- Easy to extend for new IRS forms

---

## Project Structure

```
instead-annotation-spec/

├── annotation/
│   └── annotation-schema.json

├── forms/
│   └── f1040.pdf

├── output/
│   └── output.pdf

├── sample-data/
│   └── taxpayer.json

├── src/
│   ├── resolver.js
│   ├── formatter.js
│   ├── annotationEngine.js
│   └── renderer.js

├── tests/
│   ├── testResolver.js
│   ├── testFormatter.js
│   └── testAnnotationEngine.js

├── package.json
└── README.md
```

---

## Architecture

```
                  Taxpayer JSON
                        │
                        ▼
              Annotation Schema
                        │
                        ▼
                  Resolver Module
                        │
                        ▼
                 Formatter Module
                        │
                        ▼
               Annotation Engine
                        │
                        ▼
                  PDF Renderer
                        │
                        ▼
                 Generated PDF
```

---

## Annotation Schema

Each field in the annotation schema contains:

- Field identifier
- PDF page
- Coordinates (x, y)
- Width & height
- Data binding
- Formatting rules
- Rendering behavior

Example:

```json
{
  "id": "taxpayer_first_name",
  "position": {
    "page": 1,
    "x": 120,
    "y": 685
  },
  "binding": {
    "dataRef": "$.taxpayer.firstName"
  },
  "format": {
    "type": "text"
  }
}
```

---

## How It Works

### 1. Taxpayer Data

```
taxpayer.json
```

Contains structured taxpayer information.

↓

### 2. Resolver

Uses the `dataRef` field to retrieve values from nested JSON.

Example:

```
$.taxpayer.firstName
```

↓

Returns

```
John
```

↓

### 3. Formatter

Formats values before rendering.

Examples:

```
85000
↓

85,000.00
```

```
1988-05-12

↓

05/12/1988
```

↓

### 4. Renderer

Uses the annotation coordinates to place values on the PDF.

---

## Run

Install dependencies

```bash
npm install
```

Generate the annotated PDF

```bash
npm start
```

Output

```
output/output.pdf
```

---

## Technologies Used

- Node.js
- JavaScript
- pdf-lib

---

## Design Decisions

- Configuration-driven architecture
- Separation of concerns
- JSON-based annotation specification
- JSONPath-inspired data references
- Reusable rendering pipeline
- Versioned annotation schema

---

## Future Enhancements

- Visual annotation editor
- Full JSONPath support
- Aggregation functions (sum, count)
- Automatic font scaling
- Checkbox support
- Image/signature support
- Annotation validation
- Multiple form support

---

## Author

**Noorbasha Shaik**

Instead Technical Assessment Submission