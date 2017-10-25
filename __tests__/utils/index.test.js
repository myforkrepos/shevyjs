import Shevy from '../../src'
import * as utils from '../../src/utils'
import { fontScalePresets } from '../../src/constants'

describe('Utils', () => {
  describe('getFontValue', () => {
    const { getFontValue } = utils

    it('returns a number of correct value', () => {
      const size = '16px'
      const value = getFontValue(size)

      expect(typeof value).toEqual('number')
      expect(value).toEqual(16)
    })
  })

  describe('getFontUnit', () => {
    const { getFontUnit } = utils

    describe('returns a string of correct unit type', () => {
      it('for px', () => {
        const unit = getFontUnit('16px')
        expect(unit).toEqual('px')
      })

      it('for em', () => {
        const unit = getFontUnit('1em')
        expect(unit).toEqual('em')
      })

      it('for rem', () => {
        const unit = getFontUnit('1rem')
        expect(unit).toEqual('rem')
      })
    })

    it('throws error for unsupported unit', () => {
      expect(() => { getFontUnit('1vw') }).toThrow()
    })
  })

  describe('trimArrayToMaxOf6', () => {
    const { trimArrayToMaxOf6 } = utils

    describe('array.length < 6', () => {
      const array = [1, 2, 3]

      it('returns array without modification', () => {
        expect(trimArrayToMaxOf6(array)).toEqual(array)
      })
    })

    describe('array.length === 6', () => {
      const array = [1, 2, 3, 4, 5, 6]

      it('returns array without modification', () => {
        expect(trimArrayToMaxOf6(array)).toEqual(array)
      })
    })

    describe('array.length > 6', () => {
      const array = [1, 2, 3, 4, 5, 6, 7]

      it('returns array with length === 6 and values removed from the end', () => {
        const trimmedArray = trimArrayToMaxOf6(array)
        const expectedArray = [1, 2, 3, 4, 5, 6]

        expect(trimmedArray.length).toEqual(6)
        expect(trimmedArray).toEqual(expectedArray)
      })
    })
  })

  describe('getFontScale', () => {
    const { getFontScale } = utils

    describe('baseFontScale as an array', () => {
      const baseFontScaleAsArray = [1, 2, 3, 4, 5, 6]

      it('returns array with modification', () => {
        expect(getFontScale(baseFontScaleAsArray)).toEqual(baseFontScaleAsArray)
      })
    })

    describe('baseFontScale as a string', () => {
      const baseFontScaleAsString = 'perfect_fourth'

      it('returns an array from fontScalePresets matching key', () => {
        expect(getFontScale(baseFontScaleAsString)).toEqual(fontScalePresets.perfect_fourth)
      })

      it('throws an error if key is not found', () => {
        expect(() => { getFontScale('not_a_preset') }).toThrow(/No Font Scale Preset Found/)
      })
    })
  })

  describe('calcHeadingFontSize', () => {
    const { calcHeadingFontSize } = utils
    const shevy = new Shevy()
    const factor = 2

    it('returns a string equal to factor * the default baseFontSize', () => {
      expect(calcHeadingFontSize(shevy, factor)).toEqual('32px')
    })
  })

  describe('calcHeadingLineHeight', () => {
    const { calcHeadingLineHeight } = utils
    const shevy = new Shevy()
    const factor = 2
    const calculatedLineHeight = calcHeadingLineHeight(shevy, factor)

    it('returns a number', () => {
      expect(typeof calculatedLineHeight).toEqual('number')
    })

    it('for a factor of 2, returns a line height of 1.125 (36/32)', () => {
      expect(calculatedLineHeight).toEqual(1.125)
    })
  })

  describe('calcHeadingMarginBottom', () => {
    const { calcHeadingMarginBottom } = utils

    describe('when addMarginBottom is false', () => {
      const addMarginBottom = false

      it('returns undefined', () => {
        const calculated = calcHeadingMarginBottom(null, 0, addMarginBottom)

        expect(calculated).not.toBeDefined()
      })
    })

    describe('when addMarginBottom is true', () => {
      const addMarginBottom = true
      const factor = 1

      describe('and baseFontSize is', () => {
        it('16px, returns 24px', () => {
          const shevy = new Shevy()
          const calculated = calcHeadingMarginBottom(shevy, factor, addMarginBottom)

          expect(calculated).toEqual('24px')
        })

        it('1em, returns 1.5em', () => {
          const shevy = new Shevy({
            baseFontSize: '1em'
          })
          const calculated = calcHeadingMarginBottom(shevy, factor, addMarginBottom)

          expect(calculated).toEqual('1.5em')
        })

        it('1rem, returns 1.5rem', () => {
          const shevy = new Shevy({
            baseFontSize: '1rem'
          })
          const calculated = calcHeadingMarginBottom(shevy, factor, addMarginBottom)

          expect(calculated).toEqual('1.5rem')
        })
      })
    })
  })
})
