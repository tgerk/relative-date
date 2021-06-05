var test = require('./test'),
    startTS = (new Date).getTime();

test();

console.log('OK - '+( (new Date).getTime() - startTS )/1000+'s');
