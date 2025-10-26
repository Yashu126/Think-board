import ratelimit from "../Config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
        // const {success} = await ratelimit.limit(req.ip); // userid or req.ip or token
        const {success} = await ratelimit.limit("Some-key");
        if(!success) {
            return res.status(429).json({message: 'Too many requests. Please try again later.'});
        }
        next();
    }
    catch(error) {
        return res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}
export default rateLimiter;