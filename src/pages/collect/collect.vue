<template>
	<view class="orderMain" id="orderMain"  >
		<view v-if="statusFlag">
			<view class="orderNotHave" v-show="statusFlag" v-if="collectList.length<1">
				<image class="orderNotImg" src="../../static/orderno.png"></image>
				<view class="orderNotText">您暂时没有收藏商品</view>
			</view>
		</view>
		<view class="collectList" v-if="collectList.length>0">
			<view class="collectListItem" v-for="item in collectList">
				<view href="javascript:;" @click="goDetail(item.pid)" class="ui-show">
					<view class="orderListItemBase f_flex">
						<image :src="url+item.activity_img" class="orderListItemImg"></image>
						<view class="orderListItemBaseText z_flex">
							<view class="orderListItemTitle">{{item.title}}</view>
							<view class="orderListItemPrice clear">价格￥{{item.sell_price}}<image class="orderListItemDeleteBtn" src="../../static/delicon.png" mode="" @click.stop="delcollect(item.pid)"></image></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	var api = require('../../config/api.js')
	import qs from 'qs'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				addressFlag:false,
				url:"",
				uid:null,
				statusFlag:false,
				collectList:[],
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
		},
		onShow() {
			this.getCollectList();
		},
		methods: {
			delcollect:function(id){
				var _this=this;
				var obj={
					uid:this.uid,
					pid:id,
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
						// var text
						var msg=res.data.msg
						
						uni.showToast({
						    title: msg,
							icon:'none',
						    duration: 1000
						});
						_this.getCollectList();
				    }
				});
			},
			goDetail:function(id){
				uni.navigateTo({
				    url: '../details/details?id='+id
				});
			},
			getCollectList:function(){
				var _this=this;
				var obj={
					uid:this.uid
				}
				obj = qs.stringify(obj);
				_this.statusFlag=true;
				uni.request({
				    url: api.getCollectList,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							var data=e.data;
							_this.url=e.url; 
							_this.collectList=data;
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
.orderNotHave {
	padding-top: 280rpx;
	display: none;
}
.orderNotImg {
	display: block;
	margin: 0 auto;
	width: 522rpx;
}
.orderNotText {
	text-align: center;
	line-height:100rpx;
	font-size: 40rpx;
	color: #333;
}
.collectListItem {
	background: #fff;
	border-bottom: 4rpx solid #f5f5f5;
}

.orderListItemDeleteBtn {
	width: 64rpx;
	height: 64rpx;
	float: right;
}
.orderListItemBase {
	padding: 20rpx 30rpx;
	font-size: 32rpx;
}
.orderListItemBaseText {
	font-size: 32rpx;
	padding-left: 30rpx;
}
.orderListItemImg {
	width: 200rpx;
	height: 200rpx;
}
.orderListItemTitle {
	font-size: 28rpx;
    line-height: 36rpx;
    height: 72rpx;
    overflow: hidden;
}
.orderListItemPrice {
	font-size: 32rpx;
	color: #FF444C;
	font-weight: 600;
	line-height: 64rpx;
	padding-top: 32rpx;
}
</style>
