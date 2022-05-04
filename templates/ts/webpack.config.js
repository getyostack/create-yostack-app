const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const sharedModuleFederationConfig = {
    react: {
        import: 'react', // the "react" package will be used a provided and fallback module
        shareKey: 'react', // under this name the shared module will be placed in the share scope
        shareScope: 'default', // share scope with this name will be used
        singleton: true, // only a single version of the shared module is allowed
    },
    'react-dom': {
        singleton: true, // only a single version of the shared module is allowed
    },
    'react-modal': {
        singleton: true, // only a single version of the shared module is allowed
    },
};

module.exports = (env, argv) => {
    const mode = argv.mode || 'development';
    const port = argv.port || 5050;

    return {
        entry: './src/frontend/index.ts',
        mode: mode,
        target: 'web',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
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
            port: port,
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
                    './App': './src/frontend/index',
                },
                shared: {
                    ...sharedModuleFederationConfig,
                    '@yostack/sdk-frontend-react': {
                        singleton: true,
                    },
                },
            }),
            // Create admin remote app
            new ModuleFederationPlugin({
                name: 'yostackAdminApp',
                filename: 'yostackAdminApp.js',
                exposes: {
                    './App': './src/admin/index',
                },
                shared: {
                    ...sharedModuleFederationConfig,
                    '@yostack/sdk-admin-react': {
                        singleton: true,
                    },
                },
            }),
        ],
    };
};