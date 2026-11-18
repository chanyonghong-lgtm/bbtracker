// Age-based development and parenting tips.
// Milestones: CDC "Learn the Signs. Act Early." checklists (3 and 4 years).
// Sleep, activity, screens: WHO (2019) under-5 guidelines, AASM, MOH Singapore (2025).
// Milk, food and teeth: HealthHub Singapore (HPB).

export const SOURCES = [
  { label: 'CDC milestone checklists', url: 'https://www.cdc.gov/act-early/milestones-in-action/4-years.html' },
  { label: 'WHO: activity, sleep and screens for under-5s', url: 'https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more' },
  { label: 'MOH Singapore: Grow Well SG and screen use', url: 'https://www.moh.gov.sg/newsroom/grow-well-sg-to-support-families--in-building-healthy-habits-in-children-/' },
  { label: 'HealthHub: nutrition for pre-schoolers', url: 'https://www.healthhub.sg/live-healthy/nutrition-for-pre-schoolers-month37-48' },
  { label: 'HealthHub: brushing your child’s teeth', url: 'https://www.healthhub.sg/live-healthy/how-do-i-brush-my-child\'s-teeth' },
  { label: 'AASM: how much sleep children need', url: 'https://aasm.org/advocacy/position-statements/child-sleep-duration-health-advisory/' },
];

export const BANDS = [
  {
    id: 'two',
    from: 24, to: 35,
    title: { en: '2 to 3 years', zh: '2至3岁' },
    milestoneTitle: { en: 'By her 3rd birthday', zh: '满3岁时' },
    milestones: [
      { en: 'Has short back-and-forth conversations with you', zh: '能和你一来一往地简短对话' },
      { en: 'Asks “who”, “what”, “where” or “why” questions', zh: '会问“谁”、“什么”、“哪里”、“为什么”' },
      { en: 'Says what is happening in a picture, like “eating” or “running”', zh: '能说出图片里在做什么，例如“吃饭”、“跑步”' },
      { en: 'Says her first name when asked', zh: '问她名字时会说出来' },
      { en: 'Is understood by others most of the time', zh: '说的话大部分时间别人听得懂' },
      { en: 'Notices other children and joins them to play', zh: '会注意其他小朋友并一起玩' },
      { en: 'Calms down within 10 minutes after you leave, like at childcare drop-off', zh: '你离开后（例如送去托儿所）10分钟内能平静下来' },
      { en: 'Draws a circle after you show her how', zh: '你示范后会画圆圈' },
      { en: 'Avoids hot things, like a stove, when warned', zh: '提醒她后会避开热的东西，例如炉子' },
      { en: 'Strings large beads or macaroni', zh: '会把大珠子或通心粉串起来' },
      { en: 'Puts on some clothes herself, like loose pants or a jacket', zh: '会自己穿一些衣服，例如宽松的裤子或外套' },
      { en: 'Uses a fork', zh: '会用叉子' },
    ],
    tips: [
      { topic: 'talk', en: 'Build on her words. If she says “Car!”, answer “Yes, a big red car. It’s going fast!” This grows her sentences without correcting her.', zh: '在她的话上多加几个字。她说“车车！”，你可以说“对，一辆红色的大车，开得好快！”不用纠正她，句子自然会变长。' },
      { topic: 'talk', en: 'When reading, pause and ask “What is the cat doing?” or “What happens next?” Let her turn the pages and point.', zh: '讲故事时停一停，问她“小猫在做什么？”“接下来会怎样？”让她自己翻页、用手指。' },
      { topic: 'talk', en: 'Use your home language freely. Talking and reading in Mandarin, English or a dialect all build her language skills.', zh: '放心用家里的语言。用华语、英语或方言和她说话、讲故事，都能帮助她学语言。' },
      { topic: 'play', en: 'Pretend play is real learning. A toy phone, pots and spoons, or a doll to feed is enough. Join in and follow her lead.', zh: '假装游戏也是学习。一个玩具电话、锅子汤匙、或一个要“喂饭”的娃娃就够了。和她一起玩，让她带头。' },
      { topic: 'play', en: 'Practise hand skills: threading big beads, playdough, peeling stickers, scribbling and copying a circle.', zh: '练习手部动作：串大珠子、玩黏土、撕贴纸、涂鸦、照着画圆圈。' },
      { topic: 'move', en: 'Aim for about 3 hours of active play spread through the day: running, climbing at the playground, kicking a ball, dancing (WHO).', zh: '每天累计约3小时的活动：跑步、在游乐场攀爬、踢球、跳舞（世界卫生组织建议）。' },
      { topic: 'move', en: 'Try not to keep her strapped in a stroller or high chair for more than an hour at a time.', zh: '尽量不要让她连续超过1小时坐在婴儿车或高脚椅里。' },
      { topic: 'feel', en: 'Name feelings out loud: “You’re angry because the tower fell.” Then show a way to cope: a hug, three deep breaths, or trying again.', zh: '把情绪说出来：“积木倒了，你很生气。”然后教她平静的方法：抱一抱、深呼吸三次、或再试一次。' },
      { topic: 'feel', en: 'Tantrums are common at this age. Stay calm and close, use few words, and don’t give in to what started it. Praise her when she calms down.', zh: '这个年龄常发脾气。保持冷静、陪在她身边、少说话，不要因为她哭闹就答应。她平静下来后要称赞她。' },
      { topic: 'feel', en: 'Offer two choices you are happy with: “Red cup or blue cup?” It gives her some control and means fewer battles.', zh: '给她两个你都能接受的选择：“红色杯子还是蓝色杯子？”让她有些自主权，争执会少一些。' },
      { topic: 'feel', en: 'Praise the effort, not just the result: “You kept trying with that puzzle!”', zh: '称赞她的努力，不只是结果：“你一直试，终于把拼图拼好了！”' },
      { topic: 'self', en: 'Let her dress herself with loose pants and easy jackets, and feed herself with a spoon and fork. Allow extra time and accept some mess.', zh: '让她自己穿宽松的裤子和外套，自己用汤匙和叉子吃饭。多给一点时间，弄脏一点没关系。' },
      { topic: 'self', en: 'Many children are ready for toilet training around now. Signs: staying dry for 2 hours, telling you about a wet or dirty diaper, interest in the toilet. Go at her pace and never punish accidents.', zh: '很多孩子在这个时候可以开始学用厕所。迹象：能2小时不尿湿、会告诉你尿布湿了或有便便、对马桶有兴趣。按她的步伐来，出意外时不要责罚。' },
      { topic: 'self', en: 'Use the Diaper history in this app to spot her usual poo times. Sitting her on the potty around then makes success more likely.', zh: '看看本应用的尿布记录，找出她平时大便的时间。在那段时间让她坐便盆，更容易成功。' },
      { topic: 'sleep', en: 'Until her 3rd birthday she needs about 11 to 14 hours of sleep a day, naps included (WHO). Keep wake-up and bedtime about the same every day.', zh: '满3岁之前，她每天需要约11至14小时睡眠（包括午睡）（世界卫生组织）。每天起床和睡觉的时间尽量固定。' },
      { topic: 'sleep', en: 'Keep the same calm bedtime routine every night, for example bath, teeth, story, lights out. Screens off at least an hour before bed.', zh: '每晚用同样的睡前程序，例如：洗澡、刷牙、讲故事、关灯。睡前至少1小时不看屏幕。' },
      { topic: 'food', en: 'Serve family meals in small portions. You choose what to offer; let her decide how much to eat. A new food may need 10 or more tries before she accepts it.', zh: '和家人吃一样的饭菜，分量小一点。你决定给什么，她决定吃多少。新食物可能要试10次以上她才接受。' },
      { topic: 'food', en: 'HealthHub suggests about 2 glasses (500 ml) of milk a day for young children. Much more can fill her up before meals. Plain water is the best drink between meals.', zh: '保健促进局建议幼儿每天喝约2杯（500毫升）奶。喝太多会吃不下饭。两餐之间最好喝白开水。' },
      { topic: 'food', en: 'Eat together at the table with the TV off. She learns to eat new foods by watching you.', zh: '一家人坐在餐桌一起吃饭，关掉电视。她会看着你学吃新食物。' },
      { topic: 'screen', en: 'MOH advises against giving young children free access to phones or tablets, and WHO suggests no more than 1 hour a day at age 2. Choose calm programmes and watch together.', zh: '卫生部建议不要让幼儿随意使用手机或平板；世界卫生组织建议2岁孩子每天看屏幕不超过1小时。选节奏慢的节目，并陪她一起看。' },
      { topic: 'screen', en: 'Turn off background TV during meals and play. Even when she isn’t watching, it cuts down how much you talk with her.', zh: '吃饭和玩耍时关掉背景电视。就算她没在看，也会减少你们之间的对话。' },
      { topic: 'safe', en: 'She can climb and open things now. Keep medicines, cleaning products and button batteries locked away, and keep windows locked or grilled.', zh: '她现在会爬高和打开东西。药物、清洁用品和纽扣电池要锁好，窗户要锁上或装铁花。' },
      { topic: 'teeth', en: 'Brush her teeth twice a day, morning and before bed. Under 3, HealthHub suggests only a rice-grain smear of fluoride toothpaste, as advised by her dentist.', zh: '每天早上和睡前刷两次牙。3岁以下，保健促进局建议只用米粒大小的含氟牙膏，并听从牙医的建议。' },
    ],
  },
  {
    id: 'three',
    from: 36, to: 47,
    title: { en: '3 to 4 years', zh: '3至4岁' },
    milestoneTitle: { en: 'By her 4th birthday', zh: '满4岁时' },
    milestones: [
      { en: 'Says sentences with four or more words', zh: '会说四个字词以上的句子' },
      { en: 'Says some words from a song, story or nursery rhyme', zh: '会说出歌曲、故事或儿歌里的一些字词' },
      { en: 'Talks about something that happened in her day, like “I played ball”', zh: '会说当天发生的一件事，例如“我玩了球”' },
      { en: 'Answers simple questions like “What is a coat for?”', zh: '会回答简单问题，例如“外套是用来做什么的？”' },
      { en: 'Pretends to be something else in play, like a teacher or a dog', zh: '玩的时候会假装成别的角色，例如老师或小狗' },
      { en: 'Asks to play with other children', zh: '会主动要求和其他小朋友玩' },
      { en: 'Comforts others who are hurt or sad', zh: '会安慰受伤或难过的人' },
      { en: 'Likes to be a “helper”', zh: '喜欢当“小帮手”' },
      { en: 'Names a few colours', zh: '能说出几种颜色' },
      { en: 'Tells what comes next in a well-known story', zh: '能说出熟悉的故事接下来会发生什么' },
      { en: 'Draws a person with three or more body parts', zh: '画人时能画出三个或以上的身体部位' },
      { en: 'Catches a large ball most of the time', zh: '大部分时候能接住大球' },
      { en: 'Serves herself food or pours water, with an adult watching', zh: '在大人看着下，会自己盛食物或倒水' },
      { en: 'Unbuttons some buttons', zh: '会解开一些纽扣' },
      { en: 'Holds a crayon between fingers and thumb, not in a fist', zh: '用手指捏住蜡笔，而不是整个拳头握着' },
    ],
    tips: [
      { topic: 'talk', en: 'Ask about her day with specific questions: “Who did you play with?” or “What did you eat at lunch?” work better than “How was school?”', zh: '问她一天的事情要具体一点：“你和谁一起玩？”“午餐吃了什么？”比“今天上学好吗？”更容易回答。' },
      { topic: 'talk', en: 'Make up stories together. You start, “Once there was a little cat who…”, and let her add the next part.', zh: '一起编故事。你先说“从前有一只小猫……”，再让她接下去。' },
      { topic: 'talk', en: 'Sing songs and nursery rhymes, and leave out the last word for her to fill in.', zh: '一起唱歌和儿歌，留下最后一个字让她接。' },
      { topic: 'play', en: 'Play simple board and card games that need turn-taking, like snakes and ladders or snap. Losing gracefully is a skill to practise.', zh: '玩需要轮流的简单桌游或纸牌，例如蛇梯棋。学会输得起也是要练习的。' },
      { topic: 'play', en: 'Numbers and letters fit into daily life: count the stairs, spot letters on signs and buses, sort laundry by colour.', zh: '数字和字母可以融入生活：数楼梯、在招牌和巴士上找字母、按颜色把衣服分类。' },
      { topic: 'play', en: 'Offer crayons, scissors with round tips and paper. Drawing and cutting build the hand control she will need for writing.', zh: '给她蜡笔、圆头剪刀和纸。画画和剪纸能锻炼写字需要的手部控制力。' },
      { topic: 'move', en: 'Aim for at least 3 hours of activity a day, with an hour or more of energetic play that makes her breathe harder (WHO).', zh: '每天至少3小时的活动，其中1小时以上是让她喘气的剧烈游戏（世界卫生组织建议）。' },
      { topic: 'move', en: 'Try hopping, balancing on a line, riding a tricycle or scooter, and swimming lessons.', zh: '试试单脚跳、沿着线走平衡、骑三轮车或滑板车、上游泳课。' },
      { topic: 'social', en: 'Arrange short playdates with one or two friends. Help her take turns and use words like “Can I have a turn?”', zh: '安排和一两个小朋友短时间玩耍。帮她学会轮流，教她说“可以轮到我吗？”' },
      { topic: 'feel', en: 'Set up a calm-down corner with a cushion and a favourite book. It is a place to settle, not a punishment.', zh: '布置一个“冷静角”，放个靠垫和她喜欢的书。那是让她平静的地方，不是惩罚。' },
      { topic: 'feel', en: 'Keep a few clear house rules and follow through calmly every time. Consistency between Mum, Dad and Grandpa matters more than strictness.', zh: '定几条简单清楚的家规，每次都冷静地执行。爸爸、妈妈和爷爷做法一致，比严格更重要。' },
      { topic: 'self', en: 'Give her small jobs: putting toys away, setting out spoons, watering plants. She likes to be a helper.', zh: '给她小任务：收玩具、摆汤匙、浇花。她喜欢当小帮手。' },
      { topic: 'self', en: 'Let her pour water from a small jug and serve herself at meals, with you watching.', zh: '在你看着下，让她用小水壶倒水，吃饭时自己盛菜。' },
      { topic: 'sleep', en: 'Children aged 3 to 5 need 10 to 13 hours of sleep a day, which may include a nap. If she drops her nap, offer quiet time instead.', zh: '3至5岁的孩子每天需要10至13小时睡眠（可包括午睡）。如果她不再午睡，可以安排安静休息时间。' },
      { topic: 'food', en: 'Milk guide for pre-schoolers is about 2 glasses (500 ml) a day (HealthHub). The Food tile shows her total so far today.', zh: '学龄前儿童每天喝奶约2杯（500毫升）（保健促进局）。“吃饭”卡片会显示她今天已喝了多少。' },
      { topic: 'food', en: 'Water is the best drink. If you give juice, use 100% juice with no added sugar and keep it to one small cup (125 ml) a day.', zh: '白开水是最好的饮料。如果给果汁，要选100%无加糖果汁，每天不超过一小杯（125毫升）。' },
      { topic: 'screen', en: 'From age 3, MOH advises keeping screen use under 1 hour a day outside school. No devices at meals or in the hour before bed.', zh: '从3岁起，卫生部建议在学校以外每天看屏幕少于1小时。吃饭时和睡前1小时不用电子产品。' },
      { topic: 'school', en: 'For preschool drop-off, keep goodbyes short and warm with the same routine each day, and always say goodbye rather than slipping away.', zh: '送去幼儿园时，道别要简短、温暖，每天用同样的方式，一定要说再见，不要偷偷离开。' },
      { topic: 'safe', en: 'Teach road safety: hold hands at the roadside and stop, look, listen. Keep using a car seat on every trip.', zh: '教她过马路的安全：在路边要牵手，停、看、听。每次坐车都要用儿童安全座椅。' },
      { topic: 'teeth', en: 'From age 3, use a pea-sized amount of fluoride toothpaste. Brush twice a day for 2 minutes and help her until she can do it well.', zh: '3岁起，用豌豆大小的含氟牙膏。每天刷两次，每次2分钟，在她刷得好之前要帮她刷。' },
    ],
  },
];

// Pick the band for an age in months (closest band if outside the range)
export function bandFor(months) {
  if (months === null || months === undefined) return { band: BANDS[0], outside: false, missing: true };
  const exact = BANDS.find((b) => months >= b.from && months <= b.to);
  if (exact) return { band: exact, outside: false };
  return { band: months < BANDS[0].from ? BANDS[0] : BANDS[BANDS.length - 1], outside: true };
}

export const nextBand = (band) => BANDS[BANDS.indexOf(band) + 1] || null;

// Same tip for everyone on a given day
export function tipOfDay(band, date = new Date()) {
  const d = Math.floor((date.getTime() - date.getTimezoneOffset() * 60000) / 86400000);
  return band.tips[d % band.tips.length];
}
