document.addEventListener("DOMContentLoaded", function() {
var list = document.querySelector('#list');
  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    datatype: 'json'
  }).done(function(data){
    for (var i=0; i<data.candidates.length; i++){
      var candidate = data.candidates[i];
      var liTag = document.createElement('li');
      var formTag = document.createElement('form');
      var submitButton = document.createElement('input');
      var hiddenButton = document.createElement('input');
      var voteSpan = document.createElement('span')
      voteSpan.innerText = candidate.votes
      formTag.method = 'POST';
      formTag.action = 'https://bb-election-api.herokuapp.com/vote';
      submitButton.type = "submit";
      submitButton.value = "Vote"
      hiddenButton.setAttribute('type', "hidden");
      hiddenButton.setAttribute('name', "name");
      hiddenButton.setAttribute('value', candidate.name);
      formTag.append(submitButton);
      formTag.append(hiddenButton);
      liTag.innerText = candidate.name + ', Votes: ';
      liTag.append(voteSpan)
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
            $.ajax({
              url: 'https://bb-election-api.herokuapp.com/',
              method: 'GET',
              datatype: 'json'
            }).done(function(data){
              var updateVote = document.getElementsByTagName('span')
              for (var i=0; i<data.candidates.length; i++){
                updateVote[i].innerText = data.candidates[i].votes;
              };
            });
          });
          if (document.querySelector('button') === null){
          document.body.append(refreshButton)};
        }).fail(function(){});
      });
    };
  });
});
