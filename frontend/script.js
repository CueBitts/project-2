//add a restaurant modal
let addRestaurant = ''

const submitItem = document.getElementById('submitItem')

const submitRestaurant = document.getElementById('submitRestaurant')
let addMenu = []

const addARestaurant = document.getElementById('addARestaurant')
const addARestaurantModal = document.getElementById('addARestaurantModal')

//modal content
function editModal(restaurant) {
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

    addRestaurant = restaurant._id
}

//add item button
submitItem.addEventListener('click', () => {
    const itemName = document.getElementById('itemName').value
    const itemPrice = document.getElementById('itemPrice').value

    let item = {name: itemName, price: itemPrice}
    addMenu.push(item)
})

//add restaurant button
submitRestaurant.addEventListener('click', () => {
    const name = document.getElementById('name').value
    const img = document.getElementById('img').value
    const open = document.getElementById('open').value
    const close = document.getElementById('close').value
    const hrs = []
    hrs.push(open, close)
    const time = document.getElementById('time').value
    const menu = addMenu

    axios.post(`http://localhost:3000/restaurants/${addRestaurant}`, {
        name,
        img,
        hrs,
        time,
        menu
    }).then((resp) => {
        console.log(resp)
        addRestaurants(resp.data)
    })
})

//opens modal
addARestaurant.addEventListener('click', () => {
    addARestaurantModalOpen()
})

function addARestaurantModalOpen() {
    addARestaurantModal.style.display = 'block'
}

//closes modal
window.addEventListener('click', (event) => {
    if(event.target == addARestaurantModal) {
        addARestaurantModal.style.display = 'none'
    }
})



//cart modal
const cart = document.getElementById('cart')
const cartModal = document.getElementById('cartModal')

const checkout = document.getElementById('checkout')
const clear = document.getElementById('clear')

const itemList = document.getElementById('itemList')
const totalList = document.getElementById('totalList')

//opens modal
cart.addEventListener('click', () => {
    cartModalOpen()
})

function cartModalOpen() {
    itemList.innerText = ''
    totalList.innerText = ''

    cartModal.style.display = 'block'
    
    items.forEach(item => {
        const name = document.createElement('li')
        name.innerText = item.name
        name.classList.add('name')

        const price = document.createElement('li')
        price.innerText = item.price
        name.classList.add('price')

        itemList.appendChild(name)
        itemList.appendChild(price)
    })
    const totalHelper = document.createElement('total')
    totalHelper.innerText = `Total: $${total}`
    totalList.appendChild(totalHelper)
}

//closes modal
window.addEventListener('click', (event) => {
    if(event.target == cartModal) {
        cartModal.style.display = 'none'
    }
})

//checkout/clear
clear.addEventListener('click', () => {
    clearCart()
})
checkout.addEventListener('click', () => {
    clearCart()
})

function clearCart() {
    items = []
    itemList.innerText = ''
    totalList.innerText = ''
}



//menu modal
let items = []
let total = 0

const menuModal = document.getElementById('menuModal')
const menuList = document.getElementById('menu')

//adds item
function addItem(item) {
    items.push(item)
    total += item.price
    console.log(items)
}

//opens modal
function menuModalOpen(restaurantData) {
    menuModal.style.display = 'block'
    menuList.innerHTML = ''
    restaurantData.menu.forEach(item => {
        const name = document.createElement('li')
        name.innerText = item.name
        name.classList.add('name')

        name.addEventListener('click', () => {
            addItem(item)
        })

        const price = document.createElement('li')
        price.innerText = item.price
        price.classList.add('price')

        menuList.appendChild(name)
        menuList.appendChild(price)
    })
}

//closes modal
window.addEventListener('click', (event) => {
    if(event.target == menuModal) {
        menuModal.style.display = 'none'
    }
})



// add restaurants
const restaurants = document.querySelector('.restaurants')
const today = new Date()

// adds restaurants
function addRestaurants (restaurantData) {
    restaurants.innerHTML = ''

    restaurantData.forEach(restaurant => {
        const name = document.createElement('li')
        name.innerText = restaurant.name
        name.classList.add('name')

        const hrs = document.createElement('li')
        if(today.getHours() > restaurant.hrs[0] && today.getHours() < restaurant.hrs[1]) {
            hrs.innerText = 'Open Now'
        }
        else {
            hrs.innerText = `Closed. Opens at ${restaurant.hrs[0]}:00.`
        }
        hrs.classList.add('hrs')

        const time = document.createElement('li')
        time.innerText = `Usually responds in about ${restaurant.time} minutes.`
        time.classList.add('time')
        
        const img = document.createElement('img')
        img.setAttribute('src', restaurant.img)
        img.classList.add('img')

        const restaurantHelper = document.createElement('ul')
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