import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const { characterId, userId } = req.query
        const { data, error } = await supabase
          .from('conversations')
          .select('id, character_id, user_id, sender, message')
          .eq('character_id', characterId)
          .eq('user_id', userId)

        if (error) throw error

        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).send(error.message)
      }

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}
