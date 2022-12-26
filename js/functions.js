

// G
// CODE According to specification
function click_filter_element (event) {
  event.stopPropagation();
  event.currentTarget.classList.toggle("selected")
  update_programmes();

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  
}


// G
// CODE according to specification
function create_filter_element (data) {
  klass = data.class
  textContent = data.textContent
  parent = data.parent

  const dom = document.createElement("li");
  dom.classList.add(klass);
  dom.textContent = `${textContent}`;
  dom.addEventListener("click", (e)=>{
    click_filter_element(event)
  })
  parent.append(dom)

  return dom

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {


  filter_container_dom.addEventListener("click", ()=>{
    const list_of_filters = filter_container_dom.querySelectorAll("li")
    const list_of_selected_filters = filter_container_dom.querySelectorAll(".selected");
    if (list_of_selected_filters.length === list_of_filters.length) {
      list_of_filters.forEach(filter => {
        filter.classList.remove("selected")
      });

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

}



// VG
// CODE according to specifications
function toggle_cities (event) {
  const madridFilterElement = document.querySelector("#country_0 > ul > li");
  const nodeListOfCityFilters = document.querySelectorAll("#country_filter ul > div > ul > li")

  if (madridFilterElement.classList.contains("selected")) {
    nodeListOfCityFilters.forEach(cityFilter => {
      cityFilter.classList.remove("selected")
    });
  } else {
    nodeListOfCityFilters.forEach(cityFilter => {
      cityFilter.classList.add("selected")
  });
  }
  update_programmes();
  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */
}

// Kolla igenom uppgift nedan en gång till

// WRITE SPECIFICATION */
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city

function create_countries_cities_filters () {
    /*
    ARGUMENTS
      No argument used

    SIDE-EFFECTS
      creates "div" element containers containing countries with each country having a unique country 
      related ID. Each container is then filled with the name of the country aswell as 
      cities with matching countries id in their data.

    NO RETURN VALUE

  */
  function create_country (country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  };
      /*
    ARGUMENTS
      object containing country data

    SIDE-EFFECTS
      creates const dom, a "div" element containing a country with each country having a unique 
      country related ID.
      each country dom is added the two classes
        - "country"
        - "filter_container"
      the dom is then added to the country_filter container
      aswell as the country's name
      an array ( "cities" ) of each city with matching country ID is then made using "array_filter"
      with each city in "cities" is then place inside the country dom using the "create_city" function 

    NO RETURN VALUE

  */
  function create_city (city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }
        /*
    ARGUMENTS
      object containing city data

    SIDE-EFFECTS
      creates an "li" element using the "create_filter_element" function. 
      Sets the needed relevant data of 
        - parent (countryID)
        - class  ("selected")
        - textContent (name of the city)

      aswell as setting the ID as the unique city ID found in the city object

    NO RETURN VALUE

  */


  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.

function create_levels_filter () {
  function create_level (level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    }
    );
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter

function create_subjects_filter () {
  function create_subject (subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}

// Create Search Field

function create_language_filter () {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}


// Create filters abstracted  *

function create_filters(filter_type, DATA) {
  /*
    ARGUMENTS
      filter_type: The filter type is the name of the category which the filter should represent.
      Must be a string but not checked if true,
      DATA: Should be an array containing objects of relevant information to the filter_type
      the object must include the keys of:
      "name" & "id"

    SIDE-EFFECTS
      creates an li element for each object in DATA using the "create_filter_element" function,
      inside of the "create_filter" function.
      the li is appended to the "filter_type" parent
      the li textContent is set to the objects "name" key
      and the li dataset ID is set to the objects "id" key
      
    NO RETURN VALUE
*/

  function create_filter(data) {
    const dom = create_filter_element({
      parent: document.querySelector(`#${filter_type}_filter > ul`),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id
  }
  array_each(DATA, create_filter);
}


// G / VG (see details in specification)
// CODE according to specifications */
function create_programme (programme) {
      // programme constants: for programme information
      const programme_uniID = programme.universityID;
      const programme_cityID = UNIVERSITIES[programme_uniID].cityID;
      const programme_countryID = CITIES[programme_cityID].countryID;
      const programe_levelID = programme.levelID - 1;
      const programe_subjectID = programme.subjectID
      const programe_languageID = programme.languageID
      const programme_sun_index = CITIES[programme_cityID].sun
      const programme_sun_percentage = percenter(CITIES[programme_cityID].sun, 365)

      // Programme constants: for "show more" button
      const average_programme_grade = array_average(programme.entryGrades);
      const programme_Success_rate = array_average(programme.successRate)
      const exchange_ratio = `${programme.exchangeStudents}/${programme.localStudents}`;

      
      // Programme constants: for a random background image
      const BGimg_amount = COUNTRIES[programme_countryID].imagesNormal.length - 1
      const random_BG_ID = get_random_number(BGimg_amount, 0)
      const programme_backgroundImage = COUNTRIES[programme_countryID].imagesNormal[random_BG_ID]


  // programme create element & set attributes
  let new_programme_dom = document.createElement("div");
  new_programme_dom.classList.add("programme");
  new_programme_dom.setAttribute("id", `progamme${programme.id}`);


  // Programme inner-HTML
  new_programme_dom.innerHTML = `
    <div class="top">
      <h2>${programme.name}</h2>
      <p>${UNIVERSITIES[programme_uniID].name}</p>
      <p>${CITIES[programme_cityID].name}, ${COUNTRIES[programme_countryID].name}</p>
      <p> ${LEVELS[programe_levelID].name}, ${SUBJECTS[programe_subjectID].name}, ${LANGUAGES[programe_languageID].name}</p>
    </div>


      <div class="more_info">
       <div class="extra_info">
        <p>Average entry grade: ${average_programme_grade}</p>
        <p>Success rate: ${programme_Success_rate}%</p>
        <p>Exchange ratio: ${exchange_ratio}</p>
       </div>
      </div>



    <div class="bottom_programme">${COUNTRIES[programme_countryID].name}, sun-index: ${programme_sun_index}(${programme_sun_percentage}%)</div>`;


  // Programme show more button & content
    const showMoreButton = new_programme_dom.querySelector(".more_info");
    showMoreButton.addEventListener("click", ()=>{
      new_programme_dom.classList.toggle("show_more")
    });


  // Programme setting background-image
  new_programme_dom.style.backgroundImage = `url(/media/geo_images/${programme_backgroundImage})`
  document.querySelector("#programmes > ul").append(new_programme_dom);



/*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */


}


// G
// CODE according to the specification
function update_programmes () {
  const programmes_container = document.querySelector("#programmes")
  const programme_p = programmes_container.querySelector("p")
  const programme_list = programmes_container.querySelector("ul")
  programme_list.innerHTML = "";

  const valid_programmes = read_filters();
  console.log(valid_programmes.length);
  if (valid_programmes.length > 0) {
    programme_p.textContent = ""
    array_each(valid_programmes, create_programme)
  } else if (valid_programmes.length === 0) {
    programme_p.textContent = "Inga program uppfyller nuvarande filter."

  }

  // Update top images
  const header_images = document.querySelectorAll("#top_images > div");

  for (let i = 0; i < header_images.length; i++) {
    const random_city_images = CITIES[UNIVERSITIES[valid_programmes[get_random_number(valid_programmes.length - 1, 0)].universityID].cityID].imagesNormal
    const random_image_from_city = random_city_images[get_random_number(random_city_images.length - 1, 0)]
    console.log(random_image_from_city);
    header_images[i].style.backgroundImage = `url(/media/geo_images/${random_image_from_city})`
  }

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

}




// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters () {
    /*
      NO ARGUMENTS

      SIDE EFFECTS
      


        1.
        Kollar igenom vilka städer är "selected", för stad som har klassen "selected" tar deras id:n och gör om de till siffror via "callback_add_cityID" mha parseInt

        2.
        Loopar igenom "UNIVERSITES" för varje stad som är selected och alla med universitet med matchande cityID pushas läggs i "universities"

        3.
        Samma sak som 2 fast den loopar igenom alla program som har matchande universityID

        4.
        Kollar alla "level filter" som är selected och pushar deras ID som siffror till en array och sedan sist så mha funktionen "array_each" går den igenom alla sparade programme från 3 och ser om programmetns level är included i de valda levels

        5.
        Upprepa samma steg som 4 fast för languange sedan subject och sist strängen från search programmes

        6.
        Sist så returneras "programmes" dvs alla program som uppfyller alla kraven

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);

  programmes = filter_programmes_by_type("level", programmes);
  programmes = filter_programmes_by_type("language", programmes);
  programmes = filter_programmes_by_type("subject", programmes);

  // Abstraction
  function filter_programmes_by_type(filter_type, programmes) {
      if (filter_type === "subject") {
        test_function = function test_function_subject (programme) {
          return id_selected.includes(programme.subjectID);
        }
      } else if (filter_type === "language") {
        test_function = function test_function_language (programme) {
          return id_selected.includes(programme.languageID);
        }
      } else if (filter_type === "level") {
        test_function = function test_function_level (programme) {
          return id_selected.includes(programme.levelID);
        }
      }
     // ett argument: 
      const selected_dom = document.querySelectorAll(`#${filter_type}_filter li.selected`);
     //
      const id_selected = [];
      function callback_add_ID (dom_element) {
        const id_as_integer = parseInt(dom_element.dataset.id);
        id_selected.push(id_as_integer);
      }
      array_each(selected_dom, callback_add_ID);
    
    
    

      return programmes = array_filter(programmes, test_function);
  }


/*
  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);
*/


  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
