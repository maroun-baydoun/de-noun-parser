import parse from "de-noun-parser";

const feminineFixture = `{{de-noun|f||Küchen|Küchlein}}`;

const masculineFixture = `{{de-noun|m|Kühlschrankes|gen2=Kühlschranks|Kühlschränke}}`;

const neuterFixture = `{{de-noun|n|Flugzeugs|gen2=Flugzeuges|Flugzeuge}}`;

const fixtureWithDiminutive = `{{de-noun|f||Lampen|Lämpchen|dim2=Lämplein}}`;

const masculineFixtureWithGenderedForm = `{{de-noun|m|Briefträgers|Briefträger|f=Briefträgerin}}`;

const feminineFixtureWithGenderedForm = `{{de-noun|f||Studentinnen|m=Student}}`;

const feminineFixtureWithImplicitEnPlural = `{{de-noun|f}}`;

const masculineFixtureWithImplicitSGenetive = `{{de-noun|m||Honige}}`;

const neuterFixtureWithImplicitSGenetive = `{{de-noun|n||Zentren}}`;

const templates = [
  feminineFixture,
  feminineFixtureWithGenderedForm,
  feminineFixtureWithImplicitEnPlural,
  fixtureWithDiminutive,
  masculineFixture,
  masculineFixtureWithGenderedForm,
  masculineFixtureWithImplicitSGenetive,
  neuterFixture,
  neuterFixtureWithImplicitSGenetive,
];

document.addEventListener("DOMContentLoaded", () => {
  const demo = document.querySelector(".demo");

  demo.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() !== "button") {
      return;
    }
    const template = e.target.dataset.template;
    const parseResultContainer = document.querySelector(
      `.${e.target.dataset.parseResult}`
    );

    const parsed = parse(template);

    parseResultContainer.innerHTML = `<pre class="syntax-highlight-container"><code class="language-json">${JSON.stringify(
      parsed
    )}</code></pre>`;

    Prism.highlightElement(parseResultContainer.children[0].children[0]);

    e.target.style.display = "none";
  });

  demo.innerHTML = templates
    .map(
      (template, index) =>
        `<pre class="syntax-highlight-container demo-template-container"><code class="language-javascript">\`${template}\`</code></pre><div class="demo-parse-result-${index}"></div><button class="button" type="button" data-template="${template}" data-parse-result="demo-parse-result-${index}">Parse</button>`
    )
    .join(`<hr class="hr--medium"/>`);
});
