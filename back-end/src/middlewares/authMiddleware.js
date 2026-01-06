// Middleware de autenticação com Supabase Auth
const supabase = require('../config/database');

const authMiddleware = async (req, res, next) => {
    try {
        // Verifica se há um header de autorização
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token de autenticação não fornecido' });
        }

        const token = authHeader.substring(7); // Remove 'Bearer '

        // Verificar token com Supabase
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Adicionar informações do usuário na requisição
        req.user = {
            id: data.user.id,
            email: data.user.email,
            role: data.user.user_metadata?.role || 'editor'
        };

        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = authMiddleware;
