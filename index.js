const path = require('path');
const { orderedScores } = require('./decoded');

const inputFile = path.join(__dirname, '/csv', 'encoded_scores.csv');
const outputFile = path.join(__dirname, '/csv', 'decoded_scores.csv');

orderedScores(inputFile, outputFile);
