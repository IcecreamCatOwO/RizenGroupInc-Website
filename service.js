document.addEventListener('DOMContentLoaded', () => {
  const rentBoxes = document.querySelectorAll('.rent-list .rent-box');
  const btnMore = document.querySelector('.btn-more');
  const filterButtons = document.querySelectorAll('.btn-filter');
  const searchBar = document.querySelector('.search-bar');

  let visibleCount = 3;
  let activeFilter = 'ALL';
  let searchQuery = '';

  // Apply filtering and searching logic
  function updateVisibility() {
    let count = 0;
    rentBoxes.forEach(box => {
      const type = box.querySelector('.v-type h3').textContent.trim().toUpperCase();
      const name = box.querySelector('.v-name h3').textContent.toLowerCase();

      const matchesFilter = (activeFilter === 'ALL' || type === activeFilter);
      const matchesSearch = name.includes(searchQuery.toLowerCase());

      if (matchesFilter && matchesSearch) {
        box.style.display = (count < visibleCount) ? 'flex' : 'none';
        box.classList.remove('hidden-rent-box');
        count++;
      } else {
        box.style.display = 'none';
      }
    });

    const totalMatches = [...rentBoxes].filter(box => {
      const type = box.querySelector('.v-type h3').textContent.trim().toUpperCase();
      const name = box.querySelector('.v-name h3').textContent.toLowerCase();
      return (activeFilter === 'ALL' || type === activeFilter) && name.includes(searchQuery.toLowerCase());
    });

    if (visibleCount >= totalMatches.length) {
      btnMore.style.display = 'none';
    } else {
      btnMore.style.display = 'block';
    }
  }

  // Filter button logic
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter = btn.dataset.filter.toUpperCase();
      visibleCount = 3;
      updateVisibility();
    });
  });

  // Search bar logic
  searchBar.addEventListener('input', () => {
    searchQuery = searchBar.value;
    visibleCount = 3;
    updateVisibility();
  });

  // See More button logic
  btnMore.addEventListener('click', () => {
    visibleCount += 3;
    updateVisibility();
  });

  // Initial render
  updateVisibility();
});