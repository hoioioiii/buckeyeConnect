import os

# MYSQL_CONFIG = {
#     'host': 'localhost',
#     'user': 'user',
#     'password': 'userpassword',
#     'database': 'buckeyeconnect',
#     'port': 3306
# }
# Import api blueprint
from .api.feed.feed import feed_bp
from .api.local_data_apis.local_data import local_data_bp

from flask import Flask
# from flask_mysqldb import MySQL

app = Flask(__name__)

# Register api blueprint
app.register_blueprint(feed_bp, url_prefix='/api/feed')
app.register_blueprint(local_data_bp, url_prefix='/api/local_data')


# # MySQL configurations
# app.config['MYSQL_HOST'] = MYSQL_CONFIG['host']
# app.config['MYSQL_USER'] = MYSQL_CONFIG['user']
# app.config['MYSQL_PASSWORD'] = MYSQL_CONFIG['password']
# app.config['MYSQL_DB'] = MYSQL_CONFIG['database']
# app.config['MYSQL_PORT'] = MYSQL_CONFIG['port']

# mysql = MySQL(app)

# @app.route('/test_db')
# def test_db():
#     try:
#         cur = mysql.connection.cursor()
#         cur.execute('SELECT 1')
#         result = cur.fetchone()
#         cur.close()
#         return 'Database connection successful!'
#     except Exception as e:
#         return f'Database connection failed: {str(e)}'

if __name__ == '__main__':
    app.run(debug=True)