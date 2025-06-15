const path = require('path');
const chalk = require('chalk');
const OrganizerService = require('../services/organizerService');

/**
 * Handle the preview command
 * @param {string[]} pathArgs - Array of folder path segments (e.g. ["D:", "My Folder"])
 */
async function previewCommand(pathArgs) {
    const folderPath = pathArgs && pathArgs.length
        ? path.resolve(pathArgs.join(' '))
        : process.cwd();

    const organizerService = new OrganizerService();

    console.log(chalk.blue.bold('🔍 Preview Mode'));
    console.log(chalk.gray(`Analyzing folder: ${folderPath}\n`));

    const result = await organizerService.previewOrganization(folderPath);

    if (!result.success) {
        console.error(chalk.red('Error analyzing folder:', result.error));
        return;
    }

    if (result.message) {
        console.log(chalk.yellow(result.message));
        return;
    }

    const { preview, totalFiles, categoryCount } = result;

    console.log(chalk.cyan('📁 Files will be organized as follows:\n'));

    for (const [category, categoryFiles] of Object.entries(preview)) {
        console.log(chalk.blue.bold(`${category}/ (${categoryFiles.length} files)`));
        categoryFiles.forEach(file => {
            console.log(chalk.gray(`  • ${file}`));
        });
        console.log('');
    }

    console.log(chalk.cyan(`📊 Summary: ${totalFiles} files in ${categoryCount} categories`));
    console.log('');
}

module.exports = previewCommand;