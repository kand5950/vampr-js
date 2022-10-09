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
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0
    let originalVampire = this;

    while(originalVampire.creator) {
      originalVampire = originalVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }


  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (vampire.numberOfVampiresFromOriginal < this.numberOfVampiresFromOriginal) {
      return false;
    } else {
      return true;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name) {
      return this;
    }

    for (let vamp of this.offspring) {
      const vampire = vamp.vampireWithName(name);

      if(vampire) {
        return vampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendents = 0;

    for (let vamp of this.offspring) {
      descendents += vamp.totalDescendents + 1;
    }
    return descendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let convertedAfter1980 = []

    if (this.yearConverted > 1980) {
      convertedAfter1980.push(this);
    }

    for (let vamp of this.offspring) {
      convertedAfter1980 = convertedAfter1980.concat(vamp.allMillennialVampires);
    }
    return convertedAfter1980;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
  }
}


module.exports = Vampire;

