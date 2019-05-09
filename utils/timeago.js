
function transDate (mescStr) {
    var n = mescStr;
    var date = new Date(n);
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    var H = date.getHours() + ':';
    var Mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();


    var M2 = date.getMonth() + 1;
    var D2 = date.getDate();
    var H2 = date.getHours();
    var Mi2 = date.getMinutes();

    var date1 = new Date();
    var M1 = date1.getMonth() + 1;
    var D1 = date1.getDate();
    var H1 = date1.getHours();
    var Mi1 = date1.getMinutes();
    console.log(M1 + " " + D1 + "....")
    if (M1 > M2 || D1 > D2) {
        return (M + D + H + Mi)
    }
    else if (H1 - H2 > 1) {
        var H3 = H1 - H2
        return (H3 + "小时前")
    }
    else if (Mi1 - Mi2 > 1) {
        var Mi3 = Mi1 - Mi2
        return (Mi3 + "分钟前")
    }
    else {
        return "刚刚"
    }
}

module.exports = {
    transDate: transDate
}