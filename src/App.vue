<script>
	var api = require('./config/api.js')
	import wx from 'weixin-js-sdk'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var that=this;
			//#ifdef H5
			            const url = encodeURIComponent(window.location.href.split('#')[0]);
						uni.request({
							url:api.getShareSign,
							method:"GET",
							header:{
							    'content-type':'application/x-www-form-urlencoded',
							},
						    success: (res) => {
								console.log(res)
								var data=res.data;
								alert(data["appid"])
						// console.log( res["appid"])
			            // that.$Request.get("/tao/wx/js/sign?url=" + url).then(res => {
			                    wx.config({
			                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			                        appId: data["appid"], // 必填，公众号的唯一标识
			                        timestamp: data["timestamp"], // 必填，生成签名的时间戳
			                        nonceStr: data["noncestr"], // 必填，生成签名的随机串
			                        signature: data["signature"],// 必填，签名
			                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
			                    });
			                    wx.ready(function () {
			                        //分享到朋友
			                        wx.onMenuShareAppMessage({
			                            title: "快戳我啊！让您享受白菜价网购的快感", // 分享标题
			                            desc: "先领优惠券再下单享受折上折,各种大额优惠券让你领到手软呦！快戳我！快戳我！", // 分享描述
			                            link: window.location.href, // 分享链接
			                            imgUrl: "https://www.gomyorder.cn/logo.png", // 分享图标
			                            type: 'link', // 分享类型,music、video或link，不填默认为link
			                            success: function () {
			                                alert("分享成功");
			                            },
			                            cancel: function () {
			                                alert("未分享!");
			                            }
			                        });
			                        wx.onMenuShareTimeline({
			                            title: "快戳我！让您享受白菜价网购的快感", // 分享标题
			                            link: url, // 分享链接
			                            imgUrl: "https://www.gomyorder.cn/logo.png", // 分享图标
			                            trigger: function (res) {
			                            },
			                            success: function (res) {
			                            },
			                            cancel: function (res) {
			                            },
			                            fail: function (res) {
			                            }
			                        });
			                    });
						console.log(res)
								// _this.toUser(res.data.data);
							}
						});
			            // } )
			            //#endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed:{

		},
		methods: {

		}
	}
</script>

<style>
	uni-page-body,#app{
			height: 100%;
			} 
	.tac{
		text-align: center;
	}
	.clear {
		zoom: 1;
	}
	.ui-fl{
		float: left;
	}
	.ui-fr{
		float: right;
	}
	.clear:after {
		display: block;
		content: '';
		clear: both;
	}
	.f_flex {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	
	.z_flex {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}
	.userColorBlock {
	    height: 20rpx;
	    background: #F8F9FB;
	}
	/*每个页面公共css */
</style>
