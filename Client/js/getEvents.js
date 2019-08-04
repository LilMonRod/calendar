( function() { 
    function getInitialData() {
        // localhost:2316/api/v1/months
        // localhost:2316/api/v1/events?search=text
        fetch('localhost:2316/api/v1/months')
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .catch(function(error) {
                console.log('No se pudo acceder a los eventos' + error.error);
            });
        }
    
    let events = getInitialData();
    

    
})();