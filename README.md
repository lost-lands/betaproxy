# Beta Proxy
Simple HTTP Proxy for fixing server join sessions, skins, and cloaks (capes) in Minecraft Beta versions. There is both a NodeJS script or a nginx vhost that can be used.

## Usage

### NodeJS

To use, simply clone the repository, switch to the `node` directory, edit the port in proxy.js, and then run `npm install` and `npm start`

### NGINX

To use, download the vhost file in the nginx directory of this repository. Upload it to your nginx server, edit the port if you'd like, and restart.

### Using the Proxy in clients and servers

To use on clients and servers, pass the JVM arguments:
```
-Dhttp.proxyHost={IP}
-Dhttp.proxyPort={PORT}
```
Replacing {PORT} with the port you set in proxy.js and {IP} with the IP of the proxy.