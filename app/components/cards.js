import Link from 'next/link';
import { imageUrl, tourImages, formatPrice, startingPrice } from '../../lib/data';

// Landing-page tour card (reference design): image, location, duration, starting rate, rating
export function LandingTourCard({ tour, tag }) {
  const img = tourImages(tour)[0];
  const price = startingPrice(tour);
  return (
    <Link href={tour.url} className="tcard">
      <div className="ph">
        {img ? <img src={img} alt={tour.name} loading="lazy" /> : null}
        {tag && <span className="tag">{tag}</span>}
      </div>
      <div className="b">
        <h3>{tour.name}</h3>
        <div className="loc">📍 {tour.destination}</div>
        <div className="meta2">
          <span>{tour.availability || 'Every day'}</span>
          {tour.duration && <span>· {tour.duration}</span>}
        </div>
        <div className="priceline">
          <div className="p">{price != null ? `$${price}` : '—'} <small>Starting rate · Incl. taxes</small></div>
          {tour.rating != null && <div className="r">★ {tour.rating} ({tour.reviewCount})</div>}
        </div>
      </div>
    </Link>
  );
}

export function TourCard({ tour }) {
  const img = tourImages(tour)[0];
  const price = formatPrice(tour);
  return (
    <Link href={tour.url} className="card">
      {img ? <img className="thumb" src={img} alt={tour.name} loading="lazy" /> : <div className="thumb" />}
      <div className="body">
        <div className="title">{tour.name}</div>
        {tour.description && <div className="desc">{tour.description}</div>}
        <div className="meta">
          {tour.duration && <span>⏱ {tour.duration}</span>}
          {tour.rating != null && <span className="badge star">★ {tour.rating} ({tour.reviewCount})</span>}
        </div>
        {price && (
          <div className="price">
            {price.from && <small>from </small>}{price.currency === 'USD' ? '$' : ''}{price.value}
            <small> / person</small>
          </div>
        )}
      </div>
    </Link>
  );
}

// Card built from a category's lightweight tour-card listing
export function CardFromListing({ item }) {
  const price = item.startingPrice;
  return (
    <Link href={item.url} className="card">
      <div className="body">
        <div className="title">{item.name}</div>
        {item.shortDescription && <div className="desc">{item.shortDescription}</div>}
        <div className="meta">
          {item.duration && <span>⏱ {item.duration}</span>}
          {item.rating != null && <span className="badge star">★ {item.rating} ({item.reviewCount})</span>}
        </div>
        {price != null && <div className="price"><small>from </small>${price}<small> / person</small></div>}
      </div>
    </Link>
  );
}

export function CategoryCard({ category }) {
  const img = imageUrl(category.bannerImage);
  return (
    <Link href={category.url} className="cat-card">
      {img ? <img src={img} alt={category.name} loading="lazy" /> : <div style={{ background: '#cdd' }} />}
      <div className="scrim" />
      <div className="label">
        {category.name}
        {category.tripCount != null && <small>{category.tripCount} trips</small>}
      </div>
    </Link>
  );
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
