//表单验证
//定义一个中间变量
let tf = false;
//定义一个变量来判断五个内容是否都正确
let num = 0;
//创建一个总数组,用来存储用户数据信息
let arrall = [];
//获取修改input数组
let secinputs = document.querySelectorAll('.second input');
//获取首页inputs数组
let inputs = document.querySelectorAll('.first input');

//变色函数
function color(obj, tfres) {
    if (tfres == true) {
        $(obj).css('borderColor', 'rgba(120, 163, 117)').siblings().css({ 'borderColor': 'rgba(120, 163, 117)', 'color': 'rgba(120, 163, 117)', 'background': 'rgba(223, 240, 216)' });
    } else {
        $(obj).css('borderColor', 'rgba(180, 93, 91)').siblings().css({ 'borderColor': 'rgba(180, 93, 91)', 'color': 'rgba(180, 93, 91)', 'background': 'rgba(242, 222, 222)' });
    }
}
//验证内容格式
function regall(inputs) {
    tf = false;
    num = 0;
    // 验证姓名
    let reg = /^[^0-9]\w{7,15}$/;
    if (reg.test(inputs[0].value)) {
        tf = true;
        num++;
        color(inputs[0], tf);
    } else {
        color(inputs[0]);
    }
    //验证电话号码
    let reg2 = /^1[3-9][0-9]{9}$/;
    if (reg2.test(inputs[1].value)) {
        tf = true;
        num++;
        color(inputs[1], tf);
    } else {
        color(inputs[1]);
    }
    //验证学历
    let reg3 = /小学|初中|高中|大专|专科|本科|研究生/g;
    if (reg3.test(inputs[2].value)) {
        tf = true;
        num++;
        color(inputs[2], tf);
    } else {
        color(inputs[2]);
    }
    //验证年龄
    let reg4 = /[0-9]{1,3}$/;
    if (reg4.test(inputs[3].value)) {
        tf = true;
        num++;
        color(inputs[3], tf);
    } else {
        color(inputs[3]);
    }
    //薪资验证
    let reg5 = /[0-9]{0,5}$/;
    if (reg5.test(inputs[4].value)) {
        tf = true;
        num++;
        color(inputs[4], tf);
    } else {
        color(inputs[4]);
    }
}
// //获取 localStorage 中的数据信息
// let cateArr = JSON.parse(localStorage.getItem('cart'));
// //写入
// localStorage.setItem('shop', JSON.stringify());/
//为保存按钮添加事件
$('.save').click(function () {
    //验证是否全部符合条件
    regall(inputs);
    //判断，如果通过验证则向后台传参,也就是num == 5
    if (num == 5) {
        //创建一个数组来存储总数据
        let userinfo = [];
        inputs.forEach(function (item) {
            userinfo.push(item.value);
        });
        arrall.push(userinfo);
        //将数据写入
        localStorage.setItem('cart', JSON.stringify(arrall));
        //读取数据将数据呈现在页面中
        settable();
    }
});
//重置按钮
$('.reset').click(function () {
    inputs.forEach(function (item) {
        item.value = '';
    });
});
//写入表格
function settable() {
    let getArr = JSON.parse(localStorage.getItem('cart'));
    let str = '';
    //循环遍历数组获取数据
    getArr.forEach(function (item) {
        str += `
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
                <td>${item[4]}</td>
                <td>
                    <button class="setnew">修改</button>
                    <button class="del">删除</button>
                </td>
            </tr>`
            ;
    });
    $('tbody').html(str);
}
//删除数据 获取下标，从总数组删除 然后在重新写入
$('tbody').on('click', '.del', () => {

    // 获取当前下标
    let index = $(this).parent().parent().index() + 1;
    console.log(index);
    arrall.splice(index, 1);
    //写入新数组
    localStorage.setItem('cart', JSON.stringify(arrall));
    //重新写入页面
    settable()
});
//修改数据 
$('tbody').on('click', '.setnew', () => {
    console.log('hello');
    $('.window_box').css('display', 'block');
});
//判断修改的数据是否正确
$('.saves').click(function () {
    console.log(secinputs);
    //验证是否全部符合条件
    regall(secinputs);
    if (num == 5) {
        let newarr = [];
        secinputs.forEach(function (item) {
            newarr.push(item.value);
        });
        arrall.push(newarr);
        //将新数组写入
        localStorage.setItem('cart', JSON.stringify(arrall));
        //读取数据将数据呈现在页面中
        settable();
    }
});
//关闭按钮
$('.off').click(function () {
    secinputs.forEach(function (item) {
        item.value = '';
    });
    $('.window_box').css('display', 'none');
});
//拖动效果
$('.second').mousedown(function (e) {
    console.log('1');
    //防止点击时跳动
    let div_x = e.clientX - $('.second')[0].offsetLeft;;
    let div_y = e.clientY - $('.second')[0].offsetTop;
    let tf = true;
    $(document).mousemove(function (e) {
        if (tf) {
            $('.second').css({ 'left': e.clientX - div_x + 'px', 'top': e.clientY - div_y + 'px' });
        }
        // console.log(e.pageX - div_x + 'px');
    }).mouseup(function () {
        tf = false;
    });
});
console.log(JSON.parse(localStorage.getItem('cart')));