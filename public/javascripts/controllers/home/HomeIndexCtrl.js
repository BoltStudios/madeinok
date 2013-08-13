function HomeIndexCtrl($scope, $location, $http, $routeParams) {
	//$scope.variableName = "variable value"
	$scope.title = "Home/Index" // try commenting this out to see what happens on the view.
	$scope.blurb = "Here at Made In OK, we're developing a crowd sourced and curated web community to help build a central place for Oklahoma innovators, makers, founders and creatives to find local networking events, keep up to date on what's happening in the community, and connect with talent.";
	$scope.yourName = "Example Name"

	var date = new Date();
	var freshPrinceLyrics = "In west Philadelphia born and raised, on the playground was where I spent most of my days, chillin' out maxin' relaxin' all cool and all shootin some b-ball outside of the school. When a couple of guys who were up to no good started making trouble in my neighborhood. I got in one little fight and my mom got scared. She said 'You're movin' with your auntie and uncle in Bel Air";
	var imageUrl = "http://www.dailydealmedia.com/wp-content/uploads/2012/10/buzzam.png";
	$scope.events = 
	[
		{title: "Example Event Title 1", date: date.toString(), description: freshPrinceLyrics, imageUrl: imageUrl},
		{title: "Example Event Title 2", date: date.toString(), description: freshPrinceLyrics, imageUrl: imageUrl},
		{title: "Example Event Title 3", date: date.toString(), description: freshPrinceLyrics},
		{title: "Example Event Title 4", date: date.toString(), description: freshPrinceLyrics},
		{title: "Example Event Title 5", date: date.toString(), description: freshPrinceLyrics}
	];

}