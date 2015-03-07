/**
 * 动态表格插件
 */
! function($) {

	var ByoneTable = function(element, options) {
		this.element = $(element);

		this.loading = $('<div class="zoom loading">\
			<div class="spinner"></div>\
		</div>');

		/**
		 * test,loading位置待定
		 */
		this.element.append('<tfoot><tr></tr></tfoot>').children('tfoot').children('tr').append(this.loading);
		this.loading.hide();
		//pagination
		if(options.pagination) {
			if (!options.paginateHandle) {
					this.pagination = $('<div class="col-sm-6 pull-right"></div>');
					this.pagination.append('<nav>\
					  <ul class="pagination">\
					    <li class="prev"><a href="#">&laquo;</a></li>\
					    <li class="next"><a href="#">&raquo;</a></li>\
					  </ul>\
					</nav>');
					this.element.after(this.pagination);
				} else {
					this.pagination = $(options.paginateHandle);
				}
				var byObj = this;
				$(this.pagination).delegate('a', 'click', function(event) {
					event.preventDefault();
					var $parentLi = $(this).closest('li');
					if ($parentLi.is('.disabled, .active')) return;
					var _targetPage = $parentLi.attr('data-page');
					if (_targetPage) {
						byObj.draw = _targetPage;
					} else {
						byObj.draw += $parentLi.hasClass('prev') ? -1 : 1;
					}
					byObj.getDatas(event);
				});
			}

		//search
		if (options.searchHandle) {
			this.search = $(options.searchHandle);
			this.search.on({
				'keyup.byoneTable': $.proxy(this.getDatas, this),
				'blur.byoneTables': $.proxy(this.getDatas, this)
			});
		}

		this.ths = $("thead th", this.element);
		this.ths.on('click.byoneTable', $.proxy(this.sort, this));
		this.ajax = options.ajax;
		this.columns = options.columns || [];
		for (var i = 0; i < options.columns.length; ++i) {
			var $th = $(this.ths[i]);
			$th.addClass(options.columns[i]["class"]);
			if (options.columns[i]["sortable"] === false) {
				$th.data('sortable', false);
			} else {
				$th.addClass('sorting');
			}
			$th.data('tableData', options.columns[i].data);
		};
		if (options.sort) {
			this.sortCol = options.sort[0];
			this.sortDirection = options.sort[1];
			//for (var i = this.sort.length - 1; i >= 0; i--) {
			this.getElemByData(this.sortCol).addClass('sorting-' + this.sortDirection);
			//};
		};
		this.dataId = options.dataId;
		this.draw = options.draw || 1;
		this.pageItemCount = options.pageItemCount || 15;
		this.rightClick = options.rightClick || false;
		/*$("table").bind({
			ajaxStart: function() {
				console.log('start');
				$(this).show();
			},
			ajaxStop: function() {
				$(this).hide();
			}
		});*/
		this.getDatas();
		/*test
				this.setPages(10, 10);*/
		
	};

	ByoneTable.prototype = {
		constructor: ByoneTable,
		getDatas: function(e) {
			var _search = this.search ? this.search.val() : '';
			if (this.lastSearch == _search && this.lastDraw == this.draw && this.lastSortCol == this.sortCol && this.lastSort == this.sortDirection) {
				return;
			};
			console.log('getDatas');
			this.lastDraw = this.draw;
			this.loading.show();
			
			var _start = this.pagination ? (this.draw - 1) * this.pageItemCount : 0,
				_count = this.pagination ? this.pageItemCount : -1;
			$.get(
				this.ajax, {
					'search': (this.lastSearch = _search),
					'start': _start,
					'count': _count,
					'sortCol': (this.lastSortCol = this.sortCol),
					'sort': (this.lastSort = this.sortDirection),
					'fingerPrint': Math.random()
				},
				$.proxy(this.fillTable, this)
			);
		},
		/**
		 * 排序
		 * @param  {jQuery.Event / String} e   event或者data
		 * @param  {String} sort  排序方式
		 */
		sort: function(e, sort) {
			if(e.offsetX >= e.target.offsetWidth - 5) {//调整列宽
				return false;
			}
			var _data = '',
				_sort;
			if (sort) {
				_data = e;
				_sort = sort;
			} else {
				var $target = $(e.target);
				if ($target.data('sortable') === false) {
					console.log('不可排序');
					return;
				};
				_data = $target.data('tableData');
				_sort = (this.sortCol == _data) ? ((this.sortDirection == 'asc') ? 'desc' : 'asc') : 'asc';
			}
			this.sortCol = _data;
			this.sortDirection = _sort;
			this.ths.removeClass('sorting-asc').removeClass('sorting-desc');
			this.getElemByData(_data).addClass('sorting-' + this.sortDirection);
			this.getDatas();
		},
		/**
		 * 通过data属性定位元素
		 * @param  {String} data data之
		 * @return {jQuery Object}      对应的jQuery对象
		 */
		getElemByData: function(data) {
			console.log(data);
			for (var i = this.ths.length, $th = $(this.ths[0]); i >= 0; $th = $(this.ths[--i])) {
				if ($th.data('tableData') == data)
					return $th;
			};
			return null;
		},
		fillTable: function(data) {
			this.loading.hide();
			//console.log(data);
			this.draw = data.draw;
			this.recordsTotal = data.recordsTotal;
			this.recordsFiltered = data.recordsFiltered;
			//重置页码
			if(this.pagination) {
				this.setPages(this.draw, Math.floor((this.recordsFiltered - 1) / this.pageItemCount) + 1);
			}
			//重置数据
			var tableDatas = data.data;
			var $tbody = $('tbody', this.element);
			$tbody.children().remove();
			for (var i = 0, tableData = tableDatas[0]; i < tableDatas.length; tableData = tableDatas[++i]) {
				var $newTr = $('<tr></tr>');
				$newTr.attr("data-id", tableData[this.dataId]);
				if (this.rightClick) {
					$newTr.attr("data-right-menu", this.rightClick.targetMenu);
				};
				for (var j = 0, _column = this.columns[0]; j < this.columns.length; _column = this.columns[++j]) {
					var _content = _column.data ? tableData[_column.data] : '';
					var _title = _content, _html = _content;
					if (_column.defaultContent) {
						_html = _column.defaultContent;
						console.log(_content);
						if (_html.match(/\{\d+\}/g).length > 0) {
							var _contentItems = _content.split(',');
							for (var k = 0; k < _contentItems.length; k++) {
								_html = _html.replace('{' + (k + 1) + '}', _contentItems[k]);
							};
						}
					};
					$('<td></td>').addClass(_column.class)
						.attr('title', _title)
						.html(_html)
						.appendTo($newTr);
				}
				$tbody.append($newTr);
			};
		},
		setPages: function(cur, total) {
			//清空状态
			$('li', this.pagination).removeClass('disabled');
			//清空页码
			var $nextLi = $('li.next', this.pagination);
			$nextLi.prevUntil('li.prev').remove();
			(cur === 1) && ($('li.prev').addClass('disabled'));
			(cur === total) && ($('li.next').addClass('disabled'));
			var _pageIndex = 1;
			while (_pageIndex <= total) {
				var $newPage = $('<li data-page="' + _pageIndex + '"><a href="">' + _pageIndex + '</a></li>');
				(cur === _pageIndex++) && ($newPage.addClass('active'));
				$nextLi.before($newPage);
			}
		}

	}


	$.fn.byoneTable = function(option) {
		if (!(option && option.ajax)) {
			alert('Byone Table : no ajax');
			return;
		};
		return this.each(function() {
			var $this = $(this),
				data = $this.data('byoneTable'),
				options = typeof option == 'object' && option;
			$this.addClass('byoneTable');
			if (!data) {
				$this.data('byoneTable', (data = new ByoneTable(this, $.extend({}, $.fn.byoneTable.defaults, options))));
			}
			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.byoneTable.defaults = {};
	$.fn.byoneTable.Constructor = ByoneTable;

}(window.jQuery)