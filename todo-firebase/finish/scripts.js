// Initialize Firebase
var config = {
  apiKey: "AIzaSyAmSlZ6sNfNpj2QvvE_-fGWAFP9uQcRyGI",
  authDomain: "first-firebase-project-febc3.firebaseapp.com",
  databaseURL: "https://first-firebase-project-febc3.firebaseio.com",
  storageBucket: "first-firebase-project-febc3.appspot.com",
  messagingSenderId: "47212023087"
};
firebase.initializeApp(config);

$(function(){

  firebase.database().ref('notes').on('value', function(res){
    $('ul').empty();
    var todos = res.val();
    for (todo in todos) {
      $('ul').append("<li data-key="+todo+">" + todos[todo] + "</li>");
    }
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    var toDoItem = $('input').val();
    if (toDoItem !== '') {
      var dbRef = firebase.database().ref('notes');
      dbRef.push(toDoItem);
      $('input').val('');
    }
  });

  $('ul').on('click', 'li', function(){
    var checkBox = $(this).find('.glyphicon');
    var key = $(this).data('key');
    checkBox.toggleClass('glyphicon-unchecked glyphicon-check');

    firebase.database().ref('notes/' + key).remove();



  });
});
