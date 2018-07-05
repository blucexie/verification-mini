$(function () {
    $('#mesBtn').click(function () {
        var mobile = $('#resumeMobile').val();
        var regex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if(!regex.test(mobile)){
            layer.open({
                content: '请输入正确的手机号码',
                btn: '确定'
            });
            return;
        }
        $.ajax({
            type : "POST",
            url : "http://192.168.1.6:8887/api/quick/enterprise/send/registeSMS",
            timeout:5000,
            dataType:"json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data : JSON.stringify({"mobile":mobile}),
            success : function(data) {
                var jsonData = JSON.parse(data['plaintext']);
                var result = jsonData.result;
                if(result === 2001){
                    layer.open({
                        content: '短信发送成功',
                        btn: '确定'
                    });
                    return;
                }
            }
        });
    });


    $('.register>button').click(function () {
        dataJson ={
            mobile:$('#resumeMobile').val(),
            loginPwd: $('#resumePassword').val(),
            validateCode:$('#validateCode').val(),
            openid:'fsgdfgsdifgsuifhdvxjkvb'
        };
        $.ajax({
            url:'http://192.168.1.6:8887/api/quick/enterprise/register',
            type: "POST",
            timeout:5000,
            dataType:"json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:JSON.stringify(dataJson),
            success: function (data) {
                var jsonData = JSON.parse(data['plaintext']);
                var result = jsonData.result;
                var resultInfo = jsonData.resultInfo;
                if(result === 1001){
                    layer.open({
                        content: resultInfo
                    });
                    window.location.replace("index.html");
                }else{
                    layer.open({
                        content: resultInfo,
                        btn: '确定'
                    });
                    return;
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                layer.open({
                    content: '网络异常，请稍后重试',
                    btn: '确定'
                });
            }
        });
    })
});