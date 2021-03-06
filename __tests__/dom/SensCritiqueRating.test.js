import { test } from '@jest/globals'
import { SensCritiqueRating } from '../../src/dom/SensCritiqueRating'

const successDataset = [
  ['2,3', 23],
  ['8.6', 86],
  ['10', 100],
  ['0,1', 1],
  ['0', 0]
]
test.each(successDataset)('It should convert SensCritique note (%s) in percentage (%s)', (sensCritiqueNote, expected) => {
  const sensCritiqueRating = new SensCritiqueRating({})
  const noteflixScore = sensCritiqueRating.ratingInPercent(sensCritiqueNote)

  expect(noteflixScore).toBe(expected)
})

const errorDataset = [
  ['2,,5', null],
  [null, null],
  [undefined, null],
  ['11', null]
]
test.each(errorDataset)('It should convert wrong SensCritique note (%s) to null', (sensCritiqueNote, expected) => {
  const sensCritiqueRating = new SensCritiqueRating({})
  const noteflixScore = sensCritiqueRating.ratingInPercent(sensCritiqueNote)

  expect(noteflixScore).toBe(expected)
})

test('It should create instance with rights rating', () => {
  const sensCritiqueRating = new SensCritiqueRating({
    rating: '7'
  })

  expect(sensCritiqueRating.rating).toBe(70)
})

test('It should render node with rights info', () => {
  const sensCritiqueRating = new SensCritiqueRating({
    rating: '8,5',
    redirect: 'https://google.fr',
    hashId: 'XXX'
  })
  const sensCritiqueRatingRendered = sensCritiqueRating.render()

  expect(sensCritiqueRatingRendered).not.toBeNull()
  expect(sensCritiqueRatingRendered.getAttribute('href')).toBe('https://google.fr')
  expect(sensCritiqueRatingRendered.getAttribute('id')).toBe('XXX')
  expect(sensCritiqueRatingRendered.childNodes[1].innerText).toBe('85')
})
