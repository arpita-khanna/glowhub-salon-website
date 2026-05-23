const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle && navLinks){

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

 /* =========================================
   ADD TO CART SYSTEM
========================================= */

function addToCart(name, price){

    let cart = JSON.parse(localStorage.getItem("glowhubCart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("glowhubCart", JSON.stringify(cart));

    alert(name + " added to cart!");
}


/* =========================================
   DISPLAY CART ITEMS
========================================= */

function displayCart(){

    const cartItemsContainer = document.getElementById("cart-items");

    const totalPriceElement = document.getElementById("total-price");

    const emptyCart = document.getElementById("empty-cart");

    if(!cartItemsContainer) return;

    let cart = JSON.parse(localStorage.getItem("glowhubCart")) || [];

    cartItemsContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        emptyCart.style.display = "block";

        totalPriceElement.innerText = "$0";

        return;
    }

    emptyCart.style.display = "none";

    cart.forEach((item, index) => {

        total += item.price;

        cartItemsContainer.innerHTML += `

        <div class="cart-item">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Premium GlowHub Service</p>
            </div>

            <div class="cart-price">
                <h3>$${item.price}</h3>

                <button onclick="removeItem(${index})"
                class="remove-btn">
                Remove
                </button>
            </div>

        </div>

        `;
    });

    totalPriceElement.innerText = "$" + total;
}


/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("glowhubCart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("glowhubCart", JSON.stringify(cart));

    displayCart();
}


/* =========================================
   LOAD CART AUTOMATICALLY
========================================= */

displayCart();




function closePopup(){

    document.getElementById("booking-popup").style.display = "none";
}

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        alert("Your message has been sent successfully!");

        contactForm.reset();
    });
}

// ==============================
// SIGNUP SYSTEM
// ==============================

const signupForm = document.getElementById("signupForm");

if(signupForm){

    signupForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name =
            document.getElementById("signupName").value;

        const email =
            document.getElementById("signupEmail").value;

        const password =
            document.getElementById("signupPassword").value;

        // SAVE USER
        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(
            "glowhubUser",
            JSON.stringify(user)
        );

        alert("Account created successfully! Please login now.");

        window.location.href = "login.html";

    });

}

// ==============================
// LOGIN SYSTEM
// ==============================

const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        // CHECK ACCOUNT
        const savedUser = JSON.parse(localStorage.getItem("glowhubUser"));

        if(savedUser &&
           savedUser.email === email &&
           savedUser.password === password){

            // LOGIN SUCCESS
            localStorage.setItem("glowhubLoggedIn", "true");
            localStorage.setItem(
    "glowhubUserEmail",
    email
);

            alert("Login successful!");

            // CHECK REDIRECT PAGE
            const redirectPage =
                localStorage.getItem("redirectAfterLogin");

            if(redirectPage){

                localStorage.removeItem("redirectAfterLogin");

                window.location.href = redirectPage;

            }else{

                window.location.href = "index.html";
            }

        }else{

            alert("Invalid email or password!");
        }

    });

}

/* =========================================
   CHECKOUT SYSTEM
   ========================================= */
function checkout(){

    const loggedIn =
        localStorage.getItem("glowhubLoggedIn");

    if(loggedIn !== "true"){

        alert("Please login first to complete checkout.");

        localStorage.setItem(
            "redirectAfterLogin",
            "cart.html"
        );

        window.location.href = "login.html";

        return;
    }

    alert("Order completed successfully! Thank you for choosing GlowHub.");

    localStorage.removeItem("glowhubCart");

    window.location.href = "index.html";
}

    

function googleLogin(){

    localStorage.setItem("glowhubLoggedIn", "true");

    alert("Logged in successfully with Google!");

    const redirectPage =
    localStorage.getItem("redirectAfterLogin");

    if(redirectPage){

        localStorage.removeItem("redirectAfterLogin");

        window.location.href = redirectPage;

    }else{

        window.location.href = "index.html";
    }
}


/* =========================================
   APPLE LOGIN
========================================= */

function appleLogin(){

    localStorage.setItem("glowhubLoggedIn", "true");

    alert("Logged in successfully with Apple!");

    const redirectPage =
    localStorage.getItem("redirectAfterLogin");

    if(redirectPage){

        localStorage.removeItem("redirectAfterLogin");

        window.location.href = redirectPage;

    }else{

        window.location.href = "index.html";
    }
}



/* =========================================
   BOOKING SYSTEM
========================================= */

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

    bookingForm.addEventListener("submit", function(e){

        e.preventDefault();

        // CHECK LOGIN
        const loggedIn =
        localStorage.getItem("glowhubLoggedIn");

        // NOT LOGGED IN
        if(loggedIn !== "true"){

            alert("Please login first to complete your booking.");

            window.location.href = "login.html";

            return;
        }

        // SUCCESS
        alert("Appointment booked successfully! Thank you for choosing GlowHub.");

window.location.href = "index.html";

        
    });
}

/* =========================================
   OPEN BOOKING PAGE
========================================= */

function openBooking(){

    // CHECK LOGIN
    const loggedIn =
    localStorage.getItem("glowhubLoggedIn");

    // NOT LOGGED IN
    if(loggedIn !== "true"){

        alert("Please login first to book an appointment.");

        // SAVE REDIRECT PAGE
        localStorage.setItem(
            "redirectAfterLogin",
            "booking.html"
        );

        window.location.href = "login.html";

        return;
    }

    // OPEN BOOKING PAGE
    window.location.href = "booking.html";
}

// CHECK LOGIN STATUS

const profileSection =
document.getElementById("profileSection");

const userEmail =
document.getElementById("userEmail");

const loggedIn =
localStorage.getItem("glowhubLoggedIn");

const savedEmail =
localStorage.getItem("glowhubUserEmail");

if(profileSection && loggedIn === "true"){

    profileSection.style.display = "block";

    if(userEmail){
        userEmail.innerText = savedEmail;
    }

}

function logoutUser(){

    localStorage.removeItem("glowhubLoggedIn");

    localStorage.removeItem("glowhubUserEmail");

    alert("Logged out successfully!");

    window.location.href = "index.html";
}