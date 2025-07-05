// DOM elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const toast = document.getElementById("toast");
const copyBtn = document.querySelector(".copy-btn");

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  addKeyboardNavigation();
  addTooltips();
});

// Create animated particles
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = window.innerWidth < 768 ? 30 : 50; // Fewer particles on mobile
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Modal functions
const openModal = () => {
  modal.classList.add("active");
  overlay.classList.add("overlayactive");
  document.body.style.overflow = 'hidden';
  
  // Focus on first interactive element in modal
  const firstFocusable = modal.querySelector('input, button');
  if (firstFocusable) {
    firstFocusable.focus();
  }
};

const closeModal = () => {
  modal.classList.remove("active");
  overlay.classList.remove("overlayactive");
  document.body.style.overflow = 'auto';
  
  // Return focus to share button
  const shareBtn = document.querySelector('.btn-share');
  if (shareBtn) {
    shareBtn.focus();
  }
};

// Copy URL function with enhanced error handling
const copyUrl = async () => {
  const urlInput = document.querySelector('.share-url-input');
  const url = urlInput.value;
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      // Fallback for older browsers
      urlInput.select();
      urlInput.setSelectionRange(0, 99999);
      document.execCommand('copy');
    }
    
    // Show success state
    copyBtn.classList.add('copied');
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Copied!</span>';
    
    // Show toast
    showToast('Link copied to clipboard!');
    
    // Reset button after 2 seconds
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i><span>Copy</span>';
    }, 2000);
    
  } catch (error) {
    console.error('Copy failed:', error);
    showToast('Failed to copy link. Please try again.', 'error');
  }
};

// Show toast notification
const showToast = (message, type = 'success') => {
  const toast = document.getElementById('toast');
  const icon = type === 'success' ? 'check' : 'exclamation-triangle';
  const color = type === 'success' ? 'rgba(74, 222, 128, 0.9)' : 'rgba(239, 68, 68, 0.9)';
  
  toast.innerHTML = `
    <i class="fa-solid fa-${icon}"></i>
    <span>${message}</span>
  `;
  toast.style.background = color;
  toast.classList.add('show');
  
  // Auto-hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// Enhanced social sharing with better error handling
const shareOn = (platform) => {
  const url = encodeURIComponent('https://profile.subodhkangale.dev');
  const text = encodeURIComponent('Check out Subodh Kangale\'s profile!');
  const title = encodeURIComponent('Subodh Kangale - Developer Profile');
  
  let shareUrl = '';
  
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    case 'email':
      shareUrl = `mailto:?subject=${title}&body=${text}%20${url}`;
      break;
    case 'reddit':
      shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
      break;
    default:
      showToast('Sharing platform not supported', 'error');
      return;
  }
  
  // Open sharing window
  try {
    const shareWindow = window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    
    // Check if popup was blocked
    if (!shareWindow || shareWindow.closed || typeof shareWindow.closed === 'undefined') {
      showToast('Please allow popups to share', 'error');
      return;
    }
    
    showToast(`Sharing on ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`);
    
  } catch (error) {
    console.error('Share failed:', error);
    showToast('Failed to open sharing window', 'error');
  }
};

// Add keyboard navigation
const addKeyboardNavigation = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
    
    if (e.key === 'Enter' && e.target.classList.contains('social-btn')) {
      e.target.click();
    }
  });
  
  // Trap focus within modal
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusableElements = modal.querySelectorAll(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
};

// Add tooltips functionality
const addTooltips = () => {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = e.target.dataset.tooltip;
      
      document.body.appendChild(tooltip);
      
      const rect = e.target.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      
      setTimeout(() => tooltip.classList.add('show'), 100);
    });
    
    element.addEventListener('mouseleave', () => {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
};

// Native sharing API support
const nativeShare = async () => {
  const shareData = {
    title: 'Subodh Kangale - Developer Profile',
    text: 'Check out Subodh Kangale\'s profile!',
    url: 'https://profile.subodhkangale.dev'
  };
  
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast('Thanks for sharing!');
    } else {
      // Fallback to modal
      openModal();
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Share failed:', error);
      showToast('Sharing failed', 'error');
    }
  }
};

// Event listeners
document.addEventListener('click', (e) => {
  // Close modal when clicking overlay
  if (e.target.classList.contains('overlay')) {
    closeModal();
  }
  
  // Handle share button clicks
  if (e.target.classList.contains('btn-share')) {
    if (navigator.share && /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)) {
      nativeShare();
    } else {
      openModal();
    }
  }
  
  // Handle social platform sharing
  if (e.target.closest('.social-btn')) {
    const platform = e.target.closest('.social-btn').dataset.platform;
    shareOn(platform);
  }
  
  // Handle copy button
  if (e.target.closest('.copy-btn')) {
    copyUrl();
  }
  
  // Handle close button
  if (e.target.closest('.close-btn')) {
    closeModal();
  }
});

// Responsive particle adjustment
window.addEventListener('resize', () => {
  const particlesContainer = document.querySelector('.particles');
  const currentParticles = particlesContainer.querySelectorAll('.particle');
  const newParticleCount = window.innerWidth < 768 ? 30 : 50;
  
  if (currentParticles.length !== newParticleCount) {
    particlesContainer.innerHTML = '';
    createParticles();
  }
});

// Initialize URL input with current page URL
document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.querySelector('.share-url-input');
  if (urlInput) {
    urlInput.value = window.location.href;
  }
});