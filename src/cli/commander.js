const { Command } = require('commander');
const organizeCommand = require('../commands/organizeCommand');
const previewCommand = require('../commands/previewCommand');
const categoriesCommand = require('../commands/categoriesCommand');
const interactiveCommand = require('../commands/interactiveCommand');

const program = new Command();

// CLI Program Configuration
program
    .name('declutter')
    .description('A CLI tool to organize and declutter folders by grouping files into categorized subdirectories')
    .version('1.0.0');

// Organize Command
program
    .command('organize [path...]')
    .alias('o')
    .description('organize files in the specified folder (default: current directory)')
    .option('-f, --force', 'skip confirmation prompt')
    .option('-q, --quiet', 'run in quiet mode with minimal output')
    .option('--overwrite', 'overwrite existing files in destination folders')
    .action(organizeCommand);

// Preview Command
program
    .command('preview [path...]')
    .alias('p')
    .description('preview how files will be organized without making changes')
    .action(previewCommand);

// Categories Command
program
    .command('categories')
    .alias('c')
    .description('list all supported file categories and extensions')
    .action(categoriesCommand);

// Default Interactive Command
program
    .action(interactiveCommand);

module.exports = { program };