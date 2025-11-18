import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import calcRoutes from './routes/calcRoutes.js';
import productRoutes from './routes/productRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();



// Configuração básica
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sessão
app.use(session({
  secret: 'agro_vitrine_secret',
  resave: false,
  saveUninitialized: false
}));

// Rotas
app.use('/', authRoutes);
app.use('/calculadora', calcRoutes);
app.use('/produtos', productRoutes);

// Página inicial
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));

import comparacaoRoutes from "./routes/comparacaoRoutes.js";
app.use("/comparar", comparacaoRoutes);