const Feedbacks = require('../models/custModel')

exports.getCustFeed = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const custfeed = await Feedbacks.findById(req.params.id);
            if (!custfeed) return res.status(404).json({ message: "Customer Feedback Not Found" });
            return res.json(custfeed);
        } else {
            const custFeedback = await Feedbacks.find({ user: req.user.userId })
            res.json(custFeedback)
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

exports.addCustFeed = async (req, res) => {
    const { feedback } = req.body
    try {
        const addFeedback = await new Feedbacks({ feedback, user: req.user.userId })
        await addFeedback.save();
        return res.status(200).json("added sucessfully")
    } catch (error) {
        return res.status(500).json("internal server error")
    }
}

exports.updateCustFeed = async (req, res) => {
    try {
        const { id } = req.params
        const updateFeed = await Feedbacks.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!updateFeed) return res.status(404).json("something went wrong")
        res.json(updateFeed)
    } catch (error) {
        return res.status(500).json("Internal Server Srror")
    }
}

exports.dltCustFeed = async (req, res) => {
    try {
        const { id } = req.params
        const deleteFeed = await Feedbacks.findByIdAndDelete(id)
        if (!deleteFeed) return res.status(404).json("something went wrong")
        res.json(deleteFeed)
    } catch (error) {
        return res.status(500).json("Internal Server Error")
    }
}