
## Summary

This project demonstrates the following
- how the live editor communication channel would work using postMessage.
- the usage of the [api](API.md) to POST users Web-App
- the usage of the [api](API.md) to GET users Web-App

#### The demo has been tested on
* Google Chrome 40.0.2214.94 (64-bit)
* Mozilla Firefox 35.0.1
* Safari 7.0.5

## Prerequisites:
you must have the following installed on your system.

* python >= 2.6
* [flask](http://flask.pocoo.org) >= 0.10
* [memcached](http://memcached.org/)
* [python memcached](http://pypi.python.org/pypi/python-memcached)

## To run:
Follow the steps

* run the following commands in the given sequence
  1. cd /path/to/live-editor-experiments
  2. python server1.py
  3. python server2.py

* Open http://localhost:3001/static1/live_editor_client.html

* for the communication channel demo
  - Press the Open Live Editor button.
  Note: On doing step c), if you were asked to enable popup
  refresh the live_editor_client page after enabling popups

  - Type some text in the text box next to the "send" button and press send.
  on pressing send the client sends the textbox contents message
  to the live editor. The live editor modifies the received message by
  appending "received" to it, then it sends the modified message back to
  the client which is displayed on the client screen

* for the web-app-store demo
   - Type some text in the text box next to the "store" button and press store
   - Switch to the live editor window/tab and press the fetch button
   - the text you stored in the live editor client window/tab.
     should now show up in the live editor window/tab

## API doc for web-app-store :

  [click here](API.md)


## Context

In production,
- server1 would be the Appinventor appengine.
- server2 would be running on the users machine.
- server2 would be responsible for storing the users Web-App,
thus server2 would be serving the users Web-App to the live editor.
- the POST API should be used by the Appinventor window/tab/client to
store the users Web-App
- the GET API would fetch the users Web-App.
