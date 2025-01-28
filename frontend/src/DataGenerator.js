import { faker as fakerEN } from "@faker-js/faker";
import { faker as fakerFR } from "@faker-js/faker/locale/fr"; // French locale
import { faker as fakerES } from "@faker-js/faker/locale/es"; // Spanish locale

const localeMapping = {
  "en-US": fakerEN,
  "fr-FR": fakerFR,
  "es-ES": fakerES,
};

// Generate random sentences using localized faker methods
const generateRandomSentence = (localeFaker) => {
  // Use different methods to generate random text for better localization
  const options = [
    () => localeFaker.lorem.sentence(3),
    () => localeFaker.hacker.phrase(),
    () => localeFaker.commerce.productDescription(),
    () => localeFaker.company.catchPhrase(),
    () => `${localeFaker.word.adjective()} ${localeFaker.word.noun()} ${localeFaker.word.verb()}`,
    () => localeFaker.lorem.words(4),
  ];

  const randomMethod = options[Math.floor(Math.random() * options.length)];
  let sentence = randomMethod();

  // Clean up the sentence (remove extra periods, ensure proper capitalization)
  sentence = sentence.replace(/\.+$/, '');
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';

  return sentence;
};

// Check if the locale is available
const checkLocale = (locale) => {
  try {
    const testName = locale.person.firstName();
    return !!testName;
  } catch (error) {
    return false;
  }
};

// Generate reviews using faker
const generateReviews = (localeFaker, reviewCount) => {
  return Array.from(
    { length: reviewCount }, 
    () => generateRandomSentence(localeFaker)
  );
};

// Generate books with localized reviews
export const generateBooks = (
  seed,
  language,
  avgLikes,
  avgReviews,
  page = 1,
  pageSize = 20
) => {
  let localeFaker = localeMapping[language] || fakerEN;
  
  // Handle fallback for unsupported locales
  if (!checkLocale(localeFaker)) {
    console.error(`Locale ${language} not supported, falling back to English`);
    localeFaker = fakerEN;
    language = "en-US";
  }
  
  // Set the seed for deterministic data generation
  localeFaker.seed(seed + page);
  
  // Generate books with localized reviews
  const books = Array.from({ length: pageSize }, () => ({
    isbn: localeFaker.string.uuid(),
    title: localeFaker.company.catchPhrase(),
    authors: `${localeFaker.person.firstName()} ${localeFaker.person.lastName()}`,
    publisher: localeFaker.company.name(),
    likes: Math.floor(localeFaker.number.float({ min: 0, max: avgLikes * 2 })),
    reviews: generateReviews(localeFaker, avgReviews),
  }));
  
  return books;
};