import React, { useState, useEffect } from "react";

/* ─── Google Analytics ─── */
const GA_ID = "G-6C7D0XDP25";
const gaScript = document.createElement("script");
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
gaScript.async = true;
document.head.appendChild(gaScript);
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
window.gtag = gtag;
gtag("js", new Date());
gtag("config", GA_ID);

/* ─── Google Fonts ─── */
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;700;900&family=Noto+Serif+JP:wght@600;900&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

/* ══════════════════════════════
   MOCK DATA
══════════════════════════════ */
const USERS = [
  {
    id:1, name:"さくら", age:26, location:"東京・渋谷", avatar:"🌸", color:"#FF5C8A",
    oshi:"横浜流星", group:"Snow Man", energy:5, favSong:"Dangerholic",
    style:"全通派", travel:"高級ホテル派", lifeStage:"社会人オタ",
    fashionTags:["量産型","ガーリー"], family:"一人暮らし",
    bio:"現場遠征大好き！グッズ収集が趣味。一緒にうちわ作れる子いたら嬉しい💕",
    tags:["遠征OK","グッズ好き","うちわ自作"],
    badges:[
      {icon:"🎫",label:"現場マスター",desc:"50回以上の現場参加"},
      {icon:"✨",label:"取引丁寧",desc:"グッズ交換の評価★5"},
      {icon:"🏆",label:"認定ファン",desc:"推し歴クイズ合格"},
    ],
    oshiHistory:"4年", match:94, nowStatus:null,
  },
  {
    id:2, name:"みお", age:23, location:"神奈川・横浜", avatar:"🌿", color:"#4ECDC4",
    oshi:"目黒蓮", group:"Snow Man", energy:3, favSong:"Grandeur",
    style:"茶の間派", travel:"遠征は年1程度", lifeStage:"社会人オタ",
    fashionTags:["ナチュラル","清楚系"], family:"実家・兄妹あり",
    bio:"まったりペースで推し活してます🌿ランチしながらDVD鑑賞会したい！",
    tags:["DVD鑑賞","カフェ巡り","まったり派"],
    badges:[
      {icon:"✨",label:"取引丁寧",desc:"グッズ交換の評価★5"},
      {icon:"🏆",label:"認定ファン",desc:"推し歴クイズ合格"},
    ],
    oshiHistory:"2年", match:88, nowStatus:"お茶したい",
  },
  {
    id:3, name:"ゆい", age:29, location:"埼玉・大宮", avatar:"🎀", color:"#F5A623",
    oshi:"渡辺翔太", group:"Snow Man", energy:4, favSong:"W/Me",
    style:"厳選参戦派", travel:"夜行バス派", lifeStage:"ママ友推し活",
    fashionTags:["原宿系","ポップ"], family:"夫婦・子どもあり",
    bio:"子持ちオタクです！子連れOKのイベントや、子が寝てからオタ活仲間募集中🎀",
    tags:["子持ち歓迎","遠征OK","ペンライト自作"],
    badges:[
      {icon:"🎫",label:"現場マスター",desc:"50回以上の現場参加"},
      {icon:"👶",label:"ママ推し活",desc:"子育て中のファン認定"},
      {icon:"🏆",label:"認定ファン",desc:"推し歴クイズ合格"},
    ],
    oshiHistory:"6年", match:81, nowStatus:"写真撮り合いたい",
  },
  {
    id:4, name:"れな", age:31, location:"大阪・梅田", avatar:"💜", color:"#A78BFA",
    oshi:"深澤辰哉", group:"Snow Man", energy:3, favSong:"Crazy F-R-E-S-H Beat",
    style:"茶の間派", travel:"高級ホテル派", lifeStage:"社会人オタ",
    fashionTags:["モード","ストリート"], family:"パートナーあり",
    bio:"関西勢！大阪・神戸エリアで現場行ける人大歓迎〜！フラスタ割り勘してくれる方も！",
    tags:["関西勢","フラスタ","ドルオタ歴長め"],
    badges:[
      {icon:"🌸",label:"関西代表",desc:"関西エリアのリーダー的存在"},
      {icon:"✨",label:"取引丁寧",desc:"グッズ交換の評価★5"},
    ],
    oshiHistory:"8年", match:76, nowStatus:null,
  },
  {
    id:5, name:"ちか", age:21, location:"東京・池袋", avatar:"⭐", color:"#60A5FA",
    oshi:"阿部亮平", group:"Snow Man", energy:4, favSong:"Raging Fire",
    style:"厳選参戦派", travel:"夜行バス派", lifeStage:"学生",
    fashionTags:["量産型","地雷系"], family:"一人暮らし",
    bio:"大学生オタクです！一緒に参戦できるお友達がほしいです。現場終わりにご飯行こ🍜",
    tags:["学生","現場後ごはん","コスメ好き"],
    badges:[
      {icon:"🏆",label:"認定ファン",desc:"推し歴クイズ合格"},
      {icon:"🌱",label:"若手オタ",desc:"10代・20代前半のファン"},
    ],
    oshiHistory:"1年半", match:72, nowStatus:"銀テ譲りたい",
  },
];

const NOW_OPTIONS = ["お茶したい","写真撮り合いたい","銀テ譲りたい","銀テ欲しい","フード一緒に行く","開演前に話したい"];

const GOODS_BOARD = [
  {id:1, user:"さくら", avatar:"🌸", color:"#FF5C8A", have:"渡辺くん 缶バッジ", want:"目黒くん 缶バッジ", gate:"Aゲート付近", time:"14:32"},
  {id:2, user:"ゆい", avatar:"🎀", color:"#F5A623", have:"阿部くん クリアファイル", want:"渡辺くん クリアファイル", gate:"Bゲート内側", time:"14:45"},
  {id:3, user:"ちか", avatar:"⭐", color:"#60A5FA", have:"SnowMan 銀テ（3本）", want:"なし（譲ります！）", gate:"グッズ売り場前", time:"15:01"},
];

const QUIZ = [
  {
    q: "Snow Manが現在のグループ名になったのは何年？",
    opts: ["2017年","2018年","2019年","2020年"],
    ans: 2,
  },
  {
    q: "Snow Manのメンバーは何人？",
    opts: ["7人","8人","9人","10人"],
    ans: 2,
  },
  {
    q: "Snow Manのデビュー曲は？",
    opts: ["Grandeur","D.D.","ONENESS","Crazy F-R-E-S-H Beat"],
    ans: 1,
  },
];

const BUDGET_CATS = ["チケット","グッズ","交通費","宿泊","ご飯","その他"];
const BUDGET_COLORS = ["#FF5C8A","#F5A623","#4ECDC4","#A78BFA","#60A5FA","#94A3B8"];

const SACRED_SPOTS = [
  {id:1, name:"ジャニーズ事務所付近", area:"東京・港区", user:"さくら", avatar:"🌸", color:"#FF5C8A", desc:"よく目撃情報が！早朝がおすすめ", img:"🏢", likes:24},
  {id:2, name:"横浜アリーナ", area:"神奈川・横浜", user:"みお", avatar:"🌿", color:"#4ECDC4", desc:"ライブ後の余韻に浸れるスポット🎪", img:"🎪", likes:41},
  {id:3, name:"舞台ロケ地・代官山", area:"東京・渋谷", user:"ゆい", avatar:"🎀", color:"#F5A623", desc:"ドラマのあのシーンの場所！聖地感MAX", img:"🌲", likes:18},
  {id:4, name:"大阪城ホール", area:"大阪・中央区", user:"れな", avatar:"💜", color:"#A78BFA", desc:"関西勢の集まる聖地。ライブ最高でした", img:"🏯", likes:33},
];

/* ══════════════════════════════
   STYLE CONSTANTS
══════════════════════════════ */
const C = {
  bg: "#0B0914",
  surface: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  pink: "#FF5C8A",
  amber: "#F5A623",
  cyan: "#5CE1FF",
  purple: "#A78BFA",
  text: "#F0EDE8",
  textDim: "rgba(240,237,232,0.45)",
  textFaint: "rgba(240,237,232,0.2)",
  ff: "'Zen Kaku Gothic New', 'Hiragino Kaku Gothic ProN', sans-serif",
  ffSerif: "'Noto Serif JP', serif",
};

const pill = (bg, border, color) => ({
  background: bg, border: `1px solid ${border}`,
  borderRadius: 20, padding: "3px 10px",
  fontSize: 11, color, fontWeight: 700,
  whiteSpace: "nowrap",
});

const card = (extra={}) => ({
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 18, padding: 16,
  ...extra,
});

/* ══════════════════════════════
   SUB-COMPONENTS
══════════════════════════════ */
const EnergyDots = ({ level, color="#FF5C8A" }) => (
  <div style={{ display:"flex", gap:3, alignItems:"center" }}>
    {[1,2,3,4,5].map(i => (
      <div key={i} style={{
        width:8, height:8, borderRadius:2,
        background: i<=level ? color : C.border,
        boxShadow: i<=level ? `0 0 5px ${color}` : "none",
      }}/>
    ))}
  </div>
);

const Badge = ({ icon, label, desc, big }) => (
  <div style={{
    display:"flex", alignItems: big?"flex-start":"center", gap:8,
    background: "rgba(245,166,35,0.08)", border:"1px solid rgba(245,166,35,0.25)",
    borderRadius:12, padding: big?"12px":"8px 12px",
    flexDirection: big?"column":"row",
  }}>
    <span style={{ fontSize: big?24:14 }}>{icon}</span>
    <div>
      <div style={{ fontSize: big?13:11, fontWeight:700, color:C.amber }}>{label}</div>
      {big && <div style={{ fontSize:11, color:C.textDim, marginTop:2 }}>{desc}</div>}
    </div>
  </div>
);

const LifeStyleTag = ({ label, color }) => (
  <span style={pill(`${color}1A`, `${color}44`, color)}>{label}</span>
);

const MatchRing = ({ score, color }) => (
  <div style={{
    position:"relative", width:48, height:48, flexShrink:0,
  }}>
    <svg width="48" height="48" style={{ position:"absolute", top:0, left:0 }}>
      <circle cx="24" cy="24" r="20" fill="none" stroke={C.border} strokeWidth="3"/>
      <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="3"
        strokeDasharray={`${2*Math.PI*20*score/100} 999`}
        strokeLinecap="round"
        transform="rotate(-90 24 24)"
        style={{ filter:`drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
    <div style={{
      position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:10, fontWeight:900, color,
    }}>{score}</div>
  </div>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom:14 }}>
    <div style={{ fontFamily:C.ffSerif, fontSize:16, fontWeight:900, color:C.text, letterSpacing:-0.3 }}>{children}</div>
    {sub && <div style={{ fontSize:11, color:C.textDim, marginTop:2 }}>{sub}</div>}
  </div>
);

/* ══════════════════════════════
   QUIZ MODAL
══════════════════════════════ */
function QuizModal({ onPass, onClose }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done, setDone] = useState(false);

  const q = QUIZ[step];

  const choose = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    const correct = i === q.ans;
    if (correct) setScore(s => s+1);
    setTimeout(() => {
      if (step < QUIZ.length-1) {
        setStep(s => s+1);
        setChosen(null);
      } else {
        setDone(true);
      }
    }, 700);
  };

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(10px)",
      zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div style={{
        background:"#14101F", border:`1px solid rgba(245,166,35,0.3)`,
        borderRadius:24, padding:28, maxWidth:380, width:"100%",
      }}>
        {done ? (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>{score===3?"🏆":score>=2?"⭐":"😢"}</div>
            <div style={{ fontFamily:C.ffSerif, fontSize:22, fontWeight:900, marginBottom:8, color:C.text }}>
              {score===3?"満点合格！":"惜しい！"}
            </div>
            <div style={{ color:C.textDim, fontSize:14, marginBottom:20 }}>
              {score}/3問正解
              {score===3 ? "「認定ファン」バッジをゲットしました！" : "もう一度挑戦してみよう"}
            </div>
            {score===3
              ? <button onClick={onPass} style={{ background:`linear-gradient(135deg,${C.amber},#FF5C8A)`, border:"none", borderRadius:14, padding:"12px 28px", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>コミュニティに参加する ✦</button>
              : <button onClick={onClose} style={{ background:"rgba(255,255,255,0.08)", border:"none", borderRadius:14, padding:"12px 28px", color:C.text, fontWeight:700, cursor:"pointer" }}>もう一度</button>
            }
          </div>
        ) : (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
              <span style={{ fontSize:12, color:C.amber, fontWeight:700 }}>認定ファンクイズ</span>
              <span style={{ fontSize:12, color:C.textDim }}>{step+1} / {QUIZ.length}</span>
            </div>
            <div style={{ ...card(), marginBottom:16, borderColor:"rgba(245,166,35,0.2)" }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.text, lineHeight:1.6 }}>{q.q}</div>
            </div>
            {q.opts.map((opt,i) => (
              <button key={i} onClick={() => choose(i)} style={{
                display:"block", width:"100%", marginBottom:8,
                background: chosen===null ? "rgba(255,255,255,0.04)"
                  : i===q.ans ? "rgba(92,225,255,0.15)"
                  : chosen===i ? "rgba(255,92,138,0.15)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  chosen===null ? C.border
                  : i===q.ans ? C.cyan
                  : chosen===i ? C.pink
                  : C.border}`,
                borderRadius:12, padding:"11px 16px",
                color: chosen!==null && i===q.ans ? C.cyan
                  : chosen===i && i!==q.ans ? C.pink : C.text,
                fontSize:13, textAlign:"left", cursor:"pointer", fontFamily:C.ff,
                transition:"all 0.2s",
              }}>{opt}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════
   TAB: さがす
══════════════════════════════ */
function TabSearch({ onSelectUser }) {
  const [filterStyle, setFilterStyle] = useState("");
  const [filterStage, setFilterStage] = useState("");
  const [liked, setLiked] = useState(new Set());

  const STYLES = ["全通派","茶の間派","厳選参戦派"];
  const STAGES = ["社会人オタ","学生","ママ友推し活"];

  const filtered = USERS.filter(u =>
    (filterStyle==="" || u.style===filterStyle) &&
    (filterStage==="" || u.lifeStage===filterStage)
  );

  return (
    <div style={{ padding:"16px 16px 90px" }}>
      <SectionTitle sub={`${filtered.length}人のオタ仲間がいます`}>仲間をさがす</SectionTitle>

      {/* Lifestyle Filter */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, color:C.textDim, marginBottom:8 }}>参戦スタイル</div>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:10 }}>
          {["すべて",...STYLES].map(s => (
            <button key={s} onClick={() => setFilterStyle(s==="すべて"?"":s)} style={{
              background: filterStyle===(s==="すべて"?"":s) ? `${C.pink}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${filterStyle===(s==="すべて"?"":s) ? C.pink : C.border}`,
              borderRadius:20, padding:"6px 14px", color: filterStyle===(s==="すべて"?"":s) ? C.pink : C.textDim,
              fontSize:12, cursor:"pointer", fontFamily:C.ff, fontWeight:700, transition:"all 0.2s",
            }}>{s}</button>
          ))}
        </div>
        <div style={{ fontSize:11, color:C.textDim, marginBottom:8 }}>ライフステージ</div>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
          {["すべて",...STAGES].map(s => (
            <button key={s} onClick={() => setFilterStage(s==="すべて"?"":s)} style={{
              background: filterStage===(s==="すべて"?"":s) ? `${C.amber}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${filterStage===(s==="すべて"?"":s) ? C.amber : C.border}`,
              borderRadius:20, padding:"6px 14px", color: filterStage===(s==="すべて"?"":s) ? C.amber : C.textDim,
              fontSize:12, cursor:"pointer", fontFamily:C.ff, fontWeight:700, transition:"all 0.2s",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {filtered.map(u => (
        <div key={u.id} onClick={() => onSelectUser(u)} style={{
          ...card({ marginBottom:12, cursor:"pointer", overflow:"hidden", position:"relative" }),
          transition:"border-color 0.2s",
        }}>
          <div style={{
            position:"absolute", top:0, right:0, width:100, height:100,
            background:`radial-gradient(circle at top right, ${u.color}18, transparent)`,
            pointerEvents:"none",
          }}/>

          {/* Now status badge */}
          {u.nowStatus && (
            <div style={{
              position:"absolute", top:12, right:12,
              background:`${C.cyan}22`, border:`1px solid ${C.cyan}55`,
              borderRadius:20, padding:"3px 10px", fontSize:10, color:C.cyan, fontWeight:700,
            }}>🟢 今{u.nowStatus}</div>
          )}

          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <MatchRing score={u.match} color={u.color} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:5 }}>
                <span style={{ fontSize:18 }}>{u.avatar}</span>
                <span style={{ fontWeight:900, fontSize:16, color:C.text }}>{u.name}</span>
                <span style={{ fontSize:12, color:C.textDim }}>{u.age}歳</span>
                <span style={{ fontSize:12, color:C.textDim }}>📍{u.location}</span>
              </div>

              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                <LifeStyleTag label={u.style} color={u.color} />
                <LifeStyleTag label={u.lifeStage} color={C.amber} />
                <span style={pill("rgba(255,255,255,0.06)", C.border, C.textDim)}>
                  推し歴{u.oshiHistory}
                </span>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ fontSize:12, color:C.textDim }}>熱量</span>
                <EnergyDots level={u.energy} color={u.color} />
                <span style={{ fontSize:11, color:C.textDim, marginLeft:6 }}>
                  🎵 {u.favSong}
                </span>
              </div>

              <div style={{ fontSize:12, color:C.textDim, lineHeight:1.6, marginBottom:8 }}>
                {u.bio.length>50 ? u.bio.slice(0,50)+"…" : u.bio}
              </div>

              <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                {u.badges.slice(0,3).map((b,i) => (
                  <span key={i} title={b.label} style={{ fontSize:15 }}>{b.icon}</span>
                ))}
                {u.badges.length>2 && (
                  <span style={{ fontSize:11, color:C.textDim }}>+{u.badges.length-2}</span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            <button onClick={e => { e.stopPropagation(); setLiked(p => { const n=new Set(p); n.has(u.id)?n.delete(u.id):n.add(u.id); return n; }); }} style={{
              flex:1,
              background: liked.has(u.id) ? `${C.pink}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${liked.has(u.id) ? C.pink : C.border}`,
              borderRadius:12, padding:"9px", color: liked.has(u.id)?C.pink:C.textDim,
              cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:C.ff,
            }}>{liked.has(u.id)?"💕 いいね済":"♡ いいね"}</button>
            <button onClick={e => { e.stopPropagation(); onSelectUser(u); }} style={{
              flex:2,
              background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`,
              borderRadius:12, padding:"9px", color:C.textDim,
              cursor:"pointer", fontSize:12, fontFamily:C.ff,
            }}>くわしく見る →</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════
   TAB: 現場
══════════════════════════════ */
function TabGenba() {
  const [nowFilter, setNowFilter] = useState(null);
  const [postMode, setPostMode] = useState(false);
  const [newHave, setNewHave] = useState("");
  const [newWant, setNewWant] = useState("");
  const [newGate, setNewGate] = useState("");
  const [board, setBoard] = useState(GOODS_BOARD);

  const nowUsers = USERS.filter(u => u.nowStatus);

  const addPost = () => {
    if (!newHave.trim()) return;
    setBoard(b => [{
      id: Date.now(), user:"あなた", avatar:"🎀", color:C.pink,
      have:newHave, want:newWant||"なんでも！", gate:newGate||"未定",
      time: new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}),
    }, ...b]);
    setNewHave(""); setNewWant(""); setNewGate("");
    setPostMode(false);
  };

  return (
    <div style={{ padding:"16px 16px 90px" }}>
      {/* 今から会える */}
      <SectionTitle sub="現場にいる人をリアルタイムで探す">🟢 今から会える</SectionTitle>

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
        {[null,...NOW_OPTIONS].map((opt,i) => (
          <button key={i} onClick={() => setNowFilter(opt)} style={{
            background: nowFilter===opt ? `${C.cyan}22` : "rgba(255,255,255,0.04)",
            border: `1px solid ${nowFilter===opt ? C.cyan : C.border}`,
            borderRadius:20, padding:"6px 12px",
            color: nowFilter===opt ? C.cyan : C.textDim,
            fontSize:11, cursor:"pointer", fontFamily:C.ff, fontWeight:700,
          }}>{opt===null ? "すべて" : opt}</button>
        ))}
      </div>

      {nowUsers.filter(u => !nowFilter || u.nowStatus===nowFilter).map(u => (
        <div key={u.id} style={{ ...card({ marginBottom:10, display:"flex", gap:12, alignItems:"center" }) }}>
          <div style={{
            width:44, height:44, borderRadius:"50%", fontSize:20,
            background:`${u.color}22`, border:`2px solid ${u.color}`,
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            boxShadow:`0 0 12px ${u.color}44`,
          }}>{u.avatar}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{u.name}</div>
            <div style={{ fontSize:12, color:C.textDim }}>{u.location}</div>
          </div>
          <div style={{
            background:`${C.cyan}18`, border:`1px solid ${C.cyan}44`,
            borderRadius:20, padding:"5px 12px", fontSize:11, color:C.cyan, fontWeight:700,
          }}>🟢 {u.nowStatus}</div>
        </div>
      ))}

      {nowUsers.filter(u => !nowFilter || u.nowStatus===nowFilter).length === 0 && (
        <div style={{ textAlign:"center", padding:"20px 0", color:C.textFaint, fontSize:13 }}>
          現在このステータスの人はいません
        </div>
      )}

      {/* グッズ交換掲示板 */}
      <div style={{ marginTop:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:14 }}>
          <SectionTitle sub="会場内でリアルタイム交換">🎴 グッズ交換掲示板</SectionTitle>
          <button onClick={() => setPostMode(!postMode)} style={{
            background: postMode ? `${C.pink}22` : "rgba(255,255,255,0.06)",
            border: `1px solid ${postMode ? C.pink : C.border}`,
            borderRadius:12, padding:"7px 14px",
            color: postMode ? C.pink : C.textDim,
            fontSize:12, cursor:"pointer", fontFamily:C.ff, fontWeight:700, marginBottom:14,
          }}>{postMode ? "✕ 閉じる" : "+ 投稿する"}</button>
        </div>

        {postMode && (
          <div style={{ ...card({ marginBottom:14, borderColor:"rgba(255,92,138,0.2)" }) }}>
            {[
              {label:"持ってるもの",val:newHave,set:setNewHave,ph:"例: 渡辺くん 缶バッジ"},
              {label:"欲しいもの",val:newWant,set:setNewWant,ph:"例: 目黒くん 缶バッジ（なければ「なんでも」可）"},
              {label:"現在地",val:newGate,set:setNewGate,ph:"例: Aゲート付近"},
            ].map(({label,val,set,ph}) => (
              <div key={label} style={{ marginBottom:10 }}>
                <div style={{ fontSize:11, color:C.textDim, marginBottom:5 }}>{label}</div>
                <input value={val} onChange={e=>set(e.target.value)} placeholder={ph} style={{
                  width:"100%", background:"rgba(255,255,255,0.06)", border:`1px solid ${C.border}`,
                  borderRadius:10, padding:"10px 14px", color:C.text, fontSize:13,
                  boxSizing:"border-box", fontFamily:C.ff, outline:"none",
                }}/>
              </div>
            ))}
            <button onClick={addPost} style={{
              background:`linear-gradient(135deg,${C.pink},${C.purple})`,
              border:"none", borderRadius:12, padding:"11px 0", width:"100%",
              color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:C.ff,
            }}>掲示板に投稿する</button>
          </div>
        )}

        {board.map(b => (
          <div key={b.id} style={{ ...card({ marginBottom:10 }) }}>
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:18 }}>{b.avatar}</span>
              <div style={{ flex:1 }}>
                <span style={{ fontWeight:700, fontSize:13, color:C.text }}>{b.user}</span>
                <span style={{ fontSize:11, color:C.textFaint, marginLeft:8 }}>{b.time}</span>
              </div>
              <span style={{ fontSize:11, color:C.textDim }}>📍 {b.gate}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:8, alignItems:"center" }}>
              <div style={{ background:`${b.color}18`, border:`1px solid ${b.color}33`, borderRadius:10, padding:"8px 10px" }}>
                <div style={{ fontSize:10, color:b.color, marginBottom:3 }}>持ってる</div>
                <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{b.have}</div>
              </div>
              <div style={{ fontSize:16, color:C.textDim }}>⇄</div>
              <div style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 10px" }}>
                <div style={{ fontSize:10, color:C.textDim, marginBottom:3 }}>欲しい</div>
                <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{b.want}</div>
              </div>
            </div>
            <button style={{
              marginTop:10, width:"100%", background:"rgba(255,255,255,0.04)",
              border:`1px solid ${C.border}`, borderRadius:10, padding:"9px",
              color:C.textDim, fontSize:12, cursor:"pointer", fontFamily:C.ff,
            }}>取引リクエストを送る →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════
   TAB: 記録
══════════════════════════════ */
function TabLog() {
  const initial = [
    {id:1, cat:"チケット", label:"横アリ 2daysチケット", amount:18000, date:"2025-02-22"},
    {id:2, cat:"グッズ", label:"うちわ・Tシャツ・クリアファイル", amount:12500, date:"2025-02-22"},
    {id:3, cat:"交通費", label:"新幹線（往復）", amount:8400, date:"2025-02-21"},
    {id:4, cat:"宿泊", label:"横浜ホテル1泊", amount:15000, date:"2025-02-21"},
    {id:5, cat:"ご飯", label:"現場メシ・打ち上げ", amount:4200, date:"2025-02-22"},
  ];
  const [logs, setLogs] = useState(initial);
  const [addMode, setAddMode] = useState(false);
  const [cat, setCat] = useState("チケット");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  const total = logs.reduce((s,l) => s+l.amount, 0);
  const catTotals = BUDGET_CATS.map((c,i) => ({
    name:c, amount: logs.filter(l=>l.cat===c).reduce((s,l)=>s+l.amount,0),
    color: BUDGET_COLORS[i],
  })).filter(c => c.amount>0);

  const addLog = () => {
    if (!label.trim() || !amount) return;
    setLogs(p => [...p, { id:Date.now(), cat, label, amount:Number(amount), date:new Date().toISOString().slice(0,10) }]);
    setLabel(""); setAmount(""); setAddMode(false);
  };

  const barMax = Math.max(...catTotals.map(c=>c.amount));

  return (
    <div style={{ padding:"16px 16px 90px" }}>
      <SectionTitle sub="推し活に使った愛のお金">💰 推し活家計簿</SectionTitle>

      {/* Total card */}
      <div style={{
        background:`linear-gradient(135deg, rgba(245,166,35,0.15), rgba(255,92,138,0.1))`,
        border:`1px solid rgba(245,166,35,0.3)`,
        borderRadius:20, padding:20, marginBottom:16,
      }}>
        <div style={{ fontSize:11, color:C.amber, fontWeight:700, marginBottom:6 }}>今月の推し活合計</div>
        <div style={{ fontFamily:C.ffSerif, fontSize:36, fontWeight:900, color:C.text, letterSpacing:-1 }}>
          ¥{total.toLocaleString()}
        </div>
        <div style={{ fontSize:11, color:C.textDim, marginTop:6 }}>
          「推しへの投資は人生の彩り」— {logs.length}件の記録
        </div>
      </div>

      {/* Category breakdown */}
      <div style={{ ...card({ marginBottom:16 }) }}>
        <div style={{ fontSize:12, color:C.textDim, fontWeight:700, marginBottom:14 }}>カテゴリ別</div>
        {catTotals.map(c => (
          <div key={c.name} style={{ marginBottom:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:12, color:C.text }}>{c.name}</span>
              <span style={{ fontSize:12, fontWeight:700, color:c.color }}>¥{c.amount.toLocaleString()}</span>
            </div>
            <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:3, overflow:"hidden" }}>
              <div style={{
                height:"100%", width:`${(c.amount/barMax)*100}%`,
                background:c.color, borderRadius:3,
                boxShadow:`0 0 6px ${c.color}`,
                transition:"width 0.6s ease",
              }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <button onClick={() => setAddMode(!addMode)} style={{
        width:"100%", background: addMode ? `${C.pink}22` : `linear-gradient(135deg,${C.pink},${C.purple})`,
        border: addMode ? `1px solid ${C.pink}` : "none",
        borderRadius:14, padding:"12px", color:"#fff",
        fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:C.ff, marginBottom:12,
      }}>{addMode ? "✕ キャンセル" : "+ 記録を追加"}</button>

      {addMode && (
        <div style={{ ...card({ marginBottom:14, borderColor:"rgba(255,92,138,0.2)" }) }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
            {BUDGET_CATS.map((c,i) => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat===c ? `${BUDGET_COLORS[i]}22` : "rgba(255,255,255,0.04)",
                border: `1px solid ${cat===c ? BUDGET_COLORS[i] : C.border}`,
                borderRadius:20, padding:"5px 12px",
                color: cat===c ? BUDGET_COLORS[i] : C.textDim,
                fontSize:12, cursor:"pointer", fontFamily:C.ff,
              }}>{c}</button>
            ))}
          </div>
          {[
            {label:"内容",val:label,set:setLabel,ph:"例: うちわ・Tシャツ",type:"text"},
            {label:"金額",val:amount,set:setAmount,ph:"例: 12500",type:"number"},
          ].map(({label:lb,val,set,ph,type}) => (
            <div key={lb} style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, color:C.textDim, marginBottom:5 }}>{lb}</div>
              <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph} style={{
                width:"100%", background:"rgba(255,255,255,0.06)", border:`1px solid ${C.border}`,
                borderRadius:10, padding:"10px 14px", color:C.text, fontSize:13,
                boxSizing:"border-box", fontFamily:C.ff, outline:"none",
              }}/>
            </div>
          ))}
          <button onClick={addLog} style={{
            background:`linear-gradient(135deg,${C.amber},${C.pink})`,
            border:"none", borderRadius:12, padding:"11px 0", width:"100%",
            color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:C.ff,
          }}>記録する</button>
        </div>
      )}

      {/* Log list */}
      {logs.slice().reverse().map(l => (
        <div key={l.id} style={{ ...card({ marginBottom:8, display:"flex", gap:12, alignItems:"center" }) }}>
          <div style={{
            width:40, height:40, borderRadius:12, flexShrink:0,
            background: `${BUDGET_COLORS[BUDGET_CATS.indexOf(l.cat)]}22`,
            border:`1px solid ${BUDGET_COLORS[BUDGET_CATS.indexOf(l.cat)]}44`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, color:BUDGET_COLORS[BUDGET_CATS.indexOf(l.cat)], fontWeight:700,
          }}>{l.cat}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{l.label}</div>
            <div style={{ fontSize:11, color:C.textDim }}>{l.date}</div>
          </div>
          <div style={{ fontSize:15, fontWeight:900, color:C.text }}>
            ¥{l.amount.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════
   TAB: 聖地
══════════════════════════════ */
function TabSacred() {
  const [spots, setSpots] = useState(SACRED_SPOTS);
  const [addMode, setAddMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [liked, setLiked] = useState(new Set());

  const addSpot = () => {
    if (!newName.trim()) return;
    setSpots(s => [...s, {
      id:Date.now(), name:newName, area:newArea||"未定", user:"あなた",
      avatar:"🎀", color:C.pink, desc:newDesc, img:"📍", likes:0,
    }]);
    setNewName(""); setNewArea(""); setNewDesc(""); setAddMode(false);
  };

  return (
    <div style={{ padding:"16px 16px 90px" }}>
      <SectionTitle sub="ファンが集めた聖地・ロケ地マップ">🗾 聖地巡礼マップ</SectionTitle>

      {/* Map visual */}
      <div style={{
        background:"rgba(92,225,255,0.06)", border:`1px solid rgba(92,225,255,0.15)`,
        borderRadius:18, padding:20, marginBottom:16, textAlign:"center",
      }}>
        <div style={{ fontSize:11, color:C.cyan, fontWeight:700, marginBottom:12 }}>
          📍 {spots.length}箇所の聖地が登録されています
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
          {spots.map(s => (
            <div key={s.id} style={{
              background:`${s.color}10`, border:`1px solid ${s.color}22`,
              borderRadius:12, padding:"10px 12px", textAlign:"left",
            }}>
              <div style={{ fontSize:20, marginBottom:5 }}>{s.img}</div>
              <div style={{ fontSize:12, fontWeight:700, color:C.text, lineHeight:1.4 }}>{s.name}</div>
              <div style={{ fontSize:10, color:C.textDim, marginTop:3 }}>📍 {s.area}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add button */}
      <button onClick={() => setAddMode(!addMode)} style={{
        width:"100%",
        background: addMode ? `${C.cyan}22` : `linear-gradient(135deg,${C.cyan}CC,${C.purple})`,
        border: addMode ? `1px solid ${C.cyan}` : "none",
        borderRadius:14, padding:"12px",
        color: addMode ? C.cyan : "#0B0914",
        fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:C.ff, marginBottom:14,
      }}>{addMode ? "✕ キャンセル" : "+ 聖地を追加する"}</button>

      {addMode && (
        <div style={{ ...card({ marginBottom:14, borderColor:`rgba(92,225,255,0.2)` }) }}>
          {[
            {label:"スポット名",val:newName,set:setNewName,ph:"例: 横浜アリーナ"},
            {label:"エリア",val:newArea,set:setNewArea,ph:"例: 神奈川・横浜"},
            {label:"コメント",val:newDesc,set:setNewDesc,ph:"推しへの想い、おすすめポイントなど"},
          ].map(({label,val,set,ph}) => (
            <div key={label} style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, color:C.textDim, marginBottom:5 }}>{label}</div>
              <input value={val} onChange={e=>set(e.target.value)} placeholder={ph} style={{
                width:"100%", background:"rgba(255,255,255,0.06)", border:`1px solid ${C.border}`,
                borderRadius:10, padding:"10px 14px", color:C.text, fontSize:13,
                boxSizing:"border-box", fontFamily:C.ff, outline:"none",
              }}/>
            </div>
          ))}
          <button onClick={addSpot} style={{
            background:`linear-gradient(135deg,${C.cyan}CC,${C.purple})`,
            border:"none", borderRadius:12, padding:"11px 0", width:"100%",
            color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:C.ff,
          }}>聖地を登録する</button>
        </div>
      )}

      {spots.map(s => (
        <div key={s.id} style={{ ...card({ marginBottom:12, overflow:"hidden", position:"relative" }) }}>
          <div style={{
            position:"absolute", top:0, left:0, right:0, height:4,
            background:`linear-gradient(90deg, ${s.color}, transparent)`,
          }}/>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{
              width:48, height:48, borderRadius:14, fontSize:22,
              background:`${s.color}18`, border:`1px solid ${s.color}33`,
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>{s.img}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:15, color:C.text, marginBottom:3 }}>{s.name}</div>
              <div style={{ fontSize:11, color:C.textDim, marginBottom:6 }}>📍 {s.area}</div>
              <div style={{ fontSize:12, color:"rgba(240,237,232,0.7)", lineHeight:1.6, marginBottom:8 }}>
                {s.desc}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ fontSize:14 }}>{s.avatar}</span>
                  <span style={{ fontSize:11, color:C.textDim }}>by {s.user}</span>
                </div>
                <button onClick={() => {
                  setLiked(p => { const n=new Set(p); n.has(s.id)?n.delete(s.id):n.add(s.id); return n; });
                  setSpots(sp => sp.map(x => x.id===s.id ? {...x, likes:x.likes+(liked.has(s.id)?-1:1)} : x));
                }} style={{
                  background: liked.has(s.id) ? `${C.pink}22` : "rgba(255,255,255,0.04)",
                  border:`1px solid ${liked.has(s.id)?C.pink:C.border}`,
                  borderRadius:20, padding:"5px 12px",
                  color: liked.has(s.id)?C.pink:C.textDim,
                  fontSize:12, cursor:"pointer", fontFamily:C.ff,
                }}>♡ {s.likes}</button>
              </div>
            </div>
          </div>
          <button style={{
            marginTop:12, width:"100%", background:"rgba(255,255,255,0.04)",
            border:`1px solid ${C.border}`, borderRadius:10, padding:"9px",
            color:C.textDim, fontSize:12, cursor:"pointer", fontFamily:C.ff,
          }}>✈ 一緒に行く人を募集する</button>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════
   TAB: マイページ
══════════════════════════════ */
function TabMyPage({ onQuiz }) {
  const [myStyle, setMyStyle] = useState("全通派");
  const [myStage, setMyStage] = useState("社会人オタ");
  const [myTravel, setMyTravel] = useState("高級ホテル派");
  const [nowStatus, setNowStatus] = useState(null);
  const [quizPassed, setQuizPassed] = useState(false);

  const myBadges = [
    {icon:"🏆", label:"認定ファン", desc:"推し歴クイズ合格", locked:!quizPassed},
    {icon:"🎫", label:"現場マスター", desc:"50回以上の現場参加", locked:false},
    {icon:"✨", label:"取引丁寧", desc:"グッズ交換の評価★5", locked:false},
    {icon:"🌱", label:"新入り", desc:"アカウント作成1ヶ月以内", locked:true},
    {icon:"📸", label:"フォトジェニック", desc:"現場レポートいいね100以上", locked:true},
    {icon:"💌", label:"マッチの達人", desc:"10人以上とマッチ成功", locked:true},
  ];

  return (
    <div style={{ padding:"16px 16px 90px" }}>
      {/* Profile hero */}
      <div style={{
        background:`linear-gradient(135deg, rgba(255,92,138,0.12), rgba(167,139,250,0.1))`,
        border:`1px solid rgba(255,92,138,0.2)`,
        borderRadius:20, padding:20, marginBottom:16, textAlign:"center",
      }}>
        <div style={{
          width:80, height:80, borderRadius:"50%", fontSize:36,
          background:"rgba(255,92,138,0.2)", border:`3px solid ${C.pink}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 10px", boxShadow:`0 0 30px rgba(255,92,138,0.3)`,
        }}>🌸</div>
        <div style={{ fontFamily:C.ffSerif, fontSize:22, fontWeight:900, color:C.text }}>あなた</div>
        <div style={{ fontSize:12, color:C.textDim, marginTop:3 }}>東京 · Snow Manオタ</div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:12 }}>
          {myBadges.filter(b=>!b.locked).map(b => (
            <span key={b.label} title={b.label} style={{ fontSize:20 }}>{b.icon}</span>
          ))}
        </div>
      </div>

      {/* Now Status */}
      <div style={{ ...card({ marginBottom:14 }) }}>
        <div style={{ fontSize:12, color:C.cyan, fontWeight:700, marginBottom:10 }}>🟢 今のステータス</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {[null,...NOW_OPTIONS].map(s => (
            <button key={s||"off"} onClick={() => setNowStatus(s)} style={{
              background: nowStatus===s ? `${C.cyan}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${nowStatus===s ? C.cyan : C.border}`,
              borderRadius:20, padding:"6px 12px",
              color: nowStatus===s ? C.cyan : C.textDim,
              fontSize:11, cursor:"pointer", fontFamily:C.ff, fontWeight:700,
            }}>{s===null ? "オフ" : s}</button>
          ))}
        </div>
      </div>

      {/* Lifestyle settings */}
      <div style={{ ...card({ marginBottom:14 }) }}>
        <div style={{ fontSize:12, color:C.amber, fontWeight:700, marginBottom:12 }}>⚡ ライフスタイル設定</div>
        {[
          { label:"参戦スタイル", val:myStyle, set:setMyStyle, opts:["全通派","茶の間派","厳選参戦派"], color:C.pink },
          { label:"遠征スタイル", val:myTravel, set:setMyTravel, opts:["夜行バス派","高級ホテル派","日帰り専門","遠征しない"], color:C.amber },
          { label:"ライフステージ", val:myStage, set:setMyStage, opts:["社会人オタ","学生","ママ友推し活","パート主婦"], color:C.cyan },
        ].map(({label,val,set,opts,color}) => (
          <div key={label} style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:C.textDim, marginBottom:7 }}>{label}</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {opts.map(o => (
                <button key={o} onClick={() => set(o)} style={{
                  background: val===o ? `${color}22` : "rgba(255,255,255,0.04)",
                  border:`1px solid ${val===o ? color : C.border}`,
                  borderRadius:20, padding:"5px 12px",
                  color:val===o?color:C.textDim,
                  fontSize:11, cursor:"pointer", fontFamily:C.ff, fontWeight:val===o?700:400,
                }}>{o}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ ...card({ marginBottom:14 }) }}>
        <div style={{ fontSize:12, color:C.amber, fontWeight:700, marginBottom:12 }}>🏅 バッジコレクション</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {myBadges.map(b => (
            <div key={b.label} style={{
              background: b.locked ? "rgba(255,255,255,0.02)" : `rgba(245,166,35,0.08)`,
              border:`1px solid ${b.locked ? C.border : "rgba(245,166,35,0.25)"}`,
              borderRadius:12, padding:"12px", opacity: b.locked?0.5:1,
            }}>
              <div style={{ fontSize:22, marginBottom:6, filter:b.locked?"grayscale(1)":"none" }}>{b.icon}</div>
              <div style={{ fontSize:11, fontWeight:700, color:b.locked?C.textDim:C.amber }}>{b.label}</div>
              <div style={{ fontSize:10, color:C.textFaint, marginTop:3, lineHeight:1.4 }}>{b.desc}</div>
              {b.locked && b.label==="認定ファン" && (
                <button onClick={onQuiz} style={{
                  marginTop:8, background:`${C.amber}22`, border:`1px solid ${C.amber}44`,
                  borderRadius:8, padding:"5px 8px", color:C.amber,
                  fontSize:10, cursor:"pointer", fontFamily:C.ff, width:"100%",
                }}>クイズに挑戦する →</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   USER DETAIL MODAL
══════════════════════════════ */
function UserDetail({ user:u, onClose }) {
  const [liked, setLiked] = useState(false);
  if (!u) return null;
  return (
    <div style={{
      position:"fixed", inset:0, background:C.bg, zIndex:150, overflowY:"auto",
      fontFamily:C.ff,
    }}>
      <div style={{
        background:`linear-gradient(180deg, ${u.color}22 0%, transparent 35%)`,
        padding:"20px 20px 0",
      }}>
        <button onClick={onClose} style={{
          background:"rgba(255,255,255,0.08)", border:"none", borderRadius:12,
          padding:"8px 16px", color:C.text, cursor:"pointer", fontSize:13, marginBottom:16,
        }}>← 戻る</button>

        <div style={{ textAlign:"center", paddingBottom:24 }}>
          <div style={{
            width:88, height:88, borderRadius:"50%", fontSize:42,
            background:`${u.color}22`, border:`3px solid ${u.color}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 12px", boxShadow:`0 0 40px ${u.color}55`,
          }}>{u.avatar}</div>
          <div style={{ fontFamily:C.ffSerif, fontSize:26, fontWeight:900, color:C.text, marginBottom:4 }}>
            {u.name}
          </div>
          <div style={{ fontSize:13, color:C.textDim, marginBottom:10 }}>
            {u.age}歳 · {u.location} · 推し歴{u.oshiHistory}
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
            <LifeStyleTag label={u.style} color={u.color} />
            <LifeStyleTag label={u.lifeStage} color={C.amber} />
            <LifeStyleTag label={u.travel} color={C.cyan} />
          </div>
        </div>
      </div>

      <div style={{ padding:"0 20px 100px" }}>
        {/* 推し情報 */}
        <div style={{ ...card({ marginBottom:12, borderColor:`${u.color}33`, background:`${u.color}0A` }) }}>
          <div style={{ fontSize:12, color:u.color, fontWeight:700, marginBottom:12 }}>💝 推し情報</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            {[["推し",u.oshi],["グループ",u.group],["好きな曲",u.favSong],["家族構成",u.family]].map(([l,v]) => (
              <div key={l}>
                <div style={{ fontSize:10, color:C.textDim, marginBottom:3 }}>{l}</div>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:11, color:C.textDim, marginBottom:6 }}>熱量レベル</div>
          <EnergyDots level={u.energy} color={u.color} />
        </div>

        {/* Bio */}
        <div style={{ ...card({ marginBottom:12 }) }}>
          <div style={{ fontSize:12, color:C.textDim, fontWeight:700, marginBottom:8 }}>💬 自己紹介</div>
          <div style={{ fontSize:13, color:C.text, lineHeight:1.8 }}>{u.bio}</div>
        </div>

        {/* Badges */}
        <div style={{ ...card({ marginBottom:12 }) }}>
          <div style={{ fontSize:12, color:C.amber, fontWeight:700, marginBottom:10 }}>🏅 獲得バッジ</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {u.badges.map(b => <Badge key={b.label} {...b} big />)}
          </div>
        </div>

        {/* Fashion tags */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
          {u.tags.map(t => (
            <span key={t} style={pill("rgba(255,255,255,0.06)", C.border, C.textDim)}>#{t}</span>
          ))}
          {u.fashionTags.map(t => (
            <span key={t} style={pill(`${u.color}18`, `${u.color}44`, u.color)}>👗{t}</span>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <button onClick={() => setLiked(p=>!p)} style={{
            background: liked ? `${C.pink}22` : "rgba(255,255,255,0.06)",
            border:`1px solid ${liked?C.pink:C.border}`,
            borderRadius:14, padding:"13px",
            color:liked?C.pink:C.text, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:C.ff,
          }}>{liked?"💕 いいね済":"♡ いいね"}</button>
          <button style={{
            background:`linear-gradient(135deg,${C.pink},${C.purple})`,
            border:"none", borderRadius:14, padding:"13px",
            color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:C.ff,
          }}>💬 メッセージ</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   ROOT APP
══════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState("search");
  const [selected, setSelected] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const navItems = [
    { id:"search", icon:"✦", label:"さがす" },
    { id:"genba", icon:"🎪", label:"現場" },
    { id:"log", icon:"💰", label:"記録" },
    { id:"sacred", icon:"🗾", label:"聖地" },
    { id:"mypage", icon:"👤", label:"マイページ" },
  ];

  return (
    <div style={{
      fontFamily: C.ff, background: C.bg, minHeight:"100vh",
      maxWidth:430, margin:"0 auto", color:C.text, position:"relative",
    }}>
      {/* Ambient glows */}
      <div style={{ position:"fixed", top:-150, right:-150, width:350, height:350, background:`radial-gradient(circle, rgba(255,92,138,0.1) 0%, transparent 70%)`, pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"fixed", bottom:150, left:-100, width:300, height:300, background:`radial-gradient(circle, rgba(92,225,255,0.07) 0%, transparent 70%)`, pointerEvents:"none", zIndex:0 }}/>

      {/* Header */}
      <div style={{
        background:"rgba(11,9,20,0.95)", backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${C.border}`, padding:"14px 20px 12px",
        position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{
              fontFamily:C.ffSerif, fontSize:20, fontWeight:900, letterSpacing:-0.5,
              background:`linear-gradient(90deg, ${C.pink}, ${C.amber}, ${C.cyan})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>✦ OshiMeet</div>
            <div style={{ fontSize:10, color:C.textFaint, marginTop:1 }}>推し活仲間とつながろう</div>
          </div>
          {quizPassed && (
            <div style={{ ...pill(`${C.amber}18`,`${C.amber}44`,C.amber) }}>🏆 認定ファン</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ position:"relative", zIndex:1 }}>
        {tab==="search" && <TabSearch onSelectUser={setSelected} />}
        {tab==="genba" && <TabGenba />}
        {tab==="log" && <TabLog />}
        {tab==="sacred" && <TabSacred />}
        {tab==="mypage" && <TabMyPage onQuiz={() => setShowQuiz(true)} quizPassed={quizPassed} />}
      </div>

      {/* Bottom Nav */}
      <nav style={{
        display:"flex", background:"rgba(11,9,20,0.97)", backdropFilter:"blur(20px)",
        borderTop:`1px solid ${C.border}`,
        position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:430, zIndex:100,
      }}>
        {navItems.map(({ id, icon, label }) => (
          <div key={id} onClick={() => setTab(id)} style={{
            flex:1, padding:"10px 4px 14px", textAlign:"center", cursor:"pointer",
            fontSize:10, color: tab===id ? C.pink : C.textFaint,
            borderTop:`2px solid ${tab===id ? C.pink : "transparent"}`,
            transition:"all 0.2s",
          }}>
            <div style={{ fontSize:19, marginBottom:2 }}>{icon}</div>
            {label}
          </div>
        ))}
      </nav>

      {/* User detail */}
      {selected && <UserDetail user={selected} onClose={() => setSelected(null)} />}

      {/* Quiz modal */}
      {showQuiz && (
        <QuizModal
          onPass={() => { setQuizPassed(true); setShowQuiz(false); }}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
