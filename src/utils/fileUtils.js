const path = require('path');
const fs = require('fs').promises;
const { existsSync } = require('fs');
const chalk = require('chalk');
const { FILE_CATEGORIES } = require('../config/fileCategories');

/**
 * Determine the category folder for a given file
 * @param {string} fileName - The name of the file
 * @returns {string} - The category folder name
 */
function getFileCategory(fileName) {
    const ext = path.extname(fileName).toLowerCase();

    for (const [category, config] of Object.entries(FILE_CATEGORIES)) {
        if (config.extensions.includes(ext)) {
            return config.folder;
        }
    }

    return 'Others';
}

/**
 * Create a folder if it doesn't exist
 * @param {string} folderPath - Path to the folder
 * @returns {Promise<boolean>} - Success status
 */
async function createFolderIfNotExists(folderPath) {
    try {
        await fs.mkdir(folderPath, { recursive: true });
        return true;
    } catch (error) {
        console.error(chalk.red(`Error creating folder ${folderPath}:`, error.message));
        return false;
    }
}

/**
 * Move a file from source to destination
 * @param {string} sourcePath - Source file path
 * @param {string} destinationPath - Destination file path
 * @returns {Promise<boolean>} - Success status
 */
async function moveFile(sourcePath, destinationPath) {
    try {
        await fs.rename(sourcePath, destinationPath);
        return true;
    } catch (error) {
        console.error(chalk.red(`Error moving file ${sourcePath}:`, error.message));
        return false;
    }
}

/**
 * Get all files in a directory (excluding subdirectories)
 * @param {string} dirPath - Directory path
 * @returns {Promise<string[]>} - Array of file names
 */
async function getFilesInDirectory(dirPath) {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        return items.filter(item => item.isFile()).map(item => item.name);
    } catch (error) {
        console.error(chalk.red(`Error reading directory ${dirPath}:`, error.message));
        return [];
    }
}

/**
 * Check if a path exists
 * @param {string} targetPath - Path to check
 * @returns {boolean} - Whether the path exists
 */
function pathExists(targetPath) {
    return existsSync(targetPath);
}

/**
 * Categorize files by their type
 * @param {string[]} files - Array of file names
 * @returns {Object} - Object with categories as keys and file arrays as values
 */
function categorizeFiles(files) {
    const filesByCategory = {};

    for (const file of files) {
        const category = getFileCategory(file);
        if (!filesByCategory[category]) {
            filesByCategory[category] = [];
        }
        filesByCategory[category].push(file);
    }

    return filesByCategory;
}

module.exports = {
    getFileCategory,
    createFolderIfNotExists,
    moveFile,
    getFilesInDirectory,
    pathExists,
    categorizeFiles
};