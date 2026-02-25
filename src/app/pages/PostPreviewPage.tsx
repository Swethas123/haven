import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { getCaseById } from '../utils/storage';
import { SOSCase } from '../types';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const INNOCENT_IMAGES = [
  'https://images.unsplash.com/photo-1549170895-c80d3f2049d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JuaW5nJTIwY29mZmVlJTIwY3VwfGVufDF8fHx8MTc3MTg0MDQ2OXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1582189080929-9ce7adbbc3ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzdW5yaXNlJTIwbmF0dXJlfGVufDF8fHx8MTc3MTg0MDQ2OXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1708281105381-44c700c1b0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGZsb3dlcnMlMjBnYXJkZW58ZW58MXx8fHwxNzcxNzQ1MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1603276730862-cbf79a742aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGxhbmRzY2FwZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcxODQwNDcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function PostPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sosCase, setSOSCase] = useState<SOSCase | null>(null);
  const [sharedPlatforms, setSharedPlatforms] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const caseData = getCaseById(id);
      setSOSCase(caseData);
    }
  }, [id]);

  const handleShare = (platform: string) => {
    // Simulate sharing
    setTimeout(() => {
      setSharedPlatforms([...sharedPlatforms, platform]);
      toast.success(`Post shared successfully on ${platform}!`);
    }, 500);
  };

  if (!sosCase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Post Preview */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Social Media Post Preview</h2>
            <Card className="overflow-hidden">
              <div className="bg-white">
                {/* Social Media Header */}
                <div className="p-4 border-b flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {sosCase.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{sosCase.name}</p>
                    <p className="text-xs text-gray-500">Just now • 🌍</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="mb-4 whitespace-pre-wrap">{sosCase.sosMessage}</p>
                </div>

                {/* Image with Encoded SOS */}
                <div className="relative">
                  <ImageWithFallback
                    src={sosCase.imageUrl || INNOCENT_IMAGES[0]}
                    alt="Post image"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    ✓ SOS Encoded
                  </div>
                </div>

                {/* Post Actions */}
                <div className="p-4 border-t flex gap-4 text-gray-600">
                  <button className="flex items-center gap-2 hover:text-blue-600">
                    <span>👍</span> Like
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-600">
                    <span>💬</span> Comment
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-600">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </Card>

            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>🔒 Steganography Applied:</strong> Your SOS message has been encoded inside this image
                using advanced AI techniques. It appears as a normal post, but authorities can decode the hidden message.
              </p>
            </div>
          </div>

          {/* Share Options */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Share Your Post</h2>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Choose Platform</CardTitle>
                <CardDescription>
                  Share this innocent-looking post to alert authorities covertly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Telegram', color: 'bg-blue-500', icon: '📱' },
                  { name: 'Twitter', color: 'bg-sky-500', icon: '🐦' },
                  { name: 'Instagram', color: 'bg-pink-500', icon: '📷' },
                  { name: 'Slack', color: 'bg-purple-600', icon: '💼' },
                ].map((platform) => (
                  <Button
                    key={platform.name}
                    className={`w-full ${platform.color} hover:opacity-90`}
                    onClick={() => handleShare(platform.name)}
                    disabled={sharedPlatforms.includes(platform.name)}
                  >
                    {sharedPlatforms.includes(platform.name) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Shared on {platform.name}
                      </>
                    ) : (
                      <>
                        <span className="mr-2">{platform.icon}</span>
                        Share on {platform.name}
                      </>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Case Info */}
            <Card>
              <CardHeader>
                <CardTitle>Case Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Severity</p>
                    <p className={`font-semibold ${sosCase.severity === 'High' ? 'text-red-600' :
                      sosCase.severity === 'Medium' ? 'text-blue-600' :
                        'text-gray-600'
                      }`}>
                      {sosCase.severity}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-semibold text-orange-600">{sosCase.status}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Nature</p>
                    <p className="font-semibold">{sosCase.nature}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Risk Level</p>
                    <p className="font-semibold">{sosCase.riskLevel}</p>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/user-dashboard/${sosCase.id}`)}
                  >
                    View Your Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/support-chat')}
                  >
                    Talk to Support Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
