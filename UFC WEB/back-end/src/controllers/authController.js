const supabase = require('../config/database');

// Sistema de autenticação com Supabase Auth
exports.register = async (req, res) => {
    try {
        const { email, password, role = 'editor' } = req.body;

        // Registrar usuário no Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role: role // Armazenar o papel no metadata do usuário
                }
            }
        });

        if (error) throw error;

        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            user: data.user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fazer login no Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Verificar se o usuário tem permissão de admin/editor
        const userRole = data.user.user_metadata?.role || 'editor';

        res.json({
            token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            user: {
                id: data.user.id,
                email: data.user.email,
                role: userRole
            }
        });
    } catch (error) {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
};

exports.logout = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        res.json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        // O middleware já verificou o token e colocou o usuário em req.user
        const { data, error } = await supabase.auth.getUser(req.headers.authorization?.replace('Bearer ', ''));

        if (error) throw error;

        res.json({
            user: {
                id: data.user.id,
                email: data.user.email,
                role: data.user.user_metadata?.role || 'editor'
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};