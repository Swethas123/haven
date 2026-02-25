import { SOSCase } from '../types';

export const generateDemoData = (): SOSCase[] => {
  const now = Date.now();
  
  return [
    {
      id: 'demo-1',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      preferredContact: 'WhatsApp',
      location: {
        lat: 28.6139,
        lng: 77.2090,
        address: 'South Delhi, New Delhi',
      },
      durationOfAbuse: '1-3 years',
      frequency: 'Daily',
      currentSituation: 'Experiencing daily verbal abuse and threats. Situation escalating over past few months.',
      culpritDescription: 'Husband, 35 years old, works in IT sector',
      sosMessage: 'Beautiful morning coffee ☕ Thinking about how some days feel longer than others. Sometimes I wish I could just breathe freely without walking on eggshells. Anyone else feel like they need a break from routine? #MorningThoughts #NeedingChange',
      severity: 'High',
      nature: 'Physical and Emotional Abuse',
      riskLevel: 'Critical - Immediate intervention needed',
      status: 'Open',
      timestamp: now - 3600000,
      timeline: [
        {
          id: 't1',
          event: 'Case created',
          timestamp: now - 3600000,
        },
      ],
    },
    {
      id: 'demo-2',
      name: 'Anjali Reddy',
      phone: '+91 87654 32109',
      preferredContact: 'Phone',
      location: {
        lat: 28.7041,
        lng: 77.1025,
        address: 'Rohini, New Delhi',
      },
      durationOfAbuse: '6 months - 1 year',
      frequency: 'Multiple times a week',
      currentSituation: 'Facing financial control and emotional manipulation. Not allowed to work or meet family.',
      culpritDescription: 'In-laws and husband, living in joint family',
      sosMessage: 'Watching the sunrise 🌅 Reflecting on patterns that keep repeating. It\'s amazing how some people can make you feel so small in your own home. Grateful for those who truly listen. #NewDay #Hope',
      severity: 'Medium',
      nature: 'Coercive Control',
      riskLevel: 'Moderate - Regular monitoring required',
      status: 'In Progress',
      timestamp: now - 7200000,
      timeline: [
        {
          id: 't2-1',
          event: 'Case created',
          timestamp: now - 7200000,
        },
        {
          id: 't2-2',
          event: 'Status changed to In Progress',
          timestamp: now - 3600000,
        },
      ],
    },
    {
      id: 'demo-3',
      name: 'Meera Patel',
      phone: '+91 76543 21098',
      preferredContact: 'Email',
      location: {
        lat: 28.5355,
        lng: 77.3910,
        address: 'Noida, Uttar Pradesh',
      },
      durationOfAbuse: 'More than 3 years',
      frequency: 'Weekly',
      currentSituation: 'Long-term psychological abuse and gaslighting. Recently threats of violence.',
      culpritDescription: 'Husband, 42 years old, businessman',
      sosMessage: 'Lovely flowers today 🌸 But even beauty can\'t mask the tension at home. Days blend into weeks, weeks into months. If only walls could talk, they\'d tell stories no one wants to hear. #StayStrong #OneDay',
      severity: 'High',
      nature: 'Domestic Violence',
      riskLevel: 'Critical - Immediate intervention needed',
      status: 'Open',
      timestamp: now - 10800000,
      timeline: [
        {
          id: 't3',
          event: 'Case created',
          timestamp: now - 10800000,
        },
      ],
    },
    {
      id: 'demo-4',
      name: 'Kavita Singh',
      phone: '+91 65432 10987',
      preferredContact: 'SMS',
      location: {
        lat: 28.6139,
        lng: 77.2090,
        address: 'Central Delhi, New Delhi',
      },
      durationOfAbuse: '1-6 months',
      frequency: 'Occasionally',
      currentSituation: 'Verbal abuse during arguments, threats of divorce and separation from children.',
      culpritDescription: 'Husband, 38 years old, government employee',
      sosMessage: 'Coffee date with myself ☕ Sometimes solitude is safer than company. Been dealing with increasing pressure lately. Remember: appearing happy doesn\'t mean you are. #SelfCare #Hidden',
      severity: 'Medium',
      nature: 'Emotional Manipulation',
      riskLevel: 'Moderate - Regular monitoring required',
      status: 'Open',
      timestamp: now - 14400000,
      timeline: [
        {
          id: 't4',
          event: 'Case created',
          timestamp: now - 14400000,
        },
      ],
    },
  ];
};

export const loadDemoData = () => {
  const existingData = localStorage.getItem('haven_sos_cases');
  if (!existingData || JSON.parse(existingData).length === 0) {
    const demoData = generateDemoData();
    localStorage.setItem('haven_sos_cases', JSON.stringify(demoData));
  }
};
