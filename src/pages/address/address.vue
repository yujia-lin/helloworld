<template>
<!-- 	 -->
<view class="addressMain" id="addressMain">
	<view class="addressNoBox"  v-if="addressListArr.length<1">
		<image src="../../static/addressno.png" mode="widthFix"  class="addressNoImg"></image>
		<view class="addressNoText">目前还没有地址信息</view>
	</view>
	<view class="addressShowBox" v-if="addressListArr.length>0">
		<view class="addressShowList">
			<view class="addressShowItem" v-for="(item,index) in addressListArr" @click.stop="goOrderUrl(item.aid)">
				<view class="addressShowLeft">
					<view class="orderHookIcon" v-if="goOrder">
						<image src="../../static/payIcon.png" class="orderHookIconImg" mode="widthFix" v-if="(item.aid==aid||(aid==''&&index==0))"></image>
					</view>
					<view class="addressShowBase1">
						<view class="addressShowName">{{item.realname}}</view>
						<!--<view class="addressShowDefault" v-if="item.isdefault==1">默认</view>-->
					</view>
						<view class="addressShowPhone">{{item.phone}}</view>
					<view class="addressShowBase2">{{item.province+' '+ item.city+' '+ item.district+' '+item.street }}</view>
				</view>
				<view class="addressShowRight">
					<view class="addressDefault shopAllSelect" :class="item.isdefault?'shopAllSelectAct':''" @click.stop="addressSelect(item.isdefault,item.aid)">
						<view class="shopAllSelectRadio addressRadio"><image mode="widthFix" class="shopAllSelectRadioC" src="../../static/paySuccessIcon.png"></image></view>
						<view class="shopAllSelectText">设置成默认</view>
					</view>
					<view class="addressShowDel addressShowBtn"  @click.stop="addressDel(item.aid)">删除</view>
					<view class="addressShowEdit addressShowBtn" @click.stop="addressEdit(item.realname,item.phone,item.province,item.city,item.district,item.street,item.isdefault,item.aid)">修改</view>

				</view>
			</view>
		</view>
	</view>
	<view  class="addressAddBtn" @click.stop="addressAdd">添加地址</view>
</view>
</template>

<script>
	import qs from 'qs'
	var api = require('../../config/api.js')
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				pid:"",
				sku_id:"",
				num:"",
				cartid:"",
				addressListArr:[],
				aid:"",
				uid:null,
				goOrder:false
			}
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
		},
		onBackPress(e) {
			uni.redirectTo({
			  url: '/pages/usercentre/usercentre'
			});
			return true
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
			this.pid=e.pid;
			this.sku_id=e.sku_id;
			this.num=e.num;
			if(e.pid){
				this.goOrder=true;
			}
			if(e.aid){
				this.aid=e.aid;
			}
			if(e.cartid){
				this.cartid=e.cartid
			}
		},
		onShow() {
			this.addressList();
		},
		methods: {
			addressList:function(that){
				var _this=this;
				var obj={
					uid:this.uid
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.addressList,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.data.length>=0){
							_this.addressListArr=e.data;
						}
				    }
				});
			},
			addressSelect:function(check,id){
				console.log(check)
				var _this=this;
				var is=0;
				if(check){
					is=0
				}else{
					is=1;
				}
				var obj={
					uid:this.uid,
					aid:id,
					isdefault:is,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.setAddressDefault,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						_this.addressList();
						uni.showToast({
							title:"修改成功",
							icon:'none',
							duration: 1000
						})
				    }
				});
			},
			addressDel:function(id){
				var _this=this;
				var obj={
					uid:this.uid,
					aid:id
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.delAddress,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						
						uni.showToast({
							title:e.msg,
							icon:'none',
							duration: 1000,
							success() {
								_this.addressList();
							}
						})
				    }
				});
			},
			goOrderUrl:function(aid){
				if(this.goOrder){
			    	var can=this.getOrderParam()+"&aid="+aid;
					uni.redirectTo({
						url: "../orderconfirm/orderconfirm?"+can
					});
				}
			},
			getOrderParam:function(){
				var can="";
				if(this.goOrder){
					var pid=this.pid;
					var sku_id=this.sku_id;
					var product_num=this.num;
					
					
					can="pid="+this.pid+"&sku_id="+this.sku_id+"&num="+this.num
					if(this.cartid!=""){
						can+="&cartid="+this.cartid;
					}
				}
				return can;
			},
			addressAdd:function(){
				var can=this.getOrderParam()+"type=add";
				
				uni.navigateTo({
					url: '../addaddress/addaddress?'+can
				});
				// uni.navigateTo({
				// 	url:"../addressAdd/addressAdd?type=add"
				// })
			},
			addressEdit:function(realname,phone,province,city,district,street,isdefault,aid){
				var can=this.getOrderParam()+"&aid="+aid+"&realname="+realname+"&phone="+phone+"&province="+province+"&city="+city+"&district="+district+"&street="+street+"&isdefault="+isdefault+"&type=edit";
				uni.navigateTo({
					url:"../addaddress/addaddress?"+can
				})
			}
		}
	}
</script>

<style>
	.addressShowList{
		padding-bottom:132rpx ;
	}
.shopAllSelectAct{
	border-color: #FF444C;
}
.shopAllSelectAct .shopAllSelectRadio {
	border-color: #FF444C;
	background-color: #FF444C;
}
.addressMain {
	position: relative;
	height: 100%;
	box-sizing: border-box;
	background: #f5f5f5;
	overflow: hidden;
	
}

.addressAddBtn {
	width:400rpx;
	font-size: 32rpx;
	font-weight: 600;
	height:  72rpx;
	line-height:  72rpx;
	text-align: center;
	position: absolute;
	bottom: 30rpx;
	left: 50%;
	color: #fff;
	margin-left: -200rpx;
	background:#FF444C;
	border-radius: 20rpx;
}
.orderHookIcon{
	width: 36rpx;
	height: 36rpx;
	top: 50%;
	margin-right: -18rpx;
	right: 40rpx;
	position: absolute;
}
.orderHookIconImg{
	width: 100%;
	height: 100%;
}
.addressShowBox {
	width: 100%;
	height: 100%;
	overflow-y: auto;
}

.addressNoBox {
	padding-top: 26rpx;
}

.addressNoText {
	text-align: center;
	line-height: 100rpx;
	font-size: 40rpx;
	color: #333;
}

.addressNoImg {
	width: 404rpx;
	margin: 0 auto;
	display: block;
}

.addressShowItem {
	padding: 40rpx 30rpx;
	background: #fff;
	overflow: hidden;
	border-bottom: 2rpx solid #ccc;
}

.addressShowBase1 {
	overflow: hidden;
}

.addressShowName {
	float: left;
	font-weight: 600;
	font-size: 36rpx;
	line-height: 80rpx;
	color: #333;
	margin-right: 40rpx;
}

.addressShowPhone {

	font-weight: 600;
	font-size: 36rpx;
	color: #333;
	line-height: 60rpx;
	margin-right: 10rpx;
}

.addressShowDefault {
	float: right;
	font-size: 28rpx;
	background:#FF444C;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
	margin-top: 12rpx;
	color: #fff;
}
.addressDefault .addressRadio{
	margin-top: 14rpx;
}
.shopAllSelectRadioC{
	width: 100%;
	height:100%;
	display: block;
}
.addressShowBase2 {
	font-size: 32rpx;
	color: #333;
	line-height: 1;
	padding: 20rpx 0 20rpx;
}

.addressShowLeft {
	/*float: left;*/
	position: relative;
	padding-left: 10rpx;
}

.addressShowRight {
	padding-top:20rpx;
	overflow: hidden;
	/*float: right;*/
	border-top:2rpx solid #F4F4F4 ;
}

.addressDefault {
	float: left;
	font-size: 32rpx;
	color: #333;
	padding-left: 10rpx;
	line-height: 60rpx;
	height: 60rpx;
	width: 220rpx;
}
.addressShowBtn {
	padding-right: 10rpx;
	font-size: 32rpx;
	color: #333;
	line-height: 60rpx;
	padding-left: 40rpx;
	float: right;
	/*border-left: 4rpx solid #f1f1f1;*/
}

.shopAllSelectRadio {
    width: 36rpx;
    height: 36rpx;
    display: block;
    border: 2rpx solid #9A9A9A;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 4rpx;
    float: left;
    margin-top: 30rpx;
    margin-right: 10rpx;
}
</style>
