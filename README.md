# 🍪 Cookie Cutter Monster

**Transform any image into a 3D printable cookie cutter STL file - completely in your browser!**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_It_Now-blue?style=for-the-badge)](https://schreiverj.github.io/CookieCutterMonster/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](#license)
[![Build Status](https://img.shields.io/github/actions/workflow/status/SchreiverJ/CookieCutterMonster/deploy.yml?style=for-the-badge)](https://github.com/SchreiverJ/CookieCutterMonster/actions)

---

## ✨ What is Cookie Cutter Monster?

Cookie Cutter Monster is a powerful web application that converts images into 3D printable cookie cutter designs. Simply upload an image with a clear subject and uniform background, and get a ready-to-print STL file in seconds!

Perfect for:
- 🎂 Custom birthday cookie cutters
- 🏢 Corporate branding cookies  
- 🎨 Creative baking projects
- 🎁 Personalized gifts
- 👶 Kids' favorite cartoon characters

## 🎯 Key Features

### 🖼️ **Smart Image Processing**
- **Automatic edge detection** using OpenCV.js
- **Background removal** for clean outlines
- **Customizable thickness** and sizing options
- **Real-time 3D preview** with Three.js

### 🔧 **Flexible Customization**
- **Cookie size control** - set exact dimensions in inches
- **Wall thickness adjustment** - optimize for your 3D printer
- **Bevel options** - smooth or sharp edges
- **Material considerations** - PLA, PETG, ABS compatible

### 🚀 **Modern Web Technology**
- **100% client-side** - your images never leave your browser
- **No backend required** - works completely offline after loading
- **Responsive design** - works on desktop, tablet, and mobile
- **Progressive Web App** ready

### 📁 **Export Options**
- **STL file output** - industry standard for 3D printing
- **Optimized mesh** - clean topology for reliable printing
- **Instant download** - no waiting or processing queues

## 🚀 Getting Started

### Try It Online
Visit **[https://schreiverj.github.io/CookieCutterMonster/](https://schreiverj.github.io/CookieCutterMonster/)** to start creating cookie cutters immediately!

### Usage Instructions

1. **📤 Upload Your Image**
   - Choose an image with a clear subject
   - Best results with uniform backgrounds
   - PNG, JPG, GIF supported

2. **⚙️ Adjust Settings**
   - Set your desired cookie size (inches)
   - Adjust wall thickness (0.8-2.0mm recommended)
   - Preview changes in real-time

3. **👀 Preview Your Design**
   - Rotate and zoom the 3D model
   - Check edge definition
   - Verify dimensions

4. **📥 Download STL File**
   - Click "Download STL"
   - Import into your slicer software
   - Print with standard settings

### 🎨 Pro Tips for Best Results

- **High contrast images** work best
- **Simple shapes** produce cleaner cutters
- **Avoid fine details** smaller than 2mm
- **Test print small** before full-size versions

## 🛠️ Technology Stack

### Frontend Framework
- **TypeScript** - Type-safe JavaScript development
- **LitElement** - Lightweight web components
- **Material Web Components** - Google's Material Design

### 3D Graphics & Processing
- **Three.js** - 3D rendering and STL export
- **OpenCV.js** - Computer vision and image processing
- **OrbitControls** - Interactive 3D navigation

### Build & Deployment
- **Webpack** - Module bundling and optimization
- **GitHub Actions** - Automated CI/CD pipeline
- **GitHub Pages** - Static site hosting

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🏗️ Development Setup

### Prerequisites
- **Node.js** 18+ 
- **npm** 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/SchreiverJ/CookieCutterMonster.git
cd CookieCutterMonster

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Static site build for deployment
npm run build:static

# Serve static build locally
npm run serve:static
```

### Development Server
- **Local URL**: http://localhost:8000
- **Hot reload**: Enabled with webpack watch
- **Source maps**: Available for debugging

## 🚀 Deployment

This project automatically deploys to GitHub Pages using GitHub Actions.

### Automatic Deployment
1. Push changes to `main` or `master` branch
2. GitHub Actions runs the build pipeline
3. Static site deploys to GitHub Pages
4. Available at: `https://yourusername.github.io/CookieCutterMonster/`

### Manual Deployment
```bash
# Build static site
npm run build:static

# Deploy the dist/ folder to your hosting provider
```

## 📊 Project Structure

```
CookieCutterMonster/
├── src/
│   ├── components/          # Web components
│   │   ├── camera-debug.ts
│   │   ├── clipart-selector.ts
│   │   ├── cookie-inputs.ts
│   │   └── cookie-size.ts
│   ├── services/           # Core logic
│   │   ├── cookieState.ts  # State management
│   │   └── imageProcessing.ts # OpenCV integration
│   ├── constants.ts        # App configuration
│   ├── types.ts           # TypeScript definitions
│   └── index.ts           # Main application entry
├── js/                    # External libraries
│   ├── opencv.js         # Computer vision
│   ├── three.min.js      # 3D graphics
│   └── STLExporter.js    # File export
├── .github/workflows/     # CI/CD pipeline
├── cookie.html           # Main HTML template
├── webpack.config.cjs    # Build configuration
└── package.json          # Dependencies & scripts
```

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### 🐛 Bug Reports
- Use GitHub Issues
- Include browser and OS details
- Provide steps to reproduce
- Attach problematic images if possible

### 💡 Feature Requests
- Check existing issues first
- Describe the use case
- Explain expected behavior
- Consider implementation complexity

### 🔧 Pull Requests
1. Fork the repository
2. Create a feature branch
3. Write clear commit messages
4. Test your changes thoroughly
5. Submit PR with description

### Development Guidelines
- Follow existing code style
- Add TypeScript types for new features
- Test in multiple browsers
- Update documentation as needed

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenCV.js** - Computer vision capabilities
- **Three.js** - 3D graphics rendering  
- **Material Design** - UI components
- **3D Printing Community** - Inspiration and feedback

## 📞 Support

- **🐛 Issues**: [GitHub Issues](https://github.com/SchreiverJ/CookieCutterMonster/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/SchreiverJ/CookieCutterMonster/discussions)
- **📧 Contact**: Create an issue for questions

---

<div align="center">

**Made with ❤️ for the 3D printing and baking communities**

[⭐ Star this project](https://github.com/SchreiverJ/CookieCutterMonster) • [🐛 Report Bug](https://github.com/SchreiverJ/CookieCutterMonster/issues) • [✨ Request Feature](https://github.com/SchreiverJ/CookieCutterMonster/issues)

</div>