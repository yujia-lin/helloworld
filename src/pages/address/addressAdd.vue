<template>
	<view>
		<view class="addressAdd" v-if="addressAddFlag">
			<view class="addressAddMain">
				<view class="addressAddInputBox">
					<view class="addressAddInput f_flex">
						<view class="z_flex addressAddInputT">收货人</view>
						<input type="text" v-model="name" placeholder="请填写收货人姓名" class="addressAddText"/>
					</view>
					<view class="addressAddInput f_flex">
						<view class="z_flex addressAddInputT">手机号</view>
						<input type="text" v-model="phone" maxlength="11" placeholder="请填写手机号" class="addressAddText"/>
					</view>
					<view class="addressAddInput f_flex">
						<view class="z_flex addressAddInputT">所在地区</view>
						<input type="text" v-model="region" placeholder="请选择地区" @click="selectAddress" class="addressAddText" readonly="readonly"/>
					</view>
					<view class="addressAddtextareaBox f_flex">
						<view class="z_flex addressAddInputT">详细地址</view>
						<textarea name="" v-model="detailed" rows="" cols="" placeholder="请填写详细地址" class="addressAddtextarea"></textarea>
					</view>
				</view>
				<view class="addressAddSwitch">
					<view class="addressAddSwitchText">
						设置默认地址
					</view>
					<view class="addressAddSwitchBtn" @click="addSwitch" :class="addressAddSwitchAct?'addressAddSwitchBtnAct':''"><view class="addressAddSwitchC"></view></view>
				</view>
				<view class="addressAddSave">
					<view class="addressAddSaveBtn" @click="addSave">保存</view>
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

</style>
