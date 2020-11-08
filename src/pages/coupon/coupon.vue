<template>
    <view>
        <!-- #ifdef MP-WEIXIN -->
        <view v-if="isCanUse">
            <view>
                <view class='header'>
                    <image src='../../static/filterItemDownAct.png'></image>
                </view>
                <view class='content'>
                    <view>申请获取以下权限</view>
                    <text>获得你的公开信息(昵称，头像、地区等)</text>
                </view>

                <button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
                    授权登录
                </button>
            </view>
        </view>
        <!-- #endif -->
    </view>
</template>
<script>
	var api = require('../../config/api.js')
	import qs from 'qs'
    export default {
        data() {
            return {
                SessionKey: '',
                OpenId: '',
                nickName: null,
                avatarUrl: null,
                isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
            };
        },
        methods: {
            //第一授权获取用户信息===》按钮触发
            wxGetUserInfo() {
                let _this = this;
				
				uni.request({
					url:api.getWechatSign,
					method:"POST",
					data:{},
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (result) => {
						var  appid="wxbf5fa3d3954f012c";
						var  secret="cd61588b5813c7bd9849be2b9d5c7562Z";
						uni.login({
							provider: 'weixin',
							success: function(res) {
							console.log(res)
							let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +res.code + '&grant_type=authorization_code';
								uni.request({
									url: url, // 请求路径
									data:{},
									success: result => {
										var code=result.data.openid
										_this.getUserinfo(code);
									},
								});
							}
						});
						// _this.toUser(res.data.data);
				    }
				});
			
            },　　　　　　//登录
			getUserinfo:function(code){
				var _this=this;
				var obj={
					code:code
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.getUsersInfo,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						console.log(res)
						// _this.toUser(res.data.data);
				    }
				});
			},
           login() {
                let _this = this;
                // uni.showLoading({
                //     title: '登录中...'
                // });
             
               // 1.wx获取登录用户code
                uni.login({
                    provider: 'weixin',
                    success: function(loginRes) {
                        let code = loginRes.code;
                        if (!_this.isCanUse) {
                            //非第一次授权获取用户信息
                            uni.getUserInfo({
                                provider: 'weixin',
                                success: function(infoRes) { 　　　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
                                    let nickName = infoRes.userInfo.nickName; //昵称
                                    let avatarUrl = infoRes.userInfo.avatarUrl; //头像
                                        // _this.updateUserInfo();//调用更新信息方法
                                }
                            });
                        }
            
                        //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
                        uni.request({
                            url: '服务器地址',
                            data: {
                                code: code,
                            },
                            method: 'GET',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: (res) => {
                                //openId、或SessionKdy存储//隐藏loading
                                uni.hideLoading();
                            }
                        });
                    },
                });
            },
         //向后台更新信息
            // updateUserInfo() {
            //     let _this = this;
            //     uni.request({
            //         url:'url' ,//服务器端地址
            //         data: {
            //             appKey: this.$store.state.appKey,
            //             customerId: _this.customerId,
            //             nickName: _this.nickName,
            //             headUrl: _this.avatarUrl
            //         },
            //         method: 'POST',
            //         header: {
            //             'content-type': 'application/json'
            //         },
            //         success: (res) => {
            //             if (res.data.state == "success") {
            //                 uni.reLaunch({//信息更新成功后跳转到小程序首页
            //                     url: '/pages/index/index'
            //                 });
            //             }
            //         }
                   
            //     });
            // }
        },
        onLoad() {//默认加载
            this.login();
        }
    }
</script>
<style>
 .header {
        margin: 90rpx 0 90rpx 50rpx;
        border-bottom: 1px solid #ccc;
        text-align: center;
        width: 650rpx;
        height: 300rpx;
        line-height: 450rpx;
    }

    .header image {
        width: 200rpx;
        height: 200rpx;
    }

    .content {
        margin-left: 50rpx;
        margin-bottom: 90rpx;
    }

    .content text {
        display: block;
        color: #9d9d9d;
        margin-top: 40rpx;
    }

    .bottom {
        border-radius: 80rpx;
        margin: 70rpx 50rpx;
        font-size: 35rpx;
    }
</style>
