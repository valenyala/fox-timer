function msToMin(ms){
    return ms/1000/60;
}

function minToMs(min){
    return min*60*1000;
}

module.exports = {
    msToMin,
    minToMs
};