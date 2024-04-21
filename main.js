//api comes here

const APIController = (function() {
    // Käyttäjän spotify id:t
    const clientId = '';
    const clientSecret = '';

    // Yksityinen metodi jolla haetaan tokeni Spotfy apilta
    const _getToken = async () => {
        // Fetch pyyntö apin endpointtiin
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                // Authorization header with Basic Authentication
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            // Request body with grant_type parameter
            body: 'grant_type=client_credentials'
        });

        // Extract access token from the response
        const data = await result.json();
        return data.access_token;
    }

    

    return {
        getToken() {
            return _getToken();
        }
    }
})();
