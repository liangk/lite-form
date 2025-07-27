# Lite Form Project Documentation

## Overview
Lite Form is an Angular library for building lightweight, customizable form components. It includes reusable input and textarea components, a style guide, and a UI sandbox application for testing and demonstration.

---

## Project Structure

- `projects/lite-form/` — The Angular library source code
  - `src/lib/` — Library components and styles
    - `lite-input/` — Input component
    - `lite-textarea/` — Textarea component
    - `lite-styles.scss` — Shared SCSS styles
    - `field-dto.ts` — Data transfer object for form fields
    - `lite-form.module.ts` — Library module
  - `public-api.ts` — Library exports
- `projects/ui-sandbox/` — Standalone Angular app for demo/testing
  - `src/app/` — App source code
    - `app.html` — Demo page for components
    - `app.ts` — App logic
    - `app.scss` — App styles
- `docs/STYLEGUIDE.md` — SCSS style guide for consistent styling

---

## Usage

### 1. Building the Library
Run:
```sh
ng build lite-form
```

### 2. Using Components in Your App
Import `LiteFormModule` in your standalone component or NgModule:
```typescript
import { LiteFormModule } from 'lite-form';
```

Use the components in your template:
```html
<lite-input [control]="inputDemo"></lite-input>
<lite-textarea [control]="textareaDemo"></lite-textarea>
```

### 3. UI Sandbox
The `ui-sandbox` app demonstrates and tests all library components. Edit `app.html` and `app.ts` to add new demos.

---

## SCSS Style Guide
See [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md) for conventions on writing compact, maintainable SCSS.

---

## Contributing
- Follow the SCSS style guide for all styles.
- Use clear, descriptive names for variables and components.
- Document new components and features in this file.

---

## License
This project is licensed under the MIT License.
