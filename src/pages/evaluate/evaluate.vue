<template>
	<view class="evaluateMain" id="evaluateMain"  v-cloak>
		<!--<view class="orderSearch">
			<a href=""></a>
		</view>-->
		<view class="evaluateTitle f_flex">
			<image :src="detail.spec_img" class="evaluateTImg"></image>
			<view class="evaluateTWord z_flex">{{detail.title}}</view>
		</view>
		<view class="evaluateScore f_flex">
			<view class="evaluateScoreText">综合评分</view>
			<view class="evaluateScoreStars z_flex">
	
				<image :src="starsNum>0?start_iconAct:start_icon" class="evaluateScoreStarsImg" @click="startChange(1)"></image>
				<image :src="starsNum>1?start_iconAct:start_icon" class="evaluateScoreStarsImg" @click="startChange(2)"></image>
				<image :src="starsNum>2?start_iconAct:start_icon" class="evaluateScoreStarsImg" @click="startChange(3)"></image>
				<image :src="starsNum>3?start_iconAct:start_icon" class="evaluateScoreStarsImg" @click="startChange(4)"></image>
				<image :src="starsNum>4?start_iconAct:start_icon" class="evaluateScoreStarsImg" @click="startChange(5)"></image>
			</view>
			<view class="evaluateScoreWord "></view>
		</view>
		<view class="evaluateDescribe">
			<textarea name="" rows="" v-model="describe" cols="" placeholder="亲，您对这个商品满意吗?您的评价会帮助我们选择更好的商品哦~" class="evaluateDescribeInput"></textarea>
		</view>
		<view class="evaluateUploadImg">
			
			<view class="evaluateUploadImgList" v-if="imglist.length>0">
				<image :src="item" v-for="item in imglist" class="evaluateUploadImgItem"></image>
			</view>
			<view class="evaluateUploadFile"  @tap="cI">
				<view class="eUploadFileText">
					<image src="../../static/uploadimg.png" class="eUploadFileIcon" ></image>
					<view class="eUploadFileWord">选择图片</view>
				</view>
			</view>
		</view>
		<a href="javascrip:;" class="addressAddBtn" @click="orderEvaluate">提交评价</a>
	</view>
</template>

<script>
	var api = require('../../config/api.js')
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				starsNum:0,
				start_icon:'../../static/start_iconNo.png',
				start_iconAct:'../../static/start_icon.png',
				imglist:[],
				describe:"",
				order_sn:"",
				detail:{},
				uid:null,
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
			this.order_sn=e.order_sn;
			this.getOrderDetail();
		},
		methods: {
			startChange:function(num){
				this.starsNum=num;
			},
		
			getOrderDetail:function(){
				
				var _this=this;
				var obj={
					order_sn:this.order_sn,
				}
				uni.request({
					url:api.getOrderDetail,
					method:"POST",
					data:obj,
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							var data=e.data;
							if(!data.spec_img){
								data.spec_img=e.url+data.activity_img;
							}else{
								data.spec_img=e.url+data.spec_img;
							}
							_this.detail=e.data;
						}
				    }
				});
			},
			orderEvaluate:function(){
				
				var _this=this;
				if(this.starsNum==0){
					main.loadshow("亲，请先给商品评分！")
				    setTimeout(function(){
					    main.loadhide()
				    },1000)
				    return;
				}
				var obj={
					order_sn:this.detail.order_sn,
					uid:this.uid,
					seller_id:this.detail.seller_id,
					pid:this.detail.pid,
					product_score:this.starsNum,
					images:this.imglist,
					content:this.describe,
					sku_id:this.detail.sku_id,
				}
				uni.request({
					url:api.orderEvaluate,
					method:"POST",
					data:obj,
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							console.log(e)
							uni.showToast({
								title:"评价成功",
								complete:function(){
									uni.redirectTo({
									    url: '../order/order'
									});
								}
							})
						}
				    }
				});
				
			},
			cI(){
				var _this=this;
				uni.chooseImage({
					count: 1,
					sizetype: ['compressed'],
					success(res){
						 // tepFliePaths 保存图片路径 
						var imgFiles = res.tempFilePaths;
						 // 因为没写下标， 直接以数组形式输出
						_this.urlTobase64(imgFiles[0]);
					}
				})
			},
			urlTobase64(url) {
				uni.request({
					url: url,
					method: 'GET',
					responseType: 'arraybuffer',
					success: res => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
						console.log(base64);
					}
				});
			},
			cI(){
				var _this=this;
				uni.chooseImage({
					count: 3,
					sizetype: ['compressed'],
					success(res){
						 // tepFliePaths 保存图片路径 
						var imgFiles = res.tempFilePaths;
						 // 因为没写下标， 直接以数组形式输出
						var len=imgFiles.length+_this.imglist.length;
						
						if(len>3){
							uni.showToast({
							    title: '上传图片不得超过三张',
								icon:'none',
							    duration: 1000
							});
							return;
						}else{
							for(var i = 0 ; i < imgFiles.length;i++){
								_this.urlTobase64(imgFiles[i],function(e){
									_this.imglist.push(e)
								});
							}
						}
					}
				})
			},
			urlTobase64(url,callback) {
				uni.request({
					url: url,
					method: 'GET',
					responseType: 'arraybuffer',
					success: res => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
						callback(base64);
					}
				});
			},
		}
	}
</script>

<style>
.evaluateMain{
	position: relative;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
}
.evaluateTImg{
	width: 120rpx;
	height: 120rpx;
	box-sizing: border-box;
	border: 2rpx solid #ECECEC;
	border-radius: 6rpx ;
}
.evaluateTitle{
	padding: 20rpx;
	overflow: hidden;
	border-bottom: 2rpx solid #F3F3F3;
}
.evaluateTWord{
	padding-left: 20rpx;
	font-size: 28rpx;
	padding-top: 16rpx ;
	line-height: 44rpx;
}
.evaluateScore{
	padding: 20rpx;
	border-bottom: 2rpx solid #F3F3F3;
}
.evaluateScoreStars{
	font-size: 28rpx;
	
}
.evaluateScoreText{
	line-height: 64rpx;
	font-size: 28rpx;
	padding-right: 24rpx;
}
.evaluateScoreStarsImg{
	width: 64rpx;
	height: 64rpx;
	float: left;
	margin-right: 16rpx;
}
.evaluateDescribe{
	font-size: 24rpx;
}
.evaluateDescribeInput{
	font-size: 28rpx;
	padding: 24rpx;
	line-height: 40rpx;
	width: 100%;
	border: none;
	box-sizing: border-box;
}
.evaluateUploadFile{
	width: 180rpx;
	height: 180rpx;
	border: 2rpx dashed #ccc;
	box-sizing: border-box;
	position: relative;
}
.evaluateUploadImgList{
	overflow: hidden;
	padding-bottom: 30rpx;
}
.evaluateUploadImgItem{
	width: 180rpx;
	height: 180rpx;
	border: 2rpx solid #ccc;
	box-sizing: border-box;
	margin-right: 16rpx;
	display: block;
	float: left;
}
.eUploadFileInput{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.eUploadFileIcon{
	width: 60rpx;
	height: 48rpx;
	display: block;
	margin: 0 auto;
}
.evaluateUploadImg{
	padding: 24rpx;
}
.eUploadFileWord{
	font-size: 24rpx;
	text-align: center;
	line-height: 40rpx;
}
.eUploadFileText{
	padding-top: 40rpx;
}
.addressAddBtn {
	width: 400rpx;
	font-size: 32rpx;
	font-weight: 600;
	height: 72rpx;
	line-height: 72rpx;
	text-align: center;
	position: absolute;
	bottom: 30rpx;
	left: 50%;
	color: #fff;
	margin-left: -200rpx;
	background:  #FF444C;
	border-radius: 20rpx;
}

</style>
