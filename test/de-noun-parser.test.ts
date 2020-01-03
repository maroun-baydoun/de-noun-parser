import deNounParser, { UnrecognisedGenderError } from '../src/de-noun-parser';

import {
  feminineFixture,
  feminineFixtureWithGenderedForm,
  fixtureWithDiminutive,
  masculineFixture,
  masculineFixtureWithGenderedForm,
  neuterFixture,
  feminineFixtureWithImplicitEnPlural,
  masculineFixtureWithImplicitSGenetive,
  neuterFixtureWithImplicitSGenetive,
} from './fixtures';

describe('de-noun-parser', () => {
  describe('parse', () => {
    it('returns parsed object for feminine noun', () => {
      const parsed = deNounParser(feminineFixture);

      expect(parsed).toEqual({
        gender: 'f',
        genetive: null,
        plural: 'Küchen',
        diminutive: 'Küchlein',
      });
    });

    it('returns parsed object for masculine noun', () => {
      const parsed = deNounParser(masculineFixture);

      expect(parsed).toEqual({
        gender: 'm',
        genetive: 'Kühlschrankes',
        plural: 'Kühlschränke',
      });
    });

    it('returns parsed object for neuter noun', () => {
      const parsed = deNounParser(neuterFixture);

      expect(parsed).toEqual({
        gender: 'n',
        genetive: 'Flugzeugs',
        plural: 'Flugzeuge',
      });
    });

    it('returns parsed object for noun with diminutive', () => {
      const parsed = deNounParser(fixtureWithDiminutive);

      expect(parsed).toEqual({
        diminutive: 'Lämpchen',
        gender: 'f',
        genetive: null,
        plural: 'Lampen',
      });
    });

    it('returns parsed object for masculine noun with gendered form', () => {
      const parsed = deNounParser(masculineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        gender: 'm',
        genderedForm: 'Briefträgerin',
        genetive: 'Briefträgers',
        plural: 'Briefträger',
      });
    });

    it('returns parsed object for feminine noun with gendered form', () => {
      const parsed = deNounParser(feminineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        gender: 'f',
        genderedForm: 'Student',
        genetive: null,
        plural: 'Studentinnen',
      });
    });

    it('returns parsed object for feminine noun with implicit -en plural', () => {
      const parsed = deNounParser(feminineFixtureWithImplicitEnPlural);

      expect(parsed).toEqual({
        gender: 'f',
        genetive: null,
        plural: '-en',
      });
    });

    it('returns parsed object for masculine noun with implicit -s genetive', () => {
      const parsed = deNounParser(masculineFixtureWithImplicitSGenetive);

      expect(parsed).toEqual({
        gender: 'm',
        genetive: '-s',
        plural: 'Honige',
      });
    });

    it('returns parsed object for neuter noun with implicit -s genetive', () => {
      const parsed = deNounParser(neuterFixtureWithImplicitSGenetive);

      expect(parsed).toEqual({
        gender: 'n',
        genetive: '-s',
        plural: 'Zentren',
      });
    });

    it('throws UnrecognisedGenderError when unable to parse', () => {
      expect(() => deNounParser('I am a random text')).toThrow(
        new UnrecognisedGenderError('Expected m, f or n, but recieved I am a ra'),
      );
    });
  });
});
