
import { useState } from "react";
import CabecalhoRelatorio from "./CabecalhoRelatorio";
import styles from "./relatorio.module.css";

function Relatorio() {
  const [listaDeMateriaisPortaria] = useState<string[]>([
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
  ]);

  const [listaControleJogos] = useState<string[]>([
    "11 Bolas de sinuca lisa",
    "15 Bolas de sinuca numeradas",
    "02 Raquetes de pingue pongue com uma bolinha",
    "10 Bolinhas do pebolim",
  ]);

  const [listaMateriaisMegh] = useState<string[]>([
    "Quadro de chaves OK",
    "02 Capas de chuva",
    "06 Capacetes",
  ]);

  return (
    <div className={styles.relatorio}>
      {/* Cabeçalho institucional */}
      <header className={styles.cabecalhoRelatorio}>
        <CabecalhoRelatorio />
      </header>

      <main>
        {/* Apresentação do relatório */}
        <section className={styles.apresentacao}>
          <p>
            Este documento consiste em relatar as ações e situações
            que ocorrem na Empresa Megh Ceras e Emulsões.
          </p>

          <h2>RELATÓRIO DE PLANTÃO</h2>

          <p>
            Av. Presidente Wilson, 4986 – Vila Independência –
            São Paulo – SP – 00 de [mês] de 2026.
          </p>

          <p>Bom dia,</p>

          <p>
            Eu, <strong>[QUEM RECEBE]</strong>, recebo a passagem de
            posto do Sr. <strong>[QUEM ENTREGA]</strong> com as
            informações relatadas às <strong>[HORÁRIO]</strong>.
          </p>

          <p>
            Assumo com os materiais discorridos abaixo, todos foram
            devidamente conferidos e estão em perfeitas condições de uso.
          </p>
        </section>

        {/* Materiais da portaria */}
        <section className={styles.listaDeMaterial}>
          <h2>Material Portaria:</h2>

          <ol>
            {listaDeMateriaisPortaria.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ol>
        </section>

        {/* Controle de jogos */}
        <section className={styles.listaDeMaterial}>
          <h2>Controle de jogos:</h2>

          <ol>
            {listaControleJogos.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ol>
        </section>

        {/* Materiais MEGH */}
        <section className={styles.listaDeMaterial}>
          <h2>Material MEGH:</h2>

          <ol>
            {listaMateriaisMegh.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ol>
        </section>

        {/* Encomendas */}
        <section className={styles.encomendas}>
          <div className={styles.containerDeEncomendas}>
            <h3>Assumido o posto com as encomendas abaixo:</h3>

            <table className={styles.tabelaEncomendasAssumidas}>
              <thead>
                <tr>
                  <th>ENCOMENDAS</th>
                  <th>DESTINATÁRIO</th>
                  <th>CÓDIGO / NF</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Pacote</td>
                  <td>Nome do destinatário</td>
                  <td>123456</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.containerDeEncomendas}>
            <h3>Permanece no posto as encomendas abaixo:</h3>

            <table className={styles.tabelaEncomendasPermanece}>
              <thead>
                <tr>
                  <th>ENCOMENDAS</th>
                  <th>DESTINATÁRIO</th>
                  <th>CÓDIGO / NF</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Pacote</td>
                  <td>Nome do destinatário</td>
                  <td>789012</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Controle de acesso */}
        <section className={styles.controleAcesso}>
          <h2>CONTROLE DE ACESSO</h2>

          <div className={styles.movimentacaoFinal}>
            <p className={styles.textoMovimentacao}>
              Às 00h00min chegou o fornecedor, motorista, placa.
              Saiu às 00h00min.
            </p>

            <div className={styles.imagensMovimentacao}>
              <img
                src="/assets/teste.bmp"
                alt="Imagem da entrada"
              />

              <img
                src="/imagens/saida.jpg"
                alt="Imagem da saída"
              />
            </div>
          </div>

        </section>

        {/* Encerramento */}
        <section className={styles.encerramentoRelatorio}>
          <p>
            Eu, <strong>[QUEM ENTREGA]</strong>, passo o posto
            para o Sr. <strong>[QUEM RECEBE]</strong> às
            <strong> [HORÁRIO FINAL]</strong>, com as informações
            relatadas acima.
          </p>

          <p>Grupo SEPA Segurança.</p>

          <p>MEGH/SP, [DATA FINAL].</p>
        </section>
      </main>

      <footer className={styles.rodapeRelatorio}>
        <span>☎ 4475-3546</span>
        <strong>www.sepa.com.br</strong>
        <span className={styles.numeroPagina}>
          Página <span className={styles.numeroPaginaAtual}></span>
        </span>
      </footer>
    </div>
  );
}

export default Relatorio;
