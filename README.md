# 🚀 Clean Struct - Clean Architecture Generator

Generate clean, scalable, and organized folder structures for your modern web projects with ease!

## ✨ Features

- 🎯 **Framework-specific templates** for Next.js, React, and Vite
- 📁 **Interactive CLI** - Choose exactly what you need
- ⚡ **Fast & Easy** - Set up your project structure in seconds
- 🎨 **Customizable** - Pick and choose folders based on your needs
- 📦 **Scalable** - Best practices for growing applications
- 🔧 **TypeScript & JavaScript** support

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g @xavorus/clean-struct
```

### Using npx (No installation needed)

```bash
npx @xavorus/clean-struct
```

### Interactive Prompts

1. **Choose your framework:**

   - ⚡ Next.js (with App Router)
   - ⚛️ React
   - 🚀 Vite
   - 🎯 Custom

2. **Select base path:**

   - Root directory (`./`)
   - `src/` folder
   - `app/` folder

3. **Pick folders you need:**

   - components
   - pages/views
   - services
   - hooks
   - utils
   - And many more...

4. **Additional options:**
   - File extension (TypeScript/JavaScript)
   - Add README files
   - Add .gitkeep for empty folders

## 📂 Framework Templates

### Next.js Template

```
src/
├── components/    # Reusable UI components
├── app/          # App Router pages (Next.js 13+)
├── lib/          # Utility functions
├── hooks/        # Custom React hooks
├── services/     # API services
├── types/        # TypeScript types
├── constants/    # App constants
└── styles/       # CSS/SCSS files
```

### React Template

```
src/
├── components/    # Reusable components
├── pages/        # Page components
├── layouts/      # Layout wrappers
├── hooks/        # Custom hooks
├── services/     # API calls
├── utils/        # Helper functions
├── store/        # State management
├── types/        # TypeScript types
└── assets/       # Images, fonts
```

### Vite Template

```
src/
├── components/    # UI components
├── views/        # Page views
├── composables/  # Vue composables/React hooks
├── services/     # API services
├── utils/        # Utilities
├── store/        # Pinia/Redux
├── router/       # Router config
└── assets/       # Static assets
```

## 🎯 Example

```bash
$ clean-struct

🚀  Clean Architecture Generator

? Pilih framework/template yang kamu gunakan: React
? Di mana kamu ingin membuat folder-folder ini? src
? Pilih folder untuk React:
  ◉ components - Reusable components
  ◉ pages - Page components
  ◉ hooks - Custom hooks
  ◉ services - API calls
  ◯ store - Redux/Zustand
? Pilih ekstensi file index: TypeScript (.ts/.tsx)
? Tambahkan .gitkeep untuk folder kosong? Yes

📦 Sedang membuat struktur folder... 🛠️

✔ Created: src/components
✔ Created: src/pages
✔ Created: src/hooks
✔ Created: src/services

✅ Selesai!

📁 4 folder berhasil dibuat
📍 Lokasi: D:\MyProject\src
```

## 🛠️ Features in Detail

### Smart Templates

Each framework template comes with pre-configured, commonly used folders that follow best practices for that specific framework.

### Flexible Configuration

- Choose TypeScript or JavaScript
- Optional README files for documentation
- .gitkeep files to track empty folders in git
- Custom folder selection

### Clean Output

- Color-coded terminal output
- Success/skip indicators
- Summary of created folders
- Full path display

## 📝 Use Cases

Perfect for:

- 🆕 Starting new projects
- 🔄 Refactoring existing codebases
- 👥 Team standardization
- 📚 Learning best practices
- ⚡ Quick prototyping

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT © Xavorus

## 🔗 Links

- [GitHub Repository](https://github.com/KwikAndreas/clean-struct)
- [NPM Package](https://www.npmjs.com/package/@xavorus/clean-struct)
- [Report Issues](https://github.com/KwikAndreas/clean-struct/issues)

## 💡 Tips

- Run in an empty project for best results
- Use TypeScript option for better type safety
- Add README files for team documentation
- Customize folder names in the code if needed

---

Made with ❤️ by Xavorus
