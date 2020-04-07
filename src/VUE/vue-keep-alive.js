class LRUCache {
  constructor(maxnum) {
    this.maxnum = maxnum > 0 ? maxnum : 1;
    this.cache = {};
    this.keys = [];
  }

  get(key) {
    if (this.cache[key]) {
      this.remove(this.keys, key);
      this.keys.push(key);
      return this.cache[key];
    }
    return -1;
  }

  put(key, val) {
    this.cache[key] = val;

    if (!this.cache[key]) {
      this.keys.push(key);
    } else {
      this.remove(this.keys, key);
      this.keys.push(key);
    }
    if (this.keys.length > this.maxnum) {
      delete this.cache[this.keys.shift()];
    }
  }

  remove(arr, item) {
    const idx = arr.indexOf(item);
    if (idx >= 0) {
      return arr.splice(idx, 1);
    }
    return [];
  }
}
