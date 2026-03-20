type MapsLinkProps = {
  addressText?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  googlePlaceId?: string | null;
};

function buildGoogleMapsUrl({ addressText, latitude, longitude, googlePlaceId }: MapsLinkProps) {
  if (googlePlaceId) {
    return `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(googlePlaceId)}`;
  }

  if (typeof latitude === "number" && typeof longitude === "number") {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText ?? "")}`;
}

function buildRouteUrl({ addressText, latitude, longitude, googlePlaceId }: MapsLinkProps) {
  if (googlePlaceId) {
    return `https://www.google.com/maps/dir/?api=1&destination_place_id=${encodeURIComponent(googlePlaceId)}`;
  }

  if (typeof latitude === "number" && typeof longitude === "number") {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressText ?? "")}`;
}

export function MapsLink(props: MapsLinkProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={buildGoogleMapsUrl(props)} target="_blank" rel="noreferrer" className="cta-secondary">
        Відкрити в Google Maps
      </a>
      <a href={buildRouteUrl(props)} target="_blank" rel="noreferrer" className="cta-secondary">
        Побудувати маршрут
      </a>
    </div>
  );
}
