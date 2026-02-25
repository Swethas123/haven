import { useState, useEffect } from 'react';
import { Users, Lock, UserPlus, LogIn, ShieldAlert } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getAdmin, saveAdmin, isAdminLoggedIn, setAdminLoggedIn } from '../utils/storage';

interface AdminGuardProps {
    children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if admin is registered
        const admin = getAdmin();
        if (admin) {
            setIsRegistered(true);
            setIsLoginView(true);
        } else {
            setIsRegistered(false);
            setIsLoginView(false);
        }

        // Check if admin is already logged in
        if (isAdminLoggedIn()) {
            setIsAuthorized(true);
        }
    }, []);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        saveAdmin({ email, password });
        setAdminLoggedIn(true);
        setIsAuthorized(true);
        setIsRegistered(true);
        setIsLoginView(true);
        setError('');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const admin = getAdmin();

        if (admin && admin.email === email && admin.password === password) {
            setAdminLoggedIn(true);
            setIsAuthorized(true);
            setError('');
        } else {
            setError('Invalid email or password');
        }
    };

    if (isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-2 border-blue-100 shadow-xl overflow-hidden rounded-3xl">
                <CardHeader className="text-center bg-blue-600 text-white pb-8">
                    <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {isLoginView ? 'Authority Login' : 'Authority Sign Up'}
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                        {isLoginView
                            ? 'Enter your credentials to access the dashboard'
                            : 'Register your authority account for HAVEN'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={isLoginView ? handleLogin : handleSignUp} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Work Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="authority@haven.gov"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-xl border-blue-100 focus:border-blue-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-xl border-blue-100 focus:border-blue-600"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm font-medium">
                                <ShieldAlert className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-lg font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                        >
                            {isLoginView ? (
                                <span className="flex items-center gap-2 justify-center">
                                    <LogIn className="w-5 h-5" /> Login
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 justify-center">
                                    <UserPlus className="w-5 h-5" /> Create Account
                                </span>
                            )}
                        </Button>

                        {isRegistered && (
                            <p className="text-center text-sm text-gray-500">
                                {isLoginView ? (
                                    <>
                                        Don't have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => { setIsLoginView(false); setError(''); }}
                                            className="text-blue-600 font-bold hover:underline"
                                        >
                                            Sign Up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => { setIsLoginView(true); setError(''); }}
                                            className="text-blue-600 font-bold hover:underline"
                                        >
                                            Login
                                        </button>
                                    </>
                                )}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
