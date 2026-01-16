const Noticia = require('../models/Noticia');

exports.getAllNoticias = async (req, res) => {
    try {
        const noticias = await Noticia.findAll();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNoticiasAprovadas = async (req, res) => {
    try {
        const noticias = await Noticia.findAprovadas();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNoticiasPendentes = async (req, res) => {
    try {
        const noticias = await Noticia.findPendentes();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNoticiaById = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await Noticia.findById(parseInt(id));
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada' });
        }
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.aprovarNoticia = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await Noticia.updateStatus(parseInt(id), 'aprovado');
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada' });
        }
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rejeitarNoticia = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await Noticia.updateStatus(parseInt(id), 'rejeitado');
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada' });
        }
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.atualizarStatusNoticia = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const noticia = await Noticia.updateStatus(parseInt(id), status);
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada' });
        }
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNoticiasByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const noticias = await Noticia.findByCategoria(categoria);
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.atualizarStatusNoticia = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const noticia = await Noticia.updateStatus(parseInt(id), status);
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada' });
        }
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNoticiasByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const noticias = await Noticia.findByCategoria(categoria);
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNoticia = async (req, res) => {
    try {
        const noticia = req.body;
        const novaNoticia = await Noticia.create(noticia);
        res.status(201).json(novaNoticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateNoticia = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = req.body;
        const noticiaAtualizada = await Noticia.update(parseInt(id), noticia);
        if (!noticiaAtualizada) {
            return res.status(404).json({ error: 'Notícia não encontrada' });
        }
        res.json(noticiaAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteNoticia = async (req, res) => {
    try {
        const { id } = req.params;
        await Noticia.delete(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
