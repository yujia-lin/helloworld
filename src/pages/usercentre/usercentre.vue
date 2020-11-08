<template>
	<view>
		<view class="userBox">
			<image class="userImg" :src="userInfo.avatar"></image>
			<view class="userText">
				<view class="userName">{{userInfo.nickname}}</view>
				<view class="userIdText">ID:{{userInfo.uid+10000}}</view>
				<view class="usertimeText">注册时间:{{userInfo.reg_time}}</view>
			</view>
		</view>
		<view class="userColorBlock"></view>
		<view class="userOrder">
				<view class="userOrderText">
					<text class="userOrderTitle">我的订单</text>
					<view  class="userOrderAll" @click="goOrder('all')">全部订单</view>
				</view>
					<view class="userOrderList f_flex">
						<view  class="userOrderItem z_flex" @click="goOrder('staypayment')">
							<view class="userOrderItemimg ">
								<image src="../../static/order_icon1.png" mode="heightFix"></image>
							</view>
							<view class="userOrderItemtext">待付款</view>
						</view>
						<view class="userOrderItem z_flex" @click="goOrder('staydeliver')">
							<view class="userOrderItemimg ">
								<image src="../../static/order_icon2.png" mode="heightFix"></image>
							</view>
							<view class="userOrderItemtext">待发货</view>
						</view>
						<view class="userOrderItem z_flex" @click="goOrder('staycollect')">
							<view class="userOrderItemimg ">
								<image src="../../static/order_icon3.png" mode="heightFix"></image>
							</view>
							<view class="userOrderItemtext">待收货</view>
						</view>
						<view class="userOrderItem z_flex" @click="goOrder('stayevaluate')">
							<view class="userOrderItemimg ">
								<image src="../../static/order_icon4.png" mode="heightFix"></image>
							</view>
							<view class="userOrderItemtext">待评价</view>
						</view>
						<view class="userOrderItem z_flex" @click="goOrder('aftersale')">
							<view class="userOrderItemimg ">
								<image src="../../static/order_icon5.png" class="userOrderItemimg5" mode=""></image>
							</view>
							<view class="userOrderItemtext">退款/售后</view>
						</view>
					</view>
				</view>
				<view class="userColorBlock"></view>
				<view class="userSubsidiary">
					<view class="userSubsidiaryText">我的服务</view>
					<view class="userSubsidiaryList">
						<view class="userSubsidiaryItem" @click="goCoupon">
							<view class="userSubsidiaryimg ">
								<image src="../../static/subsidiary_icon1.png" mode="widthFix"></image>
							</view>
							<view class="userSubsidiarytext">优惠券</view>
						</view>
						<view class="userSubsidiaryItem" @click="goAddress">
							<view class="userSubsidiaryimg userSubsidiaryimg2">
								<image src="../../static/subsidiary_icon2.png" mode="widthFix"></image>
							</view>
							<view class="userSubsidiarytext">地址管理</view>
						</view>
						<view class="userSubsidiaryItem" @click="goCollect">
							<view class="userSubsidiaryimg userSubsidiaryimg2">
								<image src="../../static/subsidiary_icon3.png" mode="widthFix"></image>
							</view>
							<view class="userSubsidiarytext">我的收藏</view>
						</view>
						<view class="userSubsidiaryItem"  @click="goAddress">
							<view class="userSubsidiaryimg ">
								<image src="../../static/subsidiary_icon4.png" mode="widthFix"></image>
							</view>
							<view class="userSubsidiarytext">消息</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	var api = require('../../config/api.js')
	import qs from 'qs'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				isCanUse:false
			}
		},
		onLoad(e) {
			var _this=this
			this.getLoginStatus(function(e){
				if(e=="error"){
					console.log("没状态")
					// #ifdef H5
					_this.userLogin();
					// #endif
					// #ifdef MP-WEIXIN
					_this.wxGetUserInfo();
					// #endif
				}else{
					console.log("有状态")
					_this.login(_this.userInfo);
				}
			});
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
		},
		methods: {
			...mapMutations(['login']),
			...mapMutations(['getLoginStatus']),
			toUser(provider){
				this.login(provider);
				uni.reLaunch({
					url:"../index/index"
				})
			},
			userLogin(){
				var _this=this;
				if(!this.userInfo.uid){
				   //当url存在code参数时
				  if(_this.getUrlParam('code')){
					 let code = _this.getUrlParam('code')
						console.log(code)
					 let userinfo = _this.getUserinfo(code);
				  }else{
					_this.getcode();
				  }
				}else{
					this.login(this.userInfo);
				}
			},
			getUserinfo:function(code){
				var _this=this;
				var obj={
					code:code,
					type:0,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.getUsersInfo,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						console.log(res)
						_this.toUser(res.data.data);
				    }
				});
			},
			getcode:function(){
			    //发起请求
			    let that = this;
			    let data = new FormData();
			    data.append('type','snsapi_userinfo'); //请求用户信息类型
				var urls=encodeURIComponent(window.location.href);
			    data.append('backurl',urls);
			    var obj={
			    	backurl:urls
			    }
				obj = qs.stringify(obj);
				uni.request({
					url:api.getCodeUrl,
					method:"GET",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						alert(e.url)
						// return;
						window.location.href= e.url;
				    }
				});
			},
			getUrlParam:function(key) {
			    // 获取参数
			    var url = window.location.search;
			    // 正则筛选地址栏
			    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			    // 匹配目标参数
			    var result = url.substr(1).match(reg);
			    //返回参数值
			    return result ? decodeURIComponent(result[2]) : null;
			},
			goOrder:function(str){
				if(str=="aftersale"){
					uni.navigateTo({
					    url: '../aftersale/aftersale'
					});
				}else{
					uni.navigateTo({
					    url: '../order/order?type='+str
					});
				}
				
			},
			goCollect:function(){
				uni.navigateTo({
				    url: '../collect/collect'
				});
			},
			goAddress:function(){
				uni.navigateTo({
				    url: '../address/address'
				});
			},
			goCoupon:function(){
				uni.navigateTo({
				    url: '../coupon/coupon'
				});
			},
			wxGetUserInfo:function() {
			    let _this = this;
				
						var  appid="wxbf5fa3d3954f012c";
						var  secret="cd61588b5813c7bd9849be2b9d5c7562";
						uni.login({
							provider: 'weixin',
							success: function(res) {
							console.log(res)
							
							let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +res.code + '&grant_type=authorization_code';
								uni.request({
									url: url, // 请求路径
									data:{},
									success: result => {
										var code=result.data.openid;
										console.log(result)
										_this.getwx(code);
										// _this.getUserinfo(code);
									},
								});
							}
						});
						// _this.toUser(res.data.data);
			
			},　　　　　　//登录
			getwx:function(openid){
				let _this = this;
				uni.login({
				    provider: 'weixin',
				    success: function(loginRes) {
				        let code = loginRes.code;
				        if (!_this.hasLogin) {
				            //非第一次授权获取用户信息
				            uni.getUserInfo({
				                provider: 'weixin',
				                success: function(infoRes) { 
									　　　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
				                        // _this.updateUserInfo();//调用更新信息方法
									let nickName = infoRes.userInfo.nickName; //昵称
									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									let sex = infoRes.userInfo.gender; //性别
									let city = infoRes.userInfo.city; //城市
									let province = infoRes.userInfo.province; //省份
									let country = infoRes.userInfo.country; //国家
									var obj={
										openid:openid,
										nickname:nickName,
										headimgurl:avatarUrl,
										city:city,
										sex:sex,
										province:province,
										country:country,
										type:1,
									}
									console.log(obj)
									obj = qs.stringify(obj);
									uni.request({
										url:api.getUsersUsersInfo,
										method:"POST",
										data:obj,
										header:{
											'content-type':'application/x-www-form-urlencoded',
										},
										success: (res) => {
											console.log(res)
											var info=res.data;
											_this.toUser(res.data.data);
											// var e=res.data;
											// alert(e.url)
											// window.location.href= e.url;
										}
									});
				                }
				            });
				        }
				    },
				});
			}
		}
	}
</script>

<style>
.usercentre {
	padding-bottom: 130rpx;
}

.userBox {
	background: -webkit-linear-gradient(bottom, #FF444C, #fd9085);
	background: linear-gradient(180deg, #FF444C, #fd9085);
	height: 260rpx;
	padding: 40rpx 40rpx 0;
	box-sizing: border-box;
	margin-bottom: 40rpx;
}

.userColorBlock {
	height: 20rpx;
	background: #F8F9FB;
}

.userText {
	padding-left:36rpx;
	float: left;
}

.userName {
	font-size:36rpx;
	color: #fff;
	line-height: 1;
	padding: 20rpx 0 16rpx;
	font-weight: 600;
}

.userIdText {
	font-size: 32rpx;
	font-weight: 600;
	color: #fff;
	line-height: 40rpx;
}

.usertimeText {
	font-size: 24rpx;
	line-height:36rpx;
	color: #fff;
}

.userOrderText {
	font-size: 40rpx;
	height: 56rpx;
	line-height: 56rpx;
	padding: 20rpx 30rpx 0;
}

.userOrderTitle {
	font-size: 40rpx;
	color: #000;
}

.userOrderAll {
	color: #A2A2A2;
	font-size: 28rpx;
	float: right;
}

.userOrderList {
	padding: 30rpx;
}

.userOrderItemimg {
	height: 72rpx;
	background-repeat: no-repeat;
	background-position: center;
	background-size: 60rpx;
}

.userOrderItemimg image{
	height: 100%;
	display: block;
	margin: 0 auto;
}
.userOrderItemimg .userOrderItemimg5 {
	width: 77rpx;
	height: 72rpx;
}
.userOrderItemtext {
	font-size: 28rpx;
	font-weight: 600;
	color: #5C5D5F;
	text-align: center;
	line-height: 44rpx;
}
.userSubsidiary {
	overflow: hidden;
	padding-bottom: 100rpx;
}
.userColorBlock {
	height: 20rpx;
	background: #F8F9FB;
}
.userImg {
	width: 160rpx;
	height: 160rpx;
	display: block;
	border: 6rpx solid #fff;
	border-radius: 50%;
	float: left;
}

.userSubsidiaryText {
	font-size: 40rpx;
	color: #000;
	height: 56rpx;
	line-height: 56rpx;
	padding: 20rpx 30rpx 0;
}

.userSubsidiaryList {
	padding-top: 20rpx;
	overflow: hidden;
}

.userSubsidiaryItem {
	float: left;
	width: 33.3333333%;
	padding-top: 20rpx;
	display: block;
}

.userSubsidiaryimg {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	background-color: #FF444C;
	background-position: center;
	background-repeat: no-repeat;
	background-size: 64rpx;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 18rpx;
}
.userSubsidiaryimg image{
	width: 100%;
}
.userSubsidiaryimg2{
	padding: 24rpx;
}
.userSubsidiarytext {
	font-size: 28rpx;
	font-weight: 600;
	color: #5C5D5F;
	text-align: center;
	line-height: 60rpx;
}
</style>
