<template>
<view class="orderMain">
	<view class="orderNotHave">
		<image class="orderNotImg" src="../../static/orderno.png" mode="widthFix"></image>
		<view class="orderNotText">您暂时没有退款商品</view>
	</view>
	<view class="aftersaleList">
		<view class="aftersaleItem">
			<view class="orderListItemBase f_flex">
				<image src="../../static/pic.jpg" class="orderListItemImg"></image>
				<view class="orderListItemBaseText z_flex">
					<view class="orderListItemTitle">老式渗透型藤椅。</view>
					<view class="orderListItemPrice">总价￥16.00</view>
				</view>

			</view>
			<view class="aftersaleState">
				<view class="aftersaleStateBtn">处理中</view>
			</view>
		</view>
		<view class="aftersaleItem">
			<view class="orderListItemBase f_flex">
				<image src="../../static/pic.jpg" class="orderListItemImg"></image>
				<view class="orderListItemBaseText z_flex">
					<view class="orderListItemTitle">老式渗透型藤椅。</view>
					<view class="orderListItemPrice">总价￥16.00</view>
				</view>

			</view>
			<view class="aftersaleState">
				<view class="aftersaleStateBtn">已退款</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.orderMain{
		background: #f5f5f5;
	}
.orderListItemBase {
	padding: 20rpx 30rpx;
	font-size: 32rpx;
}

.orderListItemImg {
	width: 200rpx;
	height: 200rpx;
}

.orderListItemTitle {
	font-size:  28rpx;
    line-height: 36rpx;
    height:  72rpx;
    overflow: hidden;
}

.orderListItemBaseText {
	font-size: 32rpx;
	padding-left: 30rpx;
}

.orderListItemPrice {
	font-size: 32rpx;
	color: var(--baseColorAct);
	font-weight: 600;
	line-height: 64rpx;
	padding-top: 32rpx;
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
</style>
