// Sistema de notificação via Toast
function showToast(message) {
  const toastElement = document.getElementById('liveToast');
  const toastMessage = document.getElementById('toastMessage');
  toastMessage.textContent = message;
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();
}

// Validação e cadastro de usuário
document.getElementById('cadastrarBtn').addEventListener('click', function() {
  const email = document.getElementById('floatingEmail').value.trim();
  const senha = document.getElementById('floatingPassword').value.trim();
  const telefone = document.getElementById('floatingPhone').value.trim();
  const termos = document.getElementById('termsCheck').checked;
  
  // Validações
  if (!email || !senha || !telefone) {
    document.getElementById('errorMessage').innerHTML = 'Todos os campos são obrigatórios.';
    new bootstrap.Modal(document.getElementById('errorModal')).show();
    return;
  }
  
  if (!email.includes('@') || !email.includes('.')) {
    document.getElementById('errorMessage').innerHTML = 'Digite um e-mail válido.';
    new bootstrap.Modal(document.getElementById('errorModal')).show();
    return;
  }
  
  if (senha.length < 4) {
    document.getElementById('errorMessage').innerHTML = 'A senha deve ter no mínimo 4 caracteres.';
    new bootstrap.Modal(document.getElementById('errorModal')).show();
    return;
  }
  
  if (!termos) {
    document.getElementById('errorMessage').innerHTML = 'Você deve aceitar os termos de uso.';
    new bootstrap.Modal(document.getElementById('errorModal')).show();
    return;
  }
  
  // Cadastro bem-sucedido
  new bootstrap.Modal(document.getElementById('successModal')).show();
  
  // Limpar formulário
  document.getElementById('floatingEmail').value = '';
  document.getElementById('floatingPassword').value = '';
  document.getElementById('floatingPhone').value = '';
  document.getElementById('termsCheck').checked = false;
  
  showToast('Cadastro realizado com sucesso!');
});

// Sistema de pesquisa
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const searchTerm = document.getElementById('searchInput').value.trim();
  
  if (searchTerm) {
    showToast(`Buscando por: ${searchTerm}`);
  } else {
    showToast('Digite um termo para pesquisar.');
  }
});

// Feedback do usuário
document.getElementById('feedbackBtn').addEventListener('click', function() {
  new bootstrap.Modal(document.getElementById('feedbackModal')).show();
});

document.getElementById('sendFeedback').addEventListener('click', function() {
  const feedback = document.getElementById('feedbackText').value.trim();
  
  if (feedback) {
    showToast('Feedback enviado com sucesso. Obrigado!');
    document.getElementById('feedbackText').value = '';
    bootstrap.Modal.getInstance(document.getElementById('feedbackModal')).hide();
  } else {
    showToast('Digite sua mensagem antes de enviar.');
  }
});

// Efeito de fade-in nos cards ao rolar a página
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('#sobre .col').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.5s ease';
  observer.observe(card);
});

// Clique nas imagens da galeria
document.querySelectorAll('.container img').forEach(img => {
  img.addEventListener('click', function() {
    showToast('Explore nosso cardápio completo.');
  });
});

// Mensagem de boas-vindas ao carregar a página
window.addEventListener('load', function() {
  setTimeout(() => {
    showToast('Bem-vindo ao KingFood');
  }, 1000);
});
