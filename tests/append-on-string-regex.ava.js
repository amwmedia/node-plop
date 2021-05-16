import fs from 'fs';
import path from 'path';
import AvaTest from './_base-ava-test';
const {test, mockPath, testSrcPath, nodePlop} = new AvaTest(__filename);

const plop = nodePlop(`${mockPath}/plopfile.js`);
const makeRegex = plop.getGenerator('make-regex');
const appendToRegex = plop.getGenerator('append-to-regex');

test('Check if regex file has been created', async function (t) {
	await makeRegex.runActions({regexName: 'test'});
	const filePath = path.resolve(testSrcPath, 'test.txt');

	t.true(fs.existsSync(filePath), filePath);
});


test('Check if entry will be appended with correct regex\'', async function (t) {
	await makeRegex.runActions({regexName: 'test1'});
	await appendToRegex.runActions({regexName: 'test1', name: 'regex', allowDuplicates: false});
	const filePath = path.resolve(testSrcPath, 'test1.txt');
	const content = fs.readFileSync(filePath).toString();
	
	t.is((content.match(/\{handle: "\[data-regex\]", require: Regex \}\\,/g) || []).length, 1);
});
