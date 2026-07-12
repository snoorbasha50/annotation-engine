# Architecture

## Overview

The annotation engine is designed as a modular pipeline where each component has a single responsibility.

Instead of tightly coupling data extraction, formatting, and rendering, the solution separates each responsibility into an independent module. This makes the system easier to maintain, test, and extend.

---

# High-Level Architecture

```
                Taxpayer JSON
                      │
                      ▼
            Annotation Specification
                      │
                      ▼
                  Resolver
                      │
                      ▼
                 Formatter
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

# Component Overview

## 1. Taxpayer JSON

Contains structured taxpayer information such as:

- Personal Information
- Income
- Deductions
- Dependents
- Bank Details

This acts as the input data source.

---

## 2. Annotation Specification

Contains metadata required to render each field.

Each annotation defines:

- Position
- Data Reference
- Formatting
- Style
- Rendering Behavior

The renderer does not contain any hardcoded field positions.

---

## 3. Resolver

The resolver receives a JSONPath-like expression from the annotation and retrieves the corresponding value from the taxpayer JSON.

Example

```
$.taxpayer.firstName

↓

John
```

---

## 4. Formatter

Formats the resolved value before rendering.

Examples

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

---

## 5. Annotation Engine

Acts as the orchestrator of the entire workflow.

Responsibilities

- Load taxpayer data
- Load annotation specification
- Resolve values
- Format values
- Prepare rendering metadata

The annotation engine produces a list of printable fields that is passed to the renderer.

---

## 6. PDF Renderer

The renderer receives the processed annotations and draws each formatted value at the configured coordinates on the PDF.

The renderer is independent of taxpayer data and business logic.

Its responsibility is only to render text onto the PDF.

---

# End-to-End Flow

```
Taxpayer JSON

↓

Resolver

↓

Raw Value

↓

Formatter

↓

Formatted Value

↓

Renderer

↓

PDF
```

---

# Benefits

This architecture provides several advantages:

- Separation of concerns
- Easy maintenance
- Reusable rendering engine
- Better testability
- Easy support for new IRS forms
- Minimal code changes when forms change