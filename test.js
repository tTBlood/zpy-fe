var url = 'https://cbncfv.sojump.com/handler/processjq.ashx';

var origin = 'https://cbncfv.sojump.com/m/9736561.aspx',
	submittype = '',
	curid = '9736561',
	starttime = '',
	rn = '',
	source = '',
	t = +new Date();

var rdmAnswers = function(){
	var aLength = [5, 6, 6, 5, 5, 4, 5, 6, 5], str = '', tmp;
	for(var i = 0; i < aLength.length;){
		tmp = (i != 4? Math.ceil(Math.random() * 5):5);
		str += (i++ == 0? i  + '&' + tmp: '}' + i + '&' + tmp);
	}
	return {submitdata: str};
};

var postAnswers = function(){
	var _url = url + '?curid=' + curid + '&starttime=' + encodeURIComponent(starttime) 
	         + '&source=' + source + '&submittype=' + submittype + '&rn=' + rn + '&t=' + t;
	         //+ '&validate_text=立已2言&btuserinput=btuserinput&btcaptchaId=DesignerInitializedCaptcha&btinstanceId=2142489363db43b2a493a9579cb56763';
	    _data = rdmAnswers();

	
	    var p = $.post(_url, _data);

	    p.then(function(data){
	    	$('[data=data-result] em').html('提交数据成功');
	    	}, 
	    	function(data){
	    		$('[data=data-result] em').html('提交数据失败');
	    	});
};

var errors = 0, intvl = 0;

var brush  = function(){
	var promise = $.get(origin);

	promise.then(
		function(data){

			var a = data.match(/rndnum="([^"]*)"/);
			var input  = data.match(/<input .*value="([^"]*)" .*name="([^"]*)"/g);

			rn = a[1];
			submittype = input[0].match(/value="([^"]*)"/)[1];;
		    starttime = input[1].match(/value="([^"]*)"/)[1];
		    source = input[2].match(/value="([^"]*)"/)[1];
		    $('[data=data-result] em').html('获取页面成功');
		}, 
		function(data){
			$('[data=data-result] em').html('获取页面失败');
			errors ++;
		}).then(postAnswers);
	
	if(errors >= 100){
		clearInterval(intvl);
	}
};

$('.brush').on('click', function(){
	intvl = setInterval(brush, 2000);
	$(this).html('正在提交表单');
});











