const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [
      new Band('Metallica'),
      new Band('Heroes del silencio'),
      new Band('Bon Jovi'),
      new Band('Breaking Benjami')
    ]
  }

  addBand(name) {
    const band = new Band(name)
    this.bands.push(band)
    return this.bands
  }

  removeBand(id) {
    this.bands = this.bands.filter(band => band.id !== id)
  }

  getBands() {
    return this.bands
  }

  increseVotes(id) {
    this.bands.map(band => {
      if (band.id === id) {
        band.votes += 1
      }

      return band
    })
  }

  changeName(id, newName) {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.name = newName
      }

      return band
    })
  }
}

module.exports = BandList