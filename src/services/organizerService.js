const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const cliProgress = require('cli-progress');
const {
    getFilesInDirectory,
    categorizeFiles,
    createFolderIfNotExists,
    moveFile,
    pathExists
} = require('../utils/fileUtils');

/**
 * Main service class for organizing files
 */
class OrganizerService {
    /**
     * Organize files in a folder by moving them to categorized subdirectories
     * @param {string} targetPath - Path to the folder to organize
     * @param {Object} options - Organization options
     * @param {boolean} options.quiet - Run in quiet mode
     * @param {boolean} options.force - Skip confirmation prompt
     * @param {boolean} options.overwrite - Overwrite existing files
     * @returns {Promise<Object>} - Organization results
     */
    async organizeFolder(targetPath, options = {}) {
        const spinner = ora('Analyzing folder...').start();

        try {
            // Verify target path exists
            if (!pathExists(targetPath)) {
                spinner.fail(chalk.red(' Target folder does not exist!'));
                return { success: false, error: 'Target folder does not exist' };
            }

            // Get all files in the directory
            const files = await getFilesInDirectory(targetPath);

            if (files.length === 0) {
                spinner.succeed(chalk.yellow(' No files found to organize!'));
                return { success: true, message: 'No files found to organize' };
            }

            spinner.text = `Found ${files.length} files. Categorizing...`;

            // Categorize files
            const filesByCategory = categorizeFiles(files);
            const totalFiles = files.length;
            const categoryCount = Object.keys(filesByCategory).length;

            spinner.succeed(chalk.green(` Categorized ${totalFiles} files into ${categoryCount} categories`));

            // Show preview and get confirmation if needed
            const shouldProceed = await this._handlePreviewAndConfirmation(
                filesByCategory,
                options
            );

            if (!shouldProceed) {
                return { success: false, message: 'Operation cancelled' };
            }

            // Organize files
            const result = await this._moveFilesToCategories(
                targetPath,
                filesByCategory,
                options
            );

            return result;

        } catch (error) {
            spinner.fail(chalk.red(' An error occurred while organizing files'));
            console.error(chalk.red(error.message));
            return { success: false, error: error.message };
        }
    }

    /**
     * Preview how files will be organized without making changes
     * @param {string} targetPath - Path to analyze
     * @returns {Promise<Object>} - Preview results
     */
    async previewOrganization(targetPath) {
        try {
            if (!pathExists(targetPath)) {
                return { success: false, error: 'Target folder does not exist' };
            }

            const files = await getFilesInDirectory(targetPath);

            if (files.length === 0) {
                return { success: true, message: 'No files found to organize', preview: {} };
            }

            const filesByCategory = categorizeFiles(files);

            return {
                success: true,
                preview: filesByCategory,
                totalFiles: files.length,
                categoryCount: Object.keys(filesByCategory).length
            };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Handle preview display and user confirmation
     * @private
     */
    async _handlePreviewAndConfirmation(filesByCategory, options) {
        // Show preview if not in quiet mode
        if (!options.quiet) {
            console.log(chalk.cyan('\n📁 File organization preview:'));
            for (const [category, categoryFiles] of Object.entries(filesByCategory)) {
                console.log(chalk.blue(`    ${category}: ${categoryFiles.length} files`));
            }

            console.log('');

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
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Move files to their respective category folders
     * @private
     */
    async _moveFilesToCategories(targetPath, filesByCategory, options) {
        const moveSpinner = ora('Preparing to organize files...').start();

        const allFiles = Object.values(filesByCategory).flat();
        const totalFiles = allFiles.length;

        moveSpinner.stop();

        // Start timer
        const startTime = Date.now();

        // Create Progress Bar
        const bar = new cliProgress.SingleBar({
            format: '📦 Organizing |' + chalk.cyan('{bar}') + '| {percentage}% || {value}/{total} files',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
        }, cliProgress.Presets.shades_classic);

        bar.start(totalFiles, 0);

        let movedCount = 0;
        let errorCount = 0;
        let processed = 0;

        for (const [category, categoryFiles] of Object.entries(filesByCategory)) {
            const categoryPath = path.join(targetPath, category);

            const folderCreated = await createFolderIfNotExists(categoryPath);
            if (!folderCreated) {
                errorCount += categoryFiles.length;
                processed += categoryFiles.length;
                bar.update(processed);
                continue;
            }

            for (const file of categoryFiles) {
                const sourcePath = path.join(targetPath, file);
                const destinationPath = path.join(categoryPath, file);

                if (pathExists(destinationPath) && !options.overwrite) {
                    console.log(chalk.yellow(`⚠️  Skipping ${file} - already exists in "${category}"`));
                    processed++;
                    bar.update(processed);
                    continue;
                }

                const moved = await moveFile(sourcePath, destinationPath);
                moved ? movedCount++ : errorCount++;
                processed++;
                bar.update(processed);
            }
        }

        bar.stop();

        const endTime = Date.now();
        const durationInSec = ((endTime - startTime) / 1000).toFixed(2);

        console.log(chalk.green(`\n✅ Successfully organized ${movedCount} files!`));
        if (errorCount > 0) {
            console.log(chalk.red(`⚠️  ${errorCount} files could not be moved.`));
        }

        // Summary
        console.log(chalk.cyan(`\n📊 Summary:`));
        console.log(chalk.green(`    Files organized: ${movedCount}`));
        console.log(chalk.blue(`    Folders created: ${Object.keys(filesByCategory).length}`));
        if (errorCount > 0) {
            console.log(chalk.red(`    Errors: ${errorCount}`));
        }
        console.log(chalk.magenta(`    Time taken: ${durationInSec} seconds\n`));

        return {
            success: true,
            movedCount,
            errorCount,
            categoryCount: Object.keys(filesByCategory).length,
            duration: durationInSec
        };
    }
}

module.exports = OrganizerService;