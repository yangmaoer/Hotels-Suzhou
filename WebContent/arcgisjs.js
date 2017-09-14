			var map;
			var identifyTask;
			var layername="sthx";
			var ismove=false;
			var truemove=false;
			var templayername;
			var isindex=true;
			var lastcancel=false;
			var nowtopo=true;
			var allevent;
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
					], function(
						Map, InfoTemplate, ArcGISDynamicMapServiceLayer, SimpleFillSymbol,
						SimpleLineSymbol, IdentifyTask, IdentifyParameters, Popup,
						arrayUtils, Color, domConstruct,FeatureLayer,Search,Point
					) {
						sIdentifyTask=IdentifyTask;

						var identifyParams;
						/*提示框样式*/
						var popup = new Popup({
							fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
								new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
									new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
						}, domConstruct.create("div"));
						/*地图信息*/
						map = new Map("map", {
							basemap: "satellite",
							showLabels : true,
							center: [119.39461117115485, 31.432290641641767],
							zoom: 11,
							infoWindow: popup,
							logo : false
						});

						map.on("load", mapReady);
						/*参数定义*/
						parcelsURL0 = "http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/basemap/MapServer";
						parcelsURL1 = "http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/sthx/MapServer";
						parcelsURL2 = "http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/xmyz/MapServer";
						parcelsURL3 = "http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/nchj/MapServer";
						basemap=new ArcGISDynamicMapServiceLayer(parcelsURL0, {opacity: 0.9,visible:true});
						sthx=new ArcGISDynamicMapServiceLayer(parcelsURL1, {opacity: 0.8,visible:true});
						xmyz=new ArcGISDynamicMapServiceLayer(parcelsURL2, {opacity: 0.5,visible:true});
						nchj=new ArcGISDynamicMapServiceLayer(parcelsURL3, {opacity: 0.8,visible:true});

					  	leibie4 = new ArcGISDynamicMapServiceLayer("http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/leibie4/MapServer", {opacity: 0.9,visible:true});
						dabiao3 = new ArcGISDynamicMapServiceLayer("http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/dabiao3/MapServer", {opacity: 0.9,visible:true});

						map.addLayer(basemap);
						map.addLayer(xmyz);
						map.addLayer(sthx);

						map.addLayer(nchj);
						map.addLayer(dabiao3);
						map.addLayer(leibie4);
						dabiao3.setVisibility(false);
						leibie4.setVisibility(false);

						//添加图层后载入loadLayerList方法
						dojo.connect(basemap, "onLoad", basemapload);
						dojo.connect(sthx, "onLoad", loadLayerList);
						dojo.connect(xmyz, "onLoad", loadLayerList);
						dojo.connect(nchj, "onLoad", loadLayerList);
						function basemapload(layers){
							var infos = layers.layerInfos;
							for (var i = 0; i < infos.length; i++) {
								var info = infos[i];
								//console.log(info.id+","+info.name);
								//$("#basemapdiv").append("<div>" + info.name + "</div>");
								$("#basemapdiv").append("<div><input id='"+info.id + "' class='basemapclass' type='checkbox' value='checkbox' onclick='setbasemapVisibility()' " + (info.defaultVisibility ? "checked='checked'" : "") + " />" + info.name + "</div>");

							}
						}
						//载入地图名称到div中的方法
						function loadLayerList(layers) {

							console.log("function:loadLayerList");
							console.log(layers.url+","+layers.id);

						    //获取图层信息
						    var infos = layers.layerInfos;
						    var classname;
						    var fatherdiv;
						    if(layers.url.indexOf("sthx")>=0)
						    {
						    	classname="visiblecsssthx";
						    	fatherdiv="visibledivsthx";
						    }
						    if(layers.url.indexOf("xmyz")>=0)
						    {
						    	classname="visiblecssxmyz";
						    	fatherdiv="visibledivxmyz";
						    }
						    if(layers.url.indexOf("nchj")>=0)
						    {
						    	classname="visiblecssnchj";
						    	fatherdiv="visibledivnchj";
						    }
						    for (var i = 0; i < infos.length; i++) {
						        var info = infos[i];
						        //输出图层列表的html
						       	$("#"+classname).append("<div><input id='"+layers.id + info.id + "' type='checkbox' value='checkbox' onclick='setallLayerVisibility(\""+info.id+"\",\""+classname+"\",\""+layers.id+info.id+"\")' " + (info.defaultVisibility ? "checked='checked'" : "") + " />" + info.name + "</div>");
						    	$("#"+fatherdiv).append("<div><input id='"+ info.id + "' class='"+classname+"' type='checkbox' value='checkbox' onclick='setLayerVisibility(\""+info.id+"\",\""+layers.id+info.id+"\")' " + (info.defaultVisibility ? "checked='checked'" : "") + " />" + info.name + "</div>");
						    }
						}

						function mapReady() {
							$(".esriControlsBR").remove();
							map.on("click", executeIdentifyTask);
							//map.on("mouse-move", MouseEvent);
							//map.on("mouse-down", MouseEventdown);
							//create identify tasks and setup parameters
							identifyTask = new sIdentifyTask(parcelsURL1);
							identifyParams = new IdentifyParameters();
							identifyParams.tolerance = 3;
							identifyParams.returnGeometry = true;
/*							identifyParams.layerIds = [0];*/
							identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
							/*          identifyParams.width = map.width;
							          identifyParams.height = map.height;*/
						}
						/*鼠标移动*/
						function MouseEvent(event){
							if(ismove)
								smap.infoWindow.show(event.mapPoint);

							//console.log($(".esriPopupWrapper").css("left")+","+event.movementX +","+event.movementY+","+event.offsetX+","+event.pageX);
						}
						/*鼠标点击*/
						function MouseEventdown(event){
							if(ismove)
							{
								lastcancel=true;
								ismove=false;
							}

						}
						/*查询*/
						function executeIdentifyTask(event) {


							if(lastcancel||isindex)
							{
								lastcancel=false;
								return;
							}

							identifyParams.geometry = event.mapPoint;
							identifyParams.mapExtent = map.extent;

							var deferred = identifyTask
								.execute(identifyParams)
								.addCallback(function(response) {

									return arrayUtils.map(response, function(result) {
										var feature = result.feature;
										var layerName = result.layerName;

										feature.attributes.layerName = layerName;
										var html;
										if(layername=="sthx")
										{
											html="<img src=\"images/move.png\" onload=\"move()\" onerror=\"move()\" hidden=\"hidden\"/><div class=\"infoo\"><div><h3>名&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称：</h3><p>${name}</p></div><div><h3>分布区域：</h3><p>${Range}</p></div><div><h3>功&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp能：</h3><p>${function}</p></div></div>";
										}
										if(layername=="xmyz")
										{
											html="<img src=\"images/move.png\" onload=\"move()\" onerror=\"move()\" hidden=\"hidden\"/><div class=\"infoo\"><div><h3>名&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称：</h3><p>${Name}</p></div><div><h3>地&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp区：</h3><p>${County}</p></div><div><h3>面&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp积：</h3><p>${Area}</p></div></div>";
										}
										if(layername=="nchj")
										{
											html="<img src=\"images/move.png\" onload=\"move()\" onerror=\"move()\" hidden=\"hidden\"/><div class=\"infoo\"><div><h3>名&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称：</h3><p>${cun}</p></div><div><h3>建设类型：</h3><p>${type}</p></div><div><h3>设施工艺：</h3><p>${gongyi}</p></div></div>";
										}
										if(layername=="leibie4")
										{
											html="<img src=\"images/move.png\" onload=\"move()\" onerror=\"move()\" hidden=\"hidden\"/><div class=\"infoo\"><div><h3>名&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称：</h3><p>${name}</p></div><div><h3>编&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号：</h3><p>${number}</p></div><div><h3>河&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp流：</h3><p>${river}</p></div><div><h3>水质类别：</h3><p>${水质}</p></div></div>";
										}
										if(layername=="dabiao3")
										{
											html="<img src=\"images/move.png\" onload=\"move()\" onerror=\"move()\" hidden=\"hidden\"/><div class=\"infoo\"><div><h3>名&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称：</h3><p>${name}</p></div><div><h3>编&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号：</h3><p>${number}</p></div><div><h3>河&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp流：</h3><p>${river}</p></div><div><h3>达标情况：</h3><p>${达标情况}</p></div></div>";
										}
										var taxParcelTemplate = new InfoTemplate(layerName,html);
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
							}








					      //创建搜索功能
					      var search = new Search({
					         map: map
					      }, "search");
					      search.startup();


						$("#leibie").click(function(){
							lb();
						});
						$("#dabiao").click(function(){
							db();
						});


						$("#dbszlfx").click(function(){
							setwatervisible(true);
							isindex = false;
							$('#dlg').dialog('close');
							$('#dlg2').dialog('close');
							$(".tucen_s").hide();
							$("#nianif").hide();
							$("#yueif").hide();
							$("#jijieif").hide();
							$("#jibieif").hide();
							$("#pinlvif").hide();
							$("#fuheif").hide();
							//$(".righter.fr").hide();
							sthx.setVisibility(false);
							xmyz.setVisibility(false);
							nchj.setVisibility(false);
							$("#kq").hide();
							$("#dbs").toggle();
							$("#c1").hide();




						});


						$("#kqzlfx").click(function(){
							setwatervisible(false);
							$('#dlg').dialog('close');
							$('#dlg2').dialog('close');
							$(".tucen_s").hide();
							$("#nianif").hide();
							$("#yueif").hide();
							$("#jijieif").hide();
							$("#jibieif").hide();
							$("#pinlvif").hide();
							$("#fuheif").hide();

							//$(".righter.fr").hide();
							dabiao3.setVisibility(false);
							leibie4.setVisibility(false);
							sthx.setVisibility(false);
							xmyz.setVisibility(false);
							nchj.setVisibility(false);

							$("#dbs").hide();
							$("#kq").toggle();
							$("#c1").hide();
							$("#legendDiv").hide();

						});

						$("#nian").click(function(){
				             $("#c1").attr("src","images/tubiao/nian.html");
										$("#nianif").show();
				            $("#c1").show();


										$("#yueif").hide();
										$("#jijieif").hide();
										$("#jibieif").hide();
										$("#pinlvif").hide();
										$("#fuheif").hide();
						});

						$("#jijie").click(function(){
				             $("#c3").attr("src","images/tubiao/jijie.html");
										 $("#jijieif").show();
				             $("#c3").show();

										 $("#nianif").hide();
										 $("#yueif").hide();

										 $("#jibieif").hide();
										 $("#pinlvif").hide();
										 $("#fuheif").hide();
						});
						$("#yue").click(function(){
				             $("#c2").attr("src","images/tubiao/yue.html");
										 $("#yueif").show();
				             $("#c2").show();

										 $("#nianif").hide();

										 $("#jijieif").hide();
										 $("#jibieif").hide();
										 $("#pinlvif").hide();
										 $("#fuheif").hide();
						});
						$("#jibie").click(function(){
										$("#c4").attr("src","images/tubiao/jibie.html");
										$("#jibieif").show();
										$("#c4").show();

										$("#nianif").hide();
										$("#yueif").hide();
										$("#jijieif").hide();

										$("#pinlvif").hide();
										$("#fuheif").hide();
						});
						$("#pinlv").click(function(){
				             $("#c5").attr("src","images/tubiao/pinlv.html");
										 $("#pinlvif").show();
				             $("#c5").show();

										 $("#nianif").hide();
										 $("#yueif").hide();
										 $("#jijieif").hide();
										 $("#jibieif").hide();

										 $("#fuheif").hide();
						});
						$("#fuhe").click(function(){
				             $("#c6").attr("src","images/tubiao/fuhe.html");
										 $("#fuheif").show();
				             $("#c6").show();

										 $("#nianif").hide();
										 $("#yueif").hide();
										 $("#jijieif").hide();
										 $("#jibieif").hide();
										 $("#pinlvif").hide();

						});
						$("#guanbinian").click(function(){
							$("#nianif").hide();
						})
						$("#guanbiyue").click(function(){
							$("#yueif").hide();
						})
						$("#guanbijijie").click(function(){
							$("#jijieif").hide();
						})
						$("#guanbijibie").click(function(){
							$("#jibieif").hide();
						})
						$("#guanbipinlv").click(function(){
							$("#pinlvif").hide();
						})
						$("#guanbifuhe").click(function(){
							$("#fuheif").hide();
						})



						$("#sthxfb").click(function(){
							showall("sthx");
							var pt = new Point(119.459139 , 31.457884);
							map.centerAndZoom(pt,10);
							$('#dlg').dialog('close');
							$('#dlg2').dialog('close');
							$("#nianif").hide();
							$("#yueif").hide();
							$("#jijieif").hide();
							$("#jibieif").hide();
							$("#pinlvif").hide();
							$("#fuheif").hide();

							dabiao3.setVisibility(false);
							leibie4.setVisibility(false);
							$("#legendDiv").hide();
							$("#kq").hide();
							$("#dbs").hide();
							$("#menus").find("li").remove();

							$("#menus").show(1000);
							$("#fun").show(1000);
							$("#c1").hide();

							querypage('sthx');

						});

						$("#xqyzqfb").click(function(){
							showall("xmyz");
							var pt = new Point(119.459139 , 31.457884);
							map.centerAndZoom(pt,10);
							$('#dlg').dialog('close');
							$('#dlg2').dialog('close');
							$("#nianif").hide();
							$("#yueif").hide();
							$("#jijieif").hide();
							$("#jibieif").hide();
							$("#pinlvif").hide();
							$("#fuheif").hide();
							dabiao3.setVisibility(false);
							leibie4.setVisibility(false);
							$("#legendDiv").hide();
							$("#kq").hide();
							$("#dbs").hide();
							$("#menus").find("li").remove();

							$("#menus").show(1000);
							$("#fun").show(1000);
							$("#c1").hide();

							querypage('xmyz');



						});

						$("#nchjgl").click(function(){
							showall("nchj");
							var pt = new Point(119.459139 , 31.457884);
							map.centerAndZoom(pt,10);
							$('#dlg').dialog('close');
							$('#dlg2').dialog('close');
							$("#nianif").hide();
							$("#yueif").hide();
							$("#jijieif").hide();
							$("#jibieif").hide();
							$("#pinlvif").hide();
							$("#fuheif").hide();
							dabiao3.setVisibility(false);
							leibie4.setVisibility(false);
							$("#legendDiv").hide();
							$("#kq").hide();
							$("#dbs").hide();
							$("#menus").find("li").remove();
							$("#menus").show(1000);
							$("#fun").show(1000);
							$("#c1").hide();
							querypage('nchj');
						})


						$("#datagrid-row-r1-2-0").click(function(){
							var pt = new Point(119.462113,31.559011);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-1").click(function(){
							var pt = new Point(119.554615 , 31.482571);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-2").click(function(){
							var pt = new Point(119.521005 , 31.447177);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-3").click(function(){
							var pt = new Point(119.536472 , 31.404346);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-4").click(function(){
							var pt = new Point(119.494236 , 31.425167);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-5").click(function(){
							var pt = new Point(119.466277 , 31.439741);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-6").click(function(){
							var pt = new Point(119.477282 , 31.441525);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-7").click(function(){
							var pt = new Point(119.459139 , 31.457884);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-8").click(function(){
							var pt = new Point(119.299066 , 31.404126);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-9").click(function(){
							var pt = new Point(119.213670 , 31.351114);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-10").click(function(){
							var pt = new Point(119.209401 , 31.281253);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r1-2-11").click(function(){
							var pt = new Point(119.230578 , 31.369769);
							map.centerAndZoom(pt,16);
						})


						$("#datagrid-row-r2-2-0").click(function(){
							var pt = new Point(119.462113,31.559011);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-1").click(function(){
							var pt = new Point(119.554615 , 31.482571);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-2").click(function(){
							var pt = new Point(119.521005 , 31.447177);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-3").click(function(){
							var pt = new Point(119.536472 , 31.404346);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-4").click(function(){
							var pt = new Point(119.494236 , 31.425167);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-5").click(function(){
							var pt = new Point(119.466277 , 31.439741);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-6").click(function(){
							var pt = new Point(119.477282 , 31.441525);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-7").click(function(){
							var pt = new Point(119.459139 , 31.457884);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-8").click(function(){
							var pt = new Point(119.299066 , 31.404126);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-9").click(function(){
							var pt = new Point(119.213670 , 31.351114);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-10").click(function(){
							var pt = new Point(119.209401 , 31.281253);
							map.centerAndZoom(pt,16);
						})
						$("#datagrid-row-r2-2-11").click(function(){
							var pt = new Point(119.230578 , 31.369769);
							map.centerAndZoom(pt,16);
						})




					      //类别分布
					      var lb=function leibie(){
									//$('#dlg').dialog('open');
									$('#dlg').window('open').window('resize',{width:'260px',height:'370px',top: 100,left: 1000});
									$('#dlg2').dialog('close');
									var pt = new Point(119.459139 , 31.457884);
									map.centerAndZoom(pt,11);
							// map.setZoom(10);

							leibie4.setVisibility(true);
							dabiao3.setVisibility(false);
					    sthx.setVisibility(false);
							xmyz.setVisibility(false);
							nchj.setVisibility(false);

					        $("#legendDiv").attr("src","images/leibie.PNG");
					        $("#legendDiv").show();
									querypage2('leibie4');

					      }

					      //达标情况
					      var db=function dabiao(){
									$('#dlg2').window('open').window('resize',{width:'260px',height:'370px',top: 100,left: 1000});
									$('#dlg').dialog('close');
									var pt = new Point(119.459139 , 31.457884);
									map.centerAndZoom(pt,11);

									dabiao3.setVisibility(true);
							leibie4.setVisibility(false);
					    sthx.setVisibility(false);
							xmyz.setVisibility(false);
							nchj.setVisibility(false);

					        $("#legendDiv").attr("src","images/dabiao.PNG");
					        $("#legendDiv").show();
									querypage2('dabiao3');
					      }



						}
					);
//			移动函数
			function move(){
				$(".esriPopupWrapper").mousedown(function(){
					truemove=true;
				});
				$(".esriPopupWrapper").mouseup(function(){
					truemove=false;
					allevent=undefined;
				});
				$(".esriPopupWrapper").mousemove(function(event){
					if(truemove)
					{
						if(allevent==undefined)
							allevent=event;
						else{
							var changex=allevent.pageX-event.pageX;
							var changey=allevent.pageY-event.pageY;
							var allpoint=$(".pointer,.outerPointer");
							/*console.log($(".esriPopupWrapper").css("left"));*/

							$(".esriPopupWrapper").css("left",$(".esriPopupWrapper").css("left").replace("px","")-changex);
							$(".esriPopupWrapper").css("top",$(".esriPopupWrapper").css("top").replace("px","")-changey);


							if(allpoint.hasClass("topRight")||allpoint.hasClass("bottomRight")||allpoint.hasClass("right"))
							{
								$(".esriPopupWrapper").css("right","auto");
								//$(".esriPopupWrapper").css("right",$(".esriPopupWrapper").css("right").replace("px","")+changex);
								//console.log("right");
							}
/*
							else
							{
								$(".esriPopupWrapper").css("left",$(".esriPopupWrapper").css("left").replace("px","")-changex);
								console.log("left");
							}*/

							if(allpoint.hasClass("bottomLeft")||allpoint.hasClass("bottomRight")||allpoint.hasClass("bottom"))
							{
								$(".esriPopupWrapper").css("bottom","auto");
								//$(".esriPopupWrapper").css("bottom",$(".esriPopupWrapper").css("bottom").replace("px","")+changey);
								//console.log("bottom,"+$(".esriPopupWrapper").css("bottom"));
							}

/*							else
							{
								$(".esriPopupWrapper").css("top",$(".esriPopupWrapper").css("top").replace("px","")-changey);
								console.log("top");
							}*/


							allpoint.css("opacity",0);
//							$(".outerPointer").css("opacity",0);
//							$(".pointer").css("opacity",0);

							allevent=event;
							}

					}
				});

			}
			/*切换图层*/
			function changebg(){
				if(nowtopo)
				{
					nowtopo=false
					//basemap.setVisibility(true);
					map.getLayer("layer0").setVisibility(false);
					$("#basemapdiv").show(500);
				}
				else
				{
					nowtopo=true;
					map.getLayer("layer0").setVisibility(true);
					//basemap.setVisibility(false);
					$("#basemapdiv").hide(500);
				}
			}
			/*切换提示的图层*/
			function querypage(url){
				layername=url;
				identifyTask = new sIdentifyTask("http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/"+url+"/MapServer");
				sthx.setVisibility(false);
				xmyz.setVisibility(false);
				nchj.setVisibility(false);
				eval(url).setVisibility(true);

				$("#visiblediv"+url).show(500).siblings().hide(500);

			}

			function querypage2(url){
				layername=url;
				identifyTask = new sIdentifyTask("http://112.33.15.169:6868/arcgis/rest/services/lyzhhb/"+url+"/MapServer");
				sthx.setVisibility(false);
				xmyz.setVisibility(false);
				nchj.setVisibility(false);
				dabiao3.setVisibility(false);
				leibie4.setVisibility(false);
				eval(url).setVisibility(true);

				$("#visiblediv"+url).show(500).siblings().hide(500);

			}
			//根据checkbox设置图层是否可见的方法
			function setLayerVisibility(id,allid) {

			    //用dojo.query获取所有css为visiblecss1的元素数组（class='visiblecss1'）
			    var inputs = dojo.query(".visiblecss"+layername);
			    visible = [];
			    //对checkbox数组进行遍历把选中的id添加visible
			    for (var i = 0; i < inputs.length; i++) {
			        if (inputs[i].checked) {
			            visible.push(inputs[i].id);
			        }
			    }
			    eval(layername).setVisibleLayers(visible);
			    $("#"+allid).prop('checked', $("#visiblediv"+layername+" "+"#"+id).prop('checked'));
			    if(templayername!=null)
			    layername=templayername;

			}
			//根据全局checkbox设置图层是否可见的方法
			function setallLayerVisibility(id,classname,allid) {
				var ischeck=$("#"+allid).prop('checked');
				$("."+classname).parent().children("#"+id).prop('checked', ischeck);
				console.log(ischeck);

				templayername=layername;
				if(classname=="visiblecsssthx")
					layername="sthx";
				if(classname=="visiblecssxmyz")
					layername="xmyz";
				if(classname=="visiblecssnchj")
					layername="nchj";
				setLayerVisibility(id,allid);

				var allcheckbox=$("."+classname)
				var selectcheckbox=$("#"+classname).find(":checked").not(".choseallclass");

				console.log(allcheckbox.length+","+selectcheckbox.length);
				if(allcheckbox.length==selectcheckbox.length)
				{
					$("#"+classname.replace("visiblecss","")+"choseall").prop("checked",true);
				}

				else
				{
					$("#"+classname.replace("visiblecss","")+"choseall").prop("checked",false);
				}


			}
			//根据checkbox设置图层是否可见的方法
			function setbasemapVisibility() {

			    //用dojo.query获取所有css为visiblecss1的元素数组（class='visiblecss1'）
			    var inputs = dojo.query(".basemapclass");
			    visible = [];
			    //对checkbox数组进行遍历把选中的id添加visible
			    for (var i = 0; i < inputs.length; i++) {
			        if (inputs[i].checked) {
			            visible.push(inputs[i].id);
			        }
			    }
			    basemap.setVisibleLayers(visible);
			}
			/*显示全部图层*/
			function showall(layer)
			{
				$(".visiblecss"+layer).prop("checked",true);
				visible = [];
			    //对checkbox数组进行遍历把选中的id添加visible
			    for (var i = 0; i < eval(layer).layerInfos.length; i++) {
		            visible.push(i);
			    }
			    eval(layer).setVisibleLayers(visible);
			}
			/*隐藏全部图层*/
			function hideall(layer)
			{
				 eval(layer).setVisibleLayers([]);
			}
			//图层控制全选
			function choseall(id){

					if($("#"+id).prop("checked"))
						{
							$("#"+id).parent().parent().find("input").each(function(){
									$(this).prop("checked",true);
							});
							showall(id.split("choseall").join(""));
						}
					else{
							$("#"+id).parent().parent().find("input").each(function(){
									$(this).prop("checked",false);
							});
							$(".visiblecss"+id.replace("choseall","")).prop("checked",false);
							hideall(id.replace("choseall",""));
					}
					console.log($(".visiblecsssthx:checked").length);

			}

			function basemapvisb()
			{
				map.getLayer("layer0").setVisibility($("#basemapcontrol").prop("checked"));
			}
			function setwatervisible(isshow){
				$(".basemapclass").filter("#0,#6").each(function (){
					$(this).prop("checked",isshow);

				});
				setbasemapVisibility();
			}
