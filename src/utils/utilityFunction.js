/** 
 * @description 生成唯一标识符方法函数
 * @param {Number} len  长度
 * @param {Number} radix  基数
 * @return {String} 唯一标识符字符串
*/

function onlyKey(len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [], i;
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('');
}



/** 
 * @description 数组对象方法去重函数
 * @param {Array} arr  原数组
 * @param {String} key  需要去重的对象 key
 * @return {Array} 去重后的数组
*/

function arrayDuplicateRemoval(arr, key) {
	let map = new Map();
	for (let item of arr) {
		if (!map.has(item[key])) {
			map.set(item[key], item);
		}
	}
	return [...map.values()];
}




/** 
   @description 金额小数点格式处理函数
 * @param {String | Number} money  原金额
 * @param {Number} moneyNum 需要设置小数位数
 * @return {String}  处理后的金额
*/

function formatMoney(money, moneyNum) {
	if (/[^0-9\.]/.test(money)) return "0";
	if (money == null || money == "") return "0";
	money = money.toString().replace(/^(\d*)$/, "$1.");
	money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	money = money.replace(".", ",");
	var re = /(\d)(\d{4},)/;
	while (re.test(money)) money = money.replace(re, "$1,$2");
	money = money.replace(/,(\d\d)$/, ".$1");
	if (moneyNum == 0) {
		// 不带小数位(默认是有小数位)
		var a = money.split(".");
		if (a[1] == "00") {
			money = a[0];
		}
	}
	return money;
}



/** 
   @description 毫秒转时分秒 函数
 * @param {Number} millisecond  毫秒时间戳
 * @return {String}  处理后的时间格式
*/

function formatDuringTime(millisecond) {
	let time = millisecond / 1000;
	let day = Math.floor(time / 60 / 60 / 24);
	let hour = Math.floor(time / 60 / 60) % 24;
	let minute = Math.floor(time / 60) % 60;
	let second = Math.floor(time) % 60;

	return (
		(day == 0 ? "" : day + "天") +
		(hour == 0 ? "" : day + "时") +
		(minute == 0 ? "" : minute + "分") +
		(second + "秒")
	);
}


/** 
   @description 获取url地址栏?后面的参数函数
 * @param {String} url  url地址
 * @return {Array | Object}  获取到的参数 按key和value对象的格式返回
*/

function getLocationParams(url) {
	const paramsUrl = url.split('?')[1]
	const params = new URLSearchParams(paramsUrl);
	const entries = params.entries();
	const obj = Object.fromEntries(entries);
	return obj
}


/** 
   @description 对象数组深拷贝方法 函数
  * @param {Array | Object} source  需要拷贝的数据源
  * @return {Array | Object}  拷贝后的新值
*/

function deepCopy(source) {
	if (typeof source !== 'object' || source == null) {
		return source;
	}
	const target = Array.isArray(source) ? [] : {};
	for (const key in source) {
		// 检查属性是否存在对象中
		if (Object.hasOwn(source, key)) {
			if (typeof source[key] === 'object' && source[key] !== null) {
				target[key] = deepCopy(source[key]);
			} else {
				target[key] = source[key];
			}
		}
	}
	return target;
}



/** 
   @description 获取本地 assets>image下图片方法
  * @param {String} imageName  图片名称 ！带格式
  * @return {String} url 
*/

function getAssetsImage(imageName) {
	const fromat = ['gif', 'jpeg', 'png','jpg']
	let regxName = imageName.substring(imageName.lastIndexOf('.')+1)
	if (fromat.includes(regxName)) {
		return require(`@/assets/image/${imageName}`)
	} else {
		throw '图片传入格式不正确请检测'
	}

}


export {
	onlyKey,
	arrayDuplicateRemoval,
	formatMoney,
	formatDuringTime,
	getLocationParams,
	deepCopy,
	getAssetsImage,
}