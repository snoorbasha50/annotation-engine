# Annotation Specification

## Overview

The annotation specification is a configuration-driven data structure that describes how structured taxpayer data should be mapped and rendered onto an IRS tax form.

Instead of hardcoding PDF coordinates, field mappings, and formatting rules inside application code, all rendering metadata is defined in a reusable JSON specification.

This specification acts as a contract between structured taxpayer data and the PDF rendering engine.

Using this approach, the rendering engine remains generic and reusable. Supporting a new tax form or a new IRS tax year only requires updating the annotation specification instead of modifying application logic.

---

# Design Goals

The annotation specification was designed with the following goals:

- Keep rendering logic independent of tax forms.
- Support multiple IRS forms and tax years.
- Handle deeply nested taxpayer data.
- Keep field positions configurable.
- Make formatting configurable.
- Support conditional rendering.
- Keep the rendering engine reusable and maintainable.

---

# Overall Schema Structure

The annotation specification consists of the following sections:

```
Annotation Specification

├── schemaVersion
├── form
├── defaults
└── fields[]
```

Each field inside `fields` represents a printable field on the PDF.

---

# Schema Components

## 1. schemaVersion

Identifies the version of the annotation specification.

Purpose:

- Future compatibility
- Backward compatibility
- Schema evolution

Example

```json
{
  "schemaVersion": "1.0"
}
```

---

## 2. form

Identifies which IRS form this annotation belongs to.

Example

```json
{
  "form": {
    "formId": "1040",
    "taxYear": "2025",
    "pageCount": 2
  }
}
```

Purpose

- Supports multiple IRS forms
- Supports yearly IRS changes
- Prevents mixing annotations from different forms

---

## 3. defaults

Stores common rendering configuration shared by all fields.

Example

```json
{
  "defaults": {
    "font": {
      "family": "Helvetica",
      "size": 10,
      "color": "#000000"
    },
    "unit": "pt"
  }
}
```

Purpose

Avoid repeating the same configuration for every field.

---

## 4. fields

The fields array is the core of the annotation specification.

Each object represents a single printable field on the PDF.

Example

```json
{
    "id": "taxpayer_first_name",
    ...
}
```

---

# Field Structure

Each field contains the following properties.

## id

Unique identifier of the field.

Example

```
taxpayer_first_name
```

Used for

- Debugging
- Logging
- Traceability

---

## label

Human readable description.

Example

```
Taxpayer First Name
```

Used for documentation and debugging.

---

## position

Specifies where the value should be printed.

```json
"position": {
    "page": 1,
    "x": 120,
    "y": 685,
    "width": 120,
    "height": 18
}
```

Description

| Property | Description |
|----------|-------------|
| page | PDF page number |
| x | Horizontal position |
| y | Vertical position |
| width | Field width |
| height | Field height |

The renderer uses these coordinates to position text on the PDF.

---

## binding

Defines which value should be rendered.

Example

```json
"binding": {
    "dataRef":"$.taxpayer.firstName"
}
```

The resolver evaluates the data reference and returns the required value.

Example

```
$.taxpayer.firstName

↓

John
```

---

## style

Defines rendering style.

Example

```json
"style":{
    "alignment":"left"
}
```

Future versions may include

- Font
- Font size
- Text color
- Rotation
- Opacity

---

## format

Defines how a value should be formatted before rendering.

Example

```json
"format":{
    "type":"currency"
}
```

Supported types

- text
- currency
- date
- ssn

Example

```
85000

↓

85,000.00
```

---

## behavior

Defines conditional rendering rules.

Example

```json
"behavior":{
    "printIf":"value != null"
}
```

Purpose

Avoid printing empty values.

Example

If no dependent exists

↓

Do not render the dependent section.

---

# Example Annotation

```json
{
  "id": "taxpayer_first_name",
  "label": "Taxpayer First Name",

  "position": {
    "page": 1,
    "x": 120,
    "y": 685,
    "width": 120,
    "height": 18
  },

  "binding": {
    "dataRef": "$.taxpayer.firstName"
  },

  "style": {
    "alignment": "left"
  },

  "format": {
    "type": "text"
  },

  "behavior": {
    "printIf": "value != null"
  }
}
```

---

# Processing Flow

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

PDF Renderer

        │

        ▼

Generated PDF
```

The renderer does not contain any hardcoded field positions. It simply reads the annotation specification, resolves the required value, formats it, and renders it at the configured location.

---

# Benefits

This approach provides several advantages:

- Configuration-driven design
- Reusable rendering engine
- Easy maintenance
- Support for multiple IRS forms
- Support for future tax years
- Separation of concerns
- Minimal code changes when forms change




# Assumptions

The following assumptions were made while designing the annotation specification.

1. One annotation specification corresponds to one IRS form and one tax year.

2. PDF coordinates are measured in PDF points.

3. Coordinates are identified once during annotation creation and reused for all taxpayers.

4. Taxpayer data is available as structured JSON.

5. The renderer is responsible only for drawing values onto the PDF.

6. The resolver is responsible only for resolving values from taxpayer data.

7. The formatter is responsible only for formatting values before rendering.

8. All field positions are configurable through the annotation specification instead of being hardcoded in application code.

9. A field may be conditionally rendered using the behavior section.



# Complete Annotation Schema

{
  "schemaVersion": "1.0",

  "form": {
    "formId": "1040",
    "taxYear": "2025",
    "pageCount": 2
  },

  "defaults": {
    "font": {
      "family": "Helvetica",
      "size": 10,
      "color": "#000000"
    },
    "unit": "pt"
  },

  "fields": [
    {
      "id": "taxpayer_first_name",

      "label": "Taxpayer First Name",

      "position": {
        "page": 1,
        "x": 120,
        "y": 685,
        "width": 120,
        "height": 18
      },

      "binding": {
        "dataRef": "$.taxpayer.firstName"
      },

      "style": {
        "alignment": "left"
      },

      "format": {
        "type": "text"
      },

      "behavior": {
        "printIf": "value != null"
      }
    },

    {
      "id": "taxpayer_last_name",

      "label": "Taxpayer Last Name",

      "position": {
        "page": 1,
        "x": 250,
        "y": 685,
        "width": 120,
        "height": 18
      },

      "binding": {
        "dataRef": "$.taxpayer.lastName"
      },

      "style": {
        "alignment": "left"
      },

      "format": {
        "type": "text"
      },

      "behavior": {
        "printIf": "value != null"
      }
    },

    {
      "id": "taxpayer_ssn",

      "label": "Social Security Number",

      "position": {
        "page": 1,
        "x": 470,
        "y": 685,
        "width": 100,
        "height": 18
      },

      "binding": {
        "dataRef": "$.taxpayer.ssn"
      },

      "style": {
        "alignment": "left"
      },

      "format": {
        "type": "ssn"
      },

      "behavior": {
        "printIf": "value != null"
      }
    },

    {
      "id": "street_address",

      "label": "Street Address",

      "position": {
        "page": 1,
        "x": 120,
        "y": 640,
        "width": 250,
        "height": 18
      },

      "binding": {
        "dataRef": "$.taxpayer.address.street"
      },

      "style": {
        "alignment": "left"
      },

      "format": {
        "type": "text"
      },

      "behavior": {
        "printIf": "value != null"
      }
    },

    {
      "id": "city",

      "label": "City",

      "position": {
        "page": 1,
        "x": 120,
        "y": 620,
        "width": 120,
        "height": 18
      },

      "binding": {
        "dataRef": "$.taxpayer.address.city"
      },

      "style": {
        "alignment": "left"
      },

      "format": {
        "type": "text"
      },

      "behavior": {
        "printIf": "value != null"
      }
    },

    {
      "id": "state",

      "label": "State",

      "position": {
        "page": 1,
        "x": 260,
        "y": 620,
        "width": 40,
        "height": 18
      },

      "binding": {
        "dataRef": "$.taxpayer.address.state"
      },

      "style": {
        "alignment": "center"
      },

      "format": {
        "type": "text"
      },

      "behavior": {
        "printIf": "value != null"
      }
    },

    {
      "id": "zip_code",

      "label": "ZIP Code",

      "position": {
        "page": 1,
        "x": 320,
        "y": 620,
        "width": 70,
        "height": 18
      },

      "binding": {
        "dataRef": "$.taxpayer.address.zip"
      },

      "style": {
        "alignment": "center"
      },

      "format": {
        "type": "text"
      },

      "behavior": {
        "printIf": "value != null"
      }
    },

    {
      "id": "total_wages",

      "label": "Total Wages",

      "position": {
        "page": 1,
        "x": 560,
        "y": 270,
        "width": 90,
        "height": 18
      },

      "binding": {
        "dataRef": "$.income.w2Forms[0].wages"
      },

      "style": {
        "alignment": "right"
      },

      "format": {
        "type": "currency"
      },

      "behavior": {
        "printIf": "value > 0"
      }
    },

    {
      "id": "interest_income",

      "label": "Interest Income",

      "position": {
        "page": 1,
        "x": 560,
        "y": 178,
        "width": 90,
        "height": 18
      },

      "binding": {
        "dataRef": "$.income.interest[0].amount"
      },

      "style": {
        "alignment": "right"
      },

      "format": {
        "type": "currency"
      },

      "behavior": {
        "printIf": "value > 0"
      }
    },

    {
      "id": "dependent_1_name",

      "label": "Dependent 1 Name",

      "position": {
        "page": 1,
        "x": 150,
        "y": 470,
        "width": 180,
        "height": 18
      },

      "binding": {
        "dataRef": "$.dependents[0].firstName"
      },

      "style": {
        "alignment": "left"
      },

      "format": {
        "type": "text"
      },

      "behavior": {
        "printIf": "value != null"
      }
    }
  ]
}




# Schema Explanation

## schemaVersion

**Purpose**

Identifies the version of the annotation specification.

**Why do we need it?**

Versioning helps maintain compatibility as the specification evolves. New fields or features can be added without affecting older versions.

**Example**

```json
"schemaVersion": "1.0"
```

---

## form

**Purpose**

Contains information about the tax form for which the annotation is created.

**Why do we need it?**

The same rendering engine should support different IRS forms and tax years. This information ensures the correct annotation is used for the correct form.

**Example**

```json
"form": {
    "formId": "1040",
    "taxYear": "2025",
    "pageCount": 2
}
```

---

## defaults

**Purpose**

Defines common rendering settings shared by all fields.

**Why do we need it?**

Instead of repeating the same font, font size, color, and unit for every field, they are defined once and reused throughout the specification.

**Example**

```json
"defaults": {
    "font": {
        "family": "Helvetica",
        "size": 10,
        "color": "#000000"
    },
    "unit": "pt"
}
```

---

## fields

**Purpose**

The `fields` array contains all printable fields defined for the form.

Each object inside this array represents one field that can be rendered on the PDF.

---

## id

**Purpose**

Provides a unique identifier for the field.

**Why do we need it?**

It helps uniquely identify a field during debugging, logging, testing, and maintenance.

**Example**

```json
"id": "taxpayer_first_name"
```

---

## label

**Purpose**

Provides a human-readable name for the field.

**Why do we need it?**

Labels improve readability and make the annotation easier to understand during development and debugging.

**Example**

```json
"label": "Taxpayer First Name"
```

---

## position

**Purpose**

Defines where the value should be printed on the PDF.

**Why do we need it?**

The renderer uses this information to place the text at the correct location on the correct page.

**Example**

```json
"position": {
    "page": 1,
    "x": 120,
    "y": 685,
    "width": 120,
    "height": 18
}
```

| Property | Description |
|----------|-------------|
| page | PDF page number |
| x | Horizontal position |
| y | Vertical position |
| width | Width of the field |
| height | Height of the field |

---

## binding

**Purpose**

Defines where the field value should be retrieved from.

**Why do we need it?**

Instead of hardcoding values, the annotation stores a data reference. The resolver reads this path and fetches the required value from the taxpayer JSON.

**Example**

```json
"binding": {
    "dataRef": "$.taxpayer.firstName"
}
```

Example Flow

```
$.taxpayer.firstName

↓

Resolver

↓

John
```

---

## style

**Purpose**

Defines how the value should appear on the PDF.

**Why do we need it?**

Different fields may require different alignments or styling. Keeping styling information inside the annotation makes the renderer generic and configurable.

**Example**

```json
"style": {
    "alignment": "left"
}
```

Future versions may also support:

- Font family
- Font size
- Text color
- Rotation
- Opacity

---

## format

**Purpose**

Defines how the value should be formatted before rendering.

**Why do we need it?**

The stored value may not always match the format required by the PDF. The formatter converts it into the desired representation before rendering.

Supported formats:

- text
- currency
- date
- ssn

**Example**

```
85000

↓

85,000.00
```

---

## behavior

**Purpose**

Defines conditions that determine whether a field should be rendered.

**Why do we need it?**

Some fields should only be printed when data is available. This avoids rendering empty or unnecessary values.

**Example**

```json
"behavior": {
    "printIf": "value != null"
}
```

Example

If a taxpayer has no dependents, dependent fields will not be rendered.





# Example Data Mapping

The following example demonstrates how a single field is processed from the taxpayer data to the final PDF.

## Step 1: Taxpayer Data

```json
{
  "taxpayer": {
    "firstName": "John"
  }
}
```

## Step 2: Annotation

```json
{
  "id": "taxpayer_first_name",

  "binding": {
    "dataRef": "$.taxpayer.firstName"
  },

  "position": {
    "page": 1,
    "x": 120,
    "y": 685
  },

  "format": {
    "type": "text"
  }
}
```

## Step 3: Resolver

The resolver evaluates the data reference.

```
$.taxpayer.firstName

↓

John
```

## Step 4: Formatter

The formatter prepares the value before rendering.

```
John

↓

John
```

## Step 5: Renderer

The renderer reads the coordinates from the annotation and places the formatted value on the PDF.

```
Page : 1
X    : 120
Y    : 685
```

## Step 6: Output

The final PDF contains

```
First Name

John
```

This example demonstrates how the annotation specification connects structured taxpayer data with a specific location on the PDF.





# Annotation Processing Flow

The annotation engine follows the workflow below.

```
            Taxpayer JSON
                   │
                   ▼
      Annotation Specification
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

## Workflow

1. Load taxpayer data.
2. Load the annotation specification.
3. Read each field from the annotation.
4. Resolve the required value using the configured `dataRef`.
5. Format the resolved value.
6. Pass the formatted value and position to the renderer.
7. Render the value on the PDF.
8. Save the generated PDF.




# Benefits

The annotation specification provides several advantages.

- Configuration-driven design with no hardcoded field positions.
- Easy to support new IRS forms by creating a new annotation file.
- Supports different tax years without changing application code.
- Separation of concerns between data extraction, formatting, and rendering.
- Reusable rendering engine for multiple forms.
- Easy to maintain and extend.
- Supports deeply nested taxpayer data.
- Simplifies future feature development.




# Current Scope

This implementation focuses on demonstrating a configurable annotation engine capable of rendering taxpayer information onto an IRS tax form.

The current implementation includes:

- JSON-based annotation specification
- Nested data resolution
- Field formatting
- PDF rendering
- Configuration-driven field mapping

The following capabilities are outside the scope of this implementation:

- Aggregation across multiple records (for example, summing multiple W-2 wages)
- Automatic coordinate detection
- Dynamic font fitting
- Checkbox and radio button rendering
- Image and signature rendering
- Automatic validation of annotations




# Future Enhancements

The current architecture is designed to be easily extensible. Future improvements may include:

- Visual annotation editor for selecting field positions directly on a PDF.
- Full JSONPath support including wildcard and filter expressions.
- Aggregation functions such as `sum()`, `count()`, and `average()`.
- Automatic font scaling based on available field width.
- Support for checkboxes, radio buttons, and images.
- Annotation validation before rendering.
- OCR-assisted coordinate extraction.
- Support for multiple annotation versions for different tax years.
- Support for additional PDF form types beyond IRS tax forms.




# Design Philosophy

The primary goal of this project was to separate form-specific configuration from rendering logic.

Instead of embedding coordinates, formatting rules, and data mappings directly into application code, all field metadata is stored in a reusable annotation specification.

This allows the rendering engine to remain generic while supporting different IRS forms and tax years through configuration changes alone.

The design emphasizes maintainability, reusability, and extensibility, making it easier to support future forms with minimal code changes.