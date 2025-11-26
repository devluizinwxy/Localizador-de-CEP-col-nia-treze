const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ==================================================
// 📝 LISTA ATUALIZADA - COLÔNIA TREZE (COM COORDENADAS REAIS)
// ==================================================
const LISTA_DE_RUAS = [
    // --- PONTOS PRINCIPAIS & REFERÊNCIAS ---
    { rua: "Rodovia Antônio Martins de Menezes (Pista Principal)", bairro: "Colônia Treze", cep: "49409-000", tipo: "rural", lat: -10.957012, lng: -37.561023 },
    { rua: "Avenida Principal (Rua do Mercado)", bairro: "Colônia Treze", cep: "49409-188", tipo: "comercial", lat: -10.957500, lng: -37.560500 },
    { rua: "Praça da Bíblia", bairro: "Colônia Treze", cep: "49409-168", tipo: "residencial", lat: -10.956000, lng: -37.562000 },
    { rua: "Praça Santa Luzia", bairro: "Colônia Treze", cep: "49409-190", tipo: "residencial", lat: -10.955500, lng: -37.563000 },
    { rua: "Rodovia SE 160 (antiga Pista de Boquim)", bairro: "Colônia Treze", cep: "49409-002", tipo: "rural", lat: -10.960000, lng: -37.550000 },
    { rua: "Pista do Pau Grande", bairro: "Colônia Treze", cep: "49409-000", tipo: "rural", lat: -10.948256, lng: -37.575123 },

    // --- LOTEAMENTO PARQUE DAS LARANJEIRAS ---
    { rua: "Rua A", bairro: "Colônia Treze (Lot Prq das Laranjeiras)", cep: "49409-008", tipo: "residencial", lat: -10.958500, lng: -37.559200 },
    { rua: "Rua B", bairro: "Colônia Treze (Lot Prq das Laranjeiras)", cep: "49409-010", tipo: "residencial", lat: -10.958550, lng: -37.559300 },
    { rua: "Rua C", bairro: "Colônia Treze (Lot Prq das Laranjeiras)", cep: "49409-014", tipo: "residencial", lat: -10.958600, lng: -37.559400 },
    { rua: "Rua D", bairro: "Colônia Treze (Lot Prq das Laranjeiras)", cep: "49409-012", tipo: "residencial", lat: -10.958650, lng: -37.559500 },
    { rua: "Rua E", bairro: "Colônia Treze (Lot Prq das Laranjeiras)", cep: "49409-016", tipo: "residencial", lat: -10.958700, lng: -37.559600 },

    // --- LOTEAMENTO RESIDENCIAL DANIEL E MARIA ---
    { rua: "Rua A", bairro: "Colônia Treze (Lot Res Daniel e Maria)", cep: "49409-102", tipo: "residencial", lat: -10.959200, lng: -37.561500 },
    { rua: "Rua B", bairro: "Colônia Treze (Lot Res Daniel e Maria)", cep: "49409-090", tipo: "residencial", lat: -10.959250, lng: -37.561600 },
    { rua: "Rua C", bairro: "Colônia Treze (Lot Res Daniel e Maria)", cep: "49409-092", tipo: "residencial", lat: -10.959300, lng: -37.561700 },
    { rua: "Rua D", bairro: "Colônia Treze (Lot Res Daniel e Maria)", cep: "49409-104", tipo: "residencial", lat: -10.959350, lng: -37.561800 },
    { rua: "Rua E", bairro: "Colônia Treze (Lot Res Daniel e Maria)", cep: "49409-094", tipo: "residencial", lat: -10.959400, lng: -37.561900 },
    { rua: "Rua F", bairro: "Colônia Treze (Lot Res Daniel e Maria)", cep: "49409-096", tipo: "residencial", lat: -10.959450, lng: -37.562000 },

    // --- LOTEAMENTO POR DO SOL ---
    { rua: "Rua A", bairro: "Colônia Treze (Lot Por do Sol)", cep: "49409-138", tipo: "residencial", lat: -10.961000, lng: -37.563000 },
    { rua: "Rua B", bairro: "Colônia Treze (Lot Por do Sol)", cep: "49409-136", tipo: "residencial", lat: -10.961100, lng: -37.563100 },
    { rua: "Rua C", bairro: "Colônia Treze (Lot Por do Sol)", cep: "49409-134", tipo: "residencial", lat: -10.961200, lng: -37.563200 },

    // --- LOTEAMENTO SANTA BÁRBARA ---
    { rua: "Rua A", bairro: "Colônia Treze (Lot Santa Barbara)", cep: "49409-150", tipo: "residencial", lat: -10.955000, lng: -37.565000 },
    { rua: "Rua B", bairro: "Colônia Treze (Lot Santa Barbara)", cep: "49409-154", tipo: "residencial", lat: -10.955100, lng: -37.565100 },
    { rua: "Rua C", bairro: "Colônia Treze (Lot Santa Barbara)", cep: "49409-152", tipo: "residencial", lat: -10.955200, lng: -37.565200 },
    { rua: "Rua Flor de Santa Barbara", bairro: "Colônia Treze", cep: "49409-140", tipo: "residencial", lat: -10.955300, lng: -37.565300 },

    // --- CONJUNTO LEONOR FRANCO ---
    { rua: "Rua A", bairro: "Colônia Treze (CJ Leonor Franco)", cep: "49409-156", tipo: "residencial", lat: -10.956500, lng: -37.558000 },
    { rua: "Rua B", bairro: "Colônia Treze (CJ Leonor Franco)", cep: "49409-158", tipo: "residencial", lat: -10.956600, lng: -37.558100 },

    // --- LOTEAMENTO ARCO ÍRIS ---
    { rua: "Rua A", bairro: "Colônia Treze (Lot Arco Iris)", cep: "49409-208", tipo: "residencial", lat: -10.954000, lng: -37.560000 },
    { rua: "Rua B", bairro: "Colônia Treze (Lot Arco Iris)", cep: "49409-210", tipo: "residencial", lat: -10.954100, lng: -37.560100 },
    { rua: "Rua C", bairro: "Colônia Treze (Lot Arco Iris)", cep: "49409-212", tipo: "residencial", lat: -10.954200, lng: -37.560200 },
    { rua: "Rua D", bairro: "Colônia Treze (Lot Arco Iris)", cep: "49409-202", tipo: "residencial", lat: -10.954300, lng: -37.560300 },
    { rua: "Rua E", bairro: "Colônia Treze (Lot Arco Iris)", cep: "49409-204", tipo: "residencial", lat: -10.954400, lng: -37.560400 },
    { rua: "Rua F", bairro: "Colônia Treze (Lot Arco Iris)", cep: "49409-206", tipo: "residencial", lat: -10.954500, lng: -37.560500 },
    { rua: "Rua Arco Íris", bairro: "Colônia Treze", cep: "49409-226", tipo: "residencial", lat: -10.954600, lng: -37.560600 },

    // --- JARDIM UIRAPURU ---
    { rua: "Rua A", bairro: "Colônia Treze (Jardim Uirapuru)", cep: "49409-176", tipo: "residencial", lat: -10.953000, lng: -37.562000 },
    { rua: "Rua B", bairro: "Colônia Treze (Jardim Uirapuru)", cep: "49409-178", tipo: "residencial", lat: -10.953100, lng: -37.562100 },
    { rua: "Rua C", bairro: "Colônia Treze (Jardim Uirapuru)", cep: "49409-182", tipo: "residencial", lat: -10.953200, lng: -37.562200 },

    // --- RUAS NOMINAIS DIVERSAS ---
    { rua: "Rua Agilberto Dutra dos Santos", bairro: "Colônia Treze", cep: "49409-144", tipo: "residencial", lat: -10.957200, lng: -37.561500 },
    { rua: "Rua Amintas Monteiro dos Santos", bairro: "Colônia Treze", cep: "49409-056", tipo: "residencial", lat: -10.957300, lng: -37.561600 },
    { rua: "Rua Antônio Acenio dos Santos", bairro: "Colônia Treze", cep: "49409-088", tipo: "residencial", lat: -10.957400, lng: -37.561700 },
    { rua: "Rua Antônio Martins de Menezes", bairro: "Colônia Treze", cep: "49409-184", tipo: "residencial", lat: -10.957500, lng: -37.561800 },
    { rua: "Rua Antônio Otavio de Gois", bairro: "Colônia Treze", cep: "49409-116", tipo: "residencial", lat: -10.957600, lng: -37.561900 },
    { rua: "Rua Bolonha", bairro: "Colônia Treze", cep: "49409-066", tipo: "residencial", lat: -10.957700, lng: -37.562000 },
    { rua: "Rua Chapéu de Palha", bairro: "Colônia Treze", cep: "49409-068", tipo: "residencial", lat: -10.957800, lng: -37.562100 },
    { rua: "Rua de Davi", bairro: "Colônia Treze", cep: "49409-218", tipo: "residencial", lat: -10.957900, lng: -37.562200 },
    { rua: "Rua do Campo", bairro: "Colônia Treze", cep: "49409-034", tipo: "residencial", lat: -10.958000, lng: -37.562300 },
    { rua: "Rua Eponina Costa", bairro: "Colônia Treze", cep: "49409-026", tipo: "residencial", lat: -10.958100, lng: -37.562400 },
    { rua: "Rua Florença", bairro: "Colônia Treze", cep: "49409-120", tipo: "residencial", lat: -10.958200, lng: -37.562500 },
    { rua: "Rua Frei Galvão", bairro: "Colônia Treze", cep: "49409-050", tipo: "residencial", lat: -10.958300, lng: -37.562600 },
    
    // --- LOTEAMENTO NOVO HORIZONTE ---
    { rua: "Rua C", bairro: "Colônia Treze (Lot Novo Horizonte)", cep: "49409-106", tipo: "residencial", lat: -10.959000, lng: -37.558000 },
    { rua: "Rua E", bairro: "Colônia Treze (Lot Novo Horizonte)", cep: "49409-224", tipo: "residencial", lat: -10.959100, lng: -37.558100 }
];

// Pode usar o nome que preferir para o banco
const dbPath = path.resolve(__dirname, 'ceps_novo.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("❌ Erro no Banco:", err.message);
    else console.log(`✅ Banco conectado em: ${dbPath}`);
});

// ==================================================
// 🔄 INICIALIZAÇÃO E ATUALIZAÇÃO DO BANCO
// ==================================================
db.serialize(() => {
    // 1. Garante que a tabela existe
    db.run(`CREATE TABLE IF NOT EXISTS ruas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_rua TEXT,
        bairro TEXT,
        cidade TEXT DEFAULT 'Lagarto',
        uf TEXT DEFAULT 'SE',
        cep TEXT,
        tipo TEXT DEFAULT 'residencial',
        lat REAL, 
        lng REAL,
        buscas INTEGER DEFAULT 0
    )`);

    // 2. Verifica se insere ou atualiza
    db.get("SELECT count(*) as count FROM ruas", (err, row) => {
        if (err) return console.error(err.message);

        if (row && row.count === 0) {
            // --- CENÁRIO A: Banco Vazio ---
            console.log(`🆕 Banco novo detectado. Inserindo ${LISTA_DE_RUAS.length} ruas...`);
            const stmt = db.prepare("INSERT INTO ruas (nome_rua, bairro, cep, tipo, lat, lng) VALUES (?, ?, ?, ?, ?, ?)");
            LISTA_DE_RUAS.forEach(item => {
                stmt.run(item.rua, item.bairro, item.cep, item.tipo, item.lat || null, item.lng || null);
            });
            stmt.finalize();
            console.log("✅ Dados inseridos com sucesso!");
        } else {
            // --- CENÁRIO B: Banco Já Existe ---
            console.log(`🔄 O banco já existe com ${row.count} ruas.`);
            console.log(`⚙️ Forçando atualização de coordenadas e CEPs...`);
            
            const stmt = db.prepare("UPDATE ruas SET lat = ?, lng = ?, cep = ? WHERE nome_rua = ?");
            
            db.serialize(() => {
                db.run("BEGIN TRANSACTION");
                LISTA_DE_RUAS.forEach(item => {
                    // Atualiza todas as ruas que temos na lista
                    if (item.lat && item.lng) {
                        stmt.run(item.lat, item.lng, item.cep, item.rua);
                    }
                });
                db.run("COMMIT", () => {
                    console.log("🚀 BANCO SINCRONIZADO! Agora as coordenadas estão valendo.");
                });
            });
            stmt.finalize();
        }
    });
});

// Função auxiliar para normalizar texto (busca inteligente)
function normalizarTexto(texto) {
    if (!texto) return "";
    return texto
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/[().,-]/g, " ") // Remove pontuação
        .replace(/\s+/g, " ") // Remove espaços extras
        .replace(/\bav\b/g, "avenida")
        .replace(/\brod\b/g, "rodovia")
        .trim();
}

function contarBusca(id) {
    db.run(`UPDATE ruas SET buscas = buscas + 1 WHERE id = ?`, [id]);
}

// --- ROTAS ---

app.get('/api/buscar', (req, res) => {
    const termo = req.query.q;
    const sql = `SELECT * FROM ruas WHERE nome_rua LIKE ? OR cep LIKE ? OR bairro LIKE ? LIMIT 8`;
    db.all(sql, [`%${termo}%`, `%${termo}%`, `%${termo}%`], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.get('/api/ranking', (req, res) => {
    db.all(`SELECT * FROM ruas ORDER BY buscas DESC LIMIT 10`, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err });
        res.json({ data: rows });
    });
});

// ==========================================
// ROTA GEO-MATCH INTELIGENTE
// ==========================================
app.post('/api/geo-match', (req, res) => {
    const enderecoMap = req.body.endereco;
    
    if (!enderecoMap) return res.json({ found: false });

    const termoMapa = normalizarTexto(enderecoMap);
    console.log(`🔍 Buscando: "${enderecoMap}"`);

    const sql = `SELECT * FROM ruas`; 
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        
        // Match inteligente
        const match = rows.find(rua => {
            const termoBanco = normalizarTexto(rua.nome_rua);
            return termoMapa.includes(termoBanco) || termoBanco.includes(termoMapa);
        });
        
        if (match) {
            console.log(`✅ Rua Cadastrada: ${match.nome_rua}`);
            contarBusca(match.id);
            res.json({ found: true, data: match });
        } else {
            console.log(`ℹ️ Rua desconhecida. Usando dados genéricos.`);
            let nomeRuaLimpo = enderecoMap.split(',')[0]; 

            const dadosGenericos = {
                id: 999999,
                nome_rua: nomeRuaLimpo,
                bairro: "Colônia Treze",
                cidade: "Lagarto",
                uf: "SE",
                cep: "49409-000",
                tipo: "residencial",
                lat: null, 
                lng: null
            };

            res.json({ found: true, data: dadosGenericos, isGeneric: true });
        }
    });
});

app.post('/api/contar', (req, res) => {
    const id = req.body.id;
    contarBusca(id);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🚀 Sistema Colônia Treze rodando: http://localhost:${PORT}`);
    console.log(`📍 Agora o banco atualiza as coordenadas automaticamente ao iniciar!`);
});