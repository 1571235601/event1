$(function(){
    $(".login a").on("click",function(){
        $(".login").hide()
        $(".register").show()
    })
    $(".register a").on("click",function(){
        $(".login").show()
        $(".register").hide()
    })
  
    // 正则验证


  let form = layui.form
  

    form.verify({
            username: function(value, item){ //value：表单的值、item：表单的DOM对象
                console.log(1);
                if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
                }
                if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
                }
                if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
                }
                
                //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
                if(value === 'kao'){
                alert('用户名不能为敏感词');
                return true;
                }
            }
            
            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,pass: [
                /^[\S]{6,12}$/
                ,'密码必须6到12位,且不能出现空格'
            ],
            repass : function(value,item){
              console.log( $(".register input[name=password]").val());
                if(value != $(".register input[name=password]").val()){
                    return "输入的两次密码不一致!"
                }
            }
     });

    //  注册提交事件
      $(".register form").submit(function(e){
        e.preventDefault()
        $.ajax({
            url : "http://www.liulongbin.top:3007/api/reguser",
            data : {
                username : $(".register input[name=username]").val(),
                password :  $(".register input[name=password]").val()
            },
            type : "post",
            success : function(res){
                if(res.status !=0){
                    return "注册失败"
                }
            }
        })
        location.href = "../login.html"

    })

    // 登录提交事件
    $(".login form").submit(function(e){
        e.preventDefault()
          $.ajax({

        url : "http://www.liulongbin.top:3007/api/login",

        type : "post",
        data : {
            username : $(".login input[name=username]").val(),
            password : $(".login input[name=password]").val(),
        },
        success : function(res){
            console.log(res);
        }

    })
    })

})