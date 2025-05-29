from flask import Flask,render_template
import os
from dotenv import load_dotenv
import psycopg2
from psycopg2 import OperationalError

# 載入 .env 檔案
load_dotenv()
conn_string = os.getenv('RENDER_DATABASE')


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html.jinja2")

@app.route("/classes")
def classes():
    name="Eileen"
    weekdays = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
    return render_template("classes.html.jinja2",name=name,weekdays=weekdays)

@app.route("/new")
def new():
    try:
        conn= psycopg2.connect(conn_string)
        # raise Exception("error fund")  #導到except:
        # print("連線成功")
        with conn.cursor() as cur:
            sql = """SELECT * FROM lnews 
                  order by pdate desc """
            cur.execute(sql)
        # 取得所有資料
            rows = cur.fetchall()
            # print(rows)
    except OperationalError as e:
        print("連線失敗")
        print(e)
        return render_template("error.html.jinja2",error_message="資料庫錯誤"),500
    except:
        # print("連線失敗")
        return render_template("error.html.jinja2",error_message="不明的錯誤"),500
    
    conn.close()
    # return render_template("new.html.jinja2",rows)
    return render_template("new.html.jinja2",rows=rows)

@app.route("/traffic")
def traffic():
    return render_template("traffic.html.jinja2")

@app.route("/contact")
def contact():
    return render_template("contact.html.jinja2")

