# Typography System

This project uses a consistent typography system based on the Inter font family to ensure visual consistency across all components.

## Font Family

- **Primary Font**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif
- **Features**: OpenType features enabled for better readability

## Usage

### 1. Import Typography Utilities

```javascript
import { getTypographyClass, typography } from '../utils/typography';
```

### 2. Available Typography Classes

#### Headings

- `h1` - text-4xl font-semibold tracking-tight
- `h2` - text-3xl font-semibold tracking-tight
- `h3` - text-2xl font-semibold tracking-tight
- `h4` - text-xl font-semibold tracking-tight
- `h5` - text-lg font-semibold tracking-tight
- `h6` - text-base font-semibold tracking-tight

#### Body Text

- `body` - text-base font-normal leading-relaxed
- `bodyLarge` - text-lg font-normal leading-relaxed
- `bodySmall` - text-sm font-normal leading-relaxed

#### Captions and Labels

- `caption` - text-sm font-normal text-gray-600
- `label` - text-sm font-medium text-gray-700

#### Buttons

- `button` - text-sm font-medium
- `buttonLarge` - text-base font-medium

#### Input Fields

- `input` - text-base font-normal
- `inputSmall` - text-sm font-normal

#### Navigation

- `nav` - text-sm font-medium
- `navLarge` - text-base font-medium

### 3. Usage Examples

```jsx
// Using typography classes
<h1 className={getTypographyClass('h1')}>Page Title</h1>
<p className={getTypographyClass('body')}>Body text content</p>
<label className={getTypographyClass('label')}>Form Label</label>
<button className={getTypographyClass('button')}>Click me</button>

// Combining classes
<div className={`${getTypographyClass('body')} text-center`}>
  Centered body text
</div>
```

### 4. Global CSS Classes

The following utility classes are also available globally:

- `.text-heading` - font-semibold tracking-tight
- `.text-body` - font-normal leading-relaxed
- `.text-caption` - font-normal text-sm
- `.text-button` - font-medium

### 5. Font Weights

- 300 (light)
- 400 (normal)
- 500 (medium)
- 600 (semibold)
- 700 (bold)

### 6. Best Practices

1. **Always use typography classes** instead of hardcoding font styles
2. **Use semantic class names** (h1, h2, body, etc.) rather than size-based names
3. **Maintain hierarchy** - use appropriate heading levels
4. **Be consistent** - use the same typography class for similar elements
5. **Consider accessibility** - ensure sufficient contrast and readable font sizes

### 7. Responsive Typography

For responsive typography, combine typography classes with Tailwind's responsive prefixes:

```jsx
<h1 className={`${getTypographyClass('h2')} md:${getTypographyClass('h1')}`}>
  Responsive Heading
</h1>
```

## Implementation

The typography system is implemented through:

1. **Tailwind Config** (`tailwind.config.js`) - Font family definitions
2. **Global CSS** (`src/index.css`) - Base typography styles
3. **Typography Utilities** (`src/utils/typography.js`) - Helper functions and classes
4. **Component Usage** - Consistent application across all components

This ensures that all text elements across the application use the same font family, weights, and sizing conventions.
