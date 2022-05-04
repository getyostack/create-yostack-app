#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const https = require('https');
const args = process.argv.slice(2, process.argv.length);
const appDir = process.cwd();

if (args.length < 1) {
    console.error("[ERROR] Missing development key argument.");
    process.exit(1);
}

const deploymentKey = args[0];
const inDevMode = args.length > 1 && args[1] === 'dev';
const data = {
    componentTypes: [],
    audienceCriteria: []
};
let hasErrors = false;

const staticDir = `${appDir}/src/_static`;

readFilesAndParseData(`${staticDir}/component-types`, data.componentTypes);
readFilesAndParseData(`${staticDir}/audience-criteria`, data.audienceCriteria);

if (hasErrors) {
    console.error("[ERROR] Update aborted due to errors.");
    process.exit(1);
}

if (!data.componentTypes.length && !data.audienceCriteria.length) {
    console.error("Nothing to update.");
    process.exit(1);
}

if (data.componentTypes.length) {
    console.log(`Updating ${data.componentTypes.length} component type${data.componentTypes.length > 1 ? 's' : ''}`);
}
if (data.audienceCriteria.length) {
    console.log(`Updating ${data.audienceCriteria.length} audience criteria`);
}

sendData();


function readFilesAndParseData(path, dataArray) {
    try {
        fs.accessSync(path);
    } catch (err) {
        // no files to parse
        return;
    }

    let fileData;
    try {
        fileData = readFiles(path);
    } catch (err) {
        hasErrors = true;
        console.error(`[ERROR] Failed to read one or more files in directory ${path}`, err);
        return;
    }

    for (const filename in fileData) {
        try {
            const json = JSON.parse(fileData[filename]);
            dataArray.push(json);
        } catch (err) {
            hasErrors = true;
            console.error(`[ERROR] Failed to JSON parse file ${path}/${filename}`, err);
        }
    }
}

function readFiles(dirname) {
    const filenames = fs.readdirSync(dirname);
    const fileData = {};
    filenames.forEach(function(filename) {
        fileData[filename] = fs.readFileSync(`${dirname}/${filename}`, {encoding: 'utf-8'});
    });
    return fileData;
}

function sendData() {
    const postData = JSON.stringify(data);

    const requestOptions = {
        hostname: inDevMode ? 'localhost' : 'api.yostack.com',
        port: inDevMode ? 4005 : 443,
        path: '/public/api/1/apps/update-dev',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Deployment-Key': deploymentKey
        }
    };

    const protocol = inDevMode ? http : https;

    const req = protocol.request(requestOptions, (res) => {
        const statusCode = res.statusCode;
        res.setEncoding('utf8');

        const chunks = [];
        res.on('data', (chunk) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            const responseContent = Buffer.from(chunks.join()).toString();
            if (statusCode === 200) {
                const result = JSON.parse(responseContent);
                if (result.success) {
                    console.log('Update successful');
                } else {
                    console.log('Update failed with errors');
                    console.log(JSON.stringify(result, null, 2));
                }
            } else {
                console.error(`[ERROR] Request failed with status code ${statusCode}`);
                console.log(responseContent);
            }
        });
    });

    req.on('error', (err) => {
        console.log('[ERROR] Update request failed', err);
    });

    req.write(postData);
    req.end();
}