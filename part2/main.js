//we saved the <ul> element in a global variable so we can use it anywhere in the code
const ul_breeds = document.getElementById("ul_breeds");

// a function which is responsible to fetch data from server and pass it to parseJsonResponse() function
function getDogBreeds(){
  const allBreedsApiUrl = "https://dog.ceo/api/breeds/list/all";

  // we are using fetch api to make rest api calls. you can use axios .
  // we are also using promises here. 
  fetch(allBreedsApiUrl)
    .then(function(response){
      // we get raw response. need to first convert it into json format so we can use the data easily
      return response.json();
    })
    .then(function(json){
      // now we got the json . we can use this to update any data in html 
      console.log(json);

      //we don't want to write everything in callbacks so we gave the responsibility of showing data in html to a seperate function
      parseJsonResponse(json);
    })
    .catch(function(error){
      // if any error occurs like no internet connection then this callback will be called
      console.log(error);
      
    });
}

//a seperate function which is responsible to show the json data in html
function parseJsonResponse(json){

  //get the object containing all the breeds data
  var allBreedsData = json.message;

  // we need only breed names from this object which are actually all the keys of this object
  // so we can use Object.keys(object) function to get a list of all the keys in this object
  var breedsList = Object.keys(allBreedsData);

  //reset all the current items in the list if any
  ul_breeds.innerHTML="";

  //now we can iterate thriugh this list and show all the breed names in a list in html
  // we are using forEach loop. you can also use for loop
  breedsList.forEach(function(breed){
    //we use template literals to generate the html for our single list item
    var listItemHtml = `<li> ${breed} </li>`;
    // += is used to keep adding more list items in the list without removing the already available items in the list
    ul_breeds.innerHTML+=  listItemHtml;
  })
}

//call the getDogBreeds function whenever page loads
getDogBreeds();