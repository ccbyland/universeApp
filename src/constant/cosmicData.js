/**
 * 名称
 * 距太阳距离 模拟间距
 * 半径 模拟半径
 * 自转周期 真实数据，单位分钟
 * 公转周期 真实数据，单位天
 */
export const galaxyList = [{
  'id': 'sun',
  'textureImg': '2k_sun.jpeg',
  'name': '太阳',
  'distance': 0, // 距离
  'radius': 500, // 半径
  'rotationRadian': 0.002, // 自转速度
  'revolutionRadian': 0.02, // 公转速度
  'revolutionDirection': 'along', // 公转方向 along顺时针\anti逆时针
  'isLuminous': true, //自发光
  'subset': [{
      'id': 'mercury',
      'name': '水星',
      'textureImg': '2k_mercury.jpeg',
      'distance': 1000, // 距离
      'radius': 50, // 半径
      'rotationRadian': 0.002, // 自转速度
      'revolutionRadian': 0.01, // 公转速度
      'revolutionDirection': 'along', // 公转方向
      'isLuminous': false, //自发光
    },
    {
      'id': 'venus',
      'name': '金星',
      'textureImg': '2k_venus.jpeg',
      'distance': 1500, // 距离
      'radius': 80, // 半径
      'rotationRadian': 0.005, // 自转速度
      'revolutionRadian': 0.008, // 公转速度
      'revolutionDirection': 'anti', // 公转方向
      'isLuminous': false, // 自发光
    },
    {
      'id': 'earth',
      'textureImg': '8k_earth.jpeg',
      'name': '地球',
      'distance': 2000, // 距离
      'radius': 120, // 半径
      'rotationRadian': 0.0055, // 自转速度
      'revolutionRadian': 0.0015, // 公转速度
      'revolutionDirection': 'along', // 公转方向
      'isLuminous': false, //自发光
      'satelliteList': [{
        'id': 'moon',
        'textureImg': '2k_moon.jpeg',
        'name': '月球',
        'distance': 0, // 距离
        'radius': 40, // 半径
        'rotationRadian': 0.035, // 自转速度
        'revolutionRadian': 0.015, // 公转速度
        'revolutionDirection': 'along', // 公转方向
        'isLuminous': false, // 自发光
      }]
    },
    {
      'id': 'mars',
      'textureImg': '2k_mars.jpeg',
      'name': '火星',
      'distance': 2500, // 距离
      'radius': 110, // 半径
      'rotationRadian': 0.005, // 自转速度
      'revolutionRadian': 0.001, // 公转速度
      'isLuminous': false, // 自发光
    },
    {
      'id': 'jupiter',
      'textureImg': '2k_jupiter.jpeg',
      'name': '木星',
      'distance': 3000, // 距离
      'radius': 110, // 半径
      'rotationRadian': 0.007, // 自转速度
      'revolutionRadian': 0.0045, // 公转速度
      'revolutionDirection': 'along', // 公转方向
      'isLuminous': false, // 自发光
    },
    {
      'id': 'saturn',
      'textureImg': '2k_saturn.jpeg',
      'haloTextureImg': '2k_saturn_ring.png',
      'name': '土星',
      'distance': 3500, // 距离
      'radius': 120, // 半径
      'rotationRadian': 0.02, // 自转速度
      'revolutionRadian': 0.0025, // 公转速度
      'revolutionDirection': 'along', // 公转方向
      'isLuminous': false, // 自发光
    },
    {
      'id': 'uranus',
      'textureImg': '2k_uranus.jpeg',
      'name': '天王星',
      'distance': 4000, // 距离
      'radius': 90, // 半径
      'rotationRadian': 0.001, // 自转速度
      'revolutionRadian': 0.003, // 公转速度
      'revolutionDirection': 'along', // 公转方向
      'isLuminous': false, // 自发光
    },
    {
      'id': 'neptune',
      'textureImg': '2k_neptune.jpeg',
      'name': '海王星',
      'distance': 4500, // 距离
      'radius': 80, // 半径
      'rotationRadian': 0.002, // 自转速度
      'revolutionRadian': 0.0035, // 公转速度
      'revolutionDirection': 'along', // 公转方向
      'isLuminous': false, // 自发光
    }
  ]
}]