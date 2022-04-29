const submitItem = document.getElementById('submitItem')
const submitRestaurant = document.getElementById('submitRestaurant')
const menuModal = document.getElementById('menuModal')
const menuList = document.getElementById('menu')
const items = []
const restaurants = document.querySelector('.restaurants')
const today = new Date()

let currentlyEditing = ''

function editModal(restaurant) {
    $('#modal-edit').modal('open')
    const nameEdit = document.getElementById('name')
    const imgEdit = document.getElementById('img')
    const openEdit = document.getElementById('open')
    const closeEdit = document.getElementById('close')
    const timeEdit = document.getElementById('time')
    const itemEdit = document.getElementById('item-edit')

    nameEdit.value = restaurant.name
    imgEdit.value = restaurant.img
    openEdit.value = restaurant.open
    closeEdit.value = restaurant.close
    timeEdit.value = restaurant.time
    itemEdit.value = restaurant.item

    currentlyEditing = restaurant._id
}

const addARestaurant = document.getElementById('addARestaurant')
addARestaurant.addEventListener('click', () => {
    addARestaurantModalOpen()
})

window.addEventListener('click', (event) => {
    if(event.target == addARestaurantModal) {
        addARestaurantModal.style.display = 'none'
    }
})

const addARestaurantModal = document.getElementById('addARestaurantModal')
function addARestaurantModalOpen() {
    addARestaurantModal.style.display = 'block'
}

submitRestaurant.addEventListener('click', () => {
    const name = document.getElementById('name').value
    const img = document.getElementById('img').value
    const open = document.getElementById('open').value
    const close = document.getElementById('close').value
    const hrs = []
    hrs.push(open, close)
    const time = document.getElementById('time').value
    const item = document.getElementById('item').value

    axios.post(`http://localhost:3000/restaurants/${currentlyEditing}`, {
        name,
        img,
        hrs,
        time,
        item
    }).then((resp) => {
        console.log(resp)
        addRestaurants(resp.data)
        $('#modal-edit').modal('close')
    })
})

const cart = document.getElementById('cart')
cart.addEventListener('click', () => {
    cartModalOpen()
})

window.addEventListener('click', (event) => {
    if(event.target == cartModal) {
        cartModal.style.display = 'none'
    }
})

const cartModal = document.getElementById('cartModal')
function cartModalOpen() {
    const itemList = document.getElementById('itemList')
    const totalList = document.getElementById('totalList')
    
    itemList.innerText = ''
    totalList.innerText = ''

    cartModal.style.display = 'block'
    
    items.forEach(item => {
        const name = document.createElement('name')
        name.innerText = item.name
        name.classList.add('name')

        const price = document.createElement('price')
        price.innerText = item.price
        name.classList.add('price')

        itemList.appendChild(name)
        itemList.appendChild(price)
    })
    const totalHelper = document.createElement('total')
    totalHelper.innerText = `Total: $${total}`
    totalList.appendChild(totalHelper)
}

window.addEventListener('click', (event) => {
    if(event.target == menuModal) {
        menuModal.style.display = 'none'
    }
})

function menuModalOpen(restaurantData) {
    menuModal.style.display = 'block'
    menuList.innerHTML = ''
    restaurantData.menu.forEach(item => {
        const name = document.createElement('name')
        name.innerText = item.name
        name.classList.add('name')

        name.addEventListener('click', () => {
            addItem(item)
        })

        const price = document.createElement('price')
        price.innerText = item.price
        name.classList.add('price')

        menuList.appendChild(name)
        menuList.appendChild(price)
    })
}

let total = 0

function addItem(item) {
    items.push(item)
    total += item.price
    console.log(items)
}

function addRestaurants (restaurantData) {
    restaurants.innerHTML = ''
    restaurantData.forEach(restaurant => {
        const name = document.createElement('name')
        name.innerText = restaurant.name
        name.classList.add('name')

        const hrs = document.createElement('hrs')
        if(today.getHours() > restaurant.hrs[0] && today.getHours() < restaurant.hrs[1]) {
            hrs.innerText = 'Open Now'
        }
        else {
            hrs.innerText = `Closed. Opens at ${restaurant.hrs[0]}:00.`
        }
        hrs.classList.add('hrs')

        const time = document.createElement('time')
        time.innerText = `Usually responds in about ${restaurant.time} minutes.`
        time.classList.add('time')
        
        const img = document.createElement('img')
        img.setAttribute('src', restaurant.img)
        img.classList.add('img')

        const restaurantHelper = document.createElement('restaurantHelper')
        restaurantHelper.addEventListener('click', () => {
            menuModalOpen(restaurant)
        })
        restaurants.appendChild(restaurantHelper)
        
        restaurantHelper.appendChild(name)
        restaurantHelper.appendChild(hrs)
        restaurantHelper.appendChild(time)
        restaurantHelper.appendChild(img)
    })
}

axios.get('http://localhost:3000/restaurants').then(response => {
    addRestaurants(response.data)
})

$('.modal').modal()