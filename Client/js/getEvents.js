( function() { 
    function getInitialData() {
        fetch('localhost:2316/api/v1/months')
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .catch(function(error) {
                console.log('No se pudo acceder a los eventos' + error.error);
            });

        }
    
    var events = getInitialData();
    
    function validate(now) {
        if (events.data) {
            events = events.data;
            events.forEach(function() {
                const date = events.date;
                // var a = document.querySelector('a[data-a="1"]');
                // document.querySelectorAll("[data-foo='1']")
                const container = document.querySelector('[data-day="'+ date +'"]');
                if (container) {
                    const event = document.createElement(div);
                    event.classList.add('event');
                    container.appendChild(event);
                }
            }) 
        }

        events = false;

    }
    
    validate();
    module.exports = {
        getInitialData,
        validate
    };


    
})();