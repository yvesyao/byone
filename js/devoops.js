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
//  Dynamically load Flot plugin
//  homepage: http://www.flotcharts.org  v0.8.2 license- MIT
//
function LoadFlotScripts(callback) {
	function LoadFlotScript() {
		$.getScript('plugins/flot/jquery.flot.js', LoadFlotResizeScript);
	}

	function LoadFlotResizeScript() {
		$.getScript('plugins/flot/jquery.flot.resize.js', LoadFlotTimeScript);
	}

	function LoadFlotTimeScript() {
		$.getScript('plugins/flot/jquery.flot.time.js', callback);
	}
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


//
//  Function set min-height of window (required for this theme)
//
function SetMinBlockHeight(elem) {
	elem.css('min-height', window.innerHeight - 49)
}


/*-------------------------------------------
	Demo graphs for Flot Chart page (charts_flot.html)
---------------------------------------------*/
//
// Graph1 created in element with id = box-one-content
//
function FlotGraph1() {
	// We use an inline data source in the example, usually data would
	// be fetched from a server
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
	var plot = $.plot("#box-one-content", [getRandomData()], {
		series: {
			shadowSize: 0 // Drawing is faster without shadows
		},
		yaxis: {
			min: 0,
			max: 100
		},
		xaxis: {
			mode: "time",
			timeformat : "%H:%M",
			tickSize: [5, "minute"],
			axisLabel: "Date",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelFontFamily: 'Verdana, Arial',
			axisLabelPadding: 10
		}
	});

	function update() {
		plot.setData([getRandomData()]);
		// Since the axes don't change, we don't need to call plot.setupGrid()
		plot.draw();
		//setTimeout(update, updateInterval);
	}
	update();
}
//
// Graph2 created in element with id = box-two-content
//
function FlotGraph2() {
	var sin = [];
	var cos = [];
	var tan = [];
	for (var i = 0; i < 14; i += 0.1) {
		sin.push([i, Math.sin(i)]);
		cos.push([i, Math.cos(i)]);
		tan.push([i, Math.tan(i) / 4]);
	}
	var plot = $.plot("#box-two-content", [{
		data: sin,
		label: "sin(x) = -0.00"
	}, {
		data: cos,
		label: "cos(x) = -0.00"
	}, {
		data: tan,
		label: "tan(x)/4 = -0.00"
	}], {
		series: {
			lines: {
				show: true
			}
		},
		crosshair: {
			mode: "x"
		},
		grid: {
			hoverable: true,
			autoHighlight: false
		},
		yaxis: {
			min: -5.2,
			max: 5.2
		}
	});
	var legends = $("#box-two-content .legendLabel");
	legends.each(function() {
		// fix the widths so they don't jump around
		$(this).css('width', $(this).width());
	});
	var updateLegendTimeout = null;
	var latestPosition = null;

	function updateLegend() {
		updateLegendTimeout = null;
		var pos = latestPosition;
		var axes = plot.getAxes();
		if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
			pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
			return;
		}
		var i, j, dataset = plot.getData();
		for (i = 0; i < dataset.length; ++i) {
			var series = dataset[i];
			// Find the nearest points, x-wise
			for (j = 0; j < series.data.length; ++j) {
				if (series.data[j][0] > pos.x) {
					break;
				}
			}
			// Now Interpolate
			var y, p1 = series.data[j - 1],
				p2 = series.data[j];
			if (p1 == null) {
				y = p2[1];
			} else if (p2 == null) {
				y = p1[1];
			} else {
				y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
			}
			legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
		}
	}
	$("#box-two-content").bind("plothover", function(event, pos, item) {
		latestPosition = pos;
		if (!updateLegendTimeout) {
			updateLegendTimeout = setTimeout(updateLegend, 50);
		}
	});
}
//
// Graph4 created in element with id = box-four-content
//
function FlotGraph4() {
	var d1 = [];
	for (var i = 0; i < 14; i += 0.5) {
		d1.push([i, Math.sin(i)]);
	}
	var d2 = [];
	var d3 = [];
	var d4 = [];
	var d5 = [];
	var d6 = [];
	$.plot("#box-four-content", [{
		data: d1,
		lines: {
			show: true,
			fill: true
		}
	}, {
		data: d2,
		bars: {
			show: true
		}
	}, {
		data: d3,
		points: {
			show: true
		}
	}, {
		data: d4,
		lines: {
			show: true
		}
	}, {
		data: d5,
		lines: {
			show: true
		},
		points: {
			show: true
		}
	}, {
		data: d6,
		lines: {
			show: true,
			steps: true
		}
	}]);
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
			"label": "IBM_sniffer_202.181.176.85",
			"data": []
		}, {
			"className": ".xchart-class-4.l2",
			"label": "sniffer_202.181.225.221_v2",
			"data": []
		}, {
			"className": ".xchart-class-4.l3",
			"label": "ipcad_mrtg_202.181.225.220_v2",
			"data": []
		}, {
			"className": ".xchart-class-4.l4",
			"label": "websso_202.181.225.219",
			"data": []
		}, {
			"className": ".xchart-class-4.l5",
			"label": "necportal_202.181.176.83_Pls dont remove",
			"data": []
		}, {
			"className": ".xchart-class-4.l6",
			"label": "CNLink_Web_server",
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
				"x": "2014-11-10 14:" + i + ":00"
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
	Function for table pages (property.html etc.)
	---------------------------------------------*/
//
// Function for rightClick on table item
//
function tableRightClick() {
	$('.right-click-menu').each(function(index, val) {
		/* iterate through array or object */
		$(this).data('originHtml', this.innerHTML);
	});
	$('body').mousedown(function(event) {
		/* Act on the event */
		$('.right-click-menu.open').removeClass('open');
	});
	$('[data-right-menu]').mouseup(function(event) {
		/* Act on the event */
		event.preventDefault();
		var $targetMenu = $($(this).attr('data-right-menu'));
		if (event.button == '2') {
			$targetMenu.addClass('open').css({
				top: event.pageY,
				left: event.pageX
			}).html($targetMenu.data('originHtml').replace("{1}", $(this).attr('data-id')));
		} else {
			$targetMenu.removeClass('open');
		}
	}).bind("contextmenu", function(e) { //不显示默认右键菜单
		return false;
	});
}

/**
 * load property interactive actions
 */
function loadPropertyInfoFuc() {
	$('.property-table tr').click(function(e) {
		changeInfo();
	})
}

function docReady() {
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
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