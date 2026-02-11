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
  const toggleBtn = $('#projects-toggle-btn');
  const fadeOverlay = $('#projects-fade');
  if(!projectsContainer.length) return;
  
  const settings = Object.assign({ initialVisible: 6, step: 6 }, config.projectsSettings || {});
  const totalProjects = config.projects.length;
  $('#projects-count').text(`${totalProjects}`);
  let visibleCount = Math.min(settings.initialVisible, totalProjects);

  function renderProjects() {
    projectsContainer.empty();

    $.each(config.projects.slice(0, visibleCount), function(i, project) {
      const projectEl = $('<div>', {
        'class': 'project-card group block relative bg-surface rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2',
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

    if (totalProjects > settings.initialVisible) {
      toggleBtn.removeClass('hidden');
    } else {
      toggleBtn.addClass('hidden');
    }

    const isAllVisible = visibleCount >= totalProjects;
    toggleBtn.text(isAllVisible ? 'Show Less' : 'Show More');
    fadeOverlay.toggleClass('opacity-100', !isAllVisible).toggleClass('opacity-0', isAllVisible);
  }

  toggleBtn.off('click').on('click', function() {
    if (visibleCount >= totalProjects) {
      visibleCount = Math.min(settings.initialVisible, totalProjects);
    } else {
      visibleCount = totalProjects;
    }
    renderProjects();
  });

  renderProjects();
}

function loadThumbnails() {
  const thumbnailsContainer = $('#thumbnails-container');
  const toggleBtn = $('#thumbnails-toggle-btn');
  const fadeOverlay = $('#thumbnails-fade');
  if(!thumbnailsContainer.length) return;
  
  const settings = Object.assign({ initialVisible: 6, step: 6 }, config.thumbnailsSettings || {});
  const totalThumbnails = config.thumbnails.length;
  $('#thumbnails-count').text(`${totalThumbnails}`);
  let visibleCount = Math.min(settings.initialVisible, totalThumbnails);

  function renderThumbnails() {
    thumbnailsContainer.empty();

    $.each(config.thumbnails.slice(0, visibleCount), function(i, thumbnail) {
      const thumbnailEl = $('<div>', {
        'class': 'group block relative bg-surface rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2',
        html: `
          <div class="aspect-video overflow-hidden">
            <img src="${thumbnail.thumbnailImage}" alt="${thumbnail.channelName}" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" onerror="this.src='https://i.imgur.com/ozFO0J5.png'">
          </div>
          <div class="p-5 border-t border-white/5 bg-zinc-900/50 backdrop-blur-sm">
            <div class="flex items-center gap-3">
              <img src="${thumbnail.channelLogo}" alt="${thumbnail.channelName}" class="w-10 h-10 rounded-full object-cover" onerror="this.src='https://i.imgur.com/ozFO0J5.png'">
              <div class="flex-1">
                <h4 class="text-base font-semibold text-white">${thumbnail.channelName}</h4>
                <a href="${thumbnail.channelLink}" target="_blank" class="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">View Channel</a>
              </div>
            </div>
          </div>
        `
      });
      thumbnailsContainer.append(thumbnailEl);
    });

    if (totalThumbnails > settings.initialVisible) {
      toggleBtn.removeClass('hidden');
    } else {
      toggleBtn.addClass('hidden');
    }

    const isAllVisible = visibleCount >= totalThumbnails;
    toggleBtn.text(isAllVisible ? 'Show Less' : 'Show More');
    fadeOverlay.toggleClass('opacity-100', !isAllVisible).toggleClass('opacity-0', isAllVisible);
  }

  toggleBtn.off('click').on('click', function() {
    if (visibleCount >= totalThumbnails) {
      visibleCount = Math.min(settings.initialVisible, totalThumbnails);
    } else {
      visibleCount = totalThumbnails;
    }
    renderThumbnails();
  });

  renderThumbnails();
}

function loadTestimonials() {
  const testimonialsContainer = $('#testimonials-container');
  const toggleBtn = $('#testimonials-toggle-btn');
  const fadeOverlay = $('#testimonials-fade');
  if(!testimonialsContainer.length) return;
  
  const settings = Object.assign({ initialVisible: 3, step: 3 }, config.testimonialsSettings || {});
  const totalTestimonials = config.testimonials.length;
  let visibleCount = Math.min(settings.initialVisible, totalTestimonials);

  function renderTestimonials() {
    testimonialsContainer.empty();

    $.each(config.testimonials.slice(0, visibleCount), function(i, testimonial) {
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

    if (totalTestimonials > settings.initialVisible) {
      toggleBtn.removeClass('hidden');
    } else {
      toggleBtn.addClass('hidden');
    }

    const isAllVisible = visibleCount >= totalTestimonials;
    toggleBtn.text(isAllVisible ? 'Show Less' : 'Show More');
    fadeOverlay.toggleClass('opacity-100', !isAllVisible).toggleClass('opacity-0', isAllVisible);
  }

  toggleBtn.off('click').on('click', function() {
    if (visibleCount >= totalTestimonials) {
      visibleCount = Math.min(settings.initialVisible, totalTestimonials);
    } else {
      visibleCount = totalTestimonials;
    }
    renderTestimonials();
  });

  renderTestimonials();
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

async function fetchGitHubProjects() {
    const container = document.getElementById('github-projects-container');
    const username = 'seekiii';
    
    const languageIcons = {
        'Python': 'fa-brands fa-python',
        'JavaScript': 'fa-brands fa-js',
        'TypeScript': 'fa-brands fa-js',
        'HTML': 'fa-brands fa-html5',
        'CSS': 'fa-brands fa-css3-alt',
        'PHP': 'fa-brands fa-php',
        'Java': 'fa-brands fa-java',
        'C#': 'fa-solid fa-code',
        'C++': 'fa-solid fa-c',
        'Go': 'fa-solid fa-code'
    };

    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=6`);
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        const repos = data.items;
        container.innerHTML = '';

        repos.forEach(repo => {
            const lastUpdated = new Date(repo.updated_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            const langIcon = languageIcons[repo.language] || 'fa-solid fa-code';
            
            const ogImageUrl = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;

            const projectCard = `
                <div class="github-card rounded-xl flex flex-col h-full group bg-surface border border-white/10 transition-all duration-300 overflow-hidden">
                    <a href="${repo.html_url}" target="_blank" class="relative h-40 w-full overflow-hidden border-b border-white/5 block">
                        <img src="${ogImageUrl}" alt="${repo.name}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </a>

                    <div class="p-5 flex flex-col justify-between flex-grow bg-zinc-900/50 backdrop-blur-sm">
                        <div>
                            <div class="flex justify-between items-center mb-3">
                                <div class="flex items-center gap-2">
                                    <i class="${langIcon} text-primary text-base text-xl"></i>
                                    <span class="text-xs text-zinc-400 uppercase font-bold tracking-wider">
                                        ${repo.language || 'Code'}
                                    </span>
                                </div>
                                <div class="flex items-center gap-1.5 bg-yellow-400/10 px-2 py-0.5 rounded-md">
                                    <i class="fa-solid fa-star text-yellow-400 text-sm"></i> 
                                    <span class="text-yellow-400 text-sm font-bold">${repo.stargazers_count}</span>
                                </div>
                            </div>
                            <a href="${repo.html_url}" target="_blank" class="block group/title">
                                <h4 class="text-base font-bold text-white mb-2 transition-colors truncate text-xl capitalize group-hover/title:text-primary">
                                    ${repo.name.replace(/-/g, ' ')}
                                </h4>
                            </a>
                            <p class="text-zinc-400 text-[13px] leading-relaxed mb-4 line-clamp-3">
                                ${repo.description || 'No description provided for this repository.'}
                            </p>
                        </div>
                        
                        <div class="flex flex-col gap-3">
                            <div class="flex items-center gap-4 text-zinc-500 text-xs uppercase tracking-wider">
                                <span class="flex items-center gap-1">
                                    <i class="fa-solid fa-code-fork"></i> ${repo.forks_count}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="fa-solid fa-microchip"></i> ${(repo.size / 1024).toFixed(1)} MB
                                </span>
                            </div>
                            <div class="flex items-center justify-between pt-3 border-t border-white/5">
                                <span class="text-zinc-600 text-xs uppercase">Updated ${lastUpdated}</span>
                                <a href="${repo.html_url}" target="_blank" class="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                    Source <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += projectCard;
        });

        $('#github-count').text(`${repos.length}`);

    } catch (error) {
        container.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-zinc-500">Unable to load GitHub projects. Please visit my profile directly.</p>
                <a href="https://github.com/${username}" class="text-primary font-bold mt-4 inline-block">View GitHub</a>
            </div>
        `;
    }
}

$(document).ready(function() {
  initParticles();
  loadProjects();
  loadThumbnails();
  loadTestimonials();
  loadAboutMe();
  initMobileMenu();
  fetchGitHubProjects()
});