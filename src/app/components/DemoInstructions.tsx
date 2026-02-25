import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle } from 'lucide-react';

export function DemoInstructions() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          How HAVEN Works
        </CardTitle>
        <CardDescription>Understanding the covert safety system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <p className="font-semibold text-blue-900">For Victims:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 mt-1">
            <li>Fill out the complaint form with your details</li>
            <li>AI generates an innocent-looking social media post with encoded SOS</li>
            <li>Share the post on your preferred platform (simulated)</li>
            <li>Access your dashboard to track your case status</li>
            <li>Chat with AI assistants for emotional support and legal guidance</li>
          </ol>
        </div>
        <div>
          <p className="font-semibold text-blue-900">For Authorities:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 mt-1">
            <li>View all cases in the Authority Dashboard</li>
            <li>See detailed information for each case</li>
            <li>Use Map Intelligence to identify patterns and hot zones</li>
            <li>Update case status and close resolved cases</li>
          </ol>
        </div>
        <div className="pt-2 border-t border-blue-200">
          <p className="font-semibold text-blue-900">Demo Mode:</p>
          <p className="text-gray-700">
            Click "Load Demo Data" above to populate the system with sample cases. 
            All data is stored locally in your browser and can be cleared at any time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
