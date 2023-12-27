export const validISBNTenValues = [
  '0-596-52068-9',
  '1-55404-295-X',
  '1566199093',
];

export const invalidISBNTenValues = [
  '596-52368-9', // invalid length
  '1-55 04-X95-D', // invalid format
  '1-55404-495-X', // invalid checksum
];

export const validISBNThirteenValues = [
  '978-0-545-01022-1',
  '978-1-56619-909-4',
  '9780140266900',
];

export const invalidISBNThirteenValues = [
  '123-1-56619-909', // invalid length
  '978-1-56619- 09-X', // invalid format
  '978-1-22619-909-4', // invalid checksum
];
