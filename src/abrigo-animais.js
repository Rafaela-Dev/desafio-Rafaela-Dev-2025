// constante ANIMAIS (estrutura de dados JSON-like)
// que mapeia cada animal (chave nome) a um objeto com suas características
// brinquedos: array de brinquedos que o animal gosta/precisa

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
     // strings transformadas em arrays de strings (split, map, trim) 
      const pessoa1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase());
      const pessoa2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase());
      const ordem = ordemAnimais.split(',').map(a => a.trim());

    // Validações (valida se há animais inválidos e se há brinquedos duplicados)
    if (new Set(ordem).size !== ordem.length || ordem.some(a => !ANIMAIS[a])) {
      return { erro: 'Animal inválido' };
   }
    if (new Set([...pessoa1]).size !== pessoa1.length || new Set([...pessoa2]).size !== pessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

      
    const adotados = [];
    const adotadosPorPessoa = { 1: [], 2: [] };

      // loop percorre os animais na ordem definids
    for (let nomeAnimal of ordem) {
    const { tipo, brinquedos } = ANIMAIS[nomeAnimal];

      // verifica se a Pessoa1/Pessoa2 possui os brinquedos que o animal precisa
    let pessoa1Pode = this.verifica(brinquedos, pessoa1, tipo);
    let pessoa2Pode = this.verifica(brinquedos, pessoa2, tipo);


      // Regra do jabuti Loco (não liga para ordem, só precisa de, ao menos, UMA companhia)
    if (nomeAnimal === 'Loco') {
      pessoa1Pode = adotadosPorPessoa[1].length > 0;
      pessoa2Pode = adotadosPorPessoa[2].length > 0;
    }

    if (pessoa1Pode && pessoa2Pode) {
      adotados.push(`${nomeAnimal} - abrigo`);
      continue;
    } // Regra limite: cada pessoa pode adotar, no máximo, 3 animais
    if (pessoa1Pode && adotadosPorPessoa[1].length < 3) {
     // Se a pessoa1 puder e ainda tiver espaço, ela adota 
      adotadosPorPessoa[1].push(nomeAnimal);
      adotados.push(`${nomeAnimal} - pessoa 1`);
      
    } else if (pessoa2Pode && adotadosPorPessoa[2].length < 3) 
     // Caso pessoa1 NÃO possa/tiver antigido o limite, a PESSOA2 adota 
      adotadosPorPessoa[2].push(nomeAnimal);
      adotados.push(`${nomeAnimal} - pessoa 2`);
      
    } else { // Regra de Desempate: se ambas as pessoas puderem adotar o animal, ele permanece no abrigo
      adotados.push(`${nomeAnimal} - abrigo`);
    }
  }

    // Função que retorna um objeto com a lista dos resultados finais, ordenados alfabeticamente
    return { lista: adotados.sort((a, b) => a.localeCompare(b)) };
    } catch (e) {
    return { erro: 'Erro inesperado' };
    }
   }
}

export { AbrigoAnimais as AbrigoAnimais };
