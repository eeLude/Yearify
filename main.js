// spotify API:n tunnistetiedot
    const clientId = '46df134103fc4119bf515625f8280155'; // annetaan spotify kredentiaalit
    const clientSecret = '2ee599abe5434cbcaaf2401ce5a9b622'; // annetaan spotify kredentiaalit

    //Funkio jolla saadaan spotifyn API-tokeni
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

    // Funktio Spotify-iframe-päivittämiseksi uudella kappale-ID:llä
    function updateSpotifyPlayer(trackId) {
        const spotifyPlayer = document.getElementById('spotifyPlayer');
        spotifyPlayer.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    }

    //Funktio hakemaan kappaleita vuoden, genren ja molempien perusteella
    async function searchTracks() { 
        const year = document.getElementById('yearInput').value;
        const genre = document.getElementById('genreInput').value;
      
        let query = '';
    //muodostetaan hakuquery käyttäjän syötteiden perusteella(vuosi, genre tai molemmat)
        if (year && genre) {
            query = `year:${year} genre:"${genre}"`;
        } else if (year) {
            query = `year:${year}`;
        } else if (genre) {
            query = `genre:"${genre}"`;
        } else {
            // Jos vuotta tai genreä ei ole annettu, näytetään käyttäjälle viesti
            const tracksList = document.getElementById('tracksList');
            tracksList.innerHTML = '<p>Please enter year or genre</p>';
            return;
        }
        //haetaan API-tokeni
        const token = await _getToken();
        //haetaan kappaleet Spotifyn API:sta muodostetun haun perusteella
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        //parsitaan vastauksen data
        const data = await response.json();
        //jos kappaleita ei löydy, näytetään käyttäjälle viesti
        if (!data.tracks || data.tracks.total === 0) {
            const tracksList = document.getElementById('tracksList');
            tracksList.innerHTML = '<p>No tracks found for the entered genre or year.</p>';
            return;
        }
        //lajitellaan kappaleet suosion perusteella
        console.log(data);
        const tracks = data.tracks.items.sort((a, b) => b.popularity - a.popularity); // sorttaus track popularity valuen mukaan

        //tyhjentää edelliset kappaleet listasta
        const tracksList = document.getElementById('tracksList');
        tracksList.innerHTML = '';
        //Näytetään Kappaleet käyttöliittymässä
        tracks.forEach(track => {
            const trackElement = document.createElement('div');
        //lisätään kappaleen kuva
            const imgElement = document.createElement('img');
            imgElement.src = track.album.images[0].url;
            imgElement.alt = 'Track Image';
            imgElement.style.width = '100px';
            trackElement.appendChild(imgElement);
        //lisätään kappaleen nimmi
            const nameElement = document.createElement('p');
            nameElement.textContent = "Song: " + track.name;
            trackElement.appendChild(nameElement);
        //lisätään esittäjän nimi
            const artistElement = document.createElement('p');
            artistElement.textContent = "Artist: " + track.artists.map(artist => artist.name).join(', ');
            trackElement.appendChild(artistElement);
        //lisätään nappi jolla voi lisätä kappaleen spotifyn embedded esikuunteluun
            const addButton = document.createElement('button');
            addButton.textContent = 'Preview';
            addButton.addEventListener('click', () => {
                updateSpotifyPlayer(track.id);
            });
            trackElement.appendChild(addButton);
    
            tracksList.appendChild(trackElement);
        });
    }

