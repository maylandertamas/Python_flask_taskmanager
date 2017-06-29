from flask import Flask, render_template, session, redirect, url_for, request, Response, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database_handler import database_handler


app = Flask(__name__)

app.secret_key = 'abcd1234'


@app.route("/")
def index(username=None, userid=None):
    if 'username' in session and 'userid' in session:
        username = session['username']
        userid = session['userid']
    else:
        username = None
        userid = None
    return render_template("index.html", username=username, userid=userid)


@app.route("/get-boards")
def get_boards():
    if 'userid' in session:
        board_data = database_handler("SELECT * FROM boards\
                                        WHERE user_id={0};".format(session['userid']))
        list_board_data = [list(element) for element in board_data]
        for element in list_board_data:
            x = element[0]
            card_data = database_handler("SELECT * FROM cards WHERE boards_id = {0};".format(x))
            element.append(card_data)
        return jsonify(data=list_board_data)
    else:
        return ""
 

@app.route("/add-new-card", methods=["POST"])
def add_new_card():
    card_title = request.form['title']
    card_status = "new"
    card_board_id = request.form['board_id']
    database_handler("INSERT INTO cards (title, status, boards_id) VALUES \
                                        ('{0}', '{1}', {2});".format(card_title, card_status, card_board_id), 'write')
    card_id = database_handler("SELECT id FROM cards ORDER BY id DESC LIMIT 1;")
    return jsonify(data=card_id)


@app.route("/change-board-title", methods=['POST'])
def change_board_title():
    new_board_title = request.form['title']
    actual_board_id = request.form['boardId']
    database_handler("UPDATE boards\
                    SET title = '{0}'\
                    WHERE id={1};".format(new_board_title, actual_board_id), "write")

    return "ok"


@app.route("/new-board", methods=["POST"])
def new_board():
    new_board_name = request.form["title"]
    database_handler("INSERT INTO boards (title, user_id) VALUES ('{0}', {1});".format(new_board_name, session['userid']), "write")
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route("/change-card-status", methods=["POST"])
def change_chard_status():
    card_id = request.form["cardId"]
    new_status = request.form["status"]
    database_handler("UPDATE cards\
                    SET status = '{0}'\
                    WHERE id={1};".format(new_status, card_id), "write")
    return "ok"


@app.route("/registration", methods=["POST"])
def registration():
    username = request.form['username']
    password = request.form['password']
    hashed_password = generate_password_hash(password, "pbkdf2:sha224", 1)
    print("registration in work")
    write_to_database = database_handler("INSERT INTO users (username, password)\
                    VALUES ($${0}$$, $${1}$$);".format(username, hashed_password), "write")

    if write_to_database == "error":
        return '<a href="/"><button href= class="btn btn-default">Back</button></a><p>Username already exists</p>'

    return redirect(url_for('index'))


@app.route("/login", methods=["POST"])
def login():
    username = request.form['username']
    password = request.form['password']
    user_db_data = database_handler("SELECT username, password, id FROM users\
                        WHERE username='{0}';".format(username))
    try:
        username_from_db = user_db_data[0][0]
    except IndexError:
        return '<a href="/"><button href= class="btn btn-default">Back</button></a><p>Username not found<p>' 
    else:
        user_pw_from_db = user_db_data[0][1]
        remove_white_spaces_from_pw = user_pw_from_db.strip()
        password_check = check_password_hash(remove_white_spaces_from_pw, password)
        if password_check:
            session['username'] = username_from_db
            session['userid'] = user_db_data[0][2]
        else:
            return '<a href="/"><button href= class="btn btn-default">Back</button></a><p>Invalid password<p>'

    return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('userid', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    

    app.run(debug=True)
