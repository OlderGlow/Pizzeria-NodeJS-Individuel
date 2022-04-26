import { getAllStats } from '../services/statistiqueServices.js'

export const Statistiques = (app) => {
  app.get('/admin/statistiques', (req, res) => {
    getAllStats(req, res).then(() => console.log('Statistiques envoyées'))
  })
}