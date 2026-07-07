# Mahal Tabacaria — Premium Smoke Shop Web App

Este é um web app **mobile-first** desenvolvido para a **Mahal Tabacaria**, oferecendo uma experiência premium e fluida de e-commerce simulando um aplicativo nativo para smartphones. O site conta com catálogo de produtos, busca em tempo real, carrinho de compras persistente e finalização de pedidos diretamente via WhatsApp.

---

## 📱 Demonstração & Design

O design do projeto foi concebido com uma estética rica e moderna:
- **Moldura Mobile**: Em telas maiores (desktops), o app é exibido dentro de um frame que imita a tela de um smartphone moderno, enquanto em dispositivos móveis ele se expande para ocupar 100% da tela (adaptado para a Safe Area do iOS/Android).
- **Esquema de Cores Customizado**: Inspirado na identidade visual da tabacaria, utilizando tons terracota e creme (`#662626` Vermelho Mahal, `#825B3E` Bronze Accent, `#FFEBDB` Cream).
- **Ilustrações Vetoriais Inteligentes**: Desenhos de produtos em formato SVG inline gerados dinamicamente via JavaScript, garantindo alta performance e carregamento instantâneo.
- **Micro-Animações**: Transições suaves entre as telas, efeitos de clique e animação de "esbarrão" (bump) no ícone do carrinho ao adicionar novos itens.

---

## ✨ Funcionalidades

1. **Vitrine Dinâmica**: Listagem de produtos premium com carregamento de animação stagger.
2. **Busca e Filtro por Categorias**: Barra de pesquisa em tempo real combinada com chips de filtro rápido (Todos, Essências, Sedas, Vaporizadores, Acessórios).
3. **Navegação em Abas (SPA)**: Transição instantânea sem recarregamento de página entre as abas:
   - **Início**: Vitrine de produtos.
   - **Categorias**: Listagem de todas as categorias com quantidade de itens.
   - **Carrinho**: Gerenciamento de itens selecionados.
   - **Sobre**: Informações de localização (com link para Google Maps), horário de funcionamento e contato direto.
4. **Carrinho de Compras Persistente**: O estado do carrinho é mantido usando `localStorage`, evitando que o usuário perca suas seleções se atualizar ou fechar a página.
5. **Detalhes do Produto (Bottom Sheet)**: Gaveta interativa que sobe a partir da parte inferior da tela para exibir descrição detalhada e permitir ajuste de quantidade do produto.
6. **Integração com WhatsApp**: Finalização do pedido compilando todos os itens, quantidades e subtotal em uma mensagem formatada de fácil leitura enviada diretamente ao número da Mahal.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível.
- **CSS3 (Customizado)**: Estilos sob medida para animações de fade-in, transições de gavetas e estilização da barra de rolagem.
- **Tailwind CSS (via CDN)**: Framework utilitário para estilização rápida e responsiva.
- **JavaScript Vanilla**: Lógica de gerenciamento de estado (carrinho, views e filtros) sem dependência de frameworks externos.

---

## 📁 Estrutura do Projeto

```text
mahaltabacaria/
├── css/
│   └── styles.css        # Animações personalizadas e ajustes finos de layout
├── js/
│   └── app.js            # Base de dados (mock), controle de estado e integração
├── images/
│   ├── mahal_new_logo.jpeg
│   └── mahal_new_logo-removed-bg.png  # Logo oficial transparente usado no app
├── index.html            # Estrutura principal do aplicativo e layout mobile-first
└── README.md             # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

Como o projeto é construído apenas com tecnologias nativas do navegador (HTML, CSS e JS), não é necessário um processo de compilação.

### Opção 1: Direto no Navegador
Basta abrir o arquivo [index.html](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/index.html) diretamente em qualquer navegador moderno.

### Opção 2: Servidor Local (Recomendado)
Para uma melhor experiência de desenvolvimento e evitar restrições de segurança locais (CORS) com alguns recursos, você pode iniciar um servidor estático simples:

Usando **Python 3**:
```bash
python3 -m http.server 8000
```
Depois, abra `http://localhost:8000` em seu navegador.

Ou usando **Node.js (npx)**:
```bash
npx serve
```

---

## ⚙️ Configurações Importantes

### Como alterar o número do WhatsApp de atendimento
Abra o arquivo [js/app.js](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/js/app.js) e altere a constante na linha 11 com o número da sua loja (incluindo DDI e DDD, sem espaços ou símbolos):

```javascript
// Exemplo para o número (83) 99669-7177
const WHATSAPP_NUMBER = '5583996697177';
```

### Como alterar ou cadastrar produtos
Os produtos são controlados por um array de objetos chamado `PRODUCTS` no arquivo [js/app.js](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/js/app.js). Você pode editar, remover ou adicionar novos objetos no formato:

```javascript
{
  id: 13,
  name: 'Nome do seu Produto',
  price: 29.90,
  category: 'acessorios', // essencias | sedas | vaporizadores | acessorios
  art: 'seda',            // SVG a ser usado: pod | seda | essencia | dichavador | isqueiro | carvao | piteira
  tint: '#EAD9CF',        // Cor de fundo do card
  a: '#662626',           // Cor primária do desenho SVG
  b: '#825B3E',           // Cor secundária do desenho SVG
  desc: 'Descrição completa do produto...'
}
```
