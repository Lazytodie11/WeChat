// CDN/Asset base URL configuration
// Use environment variable ASSET_BASE_URL first, fall back to empty string.
const ASSET_BASE_URL = process.env.ASSET_BASE_URL || '';

module.exports = { ASSET_BASE_URL };

