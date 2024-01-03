'use server'
import { adminDb } from '@/firebaseAdmin';
import query from '@/lib/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {prompt, chatId, model, session } = req.body

  if(!prompt) {
    res.status(400).json({ answer: 'prompt is required' });
    return;
  }
  if(!chatId) {
    res.status(400).json({ answer: 'chatId is required' });
    return;
  }

  //GPT query

  const response = await query(prompt, chatId, model)

  const message: Message = {
    text: response || 'Sorry, I did not understand that.',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png',
    },
  }

  await adminDb.collection('users')
  .doc(session?.user?.email!)
  .collection('chats')
  .doc(chatId)
  .collection('messages')
  .add(message)
  res.status(200).json({ answer: message.text })
}