import neo4j from 'neo4j-driver';

import {DBController, DBConnectionError} from "./dbController.js"
import {logger} from "../logger.js"

export class Neo4jDataBase  extends DBController {
    openConnection(options) {
        let link = options.link
        let user = options.user
        let password = options.password

        this.driver = new neo4j.driver(link, neo4j.auth.basic(user, password));
        this.checkConnection();
    }

    async closeConnection() {
        await this.driver.close();
    }

    async directQuerry(querry, check=false) {
        this.session = this.driver.session();
        try {
            let data = await this.session.run(querry);
            if (!check) {
                logger.log(querry, data);
            }
            return data;
        }
        catch (err) {
            if (err.code === 'ServiceUnavailable') {
                throw err;
            }
        }
        finally {
            await this.session.close();
        }
    }

    async checkConnection() {
        const testQuerry = 'MATCH (n) RETURN n';
        try {
            await this.directQuerry(testQuerry, true);
            logger.log('Successful connected to Neo4jDB');
        }
        catch (err) {
            logger.err(new DBConnectionError());
        }
    }
}