# Field Mapping

Products:

- `id` -> product external ID;
- `globalCategory/category` -> category tree;
- `specs` -> product_specs;
- `advantages` -> product_advantages;
- `image/galleryImages` -> media metadata and product_media;
- `materialsAndNews.video` -> product_videos;
- `materialsAndNews.articles` and legacy typo `atricles` -> related content.

News/articles:

- `id` -> content external ID;
- `content[]` -> content_blocks.

Carousel:

- `id` -> slide external ID;
- `image` -> media metadata.

