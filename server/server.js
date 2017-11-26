/*
 * @Author: tsingwong 
 * @Date: 2017-11-23 21:11:35 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-26 15:52:27
 */
let express = require('express');
let cors = require('cors');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
const util = require('util');
let moment = require('moment');

// create application/json parser
// 在提交之前需要指定http 请求头为 content-type=application/json
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// 如 form 表单的 submite 提交，默认就是使用这种格式
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

// 解决跨域问题
app.use(cors());

app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.post('/process_post', urlencodedParser, function (req, res) {

    // 输出 JSON 格式
    let response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

app.post('/order', jsonParser, (req, res) => {

    fs.open(__dirname + '/logs/' + moment().format('YYYYMMDDHHmmss') + '.log', 'w+', (err, fd) => {
        if (err) {
            console.log(err);
        } else {
            // Node.js 中对象 => JSON 不能使用 JSON.stringify()
            fs.writeFile(fd, util.inspect(req.body), (err,fd) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        fs.close(fd, (err, fd) => {
            if (err) {
                console.log(err);
            }
        });
    });
    res.end('提交成功');
});

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
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
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
