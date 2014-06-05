// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var currentVideoId;
var nextVideoId;
var autoplay = false;
var repeat = false;

// Replace the '#video' element with an <iframe> and
// YouTube player after the API code downloads.
function onYouTubePlayerAPIReady() {
	currentVideoId = 'btPJPFnesV4';

	player = new YT.Player('video', {
		height: '281',
		width: '500',
		playerVars: {
			playsinline: 1,
			controls: 0,
			enablejsapi: 1,
			modestbranding: 1,
			//autoplay: 1,
			rel: 0,
		},
		videoId: currentVideoId,
		events: {
      		'onStateChange': onPlayerStateChange
    	}
	});
}

function getFirstVideoFromApi() {
	return '';
}

function getNextVideoFromApi() {
	nextVideoId = '';
}

function loadNextVideo() {
	player.cueVideoById({'videoId': nextVideoId});
	currentVideoId = nextVideoId;
	nextVideoId = getNextVideoFromApi();
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.CUED) {
		event.target.playVideo();
	} else if (event.data == YT.PlayerState.ENDED && (autoplay || repeat)) {
		if (autoplay) {
			loadNextVideo();
		} else if (repeat) {
			nextVideoId = currentVideoId;
			loadNextVideo();
		}
	}
}

function togglePlayPause() {
	if (player.getPlayerState() == YT.PlayerState.PLAYING) {
		player.pauseVideo();
	} else if (player.getPlayerState() == YT.PlayerState.PAUSED) {
		player.playVideo();
	}
}

function rewind30Seconds() {
	var currentPosition = player.getCurrentTime();
	var newPosition = (currentPosition - 30 > 0) ? currentPosition - 30 : 0;
	player.seekTo(newPosition);
}

function toggleRepeat() {
	repeat = !repeat;
	if (repeat) {
		autoplay = false;
	}
}

function toggleAutoplay() {
	autoplay = !autoplay;
	if (autoplay) {
		repeat = false;
	}
}

function toggleMute() {
	if (player.isMuted()) {
		player.unMute();
	} else {
		player.mute();
	}
}

function setVolume(volume) {
	player.setVolume(volume);
}

function getVolume() {
	return player.getVolume();
}

function showErrorCard() {
	var number = Math.floor(Math.random() * 3);
	var html = '<img src="/static/error' + number + '.png" />';
	document.getElementById('error').innerHTML = html;
}

function hideErrorCard() {
	document.getElementById('error').innerHTML = '';
}