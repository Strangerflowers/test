// 1.封装[a,b]的随机整数
// 如果要拿到5-100的整数，随机数取值应该5-101。（5-101）===>(0,96)+5
// Math.random()*96+5    =====>parseInt(Math.random()*(max-min+1) +min)
function getRandomNum(min,max){
    var ranNum = parseInt(Math.random()*(max-min+1) +min);
    return ranNum;
}
// 2.封装随机颜色 rgb(0-255,0-255,0-255)
function getRandomColor(){
    var r = getRandomNum(0,255);
    var g = getRandomNum(0,255);
    var b = getRandomNum(0,255);
    return "rgb("+r+","+g+","+b+")";
}
//3.
//实现封装，只获取元素节点
//节点数组过滤成只有元素节点的数组 if(节点.nodeType == 1){说明为元素节点}
//父元素节点、子元素节点、兄弟节点
var Element = {
    getElementNodes : function(nodeArr){
        var arr = [];
        for(var i=0;i<nodeArr.length;i++){
            if(nodeArr[i].nodeType == 1){
                arr.push(nodeArr[i]);
            }
        }
        return arr;
    },
    getChildElements : function(node){
        var child = node.childNodes;
        Element.getElementNodes(child);
    },
    getPreviousElement : function(node){
        var previous = node.previousSibling;
        // 若该节点上一个节点是文本，再获取到该文本节点的上一个节点。
        if(previous.nodeType != 1){
            previous = previous.previousSibling;
        }
        return previous;

    }
}


// 封装获取样式
function getStyle(ele,attr){
     // 1.window.getComputedStyle(ele节点) 返回值为包含所有css样式的对象（标准浏览器）
    //    * window.getComputedStyle(ele节点).css属性  返回值为css属性值
    // 2.ele节点.currentStyle.css属性  返回值为css属性值
    //    * 注意事项：ie浏览器都不能直接获取css总属性的值 
    if(window.getComputedStyle){
        return window.getComputedStyle(ele)[attr]; 
    }else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return ele.style[attr];
    }

}


function bind(ele,type,fn,isCapture){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,isCapture);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,fn);
    }else{
        ele["on"+type] = fn;
    }
}




var Cookie = {
    setCookie : function(name,value,date,path){
        // document.cookie = name+"="+value+"; expires="+date+"; path="+path;
        var res = name+"="+value;
        if(date){
            res += "; expires="+date;
        }
        if(path){
            res += "; path="+path;
        }
        document.cookie = res;

    },
    getCookie : function(name){
        var cookies = document.cookie;
        var cookiesArr = cookies.split("; ");
        // top
        // ["left=200","top=200"]
        for(var i=0;i<cookiesArr.length;i++){
            var arr = cookiesArr[i].split("=");
            if(arr[0] == name){
                return arr[1];
            }
        }

        return "";
    },
    removeCookie : function(name,value,path){
        //利用过期时间设置cookie
        var d = new Date();
        d.setDate(d.getDate()-1);
        Cookie.setCookie(name,value,d.toUTCString(),path);
    }
}