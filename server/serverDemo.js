/*
 * @Author: tsingwong 
 * @Date: 2017-11-23 16:18:31 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-23 21:24:57
 */
let express = require('express');
let app = express();
let fs = require('fs');

let user = {
    'user4': {
        'name': 'tsingwong',
        'password': '123456',
        'profession': 'teacher',
        'id': 4
    }
};

app.get('/foodList', (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        console.log(data);
        res.end(data);
    });
});

app.get('/addUser', (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', 'utf-8', (err, data) => {
        data = JSON.parse(data);
        data['user4'] = user.user4;
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

let delId = 2;
app.get('/deleteUser', (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        delete data['user' + delId];
        
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.get('/:id', (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let user = data['user' + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});




let server = app.listen(8081, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
