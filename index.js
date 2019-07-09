const createApp = require('./src/app');

(async () => {
    const app = await createApp();

    process.on('exit', app.stop);
    app.listen(3000);
})();
