document.addEventListener('DOMContentLoaded', function() {
  const fabMenuTrigger = document.querySelector('.lios-fab-menu-trigger');
  const fabMenuContainer = document.querySelector('.lios-fab-menu-container');
  const fabMenuItems = document.querySelectorAll('.lios-fab-menu-item');
  
  if (!fabMenuTrigger || !fabMenuContainer) return;
  
  // Hide menu items by default
  fabMenuItems.forEach(item => {
    item.style.display = 'none';
  });
  
  // Toggle menu on trigger click
  fabMenuTrigger.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = fabMenuContainer.classList.contains('open');
    
    if (isOpen) {
      // Close menu
      fabMenuContainer.classList.remove('open');
      fabMenuItems.forEach(item => {
        item.style.display = 'none';
      });
    } else {
      // Open menu
      fabMenuContainer.classList.add('open');
      fabMenuItems.forEach(item => {
        item.style.display = 'flex';
      });
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!fabMenuContainer.contains(e.target)) {
      fabMenuContainer.classList.remove('open');
      fabMenuItems.forEach(item => {
        item.style.display = 'none';
      });
    }
  });
  
  // Close menu when menu items are clicked
  fabMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      // Close the menu when a menu item is clicked
      fabMenuContainer.classList.remove('open');
      fabMenuItems.forEach(menuItem => {
        menuItem.style.display = 'none';
      });
    });
  });
});
