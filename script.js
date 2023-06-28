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
  let hai = $("#inputPai").val();
  let s = Majiang.Shoupai.fromString(hai);
  let xiangtingCount = Majiang.Util.xiangting(s);
  let tingpaiList = Majiang.Util.tingpai(s);
  let pai = Majiang.UI.pai($("#loaddata"));

  $("#xiangting").text(xiangtingCount);
  $("#yukouhai").html(toHaiImg(tingpaiList));
  new Majiang.UI.Shoupai($("#tehaiDisplay"), pai, s, true).redraw();
};
