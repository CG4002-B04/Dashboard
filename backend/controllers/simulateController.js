const childProcess = require('child_process');

function runScript(scriptPath, callback) {
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
exports.simulateEval= async function(req, res, next) {
    runScript('../socket/evalClient.js', function(err) {
        if (err) {
            res.status(500).send({status: false, errors: "Something went wrong when starting simulation for evaluation data"});
        } 
        console.log('finished running simulation for evaluationClient ')
    })    
    res.status(200).send({status: true, comment: "Eval simulation data has finished running"});
}

exports.simulateAll = async function(req, res, next) {
    runScript('../socket/simulateClient.js', function(err) {
        if (err) {
             res.status(500).send({status: false, errors: "Something went wrong when starting overall data simulation "});
        }
        console.log('finished running overall simulation');
    })
    res.status(200).send({status: true, comment: "Overall data simulation has finished running"})
}