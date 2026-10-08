import type { TrieStep, VisualTrieNode, AlgorithmMetadata } from '../types';

export const trieMetadata: AlgorithmMetadata = {
  id: 'trie-ds',
  name: 'Trie (Prefix Tree)',
  category: 'data-structures',
  visualizationType: 'trie',
  difficulty: 'Intermediate',
  prerequisites: ['Trees', 'Strings', 'Pointers', 'Prefix Matching'],
  timeComplexity: {
    best: 'O(k) [Insert/Search word of length k]',
    average: 'O(k)',
    worst: 'O(k)',
  },
  spaceComplexity: 'O(alphabet_size * k * n)',
  description:
    'A tree-like data structure used for efficient retrieval of keys in a dataset of strings. All descendants of a node share a common string prefix associated with that node.',
  keyIdea:
    'Instead of comparing whole strings, navigate character by character. Lookups depend strictly on the length of the query string k, independent of total words stored!',
  whenToUse: [
    'Autocomplete and search suggestion engines (Google search bar).',
    'Spell checkers and IP routing tables (longest prefix matching).',
    'Solving word games and Boggle solver dictionaries.',
  ],
  limitations: [
    'Substantial memory consumption if word prefixes do not overlap heavily.',
    'Slower cache locality than contiguous hash tables for exact string lookups.',
  ],
  sourceCode: {
    c: `// Trie in C
#define ALPHABET_SIZE 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    bool isEndOfWord;
} TrieNode;

TrieNode* createNode() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->isEndOfWord = false;
    for (int i = 0; i < ALPHABET_SIZE; i++) node->children[i] = NULL;
    return node;
}

void insert(TrieNode *root, const char *key) {
    TrieNode *p = root;
    for (int i = 0; key[i]; i++) {
        int index = key[i] - 'a';
        if (!p->children[index]) p->children[index] = createNode();
        p = p->children[index];
    }
    p->isEndOfWord = true;
}

bool search(TrieNode *root, const char *key) {
    TrieNode *p = root;
    for (int i = 0; key[i]; i++) {
        int index = key[i] - 'a';
        if (!p->children[index]) return false;
        p = p->children[index];
    }
    return (p != NULL && p->isEndOfWord);
}`,
    typescript: `// Trie in TypeScript
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd = false;
}

class Trie {
  root = new TrieNode();
  insert(word: string) {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) curr.children.set(ch, new TrieNode());
      curr = curr.children.get(ch)!;
    }
    curr.isEnd = true;
  }
}`,
  },
};

function cloneTrieNode(node: VisualTrieNode): VisualTrieNode {
  const children: Record<string, VisualTrieNode> = {};
  for (const [k, v] of Object.entries(node.children)) {
    children[k] = cloneTrieNode(v);
  }
  return {
    id: node.id,
    char: node.char,
    isEndOfWord: node.isEndOfWord,
    children,
  };
}

export function simulateTrie(): TrieStep[] {
  const root: VisualTrieNode = {
    id: 'root',
    char: 'ROOT',
    isEndOfWord: false,
    children: {},
  };

  const steps: TrieStep[] = [];

  steps.push({
    kind: 'trie',
    root: cloneTrieNode(root),
    activeNodeId: 'root',
    action: 'idle',
    description: 'Initialized empty Trie root node.',
    stats: { totalWords: 0 },
    codeLine: 12,
  });

  const wordsToInsert = ['cat', 'car', 'do'];

  let wordCount = 0;
  for (const word of wordsToInsert) {
    let curr = root;
    let path = '';

    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      path += ch;
      const isNew = !curr.children[ch];

      if (isNew) {
        curr.children[ch] = {
          id: `node-${path}`,
          char: ch,
          isEndOfWord: false,
          children: {},
        };
      }

      curr = curr.children[ch];
      const isLastChar = i === word.length - 1;
      if (isLastChar) {
        curr.isEndOfWord = true;
      }

      steps.push({
        kind: 'trie',
        root: cloneTrieNode(root),
        activeNodeId: curr.id,
        word,
        action: 'insert-char',
        description: `INSERT("${word}"): Processed character '${ch}' at depth ${i + 1}. ${isNew ? 'Created new branch node.' : 'Reusing existing prefix path.'}`,
        stats: { word, char: ch, totalWords: wordCount },
        codeLine: 18,
      });
    }

    wordCount++;
    steps.push({
      kind: 'trie',
      root: cloneTrieNode(root),
      activeNodeId: curr.id,
      word,
      action: 'end-of-word',
      description: `INSERT("${word}") complete! Marked node '${word[word.length - 1]}' as End-of-Word (isEndOfWord = true).`,
      stats: { totalWords: wordCount, wordInserted: word },
      codeLine: 21,
    });
  }

  // Search for "car"
  const searchWord = 'car';
  let searchCurr: VisualTrieNode | undefined = root;
  for (let i = 0; i < searchWord.length; i++) {
    const ch = searchWord[i];
    searchCurr = searchCurr?.children[ch];

    steps.push({
      kind: 'trie',
      root: cloneTrieNode(root),
      activeNodeId: searchCurr?.id,
      word: searchWord,
      action: 'search',
      description: `SEARCH("${searchWord}"): Checking char '${ch}' at level ${i + 1}. ${searchCurr ? 'Matched!' : 'Branch not found.'}`,
      stats: { searching: searchWord, char: ch, foundPrefix: !!searchCurr },
      codeLine: 28,
    });
  }

  steps.push({
    kind: 'trie',
    root: cloneTrieNode(root),
    activeNodeId: searchCurr?.id,
    word: searchWord,
    action: 'found',
    description: `SEARCH("${searchWord}") SUCCESS: Reached terminal node with isEndOfWord == true!`,
    stats: { found: true, searchTarget: searchWord },
    codeLine: 31,
  });

  return steps;
}
