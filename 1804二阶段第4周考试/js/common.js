/**
 * [得到某个范围内的随机数]
 * @param  {Number} min [最小值]
 * @param  {Number} max [最大值]
 * @return {Number}     [返回值]
 */
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1)) + min;//0:得到一个最小数min,1:得到一个最大值max
}

// 如果封装没有思路，先使用
// randomNumber(10,20);//得到一个随机整数
// randomNumber('abc',20);//得到一个随机整数


// createTable(10,6);//得到一个10行6列的表格

/**
 * [得到一个随机颜色]
 * @return {String} [返回rgb格式颜色]
 */
function randomColor(){
	// 生成rgb颜色
	// var r = parseInt(Math.random()*256);
	var r = randomNumber(0,255);
	var g = randomNumber(0,255);
	var b = randomNumber(0,255);

	return 'rgb('+ r +','+ g +','+ b +')';
}
// randomColor();//得到一个随机颜色'rgb(255,0,0)'

/**
 * [得到一个16进制的随机颜色]
 * #cccccc;#58bc58
 * @return {String} [返回16进制的随机颜色]
 */
function getColor(){
	// 写出所有颜色可能的字符
	var str = '0123456789abcdef';

	// 创建一个变量，用于保存随机生成的颜色
	var res = '#';

	// 循环6次，每次随机获取一个字符
	for(var i=0;i<6;i++){
		// 生成随机索引值
		// var idx = Math.random()*str.length;
		var idx = randomNumber(0,str.length-1);

		res += str.charAt(idx);
	}

	// 返回随机颜色
	return res;
}

// getColor();//#58bc58


// 	封装一个删除非元素节点的函数
// 	兼容版本浏览（IE8-）
var element = {
	/**
	 * [获取元素节点]
	 * @param  {Nodes} nodes [节点]
	 * @return {Array}       [返回所有元素节点]
	 */
	get:function(nodes){
		// 创建空数组，用于存放结果
		var res = [];
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].nodeType === 1){
				res.push(nodes[i]);
			}
		}

		// 返回结果
		return res;
	},
	// 获取所有子元素
	children:function(node){

	},
	// 下一个兄弟元素
	next:function(node){

	},
	// 上一个兄弟元素
	prev:function(node){

	},
	// 父元素
	parent:function(node){

	},
	// 兼容ie8-
	getByClassName:function(className){
		// return documebnt.getElementsByClassName(className)
	}
}

// element.get(nodes);//[element,element]
// element.children(document.body);
// element.next(baidu);//
// element.getByClassName()

/**
 * [获取css样式,兼容ie8-]
 * @param  {Element} ele [要获取样式的元素]
 * @param  {String} key [css属性]
 * @return {String}     [css属性值]
 */
function getCss(ele,key){
	//判断思路：判断用户使用的浏览器是否支持getComputedStyle
	if(window.getComputedStyle){
		return getComputedStyle(ele)[key]
	}else if(ele.currentStyle){
		return ele.currentStyle[key]
	}else{
		// 如果以上都不支持，直接返回内联样式
		return ele.style[key];
	}
}
// getCss(box,'font-size');//16px

/**
 * [事件绑定函数，支持冒泡/捕获]
 * @param  {Node} ele     [需绑定事件的节点]
 * @param  {String} type    [事件类型]
 * @param  {Function} handler [事件处理函数]
 * @param  {Boolean} capture [是否捕获]
 */
function bind(ele,type,handler,capture){
	// 判断是否支持addEventListener
	if(ele.addEventListener){
		ele.addEventListener(type,handler,capture);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+type,handler);
	}else{
		ele['on'+type] = handler
	}
}

// bind(box,'click',function(){},true)

/*
	cookie操作
		* 增
		* 删
		* 查
		* 改
 */
var cookie = {
	/**
	 * [读取cookie]
	 * @param  {String} name [cookie名]
	 * @return {String}      [返回name对应的cookie值]
	 */
	get:function(name){
		var cookies = document.cookie;
		var res = '';
		if(cookies.length){
			cookies = cookies.split('; ');//[]

			// 循环优化方式
			for(var i=0,len=cookies.length;i<len;i++){
				// 拆分cookie名、cookie值
				var arr = cookies[i].split('=');
				if(arr[0] === name){
					res = arr[1];
				}
			}
		}

		return res;
	},
	/**
	 * [添加cookie]
	 * @param {String} name    [cookie名]
	 * @param {String} val     [cookie值]
	 * @param {[Date]} expires [有效期]
	 * @param {[String]} path    [路径]
	 */
	set:function(name,val,expires,path){
		var str = name+'='+val;

		// 传入有效期时
		if(expires){
			str += ';expires=' + expires.toUTCString();
		}

		if(path){
			str += ';path=' + path;
		}

		document.cookie = str;
	},
	/**
	 * [删除cookie]
	 * @param  {String} name [cookie名]
	 */
	remove:function(name){
		var now = new Date();
		now.setDate(now.getDate()-10);
		// document.cookie = name + '=null;expires=' + now.toUTCString();
		this.set(name,'null',now);
	}
}

// cookie.get('carlistabcdefg');//[{}]
// cookie.set('carlist',JSON.stingify(carlist),now);//[{}]
// cookie.remove('carlist');