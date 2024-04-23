//api comes here
const APIController = (function() {
    
    const clientId = '46df134103fc4119bf515625f8280155';
    const clientSecret = '2ee599abe5434cbcaaf2401ce5a9b622';

    // private methods
    const _getToken = async () => {

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
    
    return {
        getToken() {
            return _getToken();
        }
    }
})();


//testi tuleeko token
APIController.getToken()
  .then(token => {
    console.log(token); 
  })
  .catch(error => {
    console.error('Error fetching token:', error);
  });
