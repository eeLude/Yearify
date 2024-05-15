
    const clientId = '46df134103fc4119bf515625f8280155'; // annetaan spotify kredentiaalit
    const clientSecret = '2ee599abe5434cbcaaf2401ce5a9b622'; // annetaan spotify kredentiaalit

    
    const _getToken = async () => { // palauttaa api tokenin

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    async function searchTracks() { // hakee biisit annetun vuoden perusteella
        const year = document.getElementById('yearInput').value;
        const token = await _getToken();

        const response = await fetch(`https://api.spotify.com/v1/search?q=year:${year}&type=track`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        const tracks = data.tracks.items;

        const tracksList = document.getElementById('tracksList');
        tracksList.innerHTML = '';

        tracks.forEach(track => {
            const trackElement = document.createElement('div');

            const imgElement = document.createElement('img');
            imgElement.src = track.album.images[0].url;
            imgElement.alt = 'Track Image';
            imgElement.style.width = '100px';
            trackElement.appendChild(imgElement);

            const nameElement = document.createElement('p');
            nameElement.textContent = track.name;
            trackElement.appendChild(nameElement);

            const artistElement = document.createElement('p');
            artistElement.textContent = track.artists.map(artist => artist.name).join(', ');
            trackElement.appendChild(artistElement);

            tracksList.appendChild(trackElement);
        });
    }

    async function searchTracksByGenre() { // hakee biisit annetun genren perusteella
        const genre = document.getElementById('genreInput').value;
        const token = await _getToken();
    
        const response = await fetch(`https://api.spotify.com/v1/search?q=genre:"${genre}"&type=track`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    
        const data = await response.json();
        const tracks = data.tracks.items;
    
        const tracksList = document.getElementById('tracksList');
        tracksList.innerHTML = '';
    
        tracks.forEach(track => {
            const trackElement = document.createElement('div');
    
            const imgElement = document.createElement('img');
            imgElement.src = track.album.images[0].url;
            imgElement.alt = 'Track Image';
            imgElement.style.width = '100px';
            trackElement.appendChild(imgElement);
    
            const nameElement = document.createElement('p');
            nameElement.textContent = track.name;
            trackElement.appendChild(nameElement);
    
            const artistElement = document.createElement('p');
            artistElement.textContent = track.artists.map(artist => artist.name).join(', ');
            trackElement.appendChild(artistElement);
    
            tracksList.appendChild(trackElement);
        });
    }    