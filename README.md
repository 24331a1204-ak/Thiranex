# HTML5 Semantic & Accessible Portfolio Website

A fully semantic, accessibility-first portfolio website built with modern HTML5 standards and WCAG 2.1 compliance.

## 📋 Features

### ✅ Semantic HTML5
- Proper use of semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`
- Correct heading hierarchy (h1-h6)
- Meaningful link text
- Proper form structure

### ♿ Accessibility (WCAG 2.1 AA)
- **ARIA Labels & Roles**: Comprehensive ARIA attributes for screen readers
- **Skip Links**: Skip to main content for keyboard users
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Color Contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Focus Management**: Visible focus indicators on all interactive elements
- **Live Regions**: Dynamic content announcements for screen readers
- **Form Accessibility**: 
  - Proper label associations
  - Error messages with `role="alert"`
  - Required field indicators
  - Real-time validation feedback

### 🔍 SEO Optimization
- Descriptive meta tags (description, keywords, author)
- Open Graph meta tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Structured heading hierarchy
- Alt text on all images
- Semantic markup for better indexing

### 📱 Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Hamburger menu for mobile navigation
- Optimized for all screen sizes

### ⚡ Performance
- Lazy loading for images (`loading="lazy"`)
- CSS custom properties for maintainability
- Optimized font loading with preconnect
- Minimal JavaScript for fast rendering

### 🎨 Design Features
- Modern, clean interface
- Consistent typography
- Professional color scheme
- Smooth transitions and animations
- Respects `prefers-reduced-motion` preference
- Dark mode support ready

## 📁 Project Structure

```
portfolio-website/
├── index.html                 # Homepage with hero and featured projects
├── pages/
│   ├── about.html            # About page with experience and education
│   ├── projects.html         # Detailed project showcase
│   └── contact.html          # Accessible contact form
├── css/
│   └── styles.css            # Comprehensive CSS with accessibility
├── js/
│   └── main.js               # JavaScript for interactivity and accessibility
├── assets/
│   └── favicon.svg           # Site favicon
├── README.md                 # Project documentation
└── ACCESSIBILITY.md          # Accessibility testing guide
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/karthikamara04-sudo/portfolio-website.git
   cd portfolio-website
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000`

3. **Test accessibility**
   - Run the built-in accessibility test in browser console:
   ```javascript
   testAccessibility()
   ```

## ✨ Key Accessibility Features

### Screen Reader Support
- Semantic HTML structure for proper document outline
- ARIA labels for icon buttons and form fields
- Status messages with `aria-live="polite"`
- Form validation errors with `role="alert"`

### Keyboard Navigation
- Tab order optimized for logical flow
- Skip to main content link
- Visible focus indicators (3px solid outline)
- Escape key to close mobile menu
- All interactive elements accessible via keyboard

### Visual Accessibility
- High color contrast ratios (minimum WCAG AA)
- Large, readable font sizes
- Adequate spacing between interactive elements
- Clear visual hierarchy
- Reduced motion support

### Form Accessibility
- Associated labels for all form inputs
- Required field indicators
- Clear error messages linked to fields
- Character count feedback for textarea
- Help text for fields requiring additional info
- Checkbox and radio button accessibility

## 🔧 Customization

### Update Personal Information
Edit the following files:
- `index.html`: Update hero section and meta tags
- `pages/about.html`: Update experience, education, and bio
- `pages/projects.html`: Add your project details
- `pages/contact.html`: Update contact information

### Modify Colors
Update CSS custom properties in `css/styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... more colors ... */
}
```

### Add New Pages
1. Create new HTML file in `pages/` directory
2. Use same semantic structure and ARIA attributes
3. Include proper meta tags and canonical URLs
4. Test for accessibility

## 🧪 Testing

### Accessibility Testing
1. **Browser Console**: Run `testAccessibility()` for a quick check
2. **Lighthouse**: Use Chrome DevTools Lighthouse audit
3. **Screen Reader**: Test with NVDA (Windows), JAWS, or VoiceOver (Mac)
4. **Keyboard**: Navigate using Tab, Enter, and arrow keys only
5. **Color Contrast**: Verify with WebAIM Contrast Checker

### Expected Results
- ✅ 100/100 Lighthouse Accessibility score
- ✅ 100/100 Lighthouse SEO score
- ✅ WCAG 2.1 Level AA compliance
- ✅ Screen reader compatible
- ✅ Keyboard navigable
- ✅ Mobile responsive

## 📚 Semantic HTML5 Tags Used

- `<header>`: Page headers
- `<nav>`: Navigation menus
- `<main>`: Primary content
- `<article>`: Self-contained content
- `<section>`: Grouped content with heading
- `<aside>`: Sidebar content (if added)
- `<figure>`: Images with captions
- `<footer>`: Footer content
- `<form>`: Form containers
- `<label>`: Form field labels
- `<button>`: Interactive buttons
- `<details>`: Collapsible FAQ items

## 🔗 ARIA Implementation

- `role="navigation"`: Navigation landmark
- `role="contentinfo"`: Footer landmark
- `role="main"`: Main content area
- `role="article"`: Article content
- `role="status"`: Status messages
- `role="alert"`: Error alerts
- `aria-label`: Descriptive labels
- `aria-labelledby`: Linked labels
- `aria-describedby`: Extended descriptions
- `aria-required="true"`: Required fields
- `aria-invalid`: Invalid fields
- `aria-live="polite"`: Live regions
- `aria-current="page"`: Current page indicator

## 📖 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [The A11Y Project](https://www.a11yproject.com/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions to improve accessibility and semantic HTML are welcome! Please:
1. Follow WCAG 2.1 guidelines
2. Test with screen readers
3. Maintain semantic HTML
4. Add proper ARIA attributes
5. Test keyboard navigation

## 📧 Contact

For questions or suggestions about this portfolio:
- Email: karthik@example.com
- GitHub: [@karthikamara04-sudo](https://github.com/karthikamara04-sudo)

---

**Built with semantic HTML5, accessibility-first design, and ❤️**
