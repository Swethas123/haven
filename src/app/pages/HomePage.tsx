import { Link } from 'react-router';
import { Shield, Users, Map, MessageCircle, Scale, UserCircle, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { DemoInstructions } from '../components/DemoInstructions';
import { SystemStats } from '../components/SystemStats';
import { loadDemoData } from '../utils/demoData';
import { toast } from 'sonner';
import { useTranslation } from '../utils/i18n';
import { EmpowermentIllustration } from '../components/Illustrations';

export function HomePage() {
  const { t } = useTranslation();

  const handleLoadDemo = () => {
    loadDemoData();
    toast.success(t('demo_data_loaded'));
    // Force a page refresh to update stats
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header/Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 pt-8">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                {t('nav_home')}
              </h1>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
              {t('nav_tagline')}
            </p>
            <p className="text-lg text-gray-600 max-w-xl mb-8 leading-relaxed">
              {t('nav_description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleLoadDemo}
                variant="outline"
                className="gap-2 h-12 px-6 rounded-xl border-2 border-purple-100 hover:bg-purple-50 transition-all"
              >
                <Database className="w-4 h-4 text-purple-600" />
                {t('nav_load_demo')}
              </Button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <EmpowermentIllustration className="relative w-full h-auto drop-shadow-2xl" />
          </div>
        </div>

        {/* System Stats */}
        <SystemStats />

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-6 h-6 text-purple-600" />
                  {t('nav_for_victims')}
                </CardTitle>
                <CardDescription>
                  {t('nav_victims_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/victim-login">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg">
                    {t('nav_enter_victim_dash')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  {t('nav_for_authorities')}
                </CardTitle>
                <CardDescription>
                  {t('nav_authorities_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/admin">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                    {t('nav_enter_authority_dash')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">{t('nav_features_title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('nav_feature_covert')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {t('nav_feature_covert_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('nav_feature_ai')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {t('nav_feature_ai_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('nav_feature_location')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {t('nav_feature_location_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <p className="text-center text-sm text-red-800">
                <strong>{t('nav_emergency_title')}</strong> {t('nav_emergency_desc')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Instructions */}
        <div className="max-w-4xl mx-auto mt-6">
          <DemoInstructions />
        </div>
      </div>
    </div>
  );
}