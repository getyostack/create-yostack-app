const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/frontend/src/index.ts',
    mode: 'development', // 'production'
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 5050,
        allowedHosts: 'all',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    plugins: [
        // Create frontend remote app
        new ModuleFederationPlugin({
            name: 'yostackApp',
            filename: 'yostackFrontendApp.js',
            exposes: {
                './App': './src/frontend/src/index',
            },
            shared: {
                react: {
                    requiredVersion: deps.react,
                    import: 'react', // the "react" package will be used a provided and fallback module
                    shareKey: 'react', // under this name the shared module will be placed in the share scope
                    shareScope: 'default', // share scope with this name will be used
                    singleton: true, // only a single version of the shared module is allowed
                },
                'react-dom': {
                    requiredVersion: deps['react-dom'],
                    singleton: true, // only a single version of the shared module is allowed
                },
                'react-modal': {
                    requiredVersion: deps['react-modal'],
                    singleton: true, // only a single version of the shared module is allowed
                },
            },
        }),
        // Create admin remote app
        new ModuleFederationPlugin({
            name: 'yostackAdminApp',
            filename: 'yostackAdminApp.js',
            exposes: {
                './App': './src/admin/src/index',
            },
            shared: {
                react: {
                    requiredVersion: deps.react,
                    import: 'react', // the "react" package will be used a provided and fallback module
                    shareKey: 'react', // under this name the shared module will be placed in the share scope
                    shareScope: 'default', // share scope with this name will be used
                    singleton: true, // only a single version of the shared module is allowed
                },
                'react-dom': {
                    requiredVersion: deps['react-dom'],
                    singleton: true, // only a single version of the shared module is allowed
                },
            },
        }),
    ],
};