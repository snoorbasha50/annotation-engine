# Problem Understanding

## Background

Instead is building a platform that helps taxpayers and tax professionals prepare and manage U.S. tax returns. Taxpayer information such as personal details, income, deductions, and dependents is typically stored as structured data in databases or JSON documents.

However, the IRS requires tax returns to be submitted using predefined PDF forms such as Form 1040. These forms contain hundreds of fields positioned at fixed locations across multiple pages.

## Problem

The challenge is to accurately transfer values from structured taxpayer data into the correct fields on an IRS tax form.

Hardcoding field positions directly into application code is difficult to maintain because:

- IRS forms change every tax year.
- Different forms have different layouts.
- A single application must support multiple forms and versions.
- Taxpayer data is deeply nested and often contains arrays (multiple W-2s, dependents, bank accounts, etc.).

Updating application code every time a form changes would make the system difficult to maintain and extend.

## Objective

The objective of this project is to design a reusable annotation specification that acts as a contract between taxpayer data and a PDF rendering engine.

Instead of embedding coordinates and rendering logic in the application, all field-related information is stored in a configuration-driven annotation schema.

The annotation specification defines:

- Where a field exists on the PDF.
- Which value should be printed.
- How the value should be formatted.
- When the value should be printed.

Using this approach, supporting a new IRS form or a new tax year only requires creating or updating an annotation specification, while the rendering engine remains unchanged.

This design makes the system reusable, scalable, and easy to maintain.