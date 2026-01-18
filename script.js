function initParticles() {
  const canvas = $('#bg-canvas')[0];
  if(!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  $(window).on('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.init();
    }
    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = `rgba(225, 29, 72, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $.each(particles, function(i, p) {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function loadProjects() {
  const projectsContainer = $('#projects-container');
  if(!projectsContainer.length) return;
  
  projectsContainer.empty();
  
  $.each(config.projects, function(i, project) {
    const projectEl = $('<div>', {
      'class': 'group block relative bg-surface rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2',
      html: `
        <div class="aspect-video overflow-hidden">
          <img src="${project.image}" alt="${project.name}" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" onerror="this.src='https://i.imgur.com/ozFO0J5.png'">
        </div>
        <div class="p-5 border-t border-white/5 bg-zinc-900/50 backdrop-blur-sm">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] font-bold text-primary uppercase tracking-widest">${project.url}</span>
              <h4 class="text-base font-semibold text-white mt-1">${project.name}</h4>
            </div>
            <div class="text-zinc-500 group-hover:text-primary transition-colors">
              <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
            </div>
          </div>
        </div>
      `
    });
    projectsContainer.append(projectEl);
  });
}

function loadTestimonials() {
  const testimonialsContainer = $('#testimonials-container');
  if(!testimonialsContainer.length) return;
  
  testimonialsContainer.empty();
  
  $.each(config.testimonials, function(i, testimonial) {
    const testimonialEl = $('<div>', {
      'class': 'relative overflow-hidden rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 group',
      html: `
        <div class="absolute inset-0 bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 backdrop-blur-xl"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300"></div>
        <div class="relative p-8 space-y-6">
          <div class="flex items-start gap-4">
            <img src="${testimonial.image}" alt="${testimonial.name}" class="w-14 h-14 rounded-full object-cover" onerror="this.src='https://i.pravatar.cc/150?img=1'">
            <div class="flex-1">
              <h4 class="text-base font-bold text-white">${testimonial.name}</h4>
              <p class="text-xs text-zinc-500 mt-0.5">${testimonial.date}</p>
            </div>
          </div>
          <p class="text-zinc-400 leading-relaxed text-sm italic">"${testimonial.text}"</p>
          <div class="pt-4 border-t border-white/10">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-globe text-primary text-xs"></i>
              <span class="text-xs text-zinc-500 font-medium">${testimonial.website}</span>
            </div>
          </div>
        </div>
      `
    });
    testimonialsContainer.append(testimonialEl);
  });
}

function loadAboutMe() {
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - config.startYear;
  
  if(config.aboutMe) {
    $('#about-description').text(config.aboutMe.description);
    $('#about-experience').text(yearsExperience + '+');
    $('#about-clients').text(config.clients + '+');
    
    $('#hero-experience').text(yearsExperience + '+');
    $('#hero-clients').text(config.clients + '+');
  }
}

function initMobileMenu() {
  $('#mobile-menu-btn').on('click', function() {
    const menu = $('#mobile-menu');
    const btn = $(this);
    const spans = btn.find('span');
    
    menu.toggleClass('hidden');
    
    if (!menu.hasClass('hidden')) {
      spans.eq(0).css('transform', 'rotate(45deg) translateY(8px)');
      spans.eq(1).css('opacity', '0');
      spans.eq(2).css('transform', 'rotate(-45deg) translateY(-8px)');
    } else {
      spans.eq(0).css('transform', 'none');
      spans.eq(1).css('opacity', '1');
      spans.eq(2).css('transform', 'none');
    }
  });
  
  $('#mobile-menu a').on('click', function() {
    const menu = $('#mobile-menu');
    const btn = $('#mobile-menu-btn');
    const spans = btn.find('span');
    
    menu.addClass('hidden');
    spans.eq(0).css('transform', 'none');
    spans.eq(1).css('opacity', '1');
    spans.eq(2).css('transform', 'none');
  });
}

$(document).ready(function() {
  initParticles();
  loadProjects();
  loadTestimonials();
  loadAboutMe();
  initMobileMenu();
});