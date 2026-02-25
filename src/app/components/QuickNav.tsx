import { Link, useLocation } from 'react-router';
import { Home, FileText, Users, Map, MessageCircle, Scale } from 'lucide-react';
import { Button } from './ui/button';

export function QuickNav() {
  const location = useLocation();
  const path = location.pathname;

  const isVictimRoute = path.startsWith('/victim') ||
    path.startsWith('/create-post') ||
    path.startsWith('/support-chat') ||
    path.startsWith('/law-chat') ||
    path.startsWith('/user-dashboard') ||
    path.startsWith('/post-preview');

  const isAdminRoute = path.startsWith('/admin') ||
    path.startsWith('/authority-dashboard') ||
    path.startsWith('/map-view') ||
    path.startsWith('/case-detail');

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      <Link to="/">
        <Button
          size="sm"
          variant="outline"
          className="shadow-lg bg-white hover:bg-gray-50"
          title="Home"
        >
          <Home className="w-4 h-4" />
        </Button>
      </Link>

      {/* Victim Only Links */}
      {(isVictimRoute || (!isVictimRoute && !isAdminRoute)) && (
        <>
          <Link to="/create-post">
            <Button
              size="sm"
              variant="outline"
              className="shadow-lg bg-purple-600 hover:bg-purple-700 text-white"
              title="Create SOS Post"
            >
              <FileText className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/support-chat">
            <Button
              size="sm"
              variant="outline"
              className="shadow-lg bg-pink-600 hover:bg-pink-700 text-white"
              title="Support Chat"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/law-chat">
            <Button
              size="sm"
              variant="outline"
              className="shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white"
              title="Legal Advisor"
            >
              <Scale className="w-4 h-4" />
            </Button>
          </Link>
        </>
      )}

      {/* Admin Only Links */}
      {(isAdminRoute || (!isVictimRoute && !isAdminRoute)) && (
        <>
          <Link to="/authority-dashboard">
            <Button
              size="sm"
              variant="outline"
              className="shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
              title="Authority Dashboard"
            >
              <Users className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/map-view">
            <Button
              size="sm"
              variant="outline"
              className="shadow-lg bg-green-600 hover:bg-green-700 text-white"
              title="Map View"
            >
              <Map className="w-4 h-4" />
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
