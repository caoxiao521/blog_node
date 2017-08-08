$(function() {
    $('[data-js=register]').click(function() {
        var data = {
            "name": $('input[name=name]').val(),
            "passwd": $('input[name=passwd]').val()
        }
        $.ajax({
            url: '/register',
            type: 'post',
            data: data,
            success: function(res) {
                if(res.code == 0){
                    window.location.reload();
                	$('.info').text(res.msg);
                }else{
                	$('.info').text(res.msg)
                }
            }
        });
    });
});