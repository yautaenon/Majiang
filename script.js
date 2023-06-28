const Majiang = require("@kobalab/majiang-core");
const { hule_param } = require("@kobalab/majiang-core/lib/hule");
Majiang.UI = require("@kobalab/majiang-ui");
// function console(content) {
//   return (document.querySelector("#console").innerText += "\n" + content);
// }
// window.onerror = (message, file, lineNo, colNo, error) => {
//   console(message);
// };
// window.addEventListener("unhandledrejection", function (event) {
//   console(event.reason);
// });
let s, xiangtingCount;
const setup = () => {
  let zimoPai = Array.from(document.querySelectorAll(".yukouhai .pai"));
  zimoPai.forEach((e) => {
    let paiIdentify = e.dataset.pai;
    e.addEventListener("click", () => {
      // s.zimo(paiIdentify);
      // $("#inputPai").val(s.toString());
      $("#inputPai").val($("#inputPai").val() + paiIdentify);
      calculate("zimo");
    });
  });
};
setup();
const calculate = (action) => {
  let hai = $("#inputPai").val();
  s = Majiang.Shoupai.fromString(hai);
  $("#inputPai").val(s.toString());
  xiangtingCount = Majiang.Util.xiangting(s);
  let tingpaiList = Majiang.Util.tingpai(s) || [];
  let pai = Majiang.UI.pai($("#loaddata"));
  $("#xiangting").text(xiangtingCount);
  new Majiang.UI.Shoupai($("#tehaiDisplay"), pai, s, true).redraw();
  // $("#yukouhai").html("");
  // splitedTingpaiList = [];
  // for (let i = 0; i < tingpaiList.length; i += 12) {
  //   splitedTingpaiList.push(tingpaiList.slice(i, i + 12));
  // }
  // let cnt = 0;
  // splitedTingpaiList.forEach((e) => {
  //   let el = document.createElement("div");
  //   el.id = `yukouhai_${cnt}`;
  //   el.className = "yukouhai";
  //   let bingpai = document.createElement("div");
  //   bingpai.className = "bingpai";
  //   el.append(bingpai);
  //   $("#yukouhai").append(el);
  //   let pail = Majiang.Shoupai.fromString(e.join(""));
  //   new Majiang.UI.Shoupai($(`#yukouhai_${cnt}`), pai, pail, true).redraw();
  //   cnt++;
  // });
  Array.from(document.querySelectorAll(".yukouhai .pai.glow")).map((e) => e.classList.remove("glow"));
  tingpaiList.forEach((e) => {
    document.querySelector('#yukouhai .pai[data-pai="' + e + '"]').classList.add("glow");
  });
  if (!action) {
    action = Array.from(document.querySelectorAll("#tehaiDisplay .bingpai .pai")).length % 2 == 0 ? "zimo" : "dapai";
  }
  if (action == "zimo") {
    let zimoPai = Array.from(document.querySelectorAll(".yukouhai .pai"));
    zimoPai.map((e) => e.classList.add("darker"));
    let dapaiTingpaiCount = [];
    let dapaiPai = Array.from(document.querySelectorAll("#tehaiDisplay .bingpai .pai"));
    dapaiPai.forEach((e) => {
      let paiIdentify = e.dataset.pai;
      let tmpShouhai = s.clone();
      tmpShouhai.dapai(paiIdentify);
      if (Majiang.Util.xiangting(tmpShouhai) > xiangtingCount) {
        e.classList.add("darker");
        e.dataset.tingpaiCount = 0;
      } else e.dataset.tingpaiCount = (Majiang.Util.tingpai(tmpShouhai) || []).length;
      dapaiTingpaiCount.push(e.dataset.tingpaiCount);
      e.addEventListener("click", () => {
        s.dapai(paiIdentify);
        $("#inputPai").val(s.toString());
        calculate("dapai");
      });
    });
    console.log(Math.max(...dapaiTingpaiCount));
    Array.from(document.querySelectorAll('#tehaiDisplay .bingpai .pai[data-tingpai-count="' + Math.max(...dapaiTingpaiCount) + '"]')).map((e) => e.classList.add("glow"));
  } else if (action == "dapai") {
    let dapaiPai = Array.from(document.querySelectorAll("#tehaiDisplay .bingpai .pai"));
    dapaiPai.map((e) => e.classList.add("darker"));
    let zimoPai = Array.from(document.querySelectorAll(".yukouhai .pai.darker"));
    zimoPai.map((e) => e.classList.remove("darker"));
    // let zimoPai = Array.from(document.querySelectorAll(".yukouhai .pai"));
    // zimoPai.forEach((e) => {
    //   let paiIdentify = e.dataset.pai;
    //   e.addEventListener("click", () => {
    //     s.zimo(paiIdentify);
    //     $("#inputPai").val(s.toString());
    //     calculate("zimo");
    //   });
    // });
  }
  if (xiangtingCount == -1) {
    let huleResult = Majiang.Util.hule(
      s,
      null,
      hule_param({ zhuangfeng: $("#option #zhuangfeng").val(), menfeng: $("#option #menfeng").val(), baopai: $("#option #dora").val().split(" "), changbang: 1, lizhibang: 0 })
    );
    console.log(huleResult);
    $("#result #points #point").text(huleResult.defen);
    $("#result #points #han").text(huleResult.fanshu);
    $("#result #points #fu").text(huleResult.fu);
    $("#result #yaku").html("");
    huleResult.hupai.forEach((e) => {
      let el = document.createElement("li");
      el.textContent = e.name + " ―― " + e.fanshu;
      $("#result #yaku").append(el);
    });
  } else {
    $("#result #points #point").text("");
    $("#result #points #han").text("");
    $("#result #points #fu").text("");
    $("#result #yaku").html("");
  }
};
