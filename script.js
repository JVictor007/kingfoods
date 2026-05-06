function showToast(message) {
  const toastElement = document.getElementById('liveToast');
  const toastMessage = document.getElementById('toastMessage');
  toastMessage.textContent = message;
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();
}

// Lógica de cadastro com validação
document.getElementById('cadastrarBtn').addEventListener('click', function() {
  const email = document.getElementById('floatingEmail').value.trim();
  const senha = document.getElementById('floatingPassword').value.trim();
  const telefone = document.getElementById('floatingPhone').value.trim();
  const termsAccepted = document.getElementById('termsCheck').checked;
  
  // Validação
  if (!email || !senha || !telefone) {
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById('errorMessage').innerHTML = '❌ Por favor, preencha todos os campos (Email, Senha e Telefone)!';
    errorModal.show();
    return;
  }
  
  if (!termsAccepted) {
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById('errorMessage').innerHTML = '📝 Você precisa concordar com os termos para se cadastrar!';
    errorModal.show();
    return;
  }
  
  if (!email.includes('@') || !email.includes('.')) {
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById('errorMessage').innerHTML = '📧 Digite um email válido (exemplo@dominio.com)!';
    errorModal.show();
    return;
  }
  
  if (senha.length < 4) {
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById('errorMessage').innerHTML = '🔒 A senha deve ter no mínimo 4 caracteres!';
    errorModal.show();
    return;
  }
  
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  successModal.show();
  
  // Limpar campos opcionalmente
  document.getElementById('floatingEmail').value = '';
  document.getElementById('floatingPassword').value = '';
  document.getElementById('floatingPhone').value = '';
  document.getElementById('termsCheck').checked = false;
  
  // Toast de boas-vindas
  setTimeout(() => {
    showToast('🎉 Bem-vindo ao KingFood! Aproveite as ofertas exclusivas.');
  }, 500);
});

// Sistema de pesquisa interativo
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (searchTerm) {
    showToast(`🔍 Pesquisando por "${searchTerm}" em nossos restaurantes parceiros...`);
    // Simulação: poderia redirecionar ou filtrar
    setTimeout(() => {
      showToast(`✨ Encontramos diversas opções para "${searchTerm}"! Explore nosso site.`);
    }, 1500);
  } else {
    showToast('🍽️ Digite o nome de um restaurante ou prato para pesquisar!');
  }
});

// Feedback flutuante
document.getElementById('feedbackBtn').addEventListener('click', function() {
  const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
  feedbackModal.show();
});

document.getElementById('sendFeedback').addEventListener('click', function() {
  const feedbackMsg = document.getElementById('feedbackText').value.trim();
  if (feedbackMsg) {
    showToast('💖 Obrigado pelo seu feedback! Vamos melhorar ainda mais o KingFood.');
    document.getElementById('feedbackText').value = '';
    const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
    modal.hide();
  } else {
    showToast('📝 Por favor, digite seu feedback antes de enviar.');
  }
});

// Efeito de animação ao rolar para os cards
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.row .col').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});

// Efeito nas imagens das colunas
const allImages = document.querySelectorAll('.col img');
allImages.forEach(img => {
  img.addEventListener('click', function() {
    showToast(`🍽️ Descubra receitas e restaurantes incríveis no KingFood!`);
  });
});

// Adicionar tooltips para os links do dropdown
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', function(e) {
    showToast(`🌍 Redirecionando para ${this.textContent.trim()}... Aproveite!`);
  });
});

// Mensagem de boas-vindas ao carregar a página
window.addEventListener('load', function() {
  setTimeout(() => {
    showToast('👑 Bem-vindo ao KingFood! Descubra os melhores restaurantes do Brasil.');
  }, 1000);
});

// Efeito de foco no formulário
const formInputs = document.querySelectorAll('.form-floating textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.style.borderColor = '#c49a2a';
    this.style.boxShadow = '0 0 0 3px rgba(196,154,42,0.2)';
  });
  input.addEventListener('blur', function() {
    this.style.borderColor = '#e0e0e0';
    this.style.boxShadow = 'none';
  });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== "#" && href !== "") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
