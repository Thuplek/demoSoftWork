export const agruparDadosPorStatus = (dados) => {
  const dadosAgrupados = dados.reduce((acc, cur) => {
    const { status } = cur;
    if (acc[status]) {
      acc[status].push(cur);
    } else {
      acc[status] = [cur];
    }
    return acc;
  }, {});
  return dadosAgrupados;
};

export const contarTarefasPorStatus = (dados) => {
  const dadosAgrupados = agruparDadosPorStatus(dados);
  const dadosContados = Object.keys(dadosAgrupados).map((key) => {
    return { label: key, value: dadosAgrupados[key].length };
  });
  return dadosContados;
};

export const filtrarPropostasDosUltimos15Dias = (dados) => {
  const dataAtual = new Date();
  const dataAtualEmMilisegundos = dataAtual.getTime();
  const dataLimiteEmMilisegundos = dataAtualEmMilisegundos - 1296000000;
  const dadosFiltrados = dados.filter((dado) => {
    const dataDaProposta = new Date(dado.data);
    const dataDaPropostaEmMilisegundos = dataDaProposta.getTime();
    return dataDaPropostaEmMilisegundos >= dataLimiteEmMilisegundos;
  });
  return dadosFiltrados;
};

export const filtrarPropostasDoUltimoMes = (dados) => {
  const dataAtual = new Date();
  const dataAtualEmMilisegundos = dataAtual.getTime();
  const dataLimiteEmMilisegundos = dataAtualEmMilisegundos - 2592000000;
  const dadosFiltrados = dados.filter((dado) => {
    const dataDaProposta = new Date(dado.data);
    const dataDaPropostaEmMilisegundos = dataDaProposta.getTime();
    return dataDaPropostaEmMilisegundos >= dataLimiteEmMilisegundos;
  });
  return dadosFiltrados;
};

export const filtrarPropostasDosUltimos3meses = (dados) => {
  const dataAtual = new Date();
  const dataAtualEmMilisegundos = dataAtual.getTime();
  const dataLimiteEmMilisegundos = dataAtualEmMilisegundos - 7776000000;
  const dadosFiltrados = dados.filter((dado) => {
    const dataDaProposta = new Date(dado.data);
    const dataDaPropostaEmMilisegundos = dataDaProposta.getTime();
    return dataDaPropostaEmMilisegundos >= dataLimiteEmMilisegundos;
  });
  return dadosFiltrados;
};
