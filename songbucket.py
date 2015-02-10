
import os

import newrelic.agent
from flask import Flask, render_template, jsonify, url_for, request

from model import database

##################################  Config  ###################################

newrelic.agent.initialize('newrelic.ini')

app = Flask(__name__)
app.config["SECRET_KEY"] = "d47d2b74ff64e5a6ae5aedd4edebeaf1"

try:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
    origin = "http://songbucket.joshasch.com"
except KeyError as error:
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://localhost:5432"
    origin = "http://localhost:5000"

database.db.init_app(app)

options = {
    'version': "0.0.1",
    'origin': origin
}

##################################  Pages  ####################################

@app.route('/')
def index():
    return render_template('index.html', options=options)

##############################  API Endpoints  ################################




#############################  Template Filters  ##############################




##################################  Main  #####################################

if __name__ == "__main__":
    app.run(debug=True)
