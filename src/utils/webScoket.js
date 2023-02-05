/** 
 * scoket 连接方法
 * @param {String} scoketUrl scoket连接url
 * @type {}
 * @return {} 
*/

let scoket = null
const scoketUrl = process.env.VUE_APP_WEBSCOKET_URL
//scoket 初始化连接
const webScoketInit = () => {
	return new Promise((reslove, reject) => {
	      try{
			scoket = new WebSocket(scoketUrl)
			if (typeof WebSocket == undefined) {
				alert('您的浏览器不支持socket！使用谷歌浏览器！')
			} else {
				//监听socket连接
				scoket.onopen = () => {
					console.log('客户端scoket连接成功')
					reslove()
				}
				//关闭scoket 连接
				scoket.onclose = onClose
			}
		  }catch{
			  throw('scoket连接错误')
		  }
	})
}



//发送消息
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

//接收服务端消息
function messageReceived(callback) {
	scoket.onmessage = (msg) => {
		const data = msg.data
		callback(data)
	}
}

//监听socket错误信息
function onError(callback) {
	scoket.onerror = (err) => {
		callback(err)
	}
}


//监听socket关闭
function onClose(err) {
	scoket.close()
}


export {
	webScoketInit,
	messageSend,
	messageReceived,
	onError,
	onClose,
	scoket
}
