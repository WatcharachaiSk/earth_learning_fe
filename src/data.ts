import { Word } from './types';

export const INITIAL_WORDS: Word[] = [
  // Beginner
  {
    id: 'w1',
    word: 'Abundant',
    wordClass: 'Adjective',
    phonetic: '/əˈbʌndənt/',
    translation: 'อุดมสมบูรณ์, มากมาย',
    definitionEn: 'Existing or available in large quantities; overflowing.',
    definitionTh: 'ที่มีอยู่หรือหาได้ในปริมาณมาก, เหลือเฟือ, อุดมสมบูรณ์',
    exampleEn: 'The country has abundant natural resources such as coal and oil.',
    exampleTh: 'ประเทศนี้มีทรัพยากรธรรมชาติที่อุดมสมบูรณ์ เช่น ถ่านหินและน้ำมัน',
    difficulty: 'Intermediate',
    category: 'Daily Life',
    mnemonic: {
      story: 'ลองจำว่า "อะ-บัน-ดันท์" -> คำว่า "บัน" (Bun = ขนมปัง) มีสะสมอยู่มากมายจน "ดัน" ล้นตู้โชว์ แปลว่า อุดมสมบูรณ์!',
      keyword: 'Bun (ขนมปัง) + ดัน (ทะลัก)'
    }
  },
  {
    id: 'w2',
    word: 'Acquire',
    wordClass: 'Verb',
    phonetic: '/əˈkwaɪər/',
    translation: 'ได้รับมา, ได้เรียนรู้',
    definitionEn: 'Buy or obtain an asset or object for oneself; learn a skill.',
    definitionTh: 'ซื้อหรือได้รับสิ่งสินทรัพย์หรือวัตถุมาเป็นของตนเอง หรือเรียนรู้ทักษะ',
    exampleEn: 'She managed to acquire a good knowledge of English in just six months.',
    exampleTh: 'เธอสามารถเรียนรู้และได้รับความรู้ภาษาอังกฤษที่ดีในเวลาเพียงหกเดือน',
    difficulty: 'Intermediate',
    category: 'Academic',
    mnemonic: {
      story: 'จำเสียง คล้าย "อะ-ควาย-เออร์" -> "ควาย" พยายามขยันจนในที่สุดก็ "ได้รับความรู้" (Acquire)',
      keyword: 'ควายขยัน'
    }
  },
  {
    id: 'w3',
    word: 'Collaborate',
    wordClass: 'Verb',
    phonetic: '/kəˈlæbəreɪt/',
    translation: 'ร่วมมือกัน, ทำงานร่วมกัน',
    definitionEn: 'Work jointly on an activity or project, especially to produce or create something.',
    definitionTh: 'ทำงานร่วมกันในกิจกรรมหรือโครงการ โดยเฉพาะอย่างยิ่งเพื่อผลิตหรือสร้างสรรค์สิ่งใดสิ่งหนึ่ง',
    exampleEn: 'Researchers from several countries collaborate on this medical project.',
    exampleTh: 'นักวิจัยจากหลายประเทศร่วมมือกันในโครงการทางการแพทย์นี้',
    difficulty: 'Intermediate',
    category: 'Business',
    mnemonic: {
      story: 'เสียงคล้าย "คอ-แล็บ-บอ-เรต" -> ไปนอนทำแล็บ (Lab) ด้วยกัน เพื่อ "ทำงานร่วมกัน"',
      keyword: 'Lab (ห้องแล็บ)'
    }
  },
  {
    id: 'w4',
    word: 'Diligent',
    wordClass: 'Adjective',
    phonetic: '/ˈdɪlɪdʒənt/',
    translation: 'ขยันหมั่นเพียร, ตั้งใจทำงาน',
    definitionEn: 'Having or showing care and conscientiousness in one\'s work or duties.',
    definitionTh: 'มีความใส่ใจและตั้งใจจริงในการทำงานหรือหน้าที่ของตน',
    exampleEn: 'A diligent student will always review lessons before examinations.',
    exampleTh: 'นักเรียนที่ขยันหมั่นเพียรจะทบทวนบทเรียนเสมอก่อนการสอบ',
    difficulty: 'Beginner',
    category: 'Academic',
    mnemonic: {
      story: 'เสียงคล้าย "ดิลิ-เจ้นท์" -> ตัวเด่น (Gent) วิ่งทำงานรอบเตียงอย่าง "ขยันขันแข็ง"',
      keyword: 'Gent (สุภาพบุรุษขยัน)'
    }
  },
  {
    id: 'w5',
    word: 'Evaluate',
    wordClass: 'Verb',
    phonetic: '/ɪˈvæljueɪt/',
    translation: 'ประเมินผล, ประเมินค่า',
    definitionEn: 'Form an idea of the amount, number, or value of; assess.',
    definitionTh: 'สร้างความคิดหรือวัดปริมาณ จำนวน หรือมูลค่าของสิ่งใดสิ่งหนึ่ง',
    exampleEn: 'We need to evaluate the results of the marketing campaign before planning.',
    exampleTh: 'เราจำเป็นต้องประเมินผลลัพธ์ของแคมเปญการตลาดก่อนวางแผนต่อ',
    difficulty: 'Intermediate',
    category: 'Business',
    mnemonic: {
      story: 'เสียงคล้าย "อิ-แวล-ยู-เอท" -> คำว่า "Value" แปลว่า มูลค่า ใส่ "-ate" ทำเป็นกริยา แปลว่า "ประเมินค่า"',
      keyword: 'Value (มูลค่า)'
    }
  },
  {
    id: 'w6',
    word: 'Frequent',
    wordClass: 'Adjective',
    phonetic: '/ˈfriːkwənt/',
    translation: 'บ่อยครั้ง, ถี่',
    definitionEn: 'Occurring or done on many occasions with short intervals in between.',
    definitionTh: 'เกิดขึ้นหรือกระทำหลายครั้งโดยมีช่วงเวลาสั้นๆ คั่นระหว่างกัน',
    exampleEn: 'Heavy rain causes frequent floods in this low-lying area.',
    exampleTh: 'ฝนที่ตกหนักทำให้เกิดน้ำท่วมบ่อยครั้งในพื้นที่ลุ่มต่ำแห่งนี้',
    difficulty: 'Beginner',
    category: 'Daily Life',
    mnemonic: {
      story: 'คล้าย "ฟรี-ควีน" -> ได้คูปอง "ฟรี" บ่อยๆ จากพระราชินี (Queen) ทำให้ไปเที่ยว "บ่อยครั้ง"',
      keyword: 'ฟรี + Queen'
    }
  },
  {
    id: 'w7',
    word: 'Gratitude',
    wordClass: 'Noun',
    phonetic: '/ˈɡrætɪtuːd/',
    translation: 'ความรู้สึกกตัญญู, ความรู้สึกขอบคุณ',
    definitionEn: 'The quality of being thankful; readiness to show appreciation for and to return kindness.',
    definitionTh: 'คุณค่าของการเป็นคนขอบคุณ รู้จักตระหนักและตอบแทนความเมตตา',
    exampleEn: 'She expressed her deep gratitude to the doctors who saved her life.',
    exampleTh: 'เธอแสดงความรู้สึกขอบคุณอย่างสุดซึ้งต่อคุณหมอที่ช่วยชีวิตเธอไว้',
    difficulty: 'Beginner',
    category: 'Emotion',
    mnemonic: {
      story: 'คล้ายคำว่า "Great" (ดีมาก) ที่แสดงมารยาทที่ดีงาม คือการมี "ความกตัญญูและขอบคุณ"',
      keyword: 'Great (ยอดเยี่ยม)'
    }
  },
  {
    id: 'w8',
    word: 'Happenstancе',
    wordClass: 'Noun',
    phonetic: '/ˈhæpənstæns/',
    translation: 'เรื่องบังเอิญ, ความบังเอิญ',
    definitionEn: 'Coincidence; a chance situation or event.',
    definitionTh: 'การเกิดขึ้นมาด้วยโชคชะตาหรือความบังเอิญ ไม่ได้ตั้งใจไว้เป๊ะๆ',
    exampleEn: 'They met by pure happenstance at an airport in Tokyo.',
    exampleTh: 'พวกเขาพบกันด้วยเรื่องบังเอิญอย่างแท้จริงที่สนามบินในโตเกียว',
    difficulty: 'Advanced',
    category: 'Travel',
    mnemonic: {
      story: 'รวมคำว่า Happen (เกิดขึ้น) + Stance (ท่ายืน) -> การเกิดขึ้นมาในท่ายืนนั้นๆ ทันทีเป็น "เรื่องบังเอิญ"',
      keyword: 'Happen (เกิด) + Stance (ท่ายืน)'
    }
  },
  {
    id: 'w9',
    word: 'Inevitable',
    wordClass: 'Adjective',
    phonetic: '/ɪnˈevɪtəb(ə)l/',
    translation: 'หลีกเลี่ยงไม่ได้, ต้องเกิดขึ้นแน่ๆ',
    definitionEn: 'Certain to happen; unavoidable.',
    definitionTh: 'แน่นอนที่จะเกิดขึ้น ไม่สามารถหลบเลี่ยงหรือป้องกันได้',
    exampleEn: 'With so many cars on the road, traffic jams are inevitable.',
    exampleTh: 'เมื่อรถเยอะมากบนถนน รถติดจึงเป็นสิ่งที่หลีกเลี่ยงไม่ได้',
    difficulty: 'Advanced',
    category: 'Daily Life',
    mnemonic: {
      story: 'จำว่า "อิน-เอ-วิ-เทเบิล" -> นั่งโต๊ะอาหารอินเดีย (Table) ยังไงก็ต้องกินแป้งที่ "หลีกเลี่ยงไม่ได้"',
      keyword: 'Table (โต๊ะเลี่ยงไม่ได้)'
    }
  },
  {
    id: 'w10',
    word: 'Jeopardy',
    wordClass: 'Noun',
    phonetic: '/ˈdʒepərdi/',
    translation: 'อันตราย, ความเสี่ยงต่อความสูญเสีย',
    definitionEn: 'Danger of loss, harm, or failure.',
    definitionTh: 'ภัยอันตรายที่อาจนำมาซึ่งความล้มเหลว สูญสิ้น หรือเสียหาย',
    exampleEn: 'The company\'s financial crisis put hundreds of jobs in jeopardy.',
    exampleTh: 'วิกฤตการเงินของบริษัททำให้งานคณบดีและลูกจ้างหลายร้อยคนตกอยู่ในอันตราย',
    difficulty: 'Advanced',
    category: 'Business',
    mnemonic: {
      story: 'จำเสียง คล้าย "เจ็บ-พอดดี" -> ถ้าเดินตกหน้าผาจะ "เจ็บพอดี" เพราะทำเรื่อง "อันตรายและเสี่ยง"',
      keyword: 'เจ็บพอดี (อันตราย)'
    }
  },
  {
    id: 'w11',
    word: 'Landscape',
    wordClass: 'Noun',
    phonetic: '/ˈlændskeɪp/',
    translation: 'ทิวทัศน์, ภูมิทัศน์',
    definitionEn: 'All the visible features of an area of countryside or land, often considered in terms of their aesthetic appeal.',
    definitionTh: 'ลักษณะภูมิประเทศที่มองเห็นได้กว้างไกล รวมถึงความสวยงามตามธรรมชาติ',
    exampleEn: 'We stopped on top of the hill to enjoy the beautiful mountain landscape.',
    exampleTh: 'พวกเราหยุดที่ยอดเขาเพื่อดื่มด่ำกับทิวทัศน์ภูเขาที่สวยงาม',
    difficulty: 'Beginner',
    category: 'Travel',
    mnemonic: {
      story: 'คำว่า Land (แผ่นดิน) + scape (ฉาก) -> ฉากของแผ่นดินกว้างก็คือ "ทิวทัศน์"',
      keyword: 'Land (แผ่นดิน) + Cape (แหลม/ฉาก)'
    }
  },
  {
    id: 'w12',
    word: 'Maintain',
    wordClass: 'Verb',
    phonetic: '/meɪnˈteɪn/',
    translation: 'รักษาไว้, บำรุงรักษา',
    definitionEn: 'Cause or enable (a state or activity) to continue; keep in good condition.',
    definitionTh: 'ทำให้สภาพเดิมหรือกิจกรรมเดิมดำเนินต่อไปได้, บำรุงรักษาให้อยู่ในสถานะที่ดี',
    exampleEn: 'It is important to maintain a healthy study-life balance.',
    exampleTh: 'มันเป็นสิ่งสำคัญมากที่จะรักษาสมดุลที่ดีระหว่างการเรียนและการชีวิต',
    difficulty: 'Beginner',
    category: 'Daily Life',
    mnemonic: {
      story: 'จำว่า "เมน-เทน" -> เมนหลัก (Main) ต้องคอยคุ้มครองคน "สิบคน" (Ten) เพื่อ "รักษาความสงบไว้"',
      keyword: 'Main (หลัก) + Ten (สิบ)'
    }
  },
  {
    id: 'w13',
    word: 'Negotiate',
    wordClass: 'Verb',
    phonetic: '/nɪˈɡoʊʃieɪt/',
    translation: 'เจรจาต่อรอง',
    definitionEn: 'Try to reach an agreement or compromise by discussion with others.',
    definitionTh: 'พยายามบรรลุข้อตกลงหรือประนีประนอมโดยผ่านการพูดคุยหารือกับผู้อื่น',
    exampleEn: 'The two diplomats managed to negotiate a peace treaty successfully.',
    exampleTh: 'นักการทูตทั้งสองสามารถเจรจาต่อรองสนธิสัญญาสันติภาพได้สำเร็จ',
    difficulty: 'Intermediate',
    category: 'Business',
    mnemonic: {
      story: 'คล้าย "นิ-โก-เชียต" -> น้องนีจะโกอินเตอร์ เลยต้อง "เจรจาต่อรอง" เรื่องค่าตั๋วเป๊ะๆ',
      keyword: 'นี + โก (ไป)'
    }
  },
  {
    id: 'w14',
    word: 'Obsolete',
    wordClass: 'Adjective',
    phonetic: '/ˌɑːbsəˈliːt/',
    translation: 'ล้าสมัย, ตกรุ่น',
    definitionEn: 'No longer produced or used; out of date.',
    definitionTh: 'ไม่มีการผลิตหรือปรับใช้อีกต่อไป, ตกยุค, ล้าสมัยมาก',
    exampleEn: 'Floppy disks are obsolete and have been replaced by cloud storage.',
    exampleTh: 'แผ่นฟลอปปีดิสก์นั้นล้าสมัยไปแล้วและถูกแทนที่ด้วยพื้นที่เก็บข้อมูลบนคลาวด์',
    difficulty: 'Advanced',
    category: 'Technology',
    mnemonic: {
      story: 'จำคีย์ "อ๊อบ-โซ-ลีท" -> อ๊อบแอบกินซุปสลัดที่ต้มในหม้อสลัดดินเผาโบราณที่แสน "ล้าสมัย"',
      keyword: 'หม้อดินโบราณ (ล้าสมัย)'
    }
  },
  {
    id: 'w15',
    word: 'Persuade',
    wordClass: 'Verb',
    phonetic: '/pərˈsweɪd/',
    translation: 'ชักชวน, โน้มน้าวใจ',
    definitionEn: 'Provide a sound reason for someone to do something; convince.',
    definitionTh: 'ให้เหตุผลที่ดีเพื่อให้บุคคลใดปฏิบัติบางสิ่งบางอย่าง, ชักจูงใจ, เล้าโลม',
    exampleEn: 'I managed to persuade my parents to let me study abroad next semester.',
    exampleTh: 'ฉันสามารถโน้มน้าวใจพ่อแม่ของฉันให้อนุญาตให้ฉันไปเรียนต่อต่างประเทศในภาคเรียนหน้าได้สำเร็จ',
    difficulty: 'Intermediate',
    category: 'Emotion',
    mnemonic: {
      story: 'จำว่า "เพอร์-สเวด" -> ชวนเพื่อนว่า ใส่เสื้อเปียกเหงื่อ (Sweat) สีทอง "โน้มน้าว" ให้ไปออกกำลังกายสิ!',
      keyword: 'Sweat (เหงื่อ)'
    }
  },
  {
    id: 'w16',
    word: 'Quench',
    wordClass: 'Verb',
    phonetic: '/kwentʃ/',
    translation: 'ดับกระหาย, ดับไฟ',
    definitionEn: 'Satisfy one\'s thirst by drinking; extinguish a fire.',
    definitionTh: 'ตอบสนองความกระหายด้วยการดื่มน้ำ หรือดับไฟ ดับความร้อน',
    exampleEn: 'Nothing can quench your thirst on a hot day like a glass of cold water.',
    exampleTh: 'ไม่มีอะไรจะช่วยดับกระหายของคุณในวันร้อนจัดได้ดีไปกว่าน้ำเย็นสักแก้ว',
    difficulty: 'Advanced',
    category: 'Travel',
    mnemonic: {
      story: 'จำเสียง คล้าย "เควนช์" -> เสียงเวลาโยนก้อนหอนร้อนๆ ลงน้ำดัง "เคว้นนนช์!" เพื่อ "ดับไฟ/ดับความร้อน"',
      keyword: 'ฉี่สสส! (โยนน้ำดับไฟ)'
    }
  },
  {
    id: 'w17',
    word: 'Resilient',
    wordClass: 'Adjective',
    phonetic: '/rɪˈzɪliənt/',
    translation: 'ยืดหยุ่น, ฟื้นตัวเร็ว, ล้มแล้วลุกไว',
    definitionEn: 'Able to withstand or recover quickly from difficult conditions.',
    definitionTh: 'สามารถทนทานหรือฟื้นตัวได้อย่างรวดเร็วจากสภาพวิกฤติต่างๆ',
    exampleEn: 'Even after a disastrous earthquake, the resilient citizens rebuilt their town.',
    exampleTh: 'แม้กระทั่งหลังแผ่นดินไหวร้ายแรง ชาวเมืองที่ล้มแล้วลุกไวก็ร่วมมือกันกู้เมืองกลับมา',
    difficulty: 'Advanced',
    category: 'Emotion',
    mnemonic: {
      story: 'คล้าย "รี-ซิ-เลี่ยน" -> วิ่งสู้กับสิงโต (Lion) หลายรอบ (Re) บาดเจ็บแต่ก็ "ฟื้นตัวเร็วมาก"',
      keyword: 'Re (ซ้ำ) + Lion (สิงโต)'
    }
  },
  {
    id: 'w18',
    word: 'Sufficient',
    wordClass: 'Adjective',
    phonetic: '/səˈfɪʃnt/',
    translation: 'เพียงพอ',
    definitionEn: 'Enough; adequate.',
    definitionTh: 'มีปริมาณที่พอดีกับความจำเป็น, ครบครันสำหรับวัตถุประสงค์หนึ่งๆ',
    exampleEn: 'Make sure you have sufficient water and food before going on a trek.',
    exampleTh: 'แต่งกายให้มั่นใจว่าคุณมีน้ำและอาหารที่เพียงพอก่อนที่จะออกเดินทางไกล',
    difficulty: 'Beginner',
    category: 'Daily Life',
    mnemonic: {
      story: 'คล้ายคำว่า "ทรัพย์-ฟิเชียล" -> มีทรัพย์สมบัติ (Sub/Suf) ที่เพียงพอต่อการใช้ชีวิตอย่างสงบสุข',
      keyword: 'ทรัพย์ (เงินทองเพียงพอ)'
    }
  },
  {
    id: 'w19',
    word: 'Terminate',
    wordClass: 'Verb',
    phonetic: '/ˈtɜːrmɪneɪt/',
    translation: 'ยุติ, ทำให้สิ้นสุด',
    definitionEn: 'Bring to an end.',
    definitionTh: 'ทำให้มาถึงจุดสิ้นสุด, ลงเอย, เลิกรา',
    exampleEn: 'The contract will terminate automatically at the end of the year.',
    exampleTh: 'สัญญาฉบับนี้จะสิ้นสุดลงโดยอัตโนมัติเมื่อถึงสิ้นปี',
    difficulty: 'Intermediate',
    category: 'Business',
    mnemonic: {
      story: 'นึกถึงหนังเรื่อง "Terminator" (คนเหล็ก) ที่ได้รับมอบหมายภารกิจมาเพื่อ "ทำลายล้าง/ยุติ"',
      keyword: 'Terminator (คนเหล็กทำลายล้าง)'
    }
  },
  {
    id: 'w20',
    word: 'Vivid',
    wordClass: 'Adjective',
    phonetic: '/ˈvɪvɪd/',
    translation: 'เจิดจ้า, ชัดเจน, มีชีวิตชีวา',
    definitionEn: 'Producing powerful feelings or strong, clear images in the mind.',
    definitionTh: 'แสดงสีสันเจิดจ้าแจ่มชัด หรือก่อให้เกิดจินตภาพหรือภาพความรู้สึกที่สดในสมอง',
    exampleEn: 'I still have a vivid memory of my first trip to the ocean when I was five.',
    exampleTh: 'ฉันยังคงมีความทรงจำที่ชัดเจนและมีชีวิตชีวาเกี่ยวกับการไปเที่ยวทะเลครั้งแรกตอนห้าขวบ',
    difficulty: 'Intermediate',
    category: 'Daily Life',
    mnemonic: {
      story: 'จำว่า "วิ-วิศ" -> เด็กชื่อวิวิศทำการวาดภาพสีน้ำได้ "ชัดเจนและมีชีวิตชีวามาก"',
      keyword: 'วิวิศวาดภาพ'
    }
  }
];
