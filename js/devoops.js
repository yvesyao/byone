//
//    Main script of DevOOPS v1.0 Bootstrap Theme
//
"use strict";
/*-------------------------------------------
	Dynamically load plugin scripts
	---------------------------------------------*/
//

//
// Dynamically load  OpenStreetMap Plugin
// homepage: http://openlayers.org
//
function LoadOpenLayersScript(callback) {
	if (!$.fn.OpenLayers) {
		$.getScript('http://www.openlayers.org/api/OpenLayers.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
// Dynamically load  Leaflet Plugin
// homepage: http://leafletjs.com
//
function LoadLeafletScript(callback) {
	if (!$.fn.L) {
		$.getScript('plugins/leaflet/leaflet.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
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
		$.getScript('plugins/datatables/jquery.dataTables.js', function() {
			$.getScript('plugins/datatables/ZeroClipboard.js', function() {
				$.getScript('plugins/datatables/TableTools.js', function() {
					$.getScript('plugins/datatables/dataTables.bootstrap.js', callback);
				});
			});
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
//  Dynamically load Widen FineUploader
//  homepage: https://github.com/Widen/fine-uploader  v5.0.5 license - GPL3
//
function LoadFineUploader(callback) {
	if (!$.fn.fineuploader) {
		$.getScript('plugins/fineuploader/jquery.fineuploader-5.0.5.min.js', callback);
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}

//
//  Dynamically load xCharts plugin
//  homepage: http://tenxer.github.io/xcharts/ v0.3.0 license - MIT
//  Required D3 plugin http://d3js.org/ v3.4.11 license - MIT
//
function LoadXChartScript(callback) {
	function LoadXChart() {
		$.getScript('plugins/xcharts/xcharts.min.js', callback);
	}

	function LoadD3Script() {
		if (!$.fn.d3) {
			$.getScript('plugins/d3/d3.min.js', LoadXChart)
		} else {
			LoadXChart();
		}
	}
	if (!$.fn.xcharts) {
		LoadD3Script();
	} else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}


//
//  Dynamically load Springy plugin
//  homepage: http://getspringy.com/ 2.6.1 as is
//
function LoadSpringyScripts(callback) {
	function LoadSpringyScript() {
		$.getScript('plugins/springy/springy.js', LoadSpringyUIScript);
	}

	function LoadSpringyUIScript() {
		$.getScript('plugins/springy/springyui.js', callback);
	}
	if (!$.fn.Springy) {
		LoadSpringyScript();
	} else {
		if (callback && typeof(callback) === "function") {
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
//  Dynamically load jQuery-Knob plugin
//  homepage: http://anthonyterrien.com/knob/  v1.2.5 License- MIT or GPL
//
function LoadKnobScripts(callback) {
	if (!$.fn.knob) {
		$.getScript('plugins/jQuery-Knob/jquery.knob.js', callback);
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
function LoadAjaxContent(url) {
	$('.preloader').show();
	$.ajax({
		mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
		url: url,
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


/*//
// Create OpenLayers map with required options and return map as object
//
function drawMap(lon, lat, elem, layers) {
	var LayersArray = [];
	// Map initialization
	var map = new OpenLayers.Map(elem);
	// Add layers on map
	map.addLayers(layers);
	// WGS 1984 projection
	var epsg4326 = new OpenLayers.Projection("EPSG:4326");
	//The map projection (Spherical Mercator)
	var projectTo = map.getProjectionObject();
	// Max zoom = 17
	var zoom = 10;
	map.zoomToMaxExtent();
	// Set longitude/latitude
	var lonlat = new OpenLayers.LonLat(lon, lat);
	map.setCenter(lonlat.transform(epsg4326, projectTo), zoom);
	var layerGuest = new OpenLayers.Layer.Vector("You are here");
	// Define markers as "features" of the vector layer:
	var guestMarker = new OpenLayers.Feature.Vector(
		new OpenLayers.Geometry.Point(lon, lat).transform(epsg4326, projectTo)
	);
	layerGuest.addFeatures(guestMarker);
	LayersArray.push(layerGuest);
	map.addLayers(LayersArray);
	// If map layers > 1 then show checker
	if (layers.length > 1) {
		map.addControl(new OpenLayers.Control.LayerSwitcher({
			'ascending': true
		}));
	}
	// Link to current position
	map.addControl(new OpenLayers.Control.Permalink());
	// Show current mouse coords
	map.addControl(new OpenLayers.Control.MousePosition({
		displayProjection: epsg4326
	}));
	return map
}*/
//
//  Function for create 2 dates in human-readable format (with leading zero)
//
function PrettyDates() {
	var currDate = new Date();
	var year = currDate.getFullYear();
	var month = currDate.getMonth() + 1;
	var startmonth = 1;
	if (month > 3) {
		startmonth = month - 2;
	}
	if (startmonth <= 9) {
		startmonth = '0' + startmonth;
	}
	if (month <= 9) {
		month = '0' + month;
	}
	var day = currDate.getDate();
	if (day <= 9) {
		day = '0' + day;
	}
	var startdate = year + '-' + startmonth + '-01';
	var enddate = year + '-' + month + '-' + day;
	return [startdate, enddate];
}
//
//  Function set min-height of window (required for this theme)
//
function SetMinBlockHeight(elem) {
	elem.css('min-height', window.innerHeight - 49)
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
//
// Function for change panels of Dashboard
//
/*function DashboardTabChecker() {
	$('#content').on('click', 'a.tab-link', function(e) {
		e.preventDefault();
		$('div#Dashboard_tabs').find('div[id^=Dashboard]').each(function() {
			$(this).css('visibility', 'hidden').css('position', 'absolute');
		});
		var attr = $(this).attr('id');
		$('#' + 'Dashboard-' + attr).css('visibility', 'visible').css('position', 'relative');
		$(this).closest('.nav').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
	});
}*/
//
// Helper for run TinyMCE editor with textarea's
//
function TinyMCEStart(elem, mode) {
	var plugins = [];
	if (mode == 'extreme') {
		plugins = ["advlist anchor autolink autoresize autosave bbcode charmap code contextmenu directionality ",
			"emoticons fullpage fullscreen hr image insertdatetime layer legacyoutput",
			"link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace",
			"tabfocus table template textcolor visualblocks visualchars wordcount"
		]
	}
	tinymce.init({
		selector: elem,
		theme: "modern",
		plugins: plugins,
		//content_css: "css/style.css",
		toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
		style_formats: [{
			title: 'Header 2',
			block: 'h2',
			classes: 'page-header'
		}, {
			title: 'Header 3',
			block: 'h3',
			classes: 'page-header'
		}, {
			title: 'Header 4',
			block: 'h4',
			classes: 'page-header'
		}, {
			title: 'Header 5',
			block: 'h5',
			classes: 'page-header'
		}, {
			title: 'Header 6',
			block: 'h6',
			classes: 'page-header'
		}, {
			title: 'Bold text',
			inline: 'b'
		}, {
			title: 'Red text',
			inline: 'span',
			styles: {
				color: '#ff0000'
			}
		}, {
			title: 'Red header',
			block: 'h1',
			styles: {
				color: '#ff0000'
			}
		}, {
			title: 'Example 1',
			inline: 'span',
			classes: 'example1'
		}, {
			title: 'Example 2',
			inline: 'span',
			classes: 'example2'
		}, {
			title: 'Table styles'
		}, {
			title: 'Table row 1',
			selector: 'tr',
			classes: 'tablerow1'
		}]
	});
}

//
//  Helper for open ModalBox with requested header, content and bottom
//
//
function OpenModalBox(header, inner, bottom) {
	var modalbox = $('#modalbox');
	modalbox.find('.modal-header-name span').html(header);
	modalbox.find('.devoops-modal-inner').html(inner);
	modalbox.find('.devoops-modal-bottom').html(bottom);
	modalbox.fadeIn('fast');
	$('body').addClass("body-expanded");
}
//
//  Close modalbox
//
//
function CloseModalBox() {
	var modalbox = $('#modalbox');
	modalbox.fadeOut('fast', function() {
		modalbox.find('.modal-header-name span').children().remove();
		modalbox.find('.devoops-modal-inner').children().remove();
		modalbox.find('.devoops-modal-bottom').children().remove();
		$('body').removeClass("body-expanded");
	});
}

//
//  Function convert values of inputs in table to JSON data
//
//
function Table2Json(table) {
	var result = {};
	table.find("tr").each(function() {
		var oneRow = [];
		var varname = $(this).index();
		$("td", this).each(function(index) {
			if (index != 0) {
				oneRow.push($("input", this).val());
			}
		});
		result[varname] = oneRow;
	});
	var result_json = JSON.stringify(result);
	OpenModalBox('Table to JSON values', result_json);
}

/*-------------------------------------------
	Demo graphs for xCharts page (charts_xcharts.html)
---------------------------------------------*/
//
// Graph1 created in element with id = xchart-1
//
function xGraph1() {
	var tt = document.createElement('div'),
		leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
		topOffset = -32;
	tt.className = 'ex-tooltip';
	document.body.appendChild(tt);
	var data = {
		"xScale": "time",
		"yScale": "linear",
		"main": [{
			"className": ".xchart-class-1",
			"data": [{
				"x": "2014-10-05",
				"y": 6
			}, {
				"x": "2014-10-06",
				"y": 6
			}, {
				"x": "2014-10-07",
				"y": 8
			}, {
				"x": "2014-10-08",
				"y": 3
			}, {
				"x": "2014-10-09",
				"y": 4
			}, {
				"x": "2014-10-10",
				"y": 9
			}, {
				"x": "2014-10-11",
				"y": 6
			}, {
				"x": "2014-10-12",
				"y": 16
			}, {
				"x": "2014-10-13",
				"y": 4
			}, {
				"x": "2014-10-14",
				"y": 9
			}, {
				"x": "2014-10-15",
				"y": 2
			}]
		}]
	};
	var opts = {
		"dataFormatX": function(x) {
			return d3.time.format('%Y-%m-%d').parse(x);
		},
		"tickFormatX": function(x) {
			return d3.time.format('%A')(x);
		},
		"mouseover": function(d, i) {
			var pos = $(this).offset();
			$(tt).text(d3.time.format('%A')(d.x) + ': ' + d.y)
				.css({
					top: topOffset + pos.top,
					left: pos.left + leftOffset
				})
				.show();
		},
		"mouseout": function(x) {
			$(tt).hide();
		}
	};
	var myChart = new xChart('line-dotted', data, '#xchart-1', opts);
}
//
// Graph2 created in element with id = xchart-2
//
function xGraph2() {
	var data = {
		"xScale": "ordinal",
		"yScale": "linear",
		"main": [{
			"className": ".xchart-class-2",
			"data": [{
				"x": "Apple",
				"y": 575
			}, {
				"x": "Facebook",
				"y": 163
			}, {
				"x": "Microsoft",
				"y": 303
			}, {
				"x": "Cisco",
				"y": 121
			}, {
				"x": "Google",
				"y": 393
			}]
		}]
	};
	var myChart = new xChart('bar', data, '#xchart-2');
}
//
// Graph3 created in element with id = xchart-3
//
function xGraph3() {
	var data = {
		"xScale": "time",
		"yScale": "linear",
		"type": "line",
		"main": [{
			"className": ".xchart-class-3",
			"data": [{
				"x": "2014-10-05",
				"y": 1
			}, {
				"x": "2014-10-06",
				"y": 6
			}, {
				"x": "2014-10-07",
				"y": 13
			}, {
				"x": "2014-10-08",
				"y": -3
			}, {
				"x": "2014-10-09",
				"y": -4
			}, {
				"x": "2014-10-10",
				"y": 9
			}, {
				"x": "2014-10-11",
				"y": 6
			}, {
				"x": "2014-10-12",
				"y": 7
			}, {
				"x": "2014-10-13",
				"y": -2
			}, {
				"x": "2014-10-14",
				"y": -7
			}]
		}]
	};
	var opts = {
		"dataFormatX": function(x) {
			return d3.time.format('%Y-%m-%d').parse(x);
		},
		"tickFormatX": function(x) {
			return d3.time.format('%A')(x);
		}
	};
	var myChart = new xChart('line', data, '#xchart-3', opts);
}

function xGraph4() {
	var tt = $('.ex-tooltip'),
		leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
		topOffset = -32;
	var data = {
		"xScale": "time",
		"yScale": "linear", //ordinal, linear, time, exponential
		"type": "line", //bar, cumulative(增量), line, line-dotted
		"main": [{
			"className": ".xchart-class-4.l1",
			"objName": "IBM_sniffer_202.181.176.85",
			"data": []
		}, {
			"className": ".xchart-class-4.l2",
			"objName": "sniffer_202.181.225.221_v2",
			"data": []
		}, {
			"className": ".xchart-class-4.l3",
			"objName": "ipcad_mrtg_202.181.225.220_v2",
			"data": []
		}, {
			"className": ".xchart-class-4.l4",
			"objName": "websso_202.181.225.219",
			"data": []
		}, {
			"className": ".xchart-class-4.l5",
			"objName": "necportal_202.181.176.83_Pls dont remove",
			"data": []
		}, {
			"className": ".xchart-class-4.l6",
			"objName": "CNLink_Web_server",
			"data": []
		}]
	};

	function getRandomData(base, range, max, min) {
		var _rel = base + Math.floor(Math.random() * range - range / 2);
		_rel = _rel > max ? max * 3 - _rel * 2 : _rel;
		return _rel < min ? min * 3 - _rel * 2 : _rel;
	}

	$('#xchart-4').next(".name-tags").remove();
	for (var index = -1, _main = data.main[0]; _main = data.main[++index];) { //简化的数组遍历
		var _data = _main.data;
		var _val = (index + 1) * 10;
		if (_main.objName) { //添加标签说明
			$('#xchart-4').next(".name-tags").length || $('#xchart-4').after('<div class="name-tags row">');
			$('#xchart-4').next(".name-tags").append('<div class="name-tag col-xs-12"><div class="color-block color' + index + '"></div><span class="objName">' + _main.objName + '</span></div>');
		};
		for (var i = 0; i < 20; ++i) { //插入数据
			_val = getRandomData(_val, 10, 60, 0);
			_data.push({
				"y": _val,
				"x": "2014-10-24 14:" + i + ":00"
			});
		}
	}

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
	});
}


//
// Function for table, located in element with id = datatable-3
//
function TestTable3() {
	$('#datatable-3').dataTable({
		"aaSorting": [
			[0, "asc"]
		],
		"sDom": "T<'box-content'<'col-sm-6'f><'col-sm-6 text-right'l><'clearfix'>>rt<'box-content'<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sSearch": "",
			"sLengthMenu": '_MENU_'
		},
		"oTableTools": {
			"sSwfPath": "plugins/datatables/copy_csv_xls_pdf.swf",
			"aButtons": [
				"copy",
				"print", {
					"sExtends": "collection",
					"sButtonText": 'Save <span class="caret" />',
					"aButtons": ["csv", "xls", "pdf"]
				}
			]
		}
	});
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



//
// Draw Springy graphs (Network map) on Dashboard page
//
function SpringyNetmap() {
	var graph = new Springy.Graph();
	var core1 = graph.newNode({
		label: 'Network core 1 (Cisco 3750G-48PS)'
	});
	var core2 = graph.newNode({
		label: 'Network core 2 (Cisco 3750G-48PS)'
	});
	var srv1 = graph.newNode({
		label: 'Server switch 1 (Cisco 3750G-48TS)'
	});
	var srv2 = graph.newNode({
		label: 'Server switch 2 (Cisco 3750G-48TS)'
	});
	var pabx1 = graph.newNode({
		label: 'PABX switch 1 (Cisco 3750G-48TS)'
	});
	var pabx2 = graph.newNode({
		label: 'PABX switch 2 (Cisco 3750G-48TS)'
	});
	var router1 = graph.newNode({
		label: 'Router 1 (Cisco 3945E)'
	});
	var router2 = graph.newNode({
		label: 'Router 2 (Cisco 3945E)'
	});
	graph.newEdge(core1, core2, {
		color: '#00A0B0'
	});
	graph.newEdge(core2, core1, {
		color: '#6A4A3C'
	});
	graph.newEdge(core1, srv1, {
		color: '#CC333F'
	});
	graph.newEdge(core2, srv1, {
		color: '#CC333F'
	});
	graph.newEdge(core1, srv2, {
		color: '#EB6841'
	});
	graph.newEdge(core2, srv2, {
		color: '#EB6841'
	});
	graph.newEdge(srv1, srv2, {
		color: '#EDC951'
	});
	graph.newEdge(srv2, srv1, {
		color: '#EDC951'
	});
	graph.newEdge(pabx1, core1, {
		color: '#7DBE3C'
	});
	graph.newEdge(pabx1, core2, {
		color: '#7DBE3C'
	});
	graph.newEdge(pabx2, core1, {
		color: '#000000'
	});
	graph.newEdge(pabx2, core2, {
		color: '#000000'
	});
	graph.newEdge(router1, core1, {
		color: '#00A0B0'
	});
	graph.newEdge(router1, core2, {
		color: '#00A0B0'
	});
	graph.newEdge(router2, core1, {
		color: '#6A4A3C'
	});
	graph.newEdge(router2, core2, {
		color: '#6A4A3C'
	});
	graph.newEdge(pabx1, pabx2, {
		color: '#CC333F'
	});
	graph.newEdge(pabx2, pabx1, {
		color: '#CC333F'
	});
	graph.newEdge(router1, router2, {
		color: '#EB6841'
	});
	graph.newEdge(router2, router1, {
		color: '#EB6841'
	});
	$('#springy-demo').springy({
		graph: graph,
		nodeSelected: function(node) {
			console.log('Node selected: ' + JSON.stringify(node.data));
		}
	});
}
/*-------------------------------------------
	Function for File upload page (form_file_uploader.html)
	---------------------------------------------*/
function FileUpload() {
	$('#bootstrapped-fine-uploader').fineUploader({
		template: 'qq-template-bootstrap',
		classes: {
			success: 'alert alert-success',
			fail: 'alert alert-error'
		},
		thumbnails: {
			placeholders: {
				waitingPath: "assets/waiting-generic.png",
				notAvailablePath: "assets/not_available-generic.png"
			}
		},
		request: {
			endpoint: 'server/handleUploads'
		},
		validation: {
			allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
		}
	});
}

/*-------------------------------------------
	Function for Flickr Gallery page (gallery_flickr.html)
	---------------------------------------------*/
//
// Load data from Flicks, parse and create gallery
//
function displayFlickrImages(data) {
	var res;
	$.each(data.items, function(i, item) {
		if (i > 11) {
			return false;
		}
		res = "<a href=" + item.link + " title=" + item.title + " target=\"_blank\"><img alt=" + item.title + " src=" + item.media.m + " /></a>";
		$('#box-one-content').append(res);
	});
	setTimeout(function() {
		$("#box-one-content").justifiedGallery({
			'usedSuffix': 'lt240',
			'justifyLastRow': true,
			'rowHeight': 150,
			'fixedHeight': false,
			'captions': true,
			'margins': 1
		});
		$('#box-one-content').fadeIn('slow');
	}, 100);
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
/*-------------------------------------------
	Functions for Progressbar page (ui_progressbars.html)
	---------------------------------------------*/
//
// Function for Knob clock
//
function RunClock() {
	var second = $(".second");
	var minute = $(".minute");
	var hour = $(".hour");
	var d = new Date();
	var s = d.getSeconds();
	var m = d.getMinutes();
	var h = d.getHours();
	if (h > 11) {
		h = h - 12;
	}
	$('#knob-clock-value').html(h + ':' + m + ':' + s);
	second.val(s).trigger("change");
	minute.val(m).trigger("change");
	hour.val(h).trigger("change");
}
//
// Function for create test sliders on Progressbar page
//
function CreateAllSliders() {
	$(".slider-default").slider();
	var slider_range_min_amount = $(".slider-range-min-amount");
	var slider_range_min = $(".slider-range-min");
	var slider_range_max = $(".slider-range-max");
	var slider_range_max_amount = $(".slider-range-max-amount");
	var slider_range = $(".slider-range");
	var slider_range_amount = $(".slider-range-amount");
	slider_range_min.slider({
		range: "min",
		value: 37,
		min: 1,
		max: 700,
		slide: function(event, ui) {
			slider_range_min_amount.val("$" + ui.value);
		}
	});
	slider_range_min_amount.val("$" + slider_range_min.slider("value"));
	slider_range_max.slider({
		range: "max",
		min: 1,
		max: 100,
		value: 2,
		slide: function(event, ui) {
			slider_range_max_amount.val(ui.value);
		}
	});
	slider_range_max_amount.val(slider_range_max.slider("value"));
	slider_range.slider({
		range: true,
		min: 0,
		max: 500,
		values: [75, 300],
		slide: function(event, ui) {
			slider_range_amount.val("$" + ui.values[0] + " - $" + ui.values[1]);
		}
	});
	slider_range_amount.val("$" + slider_range.slider("values", 0) +
		" - $" + slider_range.slider("values", 1));
	$("#equalizer > div.progress > div").each(function() {
		// read initial values from markup and remove that
		var value = parseInt($(this).text(), 10);
		$(this).empty().slider({
			value: value,
			range: "min",
			animate: true,
			orientation: "vertical"
		});
	});
}
/*-------------------------------------------
	Function for jQuery-UI page (ui_jquery-ui.html)
	---------------------------------------------*/
//
// Function for make all Date-Time pickers on page
//
function AllTimePickers() {
	$('#datetime_example').datetimepicker({});
	$('#time_example').timepicker({
		hourGrid: 4,
		minuteGrid: 10,
		timeFormat: 'hh:mm tt'
	});
	$('#date3_example').datepicker({
		numberOfMonths: 3,
		showButtonPanel: true
	});
	$('#date3-1_example').datepicker({
		numberOfMonths: 3,
		showButtonPanel: true
	});
	$('#date_example').datepicker({});
}

/**
 * load property interactive actions
 */
function loadPropertyInfoFuc() {
	$('.property-table tr').click(function(e){
		changeInfo();
	})
}
 
function docReady() {
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});
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
	var ajax_url = location.hash.replace(/^#/, '');
	if (ajax_url.length < 1) {
		ajax_url = './ajax/dashboard.html';
	}
	LoadAjaxContent(ajax_url);

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
	$('body').on('click', 'a.close-link', function(e) {
		e.preventDefault();
		CloseModalBox();
	});
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
	$('#search').on('keydown', function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			$('#content').removeClass('full-content');
			ajax_url = 'ajax/page_search.html';
			window.location.hash = ajax_url;
			LoadAjaxContent(ajax_url);
		}
	});
	/*$('#screen_unlock').on('mouseover', function(){
		var header = 'Enter current username and password';
		var form = $('<div class="form-group"><label class="control-label">Username</label><input type="text" class="form-control" name="username" /></div>'+
					'<div class="form-group"><label class="control-label">Password</label><input type="password" class="form-control" name="password" /></div>');
		var button = $('<div class="text-center"><a href="index.html" class="btn btn-primary">Unlock</a></div>');
		OpenModalBox(header, form, button);
	});*/
	/*$('.about').on('click', function(){
		$('#about').toggleClass('about-h');
	})
	$('#about').on('mouseleave', function(){
		$('#about').removeClass('about-h');
	})*/

	docReady();


});