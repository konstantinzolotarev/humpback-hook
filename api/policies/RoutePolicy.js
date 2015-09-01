/**
 * RoutePolicy
 * @depends PermissionPolicy
 * @depends OwnerPolicy
 * @depends ModelPolicy
 *
 * Verify that User is satisfactorily allowed to access the route.
 */
module.exports = function(req, res, next) {
	/*
	if (!_.isEmpty(req.options.modelIdentity)) {
    	
    	return next();
  	}
  	*/
  	//Check if this user has permissions to access the route
  	RouteService.findTargetRoute(req)
  	.then(function (route){
  		console.log("ROUTE", route);
  		
  		if(!route){
  			//Assume that this is handled by Model Permissions
  			//Or that this route is public;
  			return next();
  		}

  	})
  	.catch(function(err){
  		sails.log(err);
  		return next();
  	});

	
}