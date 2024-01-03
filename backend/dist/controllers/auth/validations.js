"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

const Schema = _joi2.default.object({
  fullname: _joi2.default.string().alphanum().min(3).max(30),
  email: _joi2.default.string().email().required(),
  password: _joi2.default.string().min(3).required(),
});

exports. default = Schema;
