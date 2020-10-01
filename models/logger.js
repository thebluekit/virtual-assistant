class Logger {
    errorColor = 'color: white; background-color: red'
    warningColor = 'color: white; background-color: orange'
    logColor = ''

    constructor(debugMode=false) {
        this.debugMode = debugMode;
        if (debugMode) {
            this.log("Logger started at debug mode")
        }
    }

    getCurrentTime() {
        let today = new Date();
        let date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return '%c' + ' [' + date + ' ' + time + '] ';
    }

    log(message) {
        console.log(this.getCurrentTime() + 'LOG ', this.logColor, message)
    }

    warn(message) {
        console.log(this.getCurrentTime() + 'WARN ', this.warningColor, message)
    }

    err(err) {
        console.log(this.getCurrentTime() + 'ERR ', this.errorColor, err.name + ': ' + err.message);
        if (!this.debugMode) {
            throw err;
        }
    }
}

export let logger = new Logger(true);