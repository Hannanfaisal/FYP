const Joi = require("joi");
const FeedbackModel = require("../models/feedback");


const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

const feedbackController = {

    async create(req, res) {

        const createSchema = Joi.object({
            rating: Joi.number().min(5).required(),
            content: Joi.string().required(),
            voter: Joi.string().regex(mongodbIdRegex).required(),
            election: Joi.string().regex(mongodbIdRegex).required(),

        });

        const validate = createSchema.validate(req.body);
        if (validate.error) {
            return res.status(401).json({ message: validate.error.message })
        }

        try {

            const { rating, content, voter, election } = req.body;

            const newFeedback = new FeedbackModel({
                rating, content, voter, election
            });

            await newFeedback.save();

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }

        return res.status(201).json({ message: "Response Recorded" });
    },

    async getAll(req, res) {

        let feedbacks;
        try {

            feedbacks = await FeedbackModel.find();
            if (feedbacks.length == 0) {
                return res.status(404).json({ "message": "Feedbacks not avaiable" })
            }

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error })
        }

        return res.status(200).json({ feedbacks })
    },

}

module.exports = feedbackController;