const chalk = require('chalk');
const inquirer = require('inquirer');
const OrganizerService = require('../services/organizerService');
const previewCommand = require('./previewCommand');
const categoriesCommand = require('./categoriesCommand');

async function interactiveCommand() {
    console.clear();
    console.log(
        chalk.hex('#00BCD4')('╔════════════════════════════════════════╗') + '\n' +
        chalk.hex('#00BCD4')('║') + chalk.bold('              Declutter CLI             ') + chalk.hex('#00BCD4')('║') + '\n' +
        chalk.hex('#00BCD4')('║') + '   Organize your folders by file type   ' + chalk.hex('#00BCD4')('║') + '\n' +
        chalk.hex('#00BCD4')('╚════════════════════════════════════════╝\n')
    );

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: chalk.bold('Select an action:'),
            choices: [
                { name: '📁  Organize current folder', value: 'organize' },
                { name: '🔍  Preview organization', value: 'preview' },
                { name: '📂  View supported categories', value: 'categories' },
                new inquirer.Separator(),
                { name: '❌  Exit CLI', value: 'exit' }
            ]
        }
    ]);

    const organizerService = new OrganizerService();

    switch (action) {
        case 'organize':
            console.log(chalk.yellow('\nOrganizing current folder...\n'));
            await organizerService.organizeFolder(process.cwd());
            break;
        case 'preview':
            console.log(chalk.cyan('\nGenerating preview...\n'));
            await previewCommand();
            break;
        case 'categories':
            console.log(chalk.green('\nSupported file categories:\n'));
            categoriesCommand();
            break;
        case 'exit':
            console.log(chalk.gray('\nThanks for using Declutter CLI! 👋\n'));
            break;
    }
}

module.exports = interactiveCommand;