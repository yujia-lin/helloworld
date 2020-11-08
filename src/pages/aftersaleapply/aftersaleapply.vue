<template>
<view class="aftersaleapplyMain" id="aftersaleapplyMain" >
	<view class="aftersaleapplyInputBox">
		<view class="evaluateTitle f_flex">
			<image :src="detail.spec_img" class="evaluateTImg"></image>
			<view class="evaluateTWord z_flex">{{detail.title}}</view>
		</view>
		<view class="aftersaleapplyInput f_flex">
			<view class="z_flex aftersaleapplyInputT">退款金额</view>
			<input type="text" readonly="readonly" :value="detail.price" class="aftersaleapplyText">
		</view>
		<view class="aftersaleapplyDetailed"></view>
		<view class="aftersaleapplyExplain ">
			<view class="aftersaleapplyExplainT ">申请说明<view class="explainNumber">您还可以输入<view class="explainNum">{{50-describe.length}}</view>字</view></view>
			<textarea name="" placeholder="请您详细填写申请说明" v-model="describe" class="explainText" maxlength="50"></textarea>
		</view>
		<view class="evaluateUploadImg">
			
			<view class="evaluateUploadImgList" v-if="imglist.length>0">
				<image :src="item" v-for="item in imglist" class="evaluateUploadImgItem"></image>
			</view>
			<view class="evaluateUploadFile">
				<view class="eUploadFileText">
					<image src="../../static/uploadimg.png" class="eUploadFileIcon" ></image>
					<view class="eUploadFileWord">选择图片</view>
				</view>
				<input type="file" name="" id="" value="" @change="imgfile(event)" class="eUploadFileInput" multiple/>
			</view>
		</view>
	</view>
	<view class="aftersaleapplyBtn">提交申请</view>

</view>
</template>

<script>
	var api = require('../../config/api.js')
	export default {
		data() {
			return {
				order_sn:"",
				detail:{},
				starsNum:0,
				imglist:[],
				describe:"",
			}
		},
		onLoad(e){
			this.order_sn=e.order_sn
			this.getOrderDetail();
		},
		methods: {
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
			
		}
	}
</script>

<style>
.aftersaleapplyMain {
	position: relative;
	/* height: 100%; */
	background: #fff;
	box-sizing: border-box;
	padding-bottom: 128rpx;
}

.aftersaleapplyBtn {
	background: #FF444C;
	color: #fff;
	height: 88rpx;
	line-height: 88rpx;
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
	right: 20rpx;
	text-align: center;
	font-weight: 600;
	border-radius: 44rpx;
	font-size: 32rpx;
}

.aftersaleapplyInputBox {
	padding-top: 84rpx;
	background: #fff;
}

.aftersaleapplyInput {
	padding: 10rpx 30rpx;
	height: 88rpx;
	line-height: 88rpx;
	background: #fff;
	border-bottom: 6rpx solid #F5F6F7;
}

.aftersaleapplyExplainT {
	font-size: 32rpx;
	color: #333;
	overflow: hidden;
	height: 88rpx;
	line-height: 88rpx;
}

.aftersaleapplyInputT {
	font-size: 32rpx;
	color: #333;
}

.explainNumber {
	float: right;
	color: #9c9c9c;
	font-size: 26rpx;
	font-weight: 600;
	height: 88rpx;
}

.explainNum {
	color: #9c9c9c;
	font-size: 26rpx;
	display: inline;
	font-weight: 600;
}

.aftersaleapplyText {
	width: 52rpx;
	border: none;
	font-size: 32rpx;
}

.aftersaleapplyExplain {
	font-size: 32rpx;
	background: #fff;
	padding: 10rpx 30rpx;
	border-bottom: 6rpx solid #F5F6F7;
}

.explainText {
	width: 100%;
	display: block;
	line-height: 88rpx;
	font-size: 32rpx;
	border: none;
}
.aftersaleState {
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	margin: 0 30rpx;
	border-top: 4rpx solid #f5f5f5;
}

.aftersaleStateBtn {
	text-align: center;
	line-height: 52rpx;
	font-size: 32rpx;
	color: #FF444C;
}

.aftersaleItem {
	border-bottom: 4rpx solid #f5f5f5;
	background: #fff;
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
.evaluateUploadImg{
	padding: 24rpx;
}
.evaluateUploadFile{
	width: 180rpx;
	height: 180rpx;
	border: 2rpx dashed #ccc;
	box-sizing: border-box;
	position: relative;
}
.eUploadFileIcon{
	width: 60rpx;
	height: 48rpx;
	display: block;
	margin: 0 auto;
}
.eUploadFileWord{
	font-size: 24rpx;
	text-align: center;
	line-height: 40rpx;
}
.eUploadFileText{
	padding-top: 40rpx;
}
</style>
