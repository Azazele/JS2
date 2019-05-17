const express = require('express');
const fs = require('fs');
const app = express ();
app.use(express.json ());
app.use('/', express.static ('public'));


app.get ('/api/goods', (req, res) => {
    fs.readFile('server/db/goods.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({reuslt:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

app.get ('/api/basket', (req, res) => {
    fs.readFile('server/db/basket.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({reuslt:0, text: err}));
        } else {
            res.send(data);
        }
    })
});


const handler = require('./handler');

app.post ('/api/basket', (req, res) => {
    handler(req, res, 'add', 'server/db/basket.json')
});

app.delete ('/api/basket', (req, res) => {
    handler(req, res, 'del', 'server/db/basket.json')
});

app.put ('/api/basket/:gid', (req, res) => {
    handler(req, res, 'change', 'server/db/basket.json')
});

app.listen(3000, () => ('Listening at port 3000'));

