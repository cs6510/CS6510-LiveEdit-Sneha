from flask import Flask, request, send_from_directory
import os



app = Flask(__name__);
root = os.path.join(os.path.dirname(os.path.abspath(__file__)));


@app.route("/")
def hello():
    return "Hello World! from server 1 "

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(root, path)


if __name__ == "__main__":
    app.run(port=3001, host="0.0.0.0")
