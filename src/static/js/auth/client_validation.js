document.addEventListener("DOMContentLoaded",function(){Inputmask({regex:".{0,45}"}).mask("#fullname_input");Inputmask({regex:".{0,45}"}).mask("#password_input");Inputmask({regex:".{0,45}"}).mask("#repeat_password_input")});
document.addEventListener("DOMContentLoaded",function(){function c(b,a,e){a?$(b).text(""):$(b).text(e);return a}function d(){var b=g.val(),a=h.val(),e=k.val();a=c(l,/^[\u0410-\u042f\u0430-\u044f\u0401\u0451\s\-']+$/.test(a),"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0435 \u0438\u043c\u044f, \u0444\u0430\u043c\u0438\u043b\u0438\u044e \u0438 \u043e\u0442\u0447\u0435\u0441\u0442\u0432\u043e.");b=c(m,/^[A-Za-z\d\s\-']{5,27}$/.test(b),"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043d\u0438\u043a\u043d\u0435\u0439\u043c.");
e=c(n,/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 email.");const [p,q,r]=[a,e,b];a=$(f[0]).val();b=$(f[1]).val();e=c(t[0],/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(a),"\u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432, \u0432\u043a\u043b\u044e\u0447\u0430\u044f \u0431\u0443\u043a\u0432\u044b \u0438 \u0446\u0438\u0444\u0440\u044b.");
a=c("#match-error",a===b,"\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442.");const [u,v]=[e,a];showOrHideButtonRegister(p&&q&&r&&u&&v)}const f=["#password_input","#repeat_password_input"],t=["#password_input_error"],h=$("#fullname_input"),l=$("#fullname_input_error"),g=$("#name_input"),m=$("#name_input_error"),k=$("#email_input"),n=$("#email_input_error"),w=$("#registration_next_button");h.on("input",function(){d()});g.on("input",function(){d()});
k.on("input",function(){d()});f.forEach(b=>{$(b).on("input",function(){d()})});w.click(function(){d()})});function showOrHideButtonRegister(c){const d=document.getElementById("registration_next_button");d.style.display=c?"block":"none";c&&(d.onclick=registerNextStep)};
