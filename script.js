document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.querySelector('.play');
    const progressBar = document.querySelector('.progress-bar');
    const playlistButtons = document.querySelectorAll('.play-song');
    const songTitle = document.querySelector('.song-title');
    const artistName = document.querySelector('.artist-name');
    const nextButton = document.querySelector('.next');
    const previousButton = document.querySelector('.previous');

    let isPlaying = false;
    let songDuration;
    let currentSongIndex = 0;

    function togglePlay() {
        if (!isPlaying) {
            audioPlayer.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        }
        isPlaying = !isPlaying;
    }

    function updateProgressBar() {
        const currentProgress = (audioPlayer.currentTime / songDuration) * 100;
        progressBar.style.width = `${currentProgress}%`;
    }

    function loadNextSong() {
        currentSongIndex++;
        if (currentSongIndex >= playlistButtons.length) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
    }

    function loadPreviousSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlistButtons.length - 1;
        }
        loadSong(currentSongIndex);
    }

    function loadSong(index) {
        const song = playlistButtons[index];
        audioPlayer.src = song.dataset.src;
        audioPlayer.load();
        audioPlayer.play();
        isPlaying = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        songTitle.textContent = song.dataset.title;
        artistName.textContent = song.dataset.artist;
    }

    playButton.addEventListener('click', togglePlay);

    audioPlayer.addEventListener('loadedmetadata', function() {
        songDuration = audioPlayer.duration;
    });

    audioPlayer.addEventListener('timeupdate', updateProgressBar);

    nextButton.addEventListener('click', loadNextSong);

    previousButton.addEventListener('click', loadPreviousSong);

    playlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = Array.from(playlistButtons).indexOf(this);
            loadSong(index);
        });
    });
});