/*
 * @Author: tsingwong 
 * @Date: 2017-11-23 21:11:35 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-23 21:34:57
 */
let express = require('express');
let app = express();
let fs = require('fs');

app.get('/commongoods', (req, res) => {
    fs.readFile(__dirname + '/' + 'commongoods.json', 'utf8', (err, data) => {
        // eslint-disable-next-line
        console.log('API msg: commongoods Done!');
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });

        res.end(data, 'utf8');

    });
});

app.get('/typeGoods', (req, res) => {
    fs.readFile(__dirname + '/' + 'typeGoods.json', 'utf8', (err, data) => {
        // eslint-disable-next-line
        console.log('API msg: typeGoods Done!');
        res.end(data);
    });
});

let server = app.listen(8083, () => {
    let host = server.address()
        .address;
    let port = server.address()
        .port;
    // eslint-disable-next-line
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
