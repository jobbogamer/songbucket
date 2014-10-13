// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var currentVideoId;
var nextVideoId;
var autoplay = false;
var repeat = false;
var progressSlider;
var volumeSlider;
var interval;

$(function() {
	progressSlider = $('#progress-slider').slider({ value: 0, disabled: true });

	volumeSlider = $('#volume-slider').slider({ value: 100, animate: true, range: "min", change: function(event, ui) {
			player.setVolume(ui.value);
		}
	});
});

// Replace the '#video' element with an <iframe> and
// YouTube player after the API code downloads.
function onYouTubePlayerAPIReady() {
	currentVideoId = 'DHlzIgSvnYc';
	nextVideoId = 'C11MzbEcHlw';

	player = new YT.Player('video', {
		height: '281',
		width: '500',
		playerVars: {
			playsinline: 1,
			controls: 0,
			enablejsapi: 1,
			modestbranding: 1,
			autoplay: 1,
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
	return '';
}

function loadNextVideo() {
	player.loadVideoById({'videoId': nextVideoId});
	currentVideoId = nextVideoId;
	nextVideoId = getNextVideoFromApi();
}

function repeatVideo() {
	player.loadVideoById({'videoId': currentVideoId});
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.CUED) {
		
	} else if (event.data == YT.PlayerState.ENDED && (autoplay || repeat)) {
		if (autoplay) {
			loadNextVideo();
		} else if (repeat) {
			repeatVideo();
		}
	} else if (player.getPlayerState() == YT.PlayerState.PAUSED) {
		var playPauseButton = document.getElementById('playpause-button');
		playPauseButton.innerHTML = playPauseButton.innerHTML.replace('pause', 'play');
		clearInterval(interval);
	} else if (player.getPlayerState() == YT.PlayerState.PLAYING) {
		var playPauseButton = document.getElementById('playpause-button');
		playPauseButton.innerHTML = playPauseButton.innerHTML.replace('play', 'pause');
		interval = setInterval(updateProgressBar, 1000);
	}
}

function togglePlayPause() {
	var playPauseButton = document.getElementById('playpause-button');
	if (player.getPlayerState() == YT.PlayerState.PLAYING) {
		player.pauseVideo();
	} else if (player.getPlayerState() == YT.PlayerState.PAUSED || player.getPlayerState() == YT.PlayerState.CUED ||
					player.getPlayerState() == YT.PlayerState.ENDED) {
		player.playVideo();
	}
}

function rewind10Seconds() {
	var currentPosition = player.getCurrentTime();
	var newPosition = (currentPosition - 10 > 0) ? currentPosition - 10 : 0;
	player.seekTo(newPosition);
}

function toggleRepeat() {
	repeat = !repeat;
	if (repeat) {
		autoplay = false;
		document.getElementById('autoplay-button').style.color = "#000000";
		document.getElementById('repeat-button').style.color = "#FF0025";
	} else {
		document.getElementById('repeat-button').style.color = "#000000";
	}
}

function toggleAutoplay() {
	autoplay = !autoplay;
	if (autoplay) {
		repeat = false;
		document.getElementById('repeat-button').style.color = "#000000";
		document.getElementById('autoplay-button').style.color = "#FF0025";
	} else {
		document.getElementById('autoplay-button').style.color = "#000000";
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
	$('#volume-slider').slider("value", volume);
	player.setVolume(volume);
}

function getVolume() {
	return player.getVolume();
}

function updateProgressBar() {
	var currentTime = player.getCurrentTime();
	var totalTime = player.getDuration();

	var currentMinutes = String(float2int(currentTime / 60));
	var currentSeconds = String(float2int(currentTime % 60));
	currentSeconds = (currentSeconds < 10) ? "0" + currentSeconds : currentSeconds;

	var totalMinutes = String(float2int(totalTime / 60));
	var totalSeconds = String(float2int(totalTime % 60));
	totalSeconds = (totalSeconds < 10) ? "0" + totalSeconds : totalSeconds;

	document.getElementById('current-time').innerHTML = currentMinutes + ":" + currentSeconds;
	document.getElementById('total-time').innerHTML = totalMinutes + ":" + totalSeconds;

	$('#progress-slider').slider("option", "max", totalTime);
	$('#progress-slider').slider("value", currentTime);
}

function float2int(value) {
	return value | 0;
}

function showErrorCard() {
	var number = Math.floor(Math.random() * 3);
	var html = '<img src="/static/error' + number + '.png" />';
	document.getElementById('error').innerHTML = html;
}

function hideErrorCard() {
	document.getElementById('error').innerHTML = '';
}
