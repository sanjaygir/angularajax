(function(){
	
	'use strict';
	
	
	angular.module('MenuApp', [])
	.controller('MenuController', MenuController)
	.service('MenuSearchService', MenuSearchService)
	.factory('MenuFactory', MenuFactory)
    .directive('foundItems', FoundItems);
	
	
	MenuController.$inject = ['MenuFactory'];
	function MenuController(MenuFactory){
				
		
		  var list = this;

		  // Use factory to create new shopping list service
		  var shoppingList = MenuFactory();

		  
		  
		  list.itemName = "";
		  
		  
		   list.items = shoppingList.getItems();
		  		  
		  
		  
		this.test = function() {
			
				
			shoppingList.searchForTerm(list.itemName);
			
		
			
		};
		
	}
	
	
	
	MenuSearchService.$inject = ['$http'];
	
	function MenuSearchService($http){
		
		
		var service = this;
		
		
		service.getMatchedMenuItems = function(searchTerm){
			
		return $http({
				
				method: "GET",
				url: ('menu_items.json')
				
			}).then(
				function(response){
				
					var foundItems = [];
					
					
					var items = response.data.menu_items;
					
					
					for(var i=0; i<items.length; i++){
						
							if(items[i].description.indexOf(searchTerm) != -1){
								
								foundItems.push(items[i]);
																
								
							}
							
					}
					
					
					
					
					return foundItems;
				
					
				}
			
			);
			
			
			
		};
		
	}
	
	
	
	
	
	
	
function FoundItems() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<'
      	  
    }
    
  };

  return ddo;
}





// If not specified, maxItems assumed unlimited
function MenuService() {
  var service = this;

  // List of shopping items
  var items = []; 

   
   
  service.getItems = function () {
    return items;
  };
   
   
   
   service.searchForTerm = function(desc){
	   
				
			var promise = MenuSearchService.getMatchedMenuItems(desc);
			
			promise.then(function(response){			
				
								
				for(var i=0; i<response.length; i++){
					
					items.push(response[i]);
				
					
				}
				
				
			});
	
	
   };
   
   			
		

}


function MenuFactory() {
  var factory = function () {
    return new MenuService();
  };

  return factory;
}





	
	
	/*
	
	


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  };

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
}



*/


	
	
	
	
})();