import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const user = {
      name: request.body.name,
      username: request.body.username,
      password: hashedPassword,
      email: request.body.email,
    };
    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ msg: "SignUp has been successful" });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error while signup the user" + error });
  }
};

export const loginUser = async (request, response) => {
  
  try {
    let user = await User.findOne({
      username: request.body.username
    });
  
    if (!user) {
      return response.status(400).json({ msg: "Username does not match" });
    }
    const matchPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (matchPassword) {
      const accessToken = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.REFRESH_SECRET_KEY
      );

      // const newToken = new Token({ token: refreshToken });
      // await newToken.save();

      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return response.status(500).json({ msg: "Error while logging in user" });
  }
};

// export const logoutUser = async (request, response) => {
//   const token = request.body.token;
//   await Token.findByIdAndDelete(token._id);

//   response.status(204).json({ msg: "logout successfull" });
// };
