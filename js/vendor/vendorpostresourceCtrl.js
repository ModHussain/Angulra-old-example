resourceApp.controller('vendorpostresourceCtrl',['$scope','$state','RAService',function($scope,$state,RAService){
	

	$scope.$on('$viewContentLoaded', function () {
		$scope.postresourcelist();
	})
	
	$scope.postresourcelist = function(){
		RAService.postareqList().then(function(data){
			$scope.postresource = data;
			$scope.localid =localStorage.getItem('registrationId');
			console.log($scope.localid);
			console.log($scope.postresource)
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}
		})
	}

	
	
	
}]);
resourceApp.controller('vendorpostresourceByIdCtrl',['$scope','$state','$stateParams','RAService',function($scope,$state,$stateParams,RAService){
	$scope.$on('$viewContentLoaded', function(){
		$scope.resourcepostById();
		$scope.postresource = {};
	})

	$scope.resourcepostById = function(){
		RAService.postresourceById($stateParams.localId,$stateParams.resourceById,$stateParams.objectid).then(function(data){
			$scope.resourceById = data;
			console.log($scope.resourceById);
		},function(err){
			if(err){
				$scope.errorMessage = err;
			}
		})
	}
	$scope.getById = function(id,name){
		$scope.idobject = id;
		$scope.name = name;
	}
	$scope.mappingpostresource = function(){
		debugger;
		$scope.postresource.companyId = $stateParams.resourceById;
		$scope.postresource.vendorId = $stateParams.localId;
		$scope.postresource.resourceId = $scope.idobject;
		$scope.postresource.requirementId = $stateParams.objectid;
		RAService.postresourceMapping($scope.postresource).then(function(data){
		$scope.resourcemapping = data;
		console.log($scope.resourcemapping)
	},function(err){
		if(err){
			$scope.errorMessage = err;
		}
	})
	}
}])
