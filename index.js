// home page slide show 
if(window.location.pathname === '/Home.html'){
  var myIndex = 0;
  carousel();
  
  function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 5000); 
  }
}
// email pattern 
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Declear flags to check valid values 
let VFname ;let VLname ;let Vnum; let VEmail; let validInputs;
//function to validate the inputs 
function validateInputs(firstName,lastName,number,email){    
  //  validate user inputs 
    if(firstName.value.length >= 3){
      // Save form values to localStorage
      localStorage.setItem('FirstName', firstName.value);
      VFname = true;
    }else{
      //show error
      alert("Please the first name must be at least 3 characters");
      VFname= false;
    }
    if(lastName.value.length >= 3 ){
      localStorage.setItem('LastName', lastName.value);
      VLname = true;
    }else{
      alert("Please the Last name must be at least 3 characters");
      VLname = false;
    }
    if(number.value.length == 8){
      localStorage.setItem('Number', number.value);
      Vnum =true;
    }else{
      alert("Please the phone number must be exactly 8 digits");
      Vnum = false;
    }
    if(emailPattern.test(email.value)){
      localStorage.setItem('Email', email.value);
      VEmail = true;
    }else{
      alert("Please enter a valid email");
      VEmail = false;
    }
    if(VFname && VLname && Vnum && VEmail){
      validInputs = true;
    }else{
      validInputs = false;
    }
  }
// Home page (form)
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/Home.html') {
    // Define elements
    const firstName = document.getElementById('FirstName');
    const lastName = document.getElementById('LastName');
    const number = document.getElementById('Number');
    const email = document.getElementById('Email');
    let register = document.getElementById('Register');
    // Register form submission
    register.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
      validateInputs(firstName,lastName,number,email);
     if(validInputs){
      KeepUserAlive()
      alert("Welcome " + firstName.value + "\nyou are Registered");
     }
    });
   
    // Keep User information appear till logs out
    function KeepUserAlive(){
      let storedFN = localStorage.getItem('FirstName');
      let storedLN = localStorage.getItem('LastName');
      let storedN = localStorage.getItem('Number');
      let storedEm = localStorage.getItem('Email');
      if(storedFN && storedLN && storedN && storedEm ){
        document.getElementById('H2F').style.display = "none";
        document.getElementById('loginformC').style.display = "none";
        document.getElementById('Reg').innerText = storedFN;
        document.getElementById('Rbutt').style.display = 'none';
        document.getElementById('Rlink').href = 'Account.html';
      }
    }
    KeepUserAlive();
  }

  // Account page

  if (window.location.pathname === '/Account.html') {
    let Fname = localStorage.getItem('FirstName');
    let Lname = localStorage.getItem('LastName');
    let num = localStorage.getItem('Number');
    let Email = localStorage.getItem('Email');

    let InFName = document.getElementById('firstname');
    let InLName = document.getElementById('lastname');
    let InPhone = document.getElementById('phone');
    let InEmail = document.getElementById('email');

    // If data exists in localStorage, update the placeholder values
    if (Fname && Lname && num && Email) {
      InFName.placeholder = Fname;
      InFName.value = Fname;
      InLName.placeholder = Lname;
      InLName.value = Lname;
      InPhone.placeholder = num;
      InPhone.value = num;
      InEmail.placeholder = Email;
      InEmail.value = Email;
    }

    // Update the user information when the submit button is clicked
    document.getElementById('submitbutton').addEventListener('click', function(){
      validateInputs(InFName,InLName,InPhone,InEmail);
      if(validInputs){
          Fname = InFName.value;
          Lname = InLName.value;
          num = InPhone.value;
          Email = InEmail.value;
        // Only update placeholders if new values are provided
        if (Fname) {
          InFName.placeholder = Fname;
          InFName.value = Fname;
          localStorage.setItem('FirstName', Fname);
        }
        if (Lname) {
          InLName.placeholder = Lname;
          InLName.value = Lname;

          localStorage.setItem('LastName', Lname);
        }
        if (num) {
          InPhone.placeholder = num;
          InPhone.value = num;
          localStorage.setItem('Number', num);
        }
        if (Email) {
          InEmail.placeholder = Email;
          InEmail.value = Email;
          localStorage.setItem('Email', Email);
        }
        localStorage.setItem('Refresh', 'true'); // this to refresh all the pages 
        alert("The information has been updated.");
      }else{
        location.reload();
      }
    });
    //  function to remove all the Elements in the main section in account page 
    function RemoveAllElement(){
      document.getElementById('centermain').style.display = 'none';
      document.getElementById('centermain2').style.display = 'none';
      document.getElementById('centermain3').style.display = 'none';
      document.getElementById('centermain4').style.display = 'none';
      document.getElementById('submitbutton').style.display = 'none';
    }
    // the main content
    document.getElementById('AccountInfo').addEventListener('click', function(){
      RemoveAllElement();
      document.getElementById('centermain').style.display ='block'; 
      document.getElementById('submitbutton').style.display = 'block';
    });
    // orders button functionality 
    document.getElementById('Orders').addEventListener('click',function(){
        RemoveAllElement();
        document.getElementById('centermain2').style.display ='block';
        let TruckNo = document.getElementsByClassName('AP-TruckNum');
        for(i=0;i<TruckNo.length;i++){
          TruckNo[i].innerText = "Trucking Number:"+GenerateRandomNumber(10000000,99999999);
        }
    });
    // address button  
    document.getElementById('Address').addEventListener('click',function(){
        RemoveAllElement();
        document.getElementById('centermain3').style.display ='block'; 
    });
    // card button 
    document.getElementById('Cards').addEventListener('click',function(){
      RemoveAllElement();
      document.getElementById('centermain4').style.display ='block';
      if(localStorage.getItem('FirstName') != null &&  localStorage.getItem('LastName') != null){
        document.getElementById('AP-CardNumber').innerText= "XXXX XXXX XXXX "+GenerateRandomNumber(1000,9999);
        document.getElementById('AP-Name').innerText = localStorage.getItem('FirstName')+ " "+ localStorage.getItem('LastName');
        document.getElementById('AP-Date').innerText = GenerateRandomNumber(1 , 31) + '/'+ GenerateRandomNumber(1,12)
      }
    });
    // function to generate a number 
    function GenerateRandomNumber(min , max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Log out functionality
    document.getElementById('logOut').addEventListener('click', function() {
      localStorage.clear(); // Clear all data from localStorage
      window.location.href = 'Home.html'; // Redirect to Home page
      localStorage.setItem('Refresh', 'true');
      alert("You have been logged out.");
    });

    // this function track which section of Account Page your in ( orders , address , account info )
    const buttons = document.querySelectorAll('.sidebutton');
    let selectedButton = null; //  Keeps track of the currently selected button
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove previous selection (if any)
        if (selectedButton) {
        selectedButton.style.backgroundColor = null; // Resets previous selection
        }
        // Update selected button and set new color
        selectedButton = button;
        button.style.backgroundColor = "#747576";
      });
    });
  }

});

//refresh all the tabs
window.addEventListener('storage', function(event) {
  if (event.key === 'Refresh' && event.newValue === 'true') {
    // If logout flag is detected, refresh the page
    location.reload();
  }
});
if (localStorage.getItem('Refresh') === 'true') {
  localStorage.removeItem('Refresh');
}

// product page 
// this take the Information of each product 
document.addEventListener('DOMContentLoaded',function(){
  if(window.location.pathname === '/Home.html'){
    let Pr1 = document.getElementById('Product1');
    let Pr2 = document.getElementById('Product2');
    let Pr3 = document.getElementById('Product3');
    let Pr4 = document.getElementById('Product4');
    let Pr5 = document.getElementById('Product5');
    let Pr6 = document.getElementById('Product6');
    let Pr7 = document.getElementById('Product7');
    let Pr8 = document.getElementById('Product8');
    let Pr9 = document.getElementById('Product9');
    let Pr10 = document.getElementById('Product10');
    let Pr11 = document.getElementById('Product11');
    let Pr12 = document.getElementById('Product12');
    let Pr13 = document.getElementById('Product13');
    let Pr14 = document.getElementById('Product14');
    let Pr15 = document.getElementById('Product15');
    let Pr16 = document.getElementById('Product16');
    let Pr17 = document.getElementById('Product17');
    let Pr18 = document.getElementById('Product18');
    let Pr19 = document.getElementById('Product19');
    let Pr20 = document.getElementById('Product20');
    let Pr21 = document.getElementById('Product21');
    let Pr22 = document.getElementById('Product22');
    let Pr23 = document.getElementById('Product23');
    let Pr24 = document.getElementById('Product24');
    let Pr25 = document.getElementById('Product25');

  // store the product info in localstorage  to send those info from home page to product page 
  Pr1.addEventListener('click', function() {
    localStorage.setItem('title', 'Samsung Galaxy Z Flip5');
    localStorage.setItem('price', 'BHD 279.990');
    localStorage.setItem('photoSRC', 'image/Producrt-1.png');
    localStorage.setItem('inf1', 'The foldable screen offers a compact design.');
    localStorage.setItem('inf2', 'Battery Life: 3,700mAh battery.');
    localStorage.setItem('inf3', 'The Z Flip5 comes with IPX8 water resistance.');
    window.location.href = 'Product.html';
  });

  Pr2.addEventListener('click', function() {
    localStorage.setItem('title', 'Huawei MatePad SE 11');
    localStorage.setItem('price', 'BHD 64.990');
    localStorage.setItem('photoSRC', 'image/Product-2.png');
    localStorage.setItem('inf1', '11-inch FullView display for immersive experience.');
    localStorage.setItem('inf2', 'Battery Life: 5,100mAh battery for all-day use.');
    localStorage.setItem('inf3', 'Powered by HarmonyOS for smooth performance.');
    window.location.href = 'Product.html';
  });
 

  Pr3.addEventListener('click', function() {
    localStorage.setItem('title', 'Lenovo Ideapad Flex 5');
    localStorage.setItem('price', 'BHD 269.990');
    localStorage.setItem('photoSRC', 'image/Product-3.png');
    localStorage.setItem('inf1', 'Flexible 2-in-1 design for laptop and tablet modes.');
    localStorage.setItem('inf2', 'Battery Life: Up to 10 hours of use.');
    localStorage.setItem('inf3', 'Powered by Intel Core i5 processor.');
    window.location.href = 'Product.html';
  });

  Pr4.addEventListener('click', function() {
    localStorage.setItem('title', 'Sony WH-CH520 Wireless');
    localStorage.setItem('price', 'BHD 279.990');
    localStorage.setItem('photoSRC', 'image/Product-4.png');
    localStorage.setItem('inf1', 'Clear sound with long-lasting comfort.');
    localStorage.setItem('inf2', 'Battery Life: 50 hours on a full charge.');
    localStorage.setItem('inf3', 'Built-in microphone for hands-free calls.');
    window.location.href = 'Product.html';
  });

  Pr5.addEventListener('click', function() {
    localStorage.setItem('title', 'Apple MagSafe Charger for iPhone');
    localStorage.setItem('price', 'BHD 20.999');
    localStorage.setItem('photoSRC', 'image/Product-5.png');
    localStorage.setItem('inf1', 'Magnetic charging for iPhone 12 and later.');
    localStorage.setItem('inf2', 'Fast charging up to 15W.');
    localStorage.setItem('inf3', 'Compact and easy to use.');
    window.location.href = 'Product.html';
  });

  Pr6.addEventListener('click', function() {
    localStorage.setItem('title', 'Huawei MatePad SE 11');
    localStorage.setItem('price', 'BHD 64.990');
    localStorage.setItem('photoSRC', 'image/Product-2.png');
    localStorage.setItem('inf1', '11-inch FullView display for immersive experience.');
    localStorage.setItem('inf2', 'Battery Life: 5,100mAh battery for all-day use.');
    localStorage.setItem('inf3', 'Powered by HarmonyOS for smooth performance.');
    window.location.href = 'Product.html';
  });

  Pr7.addEventListener('click', function() {
    localStorage.setItem('title', 'Apple iPad 10th Gen');
    localStorage.setItem('price', 'BHD 159.900');
    localStorage.setItem('photoSRC', 'image/tablets3.png');
    localStorage.setItem('inf1', '10.9-inch Liquid Retina display.');
    localStorage.setItem('inf2', 'A14 Bionic chip for fast performance.');
    localStorage.setItem('inf3', 'Support for Apple Pencil (1st generation).');
    window.location.href = 'Product.html';
  });

  Pr8.addEventListener('click', function() {
    localStorage.setItem('title', 'Xiaomi PAD 6');
    localStorage.setItem('price', 'BHD 24.900');
    localStorage.setItem('photoSRC', 'image/Tablet2.png');
    localStorage.setItem('inf1', '10.1-inch display with high resolution.');
    localStorage.setItem('inf2', 'Battery Life: 6,000mAh for long usage.');
    localStorage.setItem('inf3', 'Lightweight and portable design.');
    window.location.href = 'Product.html';
  });
  Pr9.addEventListener('click', function() {
    localStorage.setItem('title', 'Samsung Galaxy Z Flip5');
    localStorage.setItem('price', 'BHD 279.990');
    localStorage.setItem('photoSRC', 'image/Producrt-1.png');
    localStorage.setItem('inf1', 'The foldable screen offers a compact design.');
    localStorage.setItem('inf2', 'Battery Life: 3,700mAh battery.');
    localStorage.setItem('inf3', 'The Z Flip5 comes with IPX8 water resistance.');
    window.location.href = 'Product.html';
  });

  Pr10.addEventListener('click', function() {
    localStorage.setItem('title', 'Apple iPhone 15 Pro Max');
    localStorage.setItem('price', 'BHD 459.500');
    localStorage.setItem('photoSRC', 'image/telephone2.png');
    localStorage.setItem('inf1', 'ProMotion display with 120Hz refresh rate.');
    localStorage.setItem('inf2', 'Battery Life: 29 hours of video playback.');
    localStorage.setItem('inf3', 'Powered by A17 Pro chip with enhanced camera features.');
    window.location.href = 'Product.html';
  });

  Pr11.addEventListener('click', function() {
    localStorage.setItem('title', 'Samsung Galaxy S24 Ultra');
    localStorage.setItem('price', 'BHD 359.000');
    localStorage.setItem('photoSRC', 'image/telephone3.png');
    localStorage.setItem('inf1', '6.8-inch Dynamic AMOLED 2X display.');
    localStorage.setItem('inf2', 'Battery Life: 5,000mAh with fast charging.');
    localStorage.setItem('inf3', 'Quad-camera system for incredible photography.');
    window.location.href = 'Product.html';
  });

  Pr12.addEventListener('click', function() {
    localStorage.setItem('title', 'Sony PLAYSTATION 5');
    localStorage.setItem('price', 'BHD 180.900');
    localStorage.setItem('photoSRC', 'image/Console1.png');
    localStorage.setItem('inf1', 'Next-gen gaming with 4K resolution support.');
    localStorage.setItem('inf2', 'Includes DualSense wireless controller.');
    localStorage.setItem('inf3', 'Ultra-fast SSD for quick load times.');
    window.location.href = 'Product.html';
  });

  Pr13.addEventListener('click', function() {
    localStorage.setItem('title', 'Microsoft XBOX SERIES X');
    localStorage.setItem('price', 'BHD 271.990');
    localStorage.setItem('photoSRC', 'image/Console2.png');
    localStorage.setItem('inf1', '4K gaming at 120fps.');
    localStorage.setItem('inf2', 'Supports ray tracing for lifelike graphics.');
    localStorage.setItem('inf3', 'Comes with Xbox Game Pass for access to games.');
    window.location.href = 'Product.html';
  });

  Pr14.addEventListener('click', function() {
    localStorage.setItem('title', 'Nintendo SWITCH OLED');
    localStorage.setItem('price', 'BHD 159.000');
    localStorage.setItem('photoSRC', 'image/Console3.png');
    localStorage.setItem('inf1', '7-inch OLED screen for vibrant visuals.');
    localStorage.setItem('inf2', 'Battery Life: Up to 9 hours of playtime.');
    localStorage.setItem('inf3', 'Hybrid design for both handheld and docked play.');
    window.location.href = 'Product.html';
  });

  Pr15.addEventListener('click', function() {
    localStorage.setItem('title', 'Fujifilm INSTAX MINI 40');
    localStorage.setItem('price', 'BHD 44.000');
    localStorage.setItem('photoSRC', 'image/camera1.png');
    localStorage.setItem('inf1', 'Instant prints for on-the-go memories.');
    localStorage.setItem('inf2', 'Compact design with easy-to-use features.');
    localStorage.setItem('inf3', 'Uses INSTAX Mini film for prints.');
    window.location.href = 'Product.html';
  });

  Pr16.addEventListener('click', function() {
    localStorage.setItem('title', 'Canon DSLR EOS 4000D DC');
    localStorage.setItem('price', 'BHD 180.390');
    localStorage.setItem('photoSRC', 'image/Camera2.png');
    localStorage.setItem('inf1', '18MP camera for high-quality images.');
    localStorage.setItem('inf2', 'Includes 18-55mm lens for versatile shots.');
    localStorage.setItem('inf3', 'Full HD 1080p video recording.');
    window.location.href = 'Product.html';
  });

  Pr17.addEventListener('click', function() {
    localStorage.setItem('title', 'Fujifilm Camera');
    localStorage.setItem('price', 'BHD 49.500');
    localStorage.setItem('photoSRC', 'image/Camera3.png');
    localStorage.setItem('inf1', 'Compact camera for everyday photography.');
    localStorage.setItem('inf2', 'Easy-to-use interface for beginners.');
    localStorage.setItem('inf3', 'Supports SD cards for storage.');
    window.location.href = 'Product.html';
  });

  Pr18.addEventListener('click', function() {
    localStorage.setItem('title', 'Sennheiser ACCENTUM');
    localStorage.setItem('price', 'BHD 76.990');
    localStorage.setItem('photoSRC', 'image/Headphone2.png');
    localStorage.setItem('inf1', 'Premium sound quality with noise cancellation.');
    localStorage.setItem('inf2', 'Comfortable ear pads for long listening sessions.');
    localStorage.setItem('inf3', 'Wireless connectivity with Bluetooth.');
    window.location.href = 'Product.html';
  });

  Pr19.addEventListener('click', function() {
    localStorage.setItem('title', 'JBL True Wireless');
    localStorage.setItem('price', 'BHD 64.990');
    localStorage.setItem('photoSRC', 'image/Headphone3.png');
    localStorage.setItem('inf1', 'True wireless earbuds for freedom of movement.');
    localStorage.setItem('inf2', 'Battery Life: 5 hours of continuous playtime.');
    localStorage.setItem('inf3', 'IPX4-rated water resistance for workouts.');
    window.location.href = 'Product.html';
  });
  Pr20.addEventListener('click', function() {
    localStorage.setItem('title', 'Sony WH-CH520 Wireless');
    localStorage.setItem('price', 'BHD 279.990');
    localStorage.setItem('photoSRC', 'image/Product-4.png');
    localStorage.setItem('inf1', 'Clear sound with long-lasting comfort.');
    localStorage.setItem('inf2', 'Battery Life: 50 hours on a full charge.');
    localStorage.setItem('inf3', 'Built-in microphone for hands-free calls.');
    window.location.href = 'Product.html';
  });
  Pr21.addEventListener('click', function() {
    localStorage.setItem('title', 'APPLE MacBook Air');
    localStorage.setItem('price', 'BHD 314.990');
    localStorage.setItem('photoSRC', 'image/laptop2.png');
    localStorage.setItem('inf1', '13.3-inch Retina display for sharp visuals.');
    localStorage.setItem('inf2', 'Powered by Apple M2 chip for fast processing.');
    localStorage.setItem('inf3', 'Battery Life: Up to 18 hours of use.');
    window.location.href = 'Product.html';
  });
  Pr22.addEventListener('click', function() {
    localStorage.setItem('title', 'ACER Nitro V');
    localStorage.setItem('price', 'BHD 400.000');
    localStorage.setItem('photoSRC', 'image/laptop3.png');
    localStorage.setItem('inf1', 'Powerful gaming laptop with NVIDIA graphics.');
    localStorage.setItem('inf2', '15.6-inch display with high refresh rate.');
    localStorage.setItem('inf3', 'Large storage and high-speed memory.');
    window.location.href = 'Product.html';
  });
  
  Pr23.addEventListener('click', function() {
    localStorage.setItem('title', 'Lenovo Ideapad Flex 5');
    localStorage.setItem('price', 'BHD 269.990');
    localStorage.setItem('photoSRC', 'image/Product-3.png');
    localStorage.setItem('inf1', 'Flexible 2-in-1 design for laptop and tablet modes.');
    localStorage.setItem('inf2', 'Battery Life: Up to 10 hours of use.');
    localStorage.setItem('inf3', 'Powered by Intel Core i5 processor.');
    window.location.href = 'Product.html';
  });
  Pr24.addEventListener('click', function() {
    localStorage.setItem('title', 'Apple MagSafe Charger for iPhone');
    localStorage.setItem('price', 'BHD 20.999');
    localStorage.setItem('photoSRC', 'image/Product-5.png');
    localStorage.setItem('inf1', 'Magnetic charging for iPhone 12 and later.');
    localStorage.setItem('inf2', 'Fast charging up to 15W.');
    localStorage.setItem('inf3', 'Compact and easy to use.');
    window.location.href = 'Product.html';
  });
  Pr25.addEventListener('click', function() {
    localStorage.setItem('title', 'LOGITECH G502 Gaming Mouse');
    localStorage.setItem('price', 'BHD 40.999');
    localStorage.setItem('photoSRC', 'image/mouse.png');
    localStorage.setItem('inf1', 'High-precision 16,000 DPI sensor.');
    localStorage.setItem('inf2', 'Customizable RGB lighting.');
    localStorage.setItem('inf3', '11 programmable buttons for gaming.');
    window.location.href = 'Product.html';
  });
}
  // retrieve the the product info from home page 
  if(window.location.pathname === '/Product.html'){
    let Title = localStorage.getItem('title');
    let Price = localStorage.getItem('price');
    let PhotoSrc = localStorage.getItem('photoSRC');
    let Info1 = localStorage.getItem('inf1');
    let Info2 = localStorage.getItem('inf2');
    let Info3 = localStorage.getItem('inf3');
    let userName = localStorage.getItem('FirstName');
    document.getElementById('ProductUser').innerText = userName;
    if(Title != null && Price != null && PhotoSrc != null &&Info1 != null &&Info2 != null &&Info3 != null){
      document.getElementById('namestyle').innerText = Title;
      document.getElementById('pricetext').innerText = Price;
      document.getElementById('imgsize').src = PhotoSrc;
      document.getElementById('info1').innerText = Info1;
      document.getElementById('info2').innerText = Info2; 
      document.getElementById('info3').innerText = Info3; 
    }
  }
});


// cart page 
document.addEventListener('DOMContentLoaded',function(){
  if(window.location.pathname === '/Product.html'){
    let addTOCart = document.getElementById('buttonstyle');
    // when the user click the button send him to the Cart page 
    addTOCart.addEventListener('click', function(){
      window.location.href = 'Cart.html';
    });
  }
  if(window.location.pathname === '/Cart.html'){
    // Declare the variable for each element 
    let CartTitle = localStorage.getItem('title');
    let Cartprice = localStorage.getItem('price');
    let CartPic = localStorage.getItem('photoSRC');
    let CartUserN = localStorage.getItem('FirstName');
    // show the product that the user add something to cart 
    if (CartTitle != null && Cartprice != null && CartPic != null){
      document.getElementById('CartProductPIC').src = CartPic;
      document.getElementById('CartProductName').innerText = CartTitle;
      document.getElementById('CartProductPrice').innerText = Cartprice;
      document.getElementById('totalPrice').innerText = Cartprice;
    }
    // check if the user register 
    if(CartUserN != null){
      document.getElementById('CartUserN').innerText = CartUserN;
    }
    // function for purchasing 

    document.getElementById('Cbtn').addEventListener('click', function(){
      alert("Payment Successful!\nThank you for your purchase");
      window.location.href = "/Home.html";
    });
    
   
  }
});

// Making of electrichub 

if(window.location.pathname === '/Making_of_ELECTRICHUB.html'){
  // dropdown event
  var coll = document.getElementsByClassName("dropdownbox");
  var currentOpenDropdown = null;

  for (var i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function(event) {
          event.stopPropagation();

          // Get the dropdown content
          var content = this.nextElementSibling;

          if (currentOpenDropdown === this) {
              // Close the currently open dropdown
              content.classList.remove('show');
              currentOpenDropdown = null; // Reset the tracker
          } else {
              // Close any previously opened dropdown (if applicable)
              if (currentOpenDropdown !== null) {
                  currentOpenDropdown.nextElementSibling.classList.remove('show');
              }

              // Open the clicked dropdown
              content.classList.add('show');
              currentOpenDropdown = this; // Update the currently open dropdown tracker
          }
      });
  }

  // Close dropdown when clicking outside
  window.addEventListener("click", function(event) {
      if (!event.target.matches('.dropdownbox') && currentOpenDropdown !== null) {
          currentOpenDropdown.nextElementSibling.classList.remove('show'); // Remove show class
          currentOpenDropdown = null; // Reset the tracker
      }
  });
// show the user name in the page 
  if(localStorage.getItem("FirstName") != null){
    let user = document.getElementById('User');
    user.innerText = localStorage.getItem('FirstName');
    user.style.margin= '0 3em 0 0 ';
    user.style.textDecoration = 'none';
    user.style.color = 'black';
  }
}