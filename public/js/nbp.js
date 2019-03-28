(function () {
    let d = document;

    fetch(`/nbp/${itemId}`).then(response => response.json()).then(data => {
        if (data) {
            if (data.errors) throw new Error(data.errors[0].message);

            for (let i = 0; i < data.length; i++) {
                let item = d.createElement('div');
                item.classList.add('item');
                item.setAttribute('data-itemId', data[i].itemId);

                let thumbnailImage = d.createElement('img');
                thumbnailImage.classList.add('thumbnailImage');
                thumbnailImage.classList.add('img-fluid');
                thumbnailImage.setAttribute('src', data[i].mediumImage);
                thumbnailImage.setAttribute('title', data[i].name);
                thumbnailImage.setAttribute('alt', data[i].name);

                let url = `/p/${data[i].itemId}/${encodeURI(data[i].name.toString().toLowerCase().replace(/[^a-z0-9 ]/ig, '').replace(/\s+/g, '-'))}`
                let anchor = d.createElement('a');
                anchor.setAttribute('href', url);
                anchor.appendChild(thumbnailImage);

                let name = d.createElement('div');
                let nameValue = data[i].name;
                if (nameValue.length > 50) {
                    nameValue = `${nameValue.substring(0, 50)} ...`;
                }
                name.appendChild(d.createTextNode(nameValue));
                name.classList.add('name');

                item.appendChild(anchor);
                item.appendChild(name);

                d.querySelector('.owl-carousel').appendChild(item);
            }

            $(document).ready(function () {
                $('.owl-carousel').owlCarousel({
                    loop: true,
                    margin: 10,
                    items: 5,
                    autoplay: true,
                    slideBy: 5
                });
            });
        }
    }).catch(err => { });

    let thumbnails = d.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', event => {
            let src = event.target.src;
            let url = new URL(src);
            url.searchParams.set('odnHeight', 450);
            url.searchParams.set('odnWidth', 450);

            d.querySelector('.largeImage').src = url.toString();
            setThumbnailBorderColor('#eeeeee');
            thumbnail.style.borderColor = '#007bff';
        });
    });

    const setThumbnailBorderColor = color => {
        let thumbnails = d.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.style.borderColor = color;
        });
    };
})();