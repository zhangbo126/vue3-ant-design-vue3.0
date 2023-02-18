
import { drawAssetsImage } from '@/utils/utilityFunction.js'
import * as echarts from "echarts";
/**
 *  @description GEO_3D_OPTIONS 3d地球配置信息
 *    
 */
export const GEO_3D_OPTIONS = {
	globe: {
		baseTexture: drawAssetsImage('earth_geo_1.jpg'),
		heightTexture: drawAssetsImage('earth_geo_3.jpg'),
		displacementScale: 0.1,
		globeRadius: 60,
		globeOuterRadius: 100,
		shading: 'color',
		// 配置为垂直渐变的背景
		// environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		// 	offset: 0, color: '#00aaff' // 天空颜色
		// }, {
		// 	offset: 0.7, color: '#998866' // 地面颜色
		// }, {
		// 	offset: 1, color: '#998866' // 地面颜色
		// }], false),
		environment: drawAssetsImage('earth_geo_2.jpg'),
		// environment: [ { itemStyle: { normal: { color: '#fff', shadowBlur: 2, shadowColor: '#fff', opacity: 0.5 } } }, { type: 'image', repeat: 'no-repeat', url: 'https://www.your-url.com/image.jpg', width: 100, height: 100, left: 0, top: 0, z: -2 }, { type: 'lines3D', silent: true, effect: { show: true, trailWidth: 10, trailLength: 0.2, trailOpacity: 1, trailColor: '#fff' } } ],
		colorMaterial: {
			textureTiling: 5, //质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数。
		},
		light: {
			ambient: {
				intensity: 0.2,
				color: '#fff',

			},
			main: {
				intensity: 1.5,
				color: '#fff',
			},
		},
		//用于地球外部大气层相关设置。
		atmosphere: {
			show: true, //是否显示
			offset: 3, //外部大气层相对于默认位置的偏移
			color: '#fff',//外部大气层的颜色。
			glowPower: 20,//外部大气层发光功率
			innerGlowPower: 210,//外部大气层内发光功率
		},
		viewControl: {
			distance: 140 // 默认视角距离地球表面距离
		},
		layers: [
			{
				type: 'blend',
				blendTo: 'emission',
				texture: drawAssetsImage('earth_geo_4.jpg')
			},
			{
				type: 'overlay',
				texture: drawAssetsImage('earth_geo_4.png'),
				shading: 'color',
				distance: 5
			}
		],
	},
	series: [
		{
			type: "lines3D",
			effect: {
				show: true,
				period: 3, // 尾迹特性周期
				trailLength: 0.1, // 尾迹0~1，线条长度的百分比
			},
			lineStyle: {
				color: "#d9d919",
				width: 2,
				opacity: 0.4,
			},
			data: [
				[[114.175193, 22.275706], [120.4574, -1.743046]],
				[[126.964746, 37.58644], [139.767187, 35.715616]],
				[[-118.24762, 34.058993], [139.767187, 35.715616]]
			]
		},
		{
			type: "lines3D",
			lineStyle: {
				color: "#fff",
				width: 2,
				opacity: 0.6,
			},
			// data: this.normalData(this.linesData),
			data: [
				[[114.175193, 22.275706], [100.454152, 13.731434]],
				[[114.175193, 22.275706], [2.332962, 48.864677]],
				[[101.684555, 3.15663], [114.175193, 22.275706]],
				[[-118.24762, 34.058993], [151.210446, -33.875774]]
			]
		},
		{
			type: "scatter3D",
			coordinateSystem: "globe",
			zlevel: 3,
			label: {
				show: true,
				position: "bottom",
				formatter: "{b}",
				fontSize: 16
			},
			itemStyle: {
				color: "#d9d919",
			},
			data: [
				{ "name": "香港", "value": [114.175193, 22.275706] },
				{ "name": "东京", "value": [139.767187, 35.715616] },
				{ "name": "首尔", "value": [126.964746, 37.58644] },
				{ "name": "印尼", "value": [120.4574, -1.743046] },
				{ "name": "洛杉矶", "value": [-118.24762, 34.058993] }
			],
		},
		{
			type: "scatter3D",
			coordinateSystem: "globe", // 使用的坐标系
			zlevel: 3,
			label: {
				show: true,
				position: "bottom",
				formatter: "{b}",
				fontSize: 16
			},
			itemStyle: {
				color: "#fff",
			},
			data: [
				{ "name": "吉隆坡", "value": [101.684555, 3.15663] },
				{ "name": "曼谷", "value": [100.454152, 13.731434] },
				{ "name": "悉尼", "value": [151.210446, -33.875774] },
				{ "name": "巴黎", "value": [2.332962, 48.864677] }
			]
		}
	]
}