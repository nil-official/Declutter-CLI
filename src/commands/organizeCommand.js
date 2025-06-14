const path = require('path');
const chalk = require('chalk');
const OrganizerService = require('../services/organizerService');

/**
 * Handle the organize command
 * @param {string[]} pathArgs - Array of folder path segments (e.g. ["D:", "My Folder"])
 * @param {Object} options - Command options (e.g., force, quiet, overwrite)
 */
async function organizeCommand(pathArgs, options) {
    const folderPath = pathArgs && pathArgs.length
        ? path.resolve(pathArgs.join(' '))
        : process.cwd();

    const organizerService = new OrganizerService();

    console.log(chalk.blue.bold('🗂️  Declutter CLI'));
    console.log(chalk.gray(`Organizing folder: ${folderPath}\n`));

    await organizerService.organizeFolder(folderPath, options);
}

module.exports = organizeCommand;