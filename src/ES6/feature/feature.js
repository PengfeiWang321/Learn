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
var hrefList = [
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=AQj0uBLA7YFMDOBWAUASAG4EMBOwAui-A-gIzAC8wAZgK7QDG-kA9rABQAWckA5p_gA0wBiwA2LHMNo4xASmABvFCFWrsebnwGVgW_vmAAfI8CQAGANwq163CPGTdoiXhPAA5DjgATD9ds7PBkxXRDjUw8BfAAHAC5wLAAvLHwAOlF_G0CJXnYPUWhCIo9BKJ4DOI9gAGo9CoE5AMDgXPzC4vxSgsccKtqHVybs2zaeorgSspD-upDhtQBfZrAIGHgEADYRjQIiYgAmXTpGZjZgLgbDKgthFycqL19S4HDH6PiAHVBv5NSMlgeBSKcCAWDlABSugFnlQA5poADc0AWPIAIywiLgYkAaP6ARej4YBSo0AmKkjNRjDqTLplfQCWb1bT4BYtYlsTrde59ap1Fl0nIsPLjJnTWRU-YrYDLIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=AQ4ejYEsDtgUwM4FYBQpgDcCGAnYALkgQPoCMwAvMAGYCuMAxgVAPZwAUAFvFAOZcCAGmCNWAG1a4RdXOICUwAN7oMoHPh79BVYFoEFgAHyPBkABgDcqtVjyiJU3WMn4TwAOS54AEw_XbEA1gWXFdUONTD0ECAAcALghsAC9sAgA6MX8bNUk-Dg8xGCJijxFo3gN4j2AAaj1KwXkAwLyCopKCMs8XKWq6h1dmnIw2wvZO7o9Q_vrQ4YwAXxaQCGg4JAA2HOCiRFIAJl16JhZ2YG5Gw2oLEV78ai9fbojHmISAHTAvlLTM1g8iiUEEAsHKACldALPKgBzTQAG5oAseQARtgEfBxIA0f0Ai9FwwClRoBMVJGoDGHXgpXK-kEswa2gIC1arHy42KJK65XulPutNsRImzKmMxqczknOAyyAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=AQ4ejYEsDtgUwM4FYBQpgDcCGAnYALkgQPoCMwAvMAGYCuMAxgVAPZwAUAlMAN7oZQOfLlbYAJgAVW8ALZVgAcgAqAC3hwCrVgGtC64KwLrcAGmDZEwAFZ1EBC1ZrYoZmAUUDBggNRKAgjDiwKrYmLAA5sAADvC4odFWxvDAAEbwBET4jAA2LrLunt7efooAQvCM2HYpUA4A7pbAEbiWiACeFkHAje7wwfXweKaFXsUgpWqsdBGqjrSs-MbYDskxbZH6cRoeY-OlABISPYua6vK4Qzk5ndip06sGiNiy8CMeANx7QngLdLj-FrwOQ7KzURQATWmITCKTWuCgs1WrDSKXa0wAdDAiuNQKUoXRgFU4OwbqjgOjCfV1HBKcBxCjKfh0vYMYovuMcqwIhxFIx2ERCqZFKIJNI5AAuRTAPyiqQyWRcDnFLk8vkCnaKYU0aYAoEg9yIKUyv56y4GgiIJVjAC-ypAEGgcCQADYxsJCMQSAAmBT0JgsdjAbh8b4gD1y8XyagAAzUGkI2j0ayMJnMTVs9nmzlcpjDGECwVC4RgUVi8WwiS2qMycSJeSgsnzoAqVRq0AaTRabVu3V6RAGQzMzZAUxmcyaOqWoUeKWiG1LW0uI-ARwGpy2FyuZLuD2rz1ephj9sEHp1_0B5tehoUMYJMMwcIMCKRifJlIxK_vxMMMDJ6QpaFqQTOkGUA_5UVZY981VXl-T6IURTEeVJWlWVkKja1OW5OCNUQ88zWBa9LWNPwCMvIjQSw0A7SAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=PTAEEsDtQUwZwKwChStANwIYCdQBd48B9ARlAF5QAzAV0gGM9wB7aACgEpQBvFNfrLgAmmPJgo8AFsxpwYALlAByabJhKANKAC2MuYqW61SgL4aQAEjZKARsyEBPJRwB0IsZz79voVXInumC5-MBpePmhG_pSBLlEwANzh_AA2zADm1vSsBJB4mip6CkqgANS-RRxJEaBpmUrZeTB5BfHyJeXxVeEm1WggENDwAGzhgviERABMErQMTKygnDzJaOOBEtwhBiGaOkUG8aYJltZ2js5uopieNeNbRVrxJgHXfT51WTnN-RqFau0yhU1N0ap8Gt8Wn82h19iCkqtUOMANrZFIkLRoqYAXQkyIhKRo2kgpD2BKJJKmSmxJ2AViULjRFOciIwOFAcDw2Cg6RS4E5EiUnOwpAAxMLpuKuUQAMxSkUAFnlRAQSne3hRfMgMAxtSgMCmWi1MBlWiN-oQuMowp5fM5LjgAAc-XhrKLnOrUhkvk0oQSSIDymiSKCIuDGrlfgSpoHQFjQx9vRDfVHjQHYWmE95w5DU_qYxn81mvfUIz8CsaZbHK8W0DmUxWLdWLVnekA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=AQ4ejYEsDtgUwM4FYBQpgDcCGAnYALkgQPoCMwAvMAGYCuMAxgVAPZwAUAlMAN7oZQOfIni5MURvABC2UVT4AHVrgIAuYAGYADLoA0wOrgA2GgOTYAXtgIA6RqzMBfPQMGCA5vAIBBRg4YCRAV6JhZ2YG4-N3dY3G8jOABtMgMAJgNNAF0Y2OAnAG5coTxgbH9WQIBlMQkpAFEq5AV-PIxlVQ1RcUkZOXhbDoJXNtAjU2Buur7RW3GR0eAvXwrAxA1lvwCYIIXRglYqglxYDw1Q5jZOHlbFjHiCROAAKSqAeQA5W0Rj06gaACeHAIAAsoIhbDhjHR4G8aNwuEU7i5iu5lgBVEznBiXCJRW53EAPJ4AIhBBAIijUEBJwAA1IQwRDxvTgGY1GZWaDwYMVARUYIUXcoTC4eQSGkSJoNt4tpUdohuALCqgBcIyqsdjUeg0mm8AEYAK3gzAAwvEbPAFAbjcx7BaiBwpr1ZKJEQKIBrtgRtdNGsgbSaCOb4JaWh7IBhNpqgjKVt7EHtBJ6MAcjicYGdaDjwtdonkU3EErg4K9Pt9fpn_kDuRCRbD4Vx3QXI6AhbFCyAMVjs2ErpEbhG2sSS8AyRSqTSuUy5iZWezOQza7zVEOMO33J2sNhoQ3xZLpUtZTHFVwhyqBcZWB4OGYHDt4DszHoLDHfb1_Rzm7Erze7-wiCfPRym9d9dWQb93F_W970Aghn1fUDag_PUjSDENLS_JEf2vGCAMfeDgLfZDwMDM0HXgSD8mwkBPVgBBEAANhidUiB-CUQhzft8TVUpnSkV0rWoXghg0HR9EMHsLGsOwHGcJM8mjBNOL7PFB0JUAR2SVJgAyLQcmRGjBHVED5R9EihPzRYSBIRRcFYA4bK6CzBIU2IlLMxMBVTQ5KxvdSNOALSXneL4fgzDxqw4J06EUMRIR3UVGybIy8g3Npu2MHjAqC4s4HHSlqTAWklxnFkGQXaceSGby2zc9wkjZesxUXI94087hbENVhYFvEgzB4LI4zlNYlTS1LQGg_8HyAsx-JmeAsMvXDprg595sEqiMCm2CCIQ0zqgspa8h2_CgIOrULKowogA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=PTAEEsDtQUwZwKwChStANwIYCdQBd48B9ARlAF5QAzAV0gGM9wB7aACgEpQBvFNfrLiJ4AFuDgV8YuAG4-_VABI2AcgB0AIzyQVHNfQA24egGs2tBk1ZsY6GJDwdeCl6GHS1cewBMAIpjxMTjlXUABfDnlwkLQQCGh4ADYowXxCIgAmSQtGFnYuZ1dldS0dPUNjMxs7By5yAD5C0NRRcU8ff0DgqP4IqLCY1DioWEQUnDS4YgBmbLpc1lBOHh60VINmAHMAVQAHXZhsAGFMLznLPOWm5tT3cUlW2VWXR888bChNh48pj8hNtR4Zh7A7HU4wbrNNDYGB4GjYaA5Kz5FZQlwwuEI0AbTaqeisAgOFQAGjucDef02HEGzTCz2i9JxIMOJy8-kwBgMbG4oF-nwAXKAVABRADKiVA2GYpjgKnCHEhaAGUWGCTgyQEEwIUyIABZzgsUddNbgmfsWeCDcirvT-K8-f9vm0HQCgcywV5FVCMfCUQ1sVs8QT7HgSfb3p9qfTlaEzaDWTB2ZzubyI_9BSLxZLpSZZfKvQz-KrRsgTZNiAgrXklgV6alwN4JJQANoqBCJaYZACcCGm9F1MGmuoQMBIw6o3ioGUnAA4SW2O92ELrEgOhyOxwgJ1PJ12VABdGllgC28DgmE28FIkgb5OPmF25nmyKWWAMNBgtbRkthvtAACIAElfAgCR_1AABqDAOQ_GRQDiGAAA9diMehwDwH9MUgaMo1CVJTzgc9LzgTIb0bNR70fJFqzYN8P2JeJvCQhijCmL80R9LEVGA0BmCoIVIMYpDBLlGADBgU8HFAgSoLomARKFOCEOQ1D0Mw30cKPNAcSDBwQxJAiiKvEhcNcHSVHxPSiWJQyLyvDJTNQGNYjAEYknGXBtWICVKGoxYbTwiZb0kVt207Hs-zXYdR3HSdpyoOdiQXcLl1XQdos3bd4r3Q86wmWziOvShbwoh9aJg-T_QAAx4-5FG4OSwiqxyFBAQBP7UAOLlAFVlQAqOUAIeVAAdTQAYf8AG6NAHflThAHozQB75UASATABC3IbADF5QBlfUAA3lAFDYwBx-MAADl-oG-bADfTQBMBTWwBGHUAAHTAEDIwA1uUAG7lACAGPLcAK-yyLvMryvfGAGKgJjEJY8RHAoepQBqkC-NAeq_qQsJYHEySMLqhqKrh5qlNc48UOMNTOOw2NAws4NrNekiTK01BzMswlQxss87JIhyaQGIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=PTAEEsDtQUwZwKwChStANwIYCdQBd48B9ARlAF5QAzAV0gGM9wB7aACgEpQBvFNfuDDwAVcAFsYzGnja0GTVp178VaADbMA5mwDk9VgUh4dAGh0BNTAE8AhDo4BuPqoFDREqTLmMWkJc5dVDW09AxgjUx0AdQALGBgreLtHAMCAXxNQEgAGXI5UtAys3OyU_jSnfhAIaHgANgCsXAI4YgAmCmo6H1ZQTh4C1CbQAHdMcDwc3M6-jnIAPlBIGBHQAAVsZjFwQTY2bHhmNXQYTIOAKxhGOcXuQRFxSWl9w-PT4ry0spcxiansziDFQAOjwcT83gUfi4ykCLmCun0RnCxjMlls9iBgQOeBo2Ggv0mJUBcMK-VJqFB4Nk3Sh_VhFPUWkRYQiZli8USMGSWLJlUKDiAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=PTAEEsDtQUwZwKwChStANwIYCdQBd48B9ARlAF5QAzAV0gGM9wB7aACgEpQBvFNf2gyat8hAGLNsnHn35yMOUDlyUA2gF0A3LPlosuKABMYADwqgADNt1z9oAFbmrOm1Umg2d8E80RQAHlASKwgAalCuXhtXd09FR0oQx0Dg33twyJdo-XAqDwTySgRM7NK0I1Nze2sy3QBfLOyGsubS5QA6AAcaOAALNgqTDhrsju6-tnthxrlsGDwabGhlEblW-UFGFmh6TAAbeho9zAIAFWY8fYBBAFtmOjxPcE6S0rtMO4efGf5cj3Rnq9agpcB97pA8OYSKsbOtolFgSClJ8IVCLM5ETJMfx3ijIZRguiYaU4bCfmg5gslsjwXhiagGjM9swAOZsADk9FYBAh7IANKI4HgJFIONMbMy2ZzuTBeQLdgcjicYOdLntbrS2HhsDQYGLVnVViAINB4AA2HR2AhCogAJnMm2E7CBckd21ACsOxzOF2ueKeLyxpT28xpX0S9LkfwDLrKIchYPDQUj_FJugRwPjYdRBKJ5PkGexWcTOaC6IxiLT8irs3mi2WeMjjIlrI5XIhsrw_I9-y9ytVfs12t1-p0hp0xqgsDgFpximtxAAzA66FsRNJCwJV06e4rvSrfer_QDA5vdO2hdn8ZYU-U8jGg8CLwm8VDbwz84_as-r2iK8CzyfVhLxLa9CX_Woa1TT9KXrK8myQJlW2lDs5V3PsfTVDUHi1HU9XFNBDSAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=',
    'https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=AQehwSwO2BTBnAbAKGG4A3AhgJ2AFwXwH0AmYAXmADMBXKAY3wgHsYAKASmAG9V0BDADZZ48YACNRsALIsAJrCG9-AtcAZt4-HLSYsc7FgAdmWgDTB5WfFm48wGkWI1ade_AcAw_1AWwAdABW4gCs_oiAQWaAb6aAsHKA9KaAgMYmZlDiVDwAvpbWtpTAANoAuoCb8YDsFoAE8oBDyqrqtfgAFhDw_lBYALaweQDkAELSXQDcNbVqDU3-tDjKVF31-PjGAFxgWABeNv6aIFjGEIPDI-hjzTlYeadDh3WNzcmsqXl3WpdXwBkH6gDmsPgAcu2wLi8UDgYSicQdBoKD6HIQsT7sLqaKCEFFdcwAAwAws5xK0OotgAASHjHFoAjIYzgvK7vEZ02pglwAQQYmno-DkimUsAAHqj5OIpPBZH5lHxXq5Uu59IYnqlsjY7CpJQJ4LRjLBDDxjDgINhCIT3LAsgUugBmUgARit5qtpDtDvRwC6IVIABZre7EABOK1dQrUmEjMn4zozVnslHALlKfaqo43CZTYAAahm2zZLA58BA8deGRph2--GAWCzOYAIkqgRKE8AcD9JjAyRdg-gGep3jChD8yxWUWlgFBYAB3YCR7Mo2NCdghIMjctR_DNEv_DpcIsCOEIpFsVH4dFdau5JrARZdBe1HeI5EH9FLqcr_yPqtKq9oQtAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins='
];
let html = '';
var log = function (type, message, index) {
    if (type === 'before-example') {
        html += `<div class="example"><h4>${message}<a href="${hrefList[index - 1]}" target="_blank"> #code</a></h4>`;
    } else if (type === 'after-example') {
        html += `<h4>${message}</h4></div>`;
    } else if (type === 'title') {
        html += `<b>${message}</b><br>`;
    } else if (type === 'content') {
        html += `${message}<br>`;
    }
    console.log('content', message);
};
//Default Parameters（默认参数）
var feature_1 = function () {
    // in es5
    var test_1 = function (height, color, url) {
        var height = height || 50;
        var color = color || 'red';
        var url = url || 'http://azat.co';
        log('content', 'height:' + height);
        log('content', 'color:' + color);
        log('content', 'url:' + url);
    };
    // in es6
    var test_2 = function (height = 50, color = 'red', url = 'http:\/\/azat.co') {//不用反斜杠会babel编译会报错
        log('content', 'height:' + height);
        log('content', 'color:' + color);
        log('content', 'url:' + url);
    };
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
    test_2();
};
//Template Literals （模板文本）
var feature_2 = function () {
    // in es5
    var test_1 = function (first = 'wang', last = 'pengfei', id = 1) {
        var name = 'Your name is ' + first + ' ' + last + '.';
        var url = 'http://localhost:3000/api/messages/' + id;
        log('content', 'name:' + name);
        log('content', 'url:' + url);
    };
    // in es6 编译后会用concat做连接
    var test_2 = function (first = 'wang', last = 'pengfei', id = 1) {
        var name = `Your name is ${first} ${last}. `;
        var url = `http://localhost:3000/api/messages/${id}`;
        log('content', 'name:' + name);
        log('content', 'url:' + url);
    };
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
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
        log('content', 'roadPoem:' + roadPoem);
        log('content', 'fourAgreements:' + fourAgreements);
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
        log('content', 'roadPoem:' + roadPoem);
        log('content', 'fourAgreements:' + fourAgreements);
    };
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
    test_2();
};
//Destructuring Assignment （解构赋值）
var feature_4 = function () {
    // in es5
    var test_1 = function () {
        var data = {house: 'house', mouse: 'mouse'},//$('body').data()
            house = data.house,
            mouse = data.mouse;
        log('content', 'house:' + house);
        log('content', 'mouse:' + mouse);
    };
    // in es6
    var test_2 = function () {
        var data = {house: 'house', mouse: 'mouse'};//$('body').data()
        var {house, mouse} = data;
        log('content', 'house:' + house);
        log('content', 'mouse:' + mouse);

        var [col1, col2] = ['column_1', 'column_2'];//$('.column')
        var stringlist = 'str_1#str_2#str_3#str_4#str_5';
        var [line1, line2, line3, , line5] = stringlist.split('#');
        log('content', 'col1:' + col1);
        log('content', 'col2:' + col2);
        log('content', 'line1:' + line1);
        log('content', 'line2:' + line2);
        log('content', 'line3:' + line3);
        log('content', 'line5:' + line5);
    };
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
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

        log('content', 'accountServiceES5:');
        log('content', accountServiceES5);
        log('content', 'accountServiceES5ObjectCreate:');
        log('content', accountServiceES5ObjectCreate);
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
            ['valueOf_' + getAccounts().join('_')]: getAccounts()
        };
        log('content', 'serviceBase:');
        log('content', serviceBase);
        log('content', 'accountService:');
        log('content', accountService);
    };
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
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
        var logUpperCase = function () {
            var _this = this;
            this.string = this.string.toUpperCase();
            return function () {
                return log('content', _this.string);
            }
        };
        logUpperCase.call({string: 'ES6 rocks'})();
    };
    // in es6
    var test_4 = function () {
        var logUpperCase = function () {
            this.string = this.string.toUpperCase();
            return () => log('content', this.string);
        };
        logUpperCase.call({string: 'ES6 rocks'})();
    };
    // in es5
    var test_5 = function () {
        var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9'];
        var messages_1 = ids.map(function (value) {
            return "ID is " + value; // explicit return
        });
        var messages_2 = ids.map(function (value, index, list) {
            return 'ID of ' + index + ' element is ' + value + ' '; // explicit return
        });
        log('content', messages_1);
        log('content', messages_2);
    };
    // in es6
    var test_6 = function () {
        var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9'];
        var messages_1 = ids.map(value => `ID is ${value}`);
        //对于单个参数，括号()是可选的，但当你超过一个参数的时候你就需要他们。
        var messages_2 = ids.map((value, index, list) => `ID of ${index} element is ${value} `); // implicit return
        log('content', messages_1);
        log('content', messages_2);
    };
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
    test_2();
    log('title', 'test in es5:');
    test_3();
    log('title', 'test in es6:');
    test_4();
    log('title', 'test in es5:');
    test_5();
    log('title', 'test in es6:');
    test_6();
};
//Promises
var feature_7 = function () {
    // in es5
    var test_1 = function () {
        setTimeout(function () {
            log('content', 'Yay!');
            setTimeout(function () {
                log('content', 'Wheeyee!');
            }, 1000)
        }, 1000);
    };
    // in es6
    var test_2 = function () {
        var wait1000 = () => new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
        });
        wait1000()
            .then(function () {
                log('content', 'Yay!')
                return wait1000()
            })
            .then(function () {
                log('content', 'Wheeyee!')
            });
    };
    // 延时执行会打乱顺序的
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
    test_2();
};
//Block-Scoped Constructs Let and Const（块作用域构造Let and Const）
var feature_8 = function () {
    // in es5
    var test_1 = function () {
        function testFor() {
            var arr = [];
            var index = 0;
            var j = 0;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (j === 5) {
                        index = j;
                    }
                }
            }
            arr.push(index);
            arr.push(j);
            return arr;
        }
        function calculateTotalAmount(vip) {
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

        log('content', testFor());
        log('content', calculateTotalAmount(true));
    };
    // in es6
    var test_2 = function () {
        function calculateTotalAmount(vip) {
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

        log('content', calculateTotalAmount(true));
    };
    // in es6
    var test_3 = function () {
        function calculateTotalAmount(vip) {
            const amount = 0;
            if (vip) {
                const amount = 1;
            }
            {
                const amount = 100;
                {
                    const amount = 1000;
                }
            }
            return amount;
        }

        log('content', calculateTotalAmount(true));
    };
    log('title', 'test in es5:');
    test_1();
    log('title', 'test in es6:');
    test_2();
    log('title', 'test in es6:');
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
                log('content', `Class name: ${this.name}`);
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
        log('content', 'Data is :');
        log('content', accounts.accountsData);
    };
    log('title', 'test in es6:');
    test_2();
};
//execute
var execute = function () {
    for (var i = 1; i <= 9; i++) {
        var fun = eval('feature_' + i);
        fun = fun.before(function () {
            log('before-example', 'feature_' + i + ' function before.', i);
        }).after(function () {
            log('after-example', 'feature_' + i + ' function after.');
        });
        fun();
    }
    document.getElementById('execute').innerHTML = html;
};
execute();


