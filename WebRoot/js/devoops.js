//
//    Main script of DevOOPS v1.0 Bootstrap Theme
//
"use strict";


//
//  Dynamically load  jQuery Timepicker plugin
//  homepage: http://trentrichardson.com/examples/timepicker/
//
function LoadTimePickerScript(callback) {
	if (!$.fn.timepicker) {
		$.getScript('plugins/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.min.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load  JTopo Timepicker plugin
//  homepage: http://www.jtopo.com/
function LoadJTopoScripts(callback) {
	if (typeof JTopo === 'undefined') {
		$.getScript('plugins/jtopo/jtopo-0.4.8-min.js', callback); /*-0.4.8-min*/
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}


//
//  Dynamically load  jQuery Terminal plugin
//  homepage: http://http://terminal.jcubic.pl/
//
function LoadTerminalScripts(callback) {
	if (!$.fn.terminal) {
		$.getScript('plugins/terminal/jquery.terminal-0.8.8.min.js', function() {
			$.getScript('plugins/terminal/jquery.mousewheel-min.js', callback);
		});
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load Bootstrap Validator Plugin
//  homepage: https://github.com/nghuuphuoc/bootstrapvalidator
//
function LoadBootstrapValidatorScript(callback) {
	if (!$.fn.bootstrapValidator) {
		$.getScript('plugins/bootstrapvalidator/bootstrapValidator.min.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load jQuery Select2 plugin
//  homepage: https://github.com/ivaynberg/select2  v3.4.5  license - GPL2
//
function LoadSelect2Script(callback) {
	if (!$.fn.select2) {
		$.getScript('plugins/select2/select2.min.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load DataTables plugin
//  homepage: http://datatables.net v1.9.4 license - GPL or BSD
//
function LoadDataTablesScripts(callback) {
	function LoadDatatables() {
		$.getScript('plugins/datatables/jquery.dataTables.min.js', function() {
			$.getScript('plugins/datatables/dataTables.bootstrap.js', callback);
		});
	}
	if (!$.fn.dataTables) {
		LoadDatatables();
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}


//
//  Dynamically load Flot plugin
//  homepage: http://www.flotcharts.org  v0.8.2 license- MIT
//
function LoadFlotScripts(callback) {
	function LoadFlotScript() {
		$.getScript('plugins/flot/jquery.flot.min.js', LoadFlotResizeScript);
	}

	function LoadFlotResizeScript() {
		$.getScript('plugins/flot/jquery.flot.resize.min.js', LoadFlotTimeScript);
	}

	function LoadFlotTimeScript() {
		$.getScript('plugins/flot/jquery.flot.time.min.js', LoadFlotPieScript);
	}

	function LoadFlotPieScript() {
		$.getScript('plugins/flot/jquery.flot.pie.min.js', callback)
	}

	$.fn.UseTooltip = function(xCal, yCal) { //图表插件提示信息
		$(this).data('previousPoint', null);
		$(this).data('previousLabel', null);
		$(this).bind("plothover", function(event, pos, item) {
			var tooltipId = '#toolTip' + $(this).attr('id') || $(this).attr('class');
			if (item) {
				//console.log($(this).data('previousPoint'), item.dataIndex);
				if (($(this).data('previousLabel') != item.series.label) || ($(this).data('previousPoint') != item.dataIndex)) {
					$(this).data('previousPoint', item.dataIndex);
					$(this).data('previousLabel', item.series.label);
					$(tooltipId).remove();
					var color = item.series.color;
					var label = item.series.label;
					showTooltip(tooltipId.substr(1), pos.pageX,
						pos.pageY,
						color, (label ? '<h5><strong>' + label + '</strong><br></h5>' : '') +
						"<strong>" + xCal(item) +
						"<strong> —— " + yCal(item));
				}
			} else {
				$(tooltipId).remove();
				$(this).data('previousPoint', null);
			}
		});
	};
	if (!$.fn.flot) {
		LoadFlotScript();
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}


/*-------------------------------------------
	Main scripts used by theme
	---------------------------------------------*/
//
//  Function for load content from url and put in $('.ajax-content') block
//
function LoadAjaxContent(url, force) {
	if (!force && location.hash.replace(/^#/, '') === url) return;
	$('.preloader').show();
	if (!(!-[1, ] && (!window.XMLHttpRequest || document.documentMode <= 8))) //非ie8及以下
	{
		window.location.hash = '#' + url;
	} else
		$('#ajax-content').load(url, function() {
			$('.preloader').hide();
			docReady();
		});
}

//
//  Function maked all .box selector is draggable, to disable for concrete element add class .no-drop
//
function WinMove() {
	$("div.box").not('.no-drop')
		.draggable({
			revert: true,
			zIndex: 2000,
			cursor: "crosshair",
			handle: '.box-name',
			opacity: 0.8
		})
		.droppable({
			tolerance: 'pointer',
			drop: function(event, ui) {
				var draggable = ui.draggable;
				var droppable = $(this);
				if (draggable.hasClass('box') && droppable.hasClass('box')) {
					draggable = draggable.parent();
					droppable = droppable.parent();
				}
				draggable.swap(droppable);
			}
		});
}

//
// Swap 2 elements on page. Used by WinMove function
//
jQuery.fn.swap = function(b) {
	b = jQuery(b)[0];
	var a = this[0];
	var t = a.parentNode.insertBefore(document.createTextNode(''), a);
	b.parentNode.insertBefore(a, b);
	t.parentNode.insertBefore(b, t);
	t.parentNode.removeChild(t);
	return this;
};


//
//  Function set min-height of window (required for this theme)
//
function SetMinBlockHeight(elem) {
	elem.css('min-height', window.innerHeight - 49)
}




var runPrefixMethod = function(element, method) {
	var usablePrefixMethod;
	["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
		if (usablePrefixMethod) return;
		if (prefix === "") {
			// 无前缀，方法首字母小写
			method = method.slice(0, 1).toLowerCase() + method.slice(1);
		}
		var typePrefixMethod = typeof element[prefix + method];
		if (typePrefixMethod + "" !== "undefined") {
			if (typePrefixMethod === "function") {
				usablePrefixMethod = element[prefix + method]();
			} else {
				usablePrefixMethod = element[prefix + method];
			}
		}
	});

	return usablePrefixMethod;
};
//
// 绘制拓扑图函数
//
function drawTopology(placeholder, contextMenu) {
	var $placeholder = $(placeholder);
	$placeholder.children().remove().end().append('<canvas></canvas>');
	var $canvas = $placeholder.children('canvas');
	$canvas.attr("width", $placeholder.width());
	$canvas.attr("height", 550);

	//从JSON数据配置舞台
	function createStageFromJson(stageCfg, canvas) {
		var stage = new JTopo.Stage(canvas);
		for (var attr in stageCfg)
			"scenes" != attr && (stage[attr] = stageCfg[attr]);
		var scenes = stageCfg.scenes;
		//遍历每一个场景
		for (var i = 0, scenceCfg = scenes[0]; i < scenes.length; scenceCfg = scenes[++i]) {
			var scene = new JTopo.Scene(stage);
			for (var attr in scenceCfg) {
				"nodes" != attr && "links" != attr && (scene[attr] = scenceCfg[attr]);
			};
			//加载节点(Nodes)
			var nodes = scenceCfg.nodes;
			var nodesContainer = {}; //所有节点的容器
			for (var i = 0, nodeCfg = nodes[0]; i < nodes.length; nodeCfg = nodes[++i]) {
				var node = new JTopo.Node;
				node.fontColor = scenceCfg.nodeFontColor || scenceCfg.fontColor || '67, 110, 144';
				node.setLocation(stage.width * Math.random(), stage.height * Math.random());
				for (var e in nodeCfg) {
					if (e == "type") {
						node.setImage('./img/topoNodes/' + nodeCfg[e] + '.png');
						continue;
					}
					if (e == "alarm"){
						node.alarmColor="203, 88, 69";//默认"255,0,0"
						node.alarmAlpha="1";//默认0.5
						/**
						 * //#1297,告警信息的字体颜色与节点一致
						 */
					}
					node[e] = nodeCfg[e];
				}
				nodesContainer[node.text] = node;

				node.mouseup(function(event){
					var $targetMenu = $(contextMenu);
					if (event.button == '2') {
						$targetMenu.addClass('open').css({
							top: event.pageY,
							left: event.pageX
						}).html($targetMenu[0].originHtml.replace(/\{1\}/g, this.id));
					}
	                //showNodeInfo(this.id);
	            });
				scene.add(node);
			}
			//加载连接(Links)
			var links = scenceCfg.links;
			for (var i = 0, linkCfg = links[0]; i < links.length; linkCfg = links[++i]) {
				var link = new JTopo.Link(nodesContainer[linkCfg.nodeA], nodesContainer[linkCfg.nodeZ], linkCfg.text);
				link.textOffsetY = 3; // 文本偏移量（向下3个像素）
				link.strokeColor = scenceCfg.strokeColor || '0,200,255';
				link.fontColor = scenceCfg.linkFontColor || scenceCfg.fontColor || '67, 110, 144';
				scene.add(link);
			}
			/**
			 * 还未做：
			 *  节点有位置时，不自动布局
			 */
			
			/**
			 *
			 *
			 * test!到时候的位置一定是都固定的！可提供自动布局。
			 */
			// 树形布局
			//scene.doLayout(JTopo.layout.TreeLayout('down', 80, 150));
		};
		showJTopoToobar(placeholder, stage);
		return stage;
	}

	var stage = createStageFromJson({
		//frames: -24, //只有鼠标和键盘操作时才刷新画布
		scenes: [{
			fontColor: '67, 110, 144', //可选，名称颜色，默认为：67, 110, 144
			//nodeFontColor: '200, 0, 0',//可选，节点名称颜色，覆盖总配置
			//linkFontColor: '0, 0, 0',//可选，连线名称颜色，覆盖总配置
			strokeColor: '150, 150, 150',//连线颜色，默认为：0,200,255
			/**
			 * 节点配置
			 * @type {Array}
			 * @params
			 * [id]: 节点id，没有图形意义
			 * type: windows, linux, vmware, idc, server, router, firewall, cloud
			 * [alarm]: 告警值
			 * [x]: 横坐标
			 * text: 节点名
			 * [y]: 纵坐标
			 */
			nodes: [{
				id: '1',
				text: 'windows-1',
				type: 'windows',
				alarm: 2,
				x: 100,
				y: 100
			}, {
				id: '2',
				fontColor: '67, 110, 144',//可选，覆盖以上
				text: 'linux-1',
				type: 'linux',
				alarm: '1'

			}, {
				id: '3',
				text: 'vmware-1',
				type: 'vmware'
			}, {
				id: '4',
				text: 'router-1',
				type: 'router'
			}, {
				id: '5',
				text: 'idc-1',
				type: 'idc'
			}, {
				id: '6',
				text: 'cloud-1',
				type: 'cloud'
			}, {
				id: '7',
				text: 'server-1',
				type: 'server'
			}, {
				id: '8',
				text: 'firewall-1',
				type: 'firewall'
			}],

			/**
			 * 疑问
			 * 连线起点终点，由text标识还是由id标识
			 */
			
			/**
			 * [连线配置]
			 * @type {Array}
			 * @params
			 * [id]: 连线id，没有图形意义
			 * [text]: 连线名
			 * nodeA: 起点名
			 * nodeZ: 终点名
			 */
			links: [{
				id: "1",
				text: "link1",
				nodeA: "cloud-1",
				nodeZ: "router-1"
			}, {
				id: "2",
				text: "link2",
				nodeA: "cloud-1",
				nodeZ: "server-1"
			}, {
				id: "3",
				text: "link3",
				nodeA: "cloud-1",
				nodeZ: "idc-1"
			}, {
				id: "4",
				nodeA: "router-1",
				nodeZ: "firewall-1"
			}, {
				id: "5",
				nodeA: "router-1",
				nodeZ: "windows-1"
			}, {
				id: "6",
				nodeA: "server-1",
				nodeZ: "linux-1"
			}, {
				id: "7",
				nodeA: "server-1",
				nodeZ: "vmware-1"
			}, {
				id: "8",
				nodeA: "idc-1",
				nodeZ: "vmware-1"
			}]
		}]
	}, $canvas[0]); // 创建一个舞台对象
	//stage.wheelZoom = 0.85; // 设置鼠标缩放比例

	contextMenuEnv();
/*-------------------------------------------
	Topology page (Topology.html)
	---------------------------------------------*/
//
// 页面工具栏
function showJTopoToobar(placeholder, stage) {
	var toobarDiv = $('<div class="jtopo_toolbar">').html(
		' <input type="button" id="fullScreenButton" value="全屏显示"/>' +
		' <input type="checkbox" id="zoomCheckbox"> 鼠标缩放' +
		' <input type="text" id="findText" value="">' +
		' <input type="button" id="findButton" value=" 查 询 ">' +
		' <input type="button" id="topoToJson" value=" 保 存 ">' +
		' <input type="button" id="exportButton" value="导出PNG">');

	$(placeholder).prepend(toobarDiv);

	// 工具栏按钮处理
	$('#exportButton').click(function() {
		stage.saveImageInfo();
	});
	$('#topoToJson').click(function(){
		//console.log(stage.toJson());
		var nodes = stage.find('node');
		var result = [];
		for (var i = nodes.length - 1; i >= 0; i--) {
			var node = nodes[i];
			result.push({
				id: node.id,
				x: node.x,
				y: node.y
			})
		};

		console.log(result);
	});
	$('#zoomCheckbox').click(function() {
		if ($('#zoomCheckbox').is(':checked')) {
			stage.wheelZoom = 0.85; // 设置鼠标缩放比例
		} else {
			stage.wheelZoom = null; // 取消鼠标缩放比例
		}
	});
	$('#fullScreenButton').click(function() {
		runPrefixMethod(stage.canvas, "RequestFullScreen")
	});

	$("#findText").keyup(searchNode);
	// 查询
	$('#findButton').click(searchNode);

	function searchNode() {
		var text = $('#findText').val().trim();
		var nodes = stage.find('node[text="' + text + '"]');
		if (nodes.length > 0) {
			for (var i = nodes.length - 1; i >= 0; i--) {
				var node = nodes[0];
				node.selected = true;
				/*var location = node.getCenterLocation();
				// 查询到的节点居中显示
				stage.setCenter(location.x, location.y);
				// 闪烁几下*/
				nodeFlash(node, 6);
			};
		}

		function nodeFlash(node, n) {
			if (n == 0) {
				node.selected = false;
				return;
			};
			node.selected = !node.selected;
			setTimeout(function() {
				nodeFlash(node, n - 1);
			}, 300);
		}
	}
}
}

/*-------------------------------------------
	Demo graphs for Flot Chart page (charts_flot.html)
	---------------------------------------------*/
//
// Graph1 created in element with id = box-one-content
//
function FlotGraph1() {

	var data = [],
		totalPoints = 300;

	function getRandomData() {
		if (data.length > 0)
			data = data.slice(1);
		// Do a random walk
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50,
				y = prev + Math.random() * 10 - 5;
			if (y < 0) {
				y = 0;
			} else if (y > 100) {
				y = 100;
			}
			data.push(y);
		}
		// Zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < data.length; ++i) {
			var date = new Date("2014-11-10 15:" + i + ":00");
			res.push([date.getTime(), data[i]]);
		}
		return res;
	}
	var updateInterval = 2000;
	intervalChart(drawLineChart("#box-one-content", [getRandomData()]), getRandomData, updateInterval);
}

//
// Graph2 created in element with id = box-two-content
//
function FlotGraph2() {
	var rawData = [
		[
			[1582.3, 0], //Gold
			[28.95, 1], //Silver
			[1603, 2], //Platinum
			[774, 3], //Palladium
			[1245, 4], //Rhodium
			[85, 5], //Ruthenium
			[1025, 6] //Iridium
		]
	];
	var ticks = [
		[0, "Gold"],
		[1, "Silver"],
		[2, "Platinum"],
		[3, "Palldium"],
		[4, "Rhodium"],
		[5, "Ruthenium"],
		[6, "Iridium"]
	];
	drawHBarChart("#box-two-content", rawData, ticks);
}


//
// Graph2 created in element with id = box-three-content
//
function FlotGraph3() {
	var rawData = [
		[
			[0, 1582.3], //Gold
			[1, 28.95], //Silver
			[2, 1603], //Platinum
			[3, 774], //Palladium
			[4, 1245], //Rhodium
			[5, 85], //Ruthenium
			[6, 1025] //Iridium
		]
	];
	var ticks = [
		[0, "Gold"],
		[1, "Silver"],
		[2, "Platinum"],
		[3, "Palldium"],
		[4, "Rhodium"],
		[5, "Ruthenium"],
		[6, "Iridium"]
	];
	drawVBarChart("#box-three-content", rawData, ticks, {
		theme: 'black'
	});
}

function FlotPie() {
	var _dataArr = [{
		label: "Asia",
		data: 4119630000
	}, {
		label: "Latin America",
		data: 590950000
	}, {
		label: "Africa",
		data: 1012960000
	}, {
		label: "Oceania",
		data: 35100000
	}, {
		label: "Europe",
		data: 727080000
	}, {
		label: "North America",
		data: 344120000
	}];
	drawPieChart("#box-pie-content", _dataArr);
}

//
// Graph4 created in element with id = box-four-content
//
function FlotGraph4() {

	var _dataArr = [{
		label: "IBM_sniffer_202.181.176.85",
		data: []
	}, {
		label: "sniffer_202.181.225.221_v2",
		data: []
	}, {
		label: "ipcad_mrtg_202.181.225.220_v2",
		data: []
	}, {
		label: "websso_202.181.225.219",
		data: []
	}, {
		label: "necportal_202.181.176.83_Pls dont remove",
		data: []
	}, {
		label: "CNLink_Web_server",
		data: []
	}];
	for (var index = 5; index >= 0; index--) {
		var _val = (index + 1) * 10;
		var _data = [];
		for (var i = 0; i < 20; ++i) { //插入数据
			_val = getRandomData(_val, 10, 60, 0);
			_data.push([new Date("2014-11-10 15:" + i + ":00"), _val]);
		}
		_dataArr[index].data = _data;
	};

	drawLineChart("#box-four-content", _dataArr, {
		legendContainer: '#graph4Legend'
	});

	/*test*/
	function getRandomData(base, range, max, min) {
		var _rel = base + Math.floor(Math.random() * range - range / 2);
		_rel = _rel > max ? max * 3 - _rel * 2 : _rel;
		return _rel < min ? min * 3 - _rel * 2 : _rel;
	}

}


/***
*flot图表绘图函数
*params：
	placeholder：jquery Object，DOM对象，或者jquery选择器内容 //flot图表的容器
	dataArr: [
		{ label:"IBM_sniffer_202.181.176.85" , data: [[x1, y1], [x2, y2], [x3, y3]]},
		{ label:"sniffer_202.181.225.221_v2" , data: [[x1, y1], [x2, y2], [x3, y3]]},
		{ label:"ipcad_mrtg_202.181.225.220_v2" , data: [[x1, y1], [x2, y2], [x3, y3]]}
	] 	//绘图数据，label用于显示legend信息，可不写；
		//折线图中, data中的x轴为time类型，需转化为毫秒（int型）
		//饼图的data为一个整型
	clientOptions: {//个性配置
		theme: black,
		legendContainer: legend的容器，用于折线图和饼图
	}
*return: plot对象
***/

function drawChart(placeholder, dataArr, options, clientOptions) {
	options.grid = {
		borderWidth: 2,
		hoverable: true
	};
	if (clientOptions) {
		if (clientOptions.theme && clientOptions.theme == 'black') {
			options.grid.backgroundColor = {
				colors: ["#171717", "#4F4F4F"]
			}
		};
		if (clientOptions.legendContainer) {
			options.legend = {
				show: true,
				container: $(clientOptions.legendContainer)
			}
		};
	}
	return $.plot(placeholder, dataArr, options);
}

function drawLineChart(placeholder, dataArr, clientOptions) {
	var options = {
		series: {
			shadowSize: 0,
			lines: {
				show: true
			}
		},
		xaxis: {
			mode: "time",
			timezone: "browser",
			timeformat: "%H:%M",
			axisLabel: "Date",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelFontFamily: 'Verdana, Arial',
			axisLabelPadding: 10
		}
	}
	$(placeholder).UseTooltip(
		function(item) {
			var _date = new Date(item.datapoint[0]);
			return formatTime(_date.getHours()) + ':' + formatTime(_date.getMinutes());
		},
		function(item) {
			return item.datapoint[1];
		}
	);
	return drawChart(placeholder, dataArr, options, clientOptions);
}

function formatTime(time) {
	return time >= 10 ? time : '0' + time;
}


/**********
dataArr: [[1582.3, 0], [28.95, 1],[1603, 2];
ticks: [[0, "Gold"], [1, "Silver"], [2, "Platinum"]];
*/
function cfgBarChart(ticks) {
	var options = {
		series: {
			shadowSize: 0,
			bars: {
				align: "center",
				show: true,
				lineWidth: 1,
				barWidth: 0.5
			}
		}
	};
	return options;
}

function drawVBarChart(placeholder, dataArr, ticks, clientOptions) {
	var options = cfgBarChart(ticks);
	options.xaxis = {
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		min: -1,
		max: ticks.length,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 3,
		tickColor: "#5E5E5E",
		ticks: ticks
	}
	$(placeholder).UseTooltip(
		function(item) {
			return item.series.xaxis.ticks[item.datapoint[0]].label;
		},
		function(item) {
			return item.datapoint[1];
		}
	);
	return drawChart(placeholder, dataArr, options, clientOptions);
}

function drawHBarChart(placeholder, dataArr, ticks, clientOptions) {
	var options = cfgBarChart(ticks);
	options.series.bars.horizontal = true;
	options.yaxis = {
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		min: -1,
		max: ticks.length,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 3,
		tickColor: "#5E5E5E",
		ticks: ticks
	};

	$(placeholder).UseTooltip(
		function(item) {
			return item.series.yaxis.ticks[item.datapoint[1]].label;
		},
		function(item) {
			return item.datapoint[0];
		}
	);
	return drawChart(placeholder, dataArr, options, clientOptions);
}

function drawPieChart(placeholder, dataArr, clientOptions) {
	var options = {
		series: {
			pie: {
				show: true,
				innerRadius: 0.5
					/*,
									label: {﻿﻿﻿﻿﻿
										show: true,
										﻿﻿﻿﻿﻿formatter: function (label, series) {                
					                return '<div style="border:1px solid grey;font-size:8pt;text-align:center;padding:5px;color:white;">' +
					                label + ' : ' +
					                Math.round(series.percent) +
					                '%</div>';
					            },
					            background: {
					                opacity: 0.8,
					                color: '#000'
					            },
										﻿ // formatter function
										﻿﻿﻿﻿﻿radius: 1,
										﻿ // radius at which to place the labels (based on full calculated radius if <=1, or hard pixel value)
										﻿﻿﻿﻿﻿
										﻿﻿﻿﻿﻿threshold: 0﻿ // percentage at which to hide the label (i.e. the slice is too narrow)	﻿﻿﻿﻿
									}*/
			}
		}
	};

	$(placeholder).UseTooltip(
		function(item) {
			return item.series.label;
		},
		function(item) {
			return Math.round(item.series.percent) + "%";

		}
	);
	return drawChart(placeholder, dataArr, options, clientOptions);
	//$.plot(placeholder, dataArr, options);
}


function showTooltip(tooltipId, x, y, color, contents) {
	$('<div id="' + tooltipId + '">' + contents + '</div>').css({
		top: y - 10,
		left: x + 10,
		borderColor: color
	}).addClass('flotToolTip').appendTo("body").fadeIn(200);
}


/***
*定时刷新图表
*params:
	plot: plot对象
	dataFunc: 数据获取函数
	interval: 刷新时间间隔(毫秒)
	*/
function intervalChart(plot, dataFunc, interval) {
	plot.setData([dataFunc()]);
	plot.setupGrid(); //刷新坐标值
	plot.draw();
	setTimeout(function() {
		intervalChart(plot, dataFunc, interval);
	}, interval);
}



/*$('#xchart-4').next(".name-tags").remove();

	var myChart = new xChart('line', data, '#xchart-4', {
		dataFormatX: function(x) {
			return new Date(x);
		},
		tickFormatX: function(x) {
			return d3.time.format('%H:%M')(x);
		},
		"mouseover": function(d, i) {
			var pos = $(this).offset();
			$(tt).html(d3.time.format('%Y-%m-%e %H:%M')(d.x) + ' - ' + '<strong>' + d.y + '</strong>')
			.css({
				top: topOffset + pos.top,
				left: pos.left + leftOffset
			})
			.show();
		},
		"mouseout": function(x) {
			$(tt).hide();
		},
		timing: 200
	});*/


//
// Function for table, located in element with id = datatable-3
//
function dataTable(placeholder) {
	var tableDbj = $(placeholder).dataTable({
		"sDom": "T<'col-sm-6'f><'col-sm-6 text-right'l><'clearfix'>rt<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>",
		"sPaginationType": "bootstrap",
		"pageLength": 15,
		"scrollY": "300px",
  		"scrollCollapse": true,
		//"lengthChange": false,
		"oLanguage": {
			"sLengthMenu": "每页显示 _MENU_ 条记录",
			"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			"sInfoEmpty": "没有数据",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			"sZeroRecords": "没有检索到数据",
			"sSearch": "搜索：",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "<<",
				"sNext": ">>",
				"sLast": "尾页"
			}

		}
	});
}


/*-------------------------------------------
	Function for rule page (rule.html)
	---------------------------------------------*/
function ruleCheck(callback) {
	/*$('#ruleTable').on('draw.dt', function() {*/
		$('#ruleTable').find('input.rule-state-check').click(function(event) {
			callback($(this).closest('tr').attr('data-id'), $(this).is(':checked'));
		});
	/*});*/
}

//
// Function for click on table item
//
/*-------------------------------------------
	Function for table pages (property.html etc.)
	---------------------------------------------*/

//
// Function for click on table item
//
function tableTrClick(placeholder, callback) {
	var $placeholder = $(placeholder);
	/*$placeholder.on('draw.dt', function() {*/
		$placeholder.find('tbody tr').click(function(event) {
			//event.preventDefault();
			$(this).addClass('active').siblings('tr').removeClass('active');
			callback($(this).attr('data-id'));
			/*scroll to target*/
			/*var $infoDiv = $('#propertyInfo').not(':hidden');
			if ($infoDiv.length <= 0) {
				return;
			};*/
			//$("body").scrollTop($infoDiv.offset().top);
			//changeInfo();
		});
	/*});*/
}



//
// Function for rightClick on table item
//
function tableContextMenu() {
	$('[data-right-menu]').mouseup(function(event) { //弹出右键菜单
		/* Act on the event */
		event.preventDefault();
		$(this).addClass('active').siblings('tr').removeClass('active');
		var $targetMenu = $($(this).attr('data-right-menu'));
		if (event.button == '2') {
			$targetMenu.addClass('open').css({
				top: event.pageY,
				left: event.pageX
			}).html($targetMenu[0].originHtml.replace(/\{1\}/g, $(this).attr('data-id')));
		}
	}).bind("contextmenu", function(e) { //不显示默认右键菜单
		return false;
	});
	contextMenuEnv();
}
function contextMenuEnv() {
	$('body').mousedown(function(event) { //隐藏右键菜单
		/* Act on the event */
		hideContextMenus();
	});
	$('.right-click-menu').each(function(index, val) { //保存右键菜单原来的数据
		/* iterate through array or object */
		this.originHtml = this.innerHTML;
	}).mousedown(function(event) { //覆盖body的mousedown事件
		/* Act on the event */
		event.stopPropagation(); //阻止事件冒泡
	}).mouseup(function(event) { //在右键菜单上点击后隐藏
		/* Act on the event */
		hideContextMenus();
	}).click(function(event) { //阻止默认跳转
		/* Act on the event */
		event.preventDefault();
	});
	function hideContextMenus() {
		$('.right-click-menu.open').removeClass('open');
	}
}

//
// Function for ssh terminal tool
//
function showTerminal(name, id) {
	$('#terminalModal').modal('show');
	$('#terminalModal .modal-body').terminal(function(command, term) {
		if (command !== '') {
			try {
				term.echo(command);
			} catch (e) {
				term.error(new String(e));
			}
		} else {
			term.echo('');
		}
	}, {
		history: false,
		greetings: 'Javascript Interpreter',
		name: name,
		height: 500
	}).clear().set_prompt(name + '> ');
}

//
// Redraw Knob charts on Dashboard (panel- servers)
//
function RedrawKnob(elem) {
	elem.animate({
		value: Math.floor(100 * Math.random())
	}, {
		duration: 3000,
		easing: 'swing',
		progress: function() {
			$(this).val(parseInt(Math.ceil(elem.val()))).trigger('change');
		}
	});
}


/*-------------------------------------------
	Function for Form Layout page (form layouts.html)
	---------------------------------------------*/
//
// Example form validator function
//
function DemoFormValidator() {
	$('#defaultForm').bootstrapValidator({
		message: 'This value is not valid',
		fields: {
			username: {
				message: 'The username is not valid',
				validators: {
					notEmpty: {
						message: 'The username is required and can\'t be empty'
					},
					stringLength: {
						min: 6,
						max: 30,
						message: 'The username must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: 'The username can only consist of alphabetical, number, dot and underscore'
					}
				}
			},
			country: {
				validators: {
					notEmpty: {
						message: 'The country is required and can\'t be empty'
					}
				}
			},
			acceptTerms: {
				validators: {
					notEmpty: {
						message: 'You have to accept the terms and policies'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: 'The email address is required and can\'t be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
			website: {
				validators: {
					uri: {
						message: 'The input is not a valid URL'
					}
				}
			},
			phoneNumber: {
				validators: {
					digits: {
						message: 'The value can contain only digits'
					}
				}
			},
			color: {
				validators: {
					hexColor: {
						message: 'The input is not a valid hex color'
					}
				}
			},
			zipCode: {
				validators: {
					usZipCode: {
						message: 'The input is not a valid US zip code'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: 'The password is required and can\'t be empty'
					},
					identical: {
						field: 'confirmPassword',
						message: 'The password and its confirm are not the same'
					}
				}
			},
			confirmPassword: {
				validators: {
					notEmpty: {
						message: 'The confirm password is required and can\'t be empty'
					},
					identical: {
						field: 'password',
						message: 'The password and its confirm are not the same'
					}
				}
			},
			ages: {
				validators: {
					lessThan: {
						value: 100,
						inclusive: true,
						message: 'The ages has to be less than 100'
					},
					greaterThan: {
						value: 10,
						inclusive: false,
						message: 'The ages has to be greater than or equals to 10'
					}
				}
			}
		}
	});
}


//
// Function for Dynamically Change input size on Form Layout page
//
function FormLayoutExampleInputLength(selector) {
	var steps = [
		"col-sm-1",
		"col-sm-2",
		"col-sm-3",
		"col-sm-4",
		"col-sm-5",
		"col-sm-6",
		"col-sm-7",
		"col-sm-8",
		"col-sm-9",
		"col-sm-10",
		"col-sm-11",
		"col-sm-12"
	];
	selector.slider({
		range: 'min',
		value: 1,
		min: 0,
		max: 11,
		step: 1,
		slide: function(event, ui) {
			if (ui.value < 1) {
				return false;
			}
			var input = $("#form-styles");
			var f = input.parent();
			f.removeClass();
			f.addClass(steps[ui.value]);
			input.attr("placeholder", '.' + steps[ui.value]);
		}
	});
}

//
//  Helper for correct size of Messages page
//
function MessagesMenuWidth() {
	var W = window.innerWidth;
	var W_menu = $('#sidebar-left').outerWidth();
	var w_messages = (W - W_menu) * 16.666666666666664 / 100;
	$('#messages-menu').width(w_messages);
}


function docReady(selfUrl) {
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});
	/*展开当前菜单栏*/
	/**
	 * bug: 不同癌症子菜单的url可能一样，最先定位到的是.template
	 * 解决办法：1、不同癌症的同种子菜单的url不同
	 *           2、设置标识符，例如在父li节点加上id="prostate"
	 */
	if (selfUrl) {
		var $links = $('#sidebar-left ul a');
		for (var i = 0; i < $links.length; ++i) {
			var $link = $($links[i]);
			if ($link.attr('href') == selfUrl) {
				var $_parentLi = $link.closest('li.dropdown');
				if ($_parentLi.hasClass('active')) break;
				$links.removeClass('active');
				$link.addClass('active');
				$_parentLi.children('a.dropdown-toggle').click();
				break;
			}
		};
	}
	$('.right-click-menu').appendTo('body');
	/*$('.height-limited[data-height]').each(function(index, val) {
		 $(this).css("height", $(this).attr("data-height")+'px');
		});*/
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//
//      MAIN DOCUMENT READY SCRIPT OF DEVOOPS THEME
//
//      In this script main logic of theme
//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
$(document).ready(function() {
	$('body').on('click', '.show-sidebar', function(e) {
		e.preventDefault();
		$('div#main').toggleClass('sidebar-show');
		setTimeout(MessagesMenuWidth, 250);
	});


	//子页面跳转
	window.onhashchange = function() { // Note: We are using statechange instead of popstate
		//var State = History.getState(); // Note: We are using History.getState() instead of event.state
		var targetUrl = location.hash.replace(/^#/, "");
		$.ajax({
			mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
			url: targetUrl,
			type: 'GET',
			success: function(data) {
				$('#ajax-content').html(data);
				$('.preloader').hide();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown);
			},
			dataType: "html",
			async: false
		});
		docReady();
	}

	//初始跳转
	var ajax_url = location.hash.replace(/^#/, '');
	if (ajax_url.length < 1) {
		ajax_url = 'ajax/dashboard.html';
	}
	$('.preloader').show();
	$('#ajax-content').load(ajax_url, function() {
		$('.preloader').hide();
		docReady(ajax_url);
	});

	/*get IE version*/
	var ie = (function() {
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');

		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : undef;

	}());
	/*menu*/
	var $menu = $('.main-menu');

	$menu.find("li").has("ul").children("a").on("click", function(e) {
		e.preventDefault();
		$(this).parent("li").toggleClass("active")
			.children("ul").slideToggle('fast')
			.end().siblings('li').removeClass('active').children('ul').slideUp('fast');
	});

	$('.ajax-link').on("click", function(e) {
		e.preventDefault();
		if ($(this).attr('href') == '#') return;
		$(this).addClass('active').closest('li').siblings('li').children('.ajax-link.active').removeClass('active');
		if ($(this).hasClass('add-full')) {
			$('#content').addClass('full-content');
		} else {
			$('#content').removeClass('full-content');
		}
		var url = $(this).attr('href');
		window.location.hash = url;
		LoadAjaxContent(url);
	});

	var height = window.innerHeight - 49;
	$('#main').css('min-height', height)
		.on('click', '.expand-link', function(e) {
			var body = $('body');
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			button.toggleClass('fa-expand').toggleClass('fa-compress');
			box.toggleClass('expanded');
			body.toggleClass('body-expanded');
			var timeout = 0;
			if (body.hasClass('body-expanded')) {
				timeout = 100;
			}
			box.toggleClass('expanded-padding');
			box.resize();
		})
		.on('click', '.collapse-link', function(e) {
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			var content = box.find('div.box-content');
			content.slideToggle('fast');
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			setTimeout(function() {
				box.resize();
				box.find('[id^=map-]').resize();
			}, 50);
		})
		.on('click', '.close-link', function(e) {
			e.preventDefault();
			var content = $(this).closest('div.box');
			content.remove();
		});
	/*$('#locked-screen').on('click', function (e) {
		e.preventDefault();
		$('body').addClass('body-screensaver');
		$('#screensaver').addClass("show");
		ScreenSaver();
	});*/

	$('#top-panel').on('click', 'a', function(e) {
		if ($(this).hasClass('ajax-link')) {
			e.preventDefault();
			if ($(this).hasClass('add-full')) {
				$('#content').addClass('full-content');
			} else {
				$('#content').removeClass('full-content');
			}
			var url = $(this).attr('href');
			window.location.hash = url;
			LoadAjaxContent(url);
		}
	});

});