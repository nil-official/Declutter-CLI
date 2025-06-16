const chalk = require('chalk');
const { FILE_CATEGORIES } = require('../config/fileCategories');

/**
 * Handle the categories command - display all supported file categories
 */
function categoriesCommand() {
    console.log(chalk.blue.bold('📂 Supported File Categories:\n'));

    for (const [category, config] of Object.entries(FILE_CATEGORIES)) {
        console.log(chalk.green.bold(`${config.folder}:`));
        console.log(chalk.gray(`  Extensions: ${config.extensions.join(', ')}`));
        console.log('');
    }

    console.log(chalk.green.bold('Others:'));
    console.log(chalk.gray('  All other file types will be placed in the "Others" folder'));
    console.log('');
}

module.exports = categoriesCommand;