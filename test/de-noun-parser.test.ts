import deNounParser, { TemplateNotFoundError } from "../src/de-noun-parser";

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
} from "./fixtures";

describe("de-noun-parser", () => {
  describe("parse", () => {
    it("returns parsed object for feminine noun", () => {
      const parsed = deNounParser(feminineFixture);

      expect(parsed).toEqual({
        gender: "f",
        genetive: null,
        plural: "Küchen",
        diminutive: "Küchlein",
        template: {
          text: "{{de-noun|f||Küchen|Küchlein}}",
          arguments: "f||Küchen|Küchlein",
          startIndex: 12,
          endIndex: 41,
        },
      });
    });

    it("returns parsed object for masculine noun", () => {
      const parsed = deNounParser(masculineFixture);

      expect(parsed).toEqual({
        gender: "m",
        genetive: "Kühlschrankes",
        plural: "Kühlschränke",
        template: {
          text: "{{de-noun|m|Kühlschrankes|gen2=Kühlschranks|Kühlschränke}}",
          arguments: "m|Kühlschrankes|gen2=Kühlschranks|Kühlschränke",
          startIndex: 12,
          endIndex: 69,
        },
      });
    });

    it("returns parsed object for neuter noun", () => {
      const parsed = deNounParser(neuterFixture);

      expect(parsed).toEqual({
        gender: "n",
        genetive: "Flugzeugs",
        plural: "Flugzeuge",
        template: {
          text: "{{de-noun|n|Flugzeugs|gen2=Flugzeuges|Flugzeuge}}",
          arguments: "n|Flugzeugs|gen2=Flugzeuges|Flugzeuge",
          startIndex: 12,
          endIndex: 60,
        },
      });
    });

    it("returns parsed object for noun with diminutive", () => {
      const parsed = deNounParser(fixtureWithDiminutive);

      expect(parsed).toEqual({
        diminutive: "Lämpchen",
        gender: "f",
        genetive: null,
        plural: "Lampen",
        template: {
          text: "{{de-noun|f||Lampen|Lämpchen|dim2=Lämplein}}",
          arguments: "f||Lampen|Lämpchen|dim2=Lämplein",
          startIndex: 12,
          endIndex: 55,
        },
      });
    });

    it("returns parsed object for masculine noun with gendered form", () => {
      const parsed = deNounParser(masculineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        gender: "m",
        genderedForm: "Briefträgerin",
        genetive: "Briefträgers",
        plural: "Briefträger",
        template: {
          text: "{{de-noun|m|Briefträgers|Briefträger|f=Briefträgerin}}",
          arguments: "m|Briefträgers|Briefträger|f=Briefträgerin",
          startIndex: 12,
          endIndex: 65,
        },
      });
    });

    it("returns parsed object for feminine noun with gendered form", () => {
      const parsed = deNounParser(feminineFixtureWithGenderedForm);

      expect(parsed).toEqual({
        gender: "f",
        genderedForm: "Student",
        genetive: null,
        plural: "Studentinnen",
        template: {
          text: "{{de-noun|f||Studentinnen|m=Student}}",
          arguments: "f||Studentinnen|m=Student",
          startIndex: 12,
          endIndex: 48,
        },
      });
    });

    it("returns parsed object for feminine noun with implicit -en plural", () => {
      const parsed = deNounParser(feminineFixtureWithImplicitEnPlural);

      expect(parsed).toEqual({
        gender: "f",
        genetive: null,
        plural: "-en",
        template: {
          text: "{{de-noun|f}}",
          arguments: "f",
          startIndex: 12,
          endIndex: 24,
        },
      });
    });

    it("returns parsed object for masculine noun with implicit -s genetive", () => {
      const parsed = deNounParser(masculineFixtureWithImplicitSGenetive);

      expect(parsed).toEqual({
        gender: "m",
        genetive: "-s",
        plural: "Honige",
        template: {
          text: "{{de-noun|m||Honige}}",
          arguments: "m||Honige",
          startIndex: 12,
          endIndex: 32,
        },
      });
    });

    it("returns parsed object for neuter noun with implicit -s genetive", () => {
      const parsed = deNounParser(neuterFixtureWithImplicitSGenetive);

      expect(parsed).toEqual({
        gender: "n",
        genetive: "-s",
        plural: "Zentren",
        template: {
          text: "{{de-noun|n||Zentren}}",
          arguments: "n||Zentren",
          startIndex: 12,
          endIndex: 33,
        },
      });
    });

    it("throws TemplateNotFoundError when unable to parse", () => {
      expect(() => deNounParser("I am a random text")).toThrow(
        new TemplateNotFoundError(
          "de-noun template not found in provided wikitext"
        )
      );
    });
  });
});
