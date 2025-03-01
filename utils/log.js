export default {
  debug() {
    const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
    if (!log) return;
    log.debug.apply(log, arguments);
  },
  info() {
    const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
    if (!log) return;
    log.info.apply(log, arguments);
  },
  warn() {
    const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
    if (!log) return;
    log.warn.apply(log, arguments);
  },
  error() {
    const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
    if (!log) return;
    log.error.apply(log, arguments);
  },
  setFilterMsg(msg) { // 从基础库2.7.3开始支持
    const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
    if (!log || !log.setFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.setFilterMsg(msg);
  },
  addFilterMsg(msg) { // 从基础库2.8.1开始支持
    const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
    if (!log || !log.addFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.addFilterMsg(msg);
  }
};
