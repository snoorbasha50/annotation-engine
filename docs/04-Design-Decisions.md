# Design Decisions

## Overview

The objective of this project was not only to render values on a PDF but also to design a reusable annotation specification that can support different IRS forms with minimal changes.

The following design decisions were made during the implementation.

---

# 1. Why JSON?

The annotation specification is represented using JSON because it is lightweight, human-readable, and widely supported across modern programming languages.

Using JSON also makes it easy to store, edit, version, and exchange annotation definitions.

---

# 2. Why Configuration Instead of Hardcoding?

Instead of embedding coordinates and rendering logic directly inside the application, all field information is stored inside the annotation specification.

Benefits:

- Easier maintenance
- Supports multiple IRS forms
- Supports future tax years
- No code changes required when field positions change

Only the annotation needs to be updated.

---

# 3. Why Separate Annotation from Renderer?

The renderer should only be responsible for drawing values onto a PDF.

It should not know:

- Which value to print
- Where the value comes from
- How the value should be formatted

Keeping the renderer generic makes it reusable for any supported form.

---

# 4. Why dataRef?

Taxpayer data is deeply nested and often contains multiple objects and arrays.

Using a JSONPath-inspired `dataRef` allows each field to reference its required value without hardcoding any business logic.

Example

```
$.taxpayer.firstName

↓

John
```

This makes the annotation independent from the rendering implementation.

---

# 5. Why a Separate Resolver?

The resolver has only one responsibility: retrieve data from the taxpayer JSON.

Separating this logic keeps the annotation engine simple and makes the resolver independently testable.

---

# 6. Why a Separate Formatter?

Values stored in the taxpayer data are not always in the format expected by the PDF.

For example:

```
85000

↓

85,000.00
```

or

```
1988-05-12

↓

05/12/1988
```

Keeping formatting separate allows rendering logic to remain simple.

---

# 7. Why Position Information?

Each annotation stores:

- Page
- X coordinate
- Y coordinate
- Width
- Height

This allows the renderer to position values accurately on the PDF.

Keeping positioning inside the annotation means different forms can reuse the same rendering engine.

---

# 8. Why Modular Architecture?

The solution is divided into independent modules.

- Resolver
- Formatter
- Annotation Engine
- Renderer

Each module has a single responsibility.

This improves:

- Maintainability
- Testability
- Readability
- Extensibility

---

# 9. Why Version the Specification?

IRS tax forms change every year.

Adding a schema version and tax year allows different versions of the same form to coexist without affecting previous annotations.

---

# 10. Trade-offs

To keep the implementation focused on the assessment, a few design trade-offs were made.

Current implementation:

- Coordinates are manually defined.
- Direct field mapping is supported.
- Basic formatting types are implemented.

These decisions keep the implementation simple while demonstrating the overall architecture.

Future versions can support more advanced capabilities without changing the overall design.