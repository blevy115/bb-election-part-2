document.addEventListener("DOMContentLoaded", function() {
var im = document.querySelector('#im')
  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    datatype: 'json'
  }).done(function(data){
    for (i=0; i<data.candidates.length; i++){
      var candidate = data.candidates[i]
      var liTag = document.createElement('li');
      liTag.innerText = candidate.name + ', Votes: ' + candidate.votes;
      im.append(liTag)
    }
  })
});
