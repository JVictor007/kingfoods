const restaurantes = [
  { nome: "Braz Massas e Molhos", tipo: "Italiana", endereco: "Varjota, Fortaleza", link: "https://cardapio.menu/restaurants/fortaleza-7/braz-massas-e-molhos" },
  { nome: "Marcel Restaurante", tipo: "Francesa", endereco: "Meireles, Fortaleza", link: "https://cardapio.menu/restaurants/fortaleza/marcel-28" },
  { nome: "Damaki Sushi", tipo: "Japonesa", endereco: "Aldeota, Fortaleza", link: "https://damakisushi.com.br/damakisushi" },
  { nome: "Marques da Varjota", tipo: "Portuguesa", endereco: "Varjota, Fortaleza", link: "https://cardapio.menu/restaurants/fortaleza/marques-da-varjota" },
  { nome: "Coco Bambu", tipo: "Frutos do Mar", endereco: "Beira Mar, Fortaleza", link: "https://www.cocobambu.com" },
  { nome: "Outback Steakhouse", tipo: "Australiana", endereco: "Shopping Iguatemi, Fortaleza", link: "https://www.outback.com.br" },
  { nome: "Madero", tipo: "Hamburgueria", endereco: "Shopping RioMar, Fortaleza", link: "https://www.madero.com.br" },
  { nome: "China in Box", tipo: "Chinesa", endereco: "Diversas unidades", link: "https://www.chinainbox.com.br" },
  { nome: "Gendai", tipo: "Japonesa", endereco: "Aldeota, Fortaleza", link: "https://www.gendai.com.br" },
  { nome: "La France", tipo: "Francesa", endereco: "Meireles, Fortaleza", link: "#" },
  { nome: "Pasta & Basta", tipo: "Italiana", endereco: "Varjota, Fortaleza", link: "#" },
  { nome: "Decky", tipo: "Hamburgueria", endereco: "Praia de Iracema", link: "#" },
  { nome: "Ó do Borogodó", tipo: "Nordestina", endereco: "Dionísio Torres", link: "#" },
  { nome: "Cantina do Gigante", tipo: "Italiana", endereco: "Aldeota, Fortaleza", link: "#" },
  { nome: "Soho", tipo: "Francesa", endereco: "Meireles, Fortaleza", link: "#" },
  { nome: "Tempurá", tipo: "Japonesa", endereco: "Varjota, Fortaleza", link: "#" },
  { nome: "Mangai", tipo: "Nordestina", endereco: "Diversas unidades", link: "#" },
  { nome: "Fellini", tipo: "Italiana", endereco: "Aldeota, Fortaleza", link: "#" },
  { nome: "Spoleto", tipo: "Italiana", endereco: "Diversas unidades", link: "#" }
];

/* FUNÇÃO DE TOAST */

function showToast(message) {
  const toastElement = document.getElementById('liveToast');
  const toastMessage = document.getElementById('toastMessage');
  toastMessage.textContent = message;
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();
}

/* AUTOCOMPLETE - SUGESTÕES DE BUSCA */

function showSuggestions(inputValue) {
  const autocompleteList = document.getElementById('autocomplete-list');
  
  if (!inputValue || inputValue.length < 2) {
    autocompleteList.style.display = 'none';
    return;
  }
  
  const filtered = restaurantes.filter(r => 
    r.nome.toLowerCase().includes(inputValue.toLowerCase()) ||
    r.tipo.toLowerCase().includes(inputValue.toLowerCase())
  );
  
  if (filtered.length === 0) {
    autocompleteList.style.display = 'none';
    return;
  }
  
  autocompleteList.innerHTML = '';
  autocompleteList.style.display = 'block';
  
  filtered.slice(0, 8).forEach(rest => {
    const div = document.createElement('div');
    div.innerHTML = `
      <span><strong>${rest.nome}</strong><br><small>${rest.tipo} • ${rest.endereco}</small></span>
      <span class="restaurant-type">${rest.tipo}</span>
    `;
    div.addEventListener('click', function() {
      document.getElementById('searchInput').value = rest.nome;
      autocompleteList.style.display = 'none';
      showToast(`${rest.nome} - ${rest.tipo} em ${rest.endereco}`);
      if (rest.link && rest.link !== '#') {
        setTimeout(() => {
          if (confirm(`Deseja visitar a página do ${rest.nome}?`)) {
            window.open(rest.link, '_blank');
          }
        }, 500);
      }
    });
    autocompleteList.appendChild(div);
  });
}

/* EVENTO DE DIGITAÇÃO NA BUSCA */

const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    showSuggestions(this.value);
  });
}

/* FECHAR SUGESTÕES AO CLICAR FORA */

document.addEventListener('click', function(e) {
  const autocompleteList = document.getElementById('autocomplete-list');
  if (e.target !== searchInput && autocompleteList) {
    autocompleteList.style.display = 'none';
  }
});

/* SUBMISSÃO DO FORMULÁRIO DE BUSCA */

const searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
      const found = restaurantes.filter(r => 
        r.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (found.length > 0) {
        showToast(`Encontramos ${found.length} resultado(s) para "${searchTerm}"`);
      } else {
        showToast(`Nenhum restaurante encontrado para "${searchTerm}"`);
      }
    } else {
      showToast('Digite o nome de um restaurante ou tipo de cozinha');
    }
  });
}

/* MODAL COM TODOS OS RESTAURANTES */

function fillRestaurantsModal() {
  const container = document.getElementById('restaurantsList');
  if (!container) return;
  
  container.innerHTML = '';
  
  const grouped = {};
  restaurantes.forEach(r => {
    if (!grouped[r.tipo]) grouped[r.tipo] = [];
    grouped[r.tipo].push(r);
  });
  
  for (const [tipo, items] of Object.entries(grouped)) {
    const tipoSection = document.createElement('div');
    tipoSection.className = 'mb-4';
    tipoSection.innerHTML = `<h5 style="color: #c49a2a; border-bottom: 2px solid #c49a2a; padding-bottom: 5px;">${tipo}</h5>`;
    
    const listGroup = document.createElement('div');
    listGroup.className = 'list-group';
    
    items.forEach(rest => {
      const item = document.createElement('a');
      item.href = rest.link !== '#' ? rest.link : '#';
      item.target = rest.link !== '#' ? '_blank' : '';
      item.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
      item.innerHTML = `
        <div>
          <strong>${rest.nome}</strong>
          <br><small class="text-muted">${rest.endereco}</small>
        </div>
        <span class="badge bg-warning text-dark">${rest.tipo}</span>
      `;
      if (rest.link === '#') {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          showToast(`${rest.nome} - Em breve disponível no KingFood!`);
        });
      }
      listGroup.appendChild(item);
    });
    
    tipoSection.appendChild(listGroup);
    container.appendChild(tipoSection);
  }
}

const allRestaurantsModal = document.getElementById('allRestaurantsModal');
if (allRestaurantsModal) {
  allRestaurantsModal.addEventListener('show.bs.modal', fillRestaurantsModal);
}

/* CADASTRO DE USUÁRIO */

const cadastrarBtn = document.getElementById('cadastrarBtn');
if (cadastrarBtn) {
  cadastrarBtn.addEventListener('click', function() {
    const email = document.getElementById('floatingEmail').value.trim();
    const senha = document.getElementById('floatingPassword').value.trim();
    const telefone = document.getElementById('floatingPhone').value.trim();
    const termos = document.getElementById('termsCheck').checked;
    
    if (!email || !senha || !telefone) {
      document.getElementById('errorMessage').innerHTML = 'Todos os campos são obrigatórios.';
      new bootstrap.Modal(document.getElementById('errorModal')).show();
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      document.getElementById('errorMessage').innerHTML = 'Digite um e-mail válido.';
      new bootstrap.Modal(document.getElementById('errorModal
