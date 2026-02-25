// AI-powered text generation simulation

export const USER_POST_TEXT_EXPANSION_PROMPT = `
Generate a covert SOS narrative that appears innocent but contains encoded help signals.
Transform the abuse details into a seemingly casual social media post.
`;

export const USER_POST_TEXT_DECOMPOSITION_PROMPT = `
Extract from the narrative:
- Severity level (Low, Medium, High)
- Nature of violence
- Risk level assessment
`;

export const generateSOSNarrative = async (formData: {
  name: string;
  currentSituation: string;
  durationOfAbuse: string;
  frequency: string;
  culpritDescription: string;
}, language: string = 'en'): Promise<string> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const narratives: Record<string, string[]> = {
    en: [
      "Beautiful morning coffee ☕ Thinking about how some days feel longer than others. Sometimes I wish I could just breathe freely without walking on eggshells. Anyone else feel like they need a break from routine? #MorningThoughts #NeedingChange",
      "Watching the sunrise 🌅 Reflecting on patterns that keep repeating. It's amazing how some people can make you feel so small in your own home. Grateful for those who truly listen. #NewDay #Hope",
      "Lovely flowers today 🌸 But even beauty can't mask the tension at home. Days blend into weeks, weeks into months. If only walls could talk, they'd tell stories no one wants to hear. #StayStrong #OneDay",
      "Coffee date with myself ☕ Sometimes solitude is safer than company. Been dealing with increasing pressure lately. Remember: appearing happy doesn't mean you are. #SelfCare #Hidden",
    ],
    ta: [
      "அழகான காலை காபி ☕ சில நாட்கள் மற்றவற்றை விட நீளமாக உணரவைப்பது பற்றி யோசிக்கிறேன். சில சமயங்களில் முட்டை ஓடுகள் மீது நடப்பது போல் இல்லாமல் சுதந்திரமாக சுவாசிக்க விரும்புகிறேன். வழக்கமான வாழ்க்கையிலிருந்து ஒரு இடைவெளி தேவை என்று வேறு யாராவது உணர்கிறீர்களா? #காலைசிந்தனைகள் #மாற்றம்",
      "சூரிய உதயத்தைப் பார்ப்பது 🌅 மீண்டும் மீண்டும் வரும் முறைகளைப் பற்றி சிந்திக்கிறேன். கவனிக்கும் ஒரு சிலர் நம் சொந்த வீட்டிலேயே நம்மை எவ்வளவு சிறியதாக உணரச் செய்கிறார்கள் என்பது ஆச்சரியமாக இருக்கிறது. உண்மையிலேயே செவிசாய்ப்பவர்களுக்கு நன்றி. #புதியநாள் #நம்பிக்கை",
      "இன்று அழகான பூக்கள் 🌸 ஆனால் அழகு கூட வீட்டில் இருக்கும் பதற்றத்தை மறைக்க முடியாது. நாட்கள் வாரங்களாகின்றன, வாரங்கள் மாதங்களாகின்றன. சுவர்கள் பேச முடிந்தால், யாரும் கேட்க விரும்பாத கதைகளைச் சொல்லும். #வலிமையாகஇரு #ஒருநாள்",
    ],
    hi: [
      "सुबह की खूबसूरत कॉफी ☕ सोच रही हूं कि कुछ दिन दूसरे दिनों की तुलना में लंबे क्यों लगते हैं। कभी-कभी काश मैं बिना डरे खुलकर सांस ले पाती। क्या किसी और को भी लगता है किroutine से ब्रेक की जरूरत है? #MorningThoughts #NeedingChange",
      "सूर्योदय देख रही हूं 🌅 उन पैटर्नों पर विचार कर रही हूं जो दोहराते रहते हैं। यह आश्चर्यजनक है कि कैसे कुछ लोग आपको अपने ही घर में इतना छोटा महसूस करा सकते हैं। उन लोगों की आभारी हूं जो वास्तव में सुनते हैं। #NewDay #Hope",
      "आज प्यारे फूल हैं 🌸 लेकिन सुंदरता भी घर के तनाव को नहीं छिपा सकती। दिन हफ्तों में बदल जाते हैं, हफ्ते महीनों में। काश दीवारें बोल पातीं, तो वे ऐसी कहानियां सुनातीं जो कोई नहीं सुनना चाहता। #StayStrong #OneDay",
    ]
  };

  const selectedNarratives = narratives[language] || narratives['en'];
  return selectedNarratives[Math.floor(Math.random() * selectedNarratives.length)];
};

export const decomposeSOSData = async (narrative: string, formData: any): Promise<{
  severity: 'Low' | 'Medium' | 'High';
  nature: string;
  riskLevel: string;
}> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Analyze based on frequency and duration
  const frequencyScore =
    formData.frequency === 'Daily' ? 3 :
      formData.frequency === 'Multiple times a week' ? 2 :
        formData.frequency === 'Weekly' ? 1 : 0;

  const durationScore =
    formData.durationOfAbuse.includes('year') ? 2 :
      formData.durationOfAbuse.includes('month') ? 1 : 0;

  const totalScore = frequencyScore + durationScore;

  const severity: 'Low' | 'Medium' | 'High' =
    totalScore >= 4 ? 'High' :
      totalScore >= 2 ? 'Medium' : 'Low';

  const natures = [
    'Physical and Emotional Abuse',
    'Domestic Violence',
    'Coercive Control',
    'Emotional Manipulation',
    'Physical Assault',
  ];

  const nature = natures[Math.floor(Math.random() * natures.length)];

  const riskLevel = severity === 'High' ? 'Critical - Immediate intervention needed' :
    severity === 'Medium' ? 'Moderate - Regular monitoring required' :
      'Low - Supportive assistance recommended';

  return { severity, nature, riskLevel };
};


const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'mistral'; // Using mistral as seen in the user's terminal

const callOllama = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response.trim();
  } catch (error) {
    console.error('Error calling Ollama:', error);
    return "I'm having trouble connecting to my brain right now. Please make sure Ollama is running locally.";
  }
};

export const generateSupportResponse = async (message: string, language: string = 'en'): Promise<string> => {
  const langMap: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    ta: 'Tamil'
  };
  const targetLanguage = langMap[language] || 'English';

  const prompt = `
You are a highly empathetic Personal Care Assistant for women's safety and support.
Your goal is to provide emotional support, validation, and a safe space for the user.
The user says: "${message}"

Instructions:
1. Respond with warmth, empathy, and non-judgmental support.
2. Empower the user and acknowledge their courage.
3. Keep the response concise but deeply supportive.
4. Respond ONLY in ${targetLanguage}.
5. If the user is in immediate danger, gently remind them of emergency resources but keep the primary focus on emotional support.

Response:`;

  return await callOllama(prompt);
};

export const analyzeDistressLevel = async (message: string): Promise<'Low' | 'Medium' | 'High'> => {
  const prompt = `
Analyze the following user message for emotional distress and risk level.
User message: "${message}"

Categorize the distress level into exactly one of these three categories:
- Low: Normal conversation, mild stress, or routine check-in.
- Medium: Clear signs of distress, fear, anxiety, or mentions of ongoing difficult situations.
- High: Immediate danger, extreme terror, mentions of severe violence, or explicit cries for help.

Respond with ONLY one word: Low, Medium, or High.
Distress Level:`;

  const response = await callOllama(prompt);
  const level = response.trim();

  if (level.includes('High')) return 'High';
  if (level.includes('Medium')) return 'Medium';
  return 'Low';
};

export const generateLegalResponse = async (question: string, language: string = 'en'): Promise<string> => {
  const langMap: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    ta: 'Tamil'
  };
  const targetLanguage = langMap[language] || 'English';

  const prompt = `
You are an expert Indian Legal Advisor specializing in women's rights and safety.
Your goal is to provide clear, accurate information about Indian laws such as the PWDVA (Domestic Violence Act), POCSO, POSH, and IPC sections like 498A.
The user asks: "${question}"

Instructions:
1. Provide specific legal information relevant to the Indian context.
2. Use clear, accessible language.
3. Maintain a professional yet supportive tone.
4. Include a reminder that you are an AI advisor and for formal legal action, they should consult a lawyer or contact the DLSA.
5. Respond ONLY in ${targetLanguage}.

Response:`;

  return await callOllama(prompt);
};

