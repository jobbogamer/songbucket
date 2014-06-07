# -*- coding: utf-8 -*-

from random import randint
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
	playCount = db.Column(db.Integer)

	def __init__(self, trackName, artistName, videoId):
		self.trackName = trackName
		self.artistName = artistName
		self.videoId = videoId
		self.playCount = 0

	def __repr__(self):
		return "[Song(%d) %s by %s]" % (self.id, self.trackName, self.artistName)

###############################################################################
# Database Interaction                                                        #
###############################################################################

def get_all_songs():
	songs = Song.query.all()
	songs = sorted(songs, key=lambda song: id)
	return songs

def get_all_songs_by_playcount():
	songs = Song.query.all()
	songs = sorted(songs, key=lambda song: playCount)
	return songs

def get_lowest_playcount():
	songs = get_all_songs_by_playcount()
	return songs[0].playCount

def get_songs_with_playcount(count):
	songs = Song.query.filter_by(playCount = count).all()
	return songs

def increment_playcount(songId):
	song = Song.query.filter_by(id = songId).first()
	song.playCount += 1
	db.session.commit()

def pick_song():
	songs = get_songs_with_playcount(get_lowest_playcount())
	index = randint(0, len(songs))
	song = songs[index]
	return song

def add_song(trackName, artistName, videoId):
	new_song = Song(trackName, artistName, videoId)
	db.session.add(new_song)
	db.session.commit()

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
def add():
	options = { 'title': "Add Song" }
	return render_template('add.html', options=options)

###############################################################################
# "Main"                                                                      #
###############################################################################

if __name__ == "__main__":
	app.run(debug=True)