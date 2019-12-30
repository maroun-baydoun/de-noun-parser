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
        definitions: [
          'kitchen (room)',
          'cuisine (cooking traditions)',
        ],
      });
    });

    it('returns parsed object for masculine noun', () => {
      const parsed = deNounParser(masculineFixture);

      expect(parsed).toEqual({
        gender: 'm',
        genetive: 'Kühlschrankes',
        plural: 'Kühlschränke',
        definitions: [
          'refrigerator',
        ],
      });
    });

    it('returns parsed object for neuter noun', () => {
      const parsed = deNounParser(neuterFixture);

      expect(parsed).toEqual({
        gender: 'n',
        genetive: 'Flugzeugs',
        plural: 'Flugzeuge',
        definitions: [
          'airplane',
        ],
      });
    });

    it('returns parsed object for noun with diminutive', () => {
      const parsed = deNounParser(fixtureWithDiminutive);

      expect(parsed).toEqual({
        diminutive: 'Lämpchen',
        gender: 'f',
        genetive: null,
        plural: 'Lampen',
        definitions: [
          'lamp, light (piece of furniture, or fixture mounted on a wall or ceiling, holding one or more electric light sockets)',
          'bulb, light bulb (evacuated glass bulb containing a metal filament or an article that resembles such a bulb) (Short for Glühlampe)',
        ],
      });
    });

    it('returns parsed object for masculine noun with gendered form', () => {
      const parsed = deNounParser(masculineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        gender: 'm',
        genderedForm: 'Briefträgerin',
        genetive: 'Briefträgers',
        plural: 'Briefträger',
        definitions: [
          'mailman, postman, postie, letter carrier, mail carrier, mailperson (male or of unspecified sex)',
        ],
      });
    });

    it('returns parsed object for feminine noun with gendered form', () => {
      const parsed = deNounParser(feminineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        gender: 'f',
        genderedForm: 'Student',
        genetive: null,
        plural: 'Studentinnen',
        definitions: [
          'student (female) (person attending lectures at a university)',
        ],
      });
    });

    it('returns parsed object for feminine noun with implicit -en plural', () => {
      const parsed = deNounParser(feminineFixtureWithImplicitEnPlural);

      expect(parsed).toEqual({
        gender: 'f',
        genetive: null,
        plural: '-en',
        definitions: [
          'meeting',
          'session',
          'assembly',
          'sitting',
        ],
      });
    });

    it('returns parsed object for masculine noun with implicit -s genetive', () => {
      const parsed = deNounParser(masculineFixtureWithImplicitSGenetive);

      expect(parsed).toEqual({
        gender: 'm',
        genetive: '-s',
        plural: 'Honige',
        definitions: [
          'honey',
        ],
      });
    });

    it('returns parsed object for neuter noun with implicit -s genetive', () => {
      const parsed = deNounParser(neuterFixtureWithImplicitSGenetive);

      expect(parsed).toEqual({
        gender: 'n',
        genetive: '-s',
        plural: 'Zentren',
        definitions: [
          'center, centre; central point',
          '(politics) the centre, the moderate political parties',
          '(politics) the Centre Party, a Catholic political party in pre-war Germany',
          '(mathematics) the centre of a group, ring, Lie algebra, etc.',
          '(chess) the spaces d4, d5, e4, e5 on a chessboard',
        ],
      });
    });

    it('throws UnrecognisedGenderError when unable to parse', () => {
      expect(() => deNounParser('I am a random text')).toThrow(
        new UnrecognisedGenderError('Expected m, f or n, but recieved I am a ra'),
      );
    });
  });
});
