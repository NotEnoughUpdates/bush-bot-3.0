"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const BotClient_1 = __importDefault(require("./client/BotClient"));
const client = new BotClient_1.default({ token: config_1.token, owners: config_1.owners });
client.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUF5QztBQUN6QyxtRUFBMEM7QUFFMUMsTUFBTSxNQUFNLEdBQWEsSUFBSSxtQkFBUSxDQUFDLEVBQUMsS0FBSyxFQUFMLGNBQUssRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFDLENBQUMsQ0FBQztBQUN2RCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b2tlbiwgb3duZXJzIH0gZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQgTUJDbGllbnQgZnJvbSAnLi9jbGllbnQvQm90Q2xpZW50JztcclxuXHJcbmNvbnN0IGNsaWVudDogTUJDbGllbnQgPSBuZXcgTUJDbGllbnQoe3Rva2VuLCBvd25lcnN9KTtcclxuY2xpZW50LnN0YXJ0KCk7Il19