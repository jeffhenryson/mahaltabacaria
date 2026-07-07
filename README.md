![Mahal Tabacaria](https://i.ibb.co/prLWdcJs/bg-github-project.png)

# Mahal Tabacaria — Premium Smoke Shop Web App

> Uma vitrine virtual **mobile-first** premium projetada para oferecer uma experiência de compra fluida e moderna, simulando um aplicativo nativo diretamente no celular do cliente.

O **Mahal Tabacaria** é a solução perfeita para modernizar o atendimento e impulsionar vendas. Ele conta com um design exclusivo, catálogo dinâmico de produtos com filtros inteligentes, carrinho de compras persistente e fechamento de pedidos rápido e prático direto no WhatsApp.

---

## ✨ Diferenciais & Funcionalidades Premium

*   **📱 Experiência de Aplicativo Nativo:** Layout otimizado para celulares, com suporte a gestos e transições de tela ultra suaves.
*   **🛒 Carrinho Inteligente & Persistente:** Usa `localStorage` para salvar os itens do usuário mesmo se ele fechar a aba ou recarregar a página.
*   **⚡ Vitrine e Busca Instantânea:** Filtragem dinâmica de produtos por categoria e barra de busca inteligente em tempo real.
*   **🔔 Gaveta Interativa de Detalhes:** Apresentação elegante dos detalhes dos produtos através de um componente bottom sheet de alta fidelidade.
*   **💬 Finalização de Pedido via WhatsApp:** Compila de forma automatizada o carrinho completo e envia uma mensagem organizada e pronta para o vendedor finalizar a venda.

---

## 🛠️ Tecnologias Limpas e Modernas

Foco total em performance, compatibilidade e facilidade de manutenção:
*   **HTML5 & CSS3** com transições de tela customizadas e design premium.
*   **Tailwind CSS** para consistência visual rápida e responsiva.
*   **Vanilla JS (Zero Dependências):** Leve, rápido e seguro.

---

## 📁 Estrutura do Projeto

*   [index.html](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/index.html) — Interface do app mobile-first
*   [css/styles.css](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/css/styles.css) — Estilização personalizada e animações de alto padrão
*   [js/app.js](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/js/app.js) — Banco de dados local (mock), controle de estado e integração com WhatsApp

---

## 🚀 Como Começar

### 1. Inicie o App
Basta abrir o [index.html](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/index.html) no navegador ou rodar um servidor local simples:

```bash
python3 -m http.server 8000
```
Depois acesse `http://localhost:8000`.

### 2. Configure o seu WhatsApp
No arquivo [js/app.js](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/js/app.js), atualize o número de atendimento:
```javascript
const WHATSAPP_NUMBER = '5583996697177'; // Apenas números, com DDI e DDD
```

### 3. Customize seus Produtos
Adicione ou remova itens no array `PRODUCTS` dentro de [js/app.js](file:///home/jeff-henryson/Documents/myprojects/mahaltabacaria/js/app.js):
```javascript
{
  id: 1,
  name: 'Nome do Produto',
  price: 29.90,
  category: 'acessorios',
  art: 'seda',
  tint: '#EAD9CF',
  a: '#662626',
  b: '#825B3E',
  desc: 'Descrição detalhada...'
}
```
