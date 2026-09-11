import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose, initialView = 'login', onLoginSuccess }) {
    const { login, register } = useAuth();
    const [isRegister, setIsRegister] = useState(initialView === 'register');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [fullName, setFullName] = useState('');
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!emailOrUsername.trim() || !password.trim()) {
            setErrorMessage('Email dan kata sandi wajib diisi.');
            return;
        }

        setIsSubmitting(true);

        try {
            if (isRegister) {
                if (!fullName.trim()) {
                    setErrorMessage('Nama lengkap wajib diisi.');
                    return;
                }

                await register(emailOrUsername.trim(), password, fullName.trim(), 'student');
            } else {
                await login(emailOrUsername.trim(), password);
            }

            onLoginSuccess?.({
                name: fullName || emailOrUsername || 'Sarah Chen',
                role: 'student',
            });
            onClose();
        } catch (error) {
            setErrorMessage(error?.message || 'Terjadi kesalahan saat memproses autentikasi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleAuth = async () => {
        setErrorMessage('');
        setIsSubmitting(true);

        try {
            if (!supabase) {
                throw new Error('Supabase belum dikonfigurasi. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY terlebih dahulu.');
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin,
                },
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            setErrorMessage(error?.message || 'Google OAuth gagal diproses.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-card">
                <div className="auth-brand-logo">
                    <div className="brand-badge">
                        <img src="/logo-kd.svg" alt="KarsaDev Logo" />
                    </div>
                    <span className="brand-name">KarsaDev</span>
                </div>

                <h2>
                    {isRegister ? 'Halaman Pendaftaran KarsaDev Dashboard' : 'Halaman Login KarsaDev Dashboard'}
                </h2>
                <p>
                    {isRegister ? 'Silakan lengkapi formulir untuk mendaftar' : 'Silakan login untuk mengakses dasbor Anda'}
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {isRegister && (
                        <div className="form-group">
                            <label>Nama Lengkap</label>
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="Masukkan nama lengkap Anda"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="Masukkan alamat email Anda"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{isRegister ? 'Kata Sandi' : 'Kata Sandi'}</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="auth-input"
                                placeholder="Masukkan kata sandi Anda"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="input-icon-right" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                    </div>

                    {errorMessage && <div className="auth-error">{errorMessage}</div>}

                    <button type="submit" className="btn-auth-magenta" disabled={isSubmitting}>
                        {isSubmitting ? 'Memproses...' : isRegister ? 'Daftar' : 'Login'}
                    </button>
                </form>

                <div className="auth-divider">--- Atau {isRegister ? 'daftar' : 'login'} dengan ---</div>

                <button type="button" className="btn-google-auth" onClick={handleGoogleAuth} disabled={isSubmitting}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    {isRegister ? 'Daftar dengan Google' : 'Login dengan Google'}
                </button>

                <div className="auth-switch-link">
                    {isRegister ? (
                        <>Sudah punya akun? <span onClick={() => setIsRegister(false)}>Login di sini</span></>
                    ) : (
                        <>Belum punya akun? <span onClick={() => setIsRegister(true)}>Daftar di sini</span></>
                    )}
                </div>
            </div>
        </div>
    );
}