function showAlert(str)
{
	alert(str);
}

function createLegend() {
	alert("start legend");
    var legend = new esri.dijit.Legend({
      map : map,
      layerInfos : [ {
        layer : map.getLayer("Buffalo"),
        title : "Buffalo"
      } ]
    }, dojo.byId("LegendDiv"));
    legend.startup();
  }


