
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
		viewControl: {
			// zoomSensitivity: false,
			// autoRotateDirection: 'ccw',
			// autoRotateSpeed: 6,
			// rotateSensitivity: 1.2,
			// panSensitivity: 1.2,
			// alpha: 40,
			// beta: 60,
			// animation: true,
			// minAlpha: -19000,
			// maxAlpha: 19000,
			// damping: 0,
			// autoRotateAfterStill: 0.1,
			// targetCoord: [114, 46],
			// autoRotate: true
		},

	},
	series: [
		{
			type: 'lines3D',
			effect: {
				constantSpeed: 14,
				show: true,
				trailWidth: 2,
				trailColor: '#0052d9',
				trailOpacity: 0.8,
				period: 4, // 尾迹特性周期
				trailLength: 0.05 // 尾迹0~1，线条长度的百分比
			},
			lineStyle: {
				color: '#0052d98a',
				width: 0.4,
				opacity: 0.5
			},
			data: [
				[[114.175193, 41.275706], [120.4574, -1.743046]],
				[[126.964746, 37.58644], [139.767187, 35.715616]],
				[[-118.24762, 34.058993], [139.767187, 35.715616]],
				[[114.175193, 41.275706], [100.454152, 13.731434]],
				[[114.175193, 22.275706], [2.332962, 48.864677]],
				[[101.684555, 3.15663], [114.175193, 22.275706]],
				[[78.64768, 21.75974], [102.71153, 31.90678]],
				[[39.48235, 29.84961], [114.767187, 38.74912]],
				[[126.964746, 37.58644], [120.4574, -1.743046]],
				[[7.13894, 50.11034], [24.80034, -27.57313]],
				[[99.79829, 17.13197], [198.47369, 69.55674]]
				// [[151.210446, -33.875774], [2.332962, 48.864677]]
			]
		}

	]
	// series: [
	// 	{
	// 		type: "lines3D",
	// 		effect: {
	// 			show: true,
	// 			period: 3, // 尾迹特性周期
	// 			trailLength: 0.1, // 尾迹0~1，线条长度的百分比
	// 		},
	// 		lineStyle: {
	// 			color: "#d9d919",
	// 			width: 2,
	// 			opacity: 0.4,
	// 		},
	// 		data: [
	// 			[[114.175193, 22.275706], [120.4574, -1.743046]],
	// 			[[126.964746, 37.58644], [139.767187, 35.715616]],
	// 			[[-118.24762, 34.058993], [139.767187, 35.715616]]
	// 		]
	// 	},
	// 	{
	// 		type: "lines3D",
	// 		lineStyle: {
	// 			color: "#fff",
	// 			width: 2,
	// 			opacity: 0.6,
	// 		},
	// 		// data: this.normalData(this.linesData),
	// 		data: [
	// 			[[114.175193, 22.275706], [100.454152, 13.731434]],
	// 			[[114.175193, 22.275706], [2.332962, 48.864677]],
	// 			[[101.684555, 3.15663], [114.175193, 22.275706]],
	// 			[[-118.24762, 34.058993], [151.210446, -33.875774]]
	// 		]
	// 	},
	// 	{
	// 		type: "scatter3D",
	// 		coordinateSystem: "globe",
	// 		zlevel: 3,
	// 		label: {
	// 			show: true,
	// 			position: "bottom",
	// 			formatter: "{b}",
	// 			fontSize: 16
	// 		},
	// 		itemStyle: {
	// 			color: "#d9d919",
	// 		},
	// 		data: [
	// 			{ "name": "香港", "value": [114.175193, 22.275706] },
	// 			{ "name": "东京", "value": [139.767187, 35.715616] },
	// 			{ "name": "首尔", "value": [126.964746, 37.58644] },
	// 			{ "name": "印尼", "value": [120.4574, -1.743046] },
	// 			{ "name": "洛杉矶", "value": [-118.24762, 34.058993] }
	// 		],
	// 	},
	// 	{
	// 		type: "scatter3D",
	// 		coordinateSystem: "globe", // 使用的坐标系
	// 		zlevel: 3,
	// 		label: {
	// 			show: true,
	// 			position: "bottom",
	// 			fontSize: 16
	// 		},
	// 		itemStyle: {
	// 			color: "#fff",
	// 		},
	// 		data: [
	// 			{ "name": "吉隆坡", "value": [101.684555, 3.15663] },
	// 			{ "name": "曼谷", "value": [100.454152, 13.731434] },
	// 			{ "name": "悉尼", "value": [151.210446, -33.875774] },
	// 			{ "name": "巴黎", "value": [2.332962, 48.864677] }
	// 		]
	// 	}
	// ]
}