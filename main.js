// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Takes a number and a DNA array and stores their values in an object
const pAequorFactory = (number, dnaArray) => {
  return {
    specimenNum: number,
    dna: dnaArray,
    // Randomly changes a single DNA base in the object when called
    mutate() {
      const randomBase = Math.floor(Math.random() * 15);
      if (this.dna[randomBase] === 'A') {
        while (this.dna[randomBase] === 'A') {
          this.dna.splice(randomBase, 1, returnRandBase());
        }
      }
      if (this.dna[randomBase] === 'T') {
        while (this.dna[randomBase] === 'T') {
          this.dna.splice(randomBase, 1, returnRandBase());
        }
      }
      if (this.dna[randomBase] === 'C') {
        while (this.dna[randomBase] === 'C') {
          this.dna.splice(randomBase, 1, returnRandBase());
        }
      }
      if (this.dna[randomBase] === 'G') {
        while (this.dna[randomBase] === 'G') {
          this.dna.splice(randomBase, 1, returnRandBase());
        }
      }
      return this.dna;
    },
    // Compare the current specimen with a previously registered one
    compareDNA(other) {
      // pAequor always has 15 DNA bases, so check how many of those are the same
      let matchingDNA = 0;
      for (x in this.dna) {
        if (this.dna[x] === other.dna[x]) {
          matchingDNA ++;
        }
      }
      const percentEqual = ((matchingDNA / 15) * 100).toFixed(2);
      // compareDNA sends a log, instead of a return statement
      console.log (`specimen ${this.specimenNum} and specimen ${other.specimenNum} have ${percentEqual}% DNA in common`);
    },
    // Determine if the subject is likely to survive
    willLikelySurvive() {
      let winningDNA = 0;
      // pAequor is more like to survive if it's DNA is at least 60% C or G
      for (x in this.dna) {
        if (this.dna[x] === 'C' || this.dna[x] === 'G') {
          winningDNA ++;
        }
      }
      const survivalChance = ((winningDNA / 15) * 100).toFixed(2);
      if (survivalChance >= 60) {
        return true;
      }
      return false;
    }
  };
};

// Return a given number of pAequor that can survive
const massProducePA = (number) => {
  let pAequorStorage = [];
  let pAequor = null;
  let x = 1;
  do {
    pAequor = pAequorFactory(x, mockUpStrand());
    if (pAequor.willLikelySurvive()) {
      pAequorStorage.push(pAequor);
      x ++;
    }
  } while (x <= number);
  return pAequorStorage;
}

// Reserved for testing
console.log(massProducePA(30));


