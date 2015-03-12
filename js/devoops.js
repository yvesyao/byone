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
//  Clause
//
function LoadClauseScript(callback) {
	if (typeof Clause === 'undefined') {
		$.getScript('./js/clause.js', clauseFuncs(callback));
	} else {
		clauseFuncs(callback);
	}
}

//
//  Dynamically load  jQuery chosen plugin
//  homepage: http://trentrichardson.com/examples/timepicker/
//
function LoadChosenScript(callback) {
	if (!$.fn.chosen) {
		$.getScript('plugins/chosen/chosen.jquery.min.js', callback);
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
		$.getScript('plugins/jtopo/jtopo.js', callback); /*-0.4.8-min*/
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

/*//
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
	}

		if (callback && typeof(callback) === "function") {
			callback();
		}
	}*/

function LoadByoneTableScripts(callback) {
	function LoadByoneTable() {
		$.getScript('plugins/byoneTable/jquery.byoneTable.js', callback);
	}
	if (!$.fn.byoneTable) {
		LoadByoneTable();
	} else if (callback && typeof(callback) === "function") {
		callback();
	}
}


//
//  Dynamically load Hightcharts plugin
//  homepage: http://www.flotcharts.org  v0.8.2 license- MIT
//
//
function LoadHighchartsScripts(callback) {
	if (!$.fn.highcharts) {
		$.getScript('plugins/highcharts/highcharts.js', callback);
	} else {
		if (callback || typeof callback === "function") {
			callback();
		}
	}
}

//
//  Dynamically load Sparkline plugin
//  homepage: http://omnipotent.net/jquery.sparkline v2.1.2  License - BSD
//
function LoadSparkLineScript(callback) {
	if (!$.fn.sparkline) {
		$.getScript('plugins/sparkline/jquery.sparkline.min.js', callback);
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
	if (!(force || !-[1, ] && (!window.XMLHttpRequest || document.documentMode <= 8))) //非ie8及以下
	{
		window.location.hash = '#' + url;
	} else
		$('#ajax-content').load(url, {
			fingerPrint: Math.random()
		}, function() {
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
		console.log('hehe');
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
					switch (e) {
						case 'type':
							node.setImage('./img/topoNodes/' + nodeCfg[e] + '.png');
							break;
						case 'alarm':
							if (nodeCfg[e] == '0')
								break;
							node.alarmColor = "203, 88, 69"; //默认"255,0,0"
							node.alarmAlpha = "1"; //默认0.5
							node[e] = nodeCfg[e];
							/**
							 * 告警信息的字体颜色与节点一致
							 */
							break;
						case 'x':
						case 'y':
							node[e] = parseFloat(nodeCfg[e]);
							break;
						default:
							node[e] = nodeCfg[e];
					}
				}
				if (!(node.x && node.y)) {
					node.setLocation(scene.width * Math.random(), scene.height * Math.random());
				}
				nodesContainer[node.id] = node;

				node.mouseup(function(event) {
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

	//	/*optional stuff to do after success */
	//	var stage = createStageFromJson({
	//		//frames: -24, //只有鼠标和键盘操作时才刷新画布
	//		scenes: [{
	//			fontColor: '67, 110, 144', //可选，名称颜色，默认为：67, 110, 144
	//			//nodeFontColor: '200, 0, 0',//可选，节点名称颜色，覆盖总配置
	//			//linkFontColor: '0, 0, 0',//可选，连线名称颜色，覆盖总配置
	//			strokeColor: '150, 150, 150', //连线颜色，默认为：0,200,255
	//			/**
	//			 * 节点配置
	//			 * @type {Array}
	//			 * @params
	//			 * id: 节点id，没有图形意义
	//			 * type: windows, linux, vmware, idc, server, router, firewall, cloud
	//			 * [alarm]: 告警值
	//			 * [x]: 横坐标
	//			 * text: 节点名
	//			 * [y]: 纵坐标
	//			 */
	//			 nodes: [{
	//			 	id: '1',
	//			 	text: 'windows-1',
	//			 	type: 'windows',
	//			 	alarm: 2,
	//			 	x: 100,
	//			 	y: 100
	//			 }, {
	//			 	id: '2',
	//				fontColor: '67, 110, 144', //可选，覆盖以上
	//				text: 'linux-1',
	//				type: 'linux',
	//				alarm: '1'//

	//			}, {
	//				id: '3',
	//				text: 'vmware-1',
	//				type: 'vmware'
	//			}, {
	//				id: '4',
	//				text: 'router-1',
	//				type: 'router'
	//			}, {
	//				id: '5',
	//				text: 'idc-1',
	//				type: 'idc'
	//			}, {
	//				id: '6',
	//				text: 'cloud-1',
	//				type: 'cloud'
	//			}, {
	//				id: '7',
	//				text: 'server-1',
	//				type: 'server'
	//			}, {
	//				id: '8',
	//				text: 'firewall-1',
	//				type: 'firewall'
	//			}],//

	//			/**
	//			 * 疑问
	//			 * 连线起点终点，由text标识还是由id标识
	//			 *///

	//			/**
	//			 * [连线配置]
	//			 * @type {Array}
	//			 * @params
	//			 * [id]: 连线id，没有图形意义
	//			 * [text]: 连线名
	//			 * nodeA: 起点名
	//			 * nodeZ: 终点名
	//			 */
	//			 links: [{
	//			 	id: "1",
	//			 	text: "link1",
	//			 	nodeA: "6",
	//			 	nodeZ: "4"
	//			 }, {
	//			 	id: "2",
	//			 	text: "link2",
	//			 	nodeA: "6",
	//			 	nodeZ: "7"
	//			 }, {
	//			 	id: "3",
	//			 	text: "link3",
	//			 	nodeA: "6",
	//			 	nodeZ: "5"
	//			 }, {
	//			 	id: "4",
	//			 	nodeA: "4",
	//			 	nodeZ: "8"
	//			 }, {
	//			 	id: "5",
	//			 	nodeA: "4",
	//			 	nodeZ: "1"
	//			 }, {
	//			 	id: "6",
	//			 	nodeA: "7",
	//			 	nodeZ: "2"
	//			 }, {
	//			 	id: "7",
	//			 	nodeA: "7",
	//			 	nodeZ: "3"
	//			 }, {
	//			 	id: "8",
	//			 	nodeA: "5",
	//			 	nodeZ: "3"
	//			 }]
	//			}]
	//	}, $canvas[0]); // 创建一个舞台对象

	// 创建一个舞台对象
	$.get('queryAllTopo.do', function(data) {
		/*optional stuff to do after success */
		var stage = createStageFromJson({
			//frames: -24, //只有鼠标和键盘操作时才刷新画布
			scenes: [{
				fontColor: '67, 110, 144', //可选，名称颜色，默认为：67, 110, 144
				//nodeFontColor: '200, 0, 0',//可选，节点名称颜色，覆盖总配置
				//linkFontColor: '0, 0, 0',//可选，连线名称颜色，覆盖总配置
				strokeColor: '150, 150, 150', //连线颜色，默认为：0,200,255
				/**
				 * 节点配置
				 * @type {Array}
				 * @params
				 * id: 节点id，没有图形意义
				 * type: windows, linux, vmware, idc, server, router, firewall, cloud
				 * [alarm]: 告警值
				 * [x]: 横坐标
				 * text: 节点名
				 * [y]: 纵坐标
				 */
				nodes: data.nodes,
				/**
				 * [连线配置]
				 * @type {Array}
				 * @params
				 * [id]: 连线id，没有图形意义
				 * [text]: 连线名
				 * nodeA: 起点名
				 * nodeZ: 终点名
				 */
				links: data.links
			}]
		}, $canvas[0]); // 创建一个舞台对象
		stage.wheelZoom = 1.15; // 设置鼠标缩放比例
	});


	contextMenuEnv();
	/*-------------------------------------------
		Topology page (Topology.html)
		---------------------------------------------*/
	//
	// 页面工具栏
	function showJTopoToobar(placeholder, stage) {
		var toobarDiv = $('<div class="jtopo_toolbar">').html(
			' <input type="button" id="fullScreenButton" value="全屏显示"/>' +
			/*' <input type="checkbox" id="zoomCheckbox"> 鼠标缩放' +*/
			' <input type="text" id="findText" value="">' +
			' <input type="button" id="findButton" value=" 查 询 ">' +
			' <input type="button" id="topoToJson" value=" 保 存 ">' +
			' <input type="button" id="exportButton" value="导出PNG">');

		$(placeholder).prepend(toobarDiv);

		// 工具栏按钮处理
		$('#exportButton').click(function() {
			stage.saveImageInfo();
		});
		$('#topoToJson').click(function() {
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
			$.ajax({
				url: 'updateAllTopo.do',
				type: "POST",
				datatype: "json",
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify(result),
				success: function(data) {
					/*optional stuff to do after success */
					console.log(data);
					if (data === 'success') {
						showAlert(true, '保存成功', 'success', false, 4000);
					};
				}
			});
			console.log(result);
		});
		/*$('#zoomCheckbox').click(function() {
			if ($('#zoomCheckbox').is(':checked')) {
				stage.wheelZoom = 0.85; // 设置鼠标缩放比例
			} else {
				stage.wheelZoom = null; // 取消鼠标缩放比例
			}
		});*/
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
					stage.setCenter(node.x, node.y);
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
				}, 500);
			}
		}
	}
}

/*-------------------------------------------
	Demo graphs for Flot Chart page (charts_flot.html)
	---------------------------------------------*/

/**
 * dashboard页面公用工作
 * @return {[type]} [description]
 */
function dashboardWorks() {
	$('.charts-header').click(function(event) {
		/* Act on the event */
		$(this).next('.charts-body').toggle();
	});
}

/**
 * 接收一级目录下的图表
 * @param  {String} topCatagory [asset | network | cloud]
 * @return {[type]}             [description]
 */
function receiveCharts(topCatagory) {
	$.get('queryChart.do', {
		topCatagory: topCatagory
	}, function(data) {
		/*optional stuff to do after success */
		var $template = $('div class="col-xs-12 col-sm-6"><div class="box"><div class="box-header"><div class="box-name"><i class="fa fa-line-chart"></i><span class="chart-title"></span></div><div class="box-icons"><a class="collapse-link"><i class="fa fa-chevron-up"></i></a><a class="expand-link"><i class="fa fa-expand"></i></a><a class="close-link"><i class="fa fa-times"></i></a></div><div class="no-move"></div></div><div class="box-content"><div class="charts"></div></div></div></div>');
		for (var i = 0, _chart; i < elements.length; i++) {

		}
	});
}

//
// Graph1 created in element with id = box-one-content
//
function drawChart1() {

	var data = [],
		totalPoints = 20;

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
			//res.push([Date.UTC(2014, 10, 10, 15, i), data[i]]); //月从0开始
		}
		return res;
	}
	var _lineOption = {
			series: [{
				name: 'XX'
			}]
		},
		updateInterval = 2000;
	_lineOption.series[0].data = getRandomData();
	var _chart = drawCharts(_lineOption, "#box-one-content");
	setInterval(function() {
		_chart.series[0].setData(getRandomData());
	}, updateInterval);
}

//
// Graph2 created in element with id = box-two-content
//
function drawChart2() {
	var _columnOption = {
		"series": [{
			"name": "数目",
			"data": [
				["202.168.2.1", '220'],
				["202.168.2.2", '236'],
				["202.168.2.3", '242'],
				["202.168.2.4", '185'],
				["202.168.2.5", '131']
			]
		}],
		"yName": null,
		"type": null,
		"xName": null
	};
	drawCharts(_columnOption, "#box-two-content");
}


//
// Graph2 created in element with id = box-three-content
//
function drawChart3() {
	var _columnOption = {
		type: 'bar',
		xName: 'x-title',
		yName: 'y-title',
		series: [{
			name: 'XX值',
			data: [
				["Web服务", 49.9],
				["交易服务", 71.5],
				["数据库服务", 106.4],
				["CRM", 129.2],
				["XX应用", 144.0]
			]
		}]
	};
	drawCharts(_columnOption, "#box-three-content");
}

function drawPie() {
	var _pieOption = {
		type: 'pie',
		series: [{
				name: '数目',
				data: [
					["主机不响应", 4119630000],
					["系统重启", 590950000],
					["接口关闭", 1012960000],
					["TCP端口关闭", 35100000],
					["硬件问题", 727080000]
				]
			}

		]
	};
	drawCharts(_pieOption, "#box-pie-content");

}

//
// Graph4 created in element with id = box-four-content
//
function drawChart4() {
	var _dataArr = [{
		name: "可用性趋势 202.181.176.85",
		data: []
	}, {
		name: "可用性趋势 202.181.225.221",
		data: []
	}, {
		name: "可用性趋势 202.181.225.220",
		data: []
	}, {
		name: "可用性趋势 202.181.225.219",
		data: []
	}, {
		name: "可用性趋势 202.181.176.83",
		data: []
	}, {
		name: "可用性趋势 202.181.176.183",
		data: []
	}];
	for (var index = 5; index >= 0; index--) {
		var _val = (index + 1) * 10;
		var _data = [];
		for (var i = 0; i < 20; ++i) { //插入数据
			_val = getRandomData(_val, 10, 60, 0);
			_data.push([Date.UTC(2014, 10, 10, 15, i), _val]); //月从0开始
		}
		_dataArr[index].data = _data;
	};
	var _lineOption = {
		series: _dataArr
	}
	drawCharts(_lineOption, '#box-four-content');
	/*test*/
	function getRandomData(base, range, max, min) {
		var _rel = base + Math.floor(Math.random() * range - range / 2);
		_rel = _rel > max ? max * 3 - _rel * 2 : _rel;
		return _rel < min ? min * 3 - _rel * 2 : _rel;
	}
}

/**
	 * highcharts绘制函数
	 * @param  {Object} options 图表选项
	 * @attr  {String} type   图表类型：'line','area', 'column', 'bar', 'line', 'pie', 'spline'可不填
	 * @attr  {String} title  图表名
	 * @attr  {String} xName  x轴名称
	 * @attr  {String} yName  y轴名称
	 * @attr  {Array} series 图表数据
	 *      [{                                 //指定数据列
	            name: 'Jane',                          //数据列名
	            type: 'area', 'areaspline', 'bar', 'column', 'line', 'pie', 'scatter' or 'spline',//待定
	            data: [1, 0, 4]                        //数据
	        }, {
	            name: 'John',
	            data: [5, 7, 3]
	        }]
	 * @param  {String | JQuery Object} placeholder 图表容器
	 * @return {Object}        highcharts对象
	 */
function drawCharts(option, placeholder) {
	var _option = {
		title: {
			text: option.title
		},
		credits: {
			enabled: false // 禁用版权信息
		},
		tooltip: {
			shared: true
		},
		plotOptions: {},
		xAxis: {
			tickPixelInterval: 25,
			title: {
				text: option.xName
			}
		},
		yAxis: {
			title: {
				text: option.yName
			}
		},
		/*legend: {                                                          
            layout: 'vertical',                                            
            align: 'right',                                                
            verticalAlign: 'top',                                          
            x: 0,                                                        
            y: 0,                                                        
            floating: true,                                                
            borderWidth: 1,                                                
            backgroundColor: '#FFFFFF',                                    
            shadow: true                                                   
        }, */
		series: formatNumber(option.series)
	};
	if (option.series[0].data.length > 5) {
		_option.xAxis.labels = {
			rotation: -40 //调节倾斜角度偏移
		};
	}
	if (option.type) {
		switch (option.type) {
			case 'line':
				lineWorks(_option);
				break;
			case 'bar':
			case 'column':
				var _categories = [],
					_series = [],
					_datas = option.series;
				for (var i = 0; i < option.series.length; i++) {
					var op_serie = option.series[i],
						_vals = []
					for (var j = 0; j < op_serie.data.length;) {
						var _data = op_serie.data[j++];
						if (i == 0) { //柱状图的catagories只需要加载一次
							_categories.push(_data[0]);
						}
						_vals.push(_data[1]);
					}
					_series.push({
						name: op_serie.name,
						data: _vals
					});
				}
				_option.xAxis.categories = _categories;
				_option.series = _series;
				break;
			default:
				break;
		}
		_option.chart = {
			type: option.type
		};
	} else { //type(default) = 'line'
		_option.chart = {
			type: 'line'
		};
		lineWorks(_option);
	}
	$(placeholder).highcharts(_option);
	return $(placeholder).highcharts();

	/**
	 * 线形图所需操作
	 * @param  {Object} option
	 * @return {[type]}        [description]
	 */
	function lineWorks(option) {
		_option.xAxis.type = 'datetime';
		_option.plotOptions.line = {
			marker: {
				enabled: false
			}
		}
	}

	/**
	 * 将series中y轴的值转换为number
	 * @param  {[type]} series [description]
	 * @return {[type]}        [description]
	 */
	function formatNumber(series) {
		for (var i = 0; i < series.length; i++) {
			var datas = series[i].data;
			for (var j = 0; j < datas.length; j++) {
				datas[j][1] -= 0;
			}
		}
		return series;
	}
}


//
// Helper for draw Sparkline plots on property page
//
function SparkLineDrawLineGraph(placeholder, arr, color) {
	if (arr !== 'html') {
		$(placeholder).data('spark', arr);
		var _formatedArr = [];
		for (var i = 0; i < arr.length; i++) {
			_formatedArr.push(arr[i][1]);
		};
		arr = _formatedArr;
	};
	$(placeholder).sparkline(arr, {
		defaultPixelsPerValue: 10,
		minSpotColor: null,
		maxSpotColor: null,
		spotColor: null,
		fillColor: false,
		lineWidth: 2,
		lineColor: color || '#6AA6D6'
	});
}

/*function SparkLineDrawBarGraph(placeholder, arr, color){
	$(placeholder).sparkline(arr, { type: 'bar', barWidth: 7, highlightColor: '#000', barSpacing: 2, height: 30, stackedBarColor: color || '#6AA6D6'});
}*/

function SparkLineDrawPieGraph(placeholder, arr, sliceColors, height, color) { //['#af5e9c', '#f86b4f', '#00529c']
	$(placeholder).sparkline(arr, {
		sliceColors: sliceColors || ['#CF110E', '#D59221', '#408C2D'],
		type: 'pie',
		offset: -90,
		height: height || 25
	});
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
	interval: 刷新时间间隔(毫秒)
	*/
function intervalChart(plot, interval) {
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
function dataTable(placeholder, option) {
	var tableOpt = {
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
	};
	if (option) {
		tableOpt = $.extend(true, tableOpt, option);
	}
	var tableDbj = $(placeholder).dataTable(tableOpt);
}

/**
 * 自动填充表格数据
 * @param  {String | JQuery Object} placeholder     表格选择器
 * @param  {Array} data        数据
 */
function loadTableData(placeholder, data) {
	var $tbody = $('tbody', placeholder);
	var $template = $('tr.template', $tbody);
	if ($template.length <= 0) {
		return;
	};
	$('tr', $tbody).not('.template').remove();
	for (var i = 0, _data = data[0]; i < data.length; _data = data[++i]) {
		var $newTr = $template.clone(true, true).removeClass('template').insertBefore($template);
		$('td', $newTr).each(function() {
			$(this).html(_data[$(this).attr('data-name')]);
		});
	};
}

/**
 * 自动填充表单数据
 * @param  {String | JQuery Object} placeholder     表单选择器
 * @param  {Object} data        数据
 * @param  {String} objName        对象名
 *
 */
function loadFormData(placeholder, data, objName) {
	var _prefix = objName ? objName + '.' : '';
	// 开始遍历    
	for (var p in data) {
		// 方法    
		if (typeof(data[p]) == "function") {
			//data[p]();       
		} else {
			console.log('[name="' + _prefix + p + '"]');
			$('[name="' + _prefix + p + '"]', placeholder).val(data[p]);
			// p 为属性名称，data[p]为对应属性的值       

		}
	}

}

/**
 * 窗口顶部提示栏功能
 * @param  {boolean} show    显示还是关闭
 * @param  {String} type    info(default),success,warning,danger
 * @param  {boolean} loading 是否显示loading
 * @param  {number} hideDelay 自动隐藏时间
 * @param  {function} delayCallback 隐藏后执行的函数
 */
function showAlert(show, text, type, loading, hideDelay, delayCallback) {
	var $alert = $('#pageAlert');
	if (!show) {
		$alert.removeClass('in');
		return;
	}
	text && ($('.content', $alert).html(text));
	var _class = $alert[0].className;
	$alert[0].className = _class.replace(/alert-\w*/, 'alert-' + type || 'info');
	$alert.addClass();
	if (loading) {
		$('.loading', $alert).show();
	} else {
		$('.loading', $alert).hide();
	}
	$alert.addClass('in');

	if (hideDelay > 0) {
		setTimeout(function() {
			$alert.removeClass('in');
			//$('#pageAlert').removeClass('in');
			if (delayCallback || typeof delayCallback === 'function') {
				delayCallback();
			}
		}, hideDelay);
	};
}

/*-------------------------------------------
	Function for rule page (rule.html)
	---------------------------------------------*/
function ruleCheck(callback) {
	/*$('#ruleTable').on('draw.dt', function() {*/
	$('#ruleTable').delegate('input.rule-state-check', 'change', function(event) {
		console.log(this);
		if (!callback.call(this, $(this).closest('tr').attr('data-id'), $(this).closest('tr').children('.ruleName').text(), $(this).is(':checked'))) {
			event.preventDefault();
			return false;
		}

	});
	/*});*/
}

function clauseFuncs(callback) {


	var arBtns = '<a href="#" class="add"><span class="glyphicon glyphicon-plus"></span> </a><a href="#" class="remove"><span class="glyphicon glyphicon-minus"></span> </a>';
	var valBtns = '<a href="#" class="fetch btn btn-default btn-xs ml">... </a>';
	var evalBtns = '<a href="#" class="eval btn btn-default btn-xs ml">e</a>';

	$('.clause [name="value"]').after(valBtns);

	//括号操作事件
	$('.clause .bracket').append(arBtns).append('<span class="br-content"></span>').find('a').click(function(event) {
		/* Act on the event */
		event.preventDefault();
		var $content = $(this).nextAll('.br-content');
		var _curCount = $content.data('bracketCount') || 0;
		_curCount += $(this).hasClass('add') ? 1 : -1;
		if (_curCount < 0) return;
		var _brackets = '';
		var _bracketItem = $(this).closest('.bracket').hasClass('left-bracket') ? '(' : ')';
		while ((_curCount--) && (_brackets += _bracketItem));
		$content.data('bracketCount', _curCount).text(_brackets);
	});

	var _rowFunc = {
		/**
		 * 添加新的条目
		 * @param {String | JQuery Object} tableHandle 容器
		 * @param {String | JQuery Object} [trHandle] 目标位置
		 */
		addTr: function(tableHandle, trHandle) {
			//console.log('add');
			var $template = $('.template', tableHandle);
			var $target = trHandle ? $(trHandle).next('tr') : $template;
			return $template.clone(true, true).removeClass('template').insertBefore($target);
		},

		/**
		 * 删除条目
		 * @param {String | JQuery Object} tableHandle 容器
		 * @param {String | JQuery Object} trHandle 目标位置
		 */
		removeTr: function(tableHandle, trHandle) {
			//console.log('remove');
			//if ($(tableHandle).find('tr.clause').length == 2) return;
			$(trHandle).remove();
			return null;
		}
	};
	//行操作事件
	$('.clause .row-action').append(arBtns).find('a').click(function(event) {
		event.preventDefault();
		var _row = _rowFunc[this.className + 'Tr']($(this).closest('table'), $(this).closest('tr'));
		if (_row) { //添加了一行
			$(".chosen-sel", _row).chosen({
				disable_search_threshold: 10,
				search_contains: true,
				width: "100%",
				no_results_text: "没有对应结果!"
			});
		};
	});
	$('legend .add-row').click(function(event) {
		event.preventDefault();
		//给隐藏的select绑定chosen插件会有问题，所以先显示，后绑定
		$(".chosen-sel", _rowFunc.addTr($(this).closest('legend').next('table'))).chosen({
			disable_search_threshold: 10,
			search_contains: true,
			no_results_text: "没有对应结果!"
		});
	});


	//eval
	// 	$('.clause .eval').click(function(event) {
	// 		/* Act on the event */
	// 		var _clauseType = $(this).closest('table').attr('data-clause');
	// 		$('#evalModal').modal('show').on('shown.bs.modal', function() {
	// 			$("#evalModal .chosen-select").chosen({
	// 				disable_search_threshold: 10,
	// 				search_contains: true,
	// 				no_results_text: "没有对应结果!"
	// 			});
	// 		});
	// 		//从远端获取下拉框数据
	// 		console.log('拉取下拉数据：' + _clauseType);
	// 		//success
	// 		var data = [{
	// 			name: '函数1',
	// 			extern: 'func1(eventAttr)'
	// 		}, {
	// 			name: '函数2',
	// 			extern: 'func2(eventAttr,CMDBAttr)'
	// 		}, {
	// 			name: '函数3',
	// 			extern: 'func3(eventAttr,CMDBAttr)'
	// 		}, {
	// 			name: '函数4',
	// 			extern: 'func4(eventAttr,CMDBAttr)'
	// 		}, {
	// 			name: '函数6',
	// 			extern: 'func6(eventAttr)'
	// 		}, {
	// 			name: '函数7',
	// 			extern: 'func7(eventAttr)'
	// 		}];
	// 		$('#evalModal #evalStr').val('');
	// 		var $evalSel = $("#evalModal #evalFunc");
	// 		$('option:gt(0)', $evalSel).remove();
	// 		for (var i = 0; i < data.length; i++) {
	// 			$('<option></option>').text(data[i].name).val(data[i].extern).appendTo($evalSel);
	// 		};
	// 		$('#evalCMDB').val('');
	// 		var $targetSel = $(this).prevAll('input, select');
	// 		$('#evalSubmit').unbind('click.eval').on('click.eval', function(event) {
	// 			var _val = $('#evalModal #evalStr').val();
	// 			addEvalToInput($targetSel, _val, _val);
	// 			$('#evalModal').modal('hide');
	// 		})
	// 	});

	// 	function addEvalToInput(input, val, text) {
	// 		var $input = $(input);
	// 		if ($input.is('input')) {
	// 			$input.val(val);
	// 			return;
	// 		};
	// 		if ($input.is('select')) {
	// 			$('<option></option>').val(val).text(text).appendTo($input);
	// 			$input.val(val).chosen().trigger("chosen:updated");
	// 			return;
	// 		};
	// 		console.log('其他form元素。');
	// 	}

	// 	//evalFunc
	// 	$('#evalFunc').change(addFuncToEval)
	// 		.next('.add-again').click(function(event) {
	// 			addFuncToEval(null, $(this).siblings('select').val());
	// 		});
	// 	$('#evalCMDB, #evalEvent').on('change', addAttrToEval)
	// 		.next('.add-again').click(function(event) {
	// 			addAttrToEval(null, $(this).siblings('select').val());
	// 		});

	// 	document.getElementById('evalStr').curPos = 0;

	// 	/**
	// 	 * 添加eval函数
	// 	 * @param {jQuery Event Object} event [description]
	// 	 * @param {String} attr  参数
	// 	 */
	// 	function addFuncToEval(event, attr) {
	// 		/* Act on the event */
	// 		var target = $('#evalModal #evalStr')[0];
	// 		var _val = addAttrToEval(null, (event ? $(this).val() : attr || ''));
	// 		var _start = _val.lastIndexOf('(') + 1;
	// 		target.curPos = _start; //更新起点
	// 		var _reg = /[\,\)]/;
	// 		_reg.lastIndex = _start;
	// 		var _end = _val.search(_reg); //定位第一个参数
	// 		setInputSelection(target, _start, _end);
	// 	}


	// 	/**
	// 	 * 填充表达式参数，待定参数用eventAttr|CMDBAttr标识
	// 	 * @param {jQuery Event Object} event
	// 	 * @param {String} attr  参数
	// 	 */
	// 	function addAttrToEval(event, attr) {
	// 		var _attr = event ? event.target.value : attr || null;
	// 		if (!_attr) return false;
	// 		var target = $('#evalModal #evalStr')[0];
	// 		var _val = target.value;
	// 		var _reg = /([\,\(])eventAttr|CMDBAttr/; //定位最新函数的第一个待定参数
	// 		_reg.lastIndex = target.curPos; //正则起始位置
	// 		var _pos = _val.search(_reg);
	// 		if (_pos >= 0) { //有函数
	// 			_reg.lastIndex = target.curPos; //正则起始位置
	// 			_val = _val.replace(_reg, '$1' + _attr); //填充参数
	// 			target.curPos = _pos; //更新起点
	// 		} else _val += _attr; //没有待定参数
	// 		return target.value = _val;
	// 	}


	// 	$('#evalReset').click(function(event) {
	// 		event.preventDefault();
	// 		$('#evalStr').val('').prop('curPos', 0);
	// 	});

	// 	if (callback && typeof callback === 'function') {
	// 		callback();
	// 	};
}


//
// Function for click on table item
//
/*-------------------------------------------
	Function for table pages (property.html etc.)
	---------------------------------------------*/

/**
 * 显示覆盖层
 * @param  {String/JQuery Object} handle 覆盖层选择器
 * @param  {boolean} isChild 如果为真，则不隐藏其他overlayFrm
 */
function showOverlayFrm(handle, isChild) {
	var $handle = $(handle);
	$handle.removeClass('hide').show();
	if (isChild) {
		$handle.siblings('.overlay-frm').hide();
	}
	$handle.find('.btn-cancel').unbind("click.overlay").on("click.overlay", function(event) {
		/* Act on the event */
		window.confirm("确定要取消编辑吗？") && hideOverlayFrm(handle);
	});
}

function hideOverlayFrm(handle) {
	$('form', handle).each(function(index, el) {
		$(this)[0].reset();
	});
	$(handle).hide();
}

/**
 * 表格的列的点击事件(点击对应的btn必须有data-func属性)
 * @param  {String|jQuery Object}   placeholder 表格选择器(需要有action-handle属性)
 * @param  {Function} callback    回调函数
 * @return {[type]}               [description]
 */
function tableTrClick(placeholder, callback) {
	var $placeholder = $(placeholder);
	var $btnRely = $('.rely-on-table', $placeholder.attr('action-handle'));
	/*$placeholder.on('draw.dt', function() {*/
	$placeholder.delegate('tbody tr', 'click', function(event) {
		//event.preventDefault();
		/*console.debug('click func');*/
		$(this).addClass('active').siblings('tr').removeClass('active');
		var _id = $(this).attr('data-id') || '';
		if ($btnRely.length > 0) {
			$btnRely.each(function() {
				var _func = $(this).attr('data-func');
				if (_func && _func.indexOf('{1}') >= 0) {
					this.originFunc = _func;
					$(this).removeAttr('disabled');
				}
				$(this).attr('data-func', this.originFunc.replace(/\{1\}/g, _id));
			});
		};
		callback(_id);
		/*scroll to target*/
		/*var $infoDiv = $('#propertyInfo').not(':hidden');
		if ($infoDiv.length <= 0) {
			return;
		};*/
		//$("body").scrollTop($infoDiv.offset().top);
		//changeInfo();
	});
	/*});*/
	$('.rely-on-table').click(function(event) {
		eval($(this).attr('data-func'));
	});
}


//
// Function for rightClick on table item
//
function tableContextMenu(placeholder) {
	$(placeholder).delegate('[data-right-menu]', 'mouseup contextmenu', function(event) { //弹出右键菜单
		/* Act on the event */
		if (event.type == 'contextmenu') {
			return false
		}; //不显示默认右键菜单
		event.preventDefault();
		$(this).addClass('active').siblings('tr').removeClass('active');
		var $targetMenu = $($(this).attr('data-right-menu'));
		if (event.button == '2') {
			$targetMenu.addClass('open').css({
				top: event.pageY,
				left: event.pageX
			}).html($targetMenu[0].originHtml.replace(/\{1\}/g, $(this).attr('data-id')));
		}
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

/**
 * 按照既定规则填充信息
 * @param  {Object} data        来源数据
 * @param  {String | JQuery Object} placeholder 目标位置
 * @param  {Object} attrCfg        特殊字段设置[String：数据赋值到相应的标签；Function：特殊操作]
 */
function fillInfo(data, placeholder, attrCfg) {
	for (var dataName in data) {
		var cfg = (attrCfg ? attrCfg[dataName] : '');
		if (cfg) {
			if (typeof cfg === 'string') {
				console.log('string!');
				$('[data-name=' + dataName + ']', placeholder).attr(cfg, data[dataName]);
			};
			if (typeof cfg === "function") {
				console.log('function!');
				cfg($('[data-name=' + dataName + ']', placeholder), data[dataName]);
			};
			continue;
		};
		$('[data-name=' + dataName + ']', placeholder).html(data[dataName]);
	}
}

/**
 * 选中文本框中部分字符串
 * @param {JQuery Object | String} inputHandle 目标文本框
 * @param {Number} start       起始位置
 * @param {Number} end         终止位置
 */
function setInputSelection(inputHandle, start, end) {
	var target = $(inputHandle)[0];
	if (target.createTextRange) {
		var _range = target.createTextRange();
		_range.moveStart("charactor", start);
		_range.moveEnd("charactor", end);
		$(_range).select();
	} else {
		target.setSelectionRange(start, end);
		$(target).focus();
	}
}

//
// Function for ssh terminal tool
//
function showTerminal(name, id) {
	var _fingerprint = Math.random();
	$('#terminalModal').modal({
		'backdrop': 'static'
	}).on('hide.bs.modal', function(e) {
		$.get('cmdClose.do', {
			fingerprint: _fingerprint
		}, function(data) {
			console.log('terminal closed: ' + data);
		}); //告诉后台关掉本次连接，然后什么都不管了！
	});
	var $loading = $('#terminalModal .loading');
	$loading.show();
	//新建一个连接
	$.get('cmdInit.do', {
		toolName: name,
		deviceID: id,
		fingerprint: _fingerprint
	}, function(data) {
		if (data === "cmdInitSuccess") {
			$loading.hide();
		} else {
			alert('加载运维工具错误！');
		}
		//console.log('terminal opened: ' + data);
	});

	$('#terminalModal .modal-body').terminal(function(command, term) {
		if (command !== '') {
			try {
				term.pause();
				$.get('cmdOperate.do', {
					operate: command,
					fingerprint: _fingerprint
				}, function(data) {
					term.resume();
					term.echo(data);
				});
			} catch (e) {
				term.error(new String(e));
			}
		} else {
			term.echo('');
		}
	}, {
		history: false,
		greetings: '运维工具',
		name: name,
		height: 500
	}).clear().set_prompt(name + '> ');
}

/**
 * 表格可以拖动调整列宽
 * @param  {DOM Object} table 表格对象
 */
function tableColResize(table) {
	var tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
	var _cells = table.rows[0].cells;
	for (var j = 0, _cell = _cells[0]; j < _cells.length - 1; _cell = _cells[++j]) {
		_cell.onmousedown = function(event) {
			//记录单元格
			if (event.clientX - $(this).offset().left > this.offsetWidth - 5) {
				tTD = this;
				tTD.mouseDown = true;
				tTD.oldX = event.clientX;
				tTD.oldWidth = tTD.offsetWidth;
			}
		};
		_cell.onmousemove = function(event) {
			if (!this.mouseDown) {
				//event.offsetX不兼容ff
				if (event.clientX - $(this).offset().left > this.offsetWidth - 5)
					this.style.cursor = 'col-resize';
				else
					this.style.cursor = 'default';
			}
		}
	}
	table.onmousemove = function(event) {
		//调整宽度
		if (tTD && tTD.mouseDown) {
			var _width = event.clientX - $(tTD).offset().left;
			tTD.style.width = (_width > 5 ? _width : 5) + 'px';
		}
	};
	table.onmouseup = function() {
		//结束宽度调整
		if (tTD) tTD.mouseDown = false;
	};
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

/*function getContextPath() {
　 var pathName = document.location.pathname;
　 var index = pathName.substr(1).indexOf("/");
　 var result = pathName.substr(0,index+1);
　 return result;
}*/

function docReady(selfUrl) {
	$('a, buttom').filter('[href="#"]').click(function(e) {
		e.preventDefault();
	});
	/*展开当前菜单栏*/
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
	/*鼠标穿透*/
	var supportsPointerEvents = (function() {
		var dummy = document.createElement('_');
		if (!('pointerEvents' in dummy.style)) return false;
		dummy.style.pointerEvents = 'auto';
		dummy.style.pointerEvents = 'x';
		document.body.appendChild(dummy);
		var r = getComputedStyle(dummy).pointerEvents === 'auto';
		document.body.removeChild(dummy);
		return r;
	})();
	$("table.table").each(function() {
		tableColResize(this);
	});
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
		$('div#main').toggleClass('sidebar-show').bind('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
			$(document).resize();
		});
		/*setTimeout(MessagesMenuWidth, 250);*/
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
				docReady();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown);
			},
			dataType: "html",
			async: false
		});
	}

	//初始跳转
	var ajax_url = location.hash.replace(/^#/, '');
	if (ajax_url.length < 1) {
		ajax_url = 'ajax/asset-dashboard.html';
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
		$(this).parent("li").toggleClass("active")
			.children("ul").stop(true, true).slideToggle('fast')
			.end().siblings('li').removeClass('active').children('ul').slideUp('fast');
	});

	/**
	 * 绑定main.html中的ajax跳转
	 */
	$('.ajax-link').on("click", ajaxJump);
	/**
	 * 动态绑定子页面中的ajax跳转
	 */
	$('#ajax-content').delegate('.ajax-link', 'click', ajaxJump);

	function ajaxJump(e) {
		e.preventDefault();
		if ($(this).attr('href') == '#') return;
		$(this).addClass('active').closest('.nav').find('.ajax-link.active').not(this).removeClass('active');
		if ($(this).hasClass('add-full')) {
			$('#content').addClass('full-content');
		} else {
			$('#content').removeClass('full-content');
		}
		var url = $(this).attr('href');
		window.location.hash = url;
		LoadAjaxContent(url);
	}

	var height = window.innerHeight - 49;
	$('#main').css('min-height', height)
		.delegate('.expand-link', 'click', function(e) {
			var body = $('body');
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			button.toggleClass('fa-expand').toggleClass('fa-compress');
			box.toggleClass('expanded');
			box.toggleClass('expanded-padding');
			body.toggleClass('body-expanded');
			box.bind('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() { //
				box.resize();
				$(document).resize();
			});
		})
		.delegate('.collapse-link', 'click', function(e) {
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
		.delegate('.config-link', 'click', function(e) {
			e.preventDefault();
			var $box = $(this).closest('div.box');
			var $config = $('.config-panel', $box);
			if ($config.is(':hidden')) {
				$box.addClass('half');
				setTimeout(function() {
					$config.show();
					$box.addClass('hover').removeClass('half');
				}, 400);
			} else {
				$box.removeClass('hover').addClass('half');
				setTimeout(function() {
					$config.hide();
					$box.removeClass('half');
				}, 400);
			}

		})
		.delegate('.close-link', 'click', function(e) {
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
			//window.location.hash = url;
			LoadAjaxContent(url);
		}
	});

});