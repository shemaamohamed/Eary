const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../DataBase/dbconnection");
const randomstring = require("randomstring");
const sendMail = require("../Helpers/sendMail");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../dotenv");
const { unlinkfile } = require("../Global_imports/file_upload");
const {
  query,
  global_get,
  global_insert,
  global_update,
  global_delete,
} = require("../Global_imports/Global");

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    unlinkfile(req.file);
    return res.status(400).json({ errors: errors.array() });
  }
  if (!req.file) {
    return res.status(400).json({ errors: "file is not send" });
  }
  const path = "'" + `public\\\\images\\\\${req.file.filename}` + "'";
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result && result.length) {
        unlinkfile(req.file);
        return res.status(409).send({
          msg: "user already in use",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(400).send({
              msg: err.message,
            });
          } else {
            const phone = `${req.body.phone || "NULL"}`;
            db.query(
              `INSERT INTO users (name,email,password,image,phone) VALUES ('${
                req.body.name
              }',${db.escape(req.body.email)},${db.escape(
                hash
              )},${path},${phone});`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: err,
                  });
                }
                let mailSubject = "mail verification";
                const randomToken = randomstring.generate();
                let content =
                  "<p> hi" +
                  req.body.name +
                  ', please <a href="http://localhost:4000/mail-verification?token=' +
                  randomToken +
                  '"> Verify</a> your mail.';
                sendMail(req.body.email, mailSubject, content);
                db.query(
                  "UPDATE users set token=? where email=?",
                  [randomToken, req.body.email],
                  function (error, result, fields) {
                    if (error) {
                      return res.status(400).send({
                        msg: err,
                      });
                    }
                  }
                );
                return res.status(200).send({
                  msg: "user registered",
                });
              }
            );
          }
        });
      }
    }
  );
};

const verifyMail = (req, res) => {
  var token = req.query.token;
  db.query(
    "SELECT * FROM users where token=? limit 1",
    token,
    function (error, result, fields) {
      if (error) {
        console.log(error.message);
      }

      if (result.length > 0) {
        db.query(`
            UPDATE users SET token = null, is_verified = 1 WHERE id = '${result[0].id}'
         `);
        return res.render("mail-verification", { message: "mail verified" });
      } else {
        return res.render("404");
      }
    }
  );
};

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: err.message,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "email or password incorrect",
        });
      }
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            return res.status(400).send({
              msg: err,
            });
          }
          if (bResult) {
            //admin
            const token = jwt.sign(
              { id: result[0]["id"], is_admin: result[0]["is_admin"] },
              JWT_SECRET,
              { expiresIn: "1h" }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id ='${result[0]["id"]}'`
            );
            delete result[0].password;
            return res.status(200).send({
              msg: "logged in",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "email or password incorrect",
          });
        }
      );
    }
  );
};

const getUser = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, JWT_SECRET);

  db.query(
    "SELECT * FROM users where id=?",
    decode.id,
    function (error, result, fields) {
      if (error) throw error;

      return res.status(200).send({
        success: true,
        data: result[0],
        message: "fetch successfully",
      });
    }
  );
};

const user_put = async (req, res) => {
  let status = 400,
    message = "the operation was not successful",
    msg = "";
  const user = res.locals.user;
  const data = req.body;
  const valid =
    data.old_password && data.new_password
      ? true
      : !data.old_password && !data.new_password
      ? true
      : false;
  if (valid) {
    const data_sql = {
      name: data.newname || user.name,
      phone: data.phone || user.phone,
      updated_at: new Date(),
    };
    const userpass = await query(
      `SELECT password FROM users WHERE name='${user.name}'`
    );
    if (data.old_password && data.new_password) {
      const old_password = await bcrypt.compare(
        data.old_password || "",
        userpass[0].password
      );
      if (old_password && data.new_password.length >= 8) {
        const new_passwrod = await bcrypt.hash(data.new_password, 10);
        data_sql.password = new_passwrod;
      } else if (
        (!old_password && data.new_password) ||
        data.new_password.length < 8
      ) {
        msg =
          (!old_password ? " , old password is not correct" : "") +
          (data.new_password.length < 8
            ? " , the new password is required min 8 length"
            : "");
      }
    }
    const otherusers = await query(
      `SELECT name,email,phone FROM users WHERE name='${
        data.newname || ""
      }'AND name != '${user.name}' OR phone=${data.phone || null} AND phone!=${
        user.phone
      } `
    );
    if (otherusers[0]) {
      message =
        (otherusers.find((q) => q.name == data.newname)
          ? "name already in use"
          : "") +
        (otherusers.find((q) => q.phone == data.phone)
          ? " , phone already in use"
          : "");
    } else {
      const update =
        msg == ""
          ? await global_update("users", data_sql, "name", user.name)
          : false;
      if (update) {
        status = 200;
        message = "user updated";
      } else {
        message = "faild to update" + msg;
      }
    }
  } else {
    message = `you have to send the ${
      !data.old_password ? "old" : "new"
    } password`;
  }
  res.status(status).send(message);
};

const forgetpassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  var email = req.body.email;
  db.query(
    "SELECT * FROM users where email=? limit 1",
    email,
    function (error, fields, result) {
      if (error) {
        return res.status(400).json({ message: error });
      }

      if (res.length > 0) {
        let mailSubject = "forget password";
        const randomstring = randomstring.generate();
        let content =
          "<p>hello " +
          result[0].name +
          'please <a href"http://localhost:4000/reset-password?token=' +
          randomstring +
          '">click here</a> to reset your password</p> ';
        sendMail(email, mailSubject, content);

        db.query(`
                DELETE FROM password-resets where email=${db.escape(
                  result[0].email
                )}')
            `);

        db.query(`
                INSERT INTO password-resets (email, token) VALUES(${db.escape(
                  result[0].email
                )}, '${randomstring}')
            `);

        return res.status(200).send({
          message: "email send successfully for reset your password",
        });
      }

      return res.status(401).send({
        message: "email does not exist",
      });
    }
  );
};
const resetpasswordload = (req, res) => {
  try {
    var token = req.query.token;
    if (token == undefined) {
      res.render("404");
    }
    db.query(
      `SELECT * FROM passwrod_resets where token=? limit 1`,
      token,
      function (error, result, fields) {
        if (error) {
          console.log(error);
        }
        if (result !== undefined && result.length > 0) {
          db.query(
            "SELECT * FROM users where email=? limit 1",
            result[0].email,
            function (error, result, fields) {
              if (error) {
                console.log(error);
              }
              res.render("reset-password", { user: result[0] });
            }
          );
        } else {
          res.render("404");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const resetpassword = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    res.render("reset-password", {
      error_message: "pasword not matching",
      user: { id: req.body.user_id, email: req.body.email },
    });
  }
  bcrypt.hash(req.body.confirm_password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(`DELETE FROM password_resets where email = '${req.body.email}'`);
    db.query(
      `UPDATE users SET password = '${hash}' where id = '${req.body.user_id}'`
    );
    res.render("message", { message: "password reset successfully" });
  });
};

module.exports = {
  register,
  verifyMail,
  login,
  getUser,
  user_put,
  forgetpassword,
  resetpasswordload,
  resetpassword,
};
