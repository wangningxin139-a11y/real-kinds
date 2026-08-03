const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

export function assetUrl(path: string) {
  return `${assetPrefix}${path}`;
}
