from flask import Flask, render_template, session, redirect, url_for, request, Response, jsonify
from database_handler import database_handler
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get-boards")
def get_boards():
    board_data = database_handler("SELECT * FROM boards;")
    list_board_data = [list(element) for element in board_data]
    for element in list_board_data:
        x = element[0]
        card_data = database_handler("SELECT * FROM cards WHERE boards_id = {0};".format(x))
        element.append(card_data)
    return jsonify(data=list_board_data)
 

@app.route("/add-new-card", methods=["POST"])
def add_new_card():
    card_title = request.form['title']
    card_status = "new"
    card_board_id = request.form['board_id']
    database_handler("INSERT INTO cards (title, status, boards_id) VALUES \
                                        ('{0}', '{1}', '{2}');".format(card_title, card_status, card_board_id), 'write')
    card_id = database_handler("SELECT id FROM cards ORDER BY id DESC LIMIT 1;")
    return jsonify(data=card_id)


@app.route("/change-board-title", methods=['POST'])
def change_board_title():
    new_board_title = request.form['title']
    actual_board_id = request.form['boardId']
    database_handler("UPDATE boards\
                    SET title = '{0}'\
                    WHERE id={1};".format(new_board_title, actual_board_id), "write")

    return None


@app.route("/new-board", methods=["POST"])
def new_board():
    new_board_name = request.form["title"]
    database_handler("INSERT INTO boards (title, user_id) VALUES ('{0}', 1);".format(new_board_name), "write")
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route("/change-card-status", methods=["POST"])
def change_chard_status():
    card_id = request.form["cardId"]
    new_status = request.form["status"]
    database_handler("UPDATE cards\
                    SET status = '{0}'\
                    WHERE id={1};".format(new_status, card_id), "write")
    return "ok"



if __name__ == '__main__':
    app.run(debug=True)
