  //判断滚动方向
 export const getDirection = (x, y)=> {
    if (x > y) {
      return 'horizontal';
    }
    if (y > x) {
      return 'vertical';
    }
    return '';
  },