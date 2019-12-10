import deNounParser from '../src/de-noun-parser';
import {
  feminineFixture,
  feminineFixtureWithGenderedForm,
  fixtureWithDiminutive,
  masculineFixture,
  masculineFixtureWithGenderedForm,
  neuterFixture,
  feminineFixtureWithImplicitEnPlural,
} from './fixtures';

describe('de-noun-parser', () => {
  describe('parse', () => {
    it('returns parsed object for feminine noun', () => {
      const parsed = deNounParser(feminineFixture);

      expect(parsed).toEqual({
        diminutive: null,
        gender: 'f',
        genderedForm: null,
        genetive: null,
        plural: 'Küchen',
      });
    });

    it('returns parsed object for masculine noun', () => {
      const parsed = deNounParser(masculineFixture);

      expect(parsed).toEqual({
        diminutive: null,
        gender: 'm',
        genderedForm: null,
        genetive: null,
        plural: 'Honige',
      });
    });

    it('returns parsed object for neuter noun', () => {
      const parsed = deNounParser(neuterFixture);

      expect(parsed).toEqual({
        diminutive: null,
        gender: 'n',
        genderedForm: null,
        genetive: null,
        plural: 'Zentren',
      });
    });

    it('returns parsed object for noun with diminutive', () => {
      const parsed = deNounParser(fixtureWithDiminutive);

      expect(parsed).toEqual({
        diminutive: 'Lämpchen',
        gender: 'f',
        genderedForm: null,
        genetive: null,
        plural: 'Lampen',
      });
    });

    it('returns parsed object for masculine noun with gendered form', () => {
      const parsed = deNounParser(masculineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        diminutive: null,
        gender: 'm',
        genderedForm: 'Briefträgerin',
        genetive: 'Briefträgers',
        plural: 'Briefträger',
      });
    });

    it('returns parsed object for feminine noun with gendered form', () => {
      const parsed = deNounParser(feminineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        diminutive: null,
        gender: 'f',
        genderedForm: 'Student',
        genetive: null,
        plural: 'Studentinnen',
      });
    });

    it('returns parsed object for feminine noun with implicit -en plural', () => {
      const parsed = deNounParser(feminineFixtureWithImplicitEnPlural);

      expect(parsed).toEqual({
        diminutive: null,
        gender: 'f',
        genderedForm: null,
        genetive: null,
        plural: '-en',
      });
    });

    it('returns null when unable to parse', () => {
      const parsed = deNounParser('I am a random text');

      expect(parsed).toBeNull();
    });
  });
});
