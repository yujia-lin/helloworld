<template>
	<view class="categoryContent ">
		<view class="categoryBox " >
			<view class="categoryList ui-fl" >
				<view  class="categoryNavItem" @click="getProductCate(item.cid)" :class="(categoryid==item.cid) ? 'categoryNavItemAct':''" v-for="item in categoryTitleList" >{{item.name}}</view>
			</view>
			<view class="categoryShowParent  ui-fl">
				<view id="categoryShowParentBox" >
					<view class="categoryShow  clear " v-for="item in categoryList">
						<view class="categoryShowTitle">{{item.name}}</view>
						<view @click="golist(itemz.cid)" class="categoryShowItem" v-for="itemz in item.children.data">
							<image class="categoryShowItemImg" :src="itemz.image" mode="widthFix"></image>
							<view class="categoryShowItemText">{{itemz.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var api = require('../../config/api.js')
	export default {
		data() {
			return {
				categoryTitleList:[],
				categoryList:[],
				categoryid:1
			}
		},
		onShow() {
			this.getProductCate();
		},
		methods: {
			golist:function(cid){
				uni.navigateTo({
					url: '../list/list?cid='+cid
				});
			},
			getProductCate:function(id){
				var _this=this;
				console.log(id)
				var id=id;
				if(!id){
					id=this.categoryid;
				}
				var obj={
					cid:id
				}
				uni.request({
				    url: api.getProductCate,
					data:obj,
				    success: (res) => {
						_this.categoryList=[];
						setTimeout(function(){
							var e=res.data;
							var data=e.info;
							var tlist=e.info;
							_this.categoryid=id
							for(var i = 0 ;i<data.length;i++){
								if(data[i].children){
									_this.categoryList=data[i].children;
									tlist[i].children=null;
									tlist[i].check=true;
									_this.categoryTitleList=tlist;
									break;
								}
							}
						},50)
						
				    }
				});
			},
			getProductCate1:function(id){
				console.log(1)
			}
		}
	}
</script>

<style>
#category{
	height: 100%;
}
.categoryContent {
	height: 100%;
	min-height: 100%;
	box-sizing: border-box;
}
.categoryShowTitle{
	font-size: 36rpx;
	line-height: 48rpx;
	padding-left: 20rpx
}
.categoryBox {
	height: 100%;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	/*padding-left: 86px;*/
}
.categoryShowParent{
	width: 75%;
	height: 100%;
	overflow-x:hidden; 
	overflow-y:auto; 

}
.categoryList {
	width: 25%;
	height: 100%;
	line-height: 92rpx;
	overflow-x:hidden; 
	overflow-y:auto; 
	background: #F8F8F8;

}

.categoryNavItem {
	font-size: 14px;
	color: #333;
	height: 92rpx;
	display: block;
	text-align: center;
}

.categoryNavItemAct {
	background: #fff;
	color: var(--baseColorAct);
}

.categoryMain {
	height: 100%;
	position: relative;
}



.categoryShowItem {
	width: 33.33333%;
	display: block;
	box-sizing: border-box;
	padding: 20rpx;
	float: left;
}

.categorySearch {
	height: 88rpx;
	border-bottom: 1px solid #E5E5E5;
	padding: 14rpx 80rpx;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
}

.categoryInput {
	width: 100%;
	height: 60rpx;
	display: block;
	box-sizing: border-box;
	padding-left: 24rpx;
	font-size: 24rpx;
	border: none;
	background: #f7f7f7;
	border-radius: 30rpx;
}


.categoryShowItemImg {
	width: 100%;
	margin: 0 auto;
	display: block;
}

.categoryShowItemText {
	font-size: 24rpx;
	line-height:32rpx;
	height:64rpx;
	overflow: hidden;
	text-align: center;
}
</style>
