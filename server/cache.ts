export default class Cache<K, V> extends Map<K, V & { stale: boolean }> {
  update(key: K, value: V) {
    const current = this.get(key) ?? { stale: true };

    this.set(key, {
      ...current,
      ...value,
      stale: false,
    });
  }

  banWave() {
    for (const [key, value] of this) {
      if (value.stale) this.delete(key);

      this.set(key, {
        ...value,
        stale: true,
      });
    }
  }
}
