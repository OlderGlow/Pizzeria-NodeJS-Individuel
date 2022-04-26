const socket = io();
const leadingZero = (num) => `0${num}`.slice(-2);
const formatTime = (date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(leadingZero)
    .join(':');
socket.on('newOrder', async (res) => {
  const response = await fetch('/api/commandes?id=' + res.data)
  const data = await response.json()
  const div = document.createElement('div')
  div.classList.add('alert', 'alert-primary', 'mt-3')
  const a = document.createElement('a')
  a.href = `/admin/commandes/edit?id=${data.id}`
  a.classList.add('alert-link')
  a.innerText = 'Voir la commande'
  div.innerHTML = `${res.message} à ${formatTime(new Date())} - Client : ${data.user.firstname} ${data.user.lastname}`
  div.appendChild(a)
  await document.querySelector('#newOrder').appendChild(div)
})
socket.on('newPizza', (res) => {
  const div = document.createElement('div')
  div.classList.add('alert', 'alert-warning', 'mt-3')
  div.innerHTML = `${res.message} à ${formatTime(new Date())} - Pizza : ${res.data}`
  document.querySelector('#newOrder').appendChild(div)
})
socket.on('commande-status-changed', (res) => {
  const div = document.createElement('div')
  const a = document.createElement('a')
  const p = document.createElement('p')
  a.href = res.link
  a.classList.add('btn', 'btn-primary')
  a.innerText = 'Voir la commande'
  div.classList.add('alert', 'alert-warning', 'mt-3')
  div.innerHTML = `${res.message} à ${formatTime(new Date())}`
  p.appendChild(a)
  div.appendChild(p)
  document.querySelector('#newOrder').appendChild(div)
})
document.querySelectorAll('#deleteBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/users/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/users'
      })
  })
})
document.querySelectorAll('#ingredientsDeleteBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/ingredients/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/ingredients'
      })
  })
})
document.querySelectorAll('#actionBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id

    fetch(`/admin/users/edit/status?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: e.target.dataset.status
      })
    })
      .then(() => {
        window.location.href = '/admin/users'
      })
  })
})
document.querySelectorAll('#deletePizza').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/pizzas/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/pizzas'
      })
  })
})
document.querySelectorAll('#clientBtnStatus').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id

    fetch(`/admin/clients/edit/status?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: e.target.dataset.status
      })
    })
      .then(() => {
        window.location.href = '/admin/clients'
      })
  })
})
document.querySelectorAll('#deleteClient').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/clients/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/clients'
      })
  })
})
document.querySelectorAll('#btnAddress').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    const street = document.querySelector(`#street${id}`)
    const zipCode = document.querySelector(`#zipCode${id}`)
    const city = document.querySelector(`#city${id}`)
    const form = document.querySelector(`#form${id}`)
    fetch(`/admin/clients/address?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        street: street.value,
        zipCode: zipCode.value,
        city: city.value
      })
    })
      .then(() => {
        const div = document.createElement('div')
        div.classList.add('alert', 'alert-success', 'mt-3')
        div.innerHTML = 'Adresse modifiée'
        form.appendChild(div)
      })
  })
})
document.querySelectorAll('#livreurDeleteBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/livreurs/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/livreurs'
      })
  })
})
document.querySelectorAll('#commandeDeleteBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/commandes/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/commandes'
      })
  })
})
document.querySelectorAll('#promotionsDeleteBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/promotions/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/promotions'
      })
  })
})
document.querySelectorAll('#boissonsDeleteBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/boissons/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/boissons'
      })
  })
})
document.querySelectorAll('#dessertsDeleteBtn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    fetch(`/admin/desserts/delete?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/admin/desserts'
      })
  })
})
const addAddressBtn = document.querySelector('#addAddress')
const divAddress = document.querySelector('#otherAddress')
const selectAddress = document.querySelector('#selectAddress')
const selectUser = document.querySelector('#selectUser')
addAddressBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const div = document.createElement('div')
  div.innerHTML = `
  <div class="border border-secondary p-3 mb-2">
                    <p>Autre adresse</p>
                    <!-- Rue input -->
                    <div class="form-outline mb-4">
                        <input type="text" name="street" class="form-control" placeholder="Numéro et rue"/>
                    </div>

                    <!-- Rue input -->
                    <div class="form-outline mb-4">
                        <input type="text" name="zipCode" class="form-control" placeholder="Code Postal"/>
                    </div>

                    <!-- Rue input -->
                    <div class="form-outline">
                        <input type="text" name="city" class="form-control" placeholder="Ville"/>
                    </div>
                </div>`
  divAddress.appendChild(div)
})
function getAddresses () {
  const id = selectUser.value
  selectAddress.innerHTML = ''
  if (id !== '0') {
    fetch('/admin/clients/address?id=' + id)
      .then(response => response.json())
      .then(data => {
        data.forEach(address => {
          const option = document.createElement('option')
          option.value = address.id
          option.innerText = address.street + ' ' + address.zipCode + ' ' + address.city
          const selectAddress = document.querySelector('#selectAddress')
          selectAddress.appendChild(option)
        })
      })
  } else {
    const option = document.createElement('option')
    option.value = null
    option.innerText = 'Choisissez un utilisateur'
    const selectAddress = document.querySelector('#selectAddress')
    selectAddress.appendChild(option)
  }

}
