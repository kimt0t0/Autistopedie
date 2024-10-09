const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? '/magic-staples/' : '/',
    transpileDependencies: true,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/main.scss";`,
            },
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/main.scss";`,
            },
        },
    },
});
