import { Index } from '../routes/index.js'
import { Home, Sign } from '../routes/Sign.js'
import { Pizza } from '../routes/Pizza.js'
import { Client } from '../routes/Client.js'
import { Livreur } from '../routes/Livreur.js'
import { Commande } from '../routes/Commande.js'
import { Statistiques } from '../routes/Statistiques.js'
import { Ingredients } from '../routes/Ingredient.js'
import { Promotion } from '../routes/Promotion.js'
import { Boisson } from '../routes/Boisson.js'
import { Dessert } from '../routes/Dessert.js'

export const dispatcher = (app, io) => {
  Index(app);
  Sign(app);
  Home(app);
  Pizza(app, io);
  Client(app);
  Livreur(app);
  Commande(app, io);
  Statistiques(app, io);
  Ingredients(app);
  Promotion(app);
  Boisson(app);
  Dessert(app);
  app.get('*', (req, res) => {
    res.render('404', {
      title: '404',
      message: 'Page not found !'
    })
  })
}