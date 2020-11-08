<template>
<view class="orderMain" id="orderMain" v-cloak>
	<!--<view class="orderSearch">
		<view href=""></view>
	</view>-->
	<view class="orderNav f_flex">
		<view href="javascript:;" @click="goOrder('all')" class="orderItem z_flex" :class="orderStatusNum==0?'orderItemAct':''">
			<view class="orderItem_decorate">全部订单</view>
		</view>
		<view href="javascript:;" @click="goOrder('staypayment')" class="orderItem z_flex" :class="orderStatusNum==1?'orderItemAct':''">
			<view class="orderItem_decorate">待付款</view>
		</view>
		<view href="javascript:;" @click="goOrder('staydeliver')" class="orderItem z_flex" :class="orderStatusNum==2?'orderItemAct':''">
			<view class="orderItem_decorate">待发货</view>
		</view>
		<view href="javascript:;" @click="goOrder('staycollect')" class="orderItem z_flex" :class="orderStatusNum==3?'orderItemAct':''">
			<view class="orderItem_decorate">待收货</view>
		</view>
		<view href="javascript:;" @click="goOrder('stayevaluate')" class="orderItem z_flex" :class="orderStatusNum==4?'orderItemAct':''">
			<view class="orderItem_decorate">待评价</view>
		</view>
	</view>
	<view v-if="showNoFlag">
		<view class="orderNotHave" v-if="(orderStatusNum==1&&!waitfor)||(orderStatusNum==0&&orderArr1.length==0&&orderArr.length==0)||(orderArrDFH.length==0&&orderStatusNum==2)||(orderArrDSH.length==0&&orderStatusNum==3)||(orderArrDPJ.length==0&&orderStatusNum==4)">
			<image class="orderNotImg" src="../../static/orderno.png" mode="widthFix"></image>
			<view class="orderNotText">您暂时没有相关订单</view>
		</view>
	</view>
<!-- 	<view class="orderNotHave" v-if="(orderStatusNum==1 && orderArr1.length==0)||(orderArr.length==0&& orderArr1.length==0&& orderStatusNum==0)">
		<image class="orderNotImg" src="../../static/orderno.png" mode="widthFix"></image>
		<view class="orderNotText">您暂时没有相关订单</view>
	</view> -->
	<view class="tipsMask" v-if="orderPopupFlag">
		<view class="tipsPopup orderPopupMain"  v-if="defineFlag">
			<view class="tipsPopup">
				<view class="orderPopupSImgBox">
					<image :src="defineImg" class="orderPopupSImg"></image>
				</view>
				<view class="orderPopupSText">
					<view class="orderPopupSTextH5">确认收到货了吗?</view>
					<view class="orderPopupSTextP">为了保证您的售后权益，请收到商品检查无误后再确认收货</view>
				</view>
				<view class="orderPopupBtnBox f_flex">
					<view class="z_flex orderPopupBtn" @click="definehide">取消</view>
					<view class="z_flex orderPopupBtn orderPopupBtnAct" @click="defineTakeOver" >确定</view>
				</view>
			</view>
		</view>
		<view class="tipsPopup PopupMain"  v-if="cancelFlag">
				<view class="orderPopupSMain">
					<view class="orderPopupSText">
						<view>是否取消订单?</view>
					</view>
				</view>
				<view class="orderPopupBtnBox f_flex">
					<view class="z_flex orderPopupBtn" @click="definehide">取消</view>
					<view class="z_flex orderPopupBtn orderPopupBtnAct" @click="clearOrder" >确定</view>
				</view>
		</view>
	</view>
	<view class="orderList" v-if="orderArr.length>0 || ((orderStatusNum==0||orderStatusNum==1)&&orderArr1.length>0)">
		<view class="orderListItem" v-for="(item,index) in orderArr1" v-if="(orderStatusNum==1&&item.status==0)||orderStatusNum==0">
			<view class="orderListItemBase f_flex">
				<view class="orderListItemImgList" v-if="!item.title">
					<image :src="urls+itemzi.activity_img" class="orderListItemImg" v-for="itemzi in item.product"></image>
				</view>
				<image :src="urls+itemzi.activity_img" v-if="item.title" class="orderListItemImg" v-for="itemzi in item.product"></image>
				<view class="orderListItemBaseText z_flex">
					<view class="orderListItemTitle" v-if="item.title">{{item.title}}</view>
					<view class="orderListItemPrice paddingNo">总价￥{{item.total_fee}}</view>
					<view class="orderListItemSymbol"><view>数量：{{item.product.length}}</view></view>
				</view>
			</view>
			<view class="orderListItemBtnBox clear" v-if="item.status==0">
				<view @click="goOrderconfirm(item.gourls)" class="orderListItemBtn">去支付</view>
				<view href="javascript:;" class="orderListItemBtn" @click="cancelShow(item,index)">取消订单</view>
			</view>
		</view>
		<view class="orderListItem" v-for="(item,index) in orderArr" v-if="orderStatusNum==0||(item.showCheck==orderStatusNum) && orderStatusNum!=1">
			<view class="orderListItemBase f_flex">
				<image :src="item.spec_img" class="orderListItemImg"></image>
				<view class="orderListItemBaseText z_flex">
					<view class="orderListItemTitle">{{item.title}}</view>
					<view class="orderListItemPrice paddingNo">总价￥{{item.price}}</view>
					<view class="orderListItemSymbol"><view v-if="item.symbol">规格：{{item.symbol}}</view><view>数量：{{item.product_num}}</view></view>
				</view>
			</view>
			<view class="orderListItemBtnBox clear">
				<view :href="'./aftersaleapply.html?order_sn='+item.order_sn" class="orderListItemBtn" v-if="item.status==3 || item.status==1">退货</view>
				<!--<view href="" class="orderListItemBtn"  v-if="item.status==0">去支付</view>-->
				<view href="javascript:;" class="orderListItemBtn"  v-if="item.status==0" @click="cancelShow(item,index)">取消订单</view>
				<view href="javascript:;" class="orderListItemBtn"  v-if="item.status==2" @click="defineShow(item,index)">确认收货</view>
				<view href="javascript:;" class="orderListItemBtn" v-if="item.status==1"  @click="remindDelivery()">提醒发货</view>
				<view @click="goEvaluate(item.order_sn)" class="orderListItemBtn" v-if="item.status==3">评价</view>
			</view>
		</view>
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
				pageName:"",
				uid:null,
				orderArr:[],
				orderArrDSH:[],
				orderArrDFH:[],
				orderArrDPJ:[],
				orderArr1:[],
				waitfor:false,
				urls:"",
				orderStatus:"",
				orderStatusNum:0,
				defineImg:"",
				defineFlag:false,
				cancelFlag:false,
				remindFlag:false,
				orderNumFalg:false,
				orderPopupFlag:false,
				orderNum:0,
				oid:null,
				showNoFlag:false
			}
		},
		onBackPress(e) {  
			uni.redirectTo({
			  url: '/pages/usercentre/usercentre'
			});
			return true
		},
		onNavigationBarButtonTap(e) {
			console.log("success")		
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
		},
		onLoad(e) {
			console.log(this.userInfo.uid)
			console.log(this.hasLogin)
			if(!this.hasLogin){
				uni.reLaunch({
				    url: '/pages/usercentre/usercentre'
				});
			}
			if(this.userInfo.uid){
				this.uid=this.userInfo.uid;
				console.log(this.userInfo)
			}
			console.log(e)
			var type=e.type;
			this.pageName=type;
			this.statusCheck(type)
			this.orderList();
			this.getNoPayOrderList();
			this.statusOrderArr()
		},
		methods: {
			goEvaluate:function(order_sn){
				uni.navigateTo({
				    url: '../evaluate/evaluate?order_sn='+order_sn
				});
				// 202010201701153815
			},
			goOrderconfirm:function(can){
				
			},
			statusCheck:function(text){
				if(text=="all" || text==""){
					this.orderStatusNum=0;
				}else if(text=="staypayment"){
					this.orderStatusNum=1;
				}else if(text=="staydeliver"){
					this.orderStatusNum=2;
				}else if(text=="staycollect"){
					this.orderStatusNum=3;
				}else if(text=="stayevaluate"){
					this.orderStatusNum=4;
				}else{
					this.orderStatusNum=0;
				}
			},
			goOrder:function(text){
				uni.navigateTo({
				    url: '../order/order?type='+text
				});
			},
			statusListCheck:function(num){
//				0待付款1待发货2待收货3待评价4已评价5已追评6待退换7已退款8退换进行中 
				if(num==0){
					return 1;
				}else if(num==1){
					return 2;
				}else if(num==2){
					return 3;
				}else if(num==3){
					return 4;
				}else{
					return 0;
				}
			},
			statusOrderArr:function(){
				var sub=0;
				console.log(this.orderArr)
				for(var i in this.orderArr){
					if(this.orderStatusNum==this.orderArr[i].showCheck){
						this.orderNumFalg=false;
						return ;
					}
				}
				this.orderNumFalg=true;
			},
			definehide:function(){
				this.defineFlag=false;
				this.orderPopupFlag=false;
				this.cancelFlag=false;
			},
			defineShow:function(data,num){
				this.oid=data.order_sn;
				this.defineImg=data.spec_img;
				this.defineFlag=true;
				this.orderPopupFlag=true;
				this.orderNum=num;
			},
			cancelShow:function(data,num){
				this.oid=data.oid;
				this.cancelFlag=true;
				this.orderPopupFlag=true;
				this.orderNum=num;
			},
			defineTakeOver:function(){
				var _this=this;
				var obj={
					order_sn:_this.oid,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.determineReceive,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.defineFlag=false;
							_this.orderPopupFlag=false;
							_this.orderArr[_this.orderNum].showCheck=10;
							uni.showToast({
							    title:e.msg,
								icon:'none',
							    duration: 1000
							});
						}
				    }
				});
				
			},
			clearOrder:function(){
				var _this=this;
				var obj={
					oid:_this.oid,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.clearOrder,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.cancelFlag=false;
							_this.orderPopupFlag=false;
							_this.orderArr[_this.orderNum].showCheck=10;
							_this.$forceUpdate();
							uni.showToast({
							    title:e.msg,
								icon:'none',
							    duration: 1000
							});
						}
				    }
				});
			},
			remindDelivery:function(){
				var _this=this;
				var obj={
					oid:_this.oid,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.remindDelivery,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							uni.showToast({
							    title:"亲，已经提醒卖家尽快发货！",
								icon:'none',
							    duration: 1000
							});
						}
				    }
				});
				
			},
			getNoPayOrderList:function(){
				var _this=this;
				var obj={
					uid:this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.getNoPayOrderList,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						var data=e.data;
						for(var i in data){
							
							if(data[i].product.length==1){
								data[i].title=data[i].product[0].title;
							}
							// 0待付款1待发货2待收货3待评价4已评价5已追评6待退换7已退款8退换进行中 
							
							var pid="";
							var sku_id="";
							var product_num="";
						
							for(var j in data[i].product){
								if(data[i].status==0){
									_this.waitfor=true;
								}
								 var unit=","
								if(j==0){
									unit=""
								}
								pid+=unit+data[i].product[j].pid;
								sku_id+=unit+data[i].product[j].sku_id;
								product_num+=unit+data[i].product[j].product_num;
							}
							data[i].gourls="?.pid="+pid+"&sku_id="+sku_id+"&num="+product_num;
							
						}
						if(_this.pageName=="staypayment"){
							_this.showNoFlag=true;
						}
							_this.orderArr1=data;
				    }
				});
				
			},
			orderList:function(index){
				var _this=this;
				var obj={
					uid:this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.orderList,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.urls=e.url;
							var data=e.data;
							for(var i in data){
								var spec_imgUrl=_this.urls+data[i].spec_img;
								data[i].activity_img=_this.urls+data[i].activity_img;
								if(!data[i].spec_img){
									spec_imgUrl=data[i].activity_img
								}
								data[i].spec_img=spec_imgUrl;
								data[i].showCheck=_this.statusListCheck(data[i].status);
								if(data[i].status==1){
									//待发货
									_this.orderArrDFH.push(data[i]);
								}else if(data[i].status==2){
									//待收货
									_this.orderArrDSH.push(data[i]);
								}else if(data[i].status==3){
									//待评价
									_this.orderArrDPJ.push(data[i]);
								}
							}
							_this.orderArr=data;
							if(_this.pageName!="staypayment"){
								_this.showNoFlag=true;
							}
						}
				    }
				});
			}
		}
	}
</script>

<style>
.orderMain {
	min-height: 100%;
	background: #f5f5f5;
	box-sizing: border-box;
}
.orderListItemSymbol {
    font-size: 24rpx;
    color: #b3b0b0;
}
.orderListItemSymbol span{
	font-size: 24rpx;
    color: #b3b0b0;
	display: block;    
}
.orderNav {
	box-shadow: 0 6rpx 14rpx 4rpx rgba(226, 226, 226, .5);
	background: #fff;
}

.orderItem {
	font-size: 28rpx;
	text-align: center;
	height: 88rpx;
	line-height: 88rpx;
	color: #333;
}

.orderItem_decorate {
	display: inline-block;
	height: 84rpx;
}

.orderItemAct .orderItem_decorate {
	color: #FF444C;
	font-weight: 600;
	border-bottom: 4rpx solid #FF444C;
}

.orderNotHave {
	padding-top: 280rpx;
	/*display: none;*/
}

.orderNotImg {
	display: block;
	margin: 0 auto;
	width: 522rpx;
}

.orderNotText {
	text-align: center;
	line-height: 100rpx;
	font-size: 40rpx;
	color: #333;
}

.orderListItem {
	background: #fff;
	margin-bottom: 30rpx;
}

.orderListItemBase {
	padding: 20rpx 30rpx;
	font-size: 32rpx;
}
.orderListItemImgList {
    width: 520rpx;
}
.orderListItemImg {
	width: 158rpx;
	height: 158rpx;
	border: 2rpx solid #ccc;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
}

.orderListItemTitle {
	font-size: 28rpx;
    line-height: 36rpx;
    height: 72rpx;
    overflow: hidden;
}

.orderListItemBaseText {
	font-size: 32rpx;
	padding-left: 30rpx;
}

.orderListItemPrice {
	font-size: 32rpx;
	color: #FF444C;
	font-weight: 600;
	line-height: 64rpx;
	padding-top: 32rpx;
}

.orderListItemBtnBox {
	font-size: 32rpx;
	padding: 30rpx 0;
}

.orderListItemBtn {
	color: #6e6e6e;
	font-size: 32rpx;
	height: 68rpx;
	line-height: 68rpx;
	padding: 0 40rpx;
	border: 2rpx solid #cacaca;
	float: right;
	border-radius: 40rpx;
	margin-right: 20rpx;
}

.orderList {
	padding-top: 30rpx;
}
.tipsPopup{
	border-radius:20rpx ;
	background: #fff;
}
.orderPopupBtnBox{
	border-top:2rpx solid  #EEE;
	height: 92rpx;
}
.orderPopupBtn{
	height: 92rpx;
	line-height: 92rpx;
	text-align: center;
	font-size: 32rpx;
	position: relative;
	font-weight: 600;
}
.orderPopupBtn:after{
	content: "";
	display: block;
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	width: 2rpx;
	background: #eee;
}
.orderPopupBtn:last-child:after{
	display: none;
}
.orderPopupBtnAct{
	color: #e53343
}
.tipsMask{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,.5);
	z-index: 11;
}
.orderPopupMain{
	left: 110rpx;
	right: 110rpx;
	height: 576rpx;
	position: absolute;
	top: 50%;
	margin-top: -286rpx;
}
.PopupMain{
	position: absolute;
	left: 110rpx;
	right: 110rpx;
	height: 200rpx;
	top: 50%;
	margin-top: -100rpx;
}
.orderPopupSMain{
	height: 106rpx;
	padding-top: 36rpx;
	box-sizing: border-box;
}
.orderPopupSText .orderPopupSTextH5{
	font-size: 32rpx;
	color: #333;
	text-align: center;
	line-height: 1;
	margin-bottom: 16rpx;
}
.orderPopupSText{
	padding-bottom: 30rpx;
}
.orderPopupSText .orderPopupSTextP{
	color: #9f9f9f;
	text-align: center;
	font-size: 24rpx;
	padding: 0 30rpx;
	line-height: 40rpx;
}
.orderPopupSImgBox{
	padding-top: 50rpx;
	padding-bottom: 30rpx;
}
.orderPopupSImg{
	width: 200rpx;
	height: 200rpx;
	border: 20rpx solid #f8f8f8;
	display: block;
	margin: 0 auto;
	border-radius:20rpx ;
}
</style>
