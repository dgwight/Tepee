angular.module('angularfireSlackApp')
	.controller('ProfileCtrl', function ($state, md5, auth, profile) {
		var profileCtrl = this;

		console.log('profile.controller.js');

		profileCtrl.profile = profile;

		profileCtrl.updateProfile = function () {
			console.log(auth);

			// profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
			profileCtrl.profile.$save().then(function () {
				$state.go('channels');
			});
		};
	});
