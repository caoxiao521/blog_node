//退出登录
$(function(){
	$('[data-js=btn_out]').click(function(){
		$.ajax({
			url:'/login/loginout',
			type:'post',
			success:function(res){
				if(res.code === 0){
					window.location.reload();
				}
			}
		});
	});
});