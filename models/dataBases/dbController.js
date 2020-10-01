export class DBController {
    constructor(options) {
        this.openConnection(options);
    }

    openConnection(options) {}

    async closeConnection() {}

    async directQuerry(querry) {}

    async checkConnection() {}
}

export class DataBaseError extends Error {
    constructor(message) {
      super(message);
      this.name = "DataBaseError";
    }
}

export class DBConnectionError extends DataBaseError {
    constructor(property) {
      super('Wrong connection parameters, database is offline or internet connection problems');
      this.name = "DBConnectionError";
      this.property = property;
    }
}