# Lite Form SCSS Space-Saving Style Guide

## 1. Combine Related Properties
Group related CSS properties on a single line when possible:
```scss
.class { display: flex; flex-direction: column; margin-bottom: 12px; }
```

## 2. Nest Selectors Compactly
Use single-line nesting for short rules:
```scss
.class {
  .state { input { border: 1px solid #ccc; border-radius: 4px; padding: 8px; font-size: 14px; outline: none; } }
}
```

## 3. Use Minimal Indentation
Keep nesting shallow and avoid unnecessary whitespace.

## 4. Prefer Shorthand Properties
Use shorthand for border, padding, margin, etc.:
```scss
input { border: 1px solid #ccc; padding: 8px; }
```

## 5. Omit Optional Syntax
Omit units for zero values and use concise color codes:
```scss
margin: 0;
background: #f9f9f9;
```

## 6. Keep Selectors Short
Use short, meaningful class and state names.

---

**Example:**
```scss
.component { display: flex; flex-direction: column; margin-bottom: 12px;
  .edit { input { border: 1px solid #ccc; border-radius: 4px; padding: 8px; font-size: 14px; outline: none; } }
  .view { display: flex; flex-direction: column;
    label { font-weight: bold; margin-bottom: 4px; }
    .value { padding: 8px; border: 1px solid #eee; border-radius: 4px; background: #f9f9f9; }
  }
}
```

---

**Follow these guidelines for compact, readable, and maintainable SCSS.**
