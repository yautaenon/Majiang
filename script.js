// function console(content) {
//   return (document.querySelector("#console").innerText += "\n" + content);
// }
// window.onerror = (message, file, lineNo, colNo, error) => {
//   console(message);
// };
// window.addEventListener("unhandledrejection", function (event) {
//   console(event.reason);
// });
const toHaiImg = (paiList) => {
  return paiList;
};
const calculate = () => {
  let hai = document.querySelector("#inputPai").value;
  let s = Majiang.Shoupai.fromString(hai);
  let xiangtingCount = Majiang.Util.xiangting(s);
  let tingpaiList = Majiang.Util.tingpai(s);

  document.querySelector("#xiangting").textContent = xiangtingCount;
  document.querySelector("#yukouhai").innerHTML = toHaiImg(tingpaiList);
};
