var stk500v1 = require('./stk500v1.js');

stk500v1.enableDebug();
stk500v1.setPort('/dev/tty.usbmodem1411');
stk500v1.setData('./firmware.hex');
stk500v1.write();
