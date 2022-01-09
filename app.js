var express = require('express');
const app = express();
app.get('/', (req, res) => {
  for(let counter=0; counter<1e8; counter++){}
  res.send('hello world');
})

const cluster = require('cluster');
const os = require('os');
const numberOfCPUs = os.cpus().length;
//console.log(`Number of CPU ${numberOfCPUs}`);
if (cluster.isMaster) {
  for (let counter = 0; counter < numberOfCPUs; counter++) {
    cluster.fork();
  }
  cluster.on('exit',(worker, code, signal)=>{
    console.log(`worker with pid ${worker.process.pid} died`);
    cluster.fork();
  })
} else {
  app.listen(3000, () => {
    console.log(`server ${process.pid} listing on port 3000`);
  });
}
