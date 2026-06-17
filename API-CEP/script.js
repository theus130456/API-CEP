  const cepInput = document.getElementById('cep');

    cepInput.addEventListener('input', () => {
      let val = cepInput.value.replace(/\D/g, '');
      if (val.length > 5) val = `${val.slice(0, 5)}-${val.slice(5, 8)}`;
      cepInput.value = val;
    });

    async function buscarCEP() {
      const btn = document.getElementById('btnBuscar');
      const cep = cepInput.value.replace(/\D/g, '');

      if (cep.length !== 8) {
        alert('Digite um CEP válido com 8 dígitos.');
        return;
      }

      btn.textContent = 'Buscando...';
      btn.classList.add('loading');
      btn.disabled = true;

      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        if (data.erro) {
          alert('CEP não encontrado. Verifique o número digitado.');
          limparCampos();
        } else {
          document.getElementById('estado').value = data.uf || '';
          document.getElementById('cidade').value = data.localidade || '';
          document.getElementById('bairro').value = data.bairro || '';
          document.getElementById('logradouro').value = data.logradouro || '';
        }
      } catch (err) {
        alert('Erro ao buscar o CEP. Tente novamente.');
      } finally {
        btn.textContent = 'Buscar';
        btn.classList.remove('loading');
        btn.disabled = false;
      }
    }

    function limparCampos() {
      ['estado', 'cidade', 'bairro', 'logradouro'].forEach(id => {
        document.getElementById(id).value = '';
      });
    }

    cepInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') buscarCEP();
    });