import sys
import os
import psycopg2
import urllib

"""
:Local connection to db

def connect_to_database():
    try:
        conn = psycopg2.connect("dbname='SI5_starwars' user=''")
    except psycopg2.Error as error:
        print("Couldn't connect to database")
        print(error)
        sys.exit(1)
    else:
        return conn
"""


def connect_to_database():
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
        conn = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
    except psycopg2.Error as error:
        print(error)
        sys.exit(1)
    else:
        return conn


def database_handler(command, command_type="read"):
    conn = connect_to_database()
    cur = conn.cursor()
    with conn:
        with cur:
            if command_type == "read":
                cur.execute(command)
                fetch_data = cur.fetchall()
                return fetch_data
            elif command_type == "write":
                try:
                    cur.execute(command)
                except (psycopg2.IntegrityError, psycopg2.DataError):
                    return "error"