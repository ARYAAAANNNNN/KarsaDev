/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const defaultProfile = {
    full_name: 'Siswa Praktikan',
    email: '',
    nisn: '',
    bio: '',
    role: 'student',
};

const normalizeProfile = (user, previousProfile = defaultProfile) => {
    const metadata = user?.user_metadata ?? {};

    return {
        full_name: metadata.full_name || previousProfile.full_name || user?.email?.split('@')[0] || 'Siswa Praktikan',
        email: user?.email || previousProfile.email || '',
        nisn: metadata.nisn || previousProfile.nisn || '',
        bio: metadata.bio || previousProfile.bio || '',
        role: metadata.role || previousProfile.role || 'student',
    };
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(defaultProfile);
    const [loading, setLoading] = useState(Boolean(supabase));

    const syncAuthState = (nextSession) => {
        const nextUser = nextSession?.user ?? null;
        setSession(nextSession);
        setUser(nextUser);
        setProfile((previousProfile) => normalizeProfile(nextUser, previousProfile));
    };

    useEffect(() => {
        if (!supabase) {
            return;
        }

        let isMounted = true;

        const initializeSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (isMounted) {
                    syncAuthState(data.session);
                }
            } catch (error) {
                console.error('Failed to initialize Supabase session:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initializeSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            syncAuthState(nextSession);
            setLoading(false);
        });

        return () => {
            isMounted = false;
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        if (!supabase) {
            const fallbackUser = {
                email,
                user_metadata: {
                    full_name: email.split('@')[0],
                    role: 'student',
                },
            };
            setUser(fallbackUser);
            setProfile((previousProfile) => normalizeProfile(fallbackUser, previousProfile));
            return { user: fallbackUser, session: null };
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            throw error;
        }

        syncAuthState(data.session);
        return data;
    };

    const register = async (email, password, fullName, role = 'student') => {
        if (!supabase) {
            const fallbackUser = {
                email,
                user_metadata: {
                    full_name: fullName,
                    role,
                },
            };
            setUser(fallbackUser);
            setProfile((previousProfile) => normalizeProfile(fallbackUser, previousProfile));
            return { user: fallbackUser, session: null };
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role,
                },
            },
        });

        if (error) {
            throw error;
        }

        if (data.session) {
            syncAuthState(data.session);
        } else {
            setUser(data.user);
            setProfile((previousProfile) => normalizeProfile(data.user, previousProfile));
        }

        return data;
    };

    const logout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }

        setSession(null);
        setUser(null);
        setProfile(defaultProfile);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                profile,
                loading,
                setProfile,
                login,
                register,
                logout,
                isSupabaseConfigured,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);