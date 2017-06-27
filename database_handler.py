import psycopg2
import sys


def connect_to_database():
    try:
        conn = psycopg2.connect("dbname='proman' user=''")
    except psycopg2.Error as error:
        print("Couldn't connect to database")
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