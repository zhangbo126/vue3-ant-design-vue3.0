/** 
 * scoket 连接方法
 * @param {String} scoketUrl scoket连接url
 * @param {Boolean} isConcent scoket 连接状态
 * @param {Function} globalCallback   scoket 回调函数 
 * @type {}
 * @return {} 
*/

let scoket = null
let isConcent = false //连接状态
let globalCallback = (e) => { e }
const scoketUrl = process.env.VUE_APP_WEBSCOKET_URL
//scoket 初始化连接
const webScoketInit = () => {
	return new Promise((reslove, reject) => {
		try {
			scoket = new WebSocket(scoketUrl)
			if (typeof WebSocket == undefined) {
				alert('您的浏览器不支持socket！使用谷歌浏览器！')
			} else {
				//监听socket连接
				scoket.onopen = () => {
					console.log('客户端scoket连接成功')
					isConcent = true
					//开始心跳检测
					heartCheck.start()
					reslove()
				}
				scoket.onmessage = onMessage
				//监听socket错误信息
				scoket.onerror = onError
				//关闭scoket 连接
				scoket.onclose = onClose
			}
		} catch {
			throw ('scoket连接错误')
		}
	})
}






//scoket 消息监听
function onMessage(msg) {
	//收到服务端心跳检测返回消息 重置心跳
	if (msg.data == 'HeartBeat') {
		console.log('收到服务端心跳检测')
		heartCheck.reset()
	} else {
		//如果不是心跳检测回应则触发消息回调
		globalCallback(msg.data)
	}
}

//监听socket错误信息
function onError(err) {
	isConcent = false
	console.log('err', err)
}


//监听socket关闭
function onClose(err) {
	isConcent = false
	//关闭scoket
	scoket.close()
	console.log('执行重连')
	//重新连接
	webScoketInit()
}




/** 
 * 消息监听方法
 * @param {Function} callback  回调函数
 * @return {} 
*/

function messageListener(callback) {
	if (typeof callback == 'function') {
		globalCallback = callback
	}
}



/** 
 *  向服务端发送消息的方法
 * @param {String} message 发送的内容（必须是字符串）
 * @return {} 
*/
function messageSend(message) {
	const { readyState, OPEN, CLOSED, CLOSING, CONNECTING } = scoket
	switch (readyState) {
		// CONNECTING：值为0，表示正在连接。
		case CONNECTING:
			break;
		// OPEN：值为1，表示连接成功，可以通信了。
		case OPEN:
			scoket.send(message)
			break;
		// CLOSING：值为2，表示连接正在关闭。
		case CLOSING:
			break;
		// CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
		case CLOSED:
			break;
		default:
			break;
	}
}





/*
  scoket 心跳检测机制方法
  每间隔 30s 向服务端发起一个询问 HeartBeat 如果服务端返回消息表示连接正常则重置心跳
  如果scoket 抛错则需要进行scoket重连
*/
let heartCheck = {
	timeout: 30000,// 每隔30s 进行一次检测 
	timeoutObj: null, // 延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）
	reset: function () {
		clearTimeout(this.timeoutObj);
		this.start();
	},
	start: function () {
		this.timeoutObj = setTimeout(function () {
			console.log('发送心跳检测')
			//如果连接开启则发送心跳
			if (isConcent) {
				scoket.send("HeartBeat");
			} else {
				//否则清除心跳检测对象
				clearTimeout(this.timeoutObj);
			}
		}, this.timeout)
	}
}


export {
	webScoketInit,
	messageSend,
	messageListener,
}
