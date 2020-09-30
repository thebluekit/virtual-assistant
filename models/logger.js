class Logger {
    errorColor = 'color: white; background-color: red'
    warningColor = 'color: white; background-color: orange'

    constructor(debugMode=false) {
        this.debugMode = debugMode;
    }

    getCurrentTime() {
        let today = new Date();
        let date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return '[' + date + ' ' + time + ']';
    }

    showLog(logColor, err) {
        let errorName = '%c' + ' ' + this.getCurrentTime() + ' ' + Object.getPrototypeOf(err.constructor).name + ' ';
        console.log(errorName, logColor, err.name + '\t' + err.message);
    }

    logError(err) {
        if (this.debugMode) {
            this.showLog(this.errorColor, err);
        }
        else {
            this.showLog(this.errorColor, err);
            throw err;
        }
    }

    logWarning(warning) {
        this.showLog(this.warningColor, warning);
    }
}

export let logger = new Logger(true);