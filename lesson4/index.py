from flask import Flask

app = Flask(__name__)

@app.route("/")
# def hello_world():
    # return "<p>Hello, World!</p>"
def index():
    return "<h1>Hello, Flask!</h1><p>這是我的第一頁</p>"
@app.route("/user")
def user():
    return "<h1>user! </h1><p>這是我的第2頁</p>"
@app.route("/product")
def product():
    return "<h1>product! </h1><p>這是我的第3頁</p>"