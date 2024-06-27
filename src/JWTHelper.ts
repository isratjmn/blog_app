import jwt from "jsonwebtoken";
import config from "./config";

const generateToken = (payload: { userId: string }, secret: string) => {
	if (!secret) {
		throw new Error("JWT secret is not defined");
	}

	const token = jwt.sign(payload, secret, {
		expiresIn: "1d",
	});

	return token;
};

const getUserInforFromToken = async (token: string) => {
	try {
		const userData = jwt.verify(token, config.jwt.secret as string) as {
			userId: string;
		};
		console.log(userData);
		return userData;
	} catch (error) {
		return null;
	}
};

export const JWTHelper = {
	generateToken,
	getUserInforFromToken,
};
