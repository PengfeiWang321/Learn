/**
 *         公用函数的实现
 * @创建者 		wangpengfei
 * @创建时间		2015年7月9日, AM 10:35:55
 * @修改者		wangpengfei
 * @修改时间     	2015年7月9日, AM 10:35:58
 */


define(['jquery'],
	function($) {
		/**
		 * 			Table2Json转换
		 * @创建者 		wangpengfei
		 * @创建时间		2015年8月7日, PM 04:09:59
		 * @修改者		wangpengfei
		 * @修改时间     	2015年8月7日, PM 04:10:03
		 * @class
		 * @param {object} el - 表格
		 * @example
		 * <script>
		 * $(function(){
 * 		var datajson = JSON.parse(Table2Json($('#config_table')));
 * });
		 * </script>
		 */
		function Table2Json(el){
			function parseString(data){
				var content_data;
//		if(false/*defaults.htmlContent == 'true'*/){
//			content_data = data.html().trim();
//		}else{
				content_data = data.text().trim();
//		}
//		if(false/*defaults.escape == 'true'*/){
//			content_data = escape(content_data);
//		}
				return content_data;
			}

			var jsonHeaderArray = [];
			$(el).find('thead').find('tr').each(function() {
				var jsonArrayTd = [];

				$(this).filter(':visible').find('th').each(function() {
					if ($(this).css('display') !== 'none'){
//				if(true/*defaults.ignoreColumn.indexOf(index) == -1*/){
						jsonArrayTd.push($(this).attr('data-field'));
//				}
					}
				});
				jsonHeaderArray.push(jsonArrayTd);

			});
			var jsonArray = [];
			$(el).find('tbody').find('tr').each(function() {
				var jsonArrayTd = [];
				$(this).filter(':visible').find('td').each(function() {
					if ($(this).css('display') !== 'none'){
//				if(true/*defaults.ignoreColumn.indexOf(index) == -1*/){
						jsonArrayTd.push(parseString($(this)));
//				}
					}
				});
				jsonArray.push(jsonArrayTd);
			});
			var jsonExportArray =[];
			for(var i in jsonArray){
				var row ={};
				for(var j in jsonArray[i]){
					row[jsonHeaderArray[0][j]] = jsonArray[i][j];
				}
				jsonExportArray.push(row);
			}

			return JSON.stringify(jsonExportArray);
		}
		/**
		 *  随机生成4位CODE
		 * @创建者 wangpengfei
		 * @创建时间 2015年8月24日, PM 03:37:10
		 * @修改者 wangpengfei
		 * @修改时间 2015年8月24日, PM 03:37:10
		 * @class
		 * @param {Number} length - code长度
		 * @example
		 * <script>
		 * $(function(){
		 * 		var DIV_R = randomCode(4);
 		 * });
		 * </script>
		 */
		function randomCode (length){
			var code = "";
			var codeLength = length||4;//验证码的长度
			var selectChar = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];//所有候选组成验证码的字符，当然也可以用中文的
			for(var i=0;i<codeLength;i++){
				var charIndex = Math.floor(Math.random()*36);
				code +=selectChar[charIndex];
			}
			return code;
		}
		return  {
			randomCode:randomCode,
			Table2Json:Table2Json
		};
	}
);