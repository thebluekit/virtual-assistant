import fs from 'fs';

export function readJSON(filePath) {
    if (typeof filePath !== "string") {
        return new FileTypeError(filePath);
    }

    let fileExtension = filePath.slice(filePath.length-5, filePath.length);
    if (fileExtension !== ".json" && fileExtension !== ".JSON") {
        return new FileExtensionError(filePath);
    }

    let rawData;
    try {
        rawData = fs.readFileSync(filePath);
        let jsonData = JSON.parse(rawData);
        return jsonData;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new NoSuchFileError(filePath);
        }
        else if (error instanceof SyntaxError) {
            throw new JSONSyntaxError(filePath);
        }
        else {
            throw error;
        }
    }
}

class JSONReadError extends Error {
    constructor(message) {
      super(message);
      this.name = "JSONReadError";
    }
}

class NoSuchFileError extends JSONReadError {
    constructor(property) {
      super('File "' + property + '" not found');
      this.name = "NoSuchFileError";
      this.property = property;
    }
}

class FileExtensionError extends JSONReadError {
    constructor(property) {
      super('File extension must be JSON');
      this.name = "FileExtensionError";
      this.property = property;
    }
}

class FileTypeError extends JSONReadError {
    constructor(property) {
      super('Type of path must be a string');
      this.name = "FileTypeError";
      this.property = property;
    }
}

class JSONSyntaxError extends JSONReadError {
    constructor(property) {
      super('Error on JSON syntax at file ' + property);
      this.name = "FileTypeError";
      this.property = property;
    }
}