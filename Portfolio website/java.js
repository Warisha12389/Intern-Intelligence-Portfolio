
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const projectsContainer = document.getElementById('projects-container');
const contactForm = document.getElementById('contactForm');


window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});


hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate skills when in viewport
window.addEventListener('scroll', () => {
    if (isInViewport(document.querySelector('.skills'))) {
        animateSkillBars();
    }
});

// Custom project data with unique images and descriptions
const customProjectData = [
    {
        title: "E-Commerce Website",
        description: "A fully responsive e-commerce platform with shopping cart and payment integration.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "Task Management App",
        description: "A productivity application for managing daily tasks with drag-and-drop functionality.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["React", "javascript", "Firebase", "TailwindCss"],
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "Weather Dashboard",
        description: "Real-time weather application with 5-day forecast and location-based services.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["JavaScript", "API Integration", "Bootstrap"],
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "Social Media Platform",
        description: "A social networking site with user profiles, posts, comments, and real-time chat.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["MongoDB", "Express", "React", "Node.js"],
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "Fitness Tracker",
        description: "An application to track workouts, set goals, and monitor fitness progress.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["React Native", "Firebase", "Tailwindcss", "Health API"],
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "Recipe Finder",
        description: "Search for recipes based on ingredients with nutritional information and cooking instructions.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["React.js", "API Integration", "CSS3", "Local Storage"],
        demoLink: "#",
        githubLink: "#"
    }
];

// Fetch projects from API and combine with custom data
async function fetchProjects() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
        const apiProjects = await response.json();
        
        // Display only first 6 projects from API
        const limitedApiProjects = apiProjects.slice(0, 6);
        
        // Combine API data with our custom project data
        limitedApiProjects.forEach((apiProject, index) => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            
            // Use custom data if available, otherwise use API data
            const customData = customProjectData[index] || {};
            
            const title = customData.title || `Project ${index + 1}`;
            const description = customData.description || apiProject.title;
            const image = customData.image || apiProject.url;
            const tags = customData.tags || ["HTML", "CSS", "JavaScript"];
            
            // Create tags HTML
            const tagsHTML = tags.map(tag => 
                `<span class="project-tag">${tag}</span>`
            ).join('');
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <img src="${image}" alt="${title}">
                </div>
                <div class="project-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                    <div class="project-links">
                        <a href="${customData.demoLink || '#'}"><i class="fas fa-globe"></i> Live Demo</a>
                        <a href="${customData.githubLink || '#'}"><i class="fab fa-github"></i> GitHub</a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback: Display custom projects if API fails
        displayCustomProjects();
    }
}

// Fallback function to display custom projects if API fails
function displayCustomProjects() {
    projectsContainer.innerHTML = ''; // Clear any existing content
    
    customProjectData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        // Create tags HTML
        const tagsHTML = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}"><i class="fas fa-globe"></i> Live Demo</a>
                    <a href="${project.githubLink}"><i class="fab fa-github"></i> GitHub</a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    // Animate skill bars if skills section is already in viewport on page load
    if (isInViewport(document.querySelector('.skills'))) {
        animateSkillBars();
    }
});