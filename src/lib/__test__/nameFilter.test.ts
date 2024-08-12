import { Capitalize, RemoveMultipleSpaces, RemoveSpecialCharacters } from "../filterName"

describe('Capitalize', () => {
  it('in case of empty string', () => {
    expect(Capitalize('')).toBe('')
  })
  it('in case of a single word', () => {
    expect(Capitalize('hello')).toBe('Hello')
  })
  it('in case of a sentence', () => {
    expect(Capitalize('hello world')).toBe('Hello World')
  })
})

describe('RemoveSpecialCharacters', () => {
  it('in case of empty string', () => {
    expect(RemoveSpecialCharacters('')).toBe('')
  })
  it('in case of a sentence with special characters', () => {
    expect(RemoveSpecialCharacters('hello world!')).toBe('hello world')
  })
  it('in case of a sentence with multiple special characters', () => {
    expect(RemoveSpecialCharacters('hello world!@#')).toBe('hello world')
  })
})

describe('RemoveMultipleSpaces', () => {
  it('in case of empty string', () => {
    expect(RemoveMultipleSpaces('')).toBe('')
  })
  it('in case only using one space, it should not change', () => {
    expect(RemoveMultipleSpaces('hello world')).toBe('hello world')
  })
  it('in case of a sentence with multiple spaces', () => {
    expect(RemoveMultipleSpaces('hello    world')).toBe('hello world')
  })
})
