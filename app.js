// Funções centrais do App Voluntários CAMPUS
function validarLogin(email, senha) {
  if (!email || !senha) return false;
  return email.includes("@") && senha.length >= 6;
}

function confirmarPresenca(escalaId) {
  return {
    id: escalaId,
    status: "CONFIRMADO",
    atualizadoEm: new Date().toISOString(),
  };
}

function recusarPresenca(escalaId, motivo) {
  return {
    id: escalaId,
    status: "INDISPONIVEL",
    motivo: motivo || "Nao informado",
  };
}

function gerarLinkWhatsApp(telefone, mensagem) {
  return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}

module.exports = {
  validarLogin,
  confirmarPresenca,
  recusarPresenca,
  gerarLinkWhatsApp,
};
