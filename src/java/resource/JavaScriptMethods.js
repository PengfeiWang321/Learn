/**
 * Created by Administrator on 2018/1/19 0019.
 */
function execute(s1, s2) {
    return eval(s1 + "=" + s2);
}
function print(s1) {
    return JSON.stringify(eval(s1));
}