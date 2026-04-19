# Design Reference from yuvarajhadimani.com

## Key Design Elements

### Color Scheme
- **Light Gradient Backgrounds**: Soft pink to mint green (#fce4ec to #e0f2f1)
- **Dark Text**: #222 for headings, #666 for body text
- **Accent Color**: Blue (#4a90e2) for underlines and highlights
- **White Cards**: Semi-transparent white cards (rgba(255, 255, 255, 0.7-0.9))

### Typography
- **Headings**: Large, bold, centered with blue underline accent
- **Body Text**: Clean, readable with good line-height (1.6-1.8)
- **Font Weights**: 600-700 for headings, 400-500 for body

### Layout Patterns

#### Navigation
- Fixed top navigation with smooth scroll
- Logo on left, menu items on right
- Dropdown "More" menu for additional sections
- Active section highlighting
- Smooth transitions on scroll

#### Section Structure
1. **Hero Section**: Full-screen with centered content
2. **About Me**: Two-column layout (description + info card)
3. **Education**: Horizontal cards with icon, details, and number badge
4. **Skills**: Grid of skill cards with progress indicators
5. **Projects**: Filterable grid with hover effects
6. **Certifications**: Grid layout with cards
7. **Contact**: Two-column (info + form)
8. **Notes**: Filterable blog-style cards

### Card Design
- **Rounded Corners**: 15-20px border-radius
- **Subtle Shadows**: 0 10px 30px rgba(0, 0, 0, 0.1)
- **Hover Effects**: Slight lift (translateY(-5px))
- **Semi-transparent Backgrounds**: White with 70-90% opacity
- **Border Accents**: Colored left borders or top sections

### Spacing & Rhythm
- **Section Padding**: 100px vertical, 5% horizontal
- **Card Gaps**: 2rem between cards
- **Max Width**: 1200px for content containers
- **Consistent Margins**: 1-2rem between elements

### Interactive Elements
- **Smooth Animations**: Framer Motion for all transitions
- **Scroll Triggers**: Elements fade in as you scroll
- **Hover States**: Color changes, lifts, scale effects
- **Filter Buttons**: Rounded pills with active states

### Responsive Design
- **Mobile-First**: Stacks columns on smaller screens
- **Flexible Grids**: auto-fit/auto-fill for cards
- **Readable Text**: Adjusts font sizes for mobile
- **Touch-Friendly**: Larger tap targets

## Implementation Notes

### Smooth Scrolling
- Calculate navbar height offset
- Use window.scrollTo with behavior: "smooth"
- Track active section with scroll listener

### Section Transitions
- Light gradient sections alternate with dark sections
- Creates visual rhythm and breaks up content
- Maintains readability throughout

### Performance
- Lazy load animations with intersection observer
- Optimize images and assets
- Minimize re-renders with proper React patterns

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- ARIA labels where needed
