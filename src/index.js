"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // ✅ Import CORS
const booksRouter_1 = __importDefault(require("./router/booksRouter"));
const errorHandler_1 = require("./middleware/errorHandler");
const ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
const app = (0, express_1.default)();
const port = 8000;
// ✅ Enable CORS for your frontend (localhost:5173)
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Optional: only if you're using cookies
}));
app.use(express_1.default.json());
// ✅ Routes
app.use('/books', booksRouter_1.default);
// ✅ 404 handler
app.use((_req, _res, next) => {
    next(new ErrorHandler_1.default('Route not found', 404));
});
// ✅ Global error handler
app.use(errorHandler_1.errorHandler);
// ✅ Start server
app.listen(port, () => {
    console.log(`🚀 Backend running at http://localhost:${port}`);
});
