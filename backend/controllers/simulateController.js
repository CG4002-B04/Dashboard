const io = require('socket.io-client')

const ENDPOINT = 'http://localhost:5000';
let socketClient = io(ENDPOINT);
const ENDPOINT_EVAL = 'http://localhost:5001'
let socketClientEval = io(ENDPOINT_EVAL);


exports.simulateEval= async function(req, res, next) {
    socketClientEval.emit('simulateEval', (error) => {
        if (error) {
            res.status(500).send({status: false, errors: error});
        }
    });
    res.status(200).send({status: true, comment: "Eval simulation data is running"});
}

exports.simulateAll = async function(req, res, next) {
    socketClient.emit('simulate', (error) => {
        if (error) {
            res.status(500).send({status: false, errors: error});
        }
    })
    res.status(200).send({status: true, comment: "Overall data simulation is running"})
}