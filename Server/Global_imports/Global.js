const express = require("express");
const util = require("util");
const fs = require("fs");
const cors = require('cors');
const multer = require('multer');
const randomstring = require('randomstring');
const connection = require('../DataBase/dbconnection');

const query = util.promisify(connection.query).bind(connection);

const global_get = async (table, unique, value) => {
    try {
        return await query(`SELECT * FROM ${table} WHERE ${unique} = '${value}'`);
    } catch (err) {
        // console.log("global_get \n");
        // console.log(err);
        return false;
    }
};

const global_insert = async (table, set) => {
    try {
        const insertion = await query(`INSERT INTO ${table} SET ?`, set);
        return insertion.affectedRows > 0;
    }
    catch (err) {
        console.log("global_insert \n");
        console.log(err);
        return false;
    }
};

const global_update = async (table, set, unique, value) => {
    try {
        const update = await query(`UPDATE ${table} SET ? WHERE ${unique} = '${value}'`, set);
        return update.affectedRows > 0;
    }
    catch (err) {
        // console.log("global_update \n");
        // console.log(err);
        return false;
    }
};

const global_delete = async (table, unique, value) => {
    try {
        const deletion = await query(`DELETE FROM ${table} WHERE ${unique}='${value}'`);
        return deletion.affectedRows > 0;
    }
    catch (err) {
        console.log("global_delete\n");
        console.log(err);
        return false;
    }
};

module.exports = { express, util, fs, cors, multer, randomstring, connection, query, global_get, global_insert, global_delete, global_update };