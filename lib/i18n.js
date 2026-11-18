'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const en = {
  appName: 'Tot Tracker', familySignIn: 'Family sign in',
  email: 'Email', password: 'Password', show: 'Show', hide: 'Hide',
  signIn: 'Sign in', signingIn: 'Signing in…', forgot: 'Forgot password?',
  enterEmail: 'Enter your email first.', resetSent: 'Check your email for a sign-in link, then set a new password under Family.',
  today: 'Today', history: 'History', trends: 'Trends', family: 'Family', tips: 'Tips',
  sleep: 'Sleep', food: 'Food', diaper: 'Diaper', milk: 'Milk',
  asleepFor: 'Asleep for', awakeFor: 'Awake for', fellAsleep: 'Fell asleep', wokeUp: 'Woke up',
  addPastSleep: 'Add a past sleep', stillSleeping: 'Still sleeping',
  lastMeal: 'Last meal', logFood: 'Food', logMilk: 'Milk', lastChange: 'Last change', nothingYet: 'Nothing yet',
  wet: 'Wet', poo: 'Poo', both: 'Wet + poo', dry: 'Dry',
  breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack', meal: 'Meal',
  when: 'When', now: 'Now', minsAgo: '{n} min ago', hourAgo: '1 hr ago', otherTime: 'Other time',
  tapFoods: 'Tap the foods eaten', moreFoods: 'Show more', addNewFood: 'Add a new food',
  foodName: 'Food name', add: 'Add', detailPh: 'Detail (optional), e.g. egg white only',
  howMuch: 'How much was eaten?', ate: 'Ate: {v}', little: 'A little', half: 'Half', most: 'Most', all: 'All',
  milkType: 'Type of milk', milkAmount: 'How much did she drink?',
  milk_packet: 'Packet milk', milk_formula: 'Formula', milk_fresh: 'Fresh milk', milk_other: 'Other milk',
  milkWithMeal: 'Milk with this meal', addMilk: '+ Add milk', removeMilk: 'Remove milk',
  milkToday: 'Milk today: {ml} ml', milkGuide: 'Guide: about {ml} ml a day',
  less: 'Less', more: 'More', ml: 'ml',
  type: 'Type', consistency: 'Texture', colour: 'Colour',
  Runny: 'Runny', Soft: 'Soft', Solid: 'Solid', Hard: 'Hard',
  Yellow: 'Yellow', Brown: 'Brown', Green: 'Green', Black: 'Black', Red: 'Red', White: 'White',
  pooHint: 'Red, black or white poo can need a doctor’s check, especially if it happens again.',
  notes: 'Notes', optional: 'Optional', save: 'Save', delete: 'Delete', undo: 'Undo', addDetails: 'Add details', close: 'Close',
  logged: '{what} logged · {time}', sleepStarted: 'Sleep started · {time}', sleptFor: 'Woke up · slept {dur}',
  milkLogged: 'Milk logged · {ml} ml',
  deleted: 'Entry deleted', saved: 'Saved', errSave: 'Couldn’t save. Check the internet connection and try again.',
  errTime: 'Please choose a time.', errAfter: 'Wake-up time must be after the sleep time.', errFood: 'Tap at least one food, or add milk.',
  errMilk: 'Enter how much milk she drank.',
  by: 'by {name}', editedBy: 'edited by {name}',
  justNow: 'just now', ago: '{t} ago', inProgress: 'now',
  sleepTotal: 'Sleep', meals: 'Meals', changes: 'Diapers', poos: 'Poos', wets: 'Wet',
  emptyDay: 'Nothing logged yet. Use the buttons above to add the first entry.',
  emptyPast: 'Nothing was logged on this day.',
  last7: 'Last 7 days', sleepPerDay: 'Sleep per day (hours)', mealsPerDay: 'Meals per day', poosPerDay: 'Poos per day',
  milkPerDay: 'Milk per day (ml)', avg: 'Average {v}', guideLine: 'Guide {v}',
  language: 'Language', textSize: 'Text size', normal: 'Normal', large: 'Large',
  yourName: 'Your name (shown on entries)', child: 'Child', birthdate: 'Birth date',
  changePassword: 'New password', updatePassword: 'Update password', pwShort: 'Use at least 8 characters.',
  members: 'Family members', signOut: 'Sign out', signedInAs: 'Signed in as {email}',
  homeTip: 'Tip: in Safari tap Share, then “Add to Home Screen” so the app opens with one tap.',
  welcome: 'Welcome', addChild: 'Add your child to get started', childName: 'Child’s name', continue: 'Continue',
  thisDevice: 'These settings apply to this phone only.',
  ageY: '{y}y', ageM: '{m}m',
  tipOfDay: 'Tip of the day', moreTips: 'More tips', milestones: 'Milestones to look for',
  milestonesIntro: 'Most children (3 in 4) can do these by this age. Every child grows at their own pace.',
  whenToCheck: 'When to check with a doctor',
  whenToCheckText: 'If she can’t do several of these, or stops doing things she used to do, mention it at her next check-up with your family doctor, polyclinic or paediatrician. Getting help early makes a real difference.',
  nowLabel: 'For her age now', nextLabel: 'Coming up next', sources: 'Sources',
  birthdayIn: 'Turns {n} in {d} days', birthdayToday: 'Happy birthday! She turns {n} today.',
  needBirthdate: 'Add her birth date under Family to see tips for her age.',
  tipsRange: 'These tips cover ages 2 to 4. Showing the closest age group.',
  topic_talk: 'Talking', topic_play: 'Play & learning', topic_move: 'Moving', topic_feel: 'Feelings & behaviour',
  topic_self: 'Doing it herself', topic_sleep: 'Sleep', topic_food: 'Food & milk', topic_screen: 'Screens',
  topic_safe: 'Safety', topic_teeth: 'Teeth', topic_social: 'Friends', topic_school: 'Preschool',
  Fruit: 'Fruit', Vegetable: 'Vegetable', Grain: 'Grain', Protein: 'Protein', Dairy: 'Dairy', Other: 'Other',
  f_rice: 'Rice', f_porridge: 'Porridge', f_noodles: 'Noodles', f_bread: 'Bread', f_egg: 'Egg', f_chicken: 'Chicken',
  f_fish: 'Fish', f_pork: 'Pork', f_tofu: 'Tofu', f_banana: 'Banana', f_apple: 'Apple', f_blueberries: 'Blueberries',
  f_broccoli: 'Broccoli', f_carrot: 'Carrot', f_spinach: 'Spinach', f_sweetpotato: 'Sweet potato', f_yoghurt: 'Yoghurt', f_cheese: 'Cheese',
  week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
};

const zh = {
  appName: '宝宝记录', familySignIn: '家人登录',
  email: '电邮', password: '密码', show: '显示', hide: '隐藏',
  signIn: '登录', signingIn: '登录中…', forgot: '忘记密码？',
  enterEmail: '请先输入电邮。', resetSent: '请查看电邮里的登录链接，然后在「家人」页设定新密码。',
  today: '今天', history: '记录', trends: '趋势', family: '家人', tips: '育儿',
  sleep: '睡觉', food: '吃饭', diaper: '尿布', milk: '喝奶',
  asleepFor: '已睡了', awakeFor: '已醒了', fellAsleep: '睡着了', wokeUp: '醒来了',
  addPastSleep: '补记之前的睡眠', stillSleeping: '还在睡',
  lastMeal: '上一餐', logFood: '吃饭', logMilk: '喝奶', lastChange: '上次换尿布', nothingYet: '还没有记录',
  wet: '尿', poo: '便便', both: '尿+便便', dry: '干',
  breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '点心', meal: '一餐',
  when: '时间', now: '现在', minsAgo: '{n}分钟前', hourAgo: '1小时前', otherTime: '其他时间',
  tapFoods: '点选吃了的食物', moreFoods: '更多', addNewFood: '加新食物',
  foodName: '食物名称', add: '加入', detailPh: '备注（可不填），例如：只吃蛋白',
  howMuch: '吃了多少？', ate: '吃了：{v}', little: '一点点', half: '一半', most: '大部分', all: '全部',
  milkType: '奶的种类', milkAmount: '喝了多少？',
  milk_packet: '盒装牛奶', milk_formula: '奶粉', milk_fresh: '鲜奶', milk_other: '其他奶',
  milkWithMeal: '这餐也喝了奶', addMilk: '+ 加喝奶', removeMilk: '去掉喝奶',
  milkToday: '今天喝奶：{ml} 毫升', milkGuide: '参考：每天约 {ml} 毫升',
  less: '减少', more: '增加', ml: '毫升',
  type: '类型', consistency: '软硬', colour: '颜色',
  Runny: '稀', Soft: '软', Solid: '成形', Hard: '硬',
  Yellow: '黄', Brown: '褐', Green: '绿', Black: '黑', Red: '红', White: '白',
  pooHint: '便便是红色、黑色或白色时，最好请医生看看，尤其是再次出现时。',
  notes: '备注', optional: '可不填', save: '保存', delete: '删除', undo: '撤销', addDetails: '补充详情', close: '关闭',
  logged: '已记录{what} · {time}', sleepStarted: '开始睡觉 · {time}', sleptFor: '醒来了 · 睡了{dur}',
  milkLogged: '已记录喝奶 · {ml} 毫升',
  deleted: '已删除', saved: '已保存', errSave: '保存失败，请检查网络后再试。',
  errTime: '请选择时间。', errAfter: '醒来时间要在睡着时间之后。', errFood: '请至少点选一样食物，或加喝奶。',
  errMilk: '请输入喝了多少毫升。',
  by: '{name}记录', editedBy: '{name}修改',
  justNow: '刚刚', ago: '{t}前', inProgress: '现在',
  sleepTotal: '睡眠', meals: '餐数', changes: '尿布', poos: '便便', wets: '尿',
  emptyDay: '今天还没有记录。用上面的按钮开始记录。',
  emptyPast: '这一天没有记录。',
  last7: '最近7天', sleepPerDay: '每天睡眠（小时）', mealsPerDay: '每天餐数', poosPerDay: '每天便便次数',
  milkPerDay: '每天喝奶（毫升）', avg: '平均 {v}', guideLine: '参考 {v}',
  language: '语言', textSize: '字体大小', normal: '正常', large: '大',
  yourName: '你的名字（会显示在记录上）', child: '孩子', birthdate: '出生日期',
  changePassword: '新密码', updatePassword: '更新密码', pwShort: '至少8个字符。',
  members: '家人', signOut: '登出', signedInAs: '登录账号：{email}',
  homeTip: '小贴士：在 Safari 点「分享」，再点「添加到主屏幕」，以后一点就能打开。',
  welcome: '欢迎', addChild: '先加入孩子的资料', childName: '孩子的名字', continue: '继续',
  thisDevice: '这些设定只适用于这部手机。',
  ageY: '{y}岁', ageM: '{m}个月',
  tipOfDay: '今日小贴士', moreTips: '更多育儿贴士', milestones: '可以留意的发展里程碑',
  milestonesIntro: '大部分孩子（每4个中有3个）到这个年龄能做到这些。每个孩子成长速度不同。',
  whenToCheck: '什么时候要问医生',
  whenToCheckText: '如果她有好几项还做不到，或者以前会做的事现在不会了，下次检查时请告诉家庭医生、综合诊疗所或儿科医生。及早帮忙，效果会更好。',
  nowLabel: '适合她现在的年龄', nextLabel: '下一个阶段', sources: '资料来源',
  birthdayIn: '还有{d}天满{n}岁', birthdayToday: '生日快乐！她今天满{n}岁。',
  needBirthdate: '请在「家人」页加入出生日期，就能看到适合她年龄的贴士。',
  tipsRange: '这些贴士适合2至4岁，现在显示最接近的年龄组。',
  topic_talk: '说话', topic_play: '游戏与学习', topic_move: '活动身体', topic_feel: '情绪与行为',
  topic_self: '自己动手', topic_sleep: '睡眠', topic_food: '饮食与喝奶', topic_screen: '屏幕',
  topic_safe: '安全', topic_teeth: '牙齿', topic_social: '朋友', topic_school: '幼儿园',
  Fruit: '水果', Vegetable: '蔬菜', Grain: '主食', Protein: '蛋白质', Dairy: '奶类', Other: '其他',
  f_rice: '饭', f_porridge: '粥', f_noodles: '面', f_bread: '面包', f_egg: '鸡蛋', f_chicken: '鸡肉',
  f_fish: '鱼', f_pork: '猪肉', f_tofu: '豆腐', f_banana: '香蕉', f_apple: '苹果', f_blueberries: '蓝莓',
  f_broccoli: '西兰花', f_carrot: '胡萝卜', f_spinach: '菠菜', f_sweetpotato: '番薯', f_yoghurt: '酸奶', f_cheese: '奶酪',
  week: ['一', '二', '三', '四', '五', '六', '日'],
};

export const DICTS = { en, zh };

const read = (k, d) => { try { return localStorage.getItem(k) || d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

const Ctx = createContext(null);

export function SettingsProvider({ children }) {
  const [lang, setLangS] = useState('en');
  const [size, setSizeS] = useState('normal');
  useEffect(() => { setLangS(read('tt-lang', 'en')); setSizeS(read('tt-size', 'normal')); }, []);
  useEffect(() => {
    document.documentElement.dataset.size = size;
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
  }, [size, lang]);
  const setLang = (v) => { setLangS(v); write('tt-lang', v); };
  const setSize = (v) => { setSizeS(v); write('tt-size', v); };
  const t = (key, vars) => {
    let s = (DICTS[lang] || en)[key] ?? en[key] ?? key;
    if (vars && typeof s === 'string') for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
    return s;
  };
  return <Ctx.Provider value={{ lang, setLang, size, setSize, t }}>{children}</Ctx.Provider>;
}

export const useSettings = () => useContext(Ctx);
