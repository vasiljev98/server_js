var fs = require('file-system');
var read = require('read-file');	
var express = require('express');
var app = express();
var multer	= require('multer')
var upload = multer({ dest: 'upload/' })


function read_file(filename){
	var buffer = read.sync(filename, 'utf8');
	return buffer
};

//console.log(read_file('foo.txt'))

function write_file(filename, file_content){
	 fs.writeFile(filename, file_content, function(err) {
	 })
};	 


//write_file('ddd/trololo.md', 'lololo3434');


app.get('/hi', function (req, res) {
	res.send('Hello World')
})
 
app.use(express.static('public'));

app.get('/', function(req, res) {
	 res.sendFile('public/index.html');
});

app.get('/download/:filename', function(req, res){
	var filename = req.params.filename
		var file = __dirname + '/download/' + filename;
	res.download(file); // Set disposition and send it.
});

app.post('/upload', upload.single('uploadcontent'), function(req, res) {
	fs.readFile(req.file.path, function (err, data) {
		var newPath = __dirname + 'upload' + req.file.originalname;

		fs.writeFile(newPath, data, function (err) {
			res.redirect("back");
		});
	});
});
console.log('server is running on port 3000')
app.listen(3000)


	