module.exports = gaos_loadfile;

function gaos_loadfile(url,filename,debug) {
    var http = require('http');
    var https = require('https');
    var fs = require('fs');
    var web_request;
    //是否为https连接
    if(url.match(/^https/)){
        web_request = https;
    }else{
        web_request = http;
    }
    web_request.get(url, function (res) {
        var data = "";
        res.setEncoding("binary");
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            fs.writeFile(filename, data, 'binary', function (err) {
                if (err) {
                    debug&&console.log(err);
                } else {
                    //下载成功
                    debug&&console.log("load　file success!");
                }
            })
        })
    })
}

//var url = 'http://www.php100.com/uploadfile/2016/0602/20160602092815677.jpg';
//loadfile(url,'test.jpg');
