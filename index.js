let store = {drivers: [], passengers: [], trips: []}

let driverId = 0

class Driver {
  constructor(name) {
    this.id = ++driverId
    this.name = name

    store.drivers.push(this)
  }

  trips() {
    return store.trips.filter(
      function(trip) {
        return trip.driverId === this.id;
      }.bind(this)
    );
    //returns all trips driver has taken
  }

  passengers() {
    //returns all passengers that a driver has taken - will need to use through relationship
    let passList = []
    for (let trip of this.trips()) {
      passList.push(trip.passenger());
    };
    return passList
  }
}

let passengerId = 0

class Passenger {
  constructor(name) {
    this.id = ++passengerId
    this.name = name

    store.passengers.push(this)
  }

  trips() {
    //returns all trips driver has taken
    return store.trips.filter(
      function(trip) {
        return trip.passengerId === this.id;
      }.bind(this)
    );
  }

  drivers() {
    //returns all drivers that a passenger has ridden with - use through relationship
    let drivList = [];
    for (let trip of this.trips()) {
      drivList.push(trip.driver());
    };
    return drivList
  }
}

let tripId = 0

class Trip {
  constructor(driver, passenger) {
    this.id = ++tripId
    this.driverId = driver.id
    this.passengerId = passenger.id

    store.trips.push(this)
  }

  driver() {
    //returns the driver of the trip
    return store.drivers.find(
      function(driver) {
        return driver.id === this.driverId;
      }.bind(this)
    );
  }

  passenger() {
    //returns the passenger of the trip
    return store.passengers.find(
      function(passenger) {
        return passenger.id === this.passengerId;
      }.bind(this)
    );
  }
}
