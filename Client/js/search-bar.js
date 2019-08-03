( function() {
    let searchImg = document.getElementById('search-img');
    let searchBar = document.getElementById('search-bar');
    let confirmation = true;
    function showSearchBar() {
        searchBar.classList.remove('minified');
        searchBar.classList.add('maxified');
        searchBar.setAttribute('aria-label', 'open');
        //minified
        console.log('minified');
    }

    function hideSearchBar() {
        searchBar.classList.remove('maxified');
        searchBar.classList.add('minified');        
        searchBar.setAttribute('aria-label', 'close');
        //maxified
        console.log('maxified');

    }

    function manageSearchBar() {
        if (confirmation) {
            showSearchBar();
        } else {
            hideSearchBar();
        }

        confirmation = !confirmation;
    }

    searchImg.addEventListener('click', manageSearchBar);
})();