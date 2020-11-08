<template>
    <view class="shopContent">
    	<view class="cartShowBox">
			<view class="cartShowScroll">
				<view class="shopEdit">
					<!--<view class="shopEditText">gong</view>-->
					<view class="shopEditBtn" :class="shopHandle?'shopEditBtnAct':''" @click="shopEdit">{{shoptext}}</view>
				</view>
				<view class="shoplist">
					<view class="shopItem f_flex" :class="item.check?'shopItemAct':''" @click="shopItemCheck(index)" dcheck="false" v-for="(item,index) in shop">
						<view class="shopItemRadio">
							<image src="../../static/paySuccessIcon.png" class="shopItemRadioImg" mode=""></image>
						</view>
						<view @click.stop="shopGoDetails(item.pid)"  class="shopItemiBox">
							<!-- {{item.spec_img}} -->
							<image class="shopItemimg" :src="item.spec_img" mode=""></image>
						</view>
						<view class="shopItemText z_flex">
							<view @click.stop="shopGoDetails(item.pid)" ><view class="shopItemTitle">{{item.title}}</view></view>
							<view @click.stop="shopGoDetails(item.pid)" ><view class="shopItemPrice">￥{{item.sell_price}}</view></view>
							<view class="shopItemCount">
								<image  class="shopItemAdd " src="../../static/cartAddIcon.png" mode=""  @click.stop="shopAdd(item.product_num,index)"></image>
								<input type="number" v-model="item.product_num" @click.stop="shopstopClick" @blur.stop="shopNumMin(index)" class="shopItemNum"/>
								<image  class="shopItemSub" mode=""  :src="Number(item.product_num)<=1 ? '../../static/cartSubIconN.png':'../../static/cartSubIcon.png'" @click.stop="shopSub(item.product_num,index)"></image>
								<!-- <view class="shopItemSub" ></view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
    	</view>
    	<view class="shopfoot">
    		<label class="shopAllSelect" :class="allcheck?'shopAllSelectAct':''" @click="allSelect">
    			<view class="shopAllSelectRadio">
					<image src="../../static/paySuccessIcon.png" class="shopItemRadioImg" mode=""></image>
				</view>
    			<text class="shopAllSelectText">全选</text>
    		</label>
    		<view class="shopHandle" v-if="shopHandle">
    			<view  class="shopCountBtn shopCountBtnAct ui-fr "  @click="settlement">删除</view>
    			<view  class="clearCartBtn  ui-fr "  @click="clearCart">清空</view>
    		</view>
    		<view class="shopCount" v-if="!shopHandle">
    			<view  class="shopCountBtn ui-fr " :class="shopNum>0?'shopCountBtnAct':''" @click="settlement">结算({{shopNum}}件)</view>
    			<text class="shopCountPrice ui-fr">￥{{shopprice}}</text>
    			<view class="shopCountText ui-fr">总计:</view>
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
	            shopNum:0,
	            shopprice:0.00,
	            allcheck:false,
	            shopHandle:false,
	            shoptext:'编辑',
	            shop:[
	            ],
				uid:null
	        }
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
		},
		onShow() {
			this.getCartList();
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
		},
	    methods: {
			shopGoDetails:function(pid){
				uni.redirectTo({
				    url: '../details/details?id='+pid
				});
			},
	        getCartList:function(){
				var _this=this;
				var obj={
					uid:_this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.getCartList,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						var imgurl=e.url;
						var data=e.data;
						for(var i = 0 ;i <data.length;i++){
							var spec_imgUrl=imgurl+data[i].spec_img;
							data[i].activity_img=imgurl+data[i].activity_img;
							if(!data[i].spec_img){
								spec_imgUrl=data[i].activity_img
							}
							data[i].spec_img=spec_imgUrl;
							data[i].check=false;
						}
						_this.shop=data;
				    }
				});
			},
			shopEdit:function(){
				if(this.shopHandle){
					this.shopHandle=false;
					this.shoptext="编辑";
				}else{
					this.shopHandle=true;
					this.shoptext="完成";
				}
				
			},
			shopSub:function(num,index){

				if(this.shop[index].product_num==1){return;}
				this.shop[index].product_num=this.shop[index].product_num-1;
			},
			shopAdd:function(num,index){
				console.log(num);
				this.shop[index].product_num=Number(num)+1;
			},
			shopItemCheck:function(index){
				if(!this.shop[index].check){
					this.shop[index].check=true;
				}else{
					this.shop[index].check=false;
				}
				var a=this.shop[index].check;
				var sub=0;
				var shopNum=0;
				var shopPrice=0;
				for(var i =0;i<this.shop.length;i++){
					if(this.shop[i].check){
						shopNum=Number(this.shop[i].product_num)+Number(shopNum);
						shopPrice=Number(this.shop[i].sell_price)*Number(this.shop[i].product_num)+Number(shopPrice);
					}
					if(this.shop[i].check!=a){
						sub=1;
					}
				}
				this.shopNum=shopNum;
				this.shopprice=shopPrice.toFixed(2);
				
				if(sub==0){
					this.allcheck=a;
				}else{
					this.allcheck=false;
				}
			},
			settlement:function(){
				if(this.shopNum>0){
					var delArr=[];
					var delshowArr=[];
					var goArr=[];
					for(var i=0;i<this.shop.length;i++){
						if(this.shop[i].check){
							delArr.push(this.shop[i].cart_id);
							goArr.push(this.shop[i])
						}else{
							delshowArr.push(this.shop[i])
						}
					}
					if(this.shopHandle){
						//删除
						this.delCart(delArr,delshowArr);
					}else{
						this.goOrder(goArr);
						//结算
					}
				}
			},
			goOrder:function(goArr){
				var pid=""
				var sku_id=""
				var product_num="";
				var cart_id="";
				for(var i in goArr){
					var unit=","
					if(i==0){
						unit=""
					}
					pid+=unit+goArr[i].pid;
					sku_id+=unit+goArr[i].sku_id;
					product_num+=unit+goArr[i].product_num;
					cart_id+=unit+goArr[i].cart_id;
					uni.navigateTo({
						url: "../orderconfirm/orderconfirm?pid="+pid+"&sku_id="+sku_id+"&num="+product_num+"&cartid="+cart_id
					});
					// window.location.href="./orderconfirm.html?pid="+pid+"&sku_id="+sku_id+"&num="+product_num+"&cartid="+cart_id
				}
			},
			shopNumMin:function(index){
				var val=this.shop[index].product_num
				if(val=="" || !val || val==0|| val<0){val=1}
				if(val%1>0){
					val=parseInt(val)
				}
				this.shop[index].product_num=val;
			},
			delCart:function(delArr,delshowArr){
				var _this=this;
				
				var obj={
					uid:_this.uid,
					cart_id:delArr,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.delCart,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data
						if(e.code==0&& e.msg=="删除成功"){
							_this.shop=delshowArr;
							_this.shopprice =0;
							_this.shopNum=0
							uni.showToast({
							    title: '删除成功',
								icon:'none',
							    duration: 1000
							});
						}
				    }
				});
			},
			clearCart:function(){
				var _this=this;
				var obj={
					uid:_this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.delCart,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data
						if(e.code==0&& e.msg=="删除成功"){
							_this.shop=delshowArr;
							_this.shopprice =0;
							_this.shopNum=0
							uni.showToast({
							    title: '删除成功',
								icon:'none',
							    duration: 1000
							});
						}
				    }
				});
			},
			shopstopClick:function(){
			},
			allSelect:function(){
				if(this.allcheck){
					this.allcheck=false;
				}else{
					this.allcheck=true;
				}
				var shopNum=0;
				var shopPrice=0;
				for(var i = 0;i<this.shop.length;i++){
					this.shop[i].check=this.allcheck;
					shopNum+=Number(this.shop[i].product_num);
					shopPrice+=Number(this.shop[i].sell_price)*Number(this.shop[i].product_num)
				}
				this.shopNum=shopNum;
				this.shopprice=shopPrice.toFixed(2);
			}
	    }
	}
</script>

<style>
	.shoplist{
		padding-bottom: 90rpx ;
	}
	.shopItem {
		margin-left: 20rpx;
		border-bottom: 4rpx solid #e6e6e6;
		padding: 30rpx 0;
	}
	
	.shopContent {
		height: 100%;
		position: relative;
	}
	.cartShowBox{
		height: 100%;
		overflow-x:hidden ;
		overflow-y:auto ;
	}
	.cartShowScroll{
	}
	.shopItemiBox {
		width: 180rpx;
		height: 180rpx;
		box-sizing: border-box;
		border: 2rpx solid #ccc;
		display: block;
	}
	
	.shopItemimg {
		width: 176rpx;
		height: 176rpx;
		display: block;
	}
	
	.shopItemPrice {
		font-size: 28rpx;
		color: #FF444C ;
		font-weight: 600;
		line-height: 40rpx;
		height: 40rpx;
	}
	
	.shopItemText {
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	
	.shopItemTitle {
		font-size: 28rpx;
		line-height: 44rpx;
		height: 88rpx;
		margin-bottom: 4rpx;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.shopItemCount {
		overflow: hidden;
		font-size: 26rpx;
	}
	
	.shopItemSub,
	.shopItemAdd,
	.shopItemNum {
		font-size: 26rpx;
		float: right;
		line-height:  48rpx;
		height:  48rpx;
		text-align: center;
		display: block;
		width: 44rpx;
		background-size:  48rpx;
		border: none;
	}
	.shopItemNum {
		width: 120rpx;
		margin: 0 4rpx;
		background: #f2f3eb;
	}
	.shopCartContent{
		padding-bottom:1.16rem;
	}
	.shopfoot {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 90rpx ;
		border-top: 4rpx solid #E2E2E2;
		padding: 0 20rpx;
		background: #fff;
		padding-top: 10rpx;
	}
	
	.shopAllSelect {
		float: left;
		height: 100rpx;
		line-height: 90rpx ;
		font-size: 32rpx;
	}
	
	.shopAllSelectText {
		font-size: 28rpx;
	}
	
	.shopCount {
		font-size: 32rpx;
	}
	
	.shopCountText {
		font-size: 32rpx;
		line-height: 80rpx;
		color: #7b7577;
	}
	
	.shopCountPrice {
		line-height: 80rpx;
		font-size: 32rpx;
		color: #333;
		margin-right: 16rpx;
	}
	
	.shopCountBtn {
		display: block;
		width: 240rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #ffbab9;
		border-radius: 36rpx;
		color: #fff;
	}
	.clearCartBtn{
		display: block;
		line-height: 80rpx;
		height: 80rpx;
		padding: 0 20rpx;
	}
	.shopCountBtnAct {
		background: #FF444C ;
	}
	
	.shopAllSelectRadio {
		width: 40rpx;
		height: 40rpx;
		display: block;
		border: 1px solid #9A9A9A;
		border-radius: 50%;
		box-sizing: border-box;
		padding: 4rpx;
		float: left;
		margin-top: 30rpx;
		margin-right: 10rpx;
	}
	
	.shopAllSelectAct .shopAllSelectRadio {
		border-color: #FF444C ;
		background: #FF444C ;
	}
	
	.shopItemSelect {
		width: 60rpx;
	}
	
	.shopItemRadio {
		width: 40rpx;
		height: 40rpx;
		display: block;
		border: 1px solid #9A9A9A;
		border-radius: 50%;
		box-sizing: border-box;
		padding: 4rpx;
		float: left;
		margin-top: 70rpx;
		margin-right: 30rpx;
	}
	.shopItemRadioImg{
		width: 100%;
		height: 100%;
		display: block;
	}
	.shopItemAct .shopItemRadio {
		border-color: #FF444C;
		background: #FF444C ;
	}
	
	.shopHandle {
		font-size: 32rpx;
		font-weight: 600;
	}
	
	.shopEdit {
		background: #eaeaea;
		font-size: 28rpx;
		height: 52rpx;
		line-height: 52rpx;
	}
	
	.shopEditBtn {
		font-size: 28rpx;
		color: #b3b2b2;
		height: 52rpx;
		cursor: pointer;
		display: block;
		line-height: 52rpx;
		padding: 0 30rpx;
		float: right;
	}
	
	.shopEditBtnAct {
		color: #FF444C ;
	}
</style>
