const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'API-KEY',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

async function fetchData(artist) {
	const url = `https://spotify23.p.rapidapi.com/search/?q=${artist}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
	try {
		const response = await fetch(url, options);
		const result = await response.json();

		const nameOfArtist = document.getElementById('names');
		const nameArtist = document.getElementById('searchBar').value;
		nameOfArtist.innerHTML = nameArtist.toUpperCase();

        const artistImg = document.querySelector('.artistImg img');
        const imageUrl = result.albums.items[0].data.coverArt.sources.find(source => source.width === 300).url;
        artistImg.src = imageUrl;

		const albumList = document.querySelector('.albumList');
		const albumNames = result.albums.items.map(item => 
			`<li><div class="colorList"><img src="${item.data.coverArt.sources.find(source => source.width === 300).url}" alt="album"><h2>${item.data.name}</h2>(${item.data.date.year})</div></li>`);
		albumList.innerHTML = albumNames.join('');

		function msToTime(duration){
			var seconds = Math.floor((duration/1000)%60),
				minutes = Math.floor((duration/(1000*60))%60);
			
			minutes = (minutes<10) ? "0" + minutes : minutes;
			seconds = (seconds<10) ? "0" + seconds : minutes;
			return minutes + ":" + seconds
		}

        const trackList = document.querySelector('.trackList');
        const songNames = result.tracks.items.map(item => 
			`<li><img src="${item.data.albumOfTrack.coverArt.sources.find(source => source.width === 300).url}" alt="album"><h2>${item.data.name}</h2>(${msToTime(item.data.duration.totalMilliseconds)})</li>`);
        trackList.innerHTML = songNames.join('');

		const artistInfo = document.getElementById('informationList');
		const getInformation = result.topResults.featured.map(item => 
			`<li id="names">${item.data.name}</li>`);
		artistInfo.innerHTML = getInformation.join('');
	} 
	 catch (error) {
		console.error(error);
	}
}

const searching = document.getElementById('searchBtn');
const artistBar = document.getElementById('searchBar');

searching.addEventListener('click',() => {
	const artist = artistBar.value;
    fetchData(artist);
});

artistBar.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        const artist = artistBar.value;
        fetchData(artist);
    }
});