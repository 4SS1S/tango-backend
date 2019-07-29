const express = require("express");
const webtorrent = require("webtorrent");
require('express-group-routes');

const MovieController   = require('./controllers/MovieController');
const SerieController   = require('./controllers/SerieController');
const SeasonController  = require('./controllers/SeasonController');
const EpisodeController = require('./controllers/EpisodeController');
const VideoController   = require('./controllers/VideoController');


const Router = express.Router();
const client = new webtorrent();

let stats = {
	progress: 0,
	downloadSpeed: 0,
	ratio: 0
}
let error_message = "";
client.on('error', function(err) {
	error_message = err.message;
});

Router.get("/",(req,res) => {
    res.send("ok")
});

client.on('download', function(bytes) {
	stats = {
		progress: Math.round(client.progress * 100 * 100) / 100,
		downloadSpeed: client.downloadSpeed,
		ratio: client.ratio
	}
});

Router.get('/torrent/:magnet', (req,res) => {
    const magnet = req.params.magnet;
    let files = [];

    if((client.get(magnet)) == null){
        client.add(magnet,async(torrent) => {
            torrent.files.forEach(async(data) => {
                files.push({
                    name: data.name,
                    length: data.length
                });
            });
            
            res.status(200);
            res.send(files);
        });
    }else{
        for(i = 0; i < client.get(magnet).files.length; i++)
        {
            files.push({
                name: client.get(magnet).files[i].name,
                length: client.get(magnet).files[i].length
            })
        }

        res.status(200);
        res.send(files);
    }
});


Router.get('/stream/:magnet/:file_name', (req,res,next) => {
    const magnet   = req.params.magnet;
    const filename = req.params.file_name;
    let range      = req.headers.range;
    let file       = {};

    if((client.get(magnet)) == null){
        client.add(magnet,torrent => {
            torrent.files.forEach(data => {
                if(data.name == filename){
                    file = data;

                    if(!range)
                    {
                        return true;
                    }
                    
                    let positions = range.replace(/bytes=/, "").split("-");
                    let start = parseInt(positions[0], 10);
                    let file_size = file.length;
                    let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
                    let chunksize = (end - start) + 1;
                    let head = {
                        "Content-Range": "bytes " + start + "-" + end + "/" + file_size,
                        "Accept-Ranges": "bytes",
                        "Content-Length": chunksize,
                        "Content-Type": "video/mp4"
                    }
                    res.writeHead(206, head);
                    let stream_position = {
                        start: start,
                        end: end
                    }

                    let stream = file.createReadStream(stream_position);
                    stream.pipe(res);
                    stream.on("error", function(err) {
                        return next(err);
                    });
                }
            });
        });
    }else{
        for(i = 0; i < client.get(magnet).files.length; i++)
        {
            if(client.get(magnet).files[i].name == filename){
                file = client.get(magnet).files[i];

                if(!range)
                {
                    return true;
                }
                
                let positions = range.replace(/bytes=/, "").split("-");
                let start = parseInt(positions[0], 10);
                let file_size = file.length;
                let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
                let chunksize = (end - start) + 1;
                let head = {
                    "Content-Range": "bytes " + start + "-" + end + "/" + file_size,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/mp4"
                }
                res.writeHead(206, head);
                let stream_position = {
                    start: start,
                    end: end
                }
            
                let stream = file.createReadStream(stream_position);
                stream.pipe(res);
                stream.on("error", function(err) {
                    return next(err);
                });
            }
        }
    }
});

Router.get('/errors', function(req, res, next) {
	res.status(200);
	res.json(error_message);
});

Router.get('/stats', function(req, res, next) {
	res.status(200);
	res.json(stats);
});

function readdata(range,file,res){
    if(!range)
	{
		return true;
    }
    
    let positions = range.replace(/bytes=/, "").split("-");
    let start = parseInt(positions[0], 10);
    let file_size = file.length;
    let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
    let chunksize = (end - start) + 1;
    let head = {
		"Content-Range": "bytes " + start + "-" + end + "/" + file_size,
		"Accept-Ranges": "bytes",
		"Content-Length": chunksize,
		"Content-Type": "video/mp4"
    }
    res.writeHead(206, head);
    let stream_position = {
		start: start,
		end: end
    }

    let stream = file.createReadStream(stream_position);
    stream.pipe(res);
    stream.on("error", function(err) {
		return next(err);
    });
}

Router.group('/movies', router => {
    router.get('/',MovieController.index);

    router.post('/',MovieController.create);
});

Router.group('/serie', router => {
    router.get('/',SerieController.index);
    router.post('/',SerieController.create);

    router.get('/:serie',SeasonController.index);
    router.post('/:serie',SeasonController.create);

    router.get('/:serie/:season',SeasonController.index);
    router.post('/:serie/:season',EpisodeController.create);
});

Router.get('/season/:season',EpisodeController.index);

Router.get('/video/:id',VideoController.video);
Router.post('/video',VideoController.create);

module.exports = Router;
