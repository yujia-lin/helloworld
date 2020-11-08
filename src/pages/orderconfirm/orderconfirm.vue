<template>
<view class="orderconfirmMain" id="orderconfirmMain">
	<view class="paySuccessBox" v-if="paySuccessFlag">
		<view class="paySuccessMain">
			<view class="paySuccessIcon">
				<image src="../../static/paySuccessIcon.png" class="paySuccessIconImg"></image>
			</view>
			<view class="paySuccessText">支付成功</view>
			<view class="paySuccessText1">本次支付已成功，详细信息请进入我的订单查看</view>
			<view class="paySuccessBtnBox">
				<view @click="goIndex" class="paySuccessBtn paySuccessBtnc" >返回主页</view>
				<view @click="goOrder" class="paySuccessBtn">我的订单</view>
			</view>
		</view>
	</view>
	<view class="orderconfirmMainBox" v-if="!paySuccessFlag">
		<view class="orderconfirmAddress f_flex" @click="orderconfirmAddressShow(addressDetail.aid)" v-if="addressDetail.length!=0">

				<view class="orderAddressIcon"><image class="orderAddressIconImg" src="../../static/addressIcon.png" mode="widthFix"></image></view>
				<view class="orderAddressText z_flex">
					<view class="orderAddressTextName">{{addressDetail.realname}}<span class="orderAddressTextPhone">{{addressDetail.phone}}</span></view>
					<view class="orderAddressDetail">{{addressDetail.province+' '+addressDetail.city+' '+ addressDetail.district+' '+addressDetail.street}}</view>
				</view>

		</view>
		<view class="orderconfirmAddress f_flex" @click="orderconfirmAddressShow" v-else>
				<view class="orderAddressIcon"><image class="orderAddressIconImg" src="../../static/addressIcon.png" mode="widthFix"></image></view>
			<view class="orderAddressTextNo orderAddressText orderconfirmNoText z_flex" >您还没有设置收货地址，请先设置收货地址</view>
		</view>
		<view class="orderconfirmAddressLine">
			<image src="../../static/line.png" class="orderconfirmAddressLineImg" mode="scaleToFill"></image>
		</view>
		<view class="orderconfirmGoodsList">
			
		</view>
		
		<view class="userColorBlock"></view>
		<view class="storeList">
			<view class="orderconfirmBaseBox" v-for="item in orderList">
				<view class="orderconfirmGoods f_flex">
					<img class="orderconfirmImg" :src="item.activity_img"/>
					<view class="z_flex orderconfirmText">
						<view class="orderconfirmTitle">{{item.title}}</view>
						<view class="orderconfirmSpecs">{{item.symbol}}</view>
					</view>
					<view class="orderconfirmDetaile">
						<view class="orderconfirmPrice">￥{{item.sell_price}}</view>
						<view class="orderconfirmNumber">x{{item.product_num}}</view>
					</view>
				</view>
				<view class="orderconfirmBaseItem f_flex">
					<view class="orderconfirmMessageL">买家留言：</view>
					<input type="text" class="z_flex orderconfirmMessageInput" v-model="item.orderMessage" placeholder="选填"/>
				</view>
			</view>
			<view class="orderconfirmBaseBox">
				
				<!--<view class="orderconfirmBaseItem">
					<view class="orderconfirmBaseItemL">优惠</view>
					<view class="orderconfirmBaseItemR orderconfirmNoC">暂无可用优惠券
						<view class="orderconfirmDiscountBtn" @click="discountShow">1张可用</view>-->
					<!--</view>
				</view>-->
			</view>
			
		</view>
		
	</view>
	<view class="paymentBox" v-if="!paySuccessFlag">
		<view class="paymentText">总金额￥{{total_all}}</view>
		<view class="paymentBtn" @click="gopayment">去支付</view>
	</view>
	
</view>
</template>

<script>
	import qs from 'qs'
	var api = require('../../config/api.js')
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				orderMessage:"",
				addressDetail:{
					realname :"",
					phone :"",
					province :"",
					city :"",
					district :"",
					street:"",
				},
				orderList:[],
				total_all:0,
				product:[],
				uid:2,
				paySuccessFlag:false,
				pid:"",
				sku_id:"",
				num:"",
				cartid:"",
				cart_id:"",
				product_num:0
			}
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
		},
		onLoad(e) {
			console.log(this.userInfo.uid)
			console.log(this.hasLogin)
			console.log(e)
			if(!this.hasLogin){
				uni.reLaunch({
				    url: '/pages/usercentre/usercentre'
				});
			}
			if(this.userInfo.uid){
				this.uid=this.userInfo.uid;
				console.log(this.userInfo)
			}
			this.pid=e.pid;
			this.sku_id=e.sku_id;
			this.num=e.num;
			this.product_num=e.num;
			
			if(e.cartid){
				this.cartid=e.cartid
				this.cart_id=e.cartid
			}
			if(e.aid){
				this.aid=e.aid;
				this.getAddressData(e.aid);
			}else{
				this.getDefaultAddressData();
			}
			this.orderconfirm();
			// this.getweixin();
		},
		onShow() {
			if(this.aid){
				this.getAddressData(this.aid);
			}else{
				this.getDefaultAddressData();
			}
		},
		methods: {
			goIndex:function(){
				uni.navigateTo({
				    url: '../index/index'
				});
			},
			goOrder:function(){
				uni.navigateTo({
				    url: '../order/order'
				});
			},
			orderconfirmAddressShow:function(aid){
			//				this.addressPopup=true;
				var can="pid="+this.pid+"&sku_id="+this.sku_id+"&num="+this.product_num
				if(this.cart_id!=""){
					can+="&cartid="+this.cart_id;
				}
				if(aid){
					can+="&aid="+aid;
				}
				uni.navigateTo({
				    url: '../address/address?'+can
				});
			},
			addressHide:function(){
				this.addressPopup=false;
			},
			addressShowEdit:function(){
				
			},
			addressSelect:function(name,phone,ddress){
				this.showname=name,
				this.showphone=phone,
				this.showaddress=ddress,
				this.addressPopup=false;
				this.$forceUpdate();
			},
			gopayment:function(){
				console.log("去支付")
				var _this=this;
				var cart_id=this.cartid;
				if(cart_id){
					cart_id=cart_id.split(",")
				}

				var orderMessage=[];
				for(var i in this.orderList){
					orderMessage.push(this.orderList[i].orderMessage)
				}
				var obj={
					uid:this.uid,
					address_id:this.aid,
					product:this.product,
					message:orderMessage,
					cartid:cart_id
				}
				obj = qs.stringify(obj);
				console.log(obj)
				uni.request({
				    url: api.addOrder,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e){
							_this.orderid=e.data.orderId;
							_this.wxJsApiPay();
						}
				    }
				});
			},
			wxJsApiPay:function(){
				var _this=this;
				if(this.userInfo.openid){
					var utype=0;
					// #ifdef MP-WEIXIN
					utype=1;
					// #endif 
					var obj={
						orderId:_this.orderid,
						type:utype,
						openId:this.userInfo.openid,
					}
					console.log(obj);
					obj = qs.stringify(obj);
					uni.request({
					    url: api.wxJsApiPay,
						method:"POST",
						data:obj,
						header:{
						    'content-type':'application/x-www-form-urlencoded',
						},
					    success: (res) => {
							var e=res.data;
							if(e){
								console.log(e);
								_this.wxReadyTopay(e);
							}
					    }
					});
				}
			},
			wxReadyTopay:function(data){
				var _this= this;
				
				if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档

				  if( document.addEventListener ){
					document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data), false);
				  }else if (document.attachEvent){
					document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data));
					document.attachEvent('onWeixinJSBridgeReady',this.onBridgeReady(data));
				  }
				}else{
				  this.onBridgeReady(data);
				}
			},
			onBridgeReady:function(options){
				var _this=this;
			WeixinJSBridge.invoke(
				   'getBrandWCPayRequest',{
					// debug:true,
					"appId":options.appId,     //公众号名称，由商户传入
					"timeStamp":options.timeStamp+"", //时间戳，自1970年以来的秒数
					"nonceStr":options.nonceStr, //随机串
					"package":options.package,
					"signType":options.signType, //微信签名方式：
					"paySign":options.paySign, //微信签名
					},function(res){
						console.log(res)
						if(res.err_msg=="get_brand_wcpay_request:ok"){
//							alert('支付成功')
							_this.paySuccessFlag=true;
						}
					}
				)
			},
			orderconfirm:function(){
				var _this=this;
				var pid=this.pid.split(",");
				var sku_id=this.sku_id.split(",");
				var product_num=this.num.split(",");
				var objArr=[];
				for(var i in pid){
					var o ={
						pid:pid[i],
						sku_id:sku_id[i],
						product_num:product_num[i],
					}
					objArr.push(o);
				}
				this.product=objArr
				var obj={
					uid:this.uid,
					product:objArr
				}
				console.log(this.product);
				obj = qs.stringify(obj);
				uni.request({
				    url: api.orderconfirm,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							var data=e.data;
							for(var i = 0 ;i <data.length;i++){
								data[i].activity_img=e.url+data[i].activity_img;
								data[i].orderMessage="";
							}
							_this.orderList=data
							_this.total_all=e.total_all;
						}
				    }
				});
			},
			getAddressData:function(aid){
				var _this=this;
				var obj={
					uid:this.uid,
					aid:aid,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.getAddressData,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.addressDetail=e.data
						}
				    }
				});
			},
			getweixin:function(){
				uni.request({
				    url:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx84e468ba613cd665&redirect_uri=http://im.ijiwei.cn/api/wechat/userAuthorize&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_re",
					method:"GET",
					data:"",
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						
				    }
				});
			},
			discountShow:function(){
				var _this=this;
				var obj={
					uid:this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.getDefaultAddressData,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							console.log(e)
							_this.addressDetail=e.data
						}
				    }
				});
			},
			getDefaultAddressData:function(){
				var _this=this;
				var obj={
					uid:this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.getDefaultAddressData,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.addressDetail=e.data
							_this.aid=e.data.aid
						}
				    }
				});
			}
		}
	}
</script>

<style>
.orderconfirmMain {
	height: 100%;
	box-sizing: border-box;
	background: #F5F5F5;
	position: relative;
	padding-bottom: 120rpx;
}

.orderconfirmAddress {
	padding: 30rpx 40rpx 30rpx 0;
	background: #fff;
}

.orderAddressIcon {
	width: 120rpx;
	box-sizing: border-box;
	padding: 30rpx;
	/* background: url(../images/addressIcon.png)no-repeat center; */
}
.orderAddressIconImg{
	width: 100%;
}
.orderAddressTextName {
	font-size: 32rpx;
	line-height: 44rpx;
	margin-bottom: 10rpx;
	font-weight: 600;
	color: #333;
}

.orderAddressTextPhone {
	font-size: 28rpx;
	color: #333;
	display: inline;
	margin-left: 20rpx;
}

.orderAddressText {
	font-size: 28rpx;
	padding-right: 120rpx;
	/* background: url(../images/right_icon1.png)no-repeat; */
	background-position: right center;
}

.orderAddressDetail {
	font-size: 28rpx;
	line-height: 44rpx;
}

.orderconfirmAddressLine {
	height: 10rpx;
	/* background: url(../images/line.png)repeat-x center; */
	background-size: 60rpx;
}
.orderconfirmAddressLineImg{
	height: 10rpx;
	width: 100%;
	display: block;
}
.paymentBox {
	position: fixed;
	border-top: 4rpx solid #ebebeb;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	padding: 20rpx 30rpx;
	overflow: hidden;
}

.paymentText {
	float: left;
	font-size: 36rpx;
	color:  #FF444C;
	line-height: 80rpx;
	font-weight: 600;
}

.paymentBtn {
	float: right;
	width: 190rpx;
	text-align: center;
	line-height: 80rpx;
	height: 80rpx;
	background:  #FF444C;
	font-size: 32rpx;
	color: #fff;
	border-radius: 40rpx;
}

.orderconfirmGoodsList {
	border-bottom: 4rpx solid #ebebeb;
}

.orderconfirmMessage {
	background: #fff;
	padding: 0 30rpx;
	height: 80rpx;
	line-height: 80rpx;
}
.storeList{
	padding-bottom:120rpx ;
}
.orderconfirmBaseBox {
	background: #fff;
	padding: 0 30rpx;
}

.orderconfirmMessageInput {
	font-size: 32rpx;
	border: none;
	height: 80rpx;
	line-height: 80rpx;
}

.orderconfirmMessageL {
	font-size: 32rpx;
	color: #373737;
	font-weight: 600;
}

.orderconfirmBaseItem {
	overflow: hidden;
	border-top: 4rpx solid #ebebeb;
	margin-top: 16rpx;
	border-bottom: 4rpx solid #ebebeb;
	height: 80rpx;
	line-height: 80rpx;
}

.orderconfirmBaseItem:last-child {
	/*border: none;*/
}

.orderconfirmBaseItemL {
	float: left;
}

.orderconfirmBaseItemR {
	float: right;
}

.orderconfirmBaseItemL {
	font-size: 32rpx;
}

.orderconfirmBaseItemR {
	font-size: 32rpx;
}

.orderconfirmNoC {
	color: #D7D7D7;
}

.orderconfirmDiscountBtn {
	color:  #FF444C;
	float: right;
	font-size: 32rpx;
	padding-right: 40rpx;
	/* background: url(../images/right_icon1.png) no-repeat; */
	background-position: right center;
	background-size: 40rpx;
	font-weight: 600;
}

.detailsImg {
	position: relative;
}

.detailsImgReturn {
	position: absolute;
	width: 80rpx;
	height: 80rpx;
}
.shopGoodsBox {
	width: 100%;
	height: 600rpx;
	overflow: hidden;
}
.orderconfirmAddressPopup{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 101;
}
.orderAddressTextNo{
	color: #333;
	line-height: 144rpx;
	padding-left: 40rpx;
	font-size: 28rpx ;
}
.orderconfirmNoText{
	line-height: 60rpx;
}
.addressShowItem .shopItemRadio{
	margin-right: 10rpx;
}
.orderconfirmImg {
    width: 172rpx;
    height: 172rpx;
    float: left;
}
.orderconfirmGoods {
	padding-top: 20rpx;
}
.orderconfirmText{
	font-size: 28rpx;
	padding-left: 20rpx;
}
.orderconfirmDetaile{
	width: 120rpx;
}
.orderconfirmTitle{
	font-size: 36rpx;
	line-height: 44rpx;
	height: 88rpx;
	overflow: hidden;
}
.orderconfirmSpecs{
	background: #FAFAFA;
	font-size: 28rpx;
	color: #AFAFAF;
	display: inline-block;
	padding: 6rpx;
	line-height: 36rpx;
	max-height: 72rpx;
	overflow: hidden;
}
.orderconfirmPrice{
	font-size: 28rpx;
	text-align: right;
	line-height: 48rpx;
	
} 
.orderconfirmNumber{
	text-align: right;
	font-size: 28rpx;
	line-height: 36rpx;
	
	
}
</style>
