import { getFirstName, isValidPassword } from '../src/utils/user'

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Clint Losee')

  expect(firstName).toBe('Clint')
})

test('Should return first name when given first name', () => {
  const firstName = getFirstName('Clint')

  expect(firstName).toBe('Clint')
})

test('Should reject password shorter than 8 characters', () => {
  const isValid = isValidPassword('1234567')

  expect(isValid).toBe(false)
})

test('Should reject password that contains the word password', () => {
  const isValid = isValidPassword('password')

  expect(isValid).toBe(false)
})

test('Should correctly validate a valid password', () => {
  const isValid = isValidPassword('test12345')

  expect(isValid).toBe(true)
})
