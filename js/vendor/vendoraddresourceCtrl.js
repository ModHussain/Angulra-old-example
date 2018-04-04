resourceApp.controller('vendorresourcelistCtrl',["$scope","$state","$stateParams","RAService",function($scope, $state, $stateParams, RAService){
	$scope.$on('$viewContentLoaded', function () {
		$scope.getresourcelist(1);
	})
	
	$scope.Selectors =["skills","totalExperience","availability"];
    $scope.SelectedCriteria = ""; 
    $scope.filterValue = "";
    
    $scope.maxSize = 1;     // Limit number for pagination display number.  
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero  
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->  
    $scope.pageSizeSelected = 1; // Maximum number of items per page.
    
	$scope.getresourcelist = function(){
		$scope.local = localStorage.getItem('registrationId');	
		
		RAService.vendoraddresourcelist($scope.local).then(function(data){
			debugger;
			
			$scope.resourcelist =data;
			console.log($scope.resourcelist);
			 $scope.totalCount = data.count;
            // console.log($scope.totalCount);
             $scope.pageChanged = function() {
                 $scope.getresourcelist()
                     console.log('Page changed to: ' + $scope.pageIndex);
             };
     },function (err) {  
         var error = err;  
     });
 }
	$scope.getresourcelistFilter = function(){
        var filter = {
        	totalExperience: $scope.SelectedCriteria,
        	consultant: $scope.filterValue
       };
        RAService.datafilter(filter).then(function(data){
           $scope.resourcelist= data.data;
           console.log($scope.resourcelist);
       },function(err){
       if(err){
           $scope.errorMessage = err;
       }
   })
},
	$scope.statusResource = function(resource){
		debugger;
		if(resource.status == "Active"){
			resource.status = "InActive";
		RAService.resourceStatus(resource).then(function(data){
			$scope.Resource = data;
			console.log($scope.Resource);
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}
		})
		} else {
			resource.status = "Active";
			RAService.resourceStatus(resource).then(function(data) {
				$scope.Resource = data;
				console.log($scope.Resource);
			}, function(err) {
				if (err) {
					$scope.errorMessage = err;
				}
			})
		}
}

$scope.softlockResource = function(resource){
	debugger;
	if(resource.softLock == "YES"){
		resource.softLock = "NO";
	RAService.PostresourceSoft(resource).then(function(data){
	$scope.Presource = data;
		console.log($scope.Presource);
	},function(err){
		if(err){
			$scope.errorMessage = err;
		}
	})
	} else {
		resource.softLock = "YES";
		RAService.PostresourceSoft(resource).then(function(data) {
			$scope.Presource = data;
			console.log($scope.Presource);
		}, function(err) {
			if (err) {
				$scope.errorMessage = err;
			}
		})
	}
	}


	$scope.hardlockResource = function(resource){
		debugger;
		if(resource.hardLock == "YES"){
			resource.hardLock = "NO";
		RAService.PostresourceHard(resource).then(function(data){
		$scope.Presource = data;
			console.log($scope.Presource);
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}
		})
		} else {
			resource.hardLock = "YES";
			RAService.PostresourceHard(resource).then(function(data) {
				$scope.Presource = data;
				console.log($scope.Presource);
			}, function(err) {
				if (err) {
					$scope.errorMessage = err;
				}
			})
		}
		}

} ]);
resourceApp.controller('vendoraddresourceCtrl',["$scope","$state","$stateParams","$filter","RAService",function($scope, $state, $stateParams, $filter,
								RAService) {
							$scope.$on('$viewContentLoaded', function() {
								$scope.companyNameList = [];
								$scope.companyId = [];
								$scope.companyid();
								$scope.resource = {};
							})
							$scope.companyid = function() {
								RAService.getCompanyList().then(function(data) {
									$scope.list = data;
									console.log($scope.list[0].companyName);
									for (var i = 0; i < $scope.list.length; i++) {
										$scope.companyNameList.push($scope.list[i].companyName);
										$scope.companyId.push($scope.list[i]._id);
									}
									$scope.companyid = function() {
										for (var j = 0; j < $scope.companyNameList.length; j++) {
											if ($scope.companyName1 == $scope.companyNameList[j]) {
													$scope.comId = $scope.companyId[j];
														console.log($scope.comId);

															}
														}
													}

												});
							}
							$scope.gender = [ "Male", "Female", "others" ];
							$scope.experience = [ "1-2 years", "2-4 years","4-6 years", "6-8 years", "8-10 years","10+ more..." ];
							$scope.currentLocation = [ "Hyderabad","Bangalore", "Chennai", "Pune", "Gurgon","Nagpur" ];
							$scope.avaliability = [ "10-20 days", "20-30 days","30-45 days", "45-60 days" ];
							$scope.addresource = function() {
								debugger;
								$scope.resource.registrationId = $scope.comId;
								$scope.resource.dateOfBirth = $filter('date')(
									$scope.resource.dateOfBirth,"MM/dd/yyyy");
								RAService.addresource($scope.resource).then(
										function(data) {
											$scope.resourceadd = data;
											console.log($scope.resourceadd);
											$state.go('RA.resourcelist');
										}, function(err) {
											if (err) {
												$scope.errorMessage = err;
											}
										})
							}

						} ]);
resourceApp.controller('vendorupdateresourceCtrl',["$scope","$state","$stateParams","$filter","RAService",function($scope, $state, $stateParams, $filter,RAService) {
							$scope.$on('$viewContentLoaded', function() {
								$scope.resource = {};
								$scope.companyNameList = [];
								$scope.companyId = [];
								$scope.companyid();
								$scope.getResourceById();
							})
							$scope.companyid = function() {
								RAService.getCompanyList().then(
									function(data) {
											$scope.list = data;
													console.log($scope.list[0].companyName);
													for (var i = 0; i < $scope.list.length; i++) {
														$scope.companyNameList.push($scope.list[i].companyName);
														$scope.companyId.push($scope.list[i]._id);
													}
													$scope.companyid = function() {
														for (var j = 0; j < $scope.companyNameList.length; j++) {
															if ($scope.companyName1 == $scope.companyNameList[j]) {
																$scope.comId = $scope.companyId[j];
																console.log($scope.comId);
															}
														}
													}

												});
							}

							$scope.gender = [ "Male", "Female", "others" ];
							$scope.experience = [ "1-2 years", "2-4 years","4-6 years", "6-8 years", "8-10 years","10+ more..." ];
							$scope.currentLocation = [ "Hyderabad","Bangalore", "Chennai", "Pune", "Gurgon","Nagpur" ];
							$scope.avaliability = [ "10-20 days", "20-30 days","30-45 days", "45-60 days" ];
							$scope.getResourceById = function() {
								$scope.resource.registrationId = $scope.comId;
								RAService.resourcegetById($stateParams.resourceId).then(function(data) {
													$scope.resource = data;
													$scope.resource.dateOfBirth = new Date(
													$scope.resource.dateOfBirth);
													console.log($scope.resouce);
											},
												function(err) {
													if (err) {
														$scope.errorMessage = err;
													}
												})
							}

							$scope.updateResource = function() {
								debugger;
								$scope.resource.dateOfBirth = $filter('date')($scope.resource.dateOfBirth,"MM/dd/yyyy");
								RAService.updateresource($scope.resource).then(function(data) {
											$scope.updateresource = data;
											console.log($scope.updateresource)
										}, function(err) {
											if (err) {
												$scope.errorMessage = err;
											}
										})
							}

						} ]);