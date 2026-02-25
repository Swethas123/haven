import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { getCases } from '../utils/storage';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function SystemStats() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const cases = getCases();
    setStats({
      total: cases.length,
      open: cases.filter(c => c.status === 'Open').length,
      inProgress: cases.filter(c => c.status === 'In Progress').length,
      closed: cases.filter(c => c.status === 'Closed').length,
    });
  }, []);

  if (stats.total === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total Cases</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-1">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-900">{stats.open}</p>
            <p className="text-xs text-orange-700 mt-1">Open</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-1">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-900">{stats.inProgress}</p>
            <p className="text-xs text-yellow-700 mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-1">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-900">{stats.closed}</p>
            <p className="text-xs text-green-700 mt-1">Closed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
