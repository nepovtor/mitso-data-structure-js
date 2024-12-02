module.exports = class BloomFilter {
  constructor(size) {
    this.size = size || 100;
    this.store = this.createStore(this.size);
  }

  createStore(size) {
    return new Array(size).fill(false);
  }

  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * 31 + item.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  hash2(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * 17 + item.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  hash3(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * 33 + item.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  getHashValues(item) {
    const hashes = [this.hash1(item), this.hash2(item), this.hash3(item)];
    return hashes.sort((a, b) => a - b); // Убедись, что значения отсортированы
  }

  insert(item) {
    const hashValues = this.getHashValues(item);
    for (const hash of hashValues) {
      this.store[hash] = true;
    }
  }

  mayContain(item) {
    const hashValues = this.getHashValues(item);
    return hashValues.every((hash) => this.store[hash] === true);
  }
};
