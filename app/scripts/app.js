/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */

var app = angular.module('angularfireSlackApp', ['firebase', 'angular-md5', 'ui.router']);

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        resolve: {
          requireNoAuth: function ($state, Auth) {
            return Auth.$requireSignIn().then(function (auth) {
              console.log("$state.go('channels');");
              $state.go('channels');
            }, function (error) {
              console.log(error);
              return;
            });
          }
        }
      })

    .state('login', {
      url: '/login',
      controller: 'AuthCtrl as authCtrl',
      templateUrl: 'login.html',
      resolve: {
        requireNoAuth: function ($state, Auth) {
          return Auth.$requireSignIn().then(function (auth) {
            console.log("$state.go('home');");
            $state.go('home');
          }, function (error) {
            console.log(error);
            return;
          });
        }
      }
    })

    .state('register', {
      url: '/register',
      controller: 'AuthCtrl as authCtrl',
      templateUrl: 'register.html',
      resolve: {
        requireNoAuth: function ($state, Auth) {
          return Auth.$requireSignIn().then(function (auth) {
            $state.go('home');
          }, function (error) {
            console.log(error);
            return;
          });
        }
      }
    })

    .state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl as profileCtrl',
      templateUrl: 'profile.html',
      resolve: {
        auth: function ($state, Users, Auth) {
          return Auth.$requireSignIn().catch(function () {
            $state.go('home');
          });
        },
        profile: function (Users, Auth) {
          return Auth.$requireSignIn().then(function (auth) {
            return Users.getProfile(auth.uid).$loaded(); //promise that will resolve once the data comes from firebase
          });
        }
      }
    })

    .state('channels', {
      url: '/channels',
      templateUrl: 'channels.html',
      controller: 'ChannelsCtrl as channelsCtrl',
      resolve: {
        channels: function (Channels) {
          console.log("Channels.$loaded()");
          return Channels.$loaded();
          console.log(Channels.$loaded);
        },
        profile: function ($state, Auth, Users) {
          return Auth.$requireSignIn().then(function (auth) {
            return Users.getProfile(auth.uid).$loaded().then(function (profile) {
              if (profile.displayName) {
                return profile;
              } else {
                $state.go('profile');
              }
            });
          }, function (error) {
            $state.go('home');
          });
        }
      }
    })

    .state('channels.create', {
      url: '/create',
      templateUrl: 'channels.create.html',
      controller: 'ChannelsCtrl as channelsCtrl'
    })

    .state('channels.messages', {
      url: '/{channelId}/messages',
      templateUrl: 'channels.messages.html',
      controller: 'MessagesCtrl as messagesCtrl',
      resolve: {
        messages: function ($stateParams, Messages) {
          return Messages.forChannel($stateParams.channelId).$loaded();
        },
        channelName: function ($stateParams, channels) {
          return '#' + channels.$getRecord($stateParams.channelId).name;
        }
      }
    })

    .state('channels.direct', {
      url: '/{uid}/messages/direct',
      templateUrl: 'channels.messages.html',
      controller: 'MessagesCtrl as messagesCtrl',
      resolve: {
        messages: function ($stateParams, Messages, profile) {
          return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
        },
        channelName: function ($stateParams, Users) {
          return Users.all.$loaded().then(function () {
            return '@' + Users.getDisplayName($stateParams.uid);
          });
        }
      }
    })


    $urlRouterProvider.otherwise('/');
  })

  .config(function(){
    var config = {
      apiKey: "AIzaSyBJynctHIoL1GB_OYklPXfFB99uGwnyLAE",
      authDomain: "teepeechat.firebaseapp.com",
      databaseURL: "https://teepeechat.firebaseio.com",
      storageBucket: "teepeechat.appspot.com",
      messagingSenderId: "233490907036"
    };
    firebase.initializeApp(config);
  });

  app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
      }
  ]);
