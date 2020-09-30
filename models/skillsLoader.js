import {logger} from './logger.js'
import {readJSON} from './jsonLoader.js'

export class Skill {
    constructor(skillPath) {
        this.loadSkill(skillPath);
    }

    loadSkill(skillPath) {
        try {
            let skillDescription = readJSON(skillPath);
            this.checkSkillStructure(skillDescription);
            

        }
        catch (err) {
            logger.logError(new SkillUploadError(err.message));
        }
    }

    checkSkillStructure(skillDescription) {
        let optionsCounter = function(options) {
            let counter = 0;
            for (let option of options) {
                counter += typeof skillDescription[option] !== "undefined" ? 1 : 0;
            }
            return counter
        }

        let requiredOptions = ["name", "language", "sentences"];
        let optionalOptions = ["action", "entity", "context"];

        if (requiredOptions.length != optionsCounter(requiredOptions)) {
            return false
        }

        if (optionalOptions.length != optionsCounter(optionalOptions)) {
            logger.logWarning(new SkillStructureError(err.message));
        }

        return true;
    }
}

class SkillError extends Error {
    constructor(message) {
      super(message);
      this.name = "SkillError";
    }
}

class SkillUploadError extends SkillError {
    constructor(property) {
        super(property);
        this.name = "SkillUploadError";
        this.property = property;
      }
}

class SkillStructureError extends SkillError {
    constructor(property) {
        super(property);
        this.name = "SkillStructureError";
        this.property = property;
      }
}