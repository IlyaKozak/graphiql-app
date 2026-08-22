const TYPES = [
  { test: /^\s/, class: 'whitespace' },
  { test: /^[{}]/, class: 'brace' },
  { test: /^[\[\]]/, class: 'bracket' },
  { test: /^:/, class: 'colon' },
  { test: /^,/, class: 'comma' },
  { test: /^-?\d+(?:\.\d+)?(?:e[+\-]?\d+)?/i, class: 'numberLiteral' },
  { test: /^"(?:\\.|[^"])*"(?=:)/, class: 'stringKey' },
  { test: /^"(?:\\.|[^"])*"/, class: 'stringLiteral' },
  { test: /^true|false/, class: 'booleanLiteral' },
  { test: /^null/, class: 'null' },
  { test: /^./, class: 'invalid' },
];

type TOKEN = {
  class: string;
  token: string;
  matches: string[];
};

function lexer(code = '') {
  const tokens: TOKEN[] = [];

  do {
    TYPES.some((type) => {
      const match = type.test.exec(code);

      if (match) {
        const value = match[0];
        tokens.push({
          class: type.class,
          token: value,
          matches: match.slice(1),
        });

        code = code.substring(value.length);
        return true;
      }
    });
  } while (code.length);

  return tokens;
}

function parser(tokens: TOKEN[] = []) {
  let result = '';
  let token = null;

  while ((token = tokens.shift())) {
    result += `<span class="highlight ${token.class}">${token.token}</span>`;
  }

  return result;
}

const jsonHighlight = (json: string) => {
  return parser(lexer(json));
};

export default jsonHighlight;
