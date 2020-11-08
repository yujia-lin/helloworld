<template>
	<view class="uni-padding-wrap">
	    <view class="page-section swiper">
	        <view class="page-section-spacing">
	            <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" circular="true" :interval="interval" :duration="duration">
	                <swiper-item v-for="(item,index) in list " class="bannerImgBox">
						<image :src="item" mode="scaleToFill" class="bannerImg"></image>
	                </swiper-item>
	            </swiper>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
			}
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			};
		},
		onShow() {
			console.log(this.list+"---")
		},
		methods: {
		    changeIndicatorDots(e) {
		        this.indicatorDots = !this.indicatorDots
		    },
		    changeAutoplay(e) {
		        this.autoplay = !this.autoplay
		    },
		    intervalChange(e) {
		        this.interval = e.target.value
		    },
		    durationChange(e) {
		        this.duration = e.target.value
		    }
		}
	}
</script>

<style>
.bannerImg{
	width: 100%;
	height: 100%;
}
.uni-padding-wrap{
	overflow: hidden;
}
.swiper{
	width: 750rpx;
	height: 750rpx;
}
</style>
