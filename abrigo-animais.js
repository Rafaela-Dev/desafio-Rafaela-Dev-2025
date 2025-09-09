const ANIMAIS = {
Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
};

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const pessoa1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase());
      const pessoa2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase());
      const ordem = ordemAnimais.split(',').map(a => a.trim());

    // Validações
    if (new Set(ordem).size !== ordem.length || ordem.some(a => !ANIMAIS[a])) {
      return { erro: 'Animal inválido' };
   }
    if (new Set([...pessoa1]).size !== pessoa1.length || new Set([...pessoa2]).size !== pessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    const adotados = [];
    const adotadosPorPessoa = { 1: [], 2: [] };

    for (let nomeAnimal of ordem) {
    const { tipo, brinquedos } = ANIMAIS[nomeAnimal];

    let pessoa1Pode = this.verifica(brinquedos, pessoa1, tipo);
    let pessoa2Pode = this.verifica(brinquedos, pessoa2, tipo);


      // Regra do jabuti Loco (não liga para ordem, só precisa de companhia)
    if (nomeAnimal === 'Loco') {
      pessoa1Pode = adotadosPorPessoa[1].length > 0;
      pessoa2Pode = adotadosPorPessoa[2].length > 0;
    }

    if (pessoa1Pode && pessoa2Pode) {
      adotados.push(`${nomeAnimal} - abrigo`);
      continue;
    }
    if (pessoa1Pode && adotadosPorPessoa[1].length < 3) {
      adotadosPorPessoa[1].push(nomeAnimal);
      adotados.push(`${nomeAnimal} - pessoa 1`);
    } else if (pessoa2Pode && adotadosPorPessoa[2].length < 3) {
      adotadosPorPessoa[2].push(nomeAnimal);
      adotados.push(`${nomeAnimal} - pessoa 2`);
    } else {
      adotados.push(`${nomeAnimal} - abrigo`);
    }
  }

    return { lista: adotados.sort((a, b) => a.localeCompare(b)) };
    } catch (e) {
    return { erro: 'Erro inesperado' };
    }
   }
}

export { AbrigoAnimais as AbrigoAnimais };
