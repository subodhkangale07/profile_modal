# Social Sharing Modal System

A modern, responsive social sharing modal system with animated particles background and comprehensive platform support. Built with vanilla JavaScript, HTML, and CSS.

## 🚀 Features

- **Multi-Platform Sharing**: Support for Twitter, Facebook, LinkedIn, WhatsApp, Telegram, Email, and Reddit
- **Native Sharing API**: Automatic detection and usage of native sharing on mobile devices
- **Animated Particles**: Beautiful floating particles background with responsive particle count
- **Accessibility First**: Full keyboard navigation, focus management, and ARIA compliance
- **Toast Notifications**: User feedback with success/error messages
- **Copy to Clipboard**: One-click URL copying with fallback for older browsers
- **Responsive Design**: Mobile-optimized with adaptive particle count
- **Modern UI**: Clean, minimalist design with smooth animations

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-sharing-modal.git
cd social-sharing-modal
```

2. Open `index.html` in your browser or serve it using a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 📁 Project Structure

```
social-sharing-modal/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # Main JavaScript functionality
├── README.md           # This file
└── assets/
    └── (any images or icons)
```

## 🎯 Usage

### Basic Implementation

1. Include the HTML structure in your page:
```html
<!-- Share Button -->
<button class="btn-share" data-tooltip="Share this page">
  <i class="fa-solid fa-share"></i>
  Share
</button>

<!-- Modal Structure -->
<div class="modal">
  <div class="modal-content">
    <!-- Your modal content here -->
  </div>
</div>
<div class="overlay"></div>
```

2. Add the CSS classes and animations from `style.css`

3. Include the JavaScript functionality from `script.js`

### Customization

#### Update sharing content:
```javascript
// In script.js, modify these variables
const url = 'https://your-website.com';
const text = 'Your custom sharing text';
const title = 'Your page title';
```

#### Customize particle settings:
```javascript
// Adjust particle count
const particleCount = window.innerWidth < 768 ? 30 : 50;

// Modify animation duration
particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
```

#### Add new sharing platforms:
```javascript
case 'your-platform':
  shareUrl = `https://your-platform.com/share?url=${url}`;
  break;
```

## 🔧 API Reference

### Main Functions

#### `openModal()`
Opens the sharing modal with focus management.

#### `closeModal()`
Closes the modal and returns focus to the share button.

#### `shareOn(platform)`
Initiates sharing on the specified platform.
- **Parameters**: `platform` (string) - Platform name (twitter, facebook, etc.)

#### `copyUrl()`
Copies the URL to clipboard with fallback support.

#### `showToast(message, type)`
Displays toast notification.
- **Parameters**: 
  - `message` (string) - Message to display
  - `type` (string) - 'success' or 'error' (default: 'success')

#### `nativeShare()`
Uses native sharing API when available.

## 🎨 Styling

The project uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --error-color: #ef4444;
  --background-color: #0f172a;
  --text-color: #f8fafc;
}
```

## 📱 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile**: iOS Safari 12+, Chrome Mobile 60+
- **Features**:
  - Clipboard API with fallback
  - Native Share API detection
  - CSS Grid and Flexbox
  - ES6+ JavaScript features

## 🔒 Security Features

- XSS protection through proper encoding
- CSP-friendly implementation
- No inline scripts or styles
- Secure popup window handling

## ⚡ Performance

- Lightweight vanilla JavaScript (no frameworks)
- Lazy particle creation
- Efficient event delegation
- Minimal DOM manipulation
- Responsive particle count based on device

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration
- Maintain accessibility standards
- Add tests for new features
- Update documentation
- Ensure cross-browser compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Safari iOS may require user interaction for clipboard access
- Some ad blockers may block social sharing popups
- Particles may impact performance on very old devices

## 🔮 Roadmap

- [ ] Add more sharing platforms (Pinterest, Tumblr, etc.)
- [ ] Implement sharing analytics
- [ ] Add dark/light theme toggle
- [ ] Create React/Vue components
- [ ] Add keyboard shortcuts customization
- [ ] Implement sharing history

## 📊 Analytics Integration

To track sharing events, add analytics calls in the `shareOn()` function:

```javascript
// Google Analytics 4
gtag('event', 'share', {
  method: platform,
  content_type: 'webpage',
  item_id: window.location.pathname
});

// Custom analytics
analytics.track('Social Share', {
  platform: platform,
  url: window.location.href
});
```

## 🎯 SEO Optimization

For better social media previews, add these meta tags:

```html
<!-- Open Graph -->
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
<meta property="og:image" content="https://your-site.com/preview.jpg">
<meta property="og:url" content="https://your-site.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="Your page description">
<meta name="twitter:image" content="https://your-site.com/preview.jpg">
```

## 💡 Tips & Best Practices

1. **Test on Real Devices**: Social sharing behavior varies between browsers
2. **Monitor Popup Blockers**: Provide fallback instructions for users
3. **Optimize Images**: Use appropriate sizes for social media previews
4. **Track Performance**: Monitor sharing conversion rates
5. **Accessibility**: Always test with screen readers and keyboard navigation

## 📞 Support

- Create an issue for bug reports
- Start a discussion for feature requests
- Check existing issues before creating new ones
- Provide detailed reproduction steps

---

Made with ❤️ by [Your Name](https://github.com/yourusername)

**Star this repository if you find it helpful!** ⭐
