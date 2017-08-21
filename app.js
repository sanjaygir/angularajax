(function(){
	
	'use strict';
	
	
	angular.module('MenuApp', [])
	.controller('MenuController', MenuController)
	.service('MenuService', MenuService);
	
	
	
	MenuController.$inject = ['MenuService'];
	function MenuController(MenuService){
		
		
		var promise = MenuService.getMenu();
		
		promise.then(function(response){
			
			
			alert(response.data);
			
		});
		
	}
	
	
	
	MenuService.$inject = ['$http'];
	
	function MenuService($http){
		
		
		this.getMenu = function(){
			
			var response = $http({
				
				method: "GET",
				url: ('menu_items.json')
				
			});
			
			return response;
			
		};
		
	}
	
	
	
	
})();