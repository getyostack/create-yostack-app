#!/usr/bin/env node

const tar = require('tar');
const http = require('http');
const https = require('https');
const args = process.argv.slice(2, process.argv.length);
const appDir = process.cwd();

if (args.length < 2) {
    console.error("[ERROR] Missing arguments.");
    process.exit(1);
}

const customApp = 'custom' === args[0];
const deploymentKey = args[1];
const inDevMode = args.length > 2 && args[2] === 'dev';

const includeFiles = [
    `${appDir}/src`
];

if (customApp) {
    includeFiles.push(
        `${appDir}/dist/admin`,
        `${appDir}/dist/frontend`
    );
}

const filter = (path, stat) => {
    return !path.includes('node_modules');
};

run();

async function run() {
    console.log('Creating release package and uploading to server...');

    try {
        sendData();
    } catch (err) {
        console.error('[ERROR] Release request failed.', err);
        process.exit(1);
    }
}

function sendData() {
    const fileReadStream = tar.create(
        {
            gzip: true,
            sync: true,
            filter: filter
        },
        includeFiles
    );

    const fileBuffer = fileReadStream.read();

    const postData = JSON.stringify({
        fileBase64: fileBuffer.toString('base64')
    });

    const requestOptions = {
        hostname: inDevMode ? 'localhost' : 'api.yostack.com',
        port: inDevMode ? 4005 : 443,
        path: '/public/api/1/apps/release',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Deployment-Key': deploymentKey
        }
    };

    const protocol = inDevMode ? http : https;

    const req = protocol.request(requestOptions, (res) => {
        const statusCode = res.statusCode;

        if (statusCode !== 200) {
            console.error(`[ERROR] Release request failed with status code ${statusCode}.`);
        } else {
            console.log('Success! You can publish your app in the YoStack admin.');
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            if (statusCode !== 200) {
                try {
                    console.error('Error:', JSON.parse(rawData));
                } catch (e) {
                    console.error('Error:', rawData);
                }
            }
        });
    });

    req.on('error', (err) => {
        console.log('[ERROR] Request failed.', err);
    });

    req.write(postData);
    req.end();
}