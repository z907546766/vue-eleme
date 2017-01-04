 function rexCheckTel(val){
	let re=/^1(3|4|5|7|8)\d{9}$/
	if(re.test(val)){
		return true;
	}
};
function rexCheckCode(val){
	let re=/^\d{4}$/
	if(re.test(val)){
		return true;
	}
};
function rexCheckEmail(val){
	let re=/^[_\.A-Z0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/
	if(re.test(val)){
		return true;
	}
};
function rexCheckUsername(val){
	//4-12位,字母（大小写敏感），数字，下划线，不能以下划线开头和结尾
	let re=/^[a-zA-Z\d]\w{3,11}([a-zA-Z\d])$/
	if(rexCheckTel(val)||rexCheckEmail(val)||re.test(val)){
		return true;
	}
};
function rexCheckPassword(val){
	let re=/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,15}/
	if(re.test(val)){
		return true;
	};
};
export{rexCheckTel,rexCheckCode,rexCheckEmail,rexCheckUsername,rexCheckPassword}