
const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
app.use(express.static('public'));


// let r = Math.random().toString(36).substring(3);
// console.log("random", r);


app.use(express.json({ limit: '10kb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api/:id',(request, response) =>{
    uId = request.params.id;
    //console.log(uId);
    database.find({finalUniqueId: uId},(err, data) =>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    })
    
});

app.post('/api',(request, response) =>{
    // console.log("i'm at /api");
    // console.log(request.body);
    const data = request.body;
    const timeStamp = Date.now();
    data.timeStamp = timeStamp;
    database.insert(data);
    
    //console.log(database);
    response.json({
        status: "success",
        // uniqueId: database.uniqueId,
        uniqueId: data.finalUniqueId,
        timeStamp: data.timeStamp,
        name: data.finalName,
        message: data.finalMessage
        
    });
});