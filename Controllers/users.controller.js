import Users from "../models/users.js";
import * as crypto from "crypto";
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';
import {KEY} from "../config.js";


class UserController {
    async userCreate(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            console.log(req.body);
            const {username, password} = req.body;
            const existingUser = await Users.findOne({username});
            if (existingUser) {
                throw {message: 'this login is busy'};
            }
            const hashPassword = crypto.pbkdf2Sync(password, KEY, 7, 16, 'sha512').toString('hex')
            const user = await Users.create({...req.body, password: hashPassword});
            console.log(user)
            return res.json(user);
        } catch (err) {
            console.log(err.message)
            res.status(400).json({message: err.message});
        }
    }

    async getToken(req, res) {
        try {
            const {username, password} = req.body;
            const user = await Users.findOne({username});
            if (user) {
                const hashPassword = crypto.pbkdf2Sync(password, KEY, 7, 16, 'sha512').toString('hex');
                if (user.password === hashPassword) {
                    const token = jwt.sign({userId: user._id}, KEY, {expiresIn: '24h'});
                    return res.json({token});
                }
            }
            throw {message: 'wrong login or password'};
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }


    async getUser(req, res) {
        try {
            const {token} = req.body;
            const {userId} = jwt.verify(token, KEY);
            const user = await Users.findOne({_id: userId});
            if (user) {
                return res.json(user);
            }
            throw {message: 'User not found'};
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    async updateUser(req, res) {
        try {
            const {token, username, password, firstName, lastName, email, family, photo} = req.body;
            const {userId} = jwt.verify(token, KEY);
            const oldUser = await Users.findOne({_id: userId});
            if (!oldUser) {
                throw {message: 'User not found'};
            }

            const users = await Users.find({username});

            if (username !== oldUser.username && users.length > 0) {
                throw {message: 'this login is busy'};
            }

            const filter = {_id: userId};
            const hashPassword = crypto.pbkdf2Sync(password, KEY, 7, 16, 'sha512').toString('hex');
            const update = {username, password: hashPassword, firstName, lastName, email, family, photo};

            const user = await Users.findOneAndUpdate(filter, update, {new: true});
            res.json(user);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const {token} = req.body;
            const {userId} = jwt.verify(token, KEY);

            const result = await Users.deleteOne({_id: userId});

            if (result.deletedCount > 0) {
                return res.json(user);
            }

            throw {message: 'something going wrong'}
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

}

export default new UserController();
