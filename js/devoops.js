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
		$.getScript('http://cdn.bootcss.com/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.min.js', function() {
			$.getScript('http://cdn.bootcss.com/jquery-ui-timepicker-addon/1.4.5/i18n/jquery-ui-timepicker-zh-CN.js', callback)
		});
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
		$.getScript('./js/clause.js', function() {
			clauseFuncs(callback)
		});
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
		$.getScript('http://cdn.bootcss.com/chosen/1.4.2/chosen.jquery.min.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

function LoadCitySelectScript(callback) {
	if (!$.fn.citySelect) {
		$.getScript('./plugins/citySelect/jquery.cityselect.js', callback);
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
		//$.getScript('http://cdn.bootcss.com/bootstrap-validator/0.4.5/js/bootstrapvalidator.min.js', function() {
			$.getScript('plugins/bootstrapvalidator/bootstrapValidator.min.js', function() {
				$.getScript('plugins/bootstrapvalidator/language/zh_CN.js', callback);
			});		
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

	function LoadByoneTableScripts(callback, option) {
		function LoadByoneTable() {
			$.getScript('plugins/byoneTable/jquery.byoneTable.js', function() {
				if (callback && typeof(callback) === "function") callback(option);
			});
		}
		if (!$.fn.byoneTable) {
			LoadByoneTable();
		} else if (callback && typeof(callback) === "function") {
			callback(option);
		}
	}


//
//  Dynamically load Hightcharts plugin
//  homepage: http://www.flotcharts.org  v0.8.2 license- MIT
//
//
function LoadHighchartsScripts(callback) {
	if (!$.fn.highcharts) {
		$.getScript('http://cdn.bootcss.com/highcharts/4.1.5/highcharts.js', function() {
			Highcharts.setOptions({
				global: {
					useUTC: false
				}
			});
			if (callback || typeof callback === "function") {
				callback();
			}
		});
	} else {
		if (callback || typeof callback === "function") {
			callback();
		}
	}
}



//
//  Dynamically load Fancybox 2 plugin
//  homepage: http://fancyapps.com/fancybox/ v2.1.5 License - MIT
//
function LoadFancyboxScript(callback) {
	if (!$.fn.fancybox) {
		$.getScript('plugins/fancybox/jquery.fancybox.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
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
	showAlert(false);
	$('.preloader').show();
	if (!(force || !-[1, ] && (!window.XMLHttpRequest || document.documentMode <= 8))) { //非ie8及以下
		window.location.hash = '#' + url;
	} else {
		$('#ajax-content').load(url, {
			fingerPrint: Math.random()
		}, function() {
			$('.preloader').hide();
			docReady(url);
		});
	}
}

//
//  Function maked all .box selector is draggable, to disable for concrete element add class .no-drop
//
function WinMove() {
	/*$("div.box").not('.no-drop')
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
		});*/
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
		//console.log('hehe');
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
			var nodes = scenceCfg.nodes,
				nodesContainer = {}; //所有节点的容器
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
								}).html($targetMenu[0].originHtml.replace(/\{1\}/g, this.id).replace(/\{2\}/g, this.ip));
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
			' <input type="button" id="exportButton" value="导出PNG">' +
			' <input type="button" id="redoLayout" value="自动布局">');
		$(placeholder).prepend(toobarDiv);

		// 工具栏按钮处理
		$('#exportButton').click(function() {
			stage.saveImageInfo();
		});
		$('#topoToJson').click(function() {
			////console.log(stage.toJson());
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
					//console.log(data);
					if (data === 'success') {
						showAlert(true, '保存成功', 'success', false, 4000);
					};
				}
			});
			//console.log(result);
		});

		$('#redoLayout').click(function(event) {
			/* Act on the event */
			var scenes = stage.childs;
			for (var i = 0; i < scenes.length; i++) {
				scenes[i].doLayout(JTopo.layout.TreeLayout('down', 80, 150));
				//scenes[i].doLayout(JTopo.layout.GridLayout(800, 850));
				//scenes[i].doLayout(JTopo.layout.FlowLayout(80, 150));
			};
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

 	$('.add-chart-btn, .chart-catagory').click(function(event) {
 		/* Act on the event */
 		event.preventDefault();
 		event.stopPropagation();
 		return false;
 	});
 }

/**
 * 接收一级目录下的图表
 * @param  {String} topCategory [asset | network | cloud]
 * @return {[type]}             [description]
 */
 function receiveCharts(topCategory) {
 	showAlert(true, "获取图表数据...", 'info', true);
 	var $template = $('<div class="col-xs-12 col-sm-6">\
 		<div class="box">\
 		<div class="box-header">\
 		<div class="box-name">\
 		<i class="fa fa-line-chart">\
 		</i>\
 		<span class="chart-title">\
 		</span>\
 		</div>\
 		<div class="box-icons">\
 		<a href="#" class="collapse-link"> <i class="fa fa-chevron-up"></i> </a>\
 		<a href="#" class="config-link"> <i class="glyphicon glyphicon-cog"></i> </a>\
 		<a href="#" class="expand-link"> <i class="fa fa-expand"></i> </a>\
 		<a href="#" class="close-link"><i class="fa fa-times"></i></a>\
 		</div>\
 		<div class="no-move"></div>\
 		</div>\
 		<div class="box-content">\
 		<div class="zoom loading">\
 		<div class="spinner"></div>\
 		</div>\
 		<div class="charts"></div>\
 		<div class="config-panel">\
 		<form action="#" class="form-horizontal">\
 		<div class="form-group col-xs-12">\
 		<label class="control-label col-xs-4">图表类型: </label>\
 		<div class="col-xs-8">\
 		<select class="form-control" name="type">\
 		<option value="line">线形图</option>\
 		<option value="area">区域图</option>\
 		<option value="column">柱状图(垂直)</option>\
 		<option value="bar">柱状图(水平)</option>\
 		<option value="pie">饼状图</option>\
 		</select>\
 		</div>\
 		</div>\
 		<!-- /.form-group -->\
 		<div class="form-group col-xs-12">\
 		<label class="control-label col-xs-4">查询数量: </label>\
 		<div class="col-xs-8">\
 		<select class="form-control" name="itemCount">\
 		<option value="5">5</option>\
 		<option value="10">10</option>\
 		<option value="15">15</option>\
 		<option value="20">20</option>\
 		<option value="25">25</option>\
 		</select>\
 		</div>\
 		</div>\
 		<!-- /.form-group -->\
 		<div class="form-group col-xs-12">\
 		<label class="control-label col-xs-4">查询时间: </label>\
 		<div class="col-xs-8">\
 		<select class="form-control" name="timeVal">\
 		<option value="300000">最近5分钟</option>\
 		<option value="1800000">最近30分钟</option>\
 		<option value="5200000">最近2小时</option>\
 		<option value="86400000">最近1天</option>\
 		</select>\
 		</div>\
 		</div>\
 		<!-- /.form-group -->\
 		<div class="form-group col-xs-12">\
 		<label class="control-label col-xs-4">刷新周期: </label>\
 		<div class="col-xs-8">\
 		<select class="form-control" name="refresh">\
 		<option value="120000">2分钟</option>\
 		<option value="300000" selected>5分钟</option>\
 		<option value="900000">15分钟</option>\
 		<option value="1200000">20分钟</option>\
 		<option value="1800000">30分钟</option>\
 		</select>\
 		</div>\
 		</div>\
 		<div class="form-group col-xs-12">\
 		<div class="col-xs-4">\
 		<input type="submit" class="btn btn-default pull-right" value="确 定" />\
 		</div>\
 		<div class = "col-xs-4" >\
 		<input type = "button"	class = "dismiss-config btn btn-default pull-right" value = "取 消" / >\
 		</div>\
 		</div>\
 		</form>\
 		</div>\
 		<!-- /.config-panel  -->\
 		</div>\
 		</div>\
 		</div>');

/*获取图表结构*/
$.get('queryChart.do', {
	topCategory: topCategory,
	fingerprint: new Date().getTime()
}, function(data) {
	/*optional stuff to do after success */
	showAlert(false);
	for (var i = 0; i < data.length; ++i) {
		addChart(data[i]);
	}
});


/*绑定图表添加事件*/
$('.add-chart-btn').click(function(event) {
	/* Act on the event */
	event.preventDefault();
	var $lowCategory = $(this).closest('.low-category');
	var _chartCategory = $lowCategory.find('.chart-catagory').val();
	if (!_chartCategory) {
		showAlert(true, "请选择一种图表！", 'danger', false, 2000);
		return false;
	}
	showAlert(true, "添加图表中...", 'info', true);
	$.get('addChart.do', {
		chartCategory: _chartCategory,
		lowCategory: $lowCategory[0].id,
		topCategory: topCategory
	}, function(data) {
		if (data === "error") {
			showAlert(true, "添加失败，请重试或联系管理员。", 'danger', false, 5000);
			return;
		}
		showAlert(true, "添加成功。", 'success', false, 2000);
		addChart(data);
	});

});


function dismissConfig(event) {
	$(this).closest('.box').find('.config-link').trigger('click');
}

	/**
	 * 根据配置信息新建或者修改图表
	 * @param {Object} chartCfg  图表配置信息
	 * @param {String | jQuery Object} [targetBox] 更新图表信息时的容器
	 */
	 function addChart(chartCfg, targetBox) {
	 	var _chartCfg = chartCfg;
	 	var $newBox = targetBox ? $(targetBox) : $template.clone(true, true).appendTo('#' + _chartCfg.lowCategory + ' .charts-body');
	 	$('.chart-title', $newBox).text(_chartCfg.chineseName);

	 	/*设置定时刷新*/
	 	var queryInterval = setInterval(queryChart(_chartCfg, $newBox), _chartCfg.refreshTime)

	 	/*填充配置form信息*/
	 	var $form = $('.config-panel form', $newBox);
	 	var $refresh = $('select[name="refresh"]', $form),
	 	$type = $('select[name="type"]', $form),
	 	$itemCount = $('select[name="itemCount"]', $form),
	 	$timeVal = $('select[name="timeVal"]', $form);
	 	/*重置可选类型下拉框的条目*/
	 	var $options = $('option', $type);
	 	for (var j = 0; j < $options.length; ++j) {
	 		var _option = $($options[j]);
	 		if (_chartCfg.allStyle.indexOf(_option.val()) < 0) {
	 			_option.remove();
	 		}
	 	}
	 	$type.val(_chartCfg['style']);
	 	$refresh.val(_chartCfg.refreshTime);
	 	$itemCount.val(_chartCfg.itemCount);
	 	$timeVal.val(_chartCfg.timeVal);

	 	/*绑定newBox中元素的事件*/
	 	/*删除图表事件*/
	 	$newBox.bind('removed', function() {
	 		showAlert(true, "删除中...", 'info', true);

			//console.log($newBox);
			$.get('deleteChartBase.do', {
				indexId: _chartCfg.detailId
			}, function(data) {
				if (data === 'operateSuccess') {
					showAlert(true, "删除成功。", 'success', false, 2000);
				} else {
					showAlert(true, "删除失败，请重试或联系管理员。", 'danger', false, 2000);
					$newBox.show();
				}
			});
		})

	 	/*更改配置事件*/
	 	$form.unbind('submit').bind('submit', function(event) {
	 		/* Act on the event */
	 		event.preventDefault();
			var $submitBtn = $(':submit', this).attr('disabled', 'disabled'); //禁用提交按钮
			showAlert(true, "更改图表配置中...", 'info', true);

			/*更新数据*/
			$.get('updateChartDetail.do', $.extend(true, _chartCfg, {
				refreshTime: $refresh.val(),
				style: $type.val(),
				itemCount: $itemCount.val(),
				timeVal: $timeVal.val()
			}), function(data) {
				/*optional stuff to do after success */
				//console.log(data);
				$submitBtn.removeAttr('disabled'); //解除禁用提交按钮
				if (data === "error") {
					showAlert(true, "更改失败，请重试或联系管理员。", 'danger', false, 5000);
					return;
				}
				showAlert(true, "更改成功。", 'success', false, 2000);
				clearInterval(queryInterval); //清除原定时刷新
				$('.loading', $newBox).show(); //显示等待界面
				dismissConfig.call($form); //退出配置界面
				addChart(data, $newBox);
			});
		});
	 	$('.dismiss-config').unbind('click.config').bind('click.config', dismissConfig);
	 }


	}

/**
 * 获取图表数据
 * @param  {[type]} chartCfg    [description]
 * @param  {[type]} placeholder [description]
 * @return {[type]}             [description]
 */
 function queryChart(chartCfg, placeholder) {
 	$.get('receiveData.do', chartCfg, function(data) {
 		/*optional stuff to do after success */
 		drawCharts(data, $('.charts', placeholder));
 		$('.loading', placeholder).hide();
 	});
 }

/**
	 * highcharts绘制函数
	 * @param  {Object} options 图表选项
	 * @attr  {String} type   图表类型：'line','area', 'column', 'bar', 'line', 'pie'可不填
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
	//console.log(option);
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
        series: __chartFuncs.formatNumber(option.series, option.type === 'line')
    };
    if (_option.series && _option.series[0] && _option.series[0].data.length > 5) {
    	_option.xAxis.labels = {
			rotation: -40 //调节倾斜角度偏移
		};
	}
	if (option.type) {
		switch (option.type) {
			case 'line':
			case 'area':
			lineWorks(_option);
			break;
			case 'bar':
			case 'column':
			__chartFuncs.rebuildColData(_option);
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

return $(placeholder).highcharts(_option);

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
	}

	var __chartFuncs = {
	/**
	 * 重新装配柱状图(column, bar)的data数据
	 * @param  {[type]} option [description]
	 * @return {[type]}        [description]
	 */

	 rebuildColData: function(option) {
	 	var _categories = [],
	 	_series = [],
	 	_datas = option.series || null;
	 	if (!_datas) {
	 		return;
	 	}
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
		option.xAxis.categories = _categories;
		option.series = _series;
	},

	/**
	 * 将series中y轴的值转换为number
	 * @param  {[type]} series [description]
	 * @return {[type]}        [description]
	 */
	 formatNumber: function(series, isLine) {
	 	if (!series) {
	 		return null;
	 	}
	 	for (var i = 0; i < series.length; i++) {
	 		var datas = series[i].data;
	 		for (var j = 0; j < datas.length; j++) {
	 			isLine && (datas[j][0] -= 0);
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
			// //console.log('[name="' + _prefix + p + '"]');
			var $item = $('[name="' + _prefix + p + '"]', placeholder);
			$item.length && $item.val(data[p]);
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



/**
 * 根据form元素的name属性返回的值
 * @param  {String} name 元素的name
 * @return {String}      元素的value值
 */
 function getValByName(name) {
 	var $item = $('[name = ' + name + ']');
 	if ($item.is(':checkbox')) {
 		var _result = [];
 		$item.filter(':checked').each(function(index, el) {
 			_result.push($(this).val());
 		});
 		return _result;
 	}
 	if ($item.is(':radio')) {
 		return $item.filter(':checked').val();
 	}
 	return $('[name = ' + name + ']').val();
 }

/*-------------------------------------------
	Function for rule page (rule.html)
	---------------------------------------------*/

	function reportWorks() {

		/*绝对时间，相对时间*/
		$('.period').change(periodType).filter('[value = "0"]').click().change();

		/*获取报表条目*/
		var reportItemList;
	if (window.localStorage && (reportItemList = localStorage.getItem('reportItemList'))) { //本地缓存
		//console.log(reportItemList);
		buildReportItems(JSON.parse(reportItemList));
	} else {
		$.get('queryReport.do', {
			fingerPrint: new Date().getTime()
		}, function(reportItemList) {
			window.localStorage && window.localStorage.setItem('reportItemList', JSON.stringify(reportItemList));
			buildReportItems(reportItemList);
		});
	}


	function buildReportItems(reportItemList) {
		var $reportBox = $('#reportBox');
		var $groupUl = $('<ul>').appendTo($reportBox);
		var _groupList = {};
		for (var i = 0; i < reportItemList.length; i++) {
			var _groupItem = reportItemList[i],
			_groupName = _groupItem.typeChineseName,
			$groupContainer = _groupList[_groupName] || (_groupList[_groupName] = $('<li><label class="group"><input type="checkbox">' + _groupName + '</label><ul></ul></li>').appendTo($groupUl));
			var $newLabel = $('<li><label></label></li>').appendTo($('ul', $groupContainer)).children('label').attr('title', _groupItem.name).text(_groupItem.name);
			//console.log($newLabel);
			$('<input type="checkbox">').attr({
				'id': _groupItem.id,
				'name': 'reportVos',
				'data-name': 'reportVos'
			}).val(_groupItem.id).data('vo', _groupItem).prependTo($newLabel)

		};
		$('.loading', $reportBox).hide();
	}

	LoadBootstrapValidatorScript(function() {
		$('#reportForm').bootstrapValidator({
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			//container: 'tooltip',
			fields: {
				'name': {
					validators: {
						notEmpty: {
							message: "名称不能为空"
						}
					}
				},
				'moduleName': {
					validators: {
						notEmpty: {
							message: "名称不能为空"
						}
					}
				},
				'format': {
					validators: {
						notEmpty: {
							message: "请选择类型"
						}
					}
				},
				'timeType': {
					validators: {
						notEmpty: {
							message: "请选择时间类型"
						}
					}
				},
				'timeVal': {
					validators: {
						callback: {
							callback: checkTime
						}
					}
				},
				'stime': {
					validators: {
						callback: {
							callback: checkTime
						}
					}
				},
				'etime': {
					validators: {
						callback: {
							callback: checkTime
						}
					}
				},
				'receiver': {
					validators: {
						regexp: {
							regexp: /^\s*((\w-*\.*)+@(\w-?)+(\.\w{2,})+)(\s*;\s*(\w-*\.*)+@(\w-?)+(\.\w{2,})+)*\s*$/,
							message: '请输入正确格式的email，用分号隔开'
						}
					}
				}
				/*,
				'reportVos': {
					validators: {
						notEmpty: {
							message: "必须最少选择一个报表条目"
						}
					}
				}*/
			}
		}).on('success.form.bv', function(e) {
			e.preventDefault();
			showAlert(true, "提交中...", 'info', true);
			var _timeType = getValByName('timeType'), //1绝对 0相对
			_unitVal = {
				'min': 60000,
				'hour': 3600000,
				'day': 86400000
			},
			_result = {
				id: getValByName('id'),
				timeType: _timeType,
				name: getValByName('name'),
				format: getValByName('format'),
				fingerprint: new Date().getTime()
			},
			_formType = $(this).data('type'),
			$downBtn = $('#downloadBtn').hide(),
			_rtList = [];

			/*获取报表条目*/
			$('[name = "reportVos"]:checked').each(function(index, el) {
				_rtList.push($(this).data('vo'));
			});
			_result.reportVos = _rtList;

			/*手动报表*/
			if (_formType === 'manual') {
				/*获取时间*/
				if (_timeType === '0') {
					_result.timeVal = getValByName('timeVal') * _unitVal[getValByName('periodUnit')];
				} else if (_timeType === '1') {
					_result.stime = new Date(getValByName('stime')).getTime();
					_result.etime = new Date(getValByName('etime')).getTime();
				}
				/*manual add mod*/
				$.ajax({
					url: 'manualReport.do',
					type: "POST",
					datatype: "json",
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify(_result),
					success: function(data) {
						/*optional stuff to do after success */
						//console.log(data);
						$downBtn.attr('href', './downloadReport.do?reportPath=' + data.reportPath + '&format=' + _result.format).unbind('click').removeClass('hide').show();
						showAlert(true, "请点击下载", 'success', false, 2000);
					}
				});
				return;
			}

			/*自动报表*/
			_result = $.extend(true, _result, {
				'id': getValByName('id'),
				'moduleName': getValByName('moduleName'),
				'moduleType': getValByName('moduleType'),
				'month': getValByName('month'),
				'day': getValByName('day'),
				'hour': getValByName('hour')
			});
			/*规范邮箱*/
			var emailList = getValByName('receiver').split(';');
			for (var i = 0; i < emailList.length; i++) {
				emailList[i] = $.trim(emailList[i]);
			};
			_result.receiver = emailList.join();
			$.ajax({
				url: _formType + 'AutoReport.do',
				type: "POST",
				datatype: "json",
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify(_result),
				success: function(data) {
					if (data.result === 'operateSuccess') {
						showAlert(true, "提交成功", 'success', false, 500, function() {
							LoadAjaxContent(window.location.hash.substring(1), true);
						});
					}
				}
			});
		});
})

function checkTime(value, validator, $field) {
		// ... Do your logic checking
		if (!value && ($field.is('.relative-time') && '0' === getValByName('timeType') || $field.is('.absolute-time') && '1' === getValByName('timeType'))) {
			return {
				valid: false, // or true
				message: '时间不能为空'
			}
		}
		if ($field.is('.relative-time') && '0' === getValByName('timeType') && value <= 0) {
			return {
				valid: false, // or true
				message: '时间必须大于0'
			}
		}
		return {
			valid: true
		}
	}


	function periodType(event) {
		//console.log('change');
		if ($(this).val() === '0') {
			$(this).closest('form')
			.find('.period-relative').removeClass('hide').show()
			.siblings('.period-absolute').hide();
		} else {
			$(this).closest('form')
			.find('.period-absolute').removeClass('hide').show()
			.siblings('.period-relative').hide();
		}
	}
}

function ruleCheck(callback) {
	/*$('#ruleTable').on('draw.dt', function() {*/
		$('#ruleTable').delegate('input.rule-state-check', 'change', function(event) {
		//console.log(this);
		if (!callback.call(this, $(this).closest('tr').attr('data-id'), $(this).closest('tr').children('.ruleName').text(), $(this).is(':checked'))) {
			event.preventDefault();
			return false;
		}

	});
		/*});*/
}


/**
 * Clause相关的函数
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
 function clauseFuncs(callback) {
 	if ($('.event-attr').length > 0) {
		//获取属性下拉列表
		$('#eventAttrSel').remove();
		$('<ul id="eventAttrSel">').appendTo('body').hide();
		var eventAttr;
		if (window.localStorage && (eventAttr = localStorage.getItem('cmdbEA'))) { //本地缓存
			setAppendTask(JSON.parse(eventAttr), 100, $('#eventAttrSel'), 10);
		} else {
			$.get('queryEventAttr.do', function(eventAttr) {
				setAppendTask(eventAttr, 100, $('#eventAttrSel'), 10);
				window.localStorage && window.localStorage.setItem('cmdbEA', JSON.stringify(eventAttr));
			});
		}

		$('.event-attr').unbind('focus click input').focus(function(event) {
			/* Act on the event */
			var _offset = $(this).offset();
			var _offset = $(this).offset(),
			_h = $(this).outerHeight();
			$('#eventAttrSel').data('target', this).css({
				top: _offset.top + _h + 'px',
				left: _offset.left + 'px'
			}).slideDown('fast');
		}).click(function(event) {
			/* Act on the event */
			event.preventDefault();
			event.stopPropagation();
			return false;
		}).on('input', function(event) {
			/* Act on the event */
			//console.log('input');
			$(this).data('castVal', false);
			searchEventAttr($(this).val());
		});
		$('body').unbind('click.eventAttr').bind('click.eventAttr', function(event) {
			var $input = $($('#eventAttrSel').data('target'));
			$input.data('castVal') || $input.val('');
			////console.log('cast:' + $input.data('castVal') + ' type:' + $input.data('valType'));
			hideEventAttrSel();
		});
		$('#eventAttrSel').delegate('li', 'click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var _val = $(this).data('val'),
			_type = $(this).data('type'),
			_formatVal = formatValue(_val, _type);
			$($('#eventAttrSel').data('target')).val(_val).data({
				'castVal': _formatVal.castVal,
				'valType': _formatVal.valType
			}).trigger('change');
			hideEventAttrSel();
			return false;
		});
	}


	/**
	 * 切分数组并分配添加元素任务
	 * @param  {[type]} arr       来源数组
	 * @param  {[type]} pieceSize 每个字子数组的长度
	 * @param  {[type]} target 目标元素
	 * @param  {[type]} tick 心跳间隔
	 * @return {[type]}           切分后的数组
	 */
	 function setAppendTask(arr, pieceSize, target, tick) {
	 	var _len = arr.length;
	 	if (_len <= 0) {
	 		return;
	 	}
	 	appendPieces(arr.splice(0, pieceSize), target);
	 	setTimeout(function() {
	 		setAppendTask(arr, pieceSize, target, tick);
	 	}, tick);
	 }

	/**
	 * 添加元素
	 * @param  {[type]} arr    来源数组
	 * @param  {[type]} target 目标元素
	 */
	 function appendPieces(arr, target) {
	 	for (var i = 0; i < arr.length; i++) {
	 		var _item = arr[i];
	 		$('<li>').data({
	 			'val': _item.name,
	 			'type': _item.valueType
	 		}).text(_item.displayName).appendTo(target);
	 	}
	 }


	 function hideEventAttrSel() {
	 	$('#eventAttrSel').slideUp('fast').children('li:hidden').show();
	 }

	/**
	 * EventAttr模糊查询
	 * @param  {[type]} keyword [description]
	 * @return {[type]}         [description]
	 */
	 function searchEventAttr(keyword) {
	 	var _keyword = $.trim(keyword).toLowerCase(),
	 	$options = $('#eventAttrSel li'),
	 	_len = $options.length;
	 	for (var i = 0, $option = $($options[0]); i < _len; $option = $($options[++i])) {
	 		$option.text().toLowerCase().indexOf(_keyword) < 0 ? ($option.hide()) : ($option.show());
	 	}
	 }
	 /*添加IP列表功能*/
	 var __$target;
	 $('.fetch').click(function(event) {
	 	/* Act on the event */
	 	__$target = $(this).siblings(':text');
	 	var _valList = __$target.val().split(','),
	 	$seledUl = $('#seledDevList').children('li').remove().end();
	 	for (var i = 0; i < _valList.length; i++) {
	 		$('<li><a href="#">' + _valList[i] + '</a></li>').appendTo($seledUl);
	 	};
	 	$('#rmDeviceAction, #addDeviceAction a').attr('disabled', 'disabled');
	 	$('#deviceSelModal').modal('show');
	 });

	 $('#seledDevList').delegate('a', 'click', function(event) {
	 	event.preventDefault();
	 	$('#addDeviceAction a').attr('disabled', 'disabled');
	 	$('#seledDevList a').removeClass('active');
	 	$(this).addClass('active');
	 	$('#rmDeviceAction').removeAttr('disabled').data('listItem', $(this));
	 });
	 window.addToList = function(ip) {
	 	$('<li><a href="#">' + ip + '</a></li>').appendTo($('#seledDevList'));
	 }
	 $('#rmDeviceAction').click(function(event) {
	 	/* Act on the event */
	 	$(this).data('listItem').remove();
	 	$(this).attr('disabled', 'disabled');
	 });
	 /*设备列表*/
	/*setUpListTable('#deviceTable', 'queryDeviceToRole.do', {
		dataId: 'deviceIP'
	});
	tableTrClick('#deviceTable', function() {
		$('#rmDeviceAction').attr('disabled', 'disabled');
		$('#addDeviceAction a').removeAttr('disabled');
	});*/
/*提交列表*/
$('#commitIpListBtn').click(function(event) {
	var _result = __$target.val();
	$('#seledDevList li>a').each(function(index, el) {
		_result += (_result ? ',' : '') + $(this).text();
	});
	__$target.val(_result);
	$('#deviceSelModal').modal('hide');
});

var arBtns = '<a href="#" class="add"><span class="glyphicon glyphicon-plus"></span> </a><a href="#" class="remove"><span class="glyphicon glyphicon-minus"></span> </a>';
var valBtns = '<a href="#" class="fetch btn btn-default btn-xs ml-half">... </a>';
var evalBtns = '<a href="#" class="eval btn btn-default btn-xs ml-half">e</a>';

$('.clause [name="value"]').after(valBtns);

	//括号操作事件
	$('.clause .bracket').append(arBtns).append('<span class="br-content"></span>').find('a').on('click.br', function(event) {
		/* Act on the event */
		event.preventDefault();
		var $content = $(this).nextAll('.br-content');
		var _curCount = $content.data('bracketCount') || 0;
		//console.log(_curCount);
		_curCount += $(this).hasClass('add') ? 1 : -1;
		if (_curCount < 0) return;
		var _brackets = '';
		var _bracketItem = $(this).closest('.bracket').hasClass('left-bracket') ? '(' : ')';
		$content.data('bracketCount', _curCount);
		while ((_curCount--) && (_brackets += _bracketItem));
		$content.text(_brackets);
	});

	var _rowFunc = {
		/**
		 * 添加新的条目
		 * @param {String | JQuery Object} tableHandle 容器
		 * @param {String | JQuery Object} [trHandle] 目标位置
		 */
		 addTr: function(tableHandle, trHandle) {
			////console.log('add');
			var $template = $('.template', tableHandle),
			$newTr = $template.clone(true, true).removeClass('template');

			if (trHandle) {
				$newTr.insertAfter(trHandle);
			} else {
				$newTr.prependTo(tableHandle);
			}
			$(tableHandle).trigger('trAdded');
			return $newTr;
		},

		/**
		 * 删除条目
		 * @param {String | JQuery Object} tableHandle 容器
		 * @param {String | JQuery Object} trHandle 目标位置
		 */
		 removeTr: function(tableHandle, trHandle) {
			////console.log('remove');
			//if ($(tableHandle).find('tr.clause').length == 2) return;
			$(trHandle).remove();
			return null;
		}
	};
	//行操作事件
	$('.clause .row-action').append(arBtns).find('a').click(function(event) {
		event.preventDefault();
		var _row = _rowFunc[this.className + 'Tr']($(this).closest('table'), $(this).closest('tr'));
	});
	$('legend .add-row').click(function(event) {
		event.preventDefault();
		//给隐藏的select绑定chosen插件会有问题，所以先显示，后绑定
		$(".chosen-sel", _rowFunc.addTr($(this).closest('legend').next('table')))
			/*.chosen({
						disable_search_threshold: 10,
						search_contains: true,
						width: "200px",
						no_results_text: "没有对应结果!"
					})*/
	;
});

	/**
		 * 封装属性值
		 * @param  {[type]} val  属性值
		 * @param  {[type]} type 属性类型
		 * 3	uchar		int
			7	uint32		int
			6	int32		int

			5	uint16		short
			9	uint64		long
			11	date		long
			14	double		double
			12	binary		String
			1	string		String
			10	IP			String
			15	binhex		String
		 * @return {[type]}      封装后的字符串
		 */
		 function formatValue(val, type) {
		 	var _result = {};
		 	switch (type - 0) {
		 		case 3:
		 		case 6:
		 		case 7:
		 		return {
		 			'castVal': "cast(data('" + val + "'),int)",
		 			'valType': 'number'
		 		};
		 		case 5:
		 		return {
		 			'castVal': "cast(data('" + val + "'),short)",
		 			'valType': 'number'
		 		};
		 		case 9:
		 		case 11:
		 		return {
		 			'castVal': "cast(data('" + val + "'),long)",
		 			'valType': 'number'
		 		};
		 		case 14:
		 		return {
		 			'castVal': "cast(data('" + val + "'),double)",
		 			'valType': 'number'
		 		};
		 		case 12:
		 		case 1:
		 		case 10:
		 		case 15:
		 		return {
		 			'castVal': "data('" + val + "')",
		 			'valType': 'string'
		 		};
		 	}
		 }


	//eval
	$('.clause .eval').click(function(event) {
		/* Act on the event */
		var _clauseType = $(this).closest('table').attr('data-clause');
		$('#evalModal').modal('show');
		var $evalStr = $('#evalModal #evalStr').val('');
		var $targetSel = $(this).prevAll('.event-attr');
		$('#evalFunc').val('');
		$('#evalEvent').val('');
		$('#evalSubmit').unbind('click.eval').on('click.eval', function(event) {
			$targetSel.data({
				'castVal': $evalStr.data('castVal'),
				'valType': 'number'
			}).val($evalStr.val());
			$('#evalModal').modal('hide');
		})
	});

	function addEvalToInput(input, val, text, castVal) {
		//console.log(castVal);
		var $input = $(input);
	}

	//evalFunc
	$('#evalFunc').change(addFuncToEval)
	.next('.add-again').click(function(event) {
		addFuncToEval(null, $(this).siblings('select').val());
	});
	$('#evalEvent').on('change', addAttrToEval)
	.next('.add-again').click(function(event) {
		addAttrToEval(null, $(this).siblings('select').val());
	});

	var _evalStr = document.getElementById('evalStr');
	if (_evalStr) _evalStr.curPos = 0;

	/**
	 * 添加eval函数
	 * @param {jQuery Event Object} event [description]
	 * @param {String} attr  参数
	 */
	 function addFuncToEval(event, attr) {
	 	/* Act on the event */
	 	var target = $('#evalModal #evalStr')[0];
	 	var _val = addAttrToEval(null, (event ? $(this).val() : attr || ''));
	 	var _start = _val.lastIndexOf('(') + 1;
		target.curPos = _start; //更新起点
		var _reg = /[\,\)]/;
_reg.lastIndex = _start;
		var _end = _val.search(_reg); //定位第一个参数
		setInputSelection(target, _start, _end);
	}


	/**
	 * 填充表达式参数，待定参数用eventAttr|CMDBAttr标识
	 * @param {jQuery Event Object} event
	 * @param {String} attr  参数
	 */
	 function addAttrToEval(event, attr) {
	 	debugger
	 	var _attr = event ? event.target.value : attr || null;
	 	if (!_attr) return false;
	 	var target = $('#evalModal #evalStr')[0];
	 	var _val = target.value,
			_reg = /([\,\(])eventAttr|CMDBAttr/, //定位最新函数的第一个待定参数
				_castVal = $(target).data('castVal') || _val,
				_pos = _val.search(_reg);
		_reg.lastIndex = target.curPos; //正则起始位置
		if (_pos >= 0) { //有函数
			_reg.lastIndex = target.curPos; //正则起始位置
			_val = _val.replace(_reg, '$1' + _attr); //填充参数
			target.curPos = _pos; //更新起点
			event && $(target).data('castVal', _castVal.replace(_reg, '$1' + $(this).data('castVal')));
		} else { //没有待定参数
			_val += _attr;
			event && $(target).data('castVal', _castVal + $(this).data('castVal'));
		}
		//console.log($(target).data('castVal'));
		return target.value = _val;
	}


	$('#evalReset').click(function(event) {
		event.preventDefault();
		$('#evalStr').val('').prop('curPos', 0).data('castVal', '');
		$('#evalEvent').val('');
	});

	if (callback && typeof callback === 'function') {
		callback();
	};
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
 	$handle.removeClass('hide').show().resize();
 	if (isChild) {
 		$handle.siblings('.overlay-frm').hide();
 	}
 	$handle.find('.btn-cancel').unbind("click.overlay").on("click.overlay", function(event) {
 		/* Act on the event */
 		window.confirm("确定要取消编辑吗？") && (hideOverlayFrm(handle), $(this).trigger("canceld"));
 	});
 }

 function hideOverlayFrm(handle) {
 	$('form', handle).each(function(index, el) {
 		$(this).data('bootstrapValidator') && $(this).data('bootstrapValidator').resetForm(true);
 		this.reset();
 		$('textarea', this).text('');
 		$(':checked', this).click();
 	});
 	$(handle).hide().trigger('closed').closest('.row').css('height', 'auto');
 }


/**
 * 月、日、时选择器，根据模型类型显示不同组合
 * @param  {String || jQuery} placeholder 目标容器
 * @param  {String} moduleType  'year', 'month', 'day'
 * @return {[type]}             [description]
 */
 function mdhSelector(placeholder, moduleType) {
 	var $month = $('.month', placeholder).hide(),
 	$day = $('.day', placeholder).hide(),
 	$hour = $('.hour', placeholder);
	//console.log('mdh');
	switch (moduleType) {
		case 'year':
		var $msel = $month.show().is('select') ? $month : $month.find('select'),
		_monthconfig = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if ($msel[0].options.length != 12) {
			var _i = 0;
			while (++_i <= 12) $('<option>').val(_i).text((_i < 10 && '0') + _i).appendTo($msel);
		}
		$msel.change(function(event) {
			changeDay(_monthconfig[$(this).val() - 1]);
		}).change();
		case 'month':
		$day.show();
		changeDay(31);
		case 'day':
		var $hsel = $hour.show().is('select') ? $hour : $hour.find('select');
		if ($hsel[0].options.length != 24) {
			var _i = -1;
			$('option', $hsel).remove();
			while (++_i <= 23) $('<option>').val(_i).text((_i < 10 && '0') + _i + ':00').appendTo($hsel);
		}
	};

	function changeDay(target) {
		var $dsel = $day.is('select') ? $day : $day.find('select'),
		_origin = $dsel.val() || 1,
		_max = $('option:last-of-type', $dsel).val() || 0;
		if (_max > target) {
			$('option:gt(' + (target - 1) + ')', $dsel).remove();
			_origin > target && $dsel.val(target);
		} else {
			while (++_max <= target) $('<option>').val(_max).text((_max < 10 && '0') + _max).appendTo($dsel);
			$dsel.val(_origin);
		}
	}
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
		/*//console.debug('click func');*/
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
		if (callback && typeof callback === 'function') {
			callback(_id);
		}
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
 		var $target = $('[data-name=' + dataName + ']', placeholder),
 		_data = data[dataName];
 		var cfg = (attrCfg ? attrCfg[dataName] : '');
 		if (cfg) {
 			if (typeof cfg === 'string') {
 				$target.attr(cfg, _data);
 			};
 			if (typeof cfg === "function") {
 				cfg($target, _data);
 			};
 			continue;
 		};
 		$target.is('input,select') ? setFormVal($target, _data) : $target.html(_data).attr('title', _data);
 	}

 	function setFormVal($target, data) {
 		if ($target.is(':radio')) {
 			$target.filter('[value="' + data + '"]').click();
 			return;
 		}
 		if ($target.is(':checkbox')) {
 			$target.removeAttr('checked');
 			for (var i = 0; i < data.length; i++) {
 				$('[value="' + data[i] + '"]').click();
 			};
 			return;
 		}
 		$target.val(data).change();
 	}
 }

/**
 * 页面配置函数
 * @param  {number} curPage   当前页
 * @param  {number} pageCount 总页码
 * @return {Array}           页码列表
 */
 function getPageCfg(curPage, pageCount) {
 	var pages = [];
 	if (pageCount <= 10) {
 		for (var i = 1; i <= pageCount; i++) {
 			pages.push(i);
 		}
 		return pages;
 	}
 	if (curPage - 1 <= 5) {
 		for (var i = 1; i <= 8; i++) {
 			pages.push(i);
 		}
 		for (var i = pageCount - 1; i <= pageCount; i++) {
 			pages.push(i);
 		}
 		return pages;
 	}
 	if (pageCount - curPage <= 3) {
 		for (var i = 1; i <= 5; i++) {
 			pages.push(i);
 		}
 		for (var i = pageCount - 4; i <= pageCount; i++) {
 			pages.push(i);
 		}
 		return pages;
 	}
 	for (var i = 1; i <= 5; i++) {
 		pages.push(i);
 	}
 	pages.push(curPage - 1);
 	var _sub = pageCount - curPage;
 	if (_sub >= 5) {
 		pages.push(curPage);
 	}
 	if (_sub > 5) {
 		pages.push(curPage + 1);
 	}
 	for (var i = pageCount - 4; i <= pageCount; i++) {
 		pages.push(i);
 	}
 	return pages;
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


/**
 * 生成列表表格
 * @param {[type]}   placeholder 表格句柄
 * @param {[type]}   actionUrl      获取数据的url
 * @param {Function} callback    回调函数
 * @param {[type]}   option      数据选项(待定)
 *                               dataId 主键对应的名称
 *                               formDatas 请求的附加数据
 */
 function setUpListTable(placeholder, actionUrl, option, callback) {
 	var _dataId = option ? option.dataId || '' : '',
 	_formDatas = option ? option.formDatas || null : null;
 	$.get(actionUrl, _formDatas, function(data) {
 		var _resultList = [];
 		for (var prop in data) {
			if (data.hasOwnProperty(prop)) { //取到第一条数据就是结果数组
				_resultList = data[prop];
			}
		}
		if (!_resultList || !_resultList instanceof Array || _resultList.length <= 0) {
			return;
		}
		var $template = $('tbody tr.template', placeholder);
		if ($template.length <= 0) {
			//debugger
			alert('请设置模板行(tr.template)');
			return;
		}
		for (var i = 0; i < _resultList.length; i++) {
			var _rowData = _resultList[i];
			var $newTr = $template.clone(true, true).removeClass('template').insertBefore($template);
			if (_dataId) {
				$newTr.attr("data-id", _rowData[_dataId] || '')
			}
			for (var prop in _rowData) {
				if (_rowData.hasOwnProperty(prop)) {
					$('[data-name="' + prop + '"]', $newTr).html(_rowData[prop]).attr('title', _rowData[prop]);
				}
			}
		};
		if (callback && typeof callback === "function") {
			callback(_resultList);
		}
	});
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
			//console.log('terminal closed: ' + data);
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
		////console.log('terminal opened: ' + data);
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


/**
 * 表单提交通用代码
 * @param  {[type]} successCallback [description]
 * @param  {[type]} option [选项，格式如下
 * {serialize: 提交的数据
 * 	method: 'get' | 'post'}]
 * @return {[type]}                 [description]
 */
 function submitWorks(successCallback, option) {
 	showAlert(true, '提交中...', 'info', true);
 	console.log($(this).attr('action'));
 	$.ajax({
 		url: $(this).attr('action'),
 		type: (option && option.method) || "GET",
 		datatype: "json",
 		contentType: 'application/json;charset=UTF-8',
 		data: (option && option.serialize) || $(this).serialize(),
 		success: function(data) {
 			/*optional stuff to do after success */
 			console.log(data);
 			if (data!='error') {
 				showAlert(true, '提交成功！', 'success', false, 500, function() {
 					if(successCallback && typeof successCallback === 'function') {
 						successCallback(data);
 					}
 				});
 			} else {
 				showAlert(true, '提交失败，请联系管理员。', 'danger', false, 2000);
 			}
 		},
 		error: function() {
 			showAlert(true, '提交失败，请重试。', 'danger', false, 2000);
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
	$('a, button').filter('[href="#"]').click(function(e) {
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
	$('.overlay-frm').resize(function(event) {
		/* Act on the event */
		//console.log('resize');
		var $parent = $(this).closest('.row'),
		_height = $(this).children().outerHeight();
		//console.log(_height);
		if ($parent.length <= 0) {
			return;
		}
		if (_height > $parent.innerHeight()) {
			$parent.css('height', _height + 'px');
		}
	});
	/*全选功能*/
	$('.collapseListBox').delegate('.group>:checkbox', 'change', function(event) {
		/* Act on the event */
		var $children = $(this).closest('.group').next('ul').find(':checkbox');
		//console.log($children.length);
		if ($(this).is(':checked')) {
			$children.attr('checked', 'checked').prop('checked', true);
		} else {
			$children.removeAttr('checked').prop('checked', false);
		}
	});
	$("table.table").each(function() {
		tableColResize(this);
	});
	/*编辑、删除等按钮的绑定*/
	$('.rely-on-table').click(function(event) {
		eval($(this).attr('data-func'));
	});
	$('.right-click-menu').appendTo('body');
	/*$('.height-limited[data-height]').each(function(index, val) {
		 $(this).css("height", $(this).attr("data-height")+'px');
		});*/
}

function getPropertyTypes() {
	var propertyTypeList;
	if (window.localStorage && (propertyTypeList = localStorage.getItem('propertyTypeList'))) { //本地缓存
		return JSON.parse(propertyTypeList);
	}
	$.get('queryAllDeviceType.do', function(data) {
		localStorage.setItem('propertyTypeList', JSON.stringify(data));
		return data;
	});
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
			data: 'timestamp=' + new Date().getTime(),
			type: 'GET',
			success: function(data) {
				$('#ajax-content').html(data);
				$('.preloader').hide();
				docReady(targetUrl);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown);
			},
			dataType: "html",
			async: false
		});
	}

	$(document).delegate('.modal', 'show.bs.modal', function(event) {
		$(this).appendTo($('body'));
	}).delegate('.modal.in', 'shown.bs.modal', function(event) {
		setModalsAndBackdropsOrder();
	}).delegate('.modal', 'hidden.bs.modal', function(event) {
		setModalsAndBackdropsOrder();
	});


	//初始跳转
	var ajax_url = location.hash.replace(/^#/, '');
	if (ajax_url.length < 1) {
		ajax_url = './ajax/dashboard-asset.html';
	}
	LoadAjaxContent(ajax_url, true);
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

	$menu.find("li").has("ul").find("a").unbind('click.menu').bind("click.menu", function(e) {
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
	 		$box.addClass('half').bind('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
	 			$config.show();
	 			$box.addClass('hover').removeClass('half');
	 		});
	 	} else {
	 		$box.addClass('half').bind('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
	 			$config.hide();
	 			$box.removeClass('hover').removeClass('half');
	 		});
	 	}

	 })
	 .delegate('.close-link', 'click', function(e) {
	 	e.preventDefault();
	 	if (!confirm('你确定要删除吗？')) {
	 		return false;
	 	}
	 	$(this).closest('div.box').trigger('removed').parent().hide();
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
	LoadAjaxContent(url);
}

function setModalsAndBackdropsOrder() {
	var modalZIndex = 2040;
	$('.modal.in').each(function(index) {
		var $modal = $(this);
		modalZIndex++;
		$modal.css('zIndex', modalZIndex);
		$modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
	});
	$('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
}
});