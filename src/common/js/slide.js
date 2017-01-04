export function slide(oWrap){
	let oChild=oWrap.children[0];
		// oChild.innerHTML+=oChild.innerHTML;
	let aItem=oChild.children;
	// 获取元素的个数，设置宽度
	let len=aItem.length;
	let w=document.documentElement.clientWidth;
	// 设置oChild.children的width
	for (var i = 0; i <len; i++) {
		aItem[i].style.width=w+"px";
	};
	oChild.style.width=len*w+"px";
	// 控制按钮
	let oChildControl=oWrap.children[1];
	let length=oChildControl.children.length;
	// 滑动
	let startX=0,tranlateX=0,nowIndex=0,disX;
	oWrap.addEventListener("touchstart",(e)=>{
		oChild.style.transition="none";
		oChild.style.webkitTransition="none";
		if(nowIndex==0){
			nowIndex=length;
		}
		if(nowIndex==len-1){
			nowIndex=length-1;
		}
		startX={pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY};
	},false)
	oWrap.addEventListener("touchmove",(e)=>{
		disX=e.changedTouches[0].pageX-startX.pageX;
		let disY=e.changedTouches[0].pageY-startX.pageY;
		tranlateX=disX+(-nowIndex*w);
			// 阻止上下滑动
		if(Math.abs(disY)>Math.abs(disX)){
			return;
		}
		// 启动3d加速
		oChild.style.transform="translate3d("+tranlateX+"px,0,0)";
		oChild.style.webkitTransform="translate3d("+tranlateX+"px,0,0)";
	},false)
	oWrap.addEventListener("touchend",(e)=>{
		// 小于1/3,回到原处
		let scale=Math.abs(tranlateX/w);
		let dis=disX<0?scale%1:1-scale%1;
		//获取现在index
		nowIndex=dis<1/3&&disX<0||dis>1/3&&disX>0?Math.floor(scale):Math.ceil(scale);
		oChild.style.transition=".3s linear";
		oChild.style.webkitTransition=".3s linear";
		oChild.style.transform="translate3d("+(-nowIndex*w)+"px,0,0)";
		oChild.style.webkitTransform="translate3d("+(-nowIndex*w)+"px,0,0)";
		// 控制按钮
		for (var i = 0; i < length; i++) {
			oChildControl.children[i].className="";
		}
		oChildControl.children[nowIndex%length].className="active";
	},false)
}