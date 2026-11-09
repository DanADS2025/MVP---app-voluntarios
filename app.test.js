/**
 * Testes Unitários e de Integração - App Voluntários CAMPUS
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const { validarLogin, confirmarPresenca, recusarPresenca, gerarLinkWhatsApp } = require('./app');

describe('Validação Funcional e Acessibilidade do MVP', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
    document.documentElement.innerHTML = html.toString();
  });

  test('Deve conter campos de login com rótulos de identificação', () => {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    expect(emailInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
  });

  test('Deve validar credenciais no login com sucesso e rejeitar inválidas', () => {
    expect(validarLogin('lucas.silva@campus.org', '123456')).toBe(true);
    expect(validarLogin('', '')).toBe(false);
  });

  test('Deve confirmar presença na escala com 1 clique', () => {
    const res = confirmarPresenca('esc_01');
    expect(res.status).toBe('CONFIRMADO');
  });

  test('Deve sinalizar recusa e registrar indisponibilidade', () => {
    const res = recusarPresenca('esc_01', 'Imprevisto');
    expect(res.status).toBe('INDISPONIVEL');
  });

  test('Deve gerar URI correta e parametrizada para o WhatsApp (wa.me)', () => {
    const link = gerarLinkWhatsApp('5511999999999', 'Ola Lider');
    expect(link).toContain('https://wa.me/5511999999999?text=Ola%20Lider');
  });

  test('Deve conter o card de escalas com detalhes ministeriais no DOM', () => {
    expect(document.body.textContent).toMatch(/Kids|Culto|Escala/i);
  });
});