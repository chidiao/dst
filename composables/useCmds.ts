export default function () {
  return { cmds }
}

const cmds = [
  { text: '删除指针选中', cmd: `c_select()c_sel():Remove()` },
  { text: '清除所有', cmd: `c_removeall('')` },
  { text: '清除幸运黄金', cmd: `c_removeall('redpouch_yot_catcoon')` },
  { text: '清除格罗姆花', cmd: `c_removeall('glommerflower')` },
  { text: '清除骨架', cmd: `c_removeall('skeleton_player')` },
  {
    text: '清除子规包裹',
    cmd: `c_removeall('farm_plant_medal_gift_fruit_legion')`
  },
  { text: '清除木筏', cmd: `c_removeall('boat_lograft')` },
  { text: '清除海上萤火虫', cmd: `c_removeall('bioluminescence')` },
  { text: '清除水母', cmd: `c_removeall('jellyfish_planted')` },
  { text: '清除彩虹水母', cmd: `c_removeall('rainbowjellyfish_planted')` },
  { text: '清除海豚', cmd: `c_removeall('ballphin')` },
  { text: '清除海难猴子', cmd: `c_removeall('primeape')` },
  { text: '清除海难猴子窝', cmd: `c_removeall('primeapebarrel')` },
  { text: '服务器重启', cmd: `shutdown -r now` }
]
