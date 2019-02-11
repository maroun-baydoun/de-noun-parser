import deNounParser from '../src/de-noun-parser';
import { feminineFixture, masculineFixture, neuterFixture } from './fixtures';

describe('de-noun-parser', () => {
  describe('parse', () => {
    it('returns parsed object for feminine noun', () => {
      const parsed = deNounParser(feminineFixture);

      expect(parsed).toEqual({
        gender: 'f',
        genetive: null,
        plural: 'Küchen',
      });
    });

    it('returns parsed object for masculine noun', () => {
      const parsed = deNounParser(masculineFixture);

      expect(parsed).toEqual({
        gender: 'm',
        genetive: 'Briefträgers',
        plural: 'Briefträger',
      });
    });

    it('returns parsed object for neuter noun', () => {
      const parsed = deNounParser(neuterFixture);

      expect(parsed).toEqual({
        gender: 'n',
        genetive: null,
        plural: 'Zentren',
      });
    });

    it('returns null when unable to parse', () => {
      const parsed = deNounParser('I am a random text');

      expect(parsed).toBeNull();
    });
  });
});
