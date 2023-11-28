class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampiresFromOriginal = 0;
    let curVampire = this;

    while (curVampire.creator !== null) {
      curVampire = curVampire.creator;
      numberOfVampiresFromOriginal++;
    }

    return numberOfVampiresFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return vampire;
    } else if (this.creator === null || this === vampire.creator) {
      return this;
    } else if (vampire.creator === null || vampire === this.creator) {
      return vampire;
    } else {
      let offstring = this.isMoreSeniorThan(vampire) ? vampire.numberOfVampiresFromOriginal : this.numberOfVampiresFromOriginal;
      let curVampire = this;
      while (offstring > 0) {
        if (curVampire.creator === vampire.creator) {
          return curVampire.creator;
        } else {
          if (curVampire.isMoreSeniorThan(vampire)) {
            vampire = vampire.creator;
          } else if (curVampire.numberOfVampiresFromOriginal === vampire.numberOfVampiresFromOriginal) {
            curVampire = curVampire.creator;
            vampire = vampire.creator;
          } else {
            curVampire = curVampire.creator;
          }
        }
        offstring--;
      }
    }
  }
}

module.exports = Vampire;

