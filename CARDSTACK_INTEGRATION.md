# CardStack Component Integration Guide

## ✅ Integration Complete

The CardStack component has been successfully integrated into your portfolio's **Tech Arsenal** section.

---

## 📁 Project Structure Analysis

### Current Setup
- ✅ **React**: v19.2.4 (using JSX, not TypeScript)
- ✅ **Tailwind CSS**: v4.3.0 with Vite plugin
- ✅ **Framer Motion**: v12.34.0 (already installed)
- ✅ **Lucide React**: v1.16.0 (already installed)
- ✅ **Path Alias**: `@/` configured to point to `src/`

### What Was Done
1. ✅ Created `/components/ui` folder structure
2. ✅ Converted TypeScript component to JSX
3. ✅ Replaced Next.js `Link` with React Router's `Link`
4. ✅ Integrated CardStack into Skills3D component
5. ✅ Added tech stack showcase data with Unsplash images
6. ✅ Build verified successfully

---

## 📂 Files Created/Modified

### New Files
- `frontend/src/components/ui/card-stack.jsx` - Main CardStack component

### Modified Files
- `frontend/src/components/Skills3D.jsx` - Integrated CardStack showcase

---

## 🎨 Component Location

The CardStack is now visible in the **Tech Arsenal** section of your portfolio:
- Below the 3D orbital skills visualization
- Features 5 technology cards showcasing:
  1. Frontend Development (React, TypeScript, Tailwind)
  2. Backend Engineering (Node.js, Express, MongoDB)
  3. 3D Graphics & Animation (Three.js, React Three Fiber)
  4. Database Management (MySQL, MongoDB, Firebase)
  5. DevOps & Cloud (Git, Docker, AWS, Railway)

---

## 🎯 Component Features

### Interactive Elements
- **Swipe/Drag**: Swipe cards left or right on the active card
- **Click Navigation**: Click any card to bring it to focus
- **Keyboard Navigation**: Use arrow keys (←/→) when focused
- **Auto-advance**: Cards automatically rotate every 3 seconds
- **Pause on Hover**: Auto-rotation pauses when hovering
- **Dot Navigation**: Click dots to jump to specific cards
- **External Links**: Click the arrow icon to visit technology websites

### Visual Effects
- 3D perspective with depth and tilt
- Smooth spring animations
- Card stacking with overlap
- Fan-out spread effect
- Active card emphasis (lift + scale)
- Gradient overlays for text readability

---

## 🔧 Customization Options

### CardStack Props

```jsx
<CardStack
  items={techStackItems}           // Array of card data
  initialIndex={0}                 // Starting card index
  autoAdvance={true}               // Auto-rotate cards
  intervalMs={3000}                // Auto-advance interval
  pauseOnHover={true}              // Pause on mouse hover
  showDots={true}                  // Show navigation dots
  cardWidth={480}                  // Card width in pixels
  cardHeight={300}                 // Card height in pixels
  maxVisible={5}                   // Cards visible at once
  overlap={0.5}                    // Card overlap (0-0.8)
  spreadDeg={40}                   // Fan spread angle
  loop={true}                      // Enable infinite loop
  activeScale={1.03}               // Active card scale
  inactiveScale={0.94}             // Inactive card scale
  springStiffness={280}            // Animation stiffness
  springDamping={28}               // Animation damping
/>
```

### Card Data Structure

```jsx
const cardItem = {
  id: 1,                           // Unique identifier
  title: "Card Title",             // Main heading
  description: "Card description", // Subtitle text
  imageSrc: "https://...",         // Image URL
  href: "https://...",             // Optional link
};
```

---

## 🖼️ Updating Images

The component uses Unsplash stock images. To customize:

1. **Replace with your own images**:
```jsx
const techStackItems = [
  {
    id: 1,
    title: "Your Technology",
    description: "Your description",
    imageSrc: "/path/to/your/image.jpg", // Local or remote
    href: "https://your-link.com",
  },
];
```

2. **Use different Unsplash images**:
   - Visit [Unsplash](https://unsplash.com/)
   - Search for relevant images
   - Copy the image URL with `?w=800&q=80` parameters

---

## 🎨 Styling Customization

### Tailwind Classes
The component uses Tailwind CSS classes. Key customization points:

```jsx
// Card border and shadow
className="border-4 border-black/10 dark:border-white/10 shadow-xl"

// Text colors
className="text-white"           // Card title
className="text-white/80"        // Card description

// Dot navigation
className="bg-foreground"        // Active dot
className="bg-foreground/30"     // Inactive dot
```

### Custom Renderer
For complete control over card appearance:

```jsx
<CardStack
  items={items}
  renderCard={(item, { active }) => (
    <div className="custom-card">
      {/* Your custom card design */}
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  )}
/>
```

---

## 🚀 Running the Project

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if needed)
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## 📱 Responsive Behavior

The CardStack is responsive:
- **Desktop**: Full-size cards (480x300px)
- **Tablet**: Automatically adjusts to container width
- **Mobile**: Touch-friendly swipe gestures

To adjust for mobile:
```jsx
<CardStack
  cardWidth={window.innerWidth < 768 ? 320 : 480}
  cardHeight={window.innerWidth < 768 ? 200 : 300}
  maxVisible={window.innerWidth < 768 ? 3 : 5}
/>
```

---

## 🎭 Animation Performance

The component uses:
- **Framer Motion** for smooth animations
- **Spring physics** for natural motion
- **Reduced motion** support for accessibility
- **GPU-accelerated transforms** for performance

---

## 🔗 External Links

Cards with `href` properties show a link icon:
- **Internal links**: Use React Router navigation
- **External links**: Open in new tab with `target="_blank"`

```jsx
{
  id: 1,
  title: "React",
  href: "https://react.dev/",  // External link
}

{
  id: 2,
  title: "Projects",
  href: "/projects",           // Internal route
}
```

---

## 🐛 Troubleshooting

### Cards not showing?
- Check that `items` array has data
- Verify image URLs are accessible
- Check browser console for errors

### Animations laggy?
- Reduce `maxVisible` count
- Increase `springDamping` value
- Disable `autoAdvance` on mobile

### Images not loading?
- Verify Unsplash URLs are correct
- Check CORS settings for custom images
- Use `loading="eager"` for above-fold images

---

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

## 🎉 Next Steps

1. **Customize card content** with your own technologies
2. **Replace images** with project-specific visuals
3. **Adjust animations** to match your design language
4. **Add more cards** to showcase additional skills
5. **Integrate elsewhere** - use CardStack in other sections

---

## 💡 Why `/components/ui` folder?

The `/components/ui` folder structure is important because:

1. **Separation of Concerns**: UI primitives separate from feature components
2. **Reusability**: Easy to find and reuse across the project
3. **Maintainability**: Clear organization for design system components
4. **Scalability**: Standard pattern for adding more UI components
5. **shadcn/ui Convention**: Follows industry-standard component organization

Even though this project doesn't use shadcn/ui CLI, following this structure makes it easier to:
- Add shadcn components later if needed
- Maintain consistent component organization
- Collaborate with other developers familiar with this pattern

---

## ✨ Component Successfully Integrated!

The CardStack is now live in your **Tech Arsenal** section. Visit the portfolio and scroll to see it in action!
