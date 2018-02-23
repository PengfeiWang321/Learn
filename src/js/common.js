/**
 * @description 公共模块
 * @class common
 * @namespace common
 */
(function () {
    /**
     * @description 基础模块
     * @class common.base
     * @namespace common.base
     */
    function base() {
        /**
         * @description 检测两个对象是否属性相等
         * @class common#base.equal
         * @param {object} obj1 - 第一个对象
         * @param {object} obj2 - 第二个对象
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = equal(obj1,obj2);
         * </script>
         */
        function equal(obj1, obj2) {
            if (typeof arguments[0] !== typeof arguments[1]) {
                return false;
            }
            //数组
            if (arguments[0] instanceof Array) {
                if (arguments[0].length !== arguments[1].length) {
                    return false;
                }
                var allElementsEqual = true;
                for (var i = 0; i < arguments[0].length; ++i) {
                    if (typeof arguments[0][i] !== typeof arguments[1][i]) {
                        return false;
                    }
                    if (typeof arguments[0][i] === 'number'
                        && typeof arguments[0][i] === 'string') {
                        allElementsEqual = (arguments[0][i] === arguments[1][i]);
                    } else {
                        allElementsEqual = arguments.callee(arguments[0][i],
                            arguments[1][i]); //递归判断对象是否相等
                    }
                    if (!allElementsEqual) {
                        return false;
                    }
                }
                return allElementsEqual;
            }
            //对象
            if (arguments[0] instanceof Object && arguments[1] instanceof Object) {
                var result = true;
                var attributeLengthA = object().getLength(arguments[0]);
                var attributeLengthB = object().getLength(arguments[1]);
                //如果两个对象的属性数目不等，则两个对象也不等
                if (attributeLengthA !== attributeLengthB) {
                    result = false;
                } else {
                    for (var o in arguments[0]) {
                        //判断两个对象的同名属性是否相同（数字或字符串）
                        if (typeof arguments[0][o] === 'number'
                            || typeof arguments[0][o] === 'string') {
                            if (arguments[0][o] !== arguments[1][o]) {
                                result = false;
                                return result;
                            }

                        } else {
                            //如果对象的属性也是对象，则递归判断两个对象的同名属性
                            if (!arguments.callee(arguments[0][o], arguments[1][o])) {
                                result = false;
                                return result;
                            }
                        }
                    }
                }
                return result;
            }
            return arguments[0] === arguments[1];
        }

        /**
         * @description 克隆对象
         * @class common#base.clone
         * @param {object} obj - 被克隆的对象
         * @returns {object}
         * @example
         * <script>
         *      var copyObj = clone(obj);
         * </script>
         */
        function clone(obj) {
            var str, newobj = obj.constructor === Array ? [] : {};
            if (typeof obj !== 'object') {
                return;
            } else if (window.JSON) {
                str = JSON.stringify(obj), //系列化对象
                    newobj = JSON.parse(str); //还原
            } else {
                for (var i in obj) {
                    newobj[i] = typeof obj[i] === 'object' ?
                        clone(obj[i]) : obj[i];
                }
            }
            return newobj;
        }

        return {
            equal: equal,
            clone: clone
        };
    }

    /**
     * @description 对象
     * @class common.object
     * @namespace common.object
     */
    function object() {
        /**
         * @description 获取对象的属性长度
         * @class common.object.getLength
         * @param {Object} obj - 对象
         * @returns {Number}
         * @example
         * <script>
         *      var l = getLength(obj);
         * </script>
         */
        function getLength(obj) {
            var arr = Object.keys(obj);
            return arr.length;
        }

        /**
         * @description 判断是否为空
         * @class common.object.isEmpty
         * @param {Object} obj - 对象
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = isEmpty(obj);
         * </script>
         */
        function isEmpty(obj) {
            return obj === null || obj === undefined || getLength(obj) === 0;
        }

        /**
         * @description 检测两个对象是否属性相等
         * @class common.object.equal
         * @param {Object} obj1 - 第一个对象
         * @param {Object} obj2 - 第二个对象
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = equal(obj1,obj2);
         * </script>
         */
        var equal = base().equal;
        /**
         * @description 克隆对象
         * @class common.object.clone
         * @param {Object} obj - 被克隆的对象
         * @returns {Object}
         * @example
         * <script>
         *      var copyObj = clone(obj);
         * </script>
         */
        var clone = base().clone;
        return {
            getLength: getLength,
            isEmpty: isEmpty,
            equal: equal,
            clone: clone
        };
    }

    /**
     * @description 数组
     * @class common.array
     * @namespace common.array
     */
    function array() {
        /**
         * @description 判断是否为空
         * @class common.array.isEmpty
         * @namespace common.array.isEmpty
         * @param {Object} arr - 数组
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = isEmpty(arr);
         * </script>
         */
        function isEmpty(arr) {
            return arr === null || arr === undefined || arr.length === 0;
        }

        /**
         * @description 检测两个数组是否相等
         * @class common.array.equal
         * @namespace common.array.equal
         * @param {Array} arr1 - 第一个数组
         * @param {Array} arr2 - 第二个数组
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = equal(arr1,arr2);
         * </script>
         */
        var equal = base().equal;
        /**
         * @description 克隆数组
         * @class common.array.clone
         * @namespace common.array.clone
         * @param {Array} arr - 被克隆的数组
         * @returns {Array}
         * @example
         * <script>
         *      var copyArr = clone(arr);
         * </script>
         */
        var clone = base().clone;
        return {
            isEmpty: isEmpty,
            equal: equal,
            clone: clone
        };
    }

    /**
     * @description 计算
     * @class common.calculate
     * @namespace common.calculate
     */
    function calculate() {
        /**
         * @description 根据出生日期计算年龄
         * @class common.calculate.age
         * @namespace common.calculate.age
         * @param {string} birthday - 出生日期
         * @returns {Number}
         * @example
         * <script>
         *      var age = randomCode(4);
         * </script>
         */
        function age(date) {
            var nowDate = new Date();
            var birthDate = new Date(date);
            var age = nowDate.getFullYear() - birthDate.getFullYear();
            var monthRange = nowDate.getMonth() - birthDate.getMonth();
            if (monthRange > 0) {
                return age;
            } else if (monthRange < 0) {
                return age - 1;
            } else {
                var dayRange = nowDate.getDate() - birthDate.getDate();
                if (dayRange >= 0) {
                    return age;
                } else {
                    return age - 1;
                }
            }
        }

        /**
         * @description 随机生成4位CODE
         * @class common.calculate.randomCode
         * @namespace common.calculate.randomCode
         * @param {Number} [length=4] - code长度
         * @returns {string}
         * @example
         * <script>
         *      var code = randomCode(4);
         * </script>
         */
        function randomCode(len) {
            var code = '';
            var codeLength = len || 4;//验证码的长度
            var selectChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];//所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++) {
                var charIndex = Math.floor(Math.random() * 36);
                code += selectChar[charIndex];
            }
            return code;
        }

        return {
            age: age,
            randomCode: randomCode
        }
    }

    /**
     * @description 转换
     * @class common.transfer
     * @namespace common.transfer
     */
    function transfer() {
        /**
         * @description 根据source符合arr中的任意值转换成target
         * @class common.transfer.value2value
         * @namespace common.transfer.value2value
         * @param {Array} arr - 允许的值数组
         * @param {Any} source - 输入的值
         * @param {Any} target - 期望输出的值
         * @returns {Any}
         * @example
         * <script>
         *      var value = value2value([1,2,3],1,'num');
         * </script>
         */
        function value2value(arr, source, target) {
            for (var i in arr) {
                if (source === arr[i]) {
                    return target;
                }
            }
            return source;
        }

        /**
         * @description 字符串转换utf8编码
         * @class common.transfer.string2utf8
         * @namespace common.transfer.string2utf8
         * @param {string} str - 输入的字符串
         * @returns {string}
         * @example
         * <script>
         *      var utf8str = string2utf8(str);
         * </script>
         */
        function string2utf8(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        }

        /**
         * @description 字符串超出某个长度后被替换为前几个字符加上省略符号
         * @class common.transfer.strLimit
         * @namespace common.transfer.strLimit
         * @param {string} str - 输入的字符串
         * @param {number} index - 长度
         * @returns {string}
         * @example
         * <script>
         *      var newstr = strLimit(currentDeptName,7));
         * </script>
         */
        function strLimit(str, index) {
            return ((str.length > index) ? (str.substring(0, index) + "...") : str);
        }

        /**
         * @description 格式化日期
         * @class common.transfer.formatDate
         * @namespace common.transfer.formatDate
         * @param {string} timestr - 时间文本
         * @param {string} format - 格式化参数
         * @returns {string}
         * @example
         * <script>
         *      var formatTimestr = formatDate(timestr,'YYYY-MM-DD'));
         * </script>
         */
        function formatDate(timestr, format) {
            if (window.moment) {
                return window.moment(timestr).format(format);
            }
            var date = new Date(timestr);
            if (date === 'Invalid Date') {
                return '';
            }
            var o = {
                "M+": date.getMonth() + 1, // month
                "d+": date.getDate(), // day
                "h+": date.getHours(), // hour
                "m+": date.getMinutes(), // minute
                "s+": date.getSeconds(), // second
                "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
                "S": date.getMilliseconds()// millisecond
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "")
                    .substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }

        return {
            value2value: value2value,
            string2utf8: string2utf8,
            strLimit: strLimit,
            formatDate: formatDate
        }
    }

    /**
     * @description 搜索
     * @class common.search
     * @namespace common.search
     */
    function search() {
        /**
         * @description 字符串是否包含子串，数组是否包含元素
         * @class common.search.isContains
         * @namespace common.search.isContains
         * @param {String||Array} str||arr - 字符串||数组
         * @param {Any} substr||item - 子串||元素
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = isContains('123',1);
         *      var b = isContains([1,2,3],1);
         * </script>
         */
        function isContains(list, value) {
            return list.indexOf(value) >= 0;
        }

        /**
         * @description 查询list中是否包含某个字段为key属性为value的对象,返回index
         * @class common.search.searchIndex
         * @namespace common.search.searchIndex
         * @param {Array} list - 数组
         * @param {String} key - 键
         * @param {Any} value - 值
         * @returns {Number}
         * @example
         * <script>
         *      var index = searchIndex([{code:1},{code:2},{code:3}],'code',3);
         * </script>
         */
        function searchIndex(list, key, value) {
            var index = -1, l = list.length;
            for (var i = 0; i < l; i++) {
                if (list[i][key] === value) {
                    index = i;
                    return index;
                }
            }
            return index;
        }

        /**
         * @description 查询list中是否包含某个字段为key属性为value的对象,返回item
         * @class common.search.searchItem
         * @namespace common.search.searchItem
         * @param {Array} list - 数组
         * @param {String} key - 键
         * @param {Any} value - 值
         * @returns {Any}
         * @example
         * <script>
         *      var item = searchItem([{code:1},{code:2},{code:3}],'code',3);
         * </script>
         */
        function searchItem(list, key, value) {
            var l = list.length;
            for (var i = 0; i < l; i++) {
                if (list[i][key] === value) {
                    return list[i];
                }
            }
            return undefined;
        }

        return {
            isContains: isContains,
            searchIndex: searchIndex,
            searchItem: searchItem
        }
    }

    /**
     * @description 校验
     * @class common.valid
     * @namespace common.valid
     */
    function valid() {
        /**
         * @description 正则校验
         * @class common.valid.regCheck
         * @namespace common.valid.regCheck
         * @param {string} str - 时间文本
         * @param {string} type - 校验类型
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = formatDate(timestr,'YYYY-MM-DD'));
         * </script>
         */
        function regCheck(str, type) {
            var telePhone = /^((0\d{2,3})(-)?)?(\d{7,8})((-)?(\d{1,4}))?$/;
            var mobilePhone = /^1\d{10}$/;
            var list = {
                telePhone: telePhone,
                mobilePhone: mobilePhone

            };
            return list[type].test(str);
        }

        /**
         * @description
         * 根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
         * 地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
         * 出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
         * 顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
         * 校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。
         * 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
         * 公式(1)中：
         * i----表示号码字符从由至左包括校验码在内的位置序号；
         * ai----表示第i位置上的号码字符值；
         * Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
         * i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
         * Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
         * @class common.valid.identityCode
         * @namespace common.valid.identityCode
         * @param {string} code - 身份证文本
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = identityCode('320324199507050180');
         * </script>
         */
        function identityCode(code) {
            var city = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
            };
            var pass = true;
            if (!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(code) || !city[code.substr(0, 2)]) {
                pass = false;
            } else {
                //18位身份证需要验证最后一位校验位
                if (code.length === 18) {
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
                    //校验位
                    var parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++) {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if (last !== code[17].toUpperCase()) {
                        pass = false;
                    }
                }
            }
            return pass;
        }

        /**
         * @description 检查日期的开始结束时间
         * @class common.valid.checkDateRange
         * @namespace common.valid.checkDateRange
         * @param {string} startdate - 开始日期
         * @param {string} enddate - 结束日期
         * @returns {Boolean}
         * @example
         * <script>
         *      var b = checkDateRange(birthday,todayDate);
         * </script>
         */
        function checkDateRange(startdate, enddate) {
            if (startdate === '' || enddate === '') {
                return true;
            }
            if (startdate === undefined || enddate === undefined) {
                return true;
            }
            if (startdate === null || enddate === null) {
                return true;
            }
            if (startdate <= enddate) {
                return true;
            }
            return false;
        }

        return {
            regCheck: regCheck,
            identityCode: identityCode,
            checkDateRange: checkDateRange
        }
    }

    /**
     * @description 缓存
     * @class common.cache
     * @namespace common.cache
     */
    function cache() {
        /**
         * @description localStorage
         * @class common.cache.localStorage
         * @namespace common.cache.localStorage
         */
        function localStorage() {
            /**
             * @description 存值
             * @class common.cache.localStorage.set
             * @namespace common.cache.localStorage.set
             * @param {String} key - 键
             * @param {Any} value - 值
             * @returns {Boolean}
             * @example
             * <script>
             *      var b = set(key,data);
             * </script>
             */
            function set(key, data) {
                return window.localStorage.setItem(key, window.JSON.stringify(data));
            }

            /**
             * @description 取值
             * @class common.cache.localStorage.get
             * @namespace common.cache.localStorage.get
             * @param {String} key - 键
             * @returns {Any}
             * @example
             * <script>
             *      var data = get(key);
             * </script>
             */
            function get(key) {
                return window.JSON.parse(window.localStorage.getItem(key));
            }

            /**
             * @description 删除某键的值
             * @class common.cache.localStorage.remove
             * @namespace common.cache.localStorage.remove
             * @param {String} key - 键
             * @returns {Boolean}
             * @example
             * <script>
             *      var data = remove(key);
             * </script>
             */
            function remove(key) {
                return window.localStorage.removeItem(key);
            }

            /**
             * @description 删除所有的值
             * @class common.cache.localStorage.removeAll
             * @namespace common.cache.localStorage.removeAll
             * @returns {Boolean}
             * @example
             * <script>
             *      var data = removeAll();
             * </script>
             */
            function removeAll() {
                var b = true;
                for (var key in window.localStorage) {
                    if (!window.localStorage.removeItem(key)) {
                        return false;
                    }
                }
                return b;
            }

            return {
                set: set,
                get: get,
                remove: remove,
                removeAll: removeAll
            };
        }

        /**
         * @description sessionStorage
         * @class common.cache.sessionStorage
         * @namespace common.cache.sessionStorage
         */
        function sessionStorage() {
            /**
             * @description 存值
             * @class common.cache.sessionStorage.set
             * @namespace common.cache.sessionStorage.set
             * @param {String} key - 键
             * @param {Any} value - 值
             * @returns {Boolean}
             * @example
             * <script>
             *      var b = set(key,data);
             * </script>
             */
            function set(key, data) {
                return window.sessionStorage.setItem(key, window.JSON.stringify(data));
            }

            /**
             * @description 取值
             * @class common.cache.sessionStorage.get
             * @namespace common.cache.sessionStorage.get
             * @param {String} key - 键
             * @returns {Any}
             * @example
             * <script>
             *      var data = get(key);
             * </script>
             */
            function get(key) {
                return window.JSON.parse(window.sessionStorage.getItem(key));
            }

            /**
             * @description 删除某键的值
             * @class common.cache.sessionStorage.remove
             * @namespace common.cache.sessionStorage.remove
             * @param {String} key - 键
             * @returns {Boolean}
             * @example
             * <script>
             *      var data = remove(key);
             * </script>
             */
            function remove(key) {
                return window.sessionStorage.removeItem(key);
            }

            /**
             * @description 删除所有的值
             * @class common.cache.sessionStorage.removeAll
             * @namespace common.cache.sessionStorage.removeAll
             * @returns {Boolean}
             * @example
             * <script>
             *      var data = removeAll();
             * </script>
             */
            function removeAll() {
                var b = true;
                for (var key in window.sessionStorage) {
                    if (!window.sessionStorage.removeItem(key)) {
                        return false;
                    }
                }
                return b;
            }

            return {
                set: set,
                get: get,
                remove: remove,
                removeAll: removeAll
            };
        }

        return {
            localStorage: localStorage,
            sessionStorage: sessionStorage
        }
    }

    /**
     * @description html加载
     * @class common.loadHtml
     * @namespace common.loadHtml
     */
    function loadHtml() {
        //StringBuilder类
        function StringBuilder(value) {
            this.data = Array("");
            this.append(value);
        }

        StringBuilder.prototype.append = function (value) {
            if (value) {
                this.data.push(value);
            }
            return this;
        };
        StringBuilder.prototype.appendln = function (value) {
            if (value) {
                this.data.push(value + "\n");
            }
            return this;
        };
        StringBuilder.prototype.clear = function () {
            this.data.length = 1;
        };
        StringBuilder.prototype.toString = function () {
            return this.data.join("");
        };

        /**
         * @description 加载下拉列表
         * @class common.loadHtml.initSelectList
         * @namespace common.loadHtml.initSelectList
         * @param {Object} el - 节点
         * @param {Array} data - 数据
         * @param {string} val - 数据中val的字段名
         * @param {string} text - 数据中text的字段名
         * @param {string} customHtml - 自定选项的文本
         * @example
         * <script>
         *      initSelectList(el,data,val,text,customHtml);
         * </script>
         */
        function initSelectList(el, data, val, text, customHtml) {
            var innerHtml = '';
            innerHtml += (customHtml || '');
            for (var index = 0; index < data.length; index++) {
                innerHtml += '<option value="' + data[index][val || 'val'] + '">' + data[index][text || 'text'] + '</option>';
            }
            $(el).html(innerHtml);
        }

        /**
         * @description 加载列表
         * @class common.loadHtml.initTable
         * @namespace common.loadHtml.initTable
         * @param {Object} el - 节点
         * @param {Object} config - 数据
         * @example
         * <script>
         *      initTable(config);
         * </script>
         */
        function initTable(el, config) {
            var $el = $(el);
            var table_html = $el.html();
            if (table_html === ''
                || table_html === undefined
                || table_html === null) {
                $el.bootstrapTable(config);
            } else {
                $el.bootstrapTable('refreshOptions', config);
            }
            $(window).resize(function () {
                $el.bootstrapTable('resetView');
            });
        }

        return {
            StringBuilder: StringBuilder,
            initSelectList: initSelectList,
            initTable: initTable
        }
    }

    /**
     * @description 项目配置
     * @class common.config
     * @namespace common.config
     */
    function config() {
        /**
         * @description 获取网址，type默认为basePath
         * basePath: 获取basePath路径 如： http://localhost:8083/uimcardprj
         * curWwwPath: 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.html
         * curSrcPath: 获取当前网址目录，如： http://localhost:8083/uimcardprj/share/
         * pathName: 获取主机地址之后的目录，如： uimcardprj/share/meun.html
         * localhostPath: 获取主机地址，如： http://localhost:8083
         * projectName: 获取项目名，如：uimcardprj
         * @class common.config.getUrlPath
         * @namespace common.config.getUrlPath
         * @param {string} type - 网址类型
         * @example
         * <script>
         *      url : getUrlPath() + "/view/BasicInfo/diseaseDeptRel/getHospitalInfo"
         * </script>
         */
        function getUrlPath(type) {
            //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.html
            var curWwwPath = window.document.location.href;
            //获取当前网址目录，如： http://localhost:8083/uimcardprj/share/
            var curSrcPath = curWwwPath.substring(0, curWwwPath.lastIndexOf("/") + 1);
            //获取主机地址之后的目录，如： uimcardprj/share/meun.html
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            //获取主机地址，如： http://localhost:8083
            var localhostPath = curWwwPath.substring(0, pos);
            //获取项目名，如：uimcardprj
            var projectName = pathName.substring(1, pathName.substr(1).indexOf('/') + 1);
            //获取basepath路径 如： http://localhost:8083/uimcardprj
            var basePath = (localhostPath + '/' + projectName);
            var url = {
                curWwwPath: curWwwPath,
                curSrcPath: curSrcPath,
                pathName: pathName,
                localhostPath: localhostPath,
                projectName: projectName,
                basePath: basePath
            };
            return url[type || 'basePath'];
        }

        return {
            getUrlPath: getUrlPath
        }
    }

    window.common = {
        object: object(),
        array: array(),
        calculate: calculate(),
        transfer: transfer(),
        search: search(),
        valid: valid(),
        cache: cache(),
        loadHtml: loadHtml(),
        config: config()
    }
})();