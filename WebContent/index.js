
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
	
	
	//新建地图
	  var map = new Map("mapView", {
	    center: [120.6353, 31.298886],
	    zoom: 12,
	    infoWindow: popup,
	    basemap: "satellite",
	    showlabels: true
	  });
	  
	  //新建酒店图层
	  var jiudian = new ArcGISDynamicMapServiceLayer("http://www.jacksung.cn:6080/arcgis/rest/services/luoyuxiang/jiudianzb/MapServer", {opacity: 0.9,visible:true});
	  
	  //将酒店图层加入地图
	  map.addLayer(jiudian);


	  //点击地图时进行查询
	  map.on('click',function(event){
		  console.log("you click the map!");
		  console.log(event.mapPoint);
		  identifyTask = new IdentifyTask("http://www.jacksung.cn:6080/arcgis/rest/services/luoyuxiang/jiudianzb/MapServer");
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
					var info = "<div class=\"infoo\">名称：${NAME}</div>";
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
		  		  
	  });
	  
	  
	  //点击酒店列表，更新价格列表和图片，地图定位到相应的酒店
	  $('#jd').datagrid({
			onClickRow: function(index,row){
				//新建一个对应于点击的酒店的点
		        var pt = new Point(row.jingdu,row.weidu);
		        //地图定位到上面的点
		        map.centerAndZoom(pt,12);
		        
		        var jdid = row.id;
		        
		        //更新价格列表
		        $('#dg2').datagrid('load',"http://39.108.142.129:8080/jiudian/servlet/Jiage?id="+jdid);	            
		        //更新图片1
		        $("#tp1").attr("src","tupian/"+jdid+".jpg");
		        
		        //更新图片2
		        $("#tp2").attr("src","tupian/"+jdid+"-.jpg");
			}})
	  
	  
	});	