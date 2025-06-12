from flask import Flask,render_template,request
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

@app.route('/classes', defaults={'course_types': "一般課程"})
# @app.route('/classes/<typesp>', defaults={'types': None})
@app.route("/classes/<course_types>")
def classes(course_types):
    print(course_types)
    conn= psycopg2.connect(conn_string)
    with conn.cursor() as cur:
        sql = """
        SELECT  DISTINCT "課程類別" FROM "進修課程" 
        """
        cur.execute(sql)
        # 取得所有資料
        temps = cur.fetchall()
    # print(temps)
    kinds= [kind[0] for kind in temps]  
    kinds.reverse() 
    
    with conn.cursor() as cur:
        sql_course = """
        SELECT
            課程名稱,
	        老師,
	        進修人數,
	        進修時數,
	        進修費用,
	        上課時間,
	        報名開始日期,
	        報名結束日期,
	        課程內容 ,
	        群組,
	        課程開始日期
        FROM "進修課程"
        WHERE
            課程類別 = %s
        ;
        """
        cur.execute(sql_course,(course_types,))
        # 取得所有資料
        course_data = cur.fetchall()
        page=request.args.get('page',1,type=int)  #從網址參數取得頁碼 預設1
        per_page=6   #每頁筆數
        total = len(course_data)
        total_pages= (total + per_page -1)  // per_page   #count_tt_pages
        # page =6
        start =(page-1)*per_page
        end= start +per_page
        items=course_data[start:end]
    
    
    # return render_template("classes.html.jinja2",kinds=kinds,course_data=course_data)
        # return render_template("classes.html.jinja2",kinds=kinds,course_data=items)
        return render_template("classes.html.jinja2",kinds=kinds,course_data=items,page=page,total_pages=total_pages)

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

