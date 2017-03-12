angular.module('angularfireSlackApp')
  .factory('Users', function ($firebaseArray, $firebaseObject) {

    console.log('user.service.js');
    //The purpose of this factory is to provide us with the ability to get either a specific user's data, or to get a list of all of our users.

    //below is referencing the users node -- firebase uses a JSON tree structure

    var usersRef = firebase.database().ref('users');

    var connectedRef = firebase.database().ref('.info/connected');

    //$firebaseArray will return a pseudo-array -- will act like an array in JS but the array methods will only affect local data and not on the Firebase
    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: function (uid) {
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function (uid) {
        return users.$getRecord(uid).displayName;
      },
      getGravatar: function (uid) {
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },
      setOnline: function (uid) {
        var connected = $firebaseObject(connectedRef);
        var online = $firebaseArray(usersRef.child(uid + '/online'));

        connected.$watch(function () {
          if (connected.$value === true) {
            console.log("setOnline 1");

            online.$add(true).then(function (connectedRef) {
              console.log("setOnline 2");

              connectedRef.onDisconnect().remove();
              console.log("setOnline 3");

            });
          }
        });
      },
      all: users
    };

    return Users;
  })
