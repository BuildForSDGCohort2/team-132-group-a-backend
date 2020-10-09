/*Export custom and own Class*/

/*Load DataBase Block class*/
exports.AsyncDb = require('./database/AsyncDb.js');
/*End DataBase Block class*/

/*Load Controller Block class*/
exports.MainController = require('./controller/MainController.js');
/*End Controller Block class*/

/*Load Files Block class*/
exports.FileUtils = require('./other/FileUtils.js');
exports.FileReader = require('./file/FileReader.js');
exports.FileWriter = require('./file/FileWriter.js');
exports.LanguageEn = require('./lng/en.js');
exports.LanguageFr = require('./lng/fr.js');
exports.PageManager = require('./manager/PageManager.js');
/*End Files Block class*/