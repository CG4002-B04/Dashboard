const childProcess = require('child_process');
// To call NodeJS Script from a NodeJS Script
exports.runScript = function runScript(scriptPath, callback) {
    // keep track of whether callback has been invoked to preven mutliple invocations
    let invoked = false;

    let process = childProcess.fork(scriptPath);

    // listen for errors as they may preven the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    })

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        const err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });
}