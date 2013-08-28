function initDrawToolbar(map)
{
	map.on("load", createToolbar);
	
	//dom.byId("pointMenu").onClick(function(){alert("help");});
		//draw point
	
}

		function activateTool(name) {			
			//alert(map.id);
			var tool = name;
			toolbar.activate(Draw[name]);
			map.hideZoomSlider();
		}