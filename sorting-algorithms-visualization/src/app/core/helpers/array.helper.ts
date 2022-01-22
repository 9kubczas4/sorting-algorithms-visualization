export class ArrayHelper {
  public static shuffle<T>(collection: T[]): T[] {
    let currentIndex = collection.length;
    let randomIndex = currentIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [collection[currentIndex], collection[randomIndex]] = [
        collection[randomIndex], collection[currentIndex]];
    }

    return collection;
  }

  public static clone<T>(collection: T[]): T[] {
    return [...collection];
  }
}
