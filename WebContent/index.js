
require([
			"esri/map",
			"esri/InfoTemplate",
			"esri/layers/ArcGISDynamicMapServiceLayer",
			"esri/symbols/SimpleFillSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/tasks/IdentifyTask",
			"esri/tasks/IdentifyParameters",
			"esri/dijit/Popup",
			"dojo/_base/array",
			"esri/Color",
			"dojo/dom-construct",
			"esri/layers/FeatureLayer",
			"esri/dijit/Search",
			"esri/geometry/Point",
			"dojo/domReady!"
         
         
         ], function(Map, InfoTemplate, ArcGISDynamicMapServiceLayer, SimpleFillSymbol,
					SimpleLineSymbol, IdentifyTask, IdentifyParameters, Popup,
					arrayUtils, Color, domConstruct,FeatureLayer,Search,Point) {

	
	
	/*提示框样式*/
	var popup = new Popup({
		fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
			new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
	}, domConstruct.create("div"));
	
	  var map = new Map("mapView", {
	    center: [120.6353, 31.298886],
	    zoom: 12,
	    infoWindow: popup,
	    basemap: "streets"
	  });
	  var jiudian = new ArcGISDynamicMapServiceLayer("http://www.jacksung.cn:6080/arcgis/rest/services/luoyuxiang/te01/MapServer", {opacity: 0.9,visible:true});
	  map.addLayer(jiudian);
	  map.on('load',function(){
		  console.log("load over");
	  });
	  
	  map.on('click',function(event){
		  console.log("you click the map!");
		  console.log(event.mapPoint);
		  identifyTask = new IdentifyTask("http://www.jacksung.cn:6080/arcgis/rest/services/luoyuxiang/te01/MapServer");
		  identifyParams = new IdentifyParameters();
		  identifyParams.tolerance = 3;
		  identifyParams.returnGeometry = true;
	      identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;		  
	      console.log(identifyParams.tolerance);
		  identifyParams.geometry = event.mapPoint;
		  identifyParams.mapExtent = map.extent;
		  console.log(identifyParams.geometry);		  
			var deferred = identifyTask
			.execute(identifyParams)
			.addCallback(function(response) {

				return arrayUtils.map(response, function(result) {
					var feature = result.feature;
					var layerName = result.layerName;
					feature.attributes.layerName = layerName;
					var info = "<div class=\"infoo\">酒店名：${name}</div>";
					var taxParcelTemplate = new InfoTemplate(layerName,info);
					feature.setInfoTemplate(taxParcelTemplate);

					if($(".outerPointer").css("display")=="block")
					{
						$(".outerPointer").css("opacity",1);
					}
					if($(".pointer").css("display")=="block")
					{
						$(".pointer").css("opacity",1);
					}


					return feature;
				});
			});

			map.infoWindow.setFeatures([deferred]);
			map.infoWindow.show(event.mapPoint);
			smap=map;
		  		  
	  });
	  
	  
	  
	  
	  
	    $('#jd').datagrid({
	    	onClickRow: function(index,row){
	            console.log(row.id);
	            console.log("11111111111");
	    	}})
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	 	  


	});	