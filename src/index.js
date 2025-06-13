// Main module exports for programmatic usage
const OrganizerService = require('./services/organizerService');
const { FILE_CATEGORIES } = require('./config/fileCategories');
const {
    getFileCategory,
    createFolderIfNotExists,
    moveFile,
    getFilesInDirectory,
    pathExists,
    categorizeFiles
} = require('./utils/fileUtils');

module.exports = {
    OrganizerService,
    FILE_CATEGORIES,
    getFileCategory,
    createFolderIfNotExists,
    moveFile,
    getFilesInDirectory,
    pathExists,
    categorizeFiles
};