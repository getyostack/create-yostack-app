#!/usr/bin/env node

const { exec, execSync } = require('child_process');
const replace = require('replace-in-file');
const args = process.argv.slice(2, process.argv.length);
const cwd = process.cwd();
const scriptDirPath = __dirname;

if (!args.length) {
    console.log('Missing app directory name. Usage: create-yostack-app <app-name>');
    process.exit(1);
}

const appName = args[0];

if (appName.indexOf(' ') !== -1) {
    console.log('[ERROR] App name cannot contain spaces.');
    process.exit(1);
}

const appDir = `${cwd}/${appName}`;
const templateDir = `${scriptDirPath}/../templates/ts`;

createAppDirectory(
    () => copyTemplates(
        () => updateFiles(
            () => npmInstall(done)
        )
    )
);

function createAppDirectory(callback) {
    exec(`mkdir ${appDir}`, callback);
}

function copyTemplates(callback) {
    exec(`cp -R ${templateDir}/. ${appDir}`, callback);
}

function updateFiles(callback) {
    const options = [
        {
            files: [
                `${appDir}/package.json`,
                `${appDir}/package-lock.json`,
                `${appDir}/src/_static/component-types/example.component-type.json`,
                `${appDir}/src/_static/audience-criteria/example.criteria.json`,
                `${appDir}/src/admin/index.ts`,
                `${appDir}/src/frontend/index.ts`,
                `${appDir}/src/frontend/components/example.component.tsx`,
                `${appDir}/src/shared/constants.ts`,
            ],
            from: /{{appName}}/g,
            to: appName
        }
    ];
    try {
        for (const opt of options) {
            replace.sync(opt);
        }
    } catch (error) {
        console.error('[ERROR] Error occurred:', error);
        process.exit(1);
    }
    callback();
}

function npmInstall(callback) {
    console.log('Created app directory');
    console.log('Installing dependencies...');
    // TODO Probably replace with "npm ci" once dependencies aren't changing as much. Will require a package.lock.json.
    execSync(`npm install --force`, { cwd: appDir, stdio: ['pipe', 'ignore', 'pipe'] });
    console.log('Installed dependencies');
    callback();
}

function done() {
    console.log('All done!');
}