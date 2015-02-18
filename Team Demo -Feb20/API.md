## Documentation for the API provided by the Web-App-Store

####To fetch the users web-app

```GET http://<hostname:port>/web-app-store/user/<user-id>/web-app/<web-app-id>```


####To store the users web-app

```
POST http://<hostname:port>/web-app-store/user/<user-id>/web-app/<web-app-id>

HEADERS:
    contentType : text/html or text/plain

BODY: The users Web-App
```




