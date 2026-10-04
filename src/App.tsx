import { useState } from "react";
import "./relatorio.css";

interface CategoriaMateriais {
  nome: string;
  materiais: string[];
}

interface Encomenda {
  id: number;
  situacao: "ASSUMIDO" | "PERMANECE";
  tipo: string;
  destinatario: string;
  codigo: string;
}

type TipoMovimentacao =
  | "FUNCIONARIO"
  | "FORNECEDOR"
  | "COLETA"
  | "PRESTADOR"
  | "VISITANTE"
  | "VEICULO"
  | "OUTRO";

interface Movimentacao {
  id: number;
  tipo: TipoMovimentacao;

  horarioEntrada: string;
  horarioSaida: string;

  imagemEntrada: string;
  imagemSaida: string;

  nome: string;
  empresa: string;
  motorista: string;
  placa: string;

  veiculo: string;
  funcao: string;

  observacao: string;

  // Usado principalmente para o caminhão MEGA.
  ordemMega: "ENTRADA_SAIDA" | "SAIDA_ENTRADA";
}

function App() {
  const [tela, setTela] = useState<"MENU" | "RELATORIO" | "PADROES">("MENU");
  const [etapa, setEtapa] = useState(1);

  const [data, setData] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [funcionarioEntregaInicio, setFuncionarioEntregaInicio] = useState("");
  const [funcionarioRecebeInicio, setFuncionarioRecebeInicio] = useState("");

  const [horarioFim, setHorarioFim] = useState("");
  const [funcionarioEntregaFim, setFuncionarioEntregaFim] = useState("");
  const [funcionarioRecebeFim, setFuncionarioRecebeFim] = useState("");

  const [categorias, setCategorias] = useState<CategoriaMateriais[]>([
    {
      nome: "Material Portaria",
      materiais: [
        "01 CPU com 03 monitores",
        "02 Mouses",
        "01 Celular com um carregador",
        "01 Telefone fixo",
        "05 Rádios Hytera com 02 carregadores",
        "01 Rádio Motorola com carregamento via USB",
        "01 Livro de ata",
        "01 Livro Protocolo de correspondência",
        "01 Kit Primeiro socorros",
        "01 Termômetro",
        "01 Lanterna",
      ],
    },
    {
      nome: "Controle de Jogos",
      materiais: [
        "11 Bolas de sinuca lisa",
        "15 Bolas de sinuca numeradas",
        "02 Raquetes de pingue pongue com uma bolinha",
        "10 Bolinhas do pebolim",
      ],
    },
    {
      nome: "Material MEGH",
      materiais: [
        "Quadro de chaves OK",
        "02 Capas de chuva",
        "06 Capacetes",
      ],
    },
  ]);

  const [materiaisRelatorio, setMateriaisRelatorio] =
    useState<CategoriaMateriais[]>([]);

  const [novoMaterial, setNovoMaterial] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);

  const [editandoPadrao, setEditandoPadrao] = useState<{
    categoria: number;
    material: number;
  } | null>(null);

  const [nomePadraoEditado, setNomePadraoEditado] = useState("");

  const [editandoRelatorio, setEditandoRelatorio] = useState<{
    categoria: number;
    material: number;
  } | null>(null);

  const [nomeRelatorioEditado, setNomeRelatorioEditado] = useState("");

  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [situacaoEncomenda, setSituacaoEncomenda] =
    useState<"ASSUMIDO" | "PERMANECE">("ASSUMIDO");
  const [tipoEncomenda, setTipoEncomenda] = useState("");
  const [destinatarioEncomenda, setDestinatarioEncomenda] = useState("");
  const [codigoEncomenda, setCodigoEncomenda] = useState("");
  const [editandoEncomenda, setEditandoEncomenda] = useState<number | null>(null);

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  const [tipoMovimentacaoSelecionado, setTipoMovimentacaoSelecionado] =
    useState<TipoMovimentacao>("FORNECEDOR");

  const [horarioEntrada, setHorarioEntrada] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");

  const [imagemEntrada, setImagemEntrada] = useState("");
  const [imagemSaida, setImagemSaida] = useState("");

  const [nomeMovimentacao, setNomeMovimentacao] = useState("");
  const [empresaMovimentacao, setEmpresaMovimentacao] = useState("");
  const [motoristaMovimentacao, setMotoristaMovimentacao] = useState("");
  const [placaMovimentacao, setPlacaMovimentacao] = useState("");
  const [veiculoMovimentacao, setVeiculoMovimentacao] = useState("");
  const [funcaoMovimentacao, setFuncaoMovimentacao] = useState("");
  const [observacaoMovimentacao, setObservacaoMovimentacao] = useState("");

  const [ordemMega, setOrdemMega] =
    useState<"ENTRADA_SAIDA" | "SAIDA_ENTRADA">("ENTRADA_SAIDA");

  const [editandoMovimentacao, setEditandoMovimentacao] =
    useState<number | null>(null);

  const [observacoes, setObservacoes] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  function iniciarRelatorio() {
    const copiaCategorias = categorias.map((categoria) => ({
      nome: categoria.nome,
      materiais: [...categoria.materiais],
    }));

    setMateriaisRelatorio(copiaCategorias);
    setData("");
    setHorarioInicio("");
    setFuncionarioEntregaInicio("");
    setFuncionarioRecebeInicio("");
    setHorarioFim("");
    setFuncionarioEntregaFim("");
    setFuncionarioRecebeFim("");

    setEncomendas([]);
    setMovimentacoes([]);
    setObservacoes("");

    limparCamposMovimentacao();
    limparCamposEncomenda();

    setEtapa(1);
    setModoEdicao(false);
    setTela("RELATORIO");
  }

  function continuar() {
    setEtapa((valor) => Math.min(valor + 1, 8));
  }

  function voltarEtapa() {
    setEtapa((valor) => Math.max(valor - 1, 1));
  }

  function adicionarMaterialPadrao() {
    if (!novoMaterial.trim()) return;

    const novasCategorias = categorias.map((categoria) => ({
      ...categoria,
      materiais: [...categoria.materiais],
    }));

    novasCategorias[categoriaSelecionada].materiais.push(novoMaterial.trim());
    setCategorias(novasCategorias);
    setNovoMaterial("");
  }

  function excluirMaterialPadrao(categoriaIndex: number, materialIndex: number) {
    const novasCategorias = categorias.map((categoria) => ({
      ...categoria,
      materiais: [...categoria.materiais],
    }));

    novasCategorias[categoriaIndex].materiais =
      novasCategorias[categoriaIndex].materiais.filter(
        (_, index) => index !== materialIndex
      );

    setCategorias(novasCategorias);
  }

  function iniciarEdicaoPadrao(categoriaIndex: number, materialIndex: number) {
    setEditandoPadrao({
      categoria: categoriaIndex,
      material: materialIndex,
    });

    setNomePadraoEditado(
      categorias[categoriaIndex].materiais[materialIndex]
    );
  }

  function salvarEdicaoPadrao() {
    if (!editandoPadrao || !nomePadraoEditado.trim()) return;

    const novasCategorias = categorias.map((categoria) => ({
      ...categoria,
      materiais: [...categoria.materiais],
    }));

    novasCategorias[editandoPadrao.categoria].materiais[
      editandoPadrao.material
    ] = nomePadraoEditado.trim();

    setCategorias(novasCategorias);
    setEditandoPadrao(null);
    setNomePadraoEditado("");
  }

  function cancelarEdicaoPadrao() {
    setEditandoPadrao(null);
    setNomePadraoEditado("");
  }

  function adicionarMaterialRelatorio(categoriaIndex: number) {
    if (!novoMaterial.trim()) return;

    const novasCategorias = materiaisRelatorio.map((categoria) => ({
      ...categoria,
      materiais: [...categoria.materiais],
    }));

    novasCategorias[categoriaIndex].materiais.push(novoMaterial.trim());

    setMateriaisRelatorio(novasCategorias);
    setNovoMaterial("");
  }

  function excluirMaterialRelatorio(
    categoriaIndex: number,
    materialIndex: number
  ) {
    const novasCategorias = materiaisRelatorio.map((categoria) => ({
      ...categoria,
      materiais: [...categoria.materiais],
    }));

    novasCategorias[categoriaIndex].materiais =
      novasCategorias[categoriaIndex].materiais.filter(
        (_, index) => index !== materialIndex
      );

    setMateriaisRelatorio(novasCategorias);
  }

  function iniciarEdicaoRelatorio(
    categoriaIndex: number,
    materialIndex: number
  ) {
    setEditandoRelatorio({
      categoria: categoriaIndex,
      material: materialIndex,
    });

    setNomeRelatorioEditado(
      materiaisRelatorio[categoriaIndex].materiais[materialIndex]
    );
  }

  function salvarEdicaoRelatorio() {
    if (!editandoRelatorio || !nomeRelatorioEditado.trim()) return;

    const novasCategorias = materiaisRelatorio.map((categoria) => ({
      ...categoria,
      materiais: [...categoria.materiais],
    }));

    novasCategorias[editandoRelatorio.categoria].materiais[
      editandoRelatorio.material
    ] = nomeRelatorioEditado.trim();

    setMateriaisRelatorio(novasCategorias);
    setEditandoRelatorio(null);
    setNomeRelatorioEditado("");
  }

  function cancelarEdicaoRelatorio() {
    setEditandoRelatorio(null);
    setNomeRelatorioEditado("");
  }

  function limparCamposEncomenda() {
    setSituacaoEncomenda("ASSUMIDO");
    setTipoEncomenda("");
    setDestinatarioEncomenda("");
    setCodigoEncomenda("");
    setEditandoEncomenda(null);
  }

  function salvarEncomenda() {
    if (!tipoEncomenda.trim() && !destinatarioEncomenda.trim() && !codigoEncomenda.trim()) {
      window.alert("Preencha pelo menos a encomenda, o destinatário ou o código/NF.");
      return;
    }

    if (editandoEncomenda !== null) {
      setEncomendas((lista) =>
        lista.map((item) =>
          item.id === editandoEncomenda
            ? {
                ...item,
                situacao: situacaoEncomenda,
                tipo: tipoEncomenda.trim(),
                destinatario: destinatarioEncomenda.trim(),
                codigo: codigoEncomenda.trim(),
              }
            : item
        )
      );
    } else {
      setEncomendas((lista) => [
        ...lista,
        {
          id: Date.now(),
          situacao: situacaoEncomenda,
          tipo: tipoEncomenda.trim(),
          destinatario: destinatarioEncomenda.trim(),
          codigo: codigoEncomenda.trim(),
        },
      ]);
    }

    limparCamposEncomenda();
  }

  function editarEncomenda(item: Encomenda) {
    setEditandoEncomenda(item.id);
    setSituacaoEncomenda(item.situacao);
    setTipoEncomenda(item.tipo);
    setDestinatarioEncomenda(item.destinatario);
    setCodigoEncomenda(item.codigo);
  }

  function excluirEncomenda(id: number) {
    setEncomendas((lista) => lista.filter((item) => item.id !== id));
  }

  function limparCamposMovimentacao() {
    setHorarioEntrada("");
    setHorarioSaida("");
    setImagemEntrada("");
    setImagemSaida("");
    setNomeMovimentacao("");
    setEmpresaMovimentacao("");
    setMotoristaMovimentacao("");
    setPlacaMovimentacao("");
    setVeiculoMovimentacao("");
    setFuncaoMovimentacao("");
    setObservacaoMovimentacao("");
    setOrdemMega("ENTRADA_SAIDA");
    setEditandoMovimentacao(null);
  }

  function mudarTipoMovimentacao(tipo: TipoMovimentacao) {
    setTipoMovimentacaoSelecionado(tipo);
    limparCamposMovimentacao();
  }

  function lerImagem(
    arquivo: File | undefined,
    destino: "entrada" | "saida"
  ) {
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
      const resultado = String(leitor.result || "");

      if (destino === "entrada") {
        setImagemEntrada(resultado);
      } else {
        setImagemSaida(resultado);
      }
    };

    leitor.readAsDataURL(arquivo);
  }

  function nomeTipoMovimentacao(tipo: TipoMovimentacao) {
    switch (tipo) {
      case "FUNCIONARIO":
        return "Funcionário";
      case "FORNECEDOR":
        return "Fornecedor";
      case "COLETA":
        return "Coleta";
      case "PRESTADOR":
        return "Prestador de serviço";
      case "VISITANTE":
        return "Visitante";
      case "VEICULO":
        return "Veículo";
      case "OUTRO":
        return "Outro";
    }
  }

  function gerarFraseMovimentacao(movimentacao: Movimentacao) {
    const entrada = movimentacao.horarioEntrada || "00h00min";
    const saida = movimentacao.horarioSaida || "00h00min";

    switch (movimentacao.tipo) {
      case "FORNECEDOR":
        return (
          `Às ${entrada} chegou o fornecedor ` +
          `${movimentacao.empresa || "[EMPRESA]"}` +
          `, motorista ${movimentacao.motorista || "[MOTORISTA]"}` +
          `, placa: ${movimentacao.placa || "[PLACA]"}. ` +
          `Saiu às ${saida}.`
        );

      case "COLETA":
        return (
          `Às ${entrada} chegou a coleta ` +
          `${movimentacao.empresa || "[NOME]"}` +
          `, motorista ${movimentacao.motorista || "[MOTORISTA]"}` +
          `, placa: ${movimentacao.placa || "[PLACA]"}. ` +
          `Saiu às ${saida}.`
        );

      case "PRESTADOR":
        if (movimentacao.motorista || movimentacao.placa) {
          return (
            `Às ${entrada} chegou o prestador de serviço ` +
            `${movimentacao.nome || "[NOME]"}` +
            `, motorista ${movimentacao.motorista || "[MOTORISTA]"}` +
            `, placa: ${movimentacao.placa || "[PLACA]"}. ` +
            `Saiu às ${saida}.`
          );
        }

        return (
          `Às ${entrada} chegou o prestador de serviço ` +
          `${movimentacao.nome || "[NOME]"}` +
          ` com a empresa ${movimentacao.empresa || "[EMPRESA]"}. ` +
          `Saiu às ${saida}.`
        );

      case "FUNCIONARIO":
        if (movimentacao.funcao.toLowerCase().includes("líder")) {
          return (
            `Às ${entrada} chegou a Líder do posto ` +
            `${movimentacao.nome || "[NOME]"}.`
          );
        }

        return (
          `Às ${entrada} chegou o funcionário ` +
          `${movimentacao.nome || "[NOME]"}` +
          `${
            movimentacao.funcao
              ? `, função ${movimentacao.funcao}`
              : ""
          }.`
        );

      case "VISITANTE":
        return (
          `Às ${entrada} chegou o visitante ` +
          `${movimentacao.nome || "[NOME]"}. ` +
          `Saiu às ${saida}.`
        );

      case "VEICULO": {
        const primeiraParte =
          movimentacao.ordemMega === "SAIDA_ENTRADA"
            ? `Às ${saida}, ${
                movimentacao.nome || "[NOME]"
              } saiu com o veículo ${
                movimentacao.veiculo || "[VEÍCULO]"
              }.`
            : `Às ${entrada}, ${
                movimentacao.nome || "[NOME]"
              } entrou com o veículo ${
                movimentacao.veiculo || "[VEÍCULO]"
              }.`;

        const segundaParte =
          movimentacao.ordemMega === "SAIDA_ENTRADA"
            ? `Entrou às ${entrada}.`
            : `Saiu às ${saida}.`;

        return `${primeiraParte} ${segundaParte}`;
      }

      case "OUTRO":
        return (
          `Às ${entrada} ` +
          `${movimentacao.nome || "[MOVIMENTAÇÃO]"}` +
          `${
            movimentacao.observacao
              ? ` ${movimentacao.observacao}`
              : ""
          }.`
        );

      default:
        return "";
    }
  }

  function salvarMovimentacao() {
    const novaMovimentacao: Movimentacao = {
      id: editandoMovimentacao ?? Date.now(),
      tipo: tipoMovimentacaoSelecionado,

      horarioEntrada,
      horarioSaida,

      imagemEntrada,
      imagemSaida,

      nome: nomeMovimentacao,
      empresa: empresaMovimentacao,
      motorista: motoristaMovimentacao,
      placa: placaMovimentacao,

      veiculo: veiculoMovimentacao,
      funcao: funcaoMovimentacao,

      observacao: observacaoMovimentacao,

      ordemMega,
    };

    if (editandoMovimentacao !== null) {
      setMovimentacoes((lista) =>
        lista.map((item) =>
          item.id === editandoMovimentacao ? novaMovimentacao : item
        )
      );
    } else {
      setMovimentacoes((lista) => [...lista, novaMovimentacao]);
    }

    limparCamposMovimentacao();
  }

  function editarMovimentacao(item: Movimentacao) {
    setEditandoMovimentacao(item.id);

    setTipoMovimentacaoSelecionado(item.tipo);
    setHorarioEntrada(item.horarioEntrada);
    setHorarioSaida(item.horarioSaida);

    setImagemEntrada(item.imagemEntrada);
    setImagemSaida(item.imagemSaida);

    setNomeMovimentacao(item.nome);
    setEmpresaMovimentacao(item.empresa);
    setMotoristaMovimentacao(item.motorista);
    setPlacaMovimentacao(item.placa);
    setVeiculoMovimentacao(item.veiculo);
    setFuncaoMovimentacao(item.funcao);
    setObservacaoMovimentacao(item.observacao);
    setOrdemMega(item.ordemMega);
  }

  function excluirMovimentacao(id: number) {
    setMovimentacoes((lista) =>
      lista.filter((item) => item.id !== id)
    );
  }

  function gerarTextoRelatorio() {
    let texto = "";

    texto += "GRUPO SEPA\n";
    texto += "SEGURANÇA PATRIMONIAL\n";
    texto += "RELATÓRIO DE PLANTÃO\n\n";

    texto +=
      "Av. Presidente Wilson, 4986 – Vila independência – São Paulo – SP\n\n";

    texto += `Eu, ${funcionarioRecebeInicio || "[FUNCIONÁRIO QUE RECEBE]"}, recebo a passagem de posto do Sr. ${
      funcionarioEntregaInicio || "[FUNCIONÁRIO QUE ENTREGA]"
    } às ${horarioInicio || "00:00"}.\n\n`;

    texto += "MATERIAL PORTARIA\n";

    materiaisRelatorio.forEach((categoria) => {
      texto += `\n${categoria.nome}\n`;
      categoria.materiais.forEach((material) => {
        texto += `- ${material}\n`;
      });
    });

    texto += "\nASSUMIDO O POSTO COM AS ENCOMENDAS ABAIXO:\n";
    texto += "ENCOMENDAS | DESTINATÁRIO | CÓDIGO / NF\n";
    encomendas
      .filter((item) => item.situacao === "ASSUMIDO")
      .forEach((item) => {
        texto += `${item.tipo || "[ENCOMENDA]"} | ${
          item.destinatario || "[DESTINATÁRIO]"
        } | ${item.codigo || ""}\n`;
      });

    texto += "\nPERMANECE NO POSTO AS ENCOMENDAS ABAIXO:\n";
    texto += "ENCOMENDAS | DESTINATÁRIO | CÓDIGO / NF\n";
    encomendas
      .filter((item) => item.situacao === "PERMANECE")
      .forEach((item) => {
        texto += `${item.tipo || "[ENCOMENDA]"} | ${
          item.destinatario || "[DESTINATÁRIO]"
        } | ${item.codigo || ""}\n`;
      });

    texto += "\nCONTROLE DE ACESSO\n";
    movimentacoes.forEach((item) => {
      texto += `${gerarFraseMovimentacao(item)}\n`;
    });

    texto += "\nOBSERVAÇÕES\n";
    texto += observacoes || "Sem observações.";

    texto += "\n\n";
    texto += `Eu, ${funcionarioEntregaFim || "[FUNCIONÁRIO]"}, passo o posto para o Sr. ${
      funcionarioRecebeFim || "[FUNCIONÁRIO]"
    } às ${horarioFim || "00:00"}.\n`;

    texto += "Grupo SEPA Segurança. MEGH/SP.";

    return texto;
  }

  function blocoImagensMovimentacao(item: Movimentacao) {
    if (!item.imagemEntrada && !item.imagemSaida) return null;

    return (
      <div className="imagens-movimentacao">
        {item.imagemEntrada ? (
          <div className="imagem-movimentacao">
            <img src={item.imagemEntrada} alt="Imagem da entrada" />
          </div>
        ) : (
          <div className="imagem-vazia" />
        )}

        {item.imagemSaida ? (
          <div className="imagem-movimentacao">
            <img src={item.imagemSaida} alt="Imagem da saída" />
          </div>
        ) : (
          <div className="imagem-vazia" />
        )}
      </div>
    );
  }

  if (tela === "MENU") {
    return (
      <div className="app">
        <h1>Relatório de Plantão</h1>
        <p>GRUPO SEPA - Segurança Patrimonial</p>

        <hr />

        <h2>Menu Principal</h2>

        <button onClick={iniciarRelatorio}>
          Novo Relatório
        </button>

        <br />
        <br />

        <button onClick={() => setTela("PADROES")}>
          Materiais Padrão
        </button>
      </div>
    );
  }

  if (tela === "PADROES") {
    return (
      <div className="app">
        <h1>Materiais Padrão</h1>

        <p>
          Cadastre aqui os materiais que aparecerão automaticamente
          nos novos relatórios.
        </p>

        <hr />

        <label>Categoria:</label>
        <br />

        <select
          value={categoriaSelecionada}
          onChange={(e) =>
            setCategoriaSelecionada(Number(e.target.value))
          }
        >
          {categorias.map((categoria, index) => (
            <option key={index} value={index}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <br />
        <br />

        <input
          type="text"
          value={novoMaterial}
          onChange={(e) => setNovoMaterial(e.target.value)}
          placeholder="Digite um novo material"
        />

        <button onClick={adicionarMaterialPadrao}>
          Adicionar material
        </button>

        <hr />

        {categorias.map((categoria, categoriaIndex) => (
          <section key={categoriaIndex}>
            <h2>{categoria.nome}</h2>

            {categoria.materiais.map((material, materialIndex) => (
              <div key={materialIndex} className="item">
                <hr />

                {editandoPadrao &&
                editandoPadrao.categoria === categoriaIndex &&
                editandoPadrao.material === materialIndex ? (
                  <div>
                    <input
                      type="text"
                      value={nomePadraoEditado}
                      onChange={(e) =>
                        setNomePadraoEditado(e.target.value)
                      }
                    />

                    <button onClick={salvarEdicaoPadrao}>
                      Salvar
                    </button>

                    <button onClick={cancelarEdicaoPadrao}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <strong>{material}</strong>
                    <br />

                    <button
                      onClick={() =>
                        iniciarEdicaoPadrao(
                          categoriaIndex,
                          materialIndex
                        )
                      }
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        excluirMaterialPadrao(
                          categoriaIndex,
                          materialIndex
                        )
                      }
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            ))}
          </section>
        ))}

        <br />

        <button onClick={() => setTela("MENU")}>
          Voltar ao Menu
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Relatório de Plantão</h1>
      <p>GRUPO SEPA - Segurança Patrimonial</p>

      {etapa === 1 && (
        <section>
          <h2>Início do Plantão — Quem está assumindo</h2>

          <p>Preencha aqui somente as informações de quem está chegando e de quem está entregando o posto neste início. Essas pessoas não precisam ser as mesmas da passagem final.</p>

          <label>Data</label>
          <br />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <br />
          <br />

          <label>Horário que assumi o posto</label>
          <br />
          <input
            type="time"
            value={horarioInicio}
            onChange={(e) => setHorarioInicio(e.target.value)}
          />

          <br />
          <br />

          <label>Eu, que estou assumindo o posto</label>
          <br />
          <input
            type="text"
            value={funcionarioRecebeInicio}
            onChange={(e) => setFuncionarioRecebeInicio(e.target.value)}
            placeholder="Nome de quem está chegando"
          />

          <br />
          <br />

          <label>Quem está me entregando o posto</label>
          <br />
          <input
            type="text"
            value={funcionarioEntregaInicio}
            onChange={(e) => setFuncionarioEntregaInicio(e.target.value)}
            placeholder="Nome de quem está saindo"
          />

          <br />
          <br />

          <button onClick={() => setTela("MENU")}>Voltar ao Menu</button>
          {" "}
          <button onClick={continuar}>Continuar</button>
        </section>
      )}

      {etapa === 2 && (
        <section>
          <h2>Materiais</h2>

          <p>
            Estes materiais foram carregados dos padrões e podem ser
            alterados neste relatório.
          </p>

          {materiaisRelatorio.map((categoria, categoriaIndex) => (
            <section key={categoriaIndex}>
              <h2>{categoria.nome}</h2>

              <input
                type="text"
                placeholder={`Adicionar em ${categoria.nome}`}
                value={
                  categoriaIndex === categoriaSelecionada
                    ? novoMaterial
                    : ""
                }
                onChange={(e) => {
                  setCategoriaSelecionada(categoriaIndex);
                  setNovoMaterial(e.target.value);
                }}
              />

              <button
                onClick={() =>
                  adicionarMaterialRelatorio(categoriaIndex)
                }
              >
                Adicionar
              </button>

              {categoria.materiais.map((material, materialIndex) => (
                <div key={materialIndex} className="item">
                  <hr />

                  {editandoRelatorio &&
                  editandoRelatorio.categoria === categoriaIndex &&
                  editandoRelatorio.material === materialIndex ? (
                    <div>
                      <input
                        type="text"
                        value={nomeRelatorioEditado}
                        onChange={(e) =>
                          setNomeRelatorioEditado(e.target.value)
                        }
                      />

                      <button onClick={salvarEdicaoRelatorio}>
                        Salvar
                      </button>

                      <button onClick={cancelarEdicaoRelatorio}>
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <strong>{material}</strong>
                      <br />

                      <button
                        onClick={() =>
                          iniciarEdicaoRelatorio(
                            categoriaIndex,
                            materialIndex
                          )
                        }
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          excluirMaterialRelatorio(
                            categoriaIndex,
                            materialIndex
                          )
                        }
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </section>
          ))}

          <br />

          <button onClick={voltarEtapa}>Voltar</button>
          {" "}
          <button onClick={continuar}>Continuar</button>
        </section>
      )}

      {etapa === 3 && (
        <section>
          <h2>Encomendas</h2>

          <label>Onde a encomenda está sendo registrada?</label>
          <br />

          <select
            value={situacaoEncomenda}
            onChange={(e) =>
              setSituacaoEncomenda(
                e.target.value as "ASSUMIDO" | "PERMANECE"
              )
            }
          >
            <option value="ASSUMIDO">
              Assumido o posto com esta encomenda
            </option>
            <option value="PERMANECE">
              Permanece no posto esta encomenda
            </option>
          </select>

          <br />
          <br />

          <label>Encomenda</label>
          <br />
          <input
            type="text"
            value={tipoEncomenda}
            onChange={(e) => setTipoEncomenda(e.target.value)}
            placeholder="Ex.: 01 PACOTE, 01 CAIXA, 01 ENVELOPE"
          />

          <br />
          <br />

          <label>Destinatário</label>
          <br />
          <input
            type="text"
            value={destinatarioEncomenda}
            onChange={(e) =>
              setDestinatarioEncomenda(e.target.value)
            }
            placeholder="Nome do destinatário"
          />

          <br />
          <br />

          <label>Código / NF</label>
          <br />
          <input
            type="text"
            value={codigoEncomenda}
            onChange={(e) => setCodigoEncomenda(e.target.value)}
            placeholder="Código ou NF, quando houver"
          />

          <br />
          <br />

          <button onClick={salvarEncomenda}>
            {editandoEncomenda !== null
              ? "Salvar alteração"
              : "Adicionar encomenda"}
          </button>

          {editandoEncomenda !== null && (
            <button onClick={limparCamposEncomenda}>
              Cancelar edição
            </button>
          )}

          <hr />

          <h3>Assumido o posto com as encomendas abaixo:</h3>

          {encomendas.filter(
            (item) => item.situacao === "ASSUMIDO"
          ).length === 0 ? (
            <p>Nenhuma encomenda assumida.</p>
          ) : (
            encomendas
              .filter((item) => item.situacao === "ASSUMIDO")
              .map((item) => (
                <div key={item.id} className="encomenda-cadastrada">
                  <strong>{item.tipo || "Encomenda"}</strong>
                  <p>Destinatário: {item.destinatario}</p>
                  <p>Código / NF: {item.codigo}</p>

                  <button onClick={() => editarEncomenda(item)}>
                    Editar
                  </button>

                  <button onClick={() => excluirEncomenda(item.id)}>
                    Excluir
                  </button>
                </div>
              ))
          )}

          <hr />

          <h3>Permanece no posto as encomendas abaixo:</h3>

          {encomendas.filter(
            (item) => item.situacao === "PERMANECE"
          ).length === 0 ? (
            <p>Nenhuma encomenda permanece no posto.</p>
          ) : (
            encomendas
              .filter((item) => item.situacao === "PERMANECE")
              .map((item) => (
                <div key={item.id} className="encomenda-cadastrada">
                  <strong>{item.tipo || "Encomenda"}</strong>
                  <p>Destinatário: {item.destinatario}</p>
                  <p>Código / NF: {item.codigo}</p>

                  <button onClick={() => editarEncomenda(item)}>
                    Editar
                  </button>

                  <button onClick={() => excluirEncomenda(item.id)}>
                    Excluir
                  </button>
                </div>
              ))
          )}

          <br />

          <button onClick={voltarEtapa}>Voltar</button>
          {" "}
          <button onClick={continuar}>Continuar</button>
        </section>
      )}

      {etapa === 4 && (
        <section>
          <h2>Central de Movimentações</h2>

          <label>Tipo de movimentação</label>
          <br />

          <select
            value={tipoMovimentacaoSelecionado}
            onChange={(e) =>
              mudarTipoMovimentacao(
                e.target.value as TipoMovimentacao
              )
            }
          >
            <option value="FORNECEDOR">Fornecedor</option>
            <option value="COLETA">Coleta</option>
            <option value="PRESTADOR">Prestador de serviço</option>
            <option value="FUNCIONARIO">Funcionário</option>
            <option value="VISITANTE">Visitante</option>
            <option value="VEICULO">Veículo / Caminhão MEGA</option>
            <option value="OUTRO">Outro</option>
          </select>

          <hr />

          {/* FORNECEDOR */}
          {tipoMovimentacaoSelecionado === "FORNECEDOR" && (
            <div className="form-movimentacao">
              <h3>Fornecedor</h3>

              <label>Horário de entrada</label>
              <br />
              <input
                type="time"
                value={horarioEntrada}
                onChange={(e) => setHorarioEntrada(e.target.value)}
              />

              <br />
              <br />

              <label>Fornecedor</label>
              <br />
              <input
                type="text"
                value={empresaMovimentacao}
                onChange={(e) =>
                  setEmpresaMovimentacao(e.target.value)
                }
                placeholder="Nome do fornecedor"
              />

              <br />
              <br />

              <label>Motorista</label>
              <br />
              <input
                type="text"
                value={motoristaMovimentacao}
                onChange={(e) =>
                  setMotoristaMovimentacao(e.target.value)
                }
                placeholder="Nome do motorista"
              />

              <br />
              <br />

              <label>Placa</label>
              <br />
              <input
                type="text"
                value={placaMovimentacao}
                onChange={(e) =>
                  setPlacaMovimentacao(e.target.value)
                }
                placeholder="ABC-1234"
              />

              <br />
              <br />

              <label>Horário de saída</label>
              <br />
              <input
                type="time"
                value={horarioSaida}
                onChange={(e) => setHorarioSaida(e.target.value)}
              />
            </div>
          )}

          {/* COLETA */}
          {tipoMovimentacaoSelecionado === "COLETA" && (
            <div className="form-movimentacao">
              <h3>Coleta</h3>

              <label>Horário de entrada</label>
              <br />
              <input
                type="time"
                value={horarioEntrada}
                onChange={(e) => setHorarioEntrada(e.target.value)}
              />

              <br />
              <br />

              <label>Coleta</label>
              <br />
              <input
                type="text"
                value={empresaMovimentacao}
                onChange={(e) =>
                  setEmpresaMovimentacao(e.target.value)
                }
                placeholder="Nome da coleta"
              />

              <br />
              <br />

              <label>Motorista</label>
              <br />
              <input
                type="text"
                value={motoristaMovimentacao}
                onChange={(e) =>
                  setMotoristaMovimentacao(e.target.value)
                }
                placeholder="Nome do motorista"
              />

              <br />
              <br />

              <label>Placa</label>
              <br />
              <input
                type="text"
                value={placaMovimentacao}
                onChange={(e) =>
                  setPlacaMovimentacao(e.target.value)
                }
                placeholder="ABC-1234"
              />

              <br />
              <br />

              <label>Horário de saída</label>
              <br />
              <input
                type="time"
                value={horarioSaida}
                onChange={(e) => setHorarioSaida(e.target.value)}
              />
            </div>
          )}

          {/* PRESTADOR */}
          {tipoMovimentacaoSelecionado === "PRESTADOR" && (
            <div className="form-movimentacao">
              <h3>Prestador de serviço</h3>

              <label>Horário de entrada</label>
              <br />
              <input
                type="time"
                value={horarioEntrada}
                onChange={(e) => setHorarioEntrada(e.target.value)}
              />

              <br />
              <br />

              <label>Nome do prestador</label>
              <br />
              <input
                type="text"
                value={nomeMovimentacao}
                onChange={(e) =>
                  setNomeMovimentacao(e.target.value)
                }
                placeholder="Nome do prestador"
              />

              <br />
              <br />

              <label>Empresa</label>
              <br />
              <input
                type="text"
                value={empresaMovimentacao}
                onChange={(e) =>
                  setEmpresaMovimentacao(e.target.value)
                }
                placeholder="Empresa"
              />

              <br />
              <br />

              <label>Horário de saída</label>
              <br />
              <input
                type="time"
                value={horarioSaida}
                onChange={(e) => setHorarioSaida(e.target.value)}
              />
            </div>
          )}

          {/* FUNCIONÁRIO */}
          {tipoMovimentacaoSelecionado === "FUNCIONARIO" && (
            <div className="form-movimentacao">
              <h3>Funcionário</h3>

              <label>Horário</label>
              <br />
              <input
                type="time"
                value={horarioEntrada}
                onChange={(e) => setHorarioEntrada(e.target.value)}
              />

              <br />
              <br />

              <label>Nome do funcionário</label>
              <br />
              <input
                type="text"
                value={nomeMovimentacao}
                onChange={(e) =>
                  setNomeMovimentacao(e.target.value)
                }
                placeholder="Nome"
              />

              <br />
              <br />

              <label>Função</label>
              <br />
              <input
                type="text"
                value={funcaoMovimentacao}
                onChange={(e) =>
                  setFuncaoMovimentacao(e.target.value)
                }
                placeholder="Ex.: Líder do posto"
              />
            </div>
          )}

          {/* VISITANTE */}
          {tipoMovimentacaoSelecionado === "VISITANTE" && (
            <div className="form-movimentacao">
              <h3>Visitante</h3>

              <label>Horário de entrada</label>
              <br />
              <input
                type="time"
                value={horarioEntrada}
                onChange={(e) => setHorarioEntrada(e.target.value)}
              />

              <br />
              <br />

              <label>Nome do visitante</label>
              <br />
              <input
                type="text"
                value={nomeMovimentacao}
                onChange={(e) =>
                  setNomeMovimentacao(e.target.value)
                }
                placeholder="Nome do visitante"
              />

              <br />
              <br />

              <label>Horário de saída</label>
              <br />
              <input
                type="time"
                value={horarioSaida}
                onChange={(e) => setHorarioSaida(e.target.value)}
              />
            </div>
          )}

          {/* VEÍCULO / MEGA */}
          {tipoMovimentacaoSelecionado === "VEICULO" && (
            <div className="form-movimentacao">
              <h3>Veículo / Caminhão MEGA</h3>

              <label>Ordem dos acontecimentos</label>
              <br />

              <select
                value={ordemMega}
                onChange={(e) =>
                  setOrdemMega(
                    e.target.value as
                      | "ENTRADA_SAIDA"
                      | "SAIDA_ENTRADA"
                  )
                }
              >
                <option value="ENTRADA_SAIDA">
                  Entrada → Saída
                </option>
                <option value="SAIDA_ENTRADA">
                  Saída → Entrada
                </option>
              </select>

              <br />
              <br />

              <label>Horário de entrada</label>
              <br />
              <input
                type="time"
                value={horarioEntrada}
                onChange={(e) => setHorarioEntrada(e.target.value)}
              />

              <br />
              <br />

              <label>Horário de saída</label>
              <br />
              <input
                type="time"
                value={horarioSaida}
                onChange={(e) => setHorarioSaida(e.target.value)}
              />

              <br />
              <br />

              <label>Pessoa / motorista</label>
              <br />
              <input
                type="text"
                value={nomeMovimentacao}
                onChange={(e) =>
                  setNomeMovimentacao(e.target.value)
                }
                placeholder="Nome"
              />

              <br />
              <br />

              <label>Veículo</label>
              <br />
              <input
                type="text"
                value={veiculoMovimentacao}
                onChange={(e) =>
                  setVeiculoMovimentacao(e.target.value)
                }
                placeholder="Ex.: Caminhão MEGA"
              />
            </div>
          )}

          {/* OUTRO */}
          {tipoMovimentacaoSelecionado === "OUTRO" && (
            <div className="form-movimentacao">
              <h3>Outra movimentação</h3>

              <label>Horário</label>
              <br />
              <input
                type="time"
                value={horarioEntrada}
                onChange={(e) => setHorarioEntrada(e.target.value)}
              />

              <br />
              <br />

              <label>Descrição</label>
              <br />
              <input
                type="text"
                value={nomeMovimentacao}
                onChange={(e) =>
                  setNomeMovimentacao(e.target.value)
                }
                placeholder="Descrição da movimentação"
              />

              <br />
              <br />

              <label>Observação</label>
              <br />
              <textarea
                value={observacaoMovimentacao}
                onChange={(e) =>
                  setObservacaoMovimentacao(e.target.value)
                }
                placeholder="Observação"
              />
            </div>
          )}

          {/* IMAGENS */}
          {tipoMovimentacaoSelecionado !== "FUNCIONARIO" &&
            tipoMovimentacaoSelecionado !== "OUTRO" && (
              <div className="area-imagens-form">
                <hr />

                <h3>Imagens da movimentação</h3>

                <div className="imagens-form-grid">
                  <div>
                    <label>Imagem da entrada</label>
                    <br />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        lerImagem(e.target.files?.[0], "entrada")
                      }
                    />

                    {imagemEntrada && (
                      <div className="preview-form">
                        <img
                          src={imagemEntrada}
                          alt="Prévia da entrada"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label>Imagem da saída</label>
                    <br />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        lerImagem(e.target.files?.[0], "saida")
                      }
                    />

                    {imagemSaida && (
                      <div className="preview-form">
                        <img
                          src={imagemSaida}
                          alt="Prévia da saída"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          <br />

          <button onClick={salvarMovimentacao}>
            {editandoMovimentacao !== null
              ? "Salvar movimentação"
              : "Adicionar movimentação"}
          </button>

          {editandoMovimentacao !== null && (
            <button onClick={limparCamposMovimentacao}>
              Cancelar edição
            </button>
          )}

          <hr />

          <h3>Movimentações cadastradas</h3>

          {movimentacoes.length === 0 && (
            <p>Nenhuma movimentação cadastrada.</p>
          )}

          {movimentacoes.map((item) => (
            <div key={item.id} className="movimentacao-cadastrada">
              <strong>{nomeTipoMovimentacao(item.tipo)}</strong>

              <p>{gerarFraseMovimentacao(item)}</p>

              <button onClick={() => editarMovimentacao(item)}>
                Editar
              </button>

              <button
                onClick={() => excluirMovimentacao(item.id)}
              >
                Excluir
              </button>
            </div>
          ))}

          <br />

          <button onClick={voltarEtapa}>Voltar</button>
          {" "}
          <button onClick={continuar}>Continuar</button>
        </section>
      )}

      {etapa === 5 && (
        <section>
          <h2>Observações</h2>

          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Digite as observações do plantão"
            rows={8}
            style={{ width: "100%" }}
          />

          <br />
          <br />

          <button onClick={voltarEtapa}>Voltar</button>
          {" "}
          <button onClick={continuar}>Continuar</button>
        </section>
      )}

      {etapa === 6 && (
        <section>
          <h2>Resumo</h2>

          <h3>Início do plantão</h3>
          <p><strong>Data:</strong> {data || "Não informado"}</p>
          <p><strong>Horário:</strong> {horarioInicio || "Não informado"}</p>
          <p><strong>Quem assumiu:</strong> {funcionarioRecebeInicio || "Não informado"}</p>
          <p><strong>Quem entregou:</strong> {funcionarioEntregaInicio || "Não informado"}</p>

          <h3>Final do plantão</h3>
          <p><strong>Horário da passagem:</strong> {horarioFim || "Não informado"}</p>
          <p><strong>Quem está passando:</strong> {funcionarioEntregaFim || "Não informado"}</p>
          <p><strong>Quem está recebendo:</strong> {funcionarioRecebeFim || "Não informado"}</p>

          <p><strong>Materiais:</strong> {materiaisRelatorio.reduce((total, categoria) => total + categoria.materiais.length, 0)}</p>
          <p><strong>Encomendas:</strong> {encomendas.length}</p>
          <p><strong>Movimentações:</strong> {movimentacoes.length}</p>

          <br />

          <button onClick={voltarEtapa}>Voltar</button>
          {" "}
          <button onClick={continuar}>Continuar</button>
        </section>
      )}

      {etapa === 7 && (
        <section>
          <h2>Central de Edição do Relatório</h2>

          <p>
            Escolha qual parte do relatório deseja revisar.
          </p>

          <hr />

          <h3>Passagem final do posto</h3>
          <p>Essas informações são independentes das pessoas cadastradas no início do plantão.</p>

          <label>Horário da passagem final</label>
          <br />
          <input
            type="time"
            value={horarioFim}
            onChange={(e) => setHorarioFim(e.target.value)}
          />

          <br />
          <br />

          <label>Quem está passando o posto</label>
          <br />
          <input
            type="text"
            value={funcionarioEntregaFim}
            onChange={(e) => setFuncionarioEntregaFim(e.target.value)}
            placeholder="Nome de quem está saindo"
          />

          <br />
          <br />

          <label>Quem está recebendo o posto</label>
          <br />
          <input
            type="text"
            value={funcionarioRecebeFim}
            onChange={(e) => setFuncionarioRecebeFim(e.target.value)}
            placeholder="Nome de quem está entrando"
          />

          <button onClick={() => setEtapa(1)}>
            Editar Informações do Plantão
          </button>

          <br />
          <br />

          <button onClick={() => setEtapa(2)}>
            Editar Materiais
          </button>

          <br />
          <br />

          <button onClick={() => setEtapa(3)}>
            Editar Encomendas
          </button>

          <br />
          <br />

          <button onClick={() => setEtapa(4)}>
            Editar Movimentações
          </button>

          <br />
          <br />

          <button onClick={() => setEtapa(5)}>
            Editar Observações
          </button>

          <br />
          <br />

          <button onClick={() => setTela("MENU")}>
            Voltar ao Menu
          </button>

          <br />
          <br />

          <button onClick={() => setEtapa(8)}>
            Ver Relatório Final
          </button>
        </section>
      )}

      {etapa === 8 && (
        <section className="relatorio-final">
          <div className="cabecalho-relatorio">
            <h1>GRUPO SEPA</h1>
            <h3>SEGURANÇA PATRIMONIAL</h3>
            <h2>RELATÓRIO DE PLANTÃO</h2>
            <p>SEU PATRIMÔNIO EM BOAS MÃOS 24 HORAS</p>
          </div>

          <hr />

          <p>
            <strong>Av. Presidente Wilson, 4986 – Vila independência –
            São Paulo – SP</strong>
          </p>

          <p>
            Eu, <strong>{funcionarioRecebeInicio || "[FUNCIONÁRIO]"}</strong>,
            recebo a passagem de posto do Sr. {" "}
            <strong>{funcionarioEntregaInicio || "[FUNCIONÁRIO]"}</strong>{" "}
            às <strong>{horarioInicio || "00h00min"}</strong>.
          </p>

          <h3>MATERIAIS</h3>

          {materiaisRelatorio.map((categoria) => (
            <div key={categoria.nome} className="categoria-final">
              <h4>{categoria.nome}</h4>

              {categoria.materiais.map((material, index) => (
                <p key={index}>- {material}</p>
              ))}
            </div>
          ))}

          <h3>ASSUMIDO O POSTO COM AS ENCOMENDAS ABAIXO:</h3>

          <table>
            <thead>
              <tr>
                <th>ENCOMENDAS</th>
                <th>DESTINATÁRIO</th>
                <th>CÓDIGO / NF</th>
              </tr>
            </thead>

            <tbody>
              {encomendas
                .filter((item) => item.situacao === "ASSUMIDO")
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.tipo}</td>
                    <td>{item.destinatario}</td>
                    <td>{item.codigo}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <h3>PERMANECE NO POSTO AS ENCOMENDAS ABAIXO:</h3>

          <table>
            <thead>
              <tr>
                <th>ENCOMENDAS</th>
                <th>DESTINATÁRIO</th>
                <th>CÓDIGO / NF</th>
              </tr>
            </thead>

            <tbody>
              {encomendas
                .filter((item) => item.situacao === "PERMANECE")
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.tipo}</td>
                    <td>{item.destinatario}</td>
                    <td>{item.codigo}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* IMPORTANTE:
              As imagens ficam DENTRO do CONTROLE DE ACESSO.
              Não existe uma segunda seção de imagens.
              A frase completa permanece inteira em cima.
              As duas imagens ficam somente embaixo da frase.
          */}
          <h3>CONTROLE DE ACESSO</h3>

          {movimentacoes.length === 0 ? (
            <p>Nenhuma movimentação registrada.</p>
          ) : (
            movimentacoes.map((item) => (
              <div
                key={item.id}
                className="movimentacao-final"
              >
                <p className="frase-movimentacao">
                  {gerarFraseMovimentacao(item)}
                </p>

                {blocoImagensMovimentacao(item)}
              </div>
            ))
          )}

          <h3>OBSERVAÇÕES</h3>

          <p>
            {observacoes ||" "}
          </p>

          <br />

          <p>
            Eu, <strong>{funcionarioEntregaFim || "[FUNCIONÁRIO]"}</strong>,
            passo o posto para o Sr. {" "}
            <strong>{funcionarioRecebeFim || "[FUNCIONÁRIO]"}</strong>{" "}
            às <strong>{horarioFim || "00h00min"}</strong>, com as
            informações relatadas acima.
          </p>

          <p>
            <strong>Grupo SEPA Segurança. MEGH/SP.</strong>
          </p>

          <hr />

          <div className="botoes-final">
            <button onClick={() => setEtapa(7)}>
              Voltar para Edição
            </button>

            {" "}

            <button onClick={() => window.print()}>
              Imprimir / Salvar PDF
            </button>

            {" "}

            <button onClick={() => setTela("MENU")}>
              Finalizar e Voltar ao Menu
            </button>
          </div>
        </section>
      )}

    </div>
  );
}

export default App;
