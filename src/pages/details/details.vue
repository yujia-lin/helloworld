<template>
<view class="detailsMain" id="detailsMain">
	<view class="specsPopup" @click="specsHide" v-show="specsflag">
		<view class="specsMain" @click.stop="shopMain">
			<view class="specsContent">
				<view class="specsHead">
					<image :src="specs.spec_img" class="specsHeadImg"></image>
					<view class="specsHeadPirce">￥{{specs.sell_price}}</view>
				</view>
				<view class="specsList">
					<view class="specsItem" v-for="(item,key) in specsList">
						<view class="specsItemTitle">{{item.title}}</view>
						<view class="specsItemL" >
							<view class="specsItemLBlock" @click="specsSelect(key,index)" :class="itemz.check? 'specsItemLBlockAct':''" v-for="(itemz,index) in item.list">{{itemz.name}}</view>
							<!--:class"itemz.check?'specsItemLBlockAct':''"-->
						</view>
					</view>
					<view>
						<view class="specsItemTitle">数量</view>
						<view for="" class="addAndSub clear">  
							<view class="subVal ui-fl" @click="subValChange"><image mode="widthFix" src="../../static/sub_icon.png"></image></view>
							<input type="number" class="ui-fl term1 " v-model="shopNumber"  @blur="defectVal" />
							<view class="addVal ui-fl" @click="addValChange"><image mode="widthFix" src="../../static/add_icon.png"></image></view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="specsBtnBox" @click="shopMain">
			<view class="specsBtn" @click="specsSave">确定</view>
		</view>
	</view>
	<view class="specsPopup" @click="couponHide" v-show="couponFlag">
		<view class="specsMain couponMainDetails" @click="shopMain">
			<view class="couponTitle">可领取优惠券</view>
			<view class="couponListDetails">
				<view class="couponListItem f_flex " v-for="item in couponList" :class="item.is_receive==1?'couponListItemNo':''">
					<view class="couponListItemL z_flex">
						<view class="couponListItem_rt couponListItem_Radio"></view> 
						<view class="couponListItem_rb couponListItem_Radio"></view> 
						<view class="couponListItemRText">{{item.title}}</view> 
						<view class="couponListItemRTime">{{item.end_time}}到期</view>
					</view> 
					<view class="couponListItemR">
						<view class="couponListItem_lt couponListItem_Radio"></view> 
						<view class="couponListItem_lb couponListItem_Radio"></view> 
						<view class="couponPrice">￥{{item.quota}}</view> 
						<view class="couponCondition">满{{item.condition}}使用</view> 
						<view class="couponListItemRBtn" @click="addCoupon(item.is_receive,item.coupon_id)">领取</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
	<view class="detailsContent">
		<view class="detailsImg">
			<!-- <view href="javascript:history.back(-1)"  class="detailsImgReturn"></view> -->
			<view class="shopGoodsBox">
				<!-- <view class="swiper-wrapper" >
					<view class="swiper-slide"><view href=""><img src="./images/pic.jpg"/></view></view>
					<view class="swiper-slide" v-for="item in detail.adimg"><img :src="item"/></view>
				</view> -->
				
				<detailsBanner :list="detail.adimg"></detailsBanner>
			</view>
		</view>
		<!-- <view class="userColorBlock"></view> -->
		<view class="detailsText">
			<view class="detailsPriceBox">
				<view class="detailsPriceT1">￥{{detail.sell_price}}</view>
				<view class="detailsPriceT2">已销{{detail.sales}}件</view>
			</view>
			<view class="detailsTitle">{{detail.title}}</view>
		</view>
		<view class="userColorBlock"></view>
		<view class="specifications f_flex">
			<view class="specificationsL">规格</view>
			<view class="specificationsR z_flex"  @click="specsShow('specs')">
				{{specsSelectEdText}}
				<image class="specificationsRImg" mode="widthFix" src="../../static/right_icon1.png"></image>
			</view>
		</view>
		<view class="userColorBlock" v-if="couponList.length>0"></view>
		<view class="specifications f_flex" v-if="couponList.length>0">
			<view class="specificationsL">优惠</view>
			<view class="specificationsR z_flex"  @click="couponShow">
				{{couponSelectEdText}} 
				<image class="specificationsRImg" mode="widthFix" src="../../static/right_icon1.png"></image>
			</view>
		</view>
		<view class="userColorBlock"></view>
		<view class="detailseValuate">商品评价</view>
		<view class="detailseValuateMain">
			<view class="clear">
				<view class="detailseValuateImg">
					<!-- <image class="detailsExplainImgp" src="../../static/pic.jpg"></image> -->
				</view>
				<view class="detailseValuateName">蜘蛛俠</view>
			</view>
			
			<view class="detailseValuateText">質量很好</view>
		</view>
		<view class="userColorBlock"></view>
		
		<view class="detailsExplainTitle">商品详情</view>

		<view class="detailsExplain" v-html="detail.desc">
		</view>
		<view class="detailsfoot">
			<view @click="information" class="detailsfootHref">
				<view class="detailsfootHrefIcon ">
					<image src="../../static/fnav_icon4.png" mode="heightFix"></image>
				</view>
				客服
			</view>
			
			<view @click="goCart" class="detailsfootHref">
				<view class="detailsfootHrefIcon ">
					<image src="../../static/fnav_icon3.png" mode="heightFix"></image>
				</view>
				购物车
			</view>
			<view class="detailsfootHref" @click="changeCollect">
				<view class="detailsfootHrefIcon " >
					<image src="../../static/collectIconAct.png" mode="heightFix" v-if="collect"></image>
					<image src="../../static/collectIcon.png" mode="heightFix" v-else></image>
				</view>
				收藏
			</view>
			<view class="detailsfootBtnBox">
				<view class="detailsFootBtn addCart " @click="specsShow('cart')">加入购物车</view>
				<view class="detailsFootBtn detailsShopBtn" @click="specsShow('order')">立即购买</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	var api = require('../../config/api.js')
	import {mapState,mapMutations} from "vuex"
	import qs from 'qs'
	import detailsBanner from "@/components/detailsBanner.vue"
	export default {
		data() {
			return {
				pid:"",
				uid:null,
				shopNumber:1,
				specsflag:false,
				couponFlag:false,
				collect:false,
				specsSelectEd:"",
				specsSelectEdText:"请选择",
				specsSelectId:0,
				specsSelectText:"请选择",
				couponSelectEdText:"可领取",
				specs:{
					spec_img:"",
					sell_price:"0.00" 
				},
				specsList:[],
				couponList:[],
				detail:{
					sell_price:"0.00",
					adimg:[],
				}
			}
		},
		components:{
			detailsBanner
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
		},
		onLoad(e) {
			var pid=e.id;
			console.log(this.hasLogin)
			console.log(this.userInfo.uid)
			if(!this.hasLogin){
				uni.reLaunch({
				    url: '/pages/usercentre/usercentre'
				});
			}
			if(this.userInfo.uid){
				this.uid=this.userInfo.uid;
				console.log(this.userInfo)
			}
			this.pid=e.id;
			this.getProductData();
			this.isCollect();
		},
		methods: {
			shopMain:function(e){
			},
			getProductData:function(){
				var _this=this;
				var obj={
					pid:this.pid
				}
				obj = qs.stringify(obj);
				uni.request({
					url: api.getProductData,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
					success: (res) => {
						// var text
						var e=res.data;
						var detail=e.data;
						// detail.adimg=detail.adimg.split(";");
						var str="";
						var urlq=detail.url;
						_this.urlq=detail.url;
						if(!detail.desc){
							for(var i =0 ;i<detail.adimg.length;i++){
								str+="<img src='"+detail.adimg[i]+"' class='detailsExplainImg'>"
							}
							detail.desc=str;
						}else{
							detail.desc=_this.escape2Html(detail.desc);
						}
						_this.detail=detail;
						// console.log(_this.detail.content);
						var num=0;
						var specs=[];
						_this.specs.sell_price=_this.detail.sell_price;
						_this.specs.spec_img=urlq+_this.detail.activity_img;
						for(var i in _this.detail.content){
							var sObj={};
							for(var j in _this.detail.content[i].child){
								if(num==0){
									console.log(_this.detail.content[i].child[0].spec_img[0]);
									_this.specs.spec_img=urlq+_this.detail.content[i].child[0].spec_img[0];
									_this.specs.spec_name=_this.detail.content[i].child[0].spec_name;
								
								}
								var check=false;
								if(!sObj.list){
									sObj.list=[];
									check=true;
								}
								var listObj={
									name:_this.detail.content[i].child[j].spec_name,
									check:check
								}
								sObj.list.push(listObj);
							}
							sObj.title=_this.detail.content[i].name
							num++;
							specs.push(sObj);
						}
						_this.specsList=specs;
							console.log(specs);
						var num1=0;
						for(var i in _this.detail.sku){
							if(num1==0){
								_this.specs.sell_price=_this.detail.sku[i].sell_price;
								_this.detail.sell_price=_this.detail.sku[i].sell_price;
							}
							console.log(_this.detail.sku[i].sell_price);
							num1++;
							// console.log(_this.detail.sku[i]);
						}
						_this.getSellerCouponList();
						console.log(_this.detail.adimg);
				
						setTimeout(function(){
							// var mySwiper = new Swiper('.shopGoodsBox',{
							// //  loop: true,
							// 	autoplay: 3000,
							// });
						},1000)
					}
				});
					
			},
			texted:function(){
				var texted="";
				for(var i in this.specsList){
					for(var j in this.specsList[i].list){
						var unit=""
						
						if(this.specsList[i].list[j].check){
							if(texted!=""){
								unit=","
							}
							texted+=unit+this.specsList[i].list[j].name
						}
					}
				}
				return texted;
			},
			specsSave:function(){
				var _this=this;
				this.specsflag=false;
				this.specsSelectEdText=_this.texted();
				if(this.specsSelectEdText==""){
					this.specsSelectEdText="默认"
				}
				this.specsSelectEdText+=" 数量:"+_this.shopNumber
				if(this.specsSelectEd=="cart"){
					this.addCart();
				}else if(this.specsSelectEd=="order"){
					if(this.specsSelectEdText!=""){
						
						this.specsSelectText=this.specsSelectEdText;
						for(var i in this.detail.sku){
	//  					console.log(this.detail.sku[i].symbol,this.specsSelectText);
							if(this.detail.sku[i].symbol==this.specsSelectText){
								this.specsSelectId=this.detail.sku[i].id;
								this.specs.sell_price=this.detail.sku[i].sell_price;
								this.specs.spec_img=_this.urlq+this.detail.sku[i].spec_img;
							}
						}
						uni.navigateTo({
						    url: "../orderconfirm/orderconfirm?sku_id="+this.specsSelectId+"&pid="+this.pid+"&num="+this.shopNumber
						});
						// window.location.href="./orderconfirm.html?sku_id="+this.specsSelectId+"&pid="+this.pid+"&num="+this.shopNumber;
					}
				}
			},
			defectVal:function(){},
			subValChange:function(index,code){
				if(this.shopNumber>1){
					this.shopNumber--;
				}
			},
			addValChange:function(index,code){
				this.shopNumber++;
			},
			specsSelect:function(key,index){
				var _this=this;
			
				for(var i =0 ;i<_this.specsList[key].list.length;i++){
					var check=false;
					if(i==index){
						check=true;
					}
					_this.specsList[key].list[i].check=check;
				}
				
				this.specsSelectText=_this.texted();
				
				for(var i in this.detail.sku){
					if(this.detail.sku[i].symbol==this.specsSelectText){
						this.specsSelectId=this.detail.sku[i].id;
						this.specs.sell_price=this.detail.sku[i].sell_price;
						this.specs.spec_img=_this.urlq+this.detail.sku[i].spec_img;
					}
				}
				console.log(_this.specsList[key].list[index])
			},
			couponShow:function(){
				this.couponFlag=true;
			},
			couponHide:function(){
				this.couponFlag=false;
			},
			specsHide:function(){
				this.specsflag=false;
			},
			specsShow:function(text){
				this.specsSelectEd=text;
				if(this.specsSelectEdText=="请选择"||text=='specs'){
					this.specsflag=true;
				}else{
					if(text=="cart"){
						this.addCart();
					}else if(text=="order"){
						if(this.specsSelectEdText!=""){
							uni.navigateTo({
							    url: "../orderconfirm/orderconfirm?sku_id="+this.specsSelectId+"&pid="+this.pid+"&num="+this.shopNumber
							});
						}
					}
				}
			},
			getSellerCouponList:function(){
				var _this=this;
				var sid=_this.detail.sid;
				var obj={
					uid:this.uid,
					seller_id:sid
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.getSellerCouponList,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.couponList=e.data;
						}
				    }
				});
			},
			addCoupon:function(ischeck,id){
				var _this=this;
				var sid=_this.detail.sid;
				if(ischeck==1){
					return;
				}
				var _this=this;
				var obj={
					uid:this.uid,
					coupon_id:id,
					seller_id:sid
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.addCoupon,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.getSellerCouponList();
							main.loadshow("领取成功");
							setTimeout(function(){
								main.loadhide()
							},500)
						}
				    }
				});
			},
			addCart:function(){
				var obj={
					uid:this.uid,
					pid:this.pid,
					sku_id:this.specsSelectId,
					product_num:this.shopNumber,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.addCart,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.msg=="添加成功"){
							uni.showToast({
							    title: '添加成功请到购物车查看！',
								icon:'none',
							    duration: 1000
							});
						}
				    }
				});
				
			},
			isCollect:function(){
				var _this=this;
				var obj={
					pid:this.pid,
					uid:this.uid
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.isCollect,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						_this.collect=e.status
				    }
				});
			},
			delCollect:function(){
				var _this=this;
				var obj={
					pid:this.pid,
					uid:this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.delCollect,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						// console.log(e.code,e)
						if(e.code==0){
							uni.showToast({
							    title: '删除收藏',
								icon:'none',
							    duration: 1000
							});
							_this.collect=false;
						}
				    }
				});
			},
			changeCollect:function(){
				console.log(1,this.collect);
				if(this.collect){
					this.delCollect();
				}else{
					this.addCollect();
				}
			},
			escape2Html:function(str) {
			 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
			 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
			},
			addCollect:function(){
				var _this=this;
				var obj={
					pid:this.pid,
					uid:this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
				    url: api.addCollect,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						// console.log(e.code,e)
						if(e.code==0){
							uni.showToast({
							    title: '收藏成功',
								icon:'none',
							    duration: 1000
							});
							_this.collect=true;
						}
				    }
				});
			},
			goCart:function(){
				console.log('../cart/cart')
				uni.switchTab({
				    url: '../cart/cart'
				});
			},
			information:function(){
				uni.switchTab({
				    url: '../information/information'
				});
			},
		}
	}
</script>

<style>
.specsPopup{
	position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 101;
}
.specsMain{
	position: absolute;
	left: 0;
	width: 100%;
	bottom:0;
	top: 200rpx;
	overflow: hidden;
	background: #fff;
	box-sizing:border-box;
	padding: 32rpx 20rpx 110rpx;
	border-radius: 20rpx 20rpx 0 0;
}
.specsList{
	padding:20rpx 0; 
}
.specsHead{
	overflow: hidden;
}
.specsHeadImg{
	float: left;
	width: 190rpx;
	height: 190rpx;
}
.specsHeadPirce{
	font-size: 40rpx;
	line-height:  40rpx;
	color:#FF444C;
	font-weight: 600;
	padding-top: 120rpx; 
	float: left;
}
.specsItemL{
	overflow: hidden;
}
.specsItemLBlock{
	font-size: 24rpx;
	height: 52rpx;
	line-height: 48rpx;
	text-align: center;
	color: #333;
	background:#f7f7f7;
	margin-bottom: 20rpx; 
	padding: 0 30rpx;
	margin-right: 20rpx;
	border-radius: 10rpx;
	float: left;
	box-sizing: border-box;
	border: 2rpx solid #f7f7f7;
	
}
.specsItemLBlockAct{
	border: 2rpx solid#FF444C;
}
.specsContent{
	height: 100%;
	overflow-x: hidden; 
	overflow-y: auto; 
}
.specsBtnBox{
	position: absolute;
	bottom:0;
	left: 0;
	right: 0;
	background:#fff;
	padding:20rpx 40rpx;  
}
.specsBtn{
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	background:#FF444C;
	border-radius: 36rpx;
	font-size: 32rpx;
	color: #fff;
	font-weight: 600;
	text-align: center;
}
.specsItemTitle{
	font-size: 32rpx;
	font-weight: 600;
	margin-bottom: 30rpx;
	color: #333;
}
.detailsTitle {
	font-size: 32rpx;
	color: #333;
	padding: 0 30rpx;
	margin-bottom: 20rpx;
}

.detailsMain{
	width: 100%;
	height:  100%;
	position: relative;
	overflow: hidden;
}
.detailsContent{
	width: 100%;
	height:  100%;
	overflow-x: hidden;
	overflow-y: auto;
	padding-bottom: 124rpx;
	box-sizing: border-box;
}
.detailsfoot {
	bottom: 0;
	position: fixed;
	left: 0;
	right: 0;
	padding: 20rpx 0;
	height: 80rpx;
	border-top: 4rpx solid #ccc;
	background: #fff;
}

.detailsImgReturn {
	width: 60rpx;
	height: 60rpx;
	z-index: 100;
	border-radius: 50%;
	position: absolute;
	left: 30rpx;
	top: 30rpx;
	background: rgba(0, 0, 0, 0.5) ;
	/* background: rgba(0, 0, 0, 0.5) url(../images/right_icon2.png)no-repeat center; */
	background-size: 36rpx;
}

.detailsfoot {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
}

.detailsfootHref {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	font-size: 24rpx;
	color: #999;
	height: 80rpx;
	text-align: center;
}

.detailsfootHrefIcon {
	height: 48rpx;
	background-repeat: no-repeat;
	background-position: center bottom;
	background-size: 40rpx;
}

.detailsfootHrefIcon image{
	height: 100%;
}
.detailsfootBtnBox {
	-webkit-box-flex: 4;
	-webkit-flex: 4;
	flex: 4;
	overflow: hidden;
	margin: 0 20rpx;
	border-radius: 40rpx;
}

.detailsFootBtn {
	font-size: 28rpx;
	width: 50%;
	display: block;
	float: left;
	display: block;
	text-align: center;
	height: 80rpx;
	color: #fff;
	line-height: 80rpx;
}

.addCart {
	background: #333;
}

.detailsShopBtn {
	background:#FF444C;
}

.detailsPriceBox {
	overflow: hidden;
	padding: 20rpx 30rpx;
}

.detailsPriceT1 {
	font-size: 48rpx;
	color:#FF444C;
	float: left;
	line-height: 52rpx;
}

.detailsPriceT2 {
	font-size: 24rpx;
	float: right;
	line-height: 52rpx;
	color: #828282;
}

.specifications {
	padding: 0 30rpx;
	height: 80rpx;
	line-height: 80rpx;
}

.specificationsL {
	color: #666;
	font-size: 32rpx;
	width: 80rpx;
}

.specificationsR {
	color: #333;
	font-size: 32rpx;
	/* background: url(../images/right_icon1.png) no-repeat; */
	background-position: right center;
	background-size: 40rpx;
	position: relative;
}
.specificationsRImg{
	position: absolute;
	width: 40rpx;
	right: 0;
	top: 20rpx;
}
.detailseValuate{
	font-size: 40rpx;
	color: #333;
	line-height: 72rpx;
	background: #fff;
	padding: 20rpx 30rpx;
	    border-bottom: 2rpx solid #eee;
}
.detailseValuateMain{
	padding: 20rpx 30rpx;
}
.detailsExplainTitle{
	background: #c3c3c3;
	text-align: center;
	line-height: 72rpx;
	color: #666;
	font-size: 32rpx;
}
.detailseValuateName{
	font-size: 28rpx;
	float: left;
	padding-left: 24rpx;
	line-height: 100rpx;
}
.detailsExplain{
	font-size: 24rpx
}
.detailsExplain .detailsExplainImg{
	width: 100%;
	display: block;
	margin:0 auto;
}
.detailseValuateImg{
	float: left;
	width: 100rpx;
	height: 100rpx;
	overflow: hidden;
	border-radius:50% ;
}
.detailseValuateImgp{
	width: 100%;
	height: 100%;
}
.detailseValuateText{
	overflow: hidden;
	line-height: 44rpx;
	font-size: 24rpx;
	color: #666;
	padding: 30rpx 0 ;
}

.addAndSub{
	    width: 200rpx;
    height: 60rpx;
	border: 2rpx solid #999;
	display: block;
	margin: 0 16rpx;
}
.subVal,.addVal{
	width: 30%;
    display: block;
    height: 100%;
	padding: 12rpx;
    box-sizing: border-box;
}
.subVal image,.addVal image{
	width: 100%;
	display: block;
}
.addVal{
	border-left:2rpx solid #757575;
}
.subVal{
	border-right:2rpx solid #757575;
}
.addAndSub input{
	width: 40%;
	border: none;
	height: 100%;
	display: block;
	text-align: center;
}

.couponNav {
	box-shadow: 0 6rpx 14rpx 4rpx rgba(226, 226, 226, .5);
	background: #fff;
}

.couponItem {
	font-size: 28rpx;
	text-align: center;
	height: 88rpx;
	line-height: 88rpx;
	color: #333;
}

.couponItem_decorate {
	display: inline-block;
	height: 84rpx;
}

.couponItemAct .couponItem_decorate {
	color: #FF444C;
	font-weight: 600;
	border-bottom: 4rpx solid #FF444C;
}
.couponTitle{
	padding-left: 20rpx;
	font-size: 32rpx;
	color: #999;
}
.couponListDetails{
	padding-top: 40rpx;
}
.couponListItem{
	/*box-shadow: -5px 2px 1px 1px rgba(0,0,0,0.3);*/
	margin-bottom: 30rpx;
}
.detailsMain .couponMainDetails{
	background: #f5f5f5;
}
.couponMainDetails .couponListItemRBtn{
	color: #FF444C;
}
.couponListItemRText {
	font-size: 40rpx;
	line-height: 1;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	color: #333;
}

.couponListItemL {
	font-size: 44rpx;
	background: #fff;
	border-radius: 20rpx 0 0 20rpx;
	padding-left: 30rpx;
	padding-top: 30rpx;
	position: relative;
}

.couponListItemRTime {
	font-size: 24rpx;
	color: #b3b0b0;
}

.couponListItemR {
	width: 240rpx;
	font-size: 44rpx;
	background: #FF444C;
	padding: 30rpx 0;
	border-radius: 0 20rpx 20rpx 0;
	position: relative;
}

.couponPrice {
	font-size: 36rpx;
	text-align: center;
	color: #fff;
	line-height: 1;
}

.couponCondition {
	color: #fff;
	font-size: 24rpx;
	text-align: center;
	line-height: 40rpx;
	margin-bottom: 10rpx;
}

.couponListItemRBtn {
	font-size: 28rpx;
	padding: 10rpx 0;
	background: #fff;
	text-align: center;
	display: block;
	width: 120rpx;
	margin: 0 auto;
	color: #999;
	line-height: 1;
	border-radius: 12rpx;
}

.couponListItem_lt {
	left: 0;
	top: 0;
	border-radius: 0 0 30rpx 0;
}

.couponListItem_Radio {
	background: #f5f5f5;
	position: absolute;
	width: 20rpx;
	height: 20rpx;
}

.couponListItem_lb {
	bottom: 0;
	left: 0;
	border-radius: 0 30rpx 0 0;
}

.couponListItem_rt {
	border-radius: 0 0 0 30rpx;
	top: 0;
	right: 0;
}

.couponListItem_rb {
	bottom: 0;
	right: 0;
	border-radius: 30rpx 0 0 0;
}

.couponListItemBox {
	padding: 20rpx;
}

.couponListItemNo .couponListItemR {
	background: #777;
}
.couponListItemNo .couponListItemR .couponListItemRBtn{
	color: #777;
}
</style>
