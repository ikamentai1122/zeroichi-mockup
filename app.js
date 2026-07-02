/* ボスマッチ — pitch 用モックの共有データ & ロジック。
   依存なし。求職者が送った「ライク」は localStorage 経由で
   事業者ダッシュボード(employer.html)に届く = デモで生きて見える。 */

// 登録事業者(デモは1社固定)
const BIZ = {
  name: "博栄空調設備(株)",
  area: "福岡市博多区",
  trade: "空調・給排水設備",
  size: "従業員 28名",
};

// 現場の「教える先輩」= 指導者。求職者はこの人たちを見てライクする。
const MENTORS = [
  {
    id: "m1", name: "田中 健一", initial: "田", color: "#3b6ea5",
    grad: "linear-gradient(140deg,#5a8fc9,#2f5a8c)",
    role: "設備施工管理 / 主任", years: "この道 12年",
    prevJob: "元・自動車ディーラー営業(7年)",
    trained: 5, rating: 4.8, online: true,
    style: "最初の3ヶ月は隣について教えます。怒鳴りません。分からないのは当たり前。",
    aboutDay: "朝礼→現場巡回→図面確認を一緒に。昼は皆で外食、夕方は片付けと翌日段取り。",
    tags: ["未経験を5人育てた", "元ホワイト出身", "資格取得を支援"],
    intro: "営業から現場に移って12年になります。最初は図面も読めなかった側なので、新しい人がどこでつまずくかは大体分かるつもりです。分からないことはその都度聞いてもらえれば、一緒に確認します。休みは糸島で釣りをしてることが多いです。",
    facts: [
      { k: "趣味", v: "海釣り、サウナ、高校野球観戦" },
      { k: "保有資格", v: "1級管工事施工管理技士" },
    ],
  },
  {
    id: "m2", name: "佐藤 美和", initial: "佐", color: "#c2603a",
    grad: "linear-gradient(140deg,#e0824f,#a84e2c)",
    role: "電気工事 / 職長", years: "この道 9年",
    prevJob: "元・一般事務(派遣・5年)",
    trained: 3, rating: 4.9, online: true,
    style: "私自身が事務から転職組。書類の作法は活きます。手元仕事は1から。",
    aboutDay: "盤の配線・点検に同行。記録と写真整理は前職スキルがそのまま武器に。",
    tags: ["事務→現場の当事者", "女性も活躍", "残業少なめ現場"],
    intro: "事務から電気工事に移って9年、今は職長をしています。自分も未経験から入ったので、最初の「何が分からないかも分からない」感じはよく覚えています。細かいことでも聞いてもらえれば大丈夫です。",
    facts: [
      { k: "趣味", v: "週末のパン作り、保護猫2匹" },
      { k: "得意", v: "前職スキルで現場写真・記録の整理" },
    ],
  },
  {
    id: "m3", name: "山口 大輔", initial: "山", color: "#2e7d6b",
    grad: "linear-gradient(140deg,#3f9c87,#215c4f)",
    role: "施工管理 / 現場代理人", years: "この道 15年",
    prevJob: "高卒入社・たたき上げ",
    trained: 8, rating: 4.6, online: false,
    style: "厳しい時は厳しい。でも理由を必ず言う。安全のための声出しは怒りじゃない。",
    aboutDay: "工程・安全管理が主。体力より段取り力。PCと電話が多い1日。",
    tags: ["年収例 480万〜", "管理職ルート", "土日休み現場あり"],
    intro: "高卒で入って15年、ずっと現場でやってきました。言い方はきついとよく言われますが、理不尽に怒ることはないです。指摘するときは理由を添えるようにしています。休みは車をいじってることが多いです。",
    facts: [
      { k: "休日", v: "旧車のレストア / ソロキャンプ" },
    ],
  },
  {
    id: "m4", name: "中村 涼", initial: "中", color: "#8a5cc2",
    grad: "linear-gradient(140deg,#a874e0,#6f45a0)",
    role: "空調設備 / 育成担当", years: "この道 6年",
    prevJob: "元・販売店員(アパレル)",
    trained: 4, rating: 4.7, online: true,
    style: "接客やってた人は現場でも強い。お客さん対応を任せられる人が伸びます。",
    aboutDay: "取付・試運転に同行。午後は先輩とペアで1件。質問しやすい空気を作ります。",
    tags: ["接客出身歓迎", "20代多め", "教育マニュアルあり"],
    intro: "販売職から転職して6年、今は新しく入った人の教育を担当しています。現場は20代も多いです。分からないことを抱え込まれるのが一番困るので、気になったことは何でも聞いてください。",
    facts: [
      { k: "趣味", v: "社会人フットサル、カフェ巡り" },
    ],
  },
];

const LIKES_KEY = "ichinichi_likes_v1";

function loadLikes() {
  try { return JSON.parse(localStorage.getItem(LIKES_KEY) || "[]"); }
  catch (e) { return []; }
}
function saveLikes(arr) { localStorage.setItem(LIKES_KEY, JSON.stringify(arr)); }

// 事業者が商談中に登録した先輩(localStorage)。デフォルト4名に上乗せ表示。
const CUSTOM_MENTORS_KEY = "ichinichi_custom_mentors_v1";
const MENTOR_COLORS = ["#3b6ea5", "#c2603a", "#2e7d6b", "#8a5cc2", "#b5482f", "#4a7a3a"];
const MENTOR_GRADS = {
  "#3b6ea5": "linear-gradient(140deg,#5a8fc9,#2f5a8c)",
  "#c2603a": "linear-gradient(140deg,#e0824f,#a84e2c)",
  "#2e7d6b": "linear-gradient(140deg,#3f9c87,#215c4f)",
  "#8a5cc2": "linear-gradient(140deg,#a874e0,#6f45a0)",
  "#b5482f": "linear-gradient(140deg,#d86a49,#9a3a24)",
  "#4a7a3a": "linear-gradient(140deg,#66a052,#39602c)",
};
// 先輩アバターの塗り(グラデ優先、なければ単色)
function mentorFill(m) { return (m && (m.grad || MENTOR_GRADS[m.color])) || (m && m.color) || "#3b6ea5"; }
function loadCustomMentors() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_MENTORS_KEY) || "[]"); }
  catch (e) { return []; }
}
function saveCustomMentor(m) {
  const arr = loadCustomMentors();
  arr.push(m);
  localStorage.setItem(CUSTOM_MENTORS_KEY, JSON.stringify(arr));
}
function allMentors() { return MENTORS.concat(loadCustomMentors()); }
function mentorById(id) { return allMentors().find(m => m.id === id); }

// デモ用の求職者プロフィール(ライクの送り主として表示)
const DEMO_SEEKER = {
  name: "高橋 さん(28)",
  prev: "元・一般事務(3年) / 福岡市在住",
  note: "PC作業は得意。体を動かす仕事に変えたい。施工管理に興味。",
};

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("show"), 2600);
}
