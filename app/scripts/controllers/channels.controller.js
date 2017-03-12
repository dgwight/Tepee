angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', function ($state, Auth, Users, profile, channels) {
    var channelsCtrl = this;

    console.log('channels.contoller.js');

    Users.setOnline(profile.$id);

    channelsCtrl.profile = profile;
    channelsCtrl.channels = channels;
    channelsCtrl.users = Users.all;

    channelsCtrl.getDisplayName = Users.getDisplayName;
    channelsCtrl.getGravatar = Users.getGravatar;

    channelsCtrl.logout = function () {
      channelsCtrl.profile.online = null;
      channelsCtrl.profile.$save().then(function () {
        Auth.$signOut().then(function() {
          $state.go('home');
        }, function(error) {
          console.log(error);
        });
      });
    }


    channelsCtrl.newChannel = {
      name: ''
    };

    channelsCtrl.createChannel = function () {
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function (ref) {
        $state.go('channels.messages', {
          channelId: ref.key
        });
      });
    };
  });
