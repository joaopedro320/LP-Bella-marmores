/**
 * Bella | Recebimento de leads da Landing Page
 *
 * COMO INSTALAR
 * 1. Crie uma planilha nova no Google Sheets.
 * 2. Menu Extensões > Apps Script. Apague o conteúdo e cole este arquivo inteiro.
 * 3. Ajuste a constante ABA abaixo se quiser outro nome de aba.
 * 4. Salve e clique em Implantar > Nova implantação > tipo "App da Web".
 *    Executar como: Eu.
 *    Quem pode acessar: Qualquer pessoa.
 * 5. Copie a URL gerada (termina em /exec).
 * 6. No index.html, procure por: var ENDPOINT = "";
 *    e cole a URL entre as aspas.
 * 7. Envie um teste pelo formulário e confira se a linha apareceu na planilha.
 */

const ABA = 'Leads';
const EMAIL_AVISO = ''; // opcional: coloque um e-mail para receber aviso a cada lead

const COLUNAS = [
  'Data e hora', 'Nome', 'WhatsApp', 'E-mail', 'Perfil',
  'Ambiente', 'Material', 'Cidade ou bairro', 'Mensagem', 'Origem'
];

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);
    const aba = pegarAba_();

    aba.appendRow([
      new Date(),
      dados.nome || '',
      dados.telefone || '',
      dados.email || '',
      dados.perfil || '',
      dados.ambiente || '',
      dados.material || '',
      dados.cidade || '',
      dados.mensagem || '',
      dados.origem || ''
    ]);

    if (EMAIL_AVISO) {
      MailApp.sendEmail({
        to: EMAIL_AVISO,
        subject: 'Novo lead pelo site: ' + (dados.nome || 'sem nome'),
        body: [
          'Nome: ' + (dados.nome || ''),
          'WhatsApp: ' + (dados.telefone || ''),
          'E-mail: ' + (dados.email || ''),
          'Perfil: ' + (dados.perfil || ''),
          'Ambiente: ' + (dados.ambiente || ''),
          'Material: ' + (dados.material || ''),
          'Cidade: ' + (dados.cidade || ''),
          'Mensagem: ' + (dados.mensagem || ''),
          'Origem: ' + (dados.origem || '')
        ].join('\n')
      });
    }

    return resposta_({ ok: true });
  } catch (erro) {
    return resposta_({ ok: false, erro: String(erro) });
  }
}

function doGet() {
  return resposta_({ ok: true, status: 'online' });
}

function pegarAba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
  }
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.getRange(1, 1, 1, COLUNAS.length)
       .setFontWeight('bold')
       .setBackground('#1A1A1A')
       .setFontColor('#F5F0E8');
    aba.setFrozenRows(1);
    aba.setColumnWidth(1, 150);
    aba.setColumnWidth(2, 200);
    aba.setColumnWidth(9, 320);
  }
  return aba;
}

function resposta_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
