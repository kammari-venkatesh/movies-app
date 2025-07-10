import './index.css'
import EntryHeader from '../EntryHeader/EntryHeader'
import { FaAngleRight } from "react-icons/fa6";
import Moreresonscard from '../Morereasonscard/Morereasonscard';
import Frequentquestion from '../Frequentquestions/Frequentquestion';
import { useState ,useEffect} from 'react'
import React from 'react';
import EntryFooter from '../EntryFooter/EntryFooter';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const bref  = {
  EN: {
    id : 1,
    headline: "Dive into Endless Entertainment",
    subheadline: "Dive into a world of movies, web series, and shows you love",
    prompt: "Ready to Watch?",
    button: "Login"
  },
  HI: {id : 2,
    headline: "अनंत मनोरंजन में डूब जाएं",
    subheadline: "फिल्मों, वेब सीरीज़ और पसंदीदा शोज़ की दुनिया में डूब जाएं",
    prompt: "देखने के लिए तैयार हैं?",
    button: "लॉगिन करें"
  },
  TE: {id : 3,
    headline: "అంతులేని వినోదంలో మునిగిపోండి",
    subheadline: "సినిమాలు, వెబ్ సిరీస్‌లు, మీకు ఇష్టమైన షోలు ఉన్న ప్రపంచంలోకి మునిగిపోండి",
    prompt: "చూడడానికి సిద్ధమా?",
    button: "లాగిన్ చేయండి"
  }
};

const features = {
  EN: [
    {
      title: "Exclusive Originals",
      description: "Enjoy shows and movies you won’t find anywhere else — made just for you.",
      icons: "crown"
    },
    {
      title: "Ad-Free Streaming",
      description: "Binge your favorite content without interruptions — zero ads, full immersion.",
      icons: "block"
    },
    {
      title: "Watch Anytime, Anywhere",
      description: "Stream on mobile, tablet, or TV — your entertainment, your terms.",
      icons: "screen"
    },
    {
      title: "Personalized Recommendations",
      description: "Get content suggestions tailored to your taste — the more you watch, the better it gets!",
      icons: "checked"
    }
  ],

  HI: [
    {
      title: "एक्सक्लूसिव ओरिजिनल्स",
      description: "ऐसे शोज़ और फिल्में देखें जो आपको कहीं और नहीं मिलेंगी — खास आपके लिए बनाए गए।",
      icons: "crown"
    },
    {
      title: "विज्ञापन-मुक्त स्ट्रीमिंग",
      description: "अपने पसंदीदा कंटेंट का बिना रुकावट आनंद लें — बिना किसी विज्ञापन के।",
      icons: "block"
    },
    {
      title: "कभी भी, कहीं भी देखें",
      description: "मोबाइल, टैबलेट या टीवी पर स्ट्रीम करें — आपकी सुविधा, आपकी पसंद।",
      icons: "screen"
    },
    {
      title: "व्यक्तिगत सिफारिशें",
      description: "आपकी पसंद के अनुसार कंटेंट सुझाव पाएं — जितना ज़्यादा देखें, उतना बेहतर सुझाव मिलेगा!",
      icons: "checked"
    }
  ],

  TE: [
    {
      title: "ఎక్స్‌క్లూజివ్ ఒరిజినల్స్",
      description: "మీ కోసం ప్రత్యేకంగా రూపొందించిన షోలు మరియు సినిమాలను ఎక్కడా కనబడని విధంగా ఆస్వాదించండి.",
      icons: "crown"
    },
    {
      title: "జ్ఞాపకాల రహిత స్ట్రీమింగ్",
      description: "మీకు ఇష్టమైన కంటెంట్‌ను ఎలాంటి అంతరాయం లేకుండా బింగ్ చేయండి — ఎటువంటి ప్రకటనలు లేవు.",
      icons: "block"
    },
    {
      title: "ఎప్పుడైనా, ఎక్కడైనా చూడండి",
      description: "మొబైల్, టాబ్లెట్ లేదా టీవీ మీద స్ట్రీమ్ చేయండి — మీ వినోదం, మీ నియమాలు.",
      icons: "screen"
    },
    {
      title: "వ్యక్తిగత సిఫార్సులు",
      description: "మీ అభిరుచులకు అనుగుణంగా కంటెంట్ సూచనలు పొందండి — మీరు ఎంతగా చూస్తే, అంతగా మెరుగవుతుంది!",
      icons: "checked"
    }
  ]
};

const faqs = {
  EN: [
    {
      id: 1,
      question: "How can I start watching?",
      answer: "Just sign up, choose a plan, and start streaming instantly on any device — no cables or installations needed.",
      isShow: false
    },
    {
      id: 2,
      question: "Can I watch on multiple devices?",
      answer: "Yes! You can stream on your phone, tablet, laptop, or smart TV — anytime, anywhere.",
      isShow: false
    },
    {
      id: 3,
      question: "Is there a free trial available?",
      answer: "We offer a 7-day free trial so you can explore our content and features before subscribing.",
      isShow: false
    },
    {
      id: 4,
      question: "Do I need internet to watch?",
      answer: "You’ll need internet to stream, but premium users can download content and watch offline too.",
      isShow: false
    },
    {
      id: 5,
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your plan at any time from your account settings — no hidden fees or commitments.",
      isShow: false
    },
    {
      id: 6,
      question: "Are subtitles available?",
      answer: "Yes, we offer multi-language subtitles on most of our content for an inclusive viewing experience.",
      isShow: false
    }
  ],

  HI: [
    {
      id: 1,
      question: "मैं देखना कैसे शुरू करूं?",
      answer: "साइन अप करें, कोई योजना चुनें और तुरंत किसी भी डिवाइस पर स्ट्रीमिंग शुरू करें — किसी केबल या इंस्टॉलेशन की जरूरत नहीं।",
      isShow: false
    },
    {
      id: 2,
      question: "क्या मैं कई डिवाइस पर देख सकता हूँ?",
      answer: "हां! आप अपने फ़ोन, टैबलेट, लैपटॉप या स्मार्ट टीवी पर कभी भी, कहीं भी स्ट्रीम कर सकते हैं।",
      isShow: false
    },
    {
      id: 3,
      question: "क्या कोई फ्री ट्रायल उपलब्ध है?",
      answer: "हम 7-दिन का फ्री ट्रायल देते हैं ताकि आप सब्सक्राइब करने से पहले हमारी सामग्री और सुविधाओं को देख सकें।",
      isShow: false
    },
    {
      id: 4,
      question: "क्या देखने के लिए इंटरनेट जरूरी है?",
      answer: "हां, आपको स्ट्रीम करने के लिए इंटरनेट की जरूरत होगी, लेकिन प्रीमियम यूज़र्स कंटेंट डाउनलोड करके ऑफलाइन भी देख सकते हैं।",
      isShow: false
    },
    {
      id: 5,
      question: "क्या मैं कभी भी अपनी सदस्यता रद्द कर सकता हूँ?",
      answer: "हां, आप अपने अकाउंट सेटिंग्स से कभी भी योजना रद्द कर सकते हैं — कोई छिपे शुल्क या बाध्यता नहीं।",
      isShow: false
    },
    {
      id: 6,
      question: "क्या सबटाइटल्स उपलब्ध हैं?",
      answer: "हां, हम अपनी अधिकांश सामग्री पर बहुभाषी सबटाइटल्स उपलब्ध कराते हैं ताकि सभी के लिए अनुभव सहज हो।",
      isShow: false
    }
  ],

  TE: [
    {
      id: 1,
      question: "నేను చూడడం ఎలా ప్రారంభించగలను?",
      answer: "సైన్ అప్ చేసి, ప్లాన్ ఎంచుకుని, ఎలాంటి కేబుల్స్ లేకుండా మీ డివైస్‌పై వెంటనే స్ట్రీమ్ చేయడం ప్రారంభించండి.",
      isShow: false
    },
    {
      id: 2,
      question: "నేను బహుళ పరికరాల్లో చూడగలనా?",
      answer: "అవును! మీరు మొబైల్, టాబ్లెట్, ల్యాప్‌టాప్ లేదా స్మార్ట్ టీవీలో ఎప్పుడైనా, ఎక్కడైనా స్ట్రీమ్ చేయవచ్చు.",
      isShow: false
    },
    {
      id: 3,
      question: "ఉచిత ట్రయల్ అందుబాటులో ఉందా?",
      answer: "మీరు సభ్యత్వం తీసుకునే ముందు మా కంటెంట్ మరియు ఫీచర్లు చూసేందుకు మేము 7 రోజుల ఉచిత ట్రయల్ అందిస్తున్నాము.",
      isShow: false
    },
    {
      id: 4,
      question: "చూడటానికి ఇంటర్నెట్ అవసరమా?",
      answer: "స్ట్రీమ్ చేయడానికి మీకు ఇంటర్నెట్ అవసరం, కానీ ప్రీమియం యూజర్లు కంటెంట్‌ను డౌన్‌లోడ్ చేసుకుని ఆఫ్లైన్‌లో చూడవచ్చు.",
      isShow: false
    },
    {
      id: 5,
      question: "నేను సభ్యత్వాన్ని ఎప్పుడైనా రద్దు చేయగలనా?",
      answer: "అవును, మీరు ఎప్పుడైనా మీ ఖాతా సెట్టింగ్స్ నుండి ప్లాన్‌ను రద్దు చేయవచ్చు — ఎటువంటి మరుగున ఖర్చులు ఉండవు.",
      isShow: false
    },
    {
      id: 6,
      question: "సబ్టైటిల్స్ అందుబాటులో ఉన్నాయా?",
      answer: "అవును, మేము మా చాలా కంటెంట్‌లకు బహుళ భాషల సబ్టైటిల్స్ అందిస్తున్నాము — ప్రతి ఒక్కరికీ అనుకూలమైన అనుభవం కోసం.",
      isShow: false
    }
  ]
};

const joinReasonsText = {
  EN: "More reasons to join",
  HI: "जुड़ने के और कारण",
  TE: "చేరడానికి మరిన్ని కారణాలు"
};
const faqTitleText = {
  EN: "Frequently Asked Questions",
  HI: "अक्सर पूछे जाने वाले प्रश्न",
  TE: "తరచుగా అడిగే ప్రశ్నలు"
};
const footerContent = {
  EN: {
    queries: "Any Queries? : Call 0612-0625-1114",
    links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"]
  },
  HI: {
    queries: "कोई प्रश्न? : कॉल करें 0612-0625-1114",
    links: ["हमारे बारे में", "करियर", "गोपनीयता नीति", "सेवा की शर्तें"]
  },
  TE: {
    queries: "ఏమైనా సందేహాలా? : కాల్ చేయండి 0612-0625-1114",
    links: ["మా గురించి", "కెరీయర్స్", "గోప్యతా విధానం", "సేవా నిబంధనలు"]
  }
};


const EntryView = () =>{
  const [Faqs,setFaqs]=useState(faqs.EN)
  const [featuresdata,setFeaturesData]=useState(features.EN)
  const [brefdata ,setbrefdata]=useState(bref.EN)
  const [frequetheading,setfrequentheading]=useState(faqTitleText.EN)
  const [joinreasonsheading,setjoinreasonsheading]=useState(joinReasonsText.EN)
  const [footerdata,setfooterData]=useState(footerContent.EN)
  const navigate = useNavigate();
useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken) {
       console.log("Token found, navigating to home page");
        // navigate('/');
    }
}, []);

const updatebrefData = (id) =>{
    if(id==='EN'){
        setbrefdata(bref.EN)
        setFaqs(faqs.EN)
        setjoinreasonsheading(joinReasonsText.EN)
        setfrequentheading(faqTitleText.EN)
        setFeaturesData(features.EN)
        setfooterData(footerContent.EN) 
    }
    else if(id==='TE'){
        setbrefdata(bref.TE)
        setFaqs(faqs.TE)
        setFeaturesData(features.TE)
        setjoinreasonsheading(joinReasonsText.TE)
        setfrequentheading(faqTitleText.TE)
        setfooterData(footerContent.TE)
    }
    else{
        setFaqs(faqs.HI)
        setFeaturesData(features.HI)
        setjoinreasonsheading(joinReasonsText.HI)
        setbrefdata(bref.HI)
        setfrequentheading(faqTitleText.HI) 
        setfooterData(footerContent.HI) 
    }
}
const onUpdatedAnswer = (id) => {
    console.log("exego",id)
  const updatedFaqs = Faqs.map((each) => {
    if (each.id === id) {
      return { ...each, isShow: !each.isShow };
    } else {
      return each;
    }
  });

  setFaqs(updatedFaqs);
};
const handleSignIn = () => {
    navigate('/login');

}

return(
    <div className='Entry-container'>
        <div className='container'>
        
        <EntryHeader updatebrefData={updatebrefData}/>  
        <div className='entry-home'>
        <h1 className='entry-heading'>{brefdata.headline}</h1>
        <p className='entry-info-para'>{brefdata.subheadline} </p>
        <p className='entry-question'>{brefdata.prompt}</p>
        <button className='signin-btn' onClick={handleSignIn}>{brefdata.button} <FaAngleRight /></button>
        </div>
    <div className='more-reasons-container'>
        <h1 className='more-reasons-heading'>{joinreasonsheading}</h1>
        <div className='reason-cards-container'>
           {
    featuresdata.map((feature) => (
        <Moreresonscard  feature={feature} key={feature.icons}/>
    ))
}</div>
         <div className='frequent-questions'>
        <h1 className='more-reasons-heading'>{frequetheading}</h1>
        <div className='question-list'>
            {
                Faqs.map((each)=>(
<Frequentquestion details={each} id={each.id} key={each.id}  onUpdatedAnswer={onUpdatedAnswer}/>
                ))
            }
        </div>
        
    </div>
        
    </div>
   


    </div>
    <EntryFooter details={footerdata}/>
    </div>
    
)



    
}
export default EntryView