import 'cypress-file-upload';

describe("Register User", () => {

    const dynamicString = Math.random().toString(36).substring(2);
    const dynamicEmail = `ssss+${dynamicString}@gmail.com`;
    const dynamicPassword = Math.random().toString(36).substring(2, 10) + '@#';

    beforeEach(() => {
        cy.visit('http://automationexercise.com');
        cy.get('a > img').should('be.visible');
    });

    it("Register Application", () => {

        // Visit  login page
        cy.get('.shop-menu > .nav > :nth-child(4)').click();
        cy.get("div[class='signup-form'] h2").should('have.text', 'New User Signup!');
        cy.wait(3000)

        // Fill out the registration form
        cy.get("input[placeholder='Name']").type("demo");
        cy.get("input[data-qa='signup-email']").type(dynamicEmail);
        cy.get('[data-qa="signup-button"]').click();
        cy.wait(3500);

        // Fill out the account information form
        cy.get(':nth-child(3) > .top').click();
        cy.get('[data-qa="password"]').type(dynamicPassword);
        cy.get('[data-qa="days"]').select('3');
        cy.get('[data-qa="months"]').select('July');
        cy.get('[data-qa="years"]').select('1999');
        cy.get('#newsletter').click();
        cy.get('#optin').click();
        cy.get('[data-qa="first_name"]').type('sama');
        cy.get('[data-qa="last_name"]').type('santu');
        cy.get('[data-qa="company"]').type('isroel');
        cy.get('[data-qa="address"]').type('BEML Layout Bangolore, Karnataka');
        cy.get('[data-qa="country"]').select('Canada');
        cy.get('[data-qa="state"]').type('Central Canada');
        cy.get('[data-qa="city"]').type("New york");
        cy.get('[data-qa="zipcode"]').type('522111');
        cy.get('[data-qa="mobile_number"]').type('7842618965');
        cy.get('[data-qa="create-account"]').click();
        cy.get('b').should('be.visible', 'ACCOUNT CREATED!');
        cy.wait(3500);
        cy.get('[data-qa="continue-button"]').click();
        cy.get(':nth-child(10) > a').should('be.visible', 'Logged in as demo');
        cy.wait(3500);

        // Perform additional actions after registration
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
        cy.get('b').should('be.visible', 'ACCOUNT DELETED!');

    });

    it.skip("Login User with correct email and password", () => {

        //Login page
        cy.get('.shop-menu > .nav > :nth-child(4)').click();
        cy.get('.login-form > h2').should('have.text', 'Login to your account');
        cy.get("input[data-qa='login-email']").type('sasa@gmail.com');
        cy.get("input[placeholder='Password']").type('AA123a@#');
        cy.get('[data-qa="login-button"]').click();
        cy.get(':nth-child(10) > a').should('be.visible', 'Logged in as cypress');
        //'Delete Account' button
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
        cy.get('b').should('be.visible', 'ACCOUNT DELETED!');

    });


    it("Login User with Incorrect correct email and password", () => {

        // Visit  login page Invalid details
        cy.get('.shop-menu > .nav > :nth-child(4)').click();
        cy.get("div[class='login-form'] h2").should('have.text', 'Login to your account');
        cy.get("input[data-qa='login-email']").type('4532_3@gmail.co');
        cy.get("input[placeholder='Password']").type("@3541");
        cy.get("button[data-qa='login-button']")
            .click();
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!');

    });

    it("Logout User", () => {
        //Login page
        cy.get('.shop-menu > .nav > :nth-child(4)').click();
        cy.get('.login-form > h2').should('have.text', 'Login to your account');
        cy.get("input[data-qa='login-email']").type('sub@gmail.com');
        cy.get("input[placeholder='Password']").type('TT123t@#');
        cy.get('[data-qa="login-button"]').click();
        cy.get(':nth-child(10) > a').should('be.visible', 'Logged in as sunshine');
        // Logout Page
        cy.get('a[href="/logout"]').click();
        cy.get('.login-form > h2').should('have.text', 'Login to your account');

    });


    it("Register User with existing email", () => {
        // Visit  login page
        cy.get('.shop-menu > .nav > :nth-child(4)').click();
        cy.get("div[class='signup-form'] h2").should('have.text', 'New User Signup!');
        cy.wait(3000)

        // Fill out the registration form with existing mail 
        cy.get("input[placeholder='Name']").type("demo");
        cy.get("input[data-qa='signup-email']").type('demo@gmail.com');
        cy.get('[data-qa="signup-button"]').click();
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!');
    });

    it("Contact Us Form", () => {
        // Contact Form      
        cy.get('.shop-menu > .nav > :nth-child(8) > a').click();
        cy.get('div.contact-form > .title').should('have.text', 'Get In Touch');
        cy.get('[data-qa="name"]').type("demo");
        cy.get('[data-qa="email"]').type(dynamicEmail);
        cy.get('[data-qa="subject"]').type("Work related");
        cy.get('[data-qa="message"]').type('Consider as high priority');
        cy.get(':nth-child(6) > .form-control').attachFile("cypress.pdf", { subjectType: 'drag-n-drop' });
        cy.get('input[value="Submit"]').click();
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
        cy.get('#form-section > .btn').click();
        cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible');

    });

    it("Verify Test Cases Page", () => {
        cy.get('.active > :nth-child(1) > .test_cases_list > .btn').click();
        cy.get('h2[class="title text-center"] b').should('be.visible', 'Test Cases');
    });

    it("Verify All Products and product detail page", () => {
        cy.get("a[href='/products']").click();
        cy.get('.title').should('be.visible', 'ALL PRODUCTS');
        cy.get("a[href='/product_details/1']").click();
        cy.get('.product-information > :nth-child(6)').contains("In Stock");
        cy.get('.product-information > :nth-child(8)').contains("Polo");

    });

    it("Search Product", () => {
        cy.get("a[href='/products']").click();
        cy.get('.title').should('be.visible', 'ALL PRODUCTS');
        cy.get("#search_product").type('Polo');
        cy.get("#submit_search").click();
        cy.get(".title.text-center").contains("Searched Products");

    });

    it("Verify Subscription in home page", () => {
        cy.scrollTo('bottom', { duration: 2000 });
        cy.get("div[class='single-widget'] h2").should('have.text', 'Subscription');
        cy.get("#susbscribe_email").type(dynamicEmail);
        cy.get('#subscribe')
            .click()
        cy.get('.message').should('not.exist');
    });

    it("Verify Subscription in Cart page", () => {
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
        cy.get("#susbscribe_email").type(dynamicEmail);
        cy.get('#subscribe')
            .click()
        cy.get('.message').should('not.exist');

    });

    it("Add Products in Cart", () => {
        cy.get("a[href='/products']").click();
        cy.get('.title').should('be.visible', 'ALL PRODUCTS');
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn')
            .click();
        cy.get('.modal-footer > .btn').click();
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn')
            .click();
        cy.get('u').click();
        cy.get('#product-1').should('be.visible');
        cy.get('#product-2').should('be.visible');
        cy.get('#product-1 > .cart_price').should('be.visible').invoke('text').should('contain', '500');
        cy.get('#product-2 > .cart_quantity').should('have.length', 1);
    });

    it("Verify Product quantity in Cart", () => {
        cy.get("a[href='/products']").click();
        cy.get('.title').should('be.visible', 'ALL PRODUCTS');
        cy.get("a[href='/product_details/1']").click();
        cy.get('#quantity').click().clear().type('4');
        cy.get("button[type='button']").click();
        cy.get('u').click();
        cy.get('.cart_quantity').should('be.visible').invoke('text').should('contain', '4');
    });

    it("Add review on product", () => {
        cy.get("a[href='/products']").click();
        cy.get('.title').should('be.visible', 'ALL PRODUCTS');
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
        cy.get("a[href='#reviews']").should('be.visible').invoke('text')
            .should('contain', 'Write Your Review');
        cy.get('#name').type("sun");
        cy.get('#email').type(dynamicEmail);
        cy.get('#review').type("Quality is good");
        cy.get('#button-review').click()
            .should('be.visible', 'Thank you for your review.');

    });

    it("Add to cart from Recommended items", () => {
        cy.scrollTo('bottom');
        cy.get("div[class='recommended_items'] h2[class='title text-center']")
            .should('be.visible', 'RECOMMENDED ITEMS');
        cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn')
            .click();
        cy.get('.modal-body > :nth-child(2)').click();
        cy.get('.product_image').should('be.visible', 'black');
    });

    it("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", () => {
        cy.scrollTo('bottom');
        cy.get('.single-widget > h2').should('be.visible', 'SUBSCRIPTION');
        cy.get('#scrollUp').click();
        // Check if the text is visible on the screen
        cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');
    });

    it("Verify Scroll Up without 'Arrow' button and Scroll Down functionality", () => {
        cy.scrollTo('bottom');
        cy.get('.single-widget > h2').should('be.visible', 'SUBSCRIPTION');
        cy.scrollTo('top');
        // Check if the text is visible on the screen
        cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');
    });

    it("View & Cart Brand Products", () => {
        cy.get("a[href='/products']").click();
        cy.scrollTo('left')
        cy.get("div[class='brands_products'] h2").should('be.visible', 'Brands');
        cy.get("a[href='/brand_products/Polo']").click().should('be.visible', 'BRAND - POLO PRODUCTS');
        cy.scrollTo('left');
        cy.get("a[href='/brand_products/H&M']").click().should('be.visible', 'BRAND - H&M PRODUCTS');
    });

    it("View Category Products", () => {
        cy.scrollTo("left");
        cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click();
        cy.get("a[href='/category_products/1']").click().should('be.visible', 'WOMEN - DRESS PRODUCTS');
        cy.get("a[href='#Men']").click();
        cy.get('#Men > .panel-body > ul > :nth-child(1) > a').click().should('be.visible', 'MEN - TSHIRTS PRODUCTS');

    });

    it("Remove Products From Cart", () => {
        cy.get("a[href='/products']").click();
        cy.get('.title').should('be.visible', 'ALL PRODUCTS');
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn')
            .click();
        cy.get('u').click();
        cy.get('#product-1').should('be.visible');
        cy.get('.cart_quantity_delete').click().should('be.visible', 'Cart is empty!');
    });
});