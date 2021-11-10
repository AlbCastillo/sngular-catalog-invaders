const { convertCSVToObjects, getCSVResult } = require('./converter');
const _ = require('lodash');
/**
 * CODES USED BY THE HACKER
 *
 * PS: 01 => Binary but no in this code system.
 * PS1: 0123456789 =>It is redundant but I wanted included
 */
const codes = {
	'oF8': {
		'o': 0,
		'F': 1,
		'8': 2,
	},
	'01': {
		'0': 0,
		'1': 1,
	},
	'0123456789': {
		'0': 0,
		'1': 1,
		'2': 2,
		'3': 3,
		'4': 4,
		'5': 5,
		'6': 6,
		'7': 7,
		'8': 8,
		'9': 9,
	},
	'oi8': {
		'o': 0,
		'i': 1,
		'8': 2,
	},
	'54?t': {
		'5': 0,
		'4': 1,
		'?': 2,
		't': 3,
	},
	'kju2aq': {
		'k': 0,
		'1': 1,
		'j': 2,
		'u': 3,
		'2': 4,
		'a': 5,
		'q': 6,
	},
	'_- /.!#': {
		'_' :0,
		'-': 1,
		' ': 2,
		'/': 3,
		'.': 4,
		'.': 5,
		'!': 6,
		'#': 7,
	},
};

/**
 *  FUNCTION FOR DECODED SCORE
 * @param {string} score  => Coded score
 * @param {string} code  => Code used
 * @returns string      => Decoded score
 */
const decodeScore = (score, code) => {
    let decodedScore = '';
	score.split('').map((char) => {
		decodedScore += codes[code][char];
	});
	return parseInt(decodedScore);
};

/**
 * DECODE AND ORDER SCORES
 * @param {string} encodedScoresFile : CSV INPUT FILE
 * @param {string} decodedScoresFile  : CSV OUTPUT FILE
 */
const orderedScores = async (encodedScoresFile, decodedScoresFile) => {
    console.log(' DECODING START');
    try {
        const encodedScores = await convertCSVToObjects(encodedScoresFile);
        const decodedScores = encodedScores.map(element => {
            const decodedScore = decodeScore(element.SCORE, element.CODE);
            const result = {
                ...element,
                SCORE: decodedScore
            }
            return result;
        })
        const orderedScores = _.orderBy(decodedScores, 'SCORE', 'desc');
        await getCSVResult(orderedScores, decodedScoresFile);
        console.log(' DECODING FINISHED');
    } catch (error) {
        throw new Error(`ERROR Ordering Scores: ${error.message}`);
    }
}
module.exports = {
    orderedScores
}
