import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import serve from 'rollup-plugin-serve';
import virtual from '@rollup/plugin-virtual';
import copy from "rollup-plugin-copy";

const devMode = process.env.mode === 'dev';

export default [

    /* ADMIN CONFIG */
    {
        input: "src/admin/src/index.ts",
        output: [
            {
                file: 'dist/admin/index.js',
                format: "esm",
                sourcemap: devMode,
            },
        ],
        plugins: [
            virtual({
                'react': `export default window.React`,
                'react-dom': `export default window.ReactDOM`,
            }),
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: devMode
            }),
            json({compact: true}),
            postcss(),
            !devMode && terser(),
            copy({
                // Copy certain files into the dist directory (this isn't admin specific but needs to be somewhere)
                targets: [
                    { src: "src/frontend/package.json", dest: "dist/frontend" },
                    { src: "src/component-types/**/*", dest: "dist/component-types" },
                    { src: "src/audience-criteria/**/*", dest: "dist/audience-criteria" },
                ],
            }),
            devMode && serve({
                // In dev mode, serve the dist directory (this isn't admin specific but needs to be somewhere)
                port: 10001,
                contentBase: 'dist',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            })
        ],
    },

    /* FRONTEND CONFIG */
    {
        input: "src/frontend/src/index.ts",
        output: [
            {
                file: 'dist/frontend/index.js',
                format: devMode ? 'iife' : 'esm',
                exports: 'named',
                sourcemap: devMode,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: devMode
            }),
            postcss(),
            !devMode && terser()
        ],
        external: ['react', 'react-dom'],
    }
];