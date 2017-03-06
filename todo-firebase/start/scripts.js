
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA56iSrUjb_mO_x0mXHR1VnZPLp7bfdtL4",
    authDomain: "todo-d6856.firebaseapp.com",
    databaseURL: "https://todo-d6856.firebaseio.com",
    storageBucket: "todo-d6856.appspot.com",
    messagingSenderId: "566926722099"
  };
  firebase.initializeApp(config);


$(function(){
  $('form').on('submit', function(e) {
     e.preventDefault();

     const todosRef = firebase.database().ref('/todos')

     todosRef.on('value',(todos) => {
      const todoItems = todos.val();

      $('ul').empty();

      for (let item in todoItems) {
        const todo = todoItems[item]
         $('ul').append("<li> <span class='glyphicon glyphicon-unchecked'></span>" + todo + "</li>");
      }
     });

     if ($('input').val() !== '') {
         var toDoItem = $('input').val();


         console.log(toDoItem);

         todosRef.push(toDoItem);

         // $('ul').append("<li> <span class='glyphicon glyphicon-unchecked'></span>" + toDoItem + "</li>");
         $('input').val('');
     }
 });
  $('ul').on('click', 'li', function(){
      var checkBox = $(this).find('.glyphicon');
     checkBox.toggleClass('glyphicon-unchecked glyphicon-check');
     $(this).toggleClass('text-muted');
  });
});
