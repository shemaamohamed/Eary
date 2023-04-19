const express = require("express");
const router = express.Router();
const fs = require("fs");
const cors = require('cors');
const multer = require('multer');
const randomstring = require('randomstring');
const connection = require('../DataBase/dbconnection');
const exams = [];
const quistions = [];
const exam_quistion = [];

module.exports = { express, router, fs, cors, multer, randomstring, connection, exams, quistions, exam_quistion };