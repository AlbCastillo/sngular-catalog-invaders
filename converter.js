const csvToJson = require('csvtojson');
const ObjectsToCsv = require('objects-to-csv');

/**
 *  Convert CSV on Objects
 * @param {*} inputFile : CSV inputFile
 * @returns {Array} : JS objects
 */
const convertCSVToObjects = async (inputFile) => {
	try {
		const jsonArray = await csvToJson().fromFile(inputFile);
		return JSON.parse(JSON.stringify(jsonArray));
	} catch (error) {
		throw new Error(`ERROR CONVERTING JSON ${error.message}`);
	}
};

/**
 * Create CSV from Array Objects
 * @param {Array[]} objects : Objects to decode
 * @param {String} outputFilePath : CSV OUTPUT FILE PATH
 */
const getCSVResult = async (objects, outputFilePath) => {
	try {
		const csv = new ObjectsToCsv(objects);
		await csv.toDisk(outputFilePath);
	} catch (error) {
		throw new Error(`ERROR CONVERTING CSV ${error.message}`);
	}
};
module.exports = {
    convertCSVToObjects,
    getCSVResult

}