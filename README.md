# 📍 Localizador de CEP - Colônia Treze

![Status](https://img.shields.io/badge/Status-Em_Produção-success)
![License](https://img.shields.io/badge/License-MIT-blue)

> Uma solução Fullstack para resolver o problema de endereçamento e localização em áreas rurais e novos loteamentos da Colônia Treze (Lagarto/SE).

🔗 **Acesse o projeto online:** [https://localizador-de-cep-colonia-treze.onrender.com](https://localizador-de-cep-colonia-treze.onrender.com)

---

## 💡 O Problema
Moradores de comunidades em expansão, como a **Colônia Treze**, sofrem com a falta de mapeamento preciso em ferramentas convencionais (Google Maps, Correios). Novos loteamentos (ex: *Parque das Laranjeiras*, *Daniel e Maria*) muitas vezes não aparecem ou são direcionados incorretamente para o centro da cidade vizinha.

## 🚀 A Solução
Desenvolvi um sistema web que utiliza uma **base de dados própria e curada manualmente** com as coordenadas exatas de cada loteamento. O sistema utiliza um algoritmo híbrido de busca que prioriza dados locais e usa APIs externas apenas como fallback, garantindo que o usuário sempre encontre o local correto.

---

## 🛠️ Tecnologias Utilizadas

### Backend (API)
- **Node.js & Express:** Servidor rápido e escalável.
- **SQLite3:** Banco de dados relacional leve.
    - *Feature:* O banco se **auto-regenera** a cada reinicialização, garantindo integridade dos dados na nuvem sem custos de persistência.
- **Geo-Match Algorithm:** Lógica personalizada para cruzar nomes de ruas com coordenadas geográficas precisas.

### Frontend (Interface)
- **HTML5 & JavaScript (ES6+):** Lógica de cliente otimizada.
- **Tailwind CSS:** Estilização moderna e responsiva (Mobile First).
- **Leaflet.js:** Renderização de mapas interativos e leves.
- **OpenStreetMap (Nominatim):** API de geocodificação reversa auxiliar.

---

## ✨ Funcionalidades Principais

- 🔍 **Busca Inteligente:** Encontra ruas e loteamentos que não existem no Google Maps.
- 📍 **Navegação Precisa:** Sistema de "Cerca Virtual" que impede que o mapa jogue o usuário para o centro de Lagarto (Luiz Freire) incorretamente.
- 🎮 **Gamificação:** Sistema de XP e Níveis para incentivar o uso da comunidade.
- ⛅ **Integração de Serviços:** Mostra previsão do tempo e distância para pontos úteis (Correios, Saúde, Mercado).
- 📱 **Instalação PWA:** Interface adaptável que funciona como aplicativo nativo no celular.

---

## ⚙️ Como Rodar Localmente

Se você quiser testar ou modificar o projeto na sua máquina:

### Pré-requisitos
- Node.js instalado.
- Git instalado.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/devluizinwxy/cep-colonia-treze.git](https://github.com/devluizinwxy/cep-colonia-treze.git)
   cd cep-colonia-treze# Localizador-de-CEP-col-nia-treze
   Método,Rota,Descrição
GET,/api/buscar?q=termo,Busca ruas por nome (Autocomplete).
GET,/api/ranking,Retorna as 10 ruas mais pesquisadas.
POST,/api/geo-match,Recebe um endereço e retorna coordenadas exatas do banco local.
👨‍💻 Autor
Desenvolvido por Luis de Jesus Fernandes. Estudante de Sistemas de Informação - IFS

📸 Instagram: @luizinwxy

💼 LinkedIn: Luis Fernandes

🐙 GitHub: devluizinwxy

Feito com 💙 para a comunidade da Colônia Treze.


### Dica Extra:
No GitHub, se você puder, tire um **Print da tela do seu site** (uma do mapa e uma da pesquisa), salve n
