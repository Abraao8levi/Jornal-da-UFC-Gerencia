const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas (qualquer um pode ver)
router.get('/', noticiaController.getAllNoticias);
router.get('/aprovadas', noticiaController.getNoticiasAprovadas);
router.get('/categoria/:categoria', noticiaController.getNoticiasByCategoria);
router.get('/:id', noticiaController.getNoticiaById);

// Rotas protegidas (apenas editores/administradores)
router.get('/admin/pendentes', authMiddleware, noticiaController.getNoticiasPendentes);
router.put('/:id/aprovar', authMiddleware, noticiaController.aprovarNoticia);
router.put('/:id/rejeitar', authMiddleware, noticiaController.rejeitarNoticia);
router.put('/:id/status', authMiddleware, noticiaController.atualizarStatusNoticia);

// Rotas de criação/edição (podem ser protegidas se necessário)
router.post('/', noticiaController.createNoticia);
router.put('/:id', noticiaController.updateNoticia);
router.delete('/:id', noticiaController.deleteNoticia);

module.exports = router;
