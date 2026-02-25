import { useState, useEffect } from 'react';
import { Shield, Lock, Unlock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { getSessionPin, setSessionPin } from '../utils/storage';

interface PinGuardProps {
    children: React.ReactNode;
}

export function PinGuard({ children }: PinGuardProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedPin = getSessionPin();
        if (storedPin) {
            setIsAuthorized(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (pin.length !== 4) {
            setError('PIN must be 4 digits');
            return;
        }

        // Any 4-digit PIN is valid and acts as an identity
        setSessionPin(pin);
        setIsAuthorized(true);
    };

    const handleCharClick = (char: string) => {
        if (pin.length < 4) {
            setPin(prev => prev + char);
            setError('');
        }
    };

    const handleClear = () => {
        setPin('');
        setError('');
    };

    if (isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm border-2 border-purple-100 shadow-xl overflow-hidden rounded-3xl">
                <CardHeader className="text-center bg-purple-600 text-white pb-8">
                    <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        Identity Access
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                        Enter your unique Safety PIN to access your personal history
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${pin[i]
                                        ? 'border-purple-600 bg-purple-50 text-purple-600'
                                        : 'border-gray-200'
                                        }`}
                                >
                                    {pin[i] ? '•' : ''}
                                </div>
                            ))}
                        </div>

                        {error && <p className="text-center text-red-500 text-sm font-medium">{error}</p>}

                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map((val) => (
                                <Button
                                    key={val}
                                    type={val === '✓' ? 'submit' : 'button'}
                                    variant="outline"
                                    className={`h-14 rounded-2xl text-xl font-bold shadow-sm active:scale-95 transition-transform ${val === '✓' ? 'bg-purple-600 text-white hover:bg-purple-700 hover:text-white border-transparent' :
                                        val === 'C' ? 'text-red-500' : ''
                                        }`}
                                    onClick={() => {
                                        if (val === 'C') handleClear();
                                        else if (typeof val === 'number') handleCharClick(val.toString());
                                    }}
                                >
                                    {val === '✓' ? <Unlock className="w-6 h-6" /> : val}
                                </Button>
                            ))}
                        </div>

                        <p className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                            HAVEN Secure Access
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
