  const starContainer = document.getElementById('starContainer');
  const reviewList = document.getElementById('reviewList');
  const submitBtn = document.getElementById('submitBtn');
  const reviewText = document.getElementById('reviewText');
  let selectedRating = 0;

  // Create 5 stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.innerText = '★';
    star.classList.add('star', 'me-1');
    star.dataset.rating = i;

    star.addEventListener('click', () => {
      selectedRating = i;
      document.querySelectorAll('.star').forEach((s, idx) => {
        s.classList.toggle('selected', idx < i);
      });
    });

    starContainer.appendChild(star);
  }

  // Handle submit
  submitBtn.addEventListener('click', () => {
    const review = reviewText.value.trim();
    if (review && selectedRating > 0) {
      const reviewEntry = document.createElement('div');
      reviewEntry.classList.add('review-entry');
      reviewEntry.innerHTML = `
        <div class="review-stars">${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</div>
        <p>${review}</p>
      `;
      reviewList.prepend(reviewEntry);

      reviewText.value = '';
      selectedRating = 0;
      document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
    } else {
      alert("Please write a review and select a rating.");
    }
  });