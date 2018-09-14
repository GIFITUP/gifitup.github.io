var apikey = 'EOvxPf7jMMtXmpW6GVGndluHTFeJdFd6';

$(document).ready(function() {
  
  /* 
  * The following two functions are used for making the API call using
  * pure Javascript. I wouldn't worry about the details
  */

  function encodeQueryData(data)
  {
     var ret = [];
     for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
     return ret.join("&");
  }

  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous 
      xmlHttp.send(null);
  }

  /*
  * The following functions are what do the work for retrieving and displaying gifs
  * that we search for.
  */

  function getGif() {
    var params = { 'api_key': apikey};
    params = encodeQueryData(params);

    // api from https://github.com/Giphy/GiphyAPI#search-endpoint 
    // http://api.giphy.com/v1/gifs/random?
    httpGetAsync('http://api.giphy.com/v1/gifs/random?', function(data) {
      var gifs = JSON.parse(data);
      var firstgif = gifs.data[0].bitly_gif_url;
      $("#image").html("<img src='" + firstgif + "'>");
      console.log(gifs.data);
    });
  }

  $("#submitButton").on("click", function() {
    getGif();
  });
})
