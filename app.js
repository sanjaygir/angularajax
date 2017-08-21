(function(){
	
	'use strict';
	
	
	angular.module('MenuApp', [])
	.controller('MenuController', MenuController)
	.service('MenuService', MenuService)
	.directive('foundItems', FoundItems);
	
	
	MenuController.$inject = ['MenuService'];
	function MenuController(MenuService){
				
		
		  var list = this;

		  
		  
		  list.itemName = "";		  
		  
		   list.items = MenuService.getItems();
		  		  
		  
		  
		this.test = function() {
							
			MenuService.getMatchedMenuItems(list.itemName);
					
			
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


MenuService.$inject = ['$http'];
function MenuService('$http') {
  var service = this;

  // List of shopping items
  var items = []; 
  
  
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
								
								items.push(items[i]);
								
								
							}
							
					}
					
					
					
					
					return foundItems;
				
					
				}
			
			);
			
			
			
		};
      
  service.getItems = function () {
    return items;
  };
   
   
  
		

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