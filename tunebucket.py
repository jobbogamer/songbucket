from flask import Flask, render_template, flash, url_for, request, redirect, jsonify

app = Flask(__name__)

###############################################################################
# Routing Methods                                                             #
###############################################################################

@app.route('/')
def home():
	options = { }
	return render_template('index.html', options=options)

@app.route('/favourites')
def favourites():
	options = {	'title': "Favourites" }
	return render_template('favourites.html', options=options)

@app.route('/add')
def add_song():
	options = { 'title': "Add Song" }
	return render_template('add.html', options=options)

###############################################################################
# "Main"                                                                      #
###############################################################################

if __name__ == "__main__":
	app.run(debug=True)