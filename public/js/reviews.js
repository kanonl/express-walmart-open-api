(function () {
    let d = document;

    fetch(`/reviews/${itemId}`).then(response => response.json()).then(data => {
        if (data) {
            data.reviews.forEach(review => {
                let reviewItem = d.createElement('div');
                reviewItem.classList.add('review-item');

                if (review.title) {
                    let title = d.createElement('div');
                    title.classList.add('review-lead');
                    title.appendChild(d.createTextNode(review.title));
                    reviewItem.appendChild(title);
                }

                let rating = d.createElement('img');
                rating.setAttribute('src', `http://i2.walmartimages.com/i/CustRating/${review.overallRating.rating}.gif`);
                reviewItem.appendChild(rating)

                let reviewText = d.createElement('p');
                review.reviewText = `${review.reviewText}<br><b>&mdash; ${review.reviewer}</b>`;
                reviewText.innerHTML = review.reviewText;
                reviewItem.appendChild(reviewText);

                d.querySelector('.reviews').appendChild(reviewItem);
            });

            let productUrl = d.createElement('a');
            productUrl.setAttribute('href', data.productUrl);
            productUrl.classList.add('productUrl');
            productUrl.appendChild(d.createTextNode('See all customer reviews'));
            d.querySelector('.reviews').appendChild(productUrl);
        }
    }).catch(console.error);
})();