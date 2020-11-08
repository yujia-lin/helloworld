<template>
	<scroll-view class="addressMask">
		<view class="addressReturn">
			<!-- <view class="addressReturnBtn" @click="addressReturn"><img class="addressReturnImg" src="./images/right_icon.png"/></view> -->
			<view class="addressTitle">{{addressTitle}}</view>
		</view>
		<view class="addressList provienceList" v-if="cityList.length==0">
			<view class="addressItem"  v-for="(item,index) in provienceList" @click="addressChange('provience',index,item.name)">{{item.name}}</view>
		</view>
		<view class="addressList cityList" v-if="cityList.length>0 && countyList.length==0">
			<view class="addressItem"  v-for="(item,index) in cityList" @click="addressChange('city',index,item.name)">{{item.name}}</view>
		</view>
		<view class="addressList countyList" v-if="countyList.length>0">
			<view class="addressItem"  v-for="(item,index) in countyList" @click="addressChange('county',index,item.name)">{{item.name}}</view>
		</view>
	</scroll-view>
</template>

<script>
	var addressJ = require('../config/addressArr.js')
	export default {
		props:{
			// addressVal:{
			// 	type:String
			// }
		},
		data() {
			return {
				provience:"",
				city:"",
				county:"",
				addressTitle:"省",
				provienceList:addressJ.data,
				cityList:[],
				countyList:[],
			};
		},
		methods:{
			addressReturn:function(){
				if(this.addressTitle=='省'){
				}else if(this.addressTitle=='市'){
					this.cityList=[]
					this.addressTitle="省"
				}else if(this.addressTitle=='区'){
					this.countyList=[]
					this.addressTitle="市"
				}
			},
			addressChange:function(type,index,name){
				this[type]=name;
				if(type=="provience"){
					this.pid=index;
					this.cityList=this.provienceList[index].child;
					this.addressTitle="市"
				}else if(type=="city"){
					this.countyList=this.provienceList[this.pid].child[index].child;
					this.cid=index;
					this.addressTitle="区"
				}else if(type=="county"){
					this.region=this.provience+' '+this.city+' '+this.county;
					var obj={
						region:this.region,
						provience:this.provience,
						city:this.city,
						county:this.county,
					}
					this.$emit('setAddress',obj);
				}
			},
		}
	}
</script>

<style>
.addressMask{
	background: #fff;
	z-index: 100;
}
.addressReturn{
	height: 88rpx;
	border-bottom: 2rpx solid #ccc;
	background: #fff;
	position: relative;
}
.addressTitle{
	font-size: 44rpx;
	text-align: center;
    line-height: 88rpx;
}
.addressList{
	height: 100%;
	overflow: auto;

	/*max*/
}
.addressItem{
	height: 80rpx;
	line-height: 80rpx;
	padding-left: 24rpx;
	border-bottom: 2rpx solid #ccc;
	cursor: pointer;
	font-size: 24rpx;
}
</style>
