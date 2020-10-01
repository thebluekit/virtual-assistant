import dotenv from 'dotenv';

import {Skill} from './models/skills/skillsLoader.js'
import {Neo4jDataBase} from './models/dataBases/neo4jController.js'

dotenv.config();

const neo4jOptions = {
    link: process.env.DB_LINK,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

let neo4j = new Neo4jDataBase(neo4jOptions);

// let skill = new Skill('skill.json')
