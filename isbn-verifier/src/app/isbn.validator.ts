import { AbstractControl, ValidationErrors } from '@angular/forms';

const ISBN_REGEX = /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/;

const isbnValidator = ({ value }: AbstractControl): ValidationErrors | null => {
  // remove spaces and dashes
  const sanitizedValue = value?.replaceAll(' ', '')?.replaceAll('-', '');

  // check for length
  if (sanitizedValue.length !== 10 && sanitizedValue.length !== 13) {
    return { isbnLength: true };
  }

  // TODO: test with regex
  // const hasValidFormat = ISBN_REGEX.test(value);
  // if (!hasValidFormat) {
  //   return { isbnFormat: true };
  // }

  // verify checksum
  return isISBNChecksumValid(sanitizedValue) ? null : { isbnChecksum: true };
};

/**
 * @alias isISBNChecksumValid
 * @description finds if isbn checksum is valid in O(n) time complexity
 * @param isbn: isbn-10 or isbn-13 string
 * @returns boolean: returns true if isbn string has valid checksum and is valid
 *  via consuming isISBNTenChecksumValid and isISBNThirteenChecksumValid
 */
const isISBNChecksumValid = (isbn: string): boolean => {
  const type = isbn.length;
  if (type === 10) {
    return isISBNTenChecksumValid(isbn);
  }
  if (type === 13) {
    return isISBNThirteenChecksumValid(isbn);
  }
  return false;
};

/**
 * @alias isISBNTenChecksumValid
 * @description finds if isbn10 checksum is valid in O(n) time complexity
 * @param isbn: isbn-10 string
 * @returns boolean: returns true if isbn-10 string has valid checksum and is valid
 */
const isISBNTenChecksumValid = (isbn: string) => {
  const isbnArray = isbn?.split(''); // :: O(n)

  // store and separate last char from isbn for handling cases with char X or x or 0 :: O(1)
  const lastElement = isbnArray?.pop();

  // if last char is x or X store 10, if its 0 store 11, else convert string to number :: O(1)
  const numericLastElement =
    lastElement?.toLowerCase() === 'x'
      ? 10
      : lastElement === '0'
      ? 11
      : Number(lastElement);

  // iterate and multiply first char with 10, second with 9.... and last with 2 as per checksum calculation ISBN-10 algo :: O(n), here n=9
  const sumOfFirstNineDigitsOfISBN = isbnArray?.reduce(
    (sum, current, index) => (sum += (10 - index) * Number(current)),
    0
  );

  // checksum is divide sumOfFirstNineDigits with 11 and subtract the remainder from 11 :: O(1)
  const checksum = 11 - (sumOfFirstNineDigitsOfISBN % 11);

  return checksum === numericLastElement; // :: O(1)
};

/**
 * @alias isISBNThirteenChecksumValid
 * @description finds if isbn13 checksum is valid in O(n) time complexity
 * @param isbn: isbn-13 string
 * @returns boolean: returns true if isbn-13 string has valid checksum and is valid
 */
const isISBNThirteenChecksumValid = (isbn: string): boolean => {
  const isbnArray = isbn?.split('');

  // store and separate last char from isbn for handling cases with 0 :: O(1)
  const lastElement = isbnArray?.pop();

  // if last char 0 store 10 else convert string to number :: O(1)
  const numericLastElement = lastElement === '0' ? 10 : Number(lastElement);

  // Multiply each of the first 12 digits by 1 or 3, alternating as you move from left to right, and sum the results :: O(n), here n=12
  const sumOfFirstTwelveDigits = isbnArray.reduce(
    (sum, current, index) =>
      (sum += getOneForOddAndThreeForEvenNumber(index + 1) * Number(current)),
    0
  );

  // checksum is divide sumOfFirstTwelveDigits with 10 and subtract the remainder from 10 :: O(1)
  const checksum = 10 - (sumOfFirstTwelveDigits % 10);

  return checksum === numericLastElement; // :: O(1)
};

const getOneForOddAndThreeForEvenNumber = (n: number) => (n % 2 === 0 ? 3 : 1);

export default isbnValidator;
