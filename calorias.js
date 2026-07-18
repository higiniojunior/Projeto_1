function calcularTMB(peso, alturaCm, idade, sexo) {
  const base = 10 * peso + 6.25 * alturaCm - 5 * idade;
  return sexo === 'masculino' ? base + 5 : base - 161;
}

function calcularMetas(tmb, fatorAtividade) {
  const manter = tmb * fatorAtividade;
  return { manter, perder: manter - 500, ganhar: manter + 500 };
}

function validarDadosCalorias(peso, altura, idade, sexo) {
  if (!peso || isNaN(peso) || peso < 1 || peso > 300) return 'Peso inválido. Atualize o campo peso.';
  if (!altura || isNaN(altura) || altura < 50 || altura > 250) return 'Altura inválida. Atualize o campo altura.';
  if (!idade || isNaN(idade) || idade < 15 || idade > 100) return 'Informe uma idade entre 15 e 100 anos.';
  if (sexo !== 'masculino' && sexo !== 'feminino') return 'Selecione o sexo biológico.';
  return null;
}

// ===== Mini formulário (index.html) =====
const formMini = document.getElementById('calorias-mini-form');
if (formMini) {
  formMini.addEventListener('submit', e => {
    e.preventDefault();

    const peso   = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade  = parseFloat(document.getElementById('mini-idade').value);
    const sexo   = document.getElementById('mini-sexo').value;
    const fator  = parseFloat(document.getElementById('mini-atividade').value);

    const erroEl = document.getElementById('erro-calorias-mini');
    const erro = validarDadosCalorias(peso, altura, idade, sexo);
    if (erro) {
      erroEl.textContent = erro;
      return;
    }
    erroEl.textContent = '';

    const tmb   = calcularTMB(peso, altura, idade, sexo);
    const metas = calcularMetas(tmb, fator);

    document.getElementById('mini-tmb-valor').textContent    = Math.round(tmb);
    document.getElementById('mini-meta-perder').textContent  = Math.round(metas.perder);
    document.getElementById('mini-meta-manter').textContent  = Math.round(metas.manter);
    document.getElementById('mini-meta-ganhar').textContent  = Math.round(metas.ganhar);
    document.getElementById('mini-peso-usado').textContent   = peso;
    document.getElementById('mini-altura-usado').textContent = altura;

    document.getElementById('resultado-calorias-mini').classList.remove('hidden');
  });
}

// ===== Formulário completo (calorias.html) =====
const formCompleto = document.getElementById('calorias-form');
if (formCompleto) {
  const inputPeso  = document.getElementById('peso');
  const inputAlt   = document.getElementById('altura');
  const inputIdade = document.getElementById('idade');
  const selectSexo = document.getElementById('sexo');
  const secaoRes   = document.getElementById('resultado-calorias');

  formCompleto.addEventListener('submit', e => {
    e.preventDefault();

    const peso   = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAlt.value);
    const idade  = parseFloat(inputIdade.value);
    const sexo   = selectSexo.value;
    const fator  = parseFloat(document.getElementById('atividade').value);

    const erroEl = document.getElementById('erro-calorias');
    const erro = validarDadosCalorias(peso, altura, idade, sexo);
    if (erro) {
      erroEl.textContent = erro;
      return;
    }
    erroEl.textContent = '';

    const tmb   = calcularTMB(peso, altura, idade, sexo);
    const metas = calcularMetas(tmb, fator);

    document.getElementById('tmb-valor').textContent   = Math.round(tmb);
    document.getElementById('meta-perder').textContent = Math.round(metas.perder);
    document.getElementById('meta-manter').textContent = Math.round(metas.manter);
    document.getElementById('meta-ganhar').textContent = Math.round(metas.ganhar);

    if (secaoRes.classList.contains('hidden')) {
      secaoRes.classList.remove('hidden');
      secaoRes.style.animation = 'none';
      requestAnimationFrame(() => {
        secaoRes.style.animation = '';
      });
    }

    secaoRes.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
