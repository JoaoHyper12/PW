// Função para carregar produtos na loja
function carregarProdutos() {
  fetch('produtos.json')
    .then(response => response.json())
    .then(produtos => {
      const productList = document.querySelector('.product-list');
      productList.innerHTML = ''; // Limpa a lista

      produtos.forEach(produto => {
        productList.innerHTML += `
          <div class="product">
            <a href="Bucks.html?id=${produto.id}">
              <img src="${produto.imagem}" alt="${produto.nome}">
              <h3>${produto.nome}</h3>
              <p class="price">€${produto.preco_desconto.toFixed(2)} <del>€${produto.preco_original.toFixed(2)}</del></p>
            </a>
          </div>
        `;
      });
    });
}

// Função para carregar detalhes do produto
function carregarDetalhesProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get('id');

  if (produtoId) {
    fetch('produtos.json')
      .then(response => response.json())
      .then(produtos => {
        const produto = produtos.find(p => p.id == produtoId);
        
        if (produto) {
          document.title = produto.nome + " - 2K Basquete";
          document.querySelector('.product-image img').src = produto.imagem;
          document.querySelector('.product-image img').alt = produto.nome;
          document.querySelector('.product-details h1').textContent = produto.nome;
          document.querySelector('.price del').textContent = `€${produto.preco_original.toFixed(2)}`;
          document.querySelector('.price strong').textContent = `€${produto.preco_desconto.toFixed(2)}`;
          document.querySelector('.description').textContent = produto.descricao;
        }
      });
  }
}

// Função para o seletor de quantidade
function setupQuantitySelector() {
  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');
  const quantityInput = document.getElementById('qty');
  
  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }
}

// Inicializa as funções conforme a página
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.product-list')) {
    carregarProdutos(); // Para a página da loja
  }
  
  if (document.querySelector('.product-page')) {
    carregarDetalhesProduto(); // Para a página de detalhes
    setupQuantitySelector();
  }
});