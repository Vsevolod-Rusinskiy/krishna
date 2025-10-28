// Krishna - Modern Construction Website JavaScript
// Clean vanilla JavaScript without dependencies
// test

(function() {
  'use strict'

  // DOM Elements
  const navToggle = document.getElementById('nav-toggle')
  const navList = document.getElementById('nav-list')
  const heroSlider = document.getElementById('hero-slider')
  const tabButtons = document.querySelectorAll('.tab__btn')
  const tabPanels = document.querySelectorAll('.tab__panel')
  const statNumbers = document.querySelectorAll('.stat-item__number')
  const contactForm = document.querySelector('.contact-form')

  // Mobile Navigation Toggle
  function initMobileNav() {
    if (navToggle && navList) {
      navToggle.addEventListener('click', function() {
        navList.classList.toggle('nav__list--open')
        navToggle.classList.toggle('nav__toggle--active')
      })

      // Close mobile nav when clicking on links
      const navLinks = navList.querySelectorAll('.nav__link')
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navList.classList.remove('nav__list--open')
          navToggle.classList.remove('nav__toggle--active')
        })
      })

      // Close mobile nav when clicking outside
      document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
          navList.classList.remove('nav__list--open')
          navToggle.classList.remove('nav__toggle--active')
        }
      })
    }
  }

  // Hero Slider
  function initHeroSlider() {
    if (!heroSlider) return

    const slides = heroSlider.querySelectorAll('.hero__slide')
    let currentSlide = 0
    const slideInterval = 5000 // 5 seconds

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('hero__slide--active', i === index)
      })
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }

    // Auto-advance slides
    if (slides.length > 1) {
      setInterval(nextSlide, slideInterval)
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1
        showSlide(currentSlide)
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    })
  }

  // Tabs Functionality
  function initTabs() {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab')
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('tab__btn--active'))
        tabPanels.forEach(panel => panel.classList.remove('tab__panel--active'))
        
        // Add active class to clicked button and corresponding panel
        this.classList.add('tab__btn--active')
        const targetPanel = document.getElementById(targetTab)
        if (targetPanel) {
          targetPanel.classList.add('tab__panel--active')
        }
      })
    })
  }

  // Animated Counter
  function animateCounter(element, target, duration = 2000) {
    const start = 0
    const increment = target / (duration / 16) // 60 FPS
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current).toLocaleString()
    }, 16)
  }

  // Stats Counter Animation
  function initStatsCounter() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target
          const target = parseInt(element.getAttribute('data-count'))
          animateCounter(element, target)
          observer.unobserve(element) // Only animate once
        }
      })
    }, {
      threshold: 0.5
    })

    statNumbers.forEach(stat => {
      observer.observe(stat)
    })
  }

  // Form Handling
  function initContactForm() {
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault()
        
        // Get form data
        const formData = new FormData(this)
        const data = Object.fromEntries(formData.entries())
        
        // Simple validation
        const requiredFields = this.querySelectorAll('[required]')
        let isValid = true
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('form-input--error')
            isValid = false
          } else {
            field.classList.remove('form-input--error')
          }
        })
        
        if (isValid) {
          // Show success message
          showNotification('Сообщение отправлено успешно!', 'success')
          this.reset()
        } else {
          showNotification('Пожалуйста, заполните все обязательные поля', 'error')
        }
      })
    }
  }

  // Notification System
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div')
    notification.className = `notification notification--${type}`
    notification.textContent = message
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 24px',
      borderRadius: '6px',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: '1000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out',
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    })
    
    document.body.appendChild(notification)
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)'
    }, 100)
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // Smooth Scrolling for Anchor Links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })
  }

  // Header Scroll Effect
  function initHeaderScroll() {
    const header = document.querySelector('.header')
    if (!header) return

    let lastScrollY = window.scrollY

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 100) {
        header.classList.add('header--scrolled')
      } else {
        header.classList.remove('header--scrolled')
      }
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.classList.add('header--hidden')
      } else {
        header.classList.remove('header--hidden')
      }
      
      lastScrollY = currentScrollY
    })
  }

  // Lazy Loading for Images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]')
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.getAttribute('data-src')
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      })
    })
    
    images.forEach(img => imageObserver.observe(img))
  }

  // Search Functionality
  function initSearch() {
    const searchForm = document.querySelector('.search-form')
    const searchInput = document.querySelector('.search-form__input')
    
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const query = searchInput.value.trim()
        
        if (query) {
          // Here you would typically send the query to your search endpoint
          showNotification(`Поиск по запросу: "${query}"`, 'info')
          // For demo purposes, we'll just show a notification
        }
      })
    }
  }

  // Performance Optimization: Debounce Function
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Resize Handler
  const handleResize = debounce(() => {
    // Handle responsive adjustments if needed
    if (window.innerWidth > 768) {
      navList.classList.remove('nav__list--open')
      navToggle.classList.remove('nav__toggle--active')
    }
  }, 250)

  // Initialize all functionality when DOM is ready
  function init() {
    initMobileNav()
    initHeroSlider()
    initTabs()
    initStatsCounter()
    initContactForm()
    initSmoothScrolling()
    initHeaderScroll()
    initLazyLoading()
    initSearch()
    
    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Add loading class removal
    document.body.classList.add('loaded')
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

})()