# -*- coding: utf-8 -*-

from flask import Flask, render_template, flash, url_for, request, redirect, jsonify
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)

###############################################################################
# Database Model                                                              #
###############################################################################

class Song(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	trackName = db.Column(db.String(512))
	artistName = db.Column(db.String(512))
	videoId = db.Column(db.String(32))

	def __init__(self, trackName, artistName, videoId):
		self.trackName = trackName
		self.artistName = artistName
		self.videoId = videoId

	def __repr__(self):
		return "[Song(%d) %s by %s]" % (self.id, self.trackName, self.artistName)

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