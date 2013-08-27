  function registerDrawButtons()
  {
	  
	  $(".EditButton").each(function(){
		  alert($(this).attr("title"));
		  $(this).click(function(){
			  alert($(this).id);
			  //alert($(this).value());
			  //activateTool($(this).value());
		  });
	  });
  }

function activateTool(label) {
	//alert(label);
    var tool = label.toUpperCase().replace(/ /g, "_");
    toolbar.activate(esri.toolbars.Draw[tool]);
    //map.hideZoomSlider();
    alert("start drawing");
  }

  function createToolbar(themap) {
    toolbar = new esri.toolbars.Draw(map);
    dojo.connect(toolbar, "onDrawEnd", addToMap);
  }

  function addToMap(geometry) {
    var symbol;
    toolbar.deactivate();
    map.showZoomSlider();
    switch (geometry.type) {
      case "point":
  case "multipoint":
    symbol = new esri.symbol.SimpleMarkerSymbol();
    break;
  case "polyline":
        symbol = new esri.symbol.SimpleLineSymbol();
        break;
      default:
        symbol = new esri.symbol.SimpleFillSymbol();
        break;
    }
    var graphic = new esri.Graphic(geometry, symbol);
    map.graphics.add(graphic);
  }
  

