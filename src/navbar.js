class Navbar {
    constructor(navItems) {
        this.navItems = navItems;
        this.closeIco = new URL(
            'images/ui/close.png?as=png&width=32',
            import.meta.url
        );;
        this.menuIco = new URL(
            'images/ui/menu.png?as=png&width=32',
            import.meta.url
        );;
        this.render();
    }

    render() {
        const nav = document.querySelector("#mainNavBar");
                
        const navLinks = document.querySelector("#mainNavBar .navbar-links")
        
        this.navItems.forEach((item, index) => {
            const link_sep = document.createElement("div");
            link_sep.classList.add("link-seperator");
            link_sep.textContent = "/";    

            const link = document.createElement("a");
            link.classList.add("links")
            link.href = item.url;
            link.textContent = item.label;

            // Open external links in a new tab
            if (!item.url.startsWith("/")) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            
            if(index > 0)
                navLinks.appendChild(link_sep);

            navLinks.appendChild(link);
        });

        const rightSection = document.createElement("div");
        rightSection.classList.add("navbar-right");

        const actionButton = document.createElement("a");
        actionButton.href = "#";
        actionButton.textContent = "Subscribe";
        actionButton.classList.add("navbar-s-button");

        // Mobile Navigation
        const mobileNav = document.createElement("div");
        mobileNav.classList.add("mobile-navbar");

        const dropdownIcon = document.createElement("img");
        dropdownIcon.src = this.menuIco;
        dropdownIcon.alt = "Menu";
        dropdownIcon.classList.add("mobile-menu-icon");
        dropdownIcon.addEventListener("click", () => {
            mobileDropdown.classList.toggle("show");
        });

        const mobileDropdown = document.createElement("div");
        mobileDropdown.classList.add("mobile-dropdown");

        /*this.navItems.forEach(item => {
            const link = document.createElement("a");
            link.href = item.url;
            link.textContent = item.label;
            link.classList.add("mobile-dropdown-link");
            mobileDropdown.appendChild(link);
        });*/

        rightSection.appendChild(dropdownIcon);
        mobileNav.appendChild(mobileDropdown);

        
        
        rightSection.appendChild(actionButton);
        
        nav.appendChild(navLinks);
        navLinks.appendChild(mobileNav);
        nav.appendChild(rightSection);

        document.body.prepend(nav);

    }
}

const navItems = [
    { label: "Homepage", url: "/index.html" },
    { label: "About us", url: "#" },
    { label: "Contacts", url: "#" },
    { label: "Pineapple", url: "https://www.youtube.com/watch?v=_WABmx5VcyE" },
    { label: "GitHub", url: "https://www.github.com/R-aidla" }
];

new Navbar(navItems);