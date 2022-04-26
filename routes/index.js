export const Index = (app) => {
  app.get('/', (req, res) => {
    if(req.cookies.accesstoken) {
      res.redirect('/admin/users')
    } else {
      res.redirect('/login')
    }
  })
}