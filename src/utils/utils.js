export const isObject = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Object]";
};
export const testColor = function(color) {
  const hexn = /^([0-9a-f]{6}|[0-9a-f]{3})$/i
  const hex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
  const rgb = /^rgb\(([0-9]{1,2}|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),\s*([0-9]{1,2}|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),\s*([0-9]{1,2}|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i
  const rgba = /^rgba\(([0-9]{1,2}|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),\s*([0-9]{1,2}|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),\s*([0-9]{1,2}|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]),\s*([0-1](\.[0-9]{1,2})?)\)$/i
  if(rgb.test(color)) {
    return "rgb"
  } else if(hexn.test(color)) {
    return "hexn"
  } else if(hex.test(color)) {
    return "hex"
  } else if (rgba.test(color)) {
    return "rgba"
  } else {
    console.error(`${color}不是合法的颜色值`)
    return false;
  }
}
