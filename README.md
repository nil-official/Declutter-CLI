# Declutter CLI 🗂️

A powerful command-line tool to organize and declutter your folders by automatically categorizing files into organized subdirectories based on their file types.

## Features

- 🚀 **Smart File Organization**: Automatically categorizes files by type (images, documents, videos, etc.)
- 📁 **10+ File Categories**: Supports images, documents, videos, audio, code, archives, and more
- 🔍 **Preview Mode**: See how files will be organized before making changes
- ⚡ **Fast & Efficient**: Built with Node.js for optimal performance
- 🎨 **Beautiful CLI**: Colorful and intuitive command-line interface
- 🛡️ **Safe**: Confirmation prompts and error handling to protect your files
- 🔧 **Flexible**: Multiple options and commands for different use cases

## Installation

### Global Installation (Recommended)

```bash
npm install -g declutter-cli
```

### Local Installation

```bash
npm install declutter-cli
```

## Usage

### Interactive Mode

Simply run the command without arguments for an interactive experience:

```bash
declutter
```

### Quick Commands

#### Organize Current Directory
```bash
declutter organize
# or
declutter o
```

#### Organize Specific Directory
```bash
declutter organize /path/to/folder
declutter o ~/Downloads
```

#### Preview Organization (No Changes Made)
```bash
declutter preview
declutter preview /path/to/folder
```

#### View Supported Categories
```bash
declutter categories
# or
declutter c
```

### Command Options

- `-f, --force`: Skip confirmation prompt
- `-q, --quiet`: Run in quiet mode with minimal output  
- `--overwrite`: Overwrite existing files in destination folders

#### Examples with Options

```bash
# Organize without confirmation
declutter organize --force

# Organize quietly
declutter organize --quiet

# Organize with overwrite
declutter organize --overwrite

# Combine options
declutter organize ~/Downloads --force --quiet
```

## File Categories

The tool automatically organizes files into the following categories:

| Category | File Types | Folder Name |
|----------|------------|-------------|
| **Images** | .jpg, .jpeg, .png, .gif, .bmp, .svg, .webp, .ico, .tiff, .raw | Images |
| **Documents** | .pdf, .doc, .docx, .txt, .rtf, .odt, .pages | Documents |
| **Spreadsheets** | .xls, .xlsx, .csv, .ods, .numbers | Spreadsheets |
| **Presentations** | .ppt, .pptx, .odp, .key | Presentations |
| **Videos** | .mp4, .avi, .mkv, .mov, .wmv, .flv, .webm, .m4v | Videos |
| **Audio** | .mp3, .wav, .flac, .aac, .ogg, .wma, .m4a | Audio |
| **Archives** | .zip, .rar, .7z, .tar, .gz, .bz2, .xz | Archives |
| **Code** | .js, .ts, .py, .java, .cpp, .c, .html, .css, .php, .rb, .go, .rs | Code |
| **Applications** | .exe, .msi, .dmg, .pkg, .deb, .rpm, .appimage | Applications |
| **Fonts** | .ttf, .otf, .woff, .woff2, .eot | Fonts |
| **Others** | All other file types | Others |

## Examples

### Before Organization
```
Downloads/
├── photo.jpg
├── document.pdf
├── song.mp3
├── video.mp4
├── archive.zip
├── script.js
└── app.exe
```

### After Organization
```
Downloads/
├── Images/
│   └── photo.jpg
├── Documents/
│   └── document.pdf
├── Audio/
│   └── song.mp3
├── Videos/
│   └── video.mp4
├── Archives/
│   └── archive.zip
├── Code/
│   └── script.js
└── Applications/
    └── app.exe
```

## API Usage

You can also use declutter-cli programmatically in your Node.js projects:

```javascript
const { execSync } = require('child_process');

// Organize a folder
execSync('declutter organize /path/to/folder --force', { stdio: 'inherit' });
```

## Requirements

- Node.js 14.0.0 or higher
- npm or yarn

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/nil-official/Declutter-CLI.git
cd Declutter-CLI
```

2. Install dependencies
```bash
npm install
```

3. Link for local development
```bash
npm link
```

4. Test your changes
```bash
declutter --help
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/nil-official/Declutter-CLI/issues) on GitHub.

## Changelog

### v1.0.0
- Initial release
- Support for 10+ file categories
- Interactive and command-line modes
- Preview functionality
- Safe file operations with confirmations

---

Made with ❤️ for developers who love organized folders!