import { putItemHandler } from '../src/handlers/update-formula.mjs';

async function insertItems(quantity, idx) {
  console.log('Starting')

  if(idx === Number(quantity)) {
    console.log('Finish')
    return 
  }

  const id = `${idx} + 1`

  const body = {
    id,
    zfab: "4710",
    originalUrl: `https://natura.com.br/qr/${id}`,
    redirectUrl: "",
    enabled: true,
    formulas: [
      {
        "locale": "pt-br",
        "ingredients": ["Agua", "Alcool"]
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  const event = {
    httpMethod: 'POST', 
    body: JSON.stringify(body) 
  }

  try {
    const res = await putItemHandler(event)
    if(res.error) return
    await insertItems(quantity, idx + 1)
  } catch(err) {
    console.log('ERROR:', err)
  }
}

insertItems(process.argv[2], 0)