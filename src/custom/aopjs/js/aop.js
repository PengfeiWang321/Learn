Function.prototype.before = function(func){
    var __self = this;
    return function(){
        if(func.apply(this,arguments) === false){//执行新函数，修正this
            return false;
        }
        return __self.apply(this,arguments);//执行原函数
    }
}
Function.prototype.after = function(func){
    var __self = this;
    return function(){
        var ret = __self.apply(this,arguments);//执行原函数
        if(ret === false){
            return false;
        }
        func.apply(this,arguments);
        return ret;
    }
}
Function.prototype.afterChain = function(func){
    var __self = this;
    return function(){
        var ret = __self.apply(this,arguments);//执行原函数
        if(ret){
            return ret;
        }
        return func.apply(this,arguments);
    }
}
Function.prototype.testbefore = function(func){
    var __self = this;
    return function(){
        func(arguments);//执行新函数
        return __self(arguments);//执行原函数
    }
}
