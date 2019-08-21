let app = require('http').createServer(handler); //使用Node创建一个Http服务
let io = require('socket.io')(app); //此处为绑定上面创建的服务器
let fs = require('fs');

app.listen(3000);

var handler = (req, res) => {
    fs.readFile(__dirname + './index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    })
}
io.on('connection', (socket) => {
    socket.emit('news', {
        hello: 'world'
    });
    socket.on('my other event', (data) => {
        console.log(data);
    })
})