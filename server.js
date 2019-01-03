var express = require('express');

const app = express();
var port = 3000;

app.use(express.static('dist'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`))