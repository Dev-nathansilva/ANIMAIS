import { google } from "googleapis";

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, email, telefone, A, C, O, I } = body;

    if (!nome || !email) {
      return Response.json(
        { error: "Nome e email são obrigatórios." },
        { status: 400 }
      );
    }

    // Carregar credenciais do base64
    const base64 = process.env.GOOGLE_CREDENTIALS_BASE64;
    const credentials = JSON.parse(
      Buffer.from(base64, "base64").toString("utf-8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const novaLinha = [
      formatarData(new Date()),
      nome,
      email,
      telefone,
      A || 0,
      C || 0,
      O || 0,
      I || 0,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SHEET_NAME}!A2`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [novaLinha],
      },
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Erro ao salvar no Google Sheets:", error);
    return Response.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
