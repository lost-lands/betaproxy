/*
proxy.js is used for proxying requests from the game and catching requests to http://minecraft.net
This is useful because old versions of the game used to send join server HTTP requests to minecraft.net
but this method has since moved to session.minecraft.net. The proxy will forward requests from the old URL
to the new.
*/
const express = require('express')
const app = express()
const request = require('request');
const port = 9000
    
app.get('/game/joinserver.jsp', (req, res) => { 
    console.log("Sending session details:")
    console.log("Username: " + req.query.user);
    console.log("Session ID: " +req.query.sessionId);
    console.log("Server ID: " +req.query.serverId);

    //Forward request to the proper session servers
    request(`http://session.minecraft.net/game/joinserver.jsp?user=${req.query.user}&sessionId=${req.query.sessionId}&serverId=${req.query.serverId}`).pipe(res);
})
app.get('/game/checkserver.jsp', (req, res) => { 
    console.log("Checking if player is on server:")
    console.log("Username: " + req.query.user);
    console.log("Server ID: " +req.query.serverId);

    //Forward request to the proper session servers
    request(`http://session.minecraft.net/game/checkserver.jsp?user=${req.query.user}&serverId=${req.query.serverId}`).pipe(res);
})
app.get(['/MinecraftSkins/:username', '/skin/:username'], (req, res) => {
    console.log('Getting skin for '+req.params.username.slice(0, -4));

    //Forward skin request to minotar to fix skins
    request('https://minotar.net/skin/'+req.params.username).pipe(res);
})
app.get(['/cloak/get.jsp'], (req, res) => {
    console.log('Getting cloak for '+req.query.user);

    //Forward cloak request to Lost Lands' Cloak API to fix cloaks
    request('http://cloaks.lostlands.co/get.php?user='+req.query.user).pipe(res);
})

app.get('*', (req, res) => { //Deny all other HTTP requests
    res.send(null);
})

app.listen(port, () => {
  console.log(`Beta proxy server running on port ${port}`)
})