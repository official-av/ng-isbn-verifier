import { AbstractControl, ValidationErrors } from '@angular/forms';

const ISBN_REGEX = /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/;

const isbnValidator = ({ value }: AbstractControl): ValidationErrors | null => {
  // remove spaces and dashes
  const sanitizedValue = value?.replaceAll(' ', '')?.replaceAll('-', '');

  // check for length
  if (sanitizedValue.length !== 10 && sanitizedValue.length !== 13) {
    return { isbnLength: true };
  }

  // test with regex
  const hasValidFormat = ISBN_REGEX.test(value);
  if (!hasValidFormat) {
    return { isbnFormat: true };
  }

  // verify checksum
  return isISBNChecksumValid(sanitizedValue) ? null : { isbnChecksum: true };
};

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
 * @returns boolean: if isbn-10 string has valid checksum and is valid
 */
const isISBNTenChecksumValid = (isbn: string) => {
  const isbnArr = isbn?.split(''); // :: O(n)

  // store and separate last char from isbn for handling cases with char X or x :: O(1)
  const lastElement = isbnArr?.pop();
  // if last char is x or X store 10 else convert string to number :: O(1)
  const numericLastElement =
    lastElement?.toLowerCase() === 'x' ? 10 : Number(lastElement);

  // iterate and multiply first char with 10, second with 9.... and last with 2 as per checksum calculation ISBN-10 algo :: O(n)
  const sumOfFirstNineDigitsOfISBN = isbnArr?.reduce(
    (sum, current, index) => (sum += (10 - index) * Number(current)),
    0
  );

  // checksum is 11 - sumOfNineDigits%11 :: O(1)
  const checksum = 11 - (sumOfFirstNineDigitsOfISBN % 11);

  return checksum === numericLastElement; // :: O(1)
};

const isISBNThirteenChecksumValid = (isbn: string): boolean => {
  return false;
};

export default isbnValidator;
