import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, Shield, Loader2, BookOpen, Scale, Landmark, Heart } from 'lucide-react';
import { EmpowermentIllustration } from '../components/Illustrations';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { generateLegalResponse } from '../utils/ai';
import { useTranslation } from '../utils/i18n';
import { ChatMessage } from '../types';
import { isVictimAuthenticated } from '../utils/storage';

export function LawChatPage() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: t('law_chat_hello') || "Welcome to the Legal Advisor. I can help you understand your rights under Indian law, including the Domestic Violence Act, IPC sections, custody rights, and property rights. What would you like to know?",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isVictimAuthenticated()) {
      navigate('/victim-login');
      return;
    }
    scrollToBottom();
  }, [messages, navigate]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: Date.now(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await generateLegalResponse(messageText, language);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const legalResources = [
    {
      title: t('law_chat_resource_pwdva'),
      icon: Shield,
      desc: t('law_chat_resource_pwdva_desc'),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: t('law_chat_resource_498a'),
      icon: Scale,
      desc: t('law_chat_resource_498a_desc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: t('law_chat_resource_dlsa'),
      icon: Landmark,
      desc: t('law_chat_resource_dlsa_desc'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-4 flex-1 flex flex-col max-w-7xl h-screen max-h-screen overflow-hidden">
        <div className="shrink-0">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 w-fit hover:bg-indigo-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('law_chat_back')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 overflow-hidden mb-4">
          {/* Left Column: Resources & Topics */}
          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar hidden lg:block">
            <Card className="bg-white/80 backdrop-blur-sm shrink-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  {t('law_chat_resources')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {legalResources.map((resource, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${resource.bgColor.replace('bg-', 'border-')} ${resource.bgColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <resource.icon className={`w-4 h-4 ${resource.color}`} />
                      <h4 className={`text-sm font-bold ${resource.color}`}>{resource.title}</h4>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-tight">{resource.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="p-4 bg-indigo-50 rounded-2xl border-2 border-indigo-100 shadow-xl shadow-indigo-100/50 shrink-0">
              <EmpowermentIllustration className="w-full h-auto drop-shadow-xl" />
            </div>

            <Card className="bg-white/80 backdrop-blur-sm shrink-0">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold">{t('law_chat_topics')}</CardTitle>
                <CardDescription className="text-xs">
                  {t('law_chat_topics_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 px-3">
                <div className="flex flex-col gap-2">
                  {[
                    "Domestic Violence",
                    "IPC 498A Cruelty",
                    "Property Rights",
                    "Custody Laws"
                  ].map((topic) => (
                    <Button
                      key={topic}
                      variant="outline"
                      className="justify-start text-xs h-auto py-2.5 px-3 text-left border-slate-100 hover:bg-indigo-50 hover:text-indigo-700 transition-colors bg-white/50 backdrop-blur-none"
                      onClick={() => handleSendMessage(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-amber-50/80 backdrop-blur-sm rounded-xl border border-amber-100 text-[11px] text-amber-800 shrink-0">
              <p className="font-bold mb-1 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {t('law_chat_disclaimer_title')}
              </p>
              {t('law_chat_disclaimer_desc')}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-full min-h-0">
            <Card className="shadow-lg flex-1 flex flex-col overflow-hidden border-indigo-100 bg-white/80 backdrop-blur-sm h-full">
              <CardHeader className="py-3 bg-white/80 border-b shrink-0">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span className="flex items-center gap-2 text-indigo-700">
                    <Scale className="w-4 h-4" />
                    {t('law_chat_header')}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-normal text-indigo-600 bg-indigo-50 border-indigo-200">
                    {t('law_chat_secure')}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col min-h-0 text-left overflow-hidden">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 scroll-smooth">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${message.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none text-right'
                          : 'bg-white text-gray-800 border border-slate-100 rounded-bl-none text-left'
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-[10px] mt-2 font-medium opacity-70 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl px-4 py-3 border border-slate-100 rounded-bl-none">
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-white shrink-0">
                  <div className="flex gap-2 max-w-4xl mx-auto">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t('law_chat_placeholder')}
                      className="flex-1 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
                      disabled={loading}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!input.trim() || loading}
                      className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-4 shadow-md shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
