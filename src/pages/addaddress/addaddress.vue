<template>
		<view class="addressAdd" >
			<view class="addressAddMain">
				<view class="addressAddInputBox">
					<view class="addressAddInput f_flex">
						<view class="z_flex addressAddInputT">收货人</view>
						<input type="text" v-model="name" placeholder="请填写收货人姓名" class="addressAddText"/>
					</view>
					<view class="addressAddInput f_flex">
						<view class="z_flex addressAddInputT">手机号</view>
						<input type="number" v-model="phone" maxlength="11" placeholder="请填写手机号" class="addressAddText"/>
					</view>
					<view class="addressAddInput f_flex">
						<view class="z_flex addressAddInputT">所在地区</view>
						
						<view class="addressAddText" @click="showAddress">{{addressText}}</view>
						<!-- <input type="text" v-model="region" placeholder="请选择地区" @click="selectAddress" readonly="readonly"/> -->
					</view>
					<view class="addressAddtextareaBox f_flex">
						<view class="z_flex addressAddInputT">详细地址</view>
						<textarea name="" v-model="detailed" rows="" cols="" placeholder="请填写详细地址" class="addressAddtextarea"></textarea>
					</view>
				</view>
				<view class="addressAddSwitch">
					<view class="addressAddSwitchText">
						设置默认地址
					</view>
					<view class="addressAddSwitchBtn" @click="addSwitch" :class="isdefault?'addressAddSwitchBtnAct':''"><view class="addressAddSwitchC"></view></view>
				</view>
				<view class="addressAddSave">
					<view class="addressAddSaveBtn" @click="addSave">保存</view>
				</view>
			</view>
			<view class="addressPopup"  v-if="addressPopup">
				<v-address  @setAddress="getText" ></v-address>
			</view>
		</view>
</template>

<script>
	import qs from 'qs'
	var api = require('../../config/api.js')
	import address from "@/components/address.vue"
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				isdefault:false,
				addressText:"请选择地区",
				addressPopup:false,
				name:'',
				phone:'',
				detailed:'',
				region:'',
				provience:"",
				city:"",
				county:"",
				aid:0,
				uid:null,
				typeStatus:"",
				pid:"",
				sku_id:"",
				num:"",
				cartid:"",
				goOrder:false
			}
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
			var type=e.type
			this.typeStatus=type;
			console.log(e)
			if(e.pid){
				this.pid=e.pid;
				this.goOrder=true;
				this.sku_id=e.sku_id;
				this.num=e.num;
				if(e.cartid){
					this.cartid=e.cartid
				}
			}
			
			if(type=="edit"){
				this.name=e.realname;
				this.phone=e.phone;
				this.provience=e.province;
				this.city=e.city;
				this.county=e.district;
				this.detailed=e.street;
				this.isdefault=(e.isdefault==1)?true:false;
				this.aid=e.aid;
				this.addressText=e.province+" "+e.city+" "+e.district;
				this.region=e.province+" "+e.city+" "+e.district;
			}
		},
		onShow(e) {
		},
		components:{
			 'v-address': address
		},
		methods: {
			
			showAddress:function(){
				this.addressPopup=true;
			},
			addSwitch:function(){
				if(this.isdefault){
					this.isdefault=false;
				}else{
					this.isdefault=true;
				}
			},
			getText:function(e){
				this.addressPopup=false;
				this.addressText=e.region;
				this.provience=e.provience;
				this.city=e.city;
				this.county=e.county;
				this.region=e.region;
			},
			addSave:function(){
				var msg=this.addCheck();
				if(msg==1){
					if(this.typeStatus=="edit"){
						this.updateAddressData();
					}else{
						this.addressAddAjax();
					}
				}else{
					uni.showToast({
					    title:msg,
						icon:'none',
					    duration: 1000
					});
				}
			},
			addCheck:function(){
				console.log(this.region)
				if(this.name==""){
					return "请填写姓名";
				}else if(this.phone==""){
					return "请填写手机号";
				}else if(this.region==""){
					return "请选择地区";
				}else if(this.detailed==""){
					return "请填写详细地址";
				}
				return 1;
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
			updateAddressData:function(){
				var _this=this;
			
				var obj={
					uid:this.uid,
					aid:this.aid,
					realname:this.name,
					province:this.provience,
					city:this.city,
					district:this.county,
					street:this.detailed,
					phone:this.phone,
					isdefault:(this.isdefault?1:0),
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.updateAddressData,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						uni.showToast({
							title:"修改成功",
							icon:'none',
							duration: 1000,
							complete:function(){
								setTimeout(function(){
									var can=_this.getOrderParam();
									uni.redirectTo({
										url: '../address/address?'+can
									});
								},1000)
								
							}
						})
						
						/*更新地址*/
				    }
				});
			},
			addressAddAjax:function(){
				var _this=this;
				var obj={
					uid:this.uid,
					realname:this.name,
					province:this.provience,
					city:this.city,
					district:this.county,
					street:this.detailed,
					phone:this.phone,
					isdefault:(this.isdefault?1:0),
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.addressAdd,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						/*添加地址*/
						uni.showToast({
							title:"添加成功",
							icon:'none',
							duration: 1000,
							success:function(){
								setTimeout(function(){
									var can=_this.getOrderParam();
									uni.redirectTo({
										url: '../address/address?'+can
									});
								},1000)
							}
						})
				    }
				});
				
			},
		}
	}
</script>

<style>
.addressPopup{
	position:fixed ;
	top: 88rpx;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: auto;
	background: #fff;
}
.addressAdd {
height: 100%;
	background: #fff;
	z-index: 11;
}

.addressAddSave {
	position: absolute;
	bottom: 0;
	padding: 16rpx  30rpx;
	left: 0;
	right: 0;
}

.addressAddSaveBtn {
	background:#FF444C;
	color: #fff;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 36rpx;
	text-align: center;
	font-weight: 600;
	width: 100%;
	border-radius: 44rpx;
	display: block;
}

.addressAddInput {
	padding: 10rpx 30rpx;
	/* height: 88rpx; */
	line-height: 88rpx;
	border-bottom:6rpx solid #F5F6F7;
}

.addressAddtextareaBox {
	padding: 10rpx 30rpx;
	height: 280rpx;
	border-bottom:6rpx solid #F5F6F7;
	line-height: 88rpx;
}

.addressAddtextarea {
	width: 520rpx;
	box-sizing: border-box;
	font-size: 32rpx;
	height: 280rpx;
	border: none;
	line-height: 88rpx;
}

.addressAddInputT {
	font-size: 32rpx;
	color: #333;
}

.addressAddText {
	width: 520rpx;
	border: none;
	font-size: 32rpx;
	line-height: 48rpx;
	min-height: 88rpx;
	box-sizing: border-box;
	padding: 20rpx;
}

.addressAddSwitch {
	padding: 10rpx 30rpx;
	height: 88rpx;
	line-height: 88rpx;
	background: #F5F6F7;
	overflow: hidden;
}

.addressAddSwitchText {
	font-size: 32rpx;
	color: #333;
	float: left;
}

.addressAddSwitchBtn {
	float: right;
	width: 160rpx;
	height:  72rpx;
	border: 4rpx solid #e5e5e5;
	border-radius: 36rpx;
	background: #fff;
	margin-top: 4rpx;
	display: block;
	transition: all .5s;
}

.addressAddSwitchBtnAct {
	background: #6dd26d;
}

.addressAddSwitchC {
	width:  72rpx;
	height:  72rpx;
	display: block;
	background-color: #fff;
	box-shadow: 0 10rpx 16rpx 0 rgba(138, 138, 138, 0.6);
	transition: all .5s;
	border-radius: 50%;
}

.addressAddSwitchBtnAct .addressAddSwitchC {
	margin-left: 88rpx;
}
</style>
