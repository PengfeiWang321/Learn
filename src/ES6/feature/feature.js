'use strict';
Function.prototype.before = function (func) {
    var __self = this;
    return function () {
        if (func.apply(this, arguments) === false) {//执行新函数，修正this
            return false;
        }
        return __self.apply(this, arguments);//执行原函数
    }
};
Function.prototype.after = function (func) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);//执行原函数
        if (ret === false) {
            return false;
        }
        func.apply(this, arguments);
        return ret;
    }
};
//Default Parameters（默认参数）
var feature_1 = function () {
    // in es5
    var test_1 = function (height, color, url) {
        var height = height || 50;
        var color = color || 'red';
        var url = url || 'http://azat.co';
        console.info('height:' + height);
        console.info('color:' + color);
        console.info('url:' + url);
    };
    // in es6
    var test_2 = function (height = 50, color = 'red', url = 'http:\/\/azat.co') {//不用反斜杠会babel编译会报错
        console.info('height:' + height);
        console.info('color:' + color);
        console.info('url:' + url);
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
};
//Template Literals （模板文本）
var feature_2 = function () {
    // in es5
    var test_1 = function (first = 'wang', last = 'pengfei', id = 1) {
        var name = 'Your name is ' + first + ' ' + last + '.';
        var url = 'http://localhost:3000/api/messages/' + id;
        console.info('name:' + name);
        console.info('url:' + url);
    };
    // in es6
    var test_2 = function (first = 'wang', last = 'pengfei', id = 1) {
        var name = `Your name is ${first} ${last}. `;
        var url = `http://localhost:3000/api/messages/${id}`;
        console.info('name:' + name);
        console.info('url:' + url);
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
};
//Multi-line Strings （多行字符串）
var feature_3 = function () {
    // in es5
    var test_1 = function () {
        var roadPoem = 'Then took the other, as just as fair,nt'
            + 'And having perhaps the better claimnt'
            + 'Because it was grassy and wanted wear,nt'
            + 'Though as for that the passing therent'
            + 'Had worn them really about the same,nt';
        var fourAgreements = 'You have the right to be you.n'
            + 'You can only be you when you do your best.';
        console.info('roadPoem:' + roadPoem);
        console.info('fourAgreements:' + fourAgreements);
    };
    // in es6
    var test_2 = function () {
        var roadPoem = `Then took the other, as just as fair,
           And having perhaps the better claim
           Because it was grassy and wanted wear,
           Though as for that the passing there
           Had worn them really about the same,`;
        var fourAgreements = `You have the right to be you.
           You can only be you when you do your best.`;
        console.info('roadPoem:' + roadPoem);
        console.info('fourAgreements:' + fourAgreements);
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
};
//Destructuring Assignment （解构赋值）
var feature_4 = function () {
    // in es5
    var test_1 = function () {
        var data = {house: 'house', mouse: 'mouse'},//$('body').data()
            house = data.house,
            mouse = data.mouse;
        console.info('house:' + house);
        console.info('mouse:' + mouse);
    };
    // in es6
    var test_2 = function () {
        var data = {house: 'house', mouse: 'mouse'};//$('body').data()
        var {house, mouse} = data;
        console.info('house:' + house);
        console.info('mouse:' + mouse);

        var [col1, col2] = ['column_1', 'column_2'];//$('.column')
        var stringlist = 'str_1#str_2#str_3#str_4#str_5';
        var [line1, line2, line3, , line5] = stringlist.split('#');
        console.info('col1:' + col1);
        console.info('col2:' + col2);
        console.info('line1:' + line1);
        console.info('line2:' + line2);
        console.info('line3:' + line3);
        console.info('line5:' + line5);
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
};
//Enhanced Object Literals （增强的对象文本）
var feature_5 = function () {
    // in es5
    var test_1 = function () {
        var serviceBase = {port: 3000, url: 'azat.co'},
            getAccounts = function () {
                return [1, 2, 3]
            };
        var accountServiceES5 = {
            port: serviceBase.port,
            url: serviceBase.url,
            getAccounts: getAccounts,
            toString: function () {
                return JSON.stringify(this.valueOf());
            },
            getUrl: function () {
                return "http://" + this.url + ':' + this.port
            },
            valueOf_1_2_3: getAccounts()
        };

        var accountServiceES5ObjectCreate = Object.create(serviceBase);
        // accountServiceES5ObjectCreate = {
        //     getAccounts: getAccounts,
        //     toString: function () {
        //         return JSON.stringify(this.valueOf());
        //     },
        //     getUrl: function () {
        //         return "http://" + this.url + ':' + this.port
        //     },
        //     valueOf_1_2_3: getAccounts()
        // };

        console.log('accountServiceES5:');
        console.log(accountServiceES5);
        console.log('ccountServiceES5ObjectCreate:');
        console.log(accountServiceES5ObjectCreate);
    };
    // in es6
    var test_2 = function () {
        var serviceBase = {port: 3000, url: 'azat.co'},
            getAccounts = function () {
                return [1, 2, 3]
            };
        var accountService = {
            __proto__: serviceBase,
            getAccounts,
            toString() {
                return JSON.stringify((super.valueOf()));
            },
            getUrl() {
                return "http://" + this.url + ':' + this.port
            },
            [ 'valueOf_' + getAccounts().join('_') ]: getAccounts()
        };
        console.log('serviceBase:');
        console.log(serviceBase);
        console.log('accountService:');
        console.log(accountService);
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
};
//Arrow Functions （箭头函数）
var feature_6 = function () {
    // in es5
    var test_1 = function () {
        // var _this = this;
        // $('.btn').click(function(event){
        //     _this.sendData();
        // })
    };
    // in es6
    var test_2 = function () {
        // $('.btn').click((event) =>{
        //     this.sendData();
        // })
    };
    // in es5
    var test_3 = function () {
        var logUpperCase = function() {
            var _this = this;
            this.string = this.string.toUpperCase();
            return function () {
                return console.log(_this.string);
            }
        };
        logUpperCase.call({ string: 'ES6 rocks' })();
    };
    // in es6
    var test_4 = function () {
        var logUpperCase = function() {
            this.string = this.string.toUpperCase();
            return () => console.log(this.string);
        };
        logUpperCase.call({ string: 'ES6 rocks' })();
    };
    // in es5
    var test_5 = function () {
        var ids = ['5632953c4e345e145fdf2df8','563295464e345e145fdf2df9'];
        var messages_1 = ids.map(function (value) {
            return "ID is " + value; // explicit return
        });
        var messages_2 = ids.map(function (value, index, list) {
            return 'ID of ' + index + ' element is ' + value + ' '; // explicit return
        });
        console.log(messages_1);
        console.log(messages_2);
    };
    // in es6
    var test_6 = function () {
        var ids = ['5632953c4e345e145fdf2df8','563295464e345e145fdf2df9'];
        var messages_1 = ids.map(value => `ID is ${value}`);
        //对于单个参数，括号()是可选的，但当你超过一个参数的时候你就需要他们。
        var messages_2 = ids.map((value, index, list) => `ID of ${index} element is ${value} `); // implicit return
        console.log(messages_1);
        console.log(messages_2);
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
    console.info('test in es5:');
    test_3();
    console.info('test in es6:');
    test_4();
    console.info('test in es5:');
    test_5();
    console.info('test in es6:');
    test_6();
};
//Promises
var feature_7 = function () {
    // in es5
    var test_1 = function () {
        setTimeout(function(){
            console.log('Yay!');
            setTimeout(function(){
                console.log('Wheeyee!');
            }, 1000)
        }, 1000);
    };
    // in es6
    var test_2 = function () {
        var wait1000 =  ()=> new Promise((resolve, reject)=> {setTimeout(resolve, 1000)});
        wait1000()
            .then(function() {
                console.log('Yay!')
                return wait1000()
            })
            .then(function() {
                console.log('Wheeyee!')
            });
    };
    // 延时执行会打乱顺序的
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
};
//Block-Scoped Constructs Let and Const（块作用域构造Let and Const）
var feature_8 = function () {
    // in es5
    var test_1 = function () {
        function calculateTotalAmount (vip) {
            var amount = 0;
            if (vip) {
                var amount = 1;
            }
            {
                var amount = 100;
                {
                    var amount = 1000;
                }
            }
            return amount;
        }
        console.log(calculateTotalAmount(true));
    };
    // in es6
    var test_2 = function () {
        function calculateTotalAmount (vip) {
            let amount = 0;
            if (vip) {
                let amount = 1;
            }
            {
                let amount = 100;
                {
                    let amount = 1000;
                }
            }
            return amount;
        }
        console.log(calculateTotalAmount(true));
    };
    // in es6
    var test_3 = function () {
        function calculateTotalAmount (vip) {
            const amount = 0;
            if (vip) {
                const amount = 1;
            }
            {
                const amount = 100 ;
                {
                    const amount = 1000;
                }
            }
            return amount;
        }
        console.log(calculateTotalAmount(true));
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
    console.info('test in es6:');
    test_3();
};
//Classes（类）
var feature_9 = function () {
    // in es6
    var test_2 = function () {
        class baseModel {
            constructor(options, data) {// class constructor，node.js 5.6暂时不支持options = {}, data = []这样传参
                this.name = 'Base';
                this.url = 'http://azat.co/api';
                this.data = data;
                this.options = options;
            }
            getName() { // class method
                console.log(`Class name: ${this.name}`);
            }
        }
        class AccountModel extends baseModel {
            constructor(options, data) {
                super({private: true}, ['32113123123', '524214691']);
                this.name = 'Account Model';
                this.url += '/accounts/';
            };
            get accountsData() {
                return this.data;
            }
        }

        let accounts = new AccountModel(5);
        accounts.getName();
        console.log('Data is :');
        console.log(accounts.accountsData);
    };
    console.info('test in es6:');
    test_2();
};
//'import' and 'export' may only appear at the top level
import {port, getAccounts} from 'module';
import * as service from 'module';
// Modules（模块）
var feature_10 = function () {
    // in es5
    var test_1 = function () {
        // 在ES5中,module.js有port变量和getAccounts
        module.exports = {
            port: 3000,
            getAccounts: function() {

            }
        };
        // main.js需要依赖require('module') 导入module.js
        var service = require('module.js');
        console.log(service.port); // 3000
    };
    // in es6
    var test_2 = function () {
        // 'import' and 'export' may only appear at the top level
        // import {port, getAccounts} from 'module';
        console.log(port); // 3000
        getAccounts(); // 3000
        // import * as service from 'module';
        console.log(service.port); // 3000
    };
    console.info('test in es5:');
    test_1();
    console.info('test in es6:');
    test_2();
};
//execute
var execute = function () {
    for (var i = 1; i <= 10; i++) {
        var fun = eval('feature_' + i);
        fun = fun.before(function () {
            console.info('feature_' + i + ' function before.');
        }).after(function () {
            console.info('feature_' + i + ' function after.');
        });
        fun();
    }
};
execute();


