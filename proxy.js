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
app.get('/MinecraftSkins/:username', (req, res) => {
    console.log('Getting skin for '+req.params.username.slice(0, -4));

    //Forward skin request to minotar to fix skins
    request('https://minotar.net/skin/'+req.params.username).pipe(res);
})

app.get('/MinecraftResources/*', (req, res) => {
    /*
    The old minecraft resources URL used to be http://s3.amazonaws.com/MinecraftResources/
    That, however, does not exist anymore and has been moved to https://resources.download.minecraft.net
    This has been semi-fixed by Mojang. The client itself used to download these assets but now that's handled
    by the launcher since the old URL returns a 403. 

    This route just serves as a way to prevent console spam from multiple java.io.IOException from 403 response codes
    from the old URL.
    */
    res.send(null)
})

app.get('*', (req, res) => { //Forward all other HTTP requests
    request(req.url).pipe(res);
})

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`)
})