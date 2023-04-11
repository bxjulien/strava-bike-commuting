import { xml2js, js2xml } from 'xml-js';

export async function fetchTodayGpx(path) {
  const response = await fetch(path);
  const gpxText = await response.text();
  const gpxData = xml2js(gpxText, { compact: true });

  const today = new Date();
  updateGpxDates(gpxData, today);

  const updatedGpxText = js2xml(gpxData, { compact: true, spaces: 2 });
  const updatedGpxBlob = new Blob([updatedGpxText], { type: 'application/gpx+xml' });

  return new File([updatedGpxBlob], 'updated-velotaf.gpx', { type: 'application/gpx+xml' });
}

function updateGpxDates(gpxData, newDate) {
  const trkseg = gpxData.gpx.trk.trkseg;

  if (Array.isArray(trkseg.trkpt)) {
    trkseg.trkpt.forEach((trkpt) => {
      const oldDate = new Date(trkpt.time._text);
      const updatedDate = new Date(newDate);

      updatedDate.setUTCHours(oldDate.getUTCHours(), oldDate.getUTCMinutes(), oldDate.getUTCSeconds());
      trkpt.time._text = updatedDate.toISOString();
    });
  }
}
