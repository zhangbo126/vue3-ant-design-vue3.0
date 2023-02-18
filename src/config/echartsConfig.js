
import { getAssetsImage } from '@/utils/utilityFunction.js'
import * as echarts from "echarts";
/**
 *  @description GEO_3D_OPTIONS 3d地球配置信息
 *    
 */
export const GEO_3D_OPTIONS = {
	globe: {
		baseTexture: getAssetsImage('earth_geo_1.jpg'),
		heightTexture: getAssetsImage('earth_geo_3.jpg'),
		displacementScale: 0.1,
		globeRadius: 80,
		globeOuterRadius: 130,
		shading: 'color',
		// 配置为垂直渐变的背景
		// environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		// 	offset: 0, color: '#00aaff' // 天空颜色
		// }, {
		// 	offset: 0.7, color: '#998866' // 地面颜色
		// }, {
		// 	offset: 1, color: '#998866' // 地面颜色
		// }], false),
		// environment:getAssetsImage('earth_geo_2.jpg'),
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
			}
		},
		layers: [
			{
				type: 'blend',
				blendTo: 'emission',
				texture: getAssetsImage('earth_geo_4.jpg')
			},
			{
				type: 'overlay',
				texture: getAssetsImage('earth_geo_4.png'),
				shading: 'color',
				distance: 5
			}
		]
	},
}