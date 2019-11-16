const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
  cleanStack: 3,
  verbosity: 3,
  activity: true,
  emoji: true,
});
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(reporter);
