# Ownabee Landing Page - Final Color Palette & Typography

## Color Palette

### Primary Colors
- **Primary**: `#FF6F61` (Coral Red) - A bright, playful coral that appeals to children while maintaining a professional look. Used for primary buttons, important accents, and key highlights.
- **Secondary**: `#4C72B0` (Royal Blue) - A trustworthy, calm blue that balances the energy of the primary color. Used for secondary buttons, links, and supporting elements.
- **Accent**: `#FFE082` (Soft Yellow) - A warm, friendly yellow that adds vibrancy without overwhelming. Used sparingly for highlighting important elements and creating visual interest.

### Neutral Colors
- **White**: `#FFFFFF` - Primary background color for content sections.
- **Light Gray**: `#F5F7FA` - Secondary background color for alternating sections.
- **Dark Gray**: `#333333` - Primary text color for optimal readability.
- **Medium Gray**: `#6B7280` - Secondary text color for less important content.

### Semantic Colors
- **Success**: `#34D399` (Mint Green) - For success messages and positive indicators.
- **Warning**: `#FBBF24` (Amber) - For warning messages and cautionary indicators.
- **Error**: `#EF4444` (Red) - For error messages and critical alerts.
- **Info**: `#60A5FA` (Light Blue) - For informational messages and hints.

### Color Usage Guidelines
- Maintain sufficient contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text) for accessibility.
- Use the primary color for main CTAs and important interactive elements.
- Use the secondary color for supporting elements and secondary CTAs.
- Use the accent color sparingly to highlight important information or create visual interest.
- Use neutral colors for backgrounds and text to ensure readability.
- Use semantic colors consistently to communicate status and feedback.

## Typography

### Font Families
- **Heading Font**: "Nunito Sans" - A friendly, rounded sans-serif font that is playful yet professional.
  - Fallbacks: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  - Weights: 700 (Bold), 800 (Extra Bold) for headings

- **Body Font**: "Lato" - A clean, highly readable sans-serif font that pairs well with Nunito Sans.
  - Fallbacks: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  - Weights: 400 (Regular), 500 (Medium), 700 (Bold) for emphasis

### Font Sizes
- **Hero Headline**: 3rem (48px) on desktop, 2.25rem (36px) on mobile
- **Section Headlines**: 2.25rem (36px) on desktop, 1.875rem (30px) on mobile
- **Subheadings**: 1.5rem (24px) on desktop, 1.25rem (20px) on mobile
- **Body Text**: 1rem (16px) standard
- **Small Text/Captions**: 0.875rem (14px)
- **Micro Text**: 0.75rem (12px) for legal text and fine print

### Line Heights
- **Headings**: 1.2 (tighter for headlines)
- **Body Text**: 1.5 (comfortable for reading)
- **Small Text**: 1.4 (slightly tighter for small text)

### Font Weight Usage
- **Headlines**: 800 (Extra Bold) for main headlines, 700 (Bold) for section headlines
- **Subheadings**: 700 (Bold)
- **Body Text**: 400 (Regular)
- **Emphasis**: 700 (Bold) or 500 (Medium) for emphasis within body text
- **Buttons/CTAs**: 700 (Bold)

### Typography Guidelines
- Maintain a clear hierarchy with consistent use of sizes and weights.
- Ensure sufficient contrast between text and background colors.
- Use appropriate line heights and letter spacing for optimal readability.
- Limit the number of font styles and weights used to maintain consistency.
- Ensure text remains readable at all screen sizes with appropriate scaling.

## Implementation in Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FF6F61',
        secondary: '#4C72B0',
        accent: '#FFE082',
        'text-primary': '#333333',
        'text-secondary': '#6B7280',
        'bg-light': '#F5F7FA',
        success: '#34D399',
        warning: '#FBBF24',
        error: '#EF4444',
        info: '#60A5FA',
      },
      fontFamily: {
        heading: ['"Nunito Sans"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['Lato', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
};
```

## Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=Nunito+Sans:wght@700;800&display=swap" rel="stylesheet">
```

## CSS Variables (for non-Tailwind usage)

```css
:root {
  /* Colors */
  --color-primary: #FF6F61;
  --color-secondary: #4C72B0;
  --color-accent: #FFE082;
  --color-text-primary: #333333;
  --color-text-secondary: #6B7280;
  --color-bg-light: #F5F7FA;
  --color-success: #34D399;
  --color-warning: #FBBF24;
  --color-error: #EF4444;
  --color-info: #60A5FA;
  
  /* Typography */
  --font-heading: 'Nunito Sans', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Lato', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
}
```

This color palette and typography selection aims to create a bright, playful, yet professional appearance that appeals to both children and parents, aligning with the "American kids-ed" aesthetic inspired by GetEpic.com while maintaining its own unique identity.
