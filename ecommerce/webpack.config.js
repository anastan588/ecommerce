const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
        }),
    ],
    externalsPresets: {
        node: true,
    },
    externals: {
        // You can use `false` or other values if you need something strange here,example will output `module.exports = {};`
        'node:path': '{}',
    },
};
