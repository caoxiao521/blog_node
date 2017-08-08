$(function() {
    $('[data-js=submit]').click(function() {
        var data = {
            "name": $('input[name=name]').val(),
            "passwd": $('input[name=passwd]').val()
        }
        $.ajax({
            url: '/login',
            type: 'post',
            data: data,
            success: function(res) {
                if(res.code == 0){
                	$('.info').text(res.msg);
                    window.location.reload();
                }else{
                	$('.info').text(res.msg)
                }
            }
        });
    });
});