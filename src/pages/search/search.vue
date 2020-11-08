<template>
		<view class="search_Mask">
			<input type="text" placeholder="请搜索商品"  class="searchInput" v-model="keyVal"/>
			<view class="searchBtn" @click="golist">搜索</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				keyVal:""
			}
		},
		methods: {
			golist:function(){
				if(this.keyVal!=""){
					uni.navigateTo({
					    url: '../list/list?key='+this.keyVal
					});
				}else{
					uni.showToast({
					    title: '请输入关键字',
						icon:'none',
					    duration: 1000
					});
				}
				
			}
		}
	}
</script>

<style>
	
.searchInput {
    border: none;
    border-radius: 30rpx;
    height: 60rpx;
    overflow: hidden;
    background-color: #f7f7f7;
    font-size: 24rpx;
    line-height: 60rpx;
    padding-left: 70rpx;
    padding-right: 20rpx;
    box-sizing: border-box;
    margin: 0 auto ;
    display: block;
    width: 460rpx;
}
.searchBtn {
    position: absolute;
    padding: 12rpx;
    box-sizing: border-box;
    background-color: #FF444C;
    color: #fff;
    border-radius:8rpx;
    font-size: 28rpx;
    height: 60rpx;
    right: 30rpx;
    top:20rpx;
    width: 80rpx;
}
.search_Mask {
    height: 100rpx;
    position: relative;
    width: 100%;
    background: #fff;
    font-size: 32rpx;
    box-sizing: border-box;
    padding: 20rpx 0;
    border-bottom: 2rpx solid #E2E2E2;
}
</style>
