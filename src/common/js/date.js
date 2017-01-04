export function formatDate(date,str){
// RegExp.$1 即括号中匹配的值
 if(/(y+)/i.test(str)){
 	// 替换后最大长度为4
  str= str.replace(RegExp.$1,String(date.getFullYear())).substr(4-RegExp.$1.length)
 }
 var o={
 	"M+":date.getMonth()+1,
 	"d+":date.getDate(),
 	"h+":date.getHours(),
 	"m+":date.getMinutes(),
 	"s+":date.getSeconds(),
 };
 for(var key in o){
 	var re;
 	if(key==="M+"||key==="m+"){
 		re=new RegExp(`(${key})`)
 	}else{
		re=new RegExp(`(${key})`,"i")
 	}
 	if(re.test(str)){
 		str=str.replace(RegExp.$1,String( o[key].length==1?dataTime(o[key]):o[key]) )
 	}
 }
 return str;
};
function dataTime(t){
	return t<10?"0"+t:t;
};