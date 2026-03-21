export function generateBookingCode(): string {
  const prefix = process.env.BOOKING_CODE_PREFIX || 'BKNBT';
  const random = Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  return `${prefix}-${date}-${random}`;
}
