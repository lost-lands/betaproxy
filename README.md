# Beta Proxy
Simple HTTP proxy extracted from lost-lands/betalauncher for use in external launchers and servers

To use, simply clone the repository, edit the port in proxy.js, and run `node proxy`.

To use on clients and servers, pass the JVM arguments:
```
-Dhttp.proxyHost=localhost
-Dhttp.proxyPort={PORT}
```
Replacing {PORT} with the port you set in proxy.js and localhost to the IP of the proxy if not running on the same machine. 
