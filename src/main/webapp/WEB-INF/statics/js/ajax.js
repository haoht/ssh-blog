

function checkLoginEmail() {
    $.ajax({
        url:"/mavenSpringMVC/user/checkLoginEmail", //请求验证页面
        type:"GET", //请求方式 可换为post 注意验证页面接收方式
        data:{email:$("#email").val()},//取得表文本框数据，作为提交数据 注意前面的 user 此处格式 key=value 其他方式请参考ajax手册
        dataType:"text",
        success: function(r)
        { //请求成功时执行操作
            var data=JSON.parse(r);
            if(data.code==0){
                mdui.snackbar({
                    message: "邮箱有效,可以登陆。",
                    position: 'right-bottom'
                });
            }else{
                mdui.snackbar({
                    message: "该邮箱未注册",
                    position: 'right-bottom'
                });
            }
        },
        error:function(){
            return false;
        }
    });
}
function userLogin(){
    if($("#email").val()==""){
        mdui.snackbar({
            message: "请输入邮箱",
            position: 'right-bottom'
        });
        event.preventDefault(); // 兼容标准浏览器
        window.event.returnValue = false; // 兼容IE6~8
        //alert(window.event.returnValue.ToString());
    }
    else if($("#password").val()==""){
        mdui.snackbar({
            message: "请输入密码",
            position: 'right-bottom'
        });
        event.preventDefault(); // 兼容标准浏览器
        window.event.returnValue = false; // 兼容IE6~8
    } else {
        $.ajax({
            type: "POST",
            url: "/mavenSpringMVC/user/login",
            data: {
                email: $("#email").val(),
                password: $("#password").val(),
            },
            dataType: "text",
            success: function (r) {

                var data = JSON.parse(r);
                console.log(data);
                if (data.msg=="成功"){
                    toIndex();
                }else {
                    mdui.snackbar({
                        message: "登陆失败",
                        position: 'right-bottom'
                    });
                }


            },
            error: function (err) {
                mdui.snackbar({
                    message: "Ajax出了点问题",
                    position: 'right-bottom'
                });
            }
        });
    }
}
function userRegister(){
    $.ajax({
        type: "POST",
        url: "/mavenSpringMVC/user/register",
        data: {
            email:$("#email").val(),
            password:$("#password").val(),
            nickName:$("#nickName").val(),
            phone:$("#phone").val(),
            location:$("#location").val()
        },
        dataType:"text",
        success:function (r) {
            var data=JSON.parse(r);
            console.log(data)
            mdui.snackbar({
                message: data.msg,
                position: 'right-bottom'
            });
            //alert(data.code)
        },
        error: function (err) {
            mdui.snackbar({
                message: "Ajax出了点问题",
                position: 'right-bottom'
            });
        }
    });
}
function  mySearchText(){
    var search= document.getElementById("searchText").value;
    //alert(search);
    console.log(search);
    $.ajax({
        type: "POST",
        url: "/mavenSpringMVC/blog/search",
        data: {
            searchText:search
        },
        dataType:"text",
        success:function (r) {
            var data=JSON.parse(r);
            console.log(data);
            mdui.snackbar({
                message: data.msg,
                position: 'right-bottom'
            });
            //alert(data.code)
        },
        error: function (err) {
            mdui.snackbar({
                message: "Ajax出了点问题",
                position: 'right-bottom'
            });
        }
    });
}
mdui.JQ('#example-prompt-3').on('click', function () {
    mdui.prompt('请输入文本', '添加类别',
        function (value) {
            $.ajax({
                type: "POST",
                url: "/mavenSpringMVC/categories/add",
                data: {
                    name:value
                },
                dataType:"text",
                success:function (r) {
                    var data=JSON.parse(r);
                    console.log(data);
                    mdui.snackbar({
                        message: data.msg,
                        position: 'right-bottom'
                    });
                    toCategories();
                    //alert(data.code)
                },
                error: function (err) {
                    mdui.snackbar({
                        message: "Ajax出了点问题",
                        position: 'right-bottom'
                    });
                }
            });
        },
        function () {
            mdui.snackbar({
                message: "没有输入内容",
                position: 'right-bottom'
            });
        }
    );
});
function toIndex() {
    window.location.href = '/mavenSpringMVC/home/index';//
}
function toLogin() {
    window.location.href = '/mavenSpringMVC/user/login';//跳转到登陆界面
}
function toRegister() {
    window.location.href = '/mavenSpringMVC/user/register';//跳转到注册界面
}
function toHome() {
    $("#main").load( '/mavenSpringMVC/home/home');
    $.ajax({
        type: "GET",
        url: "/mavenSpringMVC/blog/all",
        data: {
        },
        dataType:"text",
        success:function (r) {
            var html = "";
            var data=JSON.parse(r);
            console.log(data);

             for(var i=0;i<data.data.length;i++){    //遍历data数组
                var ls = data.data[i];
                html+=
                    " <div class=\"mdui-panel-item\">\n" +
                    "                <div class=\"mdui-panel-item-header\">\n" +
                    "                    <div class=\"mdui-panel-item-title\">"+ls[0]+"</div>\n" +
                    "                    <div class=\"mdui-panel-item-summary\">"+ls[1]+"</div>\n" +
                    "                    <i class=\"mdui-panel-item-arrow mdui-icon material-icons\">keyboard_arrow_down</i>\n" +
                    "                </div>\n" +
                    "                <div class=\"mdui-panel-item-body\">\n" +
                    "                    <p>First content</p>\n" +
                    "                    <p>First content</p>\n" +
                    "                    <p>First content</p>\n" +
                    "                    <p>First content</p>\n" +
                    "                    <p>First content</p>\n" +
                    "                    <p>First content</p>\n" +
                    "                    <div class=\"mdui-panel-item-actions\">\n" +
                    "                        <button class=\"mdui-btn mdui-ripple\" mdui-panel-item-close>cancel</button>\n" +
                    "                        <button class=\"mdui-btn mdui-ripple\" onclick=\"readBlog('"+ls[0]+"')\">Read</button>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>";
            }
             $("#listBlog").html(html); //在html页面id=ulul的标签里显示html内
             $("#categoriesNumber").html(data.data.length);

        },
        error: function (err) {
            mdui.snackbar({
                message: "Ajax出了点问题",
                position: 'right-bottom'
            });
        }
    });
}
function readBlog(a) {
    $("#main").load("/mavenSpringMVC/blog/one");
    $.ajax({
        type: "GET",
        url: "/mavenSpringMVC/blog/openBlog",
        data: {
            bid:a
        },
        dataType:"text",
        success:function (r) {
            var data=JSON.parse(r);
            console.log(data);
            var html=data.data.fonts;
            document.getElementById("text111").innerHTML = html;
            //$("#aboutMyself").html(html); //在html页面id=ulul的标签里显示html内

        },
        error: function (err) {
            mdui.snackbar({
                message: "Ajax出了点问题",
                position: 'right-bottom'
            });
        }
    });
}
function toAbout() {
    $("#main").load("/mavenSpringMVC/home/about");
    $.ajax({
        type: "GET",
        url: "/mavenSpringMVC/user/about",
        data: {
        },
        dataType:"text",
        success:function (r) {
            var data=JSON.parse(r);
            console.log(data.data);
                        var user=data.data;

                            html="  <div class=\"mdui-row\">\n" +
                                "                            <br>\n" +
                                "                            <img class=\"mdui-img-circle mdui-center\" width=\"100\" src=\"/mavenSpringMVC/image/avatar.jpg\"/>\n" +
                                "                        </div>\n" +
                                "                        <div class=\"mdui-typo\">\n" +
                                "                            <hr/>\n" +
                                "                        </div>\n" +
                                "                        <div class=\"mdui-row\">\n" +
                                "                            <ul class=\"mdui-list mdui-text-center\">\n" +
                                "                                <li class=\"mdui-list-item mdui-ripple\">\n" +
                                "                                    <div class=\"mdui-list-item-content\">\n" +
                                "                                        <div class=\"mdui-list-item-title mdui-list-item-one-line\">"+user.nickName+"</div>\n" +
                                "                                        <div class=\"mdui-list-item-text mdui-list-item-two-line\">You've got to get enough sleep. Other travelling salesmen live a life of luxury. You've got to get enough sleep. Other travelling salesmen live a life of luxury.</div>\n" +
                                "                                    </div>\n" +
                                "                                </li>\n" +
                                "                                <li class=\"mdui-list-item mdui-ripple\">\n" +
                                "                                    <div class=\"mdui-list-item-content\">\n" +
                                "                                        <div class=\"mdui-list-item-title mdui-list-item-one-line\">"+user.state+"</div>\n" +
                                "                                        <div class=\"mdui-list-item-text mdui-list-item-two-line\">You've got to get enough sleep. Other travelling salesmen live a life of luxury. You've got to get enough sleep. Other travelling salesmen live a life of luxury.</div>\n" +
                                "                                    </div>\n" +
                                "                                </li>\n" +
                                "                                <li class=\"mdui-list-item mdui-ripple\">\n" +
                                "                                    <div class=\"mdui-list-item-content\">\n" +
                                "                                        <div class=\"mdui-list-item-title mdui-list-item-one-line\"><font color=\"#808080\">Phone:"+user.phone+"</font></div>\n" +
                                "                                    </div>\n" +
                                "                                </li>\n" +
                                "                                <li class=\"mdui-list-item mdui-ripple\">\n" +
                                "                                    <div class=\"mdui-list-item-content\">\n" +
                                "                                        <div class=\"mdui-list-item-title mdui-list-item-one-line\"><font color=\"#808080\">Email:"+user.email+"</font></div>\n" +
                                "                                    </div>\n" +
                                "                                </li>\n" +
                                "                                <li class=\"mdui-list-item mdui-ripple\">\n" +
                                "                                    <div class=\"mdui-list-item-content\">\n" +
                                "                                        <div class=\"mdui-list-item-title mdui-list-item-one-line\"><font color=\"#808080\">Location:"+user.location+"</font></div>\n" +
                                "                                    </div>\n" +
                                "                                </li>\n" +
                                "                                <li class=\"mdui-list-item mdui-ripple\">\n" +
                                "                                    <div class=\"mdui-list-item-content\">\n" +
                                "                                        <div class=\"mdui-list-item-title mdui-list-item-one-line\"><font color=\"#808080\">joinTime:"+user.joinDate+"</font></div>\n" +
                                "                                    </div>\n" +
                                "                                </li>\n" +
                                "                            </ul>\n" +
                                "                        </div>\n" +
                                "                        <div class=\"mdui-typo\">\n" +
                                "                            <hr/>\n" +
                                "                        </div>\n" +
                                "                        <div class=\"mdui-row\">\n" +
                                "                            <div class=\"mdui-typo mdui-text-right\">\n" +
                                "                                <blockquote>\n" +
                                "                                    <p>Talk is cheap. Show me the code.</p>\n" +
                                "                                    <footer>马尔克斯 ——《百年孤独》</footer>\n" +
                                "                                </blockquote>\n" +
                                "                            </div>\n" +
                                "                        </div>";
            $("#aboutMyself").html(html); //在html页面id=ulul的标签里显示html内
            //alert(data.code)

        },
        error: function (err) {
            mdui.snackbar({
                message: "Ajax出了点问题",
                position: 'right-bottom'
            });
        }
    });
}
function toCategories() {
    $("#main").load("/mavenSpringMVC/home/categories");
    $.ajax({
        type: "GET",
        url: "/mavenSpringMVC/blog/categories/all",
        data: {
        },
        dataType:"text",
        success:function (r) {
            var html = "";
            var data=JSON.parse(r);
            console.log(data);
            for(var i=0;i<data.data.length;i++){    //遍历data数组
                var ls = data.data[i];
                html+=
                    "<li class=\"mdui-list-item mdui-ripple\">\n" +
                    "                        <div class=\"mdui-list-item-content\">\n" +
                    "                            <div class=\"mdui-list-item-title\">"+ls+"</div>\n" +
                    "                        </div>\n" +
                    "                    </li>";
            }
            $("#ulul").html(html); //在html页面id=ulul的标签里显示html内
            $("#categoriesNumber").html(data.data.length);
            //alert(data.code)
        },
        error: function (err) {
            mdui.snackbar({
                message: "Ajax出了点问题",
                position: 'right-bottom'
            });
        }
    });
}
function toBlog() {
    $("#main").load("/mavenSpringMVC/home/blog");

}
function toLockScreen() {
    window.location.href = '/mavenSpringMVC/home/lockScreen';//跳转到登陆界面
}
function loginSuccess() {
    mdui.snackbar({
        message: "登陆成功",
        position: 'right-bottom'
    });
}
function lockScreen() {
        mdui.confirm('确定锁屏么?', '锁屏',
                function(){
                        mdui.alert('点击了确认按钮');
                        toLockScreen();
                    },
            );
    }
function exit() {
    mdui.confirm('确定退出么?', '确定',
        function(){
            mdui.alert('点击了确认按钮');
            toLockScreen();
        },
    );

}