from datetime import timedelta
from flask import Flask, request, send_from_directory, make_response, current_app
from functools import update_wrapper
import os
import memcache

mc = memcache.Client(['127.0.0.1:11211'], debug=0)

# used crossdomain from http://flask.pocoo.org/snippets/56/
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


db = {};

def generate_key(user_id,webapp_id):
    return "user_id:" + user_id + "webapp_id:" + webapp_id


app = Flask(__name__);
root = os.path.join(os.path.dirname(os.path.abspath(__file__)));

@app.route("/")
@crossdomain(origin='*')
def hello():
    return "Hello World! from server 2 "



@app.route('/web-app-store/user/<user_id>/web-app/<web_app_id>', methods=['GET'])
@crossdomain(origin='*')
def get_user_web_app(user_id,web_app_id):
    key = generate_key(user_id,web_app_id)
    val = mc.get(key.encode('utf-8'))
    if val is None:
        response = make_response('',404)
    else:
        response = make_response(val,200)
    response.headers['Content-type'] = 'text/html'
    return response

@app.route('/web-app-store/user/<user_id>/web-app/<web_app_id>', methods=['POST'])
@crossdomain(origin='*')
def post_user_web_app(user_id,web_app_id):
    key = generate_key(user_id,web_app_id)
    value = mc.set(key.encode('utf-8'),request.data.encode('utf-8'))
    print request.data
    print value
    if value > 0:
        response = make_response('',204)
    else:
        response = make_response('',500)
    response.headers['Content-type'] = 'text/html'
    return response


@app.route('/<path:path>', methods=['GET'])
@crossdomain(origin='*')
def static_proxy(path):
    return send_from_directory(root, path)




if __name__ == "__main__":
    app.run(debug=True,port=3002)
