document.addEventListener("DOMContentLoaded", function() {
var list = document.querySelector('#list');
  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    datatype: 'json'
  }).done(function(data){
    for (i=0; i<data.candidates.length; i++){
      var candidate = data.candidates[i];
      var liTag = document.createElement('li');
      var formTag = document.createElement('form');
      var submitButton = document.createElement('input');
      var hiddenButton = document.createElement('input');
      formTag.method = 'POST';
      formTag.action = 'https://bb-election-api.herokuapp.com/vote';
      submitButton.type = "submit";
      hiddenButton.setAttribute('type', "hidden");
      hiddenButton.setAttribute('name', "name");
      hiddenButton.setAttribute('value', candidate.name);
      formTag.append(submitButton);
      formTag.append(hiddenButton);
      liTag.innerText = candidate.name + ', Votes: ' + candidate.votes;
      liTag.append(formTag);
      list.append(liTag);
      formTag.addEventListener('submit', function(event){
        event.preventDefault();
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          data: {'name':(this.querySelector('input[type=hidden]').value)},
          datatype: 'json'
        }).done(function(){
          var refreshButton = document.createElement('button');
          refreshButton.innerText = 'Refresh Vote Totals';
          refreshButton.addEventListener('click', function(){
            location.reload();
          });
          if (document.querySelector('button') === null){
          document.body.append(refreshButton)};
        }).fail(function(){});
      });
    };
  });
});
