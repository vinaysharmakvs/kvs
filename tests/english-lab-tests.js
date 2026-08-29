const TEST_BANK = {
  present: {
    title: "Present Tense",
    note: "Simple present, present continuous, present perfect and present perfect continuous.",
    levels: {
      easy: [
        ["I ___ to school every day. (go)", "go"],
        ["She ___ milk every morning. (drink)", "drinks"],
        ["They ___ football on Sundays. (play)", "play"],
        ["He ___ his homework at night. (do)", "does"],
        ["We ___ English in class. (learn)", "learn"]
      ],
      medium: [
        ["She ___ a story now. (read)", "is reading"],
        ["The children ___ in the park. (play)", "are playing"],
        ["I ___ my lunch now. (eat)", "am eating"],
        ["He ___ to the teacher. (listen)", "is listening"],
        ["We ___ for the bus. (wait)", "are waiting"]
      ],
      hard: [
        ["I ___ my work. (finish)", "have finished"],
        ["She ___ the answer. (write)", "has written"],
        ["They ___ the room. (clean)", "have cleaned"],
        ["He ___ his bag. (pack)", "has packed"],
        ["We ___ this lesson. (complete)", "have completed"]
      ],
      expert: [
        ["They ___ cricket for two hours. (play)", "have been playing"],
        ["She ___ since morning. (study)", "has been studying"],
        ["I ___ English for one year. (learn)", "have been learning"],
        ["He ___ in this school since April. (read)", "has been reading"],
        ["We ___ for you for ten minutes. (wait)", "have been waiting"]
      ]
    }
  },
  past: {
    title: "Past Tense",
    note: "Simple past, past continuous, past perfect and past perfect continuous.",
    levels: {
      easy: [["I ___ my friend yesterday. (meet)", "met"], ["She ___ a song. (sing)", "sang"], ["They ___ the match. (win)", "won"], ["He ___ late. (come)", "came"], ["We ___ a movie. (watch)", "watched"]],
      medium: [["She ___ a book when I came. (read)", "was reading"], ["They ___ cricket at 5 pm. (play)", "were playing"], ["I ___ dinner when you called. (eat)", "was eating"], ["He ___ in the class. (write)", "was writing"], ["We ___ to music. (listen)", "were listening"]],
      hard: [["The train ___ before we reached. (leave)", "had left"], ["She ___ lunch before school. (finish)", "had finished"], ["They ___ the room before guests came. (clean)", "had cleaned"], ["He ___ the answer before the bell rang. (write)", "had written"], ["I ___ the book before the test. (read)", "had read"]],
      expert: [["They ___ for an hour before rain started. (play)", "had been playing"], ["She ___ since morning before I arrived. (study)", "had been studying"], ["I ___ there for ten minutes before the bus came. (wait)", "had been waiting"], ["He ___ English for months before the exam. (learn)", "had been learning"], ["We ___ before the teacher entered. (practice)", "had been practicing", "had been practising"]]
    }
  },
  future: {
    title: "Future Tense",
    note: "Simple future, future continuous, future perfect and future perfect continuous.",
    levels: {
      easy: [["I ___ tomorrow. (come)", "will come"], ["She ___ the test. (pass)", "will pass"], ["They ___ cricket. (play)", "will play"], ["He ___ a letter. (write)", "will write"], ["We ___ you. (help)", "will help"]],
      medium: [["I ___ at this time tomorrow. (study)", "will be studying"], ["She ___ dinner at 8 pm. (cook)", "will be cooking"], ["They ___ in the park. (walk)", "will be walking"], ["He ___ the match tomorrow evening. (watch)", "will be watching"], ["We ___ English next week. (practice)", "will be practicing", "will be practising"]],
      hard: [["I ___ my project by next month. (complete)", "will have completed"], ["She ___ the chapter by Monday. (finish)", "will have finished"], ["They ___ the work by evening. (do)", "will have done"], ["He ___ the letter by tomorrow. (write)", "will have written"], ["We ___ the lesson by next week. (learn)", "will have learned", "will have learnt"]],
      expert: [["By next year, I ___ here for five years. (study)", "will have been studying"], ["By 6 pm, she ___ for three hours. (work)", "will have been working"], ["By next month, they ___ for two years. (practice)", "will have been practicing", "will have been practising"], ["By tomorrow, he ___ for ten hours. (travel)", "will have been traveling", "will have been travelling"], ["By 2027, we ___ English for three years. (learn)", "will have been learning"]]
    }
  },
  articles: {
    title: "A, An & The",
    note: "Articles for vowel sounds, consonant sounds and specific nouns.",
    levels: {
      easy: [["I saw ___ elephant.", "an"], ["She has ___ pencil.", "a"], ["He ate ___ apple.", "an"], ["This is ___ book.", "a"], ["I need ___ umbrella.", "an"]],
      medium: [["___ sun rises in the east.", "the"], ["He is ___ honest boy.", "an"], ["She bought ___ uniform.", "a"], ["I saw ___ owl at night.", "an"], ["This is ___ best answer.", "the"]],
      hard: [["I visited ___ Taj Mahal.", "the"], ["He wants to be ___ engineer.", "an"], ["She is ___ European teacher.", "a"], ["Please close ___ door.", "the"], ["I waited for ___ hour.", "an"]],
      expert: [["___ Ganga is a holy river.", "the"], ["He gave me ___ one-rupee coin.", "a"], ["She is ___ MBA student.", "an"], ["This is ___ useful idea.", "a"], ["___ Himalayas are beautiful.", "the"]]
    }
  },
  routine: {
    title: "Daily Routine Verbs",
    note: "Everyday action words and complete speaking sentences.",
    levels: {
      easy: [["I ___ up early. (wake)", "wake"], ["I ___ my teeth. (brush)", "brush"], ["I ___ breakfast. (eat)", "eat"], ["I ___ water. (drink)", "drink"], ["I ___ to school. (go)", "go"]],
      medium: [["She ___ her uniform. (wear)", "wears"], ["He ___ a story at night. (read)", "reads"], ["My brother ___ neatly. (write)", "writes"], ["My sister ___ after school. (play)", "plays"], ["Mother ___ dinner. (cook)", "cooks"]],
      hard: [["I ___ my homework before dinner. (complete)", "complete"], ["She ___ her bag every night. (pack)", "packs"], ["He ___ his shoes before school. (polish)", "polishes"], ["We ___ our classroom clean. (keep)", "keep"], ["They ___ their parents. (help)", "help"]],
      expert: [["After I wake up, I ___ my bed. (make)", "make"], ["Before school, she ___ her timetable. (check)", "checks"], ["Every evening, he ___ what he learned. (revise)", "revises", "reviews"], ["After dinner, I ___ my school bag. (arrange)", "arrange"], ["Before sleeping, we ___ a short prayer. (say)", "say"]]
    }
  }
};

const PARAGRAPH_TEST_BANK = {
  title: "Paragraph Hindi to English",
  note: "Translate one complete Hindi paragraph into English. Choose difficulty and target word length, then check only at the end.",
  levels: {
    easy: {
      label: "Easy",
      note: "Daily life, school routine and simple present/past/future ideas.",
      hindi: {
        300: "मैं रोज़ सुबह जल्दी उठता हूँ। मैं अपना बिस्तर ठीक करता हूँ और फिर ब्रश करता हूँ। मेरी माँ मेरे लिए नाश्ता बनाती हैं। मैं समय पर स्कूल जाता हूँ और कक्षा में ध्यान से पढ़ता हूँ। मुझे अंग्रेज़ी और गणित पढ़ना अच्छा लगता है। स्कूल में मैं अपने दोस्तों के साथ खेलता हूँ और शिक्षकों की बात ध्यान से सुनता हूँ। घर आने के बाद मैं थोड़ा आराम करता हूँ, फिर अपना होमवर्क पूरा करता हूँ। शाम को मैं अपने परिवार के साथ समय बिताता हूँ। मैं हर दिन कुछ नया सीखना चाहता हूँ और अपनी पढ़ाई में बेहतर बनना चाहता हूँ।",
        400: "हमारा स्कूल हमारे जीवन का बहुत महत्वपूर्ण हिस्सा है। स्कूल में बच्चे पढ़ना, लिखना, बोलना और अच्छे संस्कार सीखते हैं। हर सुबह हम प्रार्थना करते हैं और अपने शिक्षकों को नमस्ते कहते हैं। हमारी कक्षा साफ और सुंदर रहती है। शिक्षक हमें कहानियों, गतिविधियों और उदाहरणों से पढ़ाते हैं ताकि पढ़ाई आसान लगे। हम खेल, संगीत, कला और समूह गतिविधियों में भी भाग लेते हैं। इनसे हमारा आत्मविश्वास बढ़ता है। अगर कोई बच्चा गलती करता है, तो शिक्षक उसे प्यार से समझाते हैं। मैं अपने स्कूल से बहुत प्यार करता हूँ क्योंकि यहाँ मुझे सीखने, बोलने और आगे बढ़ने का मौका मिलता है।",
        500: "मेरी दिनचर्या मुझे अनुशासित बनाती है। मैं सुबह उठकर सबसे पहले पानी पीता हूँ और फिर पढ़ाई की तैयारी करता हूँ। स्कूल जाने से पहले मैं अपना बैग, किताबें और टिफिन देखता हूँ। स्कूल में मैं पूरी कोशिश करता हूँ कि शिक्षक की बात ध्यान से सुनूँ और समय पर काम पूरा करूँ। अवकाश में मैं दोस्तों के साथ खेलता हूँ, लेकिन कक्षा में शांत रहता हूँ। घर लौटकर मैं अपने माता-पिता को अपने दिन के बारे में बताता हूँ। फिर मैं होमवर्क करता हूँ और कठिन शब्दों का अभ्यास करता हूँ। रात को मैं अगले दिन की तैयारी करता हूँ। अच्छी आदतें हमें जिम्मेदार और आत्मविश्वासी बनाती हैं।",
        600: "एक अच्छा विद्यार्थी केवल किताबों से नहीं सीखता, बल्कि अपने व्यवहार से भी सीखता है। उसे समय का सम्मान करना चाहिए, शिक्षकों की बात सुननी चाहिए और अपने दोस्तों की मदद करनी चाहिए। जब हम किसी से विनम्र भाषा में बात करते हैं, तो लोग हमें पसंद करते हैं। स्कूल में हमें साफ-सफाई, पानी बचाना, बिजली बचाना और अपनी चीज़ों की देखभाल करना भी सीखना चाहिए। पढ़ाई के साथ खेल और रचनात्मक गतिविधियाँ भी जरूरी हैं क्योंकि वे हमारे मन को ताज़ा रखती हैं। अगर हम रोज़ थोड़ा अभ्यास करें, तो धीरे-धीरे हमारी अंग्रेज़ी, लिखावट और बोलने का आत्मविश्वास बेहतर हो सकता है।"
      },
      keywords: ["morning", "school", "teacher", "homework", "learn", "family", "friends", "confidence", "routine", "better"]
    },
    medium: {
      label: "Medium",
      note: "Mixed tenses with habits, events and reflections.",
      hindi: {
        300: "कल हमारे स्कूल में एक विशेष गतिविधि हुई। सभी बच्चे अपनी-अपनी टीमों में बैठे थे और शिक्षक ने हमें एक कहानी सुनाई। कहानी सुनने के बाद हमें उसके बारे में बोलना था। पहले मैं थोड़ा घबरा रहा था, लेकिन जब मेरी बारी आई, तो मैंने धीरे-धीरे बोलना शुरू किया। मेरे दोस्तों ने मेरी बात ध्यान से सुनी। शिक्षक ने कहा कि अगर हम रोज़ बोलने का अभ्यास करेंगे, तो हमारा आत्मविश्वास बढ़ेगा। घर आकर मैंने अपने माता-पिता को बताया कि मैंने कक्षा में बोलने की कोशिश की। वे बहुत खुश हुए।",
        400: "पिछले महीने मैंने अपनी पढ़ाई में सुधार करने का निर्णय लिया था। पहले मैं कठिन शब्दों को देखकर रुक जाता था और बोलने से बचता था। अब मैं रोज़ दस मिनट पढ़ने और पाँच वाक्य बोलने का अभ्यास कर रहा हूँ। मेरी शिक्षक ने मुझे छोटे-छोटे लक्ष्य दिए। मैंने कई कहानियाँ पढ़ीं, नए शब्द सीखे और अपने वाक्य सुधारने की कोशिश की। जब मैंने पहली बार बिना रुके एक पूरा पैराग्राफ पढ़ा, तो मुझे बहुत अच्छा लगा। अब मुझे समझ आ गया है कि लगातार अभ्यास से कोई भी बच्चा बेहतर बन सकता है।",
        500: "जब बच्चे केवल उत्तर याद करते हैं, तो वे जल्दी भूल सकते हैं। लेकिन जब वे किसी विचार को अपने शब्दों में समझाते हैं, तो सीखना मजबूत हो जाता है। इसी कारण हमारी कक्षा में शिक्षक हमें बोलने, लिखने और चर्चा करने का अवसर देते हैं। कभी-कभी हम समूह में काम करते हैं और कभी अकेले उत्तर लिखते हैं। अगर किसी बच्चे को समझ नहीं आता, तो शिक्षक उसे दोबारा समझाते हैं। इस तरीके से बच्चों में डर कम होता है और जिज्ञासा बढ़ती है। मुझे लगता है कि पढ़ाई का असली उद्देश्य केवल अंक लाना नहीं, बल्कि सोचने और सही तरीके से बोलने की क्षमता विकसित करना है।",
        600: "अच्छी शिक्षा बच्चे को केवल परीक्षा के लिए तैयार नहीं करती, बल्कि जीवन के लिए तैयार करती है। एक विद्यार्थी को पढ़ाई के साथ आत्मविश्वास, अनुशासन, जिम्मेदारी और संवाद कौशल भी सीखने चाहिए। आज के समय में जो बच्चा स्पष्ट बोल सकता है, सही प्रश्न पूछ सकता है और अपनी बात समझा सकता है, वह आगे चलकर बेहतर अवसर पा सकता है। इसलिए हमें रोज़ पढ़ना, लिखना, सुनना और बोलना चाहिए। यदि हम गलती करते हैं, तो हमें शर्मिंदा नहीं होना चाहिए। गलती सीखने का हिस्सा है। धीरे-धीरे अभ्यास करने से भाषा मजबूत होती है और बच्चा अपने विचारों को साफ ढंग से व्यक्त करना सीखता है।"
      },
      keywords: ["yesterday", "activity", "story", "practice", "improve", "confidence", "paragraph", "teacher", "parents", "discussion", "education", "life"]
    },
    hard: {
      label: "Hard",
      note: "Longer explanations with cause, result and comparison.",
      hindi: {
        300: "यदि कोई विद्यार्थी अंग्रेज़ी बोलने से डरता है, तो इसका मतलब यह नहीं कि वह कमजोर है। कई बार बच्चे इसलिए नहीं बोलते क्योंकि उन्हें गलती करने का डर होता है। शिक्षक और माता-पिता को ऐसे बच्चों को डाँटना नहीं चाहिए, बल्कि उन्हें छोटे वाक्यों से शुरुआत करने के लिए प्रेरित करना चाहिए। जब बच्चा सुरक्षित महसूस करता है, तो वह धीरे-धीरे बोलना शुरू करता है। पहले वह एक वाक्य बोलेगा, फिर दो वाक्य और फिर पूरा पैराग्राफ। आत्मविश्वास एक दिन में नहीं बनता, लेकिन सही माहौल और नियमित अभ्यास से हर बच्चा बेहतर बोल सकता है।",
        400: "आज की पढ़ाई में तकनीक का उपयोग बढ़ रहा है, लेकिन शिक्षक की भूमिका अभी भी सबसे महत्वपूर्ण है। एक ऐप बच्चे को अभ्यास दे सकता है, लेकिन शिक्षक बच्चे की झिझक, भावनाएँ और सीखने की गति को समझता है। यदि तकनीक और शिक्षक दोनों साथ काम करें, तो सीखना अधिक प्रभावी हो सकता है। उदाहरण के लिए, बच्चा वेबसाइट पर पढ़ने का अभ्यास कर सकता है और शिक्षक कक्षा में उसकी उच्चारण, गति और आत्मविश्वास पर ध्यान दे सकता है। इस तरह माता-पिता भी प्रगति देख सकते हैं और बच्चे को घर पर सही सहयोग दे सकते हैं।",
        500: "परीक्षा में अच्छे अंक महत्वपूर्ण हैं, लेकिन वे बच्चे की पूरी क्षमता नहीं दिखाते। कुछ बच्चे लिखने में अच्छे होते हैं, कुछ बोलने में, कुछ गणित में और कुछ रचनात्मक गतिविधियों में। इसलिए स्कूल को केवल अंकों पर ध्यान नहीं देना चाहिए। उसे बच्चे की पढ़ने की गति, समझ, व्यवहार, जिज्ञासा, आत्मविश्वास और समस्या हल करने की क्षमता को भी देखना चाहिए। जब माता-पिता को ऐसी पूरी रिपोर्ट मिलती है, तो वे बच्चे को बेहतर समझ पाते हैं। अगर रिपोर्ट में यह बताया जाए कि बच्चा कहाँ मजबूत है और कहाँ अभ्यास की जरूरत है, तो सुधार की दिशा साफ हो जाती है।",
        600: "किसी भी बच्चे का विकास एक लंबी यात्रा है। शुरुआत में बच्चा अक्षर पहचानता है, फिर ध्वनियाँ समझता है, शब्द पढ़ता है, वाक्य बनाता है और अंत में अपने विचार व्यक्त करना सीखता है। इस यात्रा में जल्दी करना सही नहीं है। यदि नींव कमजोर होगी, तो आगे की पढ़ाई कठिन लगेगी। इसलिए हर स्तर पर अभ्यास, प्रतिक्रिया और प्रोत्साहन जरूरी है। माता-पिता को यह समझना चाहिए कि तुलना करने से बच्चे का आत्मविश्वास कम हो सकता है, जबकि छोटी प्रगति की सराहना करने से वह और मेहनत करता है। एक अच्छा सीखने वाला माहौल बच्चे को डर से बाहर निकालकर स्वतंत्र सोच की ओर ले जाता है।"
      },
      keywords: ["student", "fear", "mistake", "safe", "environment", "technology", "teacher", "progress", "parents", "report", "confidence", "development", "foundation"]
    },
    expert: {
      label: "Expert",
      note: "Advanced paragraph translation with opinion, reasoning and connected ideas.",
      hindi: {
        300: "भविष्य की शिक्षा केवल पाठ्यपुस्तक पर आधारित नहीं होगी। आने वाले समय में बच्चों को भाषा, तकनीक, रचनात्मकता और समस्या समाधान को साथ लेकर सीखना होगा। जो विद्यार्थी अपने विचारों को स्पष्ट रूप से लिख और बोल पाएगा, वह किसी भी क्षेत्र में आगे बढ़ सकता है। इसलिए अंग्रेज़ी सीखना केवल विषय नहीं, बल्कि आत्मविश्वास और अवसर का माध्यम है। यदि बच्चे को सही उम्र से पढ़ने, बोलने और सोचने का अभ्यास मिले, तो वह धीरे-धीरे स्वतंत्र सीखने वाला बन सकता है।",
        400: "एक आधुनिक स्कूल की जिम्मेदारी केवल पाठ पढ़ाना नहीं है, बल्कि हर बच्चे की सीखने की यात्रा को समझना भी है। कुछ बच्चों को पढ़ने में अधिक समय लगता है, कुछ बच्चों को बोलने में संकोच होता है और कुछ बच्चे जल्दी समझते हैं पर लिखने में गलती करते हैं। यदि स्कूल इन संकेतों को नियमित रूप से मापे, तो शिक्षक और माता-पिता मिलकर सही सहायता दे सकते हैं। यही कारण है कि सीखने को दृश्य, मापने योग्य और व्यक्तिगत बनाना जरूरी है। जब बच्चा अपनी प्रगति देखता है, तो उसे लगता है कि मेहनत का परिणाम दिख रहा है।",
        500: "कई बार हम बच्चों से केवल सही उत्तर की उम्मीद करते हैं, लेकिन असली सीख तब होती है जब बच्चा अपने विचार को समझाने की कोशिश करता है। गलत वाक्य भी सीखने की शुरुआत हो सकता है, यदि शिक्षक उसे सुधारकर सही दिशा दे। भाषा सीखने में सुनना, पढ़ना, बोलना और लिखना चारों कौशल जुड़े हुए हैं। यदि बच्चा रोज़ थोड़ा पढ़ता है, नए शब्दों का प्रयोग करता है और छोटे विषयों पर बोलता है, तो उसकी अभिव्यक्ति बेहतर होती है। इस प्रक्रिया में माता-पिता का सहयोग बहुत महत्वपूर्ण है। घर पर पाँच मिनट की बातचीत भी बच्चे के आत्मविश्वास में बड़ा बदलाव ला सकती है।",
        600: "भारत में शिक्षा तेजी से बदल रही है। अब बच्चों को केवल याद करने की आदत से आगे बढ़ाकर समझने, प्रश्न पूछने, संवाद करने और रचनात्मक समाधान सोचने की दिशा में ले जाना होगा। एक अच्छा स्कूल वही है जो बच्चे की क्षमता को जल्दी पहचान सके और उसे सही मार्गदर्शन दे सके। यदि किसी बच्चे की पढ़ने की fluency कम है, तो उसे अतिरिक्त अभ्यास चाहिए। यदि बच्चा विचार समझता है लेकिन बोल नहीं पाता, तो उसे confidence-building activities चाहिए। यदि बच्चा तेज है, तो उसे चुनौतीपूर्ण कार्य मिलने चाहिए। इस तरह व्यक्तिगत सीखने की योजना हर बच्चे को उसकी अपनी गति से आगे बढ़ने में मदद करती है।"
      },
      keywords: ["future", "education", "technology", "creativity", "problem solving", "confidence", "learning journey", "personal", "parents", "teacher", "communication", "progress", "individual"]
    }
  }
};

const ADDITIONAL_PARAGRAPHS = {
  easy: {
    300: [
      "मेरे घर में सभी लोग सुबह जल्दी उठते हैं। मैं पहले अपने माता-पिता को नमस्ते कहता हूँ और फिर पढ़ाई की मेज साफ करता हूँ। मेरी बहन स्कूल की किताबें तैयार करती है। हम साथ में नाश्ता करते हैं और समय पर स्कूल के लिए निकलते हैं। स्कूल में मैं ध्यान से पढ़ता हूँ, दोस्तों के साथ अच्छा व्यवहार करता हूँ और कक्षा में हाथ उठाकर उत्तर देता हूँ। शाम को मैं खेलता हूँ और फिर अपना होमवर्क पूरा करता हूँ। मुझे अच्छी आदतें सीखना पसंद है क्योंकि वे मुझे जिम्मेदार बनाती हैं।"
    ],
    400: [
      "मेरा पसंदीदा दिन रविवार है। रविवार को मैं थोड़ा देर से उठता हूँ, लेकिन अपना काम समय पर पूरा करता हूँ। सुबह मैं अपने परिवार के साथ नाश्ता करता हूँ और फिर अपनी किताबें व्यवस्थित करता हूँ। दोपहर में मैं कहानी पढ़ता हूँ या चित्र बनाता हूँ। शाम को मैं पार्क जाता हूँ और दोस्तों के साथ खेलता हूँ। कभी-कभी हम घर पर मिलकर कोई छोटा खेल खेलते हैं। रात को मैं अगले सप्ताह की तैयारी करता हूँ। रविवार मुझे आराम भी देता है और नई ऊर्जा भी देता है।"
    ],
    500: [
      "मेरी कक्षा में बहुत अच्छी सीखने की आदतें हैं। जब शिक्षक कक्षा में आते हैं, तो हम उनका अभिवादन करते हैं। हम अपनी किताबें ठीक से रखते हैं और कक्षा को साफ रखने की कोशिश करते हैं। यदि कोई बच्चा उत्तर नहीं दे पाता, तो दूसरे बच्चे उसका मज़ाक नहीं उड़ाते। शिक्षक हमें समझाते हैं कि सीखना धैर्य से होता है। हम कहानियाँ सुनते हैं, शब्द पढ़ते हैं, वाक्य बोलते हैं और फिर अभ्यास करते हैं। मुझे लगता है कि ऐसी कक्षा में हर बच्चा आत्मविश्वास से सीख सकता है।"
    ]
  },
  medium: {
    300: [
      "पिछले सप्ताह हमारी कक्षा ने स्वच्छता पर एक छोटी प्रस्तुति तैयार की। पहले हमने विषय पर चर्चा की और फिर हर बच्चे को एक भूमिका दी गई। कुछ बच्चों ने पोस्टर बनाए, कुछ ने नारे लिखे और कुछ ने बोलने का अभ्यास किया। जब प्रस्तुति शुरू हुई, तो मैं शुरुआत में धीरे बोल रहा था, लेकिन बाद में मेरा आत्मविश्वास बढ़ गया। शिक्षक ने कहा कि तैयारी और अभ्यास से बोलना आसान हो जाता है। उस दिन मुझे समझ आया कि समूह में काम करने से हम एक-दूसरे से बहुत कुछ सीखते हैं।"
    ],
    400: [
      "जब मैं छोटा था, तो मुझे अंग्रेज़ी पढ़ने में कठिनाई होती थी। मैं लंबे शब्द देखकर रुक जाता था और जल्दी हार मान लेता था। इस वर्ष मेरी शिक्षक ने मुझे रोज़ छोटे पैराग्राफ पढ़ने को कहा। शुरुआत में मैं धीरे पढ़ता था, लेकिन अब मेरी गति और समझ दोनों बेहतर हो रही हैं। मैंने यह भी सीखा कि कठिन शब्दों को ध्वनि में तोड़कर पढ़ना चाहिए। अब जब मैं कोई नई कहानी पढ़ता हूँ, तो पहले शीर्षक देखता हूँ, फिर मुख्य शब्द पहचानता हूँ और फिर पूरा पैराग्राफ पढ़ता हूँ।"
    ],
    500: [
      "एक दिन हमारे स्कूल में विज्ञान गतिविधि करवाई गई। शिक्षक ने हमें पौधों के बारे में बताया और फिर हमें छोटे गमलों में बीज लगाने दिए। हमने मिट्टी डाली, पानी दिया और गमलों को धूप वाली जगह रखा। अगले कुछ दिनों तक हम पौधों को देखते रहे। जब छोटे पत्ते निकले, तो पूरी कक्षा बहुत खुश हुई। इस गतिविधि से हमने समझा कि पौधों को पानी, धूप और देखभाल की जरूरत होती है। हमने यह भी सीखा कि प्रकृति की रक्षा करना हमारी जिम्मेदारी है। ऐसी गतिविधियाँ पढ़ाई को यादगार बना देती हैं।"
    ]
  },
  hard: {
    300: [
      "आज के बच्चों के सामने सबसे बड़ी चुनौती ध्यान केंद्रित करना है। मोबाइल, वीडियो और खेलों की वजह से कई बच्चे जल्दी विचलित हो जाते हैं। इसलिए पढ़ाई को केवल लंबा और कठिन बनाने से परिणाम बेहतर नहीं होंगे। बच्चों को छोटे लक्ष्य, स्पष्ट निर्देश और रोचक गतिविधियाँ चाहिए। यदि शिक्षक पाठ को कहानी, उदाहरण और अभ्यास से जोड़ें, तो बच्चा अधिक ध्यान देता है। माता-पिता भी घर पर शांत वातावरण बनाकर मदद कर सकते हैं। ध्यान धीरे-धीरे विकसित होता है और इसके लिए नियमित अभ्यास जरूरी है।"
    ],
    400: [
      "नेतृत्व केवल मंच पर बोलने का नाम नहीं है। नेतृत्व का अर्थ है जिम्मेदारी लेना, दूसरों की मदद करना और सही निर्णय लेना। स्कूल में बच्चे छोटे-छोटे कार्यों से नेतृत्व सीख सकते हैं, जैसे कक्षा की सफाई देखना, किताबें बाँटना या समूह गतिविधि में साथियों को समझाना। जब बच्चे ऐसे कार्य करते हैं, तो उनमें आत्मविश्वास और सहयोग की भावना बढ़ती है। यदि शिक्षक हर बच्चे को अवसर दें, तो शांत स्वभाव वाला बच्चा भी धीरे-धीरे आगे आ सकता है। सही नेतृत्व बच्चों को अनुशासन और संवेदनशीलता दोनों सिखाता है।"
    ],
    500: [
      "भाषा सीखने में केवल व्याकरण याद करना काफी नहीं है। विद्यार्थी को शब्दों का अर्थ समझना, उन्हें वाक्यों में प्रयोग करना और अपने विचारों को जोड़ना भी आना चाहिए। कई बच्चे नियम जानते हैं, लेकिन बोलते समय रुक जाते हैं क्योंकि उन्हें अभ्यास कम मिलता है। इसलिए हर दिन छोटे बोलने के कार्य होने चाहिए। उदाहरण के लिए, बच्चा अपने दिन के बारे में पाँच वाक्य बोले, किसी चित्र का वर्णन करे या कहानी का सार बताए। जब बच्चा बार-बार बोलता है, तो उसकी fluency बढ़ती है और वह गलतियों से डरना छोड़ देता है।"
    ]
  },
  expert: {
    300: [
      "डिजिटल युग में शिक्षा का उद्देश्य केवल जानकारी देना नहीं रह गया है, क्योंकि जानकारी हर जगह उपलब्ध है। असली चुनौती यह है कि विद्यार्थी उस जानकारी को समझे, उसका विश्लेषण करे और सही परिस्थिति में उसका उपयोग करे। इसलिए आधुनिक सीखने में critical thinking, communication और creativity बहुत महत्वपूर्ण हैं। यदि स्कूल बच्चों को प्रश्न पूछने, चर्चा करने और अपने विचार लिखने का अवसर दें, तो वे भविष्य के लिए बेहतर तैयार होंगे। शिक्षा को बच्चे की जिज्ञासा को दबाना नहीं चाहिए, बल्कि उसे सही दिशा देनी चाहिए।"
    ],
    400: [
      "एक प्रभावी सीखने की प्रणाली वह होती है जो बच्चे की कमजोरी को समय पर पहचान ले। यदि बच्चा पढ़ते समय बार-बार रुकता है, तो उसे fluency support चाहिए। यदि वह उत्तर जानता है लेकिन बोल नहीं पाता, तो उसे confidence practice चाहिए। यदि वह तेज पढ़ता है लेकिन अर्थ नहीं समझता, तो comprehension पर काम करना चाहिए। जब शिक्षक, माता-पिता और तकनीक मिलकर इन संकेतों को देखते हैं, तो बच्चे के लिए व्यक्तिगत योजना बन सकती है। ऐसी प्रणाली बच्चे को अंकों से आगे बढ़ाकर वास्तविक विकास की दिशा में ले जाती है।"
    ],
    500: [
      "किसी भी समाज की प्रगति उसके बच्चों की शिक्षा पर निर्भर करती है। यदि बच्चे केवल निर्देश मानना सीखते हैं, तो वे सीमित सोच के साथ बड़े हो सकते हैं। लेकिन यदि उन्हें सोचने, प्रश्न पूछने, संवाद करने और समाधान खोजने के अवसर मिलते हैं, तो वे जिम्मेदार नागरिक बन सकते हैं। स्कूलों को बच्चों को असफलता से डराना नहीं चाहिए। उन्हें यह सिखाना चाहिए कि हर गलती सुधार का अवसर है। जब बच्चा सुरक्षित वातावरण में अभ्यास करता है, तो उसका आत्मविश्वास बढ़ता है और वह नए विचारों को अपनाने के लिए तैयार होता है।"
    ]
  }
};

const levels = ["easy", "medium", "hard", "expert"];
const paragraphLengths = [300, 400, 500, 600];
let activeTopic = "present";
let activeLevel = "easy";
let activeParagraphWords = Number(localStorage.getItem("kidsverseParagraphWordTarget") || 300);
let activeParagraphVariant = Number(localStorage.getItem("kidsverseParagraphVariant") || 0);
const answers = JSON.parse(localStorage.getItem("kidsverseEnglishTestAnswers") || "{}");
const checkedLevels = JSON.parse(localStorage.getItem("kidsverseEnglishCheckedLevels") || "{}");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const normalize = (value) => String(value || "").trim().toLowerCase().replace(/[?.!,;:]/g, "").replace(/\s+/g, " ");
const wordCount = (value) => normalize(value).split(" ").filter(Boolean).length;

function save() {
  localStorage.setItem("kidsverseEnglishTestAnswers", JSON.stringify(answers));
  localStorage.setItem("kidsverseEnglishCheckedLevels", JSON.stringify(checkedLevels));
  localStorage.setItem("kidsverseParagraphWordTarget", String(activeParagraphWords));
  localStorage.setItem("kidsverseParagraphVariant", String(activeParagraphVariant));
}
function key(topic, level, index) { return `${topic}.${level}.${index}`; }
function levelKey(topic = activeTopic, level = activeLevel) { return `${topic}.${level}`; }
function paragraphKey(level = activeLevel, words = activeParagraphWords, variant = activeParagraphVariant) { return `paragraph.${level}.${words}.${variant}`; }
function isParagraphTopic(topic = activeTopic) { return topic === "paragraph"; }
function currentTopicData(topic = activeTopic) { return isParagraphTopic(topic) ? PARAGRAPH_TEST_BANK : TEST_BANK[topic]; }
function paragraphOptions(level = activeLevel, words = activeParagraphWords) {
  const base = PARAGRAPH_TEST_BANK.levels[level].hindi[words];
  const extra = ADDITIONAL_PARAGRAPHS[level]?.[words] || [];
  return [base, ...extra].filter(Boolean);
}
function questionSet(topic = activeTopic, level = activeLevel) {
  if (isParagraphTopic(topic)) return [];
  return TEST_BANK[topic].levels[level];
}
function isCorrect(topic, level, index) {
  if (isParagraphTopic(topic)) return paragraphPercent(level, activeParagraphWords) >= 70;
  const row = questionSet(topic, level)[index];
  const typed = normalize(answers[key(topic, level, index)]);
  return Boolean(typed && row.slice(1).some((answer) => normalize(answer) === typed));
}
function isLevelChecked(topic = activeTopic, level = activeLevel) {
  return Boolean(checkedLevels[levelKey(topic, level)]);
}
function levelPercent(topic, level) {
  if (isParagraphTopic(topic)) {
    return isLevelChecked(topic, level) ? paragraphPercent(level, activeParagraphWords) : 0;
  }
  if (!isLevelChecked(topic, level)) return 0;
  const rows = TEST_BANK[topic].levels[level];
  const correct = rows.filter((_, index) => isCorrect(topic, level, index)).length;
  return Math.round((correct / rows.length) * 100);
}
function topicPercent(topic) {
  if (isParagraphTopic(topic)) {
    const checked = levels.filter((level) => isLevelChecked(topic, level));
    if (!checked.length) return 0;
    return Math.round(checked.reduce((sum, level) => sum + paragraphPercent(level, activeParagraphWords), 0) / checked.length);
  }
  const all = levels.flatMap((level) => TEST_BANK[topic].levels[level].map((_, index) => [level, index]));
  const correct = all.filter(([level, index]) => isCorrect(topic, level, index)).length;
  return Math.round((correct / all.length) * 100);
}
function overallPercent() {
  const topicKeys = [...Object.keys(TEST_BANK), "paragraph"];
  return Math.round(topicKeys.reduce((sum, topic) => sum + topicPercent(topic), 0) / topicKeys.length);
}

function paragraphPercent(level = activeLevel, words = activeParagraphWords) {
  const data = PARAGRAPH_TEST_BANK.levels[level];
  const typed = normalize(answers[paragraphKey(level, words)]);
  if (!typed) return 0;
  const keywords = data.keywords;
  const matched = keywords.filter((keyword) => typed.includes(normalize(keyword))).length;
  const keywordScore = Math.round((matched / keywords.length) * 60);
  const target = Number(words);
  const wordsWritten = wordCount(typed);
  const lengthScore = Math.min(20, Math.round((wordsWritten / Math.max(80, target * 0.45)) * 20));
  const connectors = ["because", "therefore", "then", "after", "when", "if", "but", "also", "so", "however"];
  const connectorScore = Math.min(20, connectors.filter((item) => typed.includes(item)).length * 4);
  return Math.min(100, keywordScore + lengthScore + connectorScore);
}

function paragraphGrade(percent) {
  if (percent >= 85) return "Excellent translation";
  if (percent >= 70) return "Good translation";
  if (percent >= 50) return "Needs more detail";
  return "Try again with fuller sentences";
}

function renderLevels() {
  const list = $("[data-level-list]");
  list.innerHTML = levels.map((level) => {
    const label = level.charAt(0).toUpperCase() + level.slice(1);
    const percent = levelPercent(activeTopic, level);
    return `<button class="level-button ${level === activeLevel ? "is-active" : ""}" type="button" data-level="${level}"><strong>${label}</strong><span>${percent}% done</span></button>`;
  }).join("");
  $$("[data-level]").forEach((button) => button.addEventListener("click", () => {
    activeLevel = button.dataset.level;
    activeParagraphVariant = 0;
    save();
    render();
  }));
}

function renderParagraphTest() {
  const data = PARAGRAPH_TEST_BANK.levels[activeLevel];
  const checked = isLevelChecked();
  const percent = paragraphPercent();
  const options = paragraphOptions();
  if (activeParagraphVariant >= options.length) activeParagraphVariant = 0;
  const answer = answers[paragraphKey()] || "";
  const target = Number(activeParagraphWords);
  const currentWords = wordCount(answer);
  const selectedHindi = options[activeParagraphVariant];
  $("[data-question-list]").innerHTML = `<article class="paragraph-test-card ${checked ? percent >= 70 ? "is-correct" : "is-wrong" : ""}">
    <div class="paragraph-toolbar">
      <div>
        <span>Target length</span>
        <strong>${target} words</strong>
      </div>
      <div class="paragraph-lengths" aria-label="Choose paragraph word length">
        ${paragraphLengths.map((length) => `<button class="${length === target ? "is-active" : ""}" type="button" data-paragraph-length="${length}">${length}</button>`).join("")}
      </div>
    </div>
    <div class="paragraph-passage-picker" aria-label="Choose paragraph passage">
      ${options.map((_, index) => `<button class="${index === activeParagraphVariant ? "is-active" : ""}" type="button" data-paragraph-variant="${index}">Passage ${index + 1}</button>`).join("")}
    </div>
    <div class="paragraph-prompt">
      <small>Hindi paragraph to translate</small>
      <p>${selectedHindi}</p>
    </div>
    <label class="paragraph-answer">
      <span>Write your English translation here</span>
      <textarea data-paragraph-answer placeholder="Translate the full paragraph in English. Your score will appear only after you press Check Paragraph Test.">${answer.replace(/</g, "&lt;")}</textarea>
    </label>
    <div class="paragraph-live-row">
      <span>${currentWords} words written</span>
      <span>${data.label} level</span>
      <span>${checked ? paragraphGrade(percent) : "Result hidden until final check"}</span>
    </div>
    ${checked ? `<div class="paragraph-result">
      <strong>${percent}%</strong>
      <div>
        <h3>${paragraphGrade(percent)}</h3>
        <p>${percent >= 70 ? "Good work. Your translation includes the main meaning and enough connected English." : "Add more complete sentences, key ideas from the Hindi paragraph and connectors like because, then, after and therefore."}</p>
        <small>Auto-check looks at meaning coverage, target length and sentence connection. Teacher review is still best for final grammar correction.</small>
      </div>
    </div>` : ""}
  </article>`;

  $$("[data-paragraph-length]").forEach((button) => button.addEventListener("click", () => {
    activeParagraphWords = Number(button.dataset.paragraphLength);
    activeParagraphVariant = 0;
    checkedLevels[levelKey()] = false;
    save();
    render();
  }));

  $$("[data-paragraph-variant]").forEach((button) => button.addEventListener("click", () => {
    activeParagraphVariant = Number(button.dataset.paragraphVariant);
    checkedLevels[levelKey()] = false;
    save();
    render();
  }));

  const textarea = $("[data-paragraph-answer]");
  textarea?.addEventListener("input", () => {
    answers[paragraphKey()] = textarea.value;
    checkedLevels[levelKey()] = false;
    save();
    renderProgress();
    const row = $(".paragraph-live-row span");
    if (row) row.textContent = `${wordCount(textarea.value)} words written`;
  });
}

function renderQuestions() {
  if (isParagraphTopic()) {
    renderParagraphTest();
    return;
  }
  const rows = questionSet();
  const checked = isLevelChecked();
  $("[data-question-list]").innerHTML = rows.map((row, index) => {
    const value = answers[key(activeTopic, activeLevel, index)] || "";
    const correct = checked && isCorrect(activeTopic, activeLevel, index);
    const attempted = checked && normalize(value);
    return `<article class="test-question ${correct ? "is-correct" : attempted ? "is-wrong" : checked ? "is-wrong" : ""}">
      <div class="q-number">${index + 1}</div>
      <label>
        <span>${row[0]}</span>
        <div class="answer-row">
          <input type="text" value="${value.replace(/"/g, "&quot;")}" placeholder="Type answer here" data-answer="${index}" autocomplete="off" />
          <b class="check-state">${checked ? correct ? "Correct" : "Wrong" : "Answer saved"}</b>
        </div>
        <small class="hint">Correct answer: ${checked ? row[1] : "Hidden until you check the test"}</small>
      </label>
    </article>`;
  }).join("");
  $$('[data-answer]').forEach((input) => input.addEventListener("input", () => {
    const index = Number(input.dataset.answer);
    answers[key(activeTopic, activeLevel, index)] = input.value;
    checkedLevels[levelKey()] = false;
    save();
    const article = input.closest(".test-question");
    const state = article?.querySelector(".check-state");
    article?.classList.remove("is-correct", "is-wrong");
    if (state) state.textContent = "Answer saved";
    renderLevels();
    renderProgress();
  }));
}

function renderProgress() {
  const overall = overallPercent();
  $("[data-overall-score]").textContent = `${overall}%`;
  $("[data-overall-copy]").textContent = overall >= 80 ? "Excellent. Keep the streak going." : overall >= 40 ? "Good start. Continue level by level." : "Attempt questions to unlock your level progress.";
  $("[data-mini-bars]").innerHTML = Object.entries({ ...TEST_BANK, paragraph: PARAGRAPH_TEST_BANK }).map(([topic, data]) => {
    const percent = topicPercent(topic);
    return `<div><span>${data.title} ${percent}%</span><i><b style="width:${percent}%"></b></i></div>`;
  }).join("");
  const currentPercent = levelPercent(activeTopic, activeLevel);
  $("[data-level-score]").textContent = isLevelChecked() ? `${currentPercent}%` : "--";
  $("[data-level-status]").textContent = isLevelChecked() ? currentPercent >= 80 ? "Mastered" : "Checked" : "Not checked";
  const checkButton = $("[data-check-level]");
  const resetButton = $("[data-reset-level]");
  if (checkButton) checkButton.textContent = isParagraphTopic() ? "Check Paragraph Test" : "Check Test";
  if (resetButton) resetButton.textContent = isParagraphTopic() ? "Clear Paragraph" : "Clear Level";
}

function bindTestActions() {
  const checkButton = $("[data-check-level]");
  if (checkButton) {
    checkButton.onclick = () => {
      checkedLevels[levelKey()] = true;
      save();
      render();
      $("[data-question-list]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  const resetButton = $("[data-reset-level]");
  if (resetButton) {
    resetButton.onclick = () => {
      if (isParagraphTopic()) {
        delete answers[paragraphKey()];
      } else {
        questionSet().forEach((_, index) => delete answers[key(activeTopic, activeLevel, index)]);
      }
      checkedLevels[levelKey()] = false;
      save();
      render();
    };
  }
}

function render() {
  const data = currentTopicData();
  $("[data-topic-title]").textContent = data.title;
  $("[data-topic-note]").textContent = data.note;
  $("[data-level-eyebrow]").textContent = `${activeLevel.charAt(0).toUpperCase() + activeLevel.slice(1)} Level`;
  $("[data-level-title]").textContent = isParagraphTopic() ? `${PARAGRAPH_TEST_BANK.levels[activeLevel].label} paragraph translation` : `${data.title} practice`;
  $$("[data-topic]").forEach((button) => button.classList.toggle("is-active", button.dataset.topic === activeTopic));
  renderLevels();
  renderQuestions();
  renderProgress();
  bindTestActions();
}

$$("[data-topic]").forEach((button) => button.addEventListener("click", () => {
  activeTopic = button.dataset.topic;
  activeLevel = "easy";
  activeParagraphVariant = 0;
  save();
  render();
}));

render();
