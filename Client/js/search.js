( function() { 
    let searchBar = document.getElementById('search-bar');
    let title = document.getElementById('title__info');
    let containerBTN = document.getElementById('container__btn');
    let container = document.getElementById('container');
    
    let buttonClose = document.createElement('button');
        buttonClose.classList.add('close');
        buttonClose.innerHTML = 'Close';

    function search(event) {
        event.preventDefault();

        data = manageValue(event.target.value);
        
        performanceData(data, event.target.value)
    
    }         
    function performanceData(data, searched) {
        resetContainer(true);
        if (data.success) {
            data = data.data;
            container.classList.add('events-list');
            container.innerHTML = '';

            data.forEach(function() {
                const cont = document.createElement('div');
                cont.classList.add('events-item');

                const title = document.createElement('h3');
                title.innerHTML = data.name;
                cont.appendChild(title);

                const date = document.createElement('p');
                date.innerHTML = data.date;
                cont.appendChild(date);


                if (data.favorite) {
                    const fav = document.createElement('div');
                    fav.classList.add('favorite');
                    cont.appendChild(fav);

                }
                if (data.notes) {
                    const notes = document.createElement('p');
                    notes.innerHTML = data.notes;
                    cont.appendChild(notes);
                }

                container.appendChild(cont);
              });
        } else {
            const title = document.createElement('h3');
            title.innerHTML = 'no se encontraron coincidencias a la busqueda: ' + searched;
            container.appendChild(title);
        }
        
    }
    function manageValue(value) {
        const url = 'localhost:5000/api/v1/events?search=' + value; 
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .catch(function(error) {
                console.log('Hubo un problema con la petición:' + error.error);
            });
    }

    function resetContainer(validator) {
        if (validator) {
            title.innerHTML = '';
            title.innerHTML = 'Search results:';
            
            containerBTN.innerHTML = '';
            container.innerHTML = '';
            containerBTN.appendChild(buttonClose);
        } else {
            title.innerHTML = '';
            title.innerHTML = 'Day activities';
            
            container.innerHTML = '';
            containerBTN.innerHTML = '';
        }
    }

    searchBar.onkeypress = function(event) {
        if (event.key == 'Enter') {
            search(event);
        }
    };

    buttonClose.addEventListener('click', function(){
        resetContainer(false);
    })
})();