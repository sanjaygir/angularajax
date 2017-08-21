(function(){
	
	'use strict';
		
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController )
	.service('MenuService', MenuService)
	.directive('foundItems', FoundItems);
	
	
	NarrowItDownController.$inject = ['MenuService'];
	function NarrowItDownController(MenuService){
				
		
		  var list = this;

		  
		  
		  list.itemName = "";		  
		  
		  list.items = MenuService.getItems();
		  		  
		 

		 
		 list.removeItem = function(itemIndex){
			 
			 
			 MenuService.removeItem(itemIndex);
			 
		 }

		 
		  
		list.narrow = function() {
							
							
			MenuService.clearItems();
						
			MenuService.getMatchedMenuItems(list.itemName).then(function(res){
					

					
					
				for(var i=0; i<res.length; i++){
					
										
					MenuService.addItem(res[i]);
					
				}
				
				
			});
			
			
		};
		
	}
	
	
		
	
	
	
	
function FoundItems() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '=',
	  onRemove: '&'
      	  
    }
    
  };

  return ddo;
}





// If not specified, maxItems assumed unlimited


MenuService.$inject = ['$http'];
function MenuService($http) {
  var service = this;

  // List of shopping items
  var items = []; 
  
  
  
  service.clearItems = function(){
	  items = [];
	  
  }
  
  service.removeItem = function(index){
	  
	  
	  items.splice(index, 1);
	  
	  
  }
  
  
    service.addItem = function(el){
		
		items.push(el);
		
	}
  
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
      
  service.getItems = function () {
    return items;
  };
   
   
  
		

}
	
	
	
})();