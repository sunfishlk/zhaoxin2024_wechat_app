"use strict";
const common_vendor = require("../common/vendor.js");
const log = {
  debug() {
    const log2 = common_vendor.wx$1.getRealtimeLogManager ? common_vendor.wx$1.getRealtimeLogManager() : null;
    if (!log2)
      return;
    log2.debug.apply(log2, arguments);
  },
  info() {
    const log2 = common_vendor.wx$1.getRealtimeLogManager ? common_vendor.wx$1.getRealtimeLogManager() : null;
    if (!log2)
      return;
    log2.info.apply(log2, arguments);
  },
  warn() {
    const log2 = common_vendor.wx$1.getRealtimeLogManager ? common_vendor.wx$1.getRealtimeLogManager() : null;
    if (!log2)
      return;
    log2.warn.apply(log2, arguments);
  },
  error() {
    const log2 = common_vendor.wx$1.getRealtimeLogManager ? common_vendor.wx$1.getRealtimeLogManager() : null;
    if (!log2)
      return;
    log2.error.apply(log2, arguments);
  },
  setFilterMsg(msg) {
    const log2 = common_vendor.wx$1.getRealtimeLogManager ? common_vendor.wx$1.getRealtimeLogManager() : null;
    if (!log2 || !log2.setFilterMsg)
      return;
    if (typeof msg !== "string")
      return;
    log2.setFilterMsg(msg);
  },
  addFilterMsg(msg) {
    const log2 = common_vendor.wx$1.getRealtimeLogManager ? common_vendor.wx$1.getRealtimeLogManager() : null;
    if (!log2 || !log2.addFilterMsg)
      return;
    if (typeof msg !== "string")
      return;
    log2.addFilterMsg(msg);
  }
};
exports.log = log;
