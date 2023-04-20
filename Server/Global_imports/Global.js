const express = require("express");
const util = require("util");
const fs = require("fs");
const cors = require('cors');
const multer = require('multer');
const randomstring = require('randomstring');
const connection = require('../DataBase/dbconnection');

const query = util.promisify(connection.query).bind(connection);

const global_get = async (table, unique, value) => {
    return await query(`SELECT * FROM ${table} WHERE ${unique} LIKE '%${value || ""}%'`);
};

const global_insert = async (table, data) => {
    try {
        const insertion = await query("INSERT INTO " + table + " SET ?", data);
        return insertion.affectedRows > 0;
    }
    catch (err) {
        return 0;
    }
};

const global_delete = async (table, unique, value) => {
    try {
        const deletion = await query(`DELETE FROM ${table} WHERE ${unique}='${value}'`);
        return deletion.affectedRows > 0;
    }
    catch (err) {
        return 0;
    }
};

module.exports = { express, util, fs, cors, multer, randomstring, connection, query, global_get, global_insert, global_delete };