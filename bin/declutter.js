#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs').promises;
const { existsSync } = require('fs');

const program = new Command();

// File type categories
const FILE_CATEGORIES = {
    images: {
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.ico', '.tiff', '.raw', '.cr2', '.nef', '.orf', '.sr2', '.dng', '.heic', '.heif', '.avif', '.jfif', '.psd', '.ai', '.eps', '.indd'],
        folder: 'Images'
    },
    documents: {
        extensions: ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt', '.pages', '.tex', '.md', '.markdown', '.rst', '.asciidoc', '.epub', '.mobi', '.azw', '.azw3', '.fb2', '.lit', '.pdb', '.tcr', '.djvu'],
        folder: 'Documents'
    },
    spreadsheets: {
        extensions: ['.xls', '.xlsx', '.csv', '.ods', '.numbers', '.tsv', '.xlsm', '.xlsb', '.xltx', '.xltm', '.ots', '.fods', '.uos', '.dbf', '.wk1', '.wks', '.123'],
        folder: 'Spreadsheets'
    },
    presentations: {
        extensions: ['.ppt', '.pptx', '.odp', '.key', '.pps', '.ppsx', '.pptm', '.potx', '.potm', '.ppsm', '.otp', '.fodp', '.uop', '.shf'],
        folder: 'Presentations'
    },
    videos: {
        extensions: ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.m4v', '.3gp', '.3g2', '.f4v', '.asf', '.rm', '.rmvb', '.vob', '.ogv', '.drc', '.mng', '.qt', '.yuv', '.viv', '.amv', '.m4p', '.mp2', '.mpe', '.mpv', '.m2v', '.svi', '.mxf', '.roq', '.nsv'],
        folder: 'Videos'
    },
    audio: {
        extensions: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a', '.opus', '.aiff', '.au', '.ra', '.3gp', '.amr', '.awb', '.dss', '.dvf', '.m4b', '.m4p', '.mmf', '.mpc', '.msv', '.oga', '.raw', '.sln', '.tta', '.voc', '.vox', '.wv', '.8svx', '.cda'],
        folder: 'Audio'
    },
    archives: {
        extensions: ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.tgz', '.tbz2', '.txz', '.lz', '.lzma', '.z', '.cab', '.iso', '.dmg', '.hqx', '.sit', '.sitx', '.sea', '.bin', '.uu', '.ace', '.arj', '.lzh', '.arc', '.pak', '.pk3', '.pk4', '.war', '.ear', '.sar', '.jar'],
        folder: 'Archives'
    },
    code: {
        extensions: [
            // Web Technologies
            '.js', '.jsx', '.ts', '.tsx', '.html', '.htm', '.css', '.scss', '.sass', '.less', '.stylus', '.vue', '.svelte', '.php', '.asp', '.aspx', '.jsp',
            // Programming Languages
            '.py', '.pyw', '.pyc', '.pyo', '.pyd', '.ipynb', '.java', '.class', '.jar', '.cpp', '.cxx', '.cc', '.c', '.h', '.hpp', '.hxx', '.cs', '.vb', '.fs', '.fsx', '.fsi',
            '.rb', '.rbw', '.rake', '.gemspec', '.go', '.rs', '.swift', '.kt', '.kts', '.scala', '.clj', '.cljs', '.cljc', '.hs', '.lhs', '.elm', '.erl', '.hrl',
            '.ex', '.exs', '.pl', '.pm', '.t', '.pod', '.r', '.R', '.rmd', '.Rmd', '.m', '.mm', '.f', '.f90', '.f95', '.f03', '.f08', '.for', '.ftn', '.fpp',
            // Shell & Scripts
            '.sh', '.bash', '.zsh', '.fish', '.csh', '.tcsh', '.ksh', '.bat', '.cmd', '.ps1', '.psm1', '.psd1',
            // Config & Data
            '.json', '.xml', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf', '.properties', '.env', '.dotenv',
            // Database
            '.sql', '.sqlite', '.db', '.mdb', '.accdb',
            // Others
            '.lua', '.dart', '.jl', '.nim', '.cr', '.d', '.pas', '.pp', '.inc', '.asm', '.s', '.nasm', '.masm', '.cmake', '.mk', '.makefile',
            '.dockerfile', '.containerfile', '.proto', '.thrift', '.avro', '.graphql', '.gql', '.prisma', '.terraform', '.tf', '.hcl'
        ],
        folder: 'Code'
    },
    executables: {
        extensions: ['.exe', '.msi', '.msu', '.msp', '.dmg', '.pkg', '.mpkg', '.app', '.deb', '.rpm', '.snap', '.flatpak', '.appimage', '.run', '.bin', '.bundle', '.apk', '.ipa', '.xap', '.appx', '.msix', '.com', '.scr', '.pif', '.cpl', '.gadget'],
        folder: 'Applications'
    },
    fonts: {
        extensions: ['.ttf', '.otf', '.woff', '.woff2', '.eot', '.ttc', '.fon', '.fnt', '.bdf', '.pcf', '.snf', '.psf', '.dfont', '.suit', '.pfb', '.pfm', '.afm', '.pfa', '.gsf'],
        folder: 'Fonts'
    },
    ebooks: {
        extensions: ['.epub', '.mobi', '.azw', '.azw3', '.azw4', '.prc', '.tpz', '.topaz', '.kf8', '.kfx', '.fb2', '.fb2z', '.lit', '.pdb', '.pml', '.pmlz', '.rb', '.tcr', '.tr2', '.tr3', '.chm', '.htmlz', '.oeb', '.opf', '.pef', '.pkg', '.qmk', '.snb', '.wolf'],
        folder: 'E-books'
    },
    models_3d: {
        extensions: ['.obj', '.fbx', '.dae', '.3ds', '.blend', '.c4d', '.ma', '.mb', '.max', '.lwo', '.lws', '.dxf', '.ply', '.stl', '.x3d', '.gltf', '.glb', '.usd', '.usda', '.usdc', '.abc', '.iges', '.igs', '.step', '.stp', '.brep'],
        folder: '3D Models'
    },
    cad_files: {
        extensions: ['.dwg', '.dxf', '.dwf', '.dgn', '.rvt', '.rfa', '.ifc', '.skp', '.3dm', '.iam', '.ipt', '.idw', '.dwt', '.catpart', '.catproduct', '.cgr', '.model', '.exp', '.session', '.dlv', '.prt', '.asm', '.drw'],
        folder: 'CAD Files'
    },
    data_files: {
        extensions: ['.csv', '.tsv', '.json', '.xml', '.yaml', '.yml', '.parquet', '.avro', '.orc', '.hdf5', '.h5', '.nc', '.cdf', '.mat', '.rds', '.rda', '.rdata', '.sav', '.por', '.sas7bdat', '.xpt', '.dta', '.ods', '.numbers'],
        folder: 'Data Files'
    },
    system_files: {
        extensions: ['.sys', '.dll', '.so', '.dylib', '.lib', '.a', '.o', '.ko', '.mod', '.drv', '.vxd', '.ocx', '.ax', '.cpl', '.scr', '.mun', '.mui', '.cat', '.inf', '.oem', '.pnf', '.precomp', '.winmd'],
        folder: 'System Files'
    },
    logs: {
        extensions: ['.log', '.logs', '.out', '.err', '.trace', '.debug', '.crash', '.dump', '.tmp', '.temp', '.bak', '.backup', '.old', '.orig', '.swp', '.swo', '.~', '.cache'],
        folder: 'Logs & Temp'
    }
};

function getFileCategory(fileName) {
    const ext = path.extname(fileName).toLowerCase();

    for (const [category, config] of Object.entries(FILE_CATEGORIES)) {
        if (config.extensions.includes(ext)) {
            return config.folder;
        }
    }

    return 'Others';
}

async function createFolderIfNotExists(folderPath) {
    try {
        await fs.mkdir(folderPath, { recursive: true });
        return true;
    } catch (error) {
        console.error(chalk.red(`Error creating folder ${folderPath}:`, error.message));
        return false;
    }
}

async function moveFile(sourcePath, destinationPath) {
    try {
        await fs.rename(sourcePath, destinationPath);
        return true;
    } catch (error) {
        console.error(chalk.red(`Error moving file ${sourcePath}:`, error.message));
        return false;
    }
}

async function getFilesInDirectory(dirPath) {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        return items.filter(item => item.isFile()).map(item => item.name);
    } catch (error) {
        console.error(chalk.red(`Error reading directory ${dirPath}:`, error.message));
        return [];
    }
}

async function declutterFolder(targetPath, options = {}) {
    const spinner = ora('Analyzing folder...').start();

    try {
        // Verify target path exists
        if (!existsSync(targetPath)) {
            spinner.fail(chalk.red('Target folder does not exist!'));
            return;
        }

        // Get all files in the directory
        const files = await getFilesInDirectory(targetPath);

        if (files.length === 0) {
            spinner.succeed(chalk.yellow('No files found to organize!'));
            return;
        }

        spinner.text = `Found ${files.length} files. Categorizing...`;

        // Categorize files
        const filesByCategory = {};
        let totalFiles = 0;

        for (const file of files) {
            const category = getFileCategory(file);
            if (!filesByCategory[category]) {
                filesByCategory[category] = [];
            }
            filesByCategory[category].push(file);
            totalFiles++;
        }

        spinner.succeed(chalk.green(`Categorized ${totalFiles} files into ${Object.keys(filesByCategory).length} categories`));

        // Show preview if not in quiet mode
        if (!options.quiet) {
            console.log(chalk.cyan('\n📁 File organization preview:'));
            for (const [category, categoryFiles] of Object.entries(filesByCategory)) {
                console.log(chalk.blue(`  ${category}: ${categoryFiles.length} files`));
            }

            if (!options.force) {
                const { confirm } = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: 'Do you want to proceed with organizing these files?',
                        default: true
                    }
                ]);

                if (!confirm) {
                    console.log(chalk.yellow('Operation cancelled.'));
                    return;
                }
            }
        }

        // Create folders and move files
        const moveSpinner = ora('Creating folders and organizing files...').start();
        let movedCount = 0;
        let errorCount = 0;

        for (const [category, categoryFiles] of Object.entries(filesByCategory)) {
            const categoryPath = path.join(targetPath, category);

            // Create category folder
            const folderCreated = await createFolderIfNotExists(categoryPath);
            if (!folderCreated) {
                errorCount += categoryFiles.length;
                continue;
            }

            // Move files to category folder
            for (const file of categoryFiles) {
                const sourcePath = path.join(targetPath, file);
                const destinationPath = path.join(categoryPath, file);

                // Check if file already exists in destination
                if (existsSync(destinationPath)) {
                    if (!options.overwrite) {
                        console.log(chalk.yellow(`Skipping ${file} - already exists in ${category}`));
                        continue;
                    }
                }

                const moved = await moveFile(sourcePath, destinationPath);
                if (moved) {
                    movedCount++;
                } else {
                    errorCount++;
                }
            }
        }

        moveSpinner.succeed(chalk.green(`✨ Successfully organized ${movedCount} files!`));

        if (errorCount > 0) {
            console.log(chalk.red(`⚠️  ${errorCount} files could not be moved.`));
        }

        console.log(chalk.cyan(`\n📊 Summary:`));
        console.log(chalk.green(`  ✅ Files organized: ${movedCount}`));
        console.log(chalk.blue(`  📁 Folders created: ${Object.keys(filesByCategory).length}`));
        if (errorCount > 0) {
            console.log(chalk.red(`  ❌ Errors: ${errorCount}`));
        }

    } catch (error) {
        spinner.fail(chalk.red('An error occurred while organizing files'));
        console.error(chalk.red(error.message));
    }
}

// CLI Commands
program
    .name('declutter')
    .description('A CLI tool to organize and declutter folders by grouping files into categorized subdirectories')
    .version('1.0.0');

program
    .command('organize [path]')
    .alias('o')
    .description('organize files in the specified folder (default: current directory)')
    .option('-f, --force', 'skip confirmation prompt')
    .option('-q, --quiet', 'run in quiet mode with minimal output')
    .option('--overwrite', 'overwrite existing files in destination folders')
    .action(async (targetPath, options) => {
        const folderPath = targetPath ? path.resolve(targetPath) : process.cwd();

        console.log(chalk.blue.bold('🗂️  Declutter CLI'));
        console.log(chalk.gray(`Organizing folder: ${folderPath}\n`));

        await declutterFolder(folderPath, options);
    });

program
    .command('preview [path]')
    .alias('p')
    .description('preview how files will be organized without making changes')
    .action(async (targetPath) => {
        const folderPath = targetPath ? path.resolve(targetPath) : process.cwd();

        console.log(chalk.blue.bold('🔍 Preview Mode'));
        console.log(chalk.gray(`Analyzing folder: ${folderPath}\n`));

        try {
            const files = await getFilesInDirectory(folderPath);

            if (files.length === 0) {
                console.log(chalk.yellow('No files found to organize!'));
                return;
            }

            const filesByCategory = {};
            for (const file of files) {
                const category = getFileCategory(file);
                if (!filesByCategory[category]) {
                    filesByCategory[category] = [];
                }
                filesByCategory[category].push(file);
            }

            console.log(chalk.cyan('📁 Files will be organized as follows:\n'));

            for (const [category, categoryFiles] of Object.entries(filesByCategory)) {
                console.log(chalk.blue.bold(`${category}/ (${categoryFiles.length} files)`));
                categoryFiles.forEach(file => {
                    console.log(chalk.gray(`  • ${file}`));
                });
                console.log('');
            }

        } catch (error) {
            console.error(chalk.red('Error analyzing folder:', error.message));
        }
    });

program
    .command('categories')
    .alias('c')
    .description('list all supported file categories and extensions')
    .action(() => {
        console.log(chalk.blue.bold('📂 Supported File Categories:\n'));

        for (const [category, config] of Object.entries(FILE_CATEGORIES)) {
            console.log(chalk.green.bold(`${config.folder}:`));
            console.log(chalk.gray(`  Extensions: ${config.extensions.join(', ')}`));
            console.log('');
        }

        console.log(chalk.yellow.bold('Others:'));
        console.log(chalk.gray('  All other file types will be placed in the "Others" folder'));
    });

// Default command
program
    .action(async () => {
        console.log(chalk.blue.bold('🗂️  Declutter CLI'));
        console.log(chalk.gray('A tool to organize your folders by file type\n'));

        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    { name: '🗂️  Organize current folder', value: 'organize' },
                    { name: '🔍 Preview organization', value: 'preview' },
                    { name: '📂 Show supported categories', value: 'categories' },
                    { name: '❌ Exit', value: 'exit' }
                ]
            }
        ]);

        switch (action) {
            case 'organize':
                await declutterFolder(process.cwd());
                break;
            case 'preview':
                await program.commands.find(cmd => cmd.name() === 'preview').action(undefined);
                break;
            case 'categories':
                await program.commands.find(cmd => cmd.name() === 'categories').action();
                break;
            case 'exit':
                console.log(chalk.gray('Goodbye! 👋'));
                break;
        }
    });

program.parse();