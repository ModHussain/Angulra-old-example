resourceApp.controller('customerCtrl',['$scope','$state','RAService',function($scope,$state,RAService){
		var user = localStorage.getItem('use');
		var admin =localStorage.getItem('admi');
		$scope.vvv = localStorage.getItem('registrationType');
		$scope.register =  $scope.vvv.split(',');
		$scope.user1 = localStorage.getItem('user')
		console.log($scope.user1)
		console.log($scope.register);
		$scope.dataregister = function(){
			
			if($scope.registerData == "RA"){
				$state.go('RA.dashboard');
			}
			if($scope.registerData == "vendor"){
				$state.go('vendor.dashboard');
			}
			if($scope.registerData == "customer"){
				$state.go('customer.dashboard');
			}			  
		}
		
       if(admin== "true"){
			$scope.all_users_type=true;
		}else if(user == "true" && admin == "true"){
		    $scope.all_users_type=true;
		}
		else if(user == "true"){
			$scope.all_users_type=false;
		}
		else{

		}
	
}])