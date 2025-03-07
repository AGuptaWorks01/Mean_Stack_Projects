const Feedbacks = require('../models/custModel')

exports.getCustFeed = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role === 'admin') {
            if (id) {
                const custfeed = await Feedbacks.findById(id)
                if (!custfeed) return res.status(404).json({ message: "Customer Feedback Not Found" });
                return res.json(custfeed);
            } else {
                const allFeedback = await Feedbacks.find();
                return res.json(allFeedback);
            }
        } else {
            if (id) {
                const custfeed = await Feedbacks.findOne({ _id: id, user: req.user.userId });
                if (!custfeed) return res.status(404).json({ message: "Customer Feedback Not Found" });
                return res.json(custfeed);
            } else {
                const userFeedback = await Feedbacks.find({ user: req.user.userId });
                return res.json(userFeedback);
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// exports.getCustFeed = async (req, res) => {
//     try {
//         const { id } = req.params
//         if (id) {
//             const custfeed = await Feedbacks.findById(req.params.id);
//             if (!custfeed) return res.status(404).json({ message: "Customer Feedback Not Found" });
//             return res.json(custfeed);
//         } else {
//             const custFeedback = await Feedbacks.find({ user: req.user.userId })
//             res.json(custFeedback)
//         }
//     } catch (error) {
//         return res.status(500).json({ message: "internal server error" })
//     }
// }

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
        const userId = req.user.userId

        const feedback = await Feedbacks.findById(id)
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });

        if (req.user.role === 'admin' || feedback.user.toString() === userId) {
            const updateFeed = await Feedbacks.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            return res.json(updateFeed)
        } else {
            return res.status(403).json({ message: "You are not allowed to update this feedback" });
        }
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

// exports.updateCustFeed = async (req, res) => {
//     try {
//         const { id } = req.params
//         const updateFeed = await Feedbacks.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
//         if (!updateFeed) return res.status(404).json("something went wrong")
//         res.json(updateFeed)
//     } catch (error) {
//         return res.status(500).json("Internal Server Srror")
//     }
// }

exports.dltCustFeed = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Check if the feedback exists
        const feedback = await Feedbacks.findById(id);
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });

        // Check if the user is an admin or owns the feedback
        if (req.user.role === 'admin' || feedback.user.toString() === userId) {
            const deleteFeed = await Feedbacks.findByIdAndDelete(id);
            return res.json({ message: "Feedback deleted successfully", feedback: deleteFeed });
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this feedback" });
        }
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};


// exports.dltCustFeed = async (req, res) => {
//     try {
//         const { id } = req.params
//         const deleteFeed = await Feedbacks.findByIdAndDelete(id)
//         if (!deleteFeed) return res.status(404).json("something went wrong")
//         res.json(deleteFeed)
//     } catch (error) {
//         return res.status(500).json("Internal Server Error")
//     }
// }