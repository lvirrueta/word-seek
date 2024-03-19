"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = {
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map