//api comes here
const APIController = (function() {
    
    const clientId = '46df134103fc4119bf515625f8280155'; // annetaan spotify kredentiaalit
    const clientSecret = '2ee599abe5434cbcaaf2401ce5a9b622'; // annetaan spotify kredentiaalit

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

    const _getCategories = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getCategoryPlaylists = async (token) => {
        category_id = "0JQ5DAudkNjCgYMM0TZXDw";
        const limit = 10;
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=${limit}`, { // käytetään template literaalia, jolloin funktion parametrin voi syöttää suoraa merkkijonoon
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    } 

    return {
        getToken() {
            return _getToken();
        },
        getCategories(token) {
            return _getCategories(token);
        },
        getCategoryPlaylists(token, category_id) {
            return _getCategoryPlaylists(token, category_id);
        }
    }
})();

// testailua, logataan konsoliin apin palauttamaa dataa
APIController.getToken().then(token => {
    APIController.getCategories(token).then(categories => {
        console.log(categories); // Log categories
        const categoryId = categories[5].id; // Assuming you want to get playlists for the first category
        APIController.getCategoryPlaylists(token, categoryId).then(playlists => {
            console.log(playlists); // Log playlists
        });
    });
});
