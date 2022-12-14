"use strict";


/*

  Notice the images on the page header.

  G: The images can be hard-coded in the CSS (as background-image)
  VG: Every time the user selects / unselects one or more filter elements, the app
      shows three random images from all the possible country images.

*/

// Create Filter Elements
// create_levels_filter("level");
// create_subjects_filter("subject");
// create_language_filter("language");
create_filters("level", LEVELS);
create_filters("subject", SUBJECTS);
create_filters("language", LANGUAGES);
create_countries_cities_filters();


// Add Interaction of search field button
document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();


// VG
// Add Interaction of filter containers (select-deselect all filters in the container)
// Example: Click anywhere on the language-filter-container and all the language filters
// (spanska, svenska, engelska, franska) will toggle.
const filter_doms = document.querySelectorAll(".filter_container");
array_each(filter_doms, add_group_toggling)

// VG
// Add Interaction of button toggle-all-cities

=======
const toggleCitiesButton = document.querySelector("#country_filter > button");
toggleCitiesButton.addEventListener("click", toggle_cities)

