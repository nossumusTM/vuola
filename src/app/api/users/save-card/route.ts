// // /app/api/users/save-card/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@/app/libs/prismadb';
//  import getCurrentUser from  '@/app/actions/getCurrentUser';
// export const dynamic = 'force-dynamic';
// import CryptoJS from 'crypto-js';

// const SECRET_KEY = process.env.CARD_SECRET_KEY!; // set this in your .env

// export async function POST(req: Request) {
//   try {
//     const currentUser = await getCurrentUser();
//     if (!currentUser?.id) return new NextResponse('Unauthorized', { status: 401 });

//     const data = await req.json();

//     const encrypt = (text: string) => {
//       return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
//     };

//     const encryptedCard = {
//       number: encrypt(data.number),
//       expiration: encrypt(data.expiration),
//       cvv: encrypt(data.cvv),
//       name: encrypt(data.name),
//       address: encrypt(data.address),
//       apt: data.apt || '',
//       city: data.city || '',
//       state: data.state || '',
//       zip: data.zip || '',
//       country: typeof data.country === 'object' && data.country.label
//       ? data.country.label
//       : data.country || '',
//       userId: currentUser.id,
//     };

//     const savedCard = await prisma.card.create({ data: encryptedCard });
//     // console.log("Saved card", savedCard);

//     return NextResponse.json({ message: 'Card saved', cardId: savedCard.id });
//   } catch (err) {
//     console.error(err);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import CryptoJS from 'crypto-js';

export const dynamic = 'force-dynamic';
const SECRET_KEY = process.env.CARD_SECRET_KEY!;

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return new NextResponse('Unauthorized', { status: 401 });

    const data = await req.json();

    const encrypt = (text: string) => {
      return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    };

    const encryptedCard = {
      number: encrypt(data.number),
      name: encrypt(data.name),
      address: encrypt(data.address),
      apt: data.apt || '',
      city: data.city || '',
      state: data.state || '',
      zip: data.zip || '',
      country: typeof data.country === 'object' && data.country.label
        ? data.country.label
        : data.country || '',
      userId: currentUser.id,
    };

    const savedCard = await prisma.card.create({ data: encryptedCard });

    return NextResponse.json({ message: 'Card saved', cardId: savedCard.id });
  } catch (err) {
    console.error('[SAVE_CARD]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}